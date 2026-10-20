/**
 * Edenwoods Merit Scholarship — Firestore access.
 *
 * Server-only. Every read and write for the scholarship goes through here.
 *
 * The rule worth pointing at is the duplicate guard. The Terms promise "only
 * one registration per child", and the honest place to enforce that is before
 * the parent pays rather than by cancelling afterwards and keeping the ₹199.
 * A deterministic claim document keyed on the child's identity makes that a
 * single-document transaction: two submissions of the same child contend for
 * one id, and exactly one wins.
 */

import crypto from 'node:crypto';
import admin from 'firebase-admin';

import { adminDb } from '@/lib/firebaseAdmin';
import {
  PAYMENT_STATUS,
  REGISTRATIONS_COLLECTION,
  REGISTRATION_STATUS,
  SCHOLARSHIP_ID,
  generateRegistrationNumber
} from '@/lib/scholarship';

const { FieldValue, Timestamp } = admin.firestore;

const registrations = () => adminDb.collection(REGISTRATIONS_COLLECTION);
/** Claims live beside the registrations so the duplicate guard is atomic. */
const claims = () => adminDb.collection(`${REGISTRATIONS_COLLECTION}_claims`);

export class RegistrationConflict extends Error {
  constructor(message, code = 'conflict') {
    super(message);
    this.name = 'RegistrationConflict';
    this.code = code;
  }
}

const hashToken = (token) => crypto.createHash('sha256').update(String(token)).digest('hex');

/**
 * The identity of a child, for the duplicate guard: name, date of birth and
 * the class applied for, normalised so "Aarav  Kumar" and "aarav kumar" are
 * the same child. Deliberately not the phone number — one parent may quite
 * reasonably register two children.
 */
const childKey = ({ childName, dob, classApplying }) => {
  const normal = `${String(childName || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')}|${dob}|${classApplying}`;
  return crypto.createHash('sha256').update(normal).digest('hex').slice(0, 32);
};

// ------------------------------------------------------------------ Creating

/**
 * Open a registration and return `{ registrationNumber, token }`.
 *
 * The token is the proof the confirm route asks for, so a guessed registration
 * number is not enough to complete or read somebody else's registration.
 * Firestore stores only its hash.
 *
 * An unpaid registration holds the child's slot in the duplicate guard for
 * `holdMinutes`; after that another attempt for the same child may take it
 * over, so an abandoned payment does not lock a child out for good.
 */
export const createRegistration = async ({ registration, campaign, meta, holdMinutes = 30 }) => {
  const key = childKey(registration);
  const claimRef = claims().doc(key);
  const token = crypto.randomBytes(24).toString('hex');

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const registrationNumber = generateRegistrationNumber();
    const docRef = registrations().doc(registrationNumber);

    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await adminDb.runTransaction(async (tx) => {
        const [claimSnap, existingSnap] = await Promise.all([tx.get(claimRef), tx.get(docRef)]);

        if (existingSnap.exists) {
          const collision = new Error('id-collision');
          collision.code = 'id-collision';
          throw collision;
        }

        const now = Date.now();
        if (claimSnap.exists) {
          const claim = claimSnap.data() || {};
          const heldUntil = claim.heldUntil?.toMillis?.() ?? 0;
          if (claim.paid === true) {
            throw new RegistrationConflict(
              'This child is already registered. Only one registration is allowed per child — check your WhatsApp for the registration number.',
              'already_registered'
            );
          }
          if (heldUntil > now) {
            throw new RegistrationConflict(
              'A registration for this child was started a few minutes ago and is still being paid for. Please finish that payment, or try again shortly.',
              'in_progress'
            );
          }
        }

        const heldUntil = Timestamp.fromDate(new Date(now + holdMinutes * 60000));

        tx.set(claimRef, {
          registrationNumber,
          paid: false,
          heldUntil,
          childName: registration.childName,
          updatedAt: FieldValue.serverTimestamp()
        });

        tx.set(docRef, {
          registrationNumber,
          scholarshipId: SCHOLARSHIP_ID,
          childKey: key,
          ...registration,

          amount: meta?.amount ?? 199,
          currency: 'INR',
          paymentStatus: PAYMENT_STATUS.PENDING,
          paymentReference: '',
          paymentOrderId: '',

          status: REGISTRATION_STATUS.PENDING,
          testCentre: 'TEHS Campus, Silwar, Hazaribagh',
          reportingTime: '',
          internalNotes: '',

          source: campaign?.source || '',
          medium: campaign?.medium || '',
          campaign: campaign?.campaign || '',
          adCreative: campaign?.adCreative || '',
          fbclid: campaign?.fbclid || '',
          landingPath: meta?.landingPath || '',

          tokenHash: hashToken(token),
          holdExpiresAt: heldUntil,

          emailsSent: {},
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });

        return { registrationNumber };
      });

      return { ...result, token };
    } catch (error) {
      if (error?.code === 'id-collision') continue;
      throw error;
    }
  }

  throw new RegistrationConflict(
    'Could not create a registration number. Please try again.',
    'id_exhausted'
  );
};

// ------------------------------------------------------------------- Reading

export const getRegistration = async (registrationNumber) => {
  const snap = await registrations().doc(String(registrationNumber)).get();
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
};

export const tokenMatches = (record, token) => {
  if (!record?.tokenHash || !token) return false;
  const given = hashToken(token);
  const stored = String(record.tokenHash);
  if (given.length !== stored.length) return false;
  return crypto.timingSafeEqual(Buffer.from(given), Buffer.from(stored));
};

// ---------------------------------------------------------------- Confirming

export const attachOrder = async (registrationNumber, orderId) => {
  await registrations()
    .doc(String(registrationNumber))
    .update({ paymentOrderId: String(orderId), updatedAt: FieldValue.serverTimestamp() });
};

/**
 * Mark a registration paid, and make its duplicate claim permanent.
 *
 * Confirming twice returns the existing record and changes nothing, so a
 * double-tapped button or a retried request is safe.
 */
export const confirmRegistration = async ({
  registrationNumber,
  paymentReference = '',
  paymentOrderId = ''
}) => {
  const docRef = registrations().doc(String(registrationNumber));

  return adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);
    if (!snap.exists) {
      throw new RegistrationConflict('That registration could not be found.', 'not_found');
    }
    const record = snap.data();

    if (record.paymentStatus === PAYMENT_STATUS.PAID) {
      return { record: { id: snap.id, ...record }, alreadyConfirmed: true };
    }

    const claimRef = claims().doc(record.childKey);
    const claimSnap = await tx.get(claimRef);
    // Another registration for the same child got there first and paid.
    if (
      claimSnap.exists &&
      claimSnap.data()?.paid === true &&
      claimSnap.data()?.registrationNumber !== record.registrationNumber
    ) {
      throw new RegistrationConflict(
        'Another registration for this child has already been paid for.',
        'already_registered'
      );
    }

    const now = FieldValue.serverTimestamp();

    tx.update(docRef, {
      paymentStatus: PAYMENT_STATUS.PAID,
      paymentReference: String(paymentReference).slice(0, 120),
      paymentOrderId: String(paymentOrderId).slice(0, 120),
      status: REGISTRATION_STATUS.REGISTERED,
      paidAt: now,
      updatedAt: now,
      holdExpiresAt: FieldValue.delete()
    });

    tx.set(
      claimRef,
      {
        registrationNumber: record.registrationNumber,
        paid: true,
        heldUntil: FieldValue.delete(),
        updatedAt: now
      },
      { merge: true }
    );

    return {
      record: {
        id: snap.id,
        ...record,
        paymentStatus: PAYMENT_STATUS.PAID,
        status: REGISTRATION_STATUS.REGISTERED,
        paymentReference,
        paymentOrderId
      },
      alreadyConfirmed: false
    };
  });
};

export const recordPaymentFailure = async (registrationNumber, detail = '') => {
  await registrations()
    .doc(String(registrationNumber))
    .update({
      paymentStatus: PAYMENT_STATUS.FAILED,
      lastPaymentError: String(detail || '').slice(0, 300),
      updatedAt: FieldValue.serverTimestamp()
    })
    .catch(() => {});
};

// ------------------------------------------------------------ Email bookkeeping

/** Claim an email before sending it, so a retried action mails once. */
export const claimEmail = async (registrationNumber, key) => {
  const docRef = registrations().doc(String(registrationNumber));
  try {
    return await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(docRef);
      if (!snap.exists) return false;
      if ((snap.data()?.emailsSent || {})[key]) return false;
      tx.update(docRef, {
        [`emailsSent.${key}`]: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
      return true;
    });
  } catch (error) {
    // A missing email is recoverable from the portal; a duplicate is not.
    return false;
  }
};

export const releaseEmailClaim = async (registrationNumber, key) => {
  await registrations()
    .doc(String(registrationNumber))
    .update({ [`emailsSent.${key}`]: FieldValue.delete() })
    .catch(() => {});
};

// --------------------------------------------------------------- Serialising

const isoOf = (v) => v?.toDate?.()?.toISOString?.() || null;

/** The shape the admin screens consume. Never includes the token hash. */
export const serializeRegistration = (doc) => {
  const d = doc.data ? doc.data() : doc;
  const id = doc.id || d.registrationNumber;
  return {
    id,
    registrationNumber: d.registrationNumber || id,

    childName: d.childName || '',
    dob: d.dob || '',
    gender: d.gender || '',
    classApplying: d.classApplying || '',
    currentSchool: d.currentSchool || '',

    parentName: d.parentName || '',
    relationship: d.relationship || '',
    whatsapp: d.whatsapp || '',
    altPhone: d.altPhone || '',
    email: d.email || '',
    locality: d.locality || '',
    localityOther: d.localityOther || '',
    hearAbout: d.hearAbout || '',

    amount: d.amount ?? 199,
    paymentStatus: d.paymentStatus || PAYMENT_STATUS.PENDING,
    paymentReference: d.paymentReference || '',
    paymentOrderId: d.paymentOrderId || '',

    status: d.status || REGISTRATION_STATUS.PENDING,
    testCentre: d.testCentre || '',
    reportingTime: d.reportingTime || '',
    internalNotes: d.internalNotes || '',

    source: d.source || '',
    medium: d.medium || '',
    campaign: d.campaign || '',
    adCreative: d.adCreative || '',

    emailsSent: Object.keys(d.emailsSent || {}),
    createdAt: isoOf(d.createdAt),
    paidAt: isoOf(d.paidAt),
    updatedAt: isoOf(d.updatedAt)
  };
};

/** The narrow view a parent's own confirmation and admit card may see. */
export const publicRegistrationView = (record) => ({
  registrationNumber: record.registrationNumber,
  childName: record.childName,
  dob: record.dob,
  classApplying: record.classApplying,
  parentName: record.parentName,
  whatsapp: record.whatsapp,
  email: record.email || '',
  amount: record.amount ?? 199,
  paymentStatus: record.paymentStatus,
  status: record.status,
  testCentre: record.testCentre || '',
  reportingTime: record.reportingTime || '',
  paymentReference: record.paymentReference || ''
});

// ------------------------------------------------------------------- Listing

export const listRegistrations = async ({ limit = 1000 } = {}) => {
  const snapshot = await registrations()
    .orderBy('createdAt', 'desc')
    .limit(Math.min(2000, limit))
    .get();
  return snapshot.docs.map(serializeRegistration);
};

export const updateRegistration = async (registrationNumber, updates) => {
  await registrations()
    .doc(String(registrationNumber))
    .update({ ...updates, updatedAt: FieldValue.serverTimestamp() });
};

/**
 * Retire holds that were never paid for.
 *
 * Only the registration's status changes. The duplicate claim needs no
 * touching: it carries its own `heldUntil`, and `createRegistration` already
 * treats a lapsed hold as free — so the child's slot is released by the clock
 * rather than by this sweep running. That matters, because a sweep that never
 * runs must not be able to lock a child out.
 */
export const sweepExpiredHolds = async (limit = 50) => {
  const snapshot = await registrations()
    .where('status', '==', REGISTRATION_STATUS.PENDING)
    .where('holdExpiresAt', '<', Timestamp.fromDate(new Date()))
    .limit(limit)
    .get()
    .catch(() => null);

  if (!snapshot || snapshot.empty) return 0;

  const batch = adminDb.batch();
  snapshot.forEach((doc) => {
    batch.update(doc.ref, {
      status: REGISTRATION_STATUS.EXPIRED,
      updatedAt: FieldValue.serverTimestamp()
    });
  });

  await batch.commit().catch(() => {});
  return snapshot.size;
};

export const registrationsCollection = registrations;
