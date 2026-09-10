/**
 * The Parent Room — Firestore access.
 *
 * Server-only. Every read and write for the module goes through this file, so
 * the API routes stay thin and the rules about what a booking may contain live
 * in one place.
 *
 * The important function here is `reserveSlot`. Two parents clicking the same
 * 10:30 at the same moment is not a rare edge case for a page that will be
 * advertised to thousands at once — it is the expected case — so the slot is
 * claimed inside a Firestore transaction against a document whose id is derived
 * from the date and time. Deriving the id is what makes the guard work: both
 * requests contend for the same document, and exactly one of them wins.
 */

import crypto from 'node:crypto';
import admin from 'firebase-admin';

import { adminDb } from '@/lib/firebaseAdmin';
import {
  ACTIVE_BOOKING_STATUSES,
  BOOKINGS_COLLECTION,
  BOOKING_STATUS,
  PAYMENT_STATUS,
  SETTINGS_COLLECTION,
  SETTINGS_DOC,
  SLOTS_COLLECTION,
  SLOT_STATUS,
  TIMEZONE,
  defaultParentRoomSettings,
  generateBookingId,
  mergeParentRoomSettings
} from '@/lib/parentRoom';
import {
  buildSlotId,
  earliestBookableInstant,
  istInstant,
  isWithinBookingWindow,
  parseSlotId,
  slotGridForDate
} from '@/lib/parentRoomTime';

const { FieldValue, Timestamp } = admin.firestore;

const bookings = () => adminDb.collection(BOOKINGS_COLLECTION);
const slots = () => adminDb.collection(SLOTS_COLLECTION);
const settingsRef = () => adminDb.collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC);

/** A conflict the parent can act on, as opposed to a server fault. */
export class BookingConflict extends Error {
  constructor(message, code = 'slot_taken') {
    super(message);
    this.name = 'BookingConflict';
    this.code = code;
  }
}

// -------------------------------------------------------------------- Settings

export const loadSettings = async () => {
  try {
    const snapshot = await settingsRef().get();
    return mergeParentRoomSettings(snapshot.exists ? snapshot.data() : null);
  } catch (error) {
    // A configuration read failing must not be indistinguishable from the
    // school having closed bookings, so the caller is told this is degraded.
    const fallback = mergeParentRoomSettings(null);
    fallback.degraded = true;
    return fallback;
  }
};

export const saveSettings = async (updates, editorEmail) => {
  const clean = mergeParentRoomSettings(updates);
  const payload = {};
  Object.keys(defaultParentRoomSettings).forEach((key) => {
    payload[key] = clean[key];
  });
  await settingsRef().set(
    { ...payload, updatedAt: FieldValue.serverTimestamp(), updatedBy: editorEmail || '' },
    { merge: true }
  );
  return clean;
};

// ----------------------------------------------------------------------- Slots

/** Slot documents for a date range, keyed by slot id. */
export const slotDocsInRange = async (firstDate, lastDate) => {
  const snapshot = await slots()
    .where('dateKey', '>=', firstDate)
    .where('dateKey', '<=', lastDate)
    .get();

  const map = {};
  snapshot.forEach((doc) => {
    const data = doc.data() || {};
    map[doc.id] = {
      status: data.status || SLOT_STATUS.AVAILABLE,
      bookingId: data.bookingId || '',
      reservedUntil: data.reservedUntil?.toDate?.()?.toISOString() || null
    };
  });
  return map;
};

const hashToken = (token) => crypto.createHash('sha256').update(String(token)).digest('hex');

// ------------------------------------------------------------------- Reserving

/**
 * Claim a slot and open a booking against it, atomically.
 *
 * Returns `{ bookingId, reservationToken, expiresAt }`. The token is the proof
 * the confirm route asks for: only the browser that made the hold is given it,
 * so knowing a booking id is not enough to confirm somebody else's session.
 * Firestore stores its hash, so a copy of the document is not a copy of the key.
 *
 * Throws `BookingConflict` when the slot is gone, the date is closed, the day
 * is full, or the time no longer meets the school's notice period.
 */
export const reserveSlot = async ({ slotId, settings, booking, campaign, requestMeta }) => {
  const parsed = parseSlotId(slotId);
  if (!parsed) throw new BookingConflict('That time is no longer valid.', 'bad_slot');

  const { dateKey, startMinutes } = parsed;
  const now = new Date();

  // The slot must be one the configuration actually offers — a crafted id for
  // 03:00 on a Sunday is rejected here rather than quietly booked.
  const grid = slotGridForDate(dateKey, settings);
  const gridSlot = grid.find((slot) => slot.slotId === slotId);
  if (!gridSlot) {
    throw new BookingConflict('That time is not available for booking.', 'not_offered');
  }
  if (!isWithinBookingWindow(dateKey, settings, now)) {
    throw new BookingConflict('That date is outside the booking window.', 'out_of_window');
  }

  const startsAt = istInstant(dateKey, gridSlot.startMinutes);
  const endsAt = istInstant(dateKey, gridSlot.endMinutes);
  if (startsAt.getTime() < earliestBookableInstant(settings, now).getTime()) {
    throw new BookingConflict(
      `Sessions need at least ${settings.minimumBookingNoticeHours} hours' notice. Please pick a later time.`,
      'too_soon'
    );
  }

  const reservationToken = crypto.randomBytes(24).toString('hex');
  const holdMs = settings.reservationHoldMinutes * 60 * 1000;

  const slotRef = slots().doc(slotId);
  const dayQuery = slots().where('dateKey', '==', dateKey);

  // A generated id can in principle collide; a handful of attempts makes that
  // impossible in practice without an unbounded loop.
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const bookingId = generateBookingId();
    const bookingRef = bookings().doc(bookingId);

    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await adminDb.runTransaction(async (tx) => {
        // --- every read first; Firestore forbids a read after a write ---
        const [slotSnap, bookingSnap, daySnap] = await Promise.all([
          tx.get(slotRef),
          tx.get(bookingRef),
          tx.get(dayQuery)
        ]);

        if (bookingSnap.exists) {
          const collision = new Error('id-collision');
          collision.code = 'id-collision';
          throw collision;
        }

        const stamp = Date.now();
        const slotData = slotSnap.exists ? slotSnap.data() : null;
        const reservedUntilMs = slotData?.reservedUntil?.toMillis?.() ?? 0;
        const holdIsLive = reservedUntilMs > stamp;

        if (slotData) {
          if (slotData.status === SLOT_STATUS.BOOKED) {
            throw new BookingConflict(
              'That slot was just booked by another parent. Please select another available time.'
            );
          }
          if (slotData.status === SLOT_STATUS.BLOCKED) {
            throw new BookingConflict('That time is not available. Please select another.');
          }
          if (slotData.status === SLOT_STATUS.RESERVED && holdIsLive) {
            throw new BookingConflict(
              'Another parent is completing a booking for that time. Please select another available time.'
            );
          }
        }

        // The daily cap counts only slots actually taken; expired holds do not
        // consume the day.
        let bookedToday = 0;
        daySnap.forEach((doc) => {
          if (doc.id === slotId) return;
          const data = doc.data() || {};
          if (data.status === SLOT_STATUS.BOOKED) bookedToday += 1;
          else if (
            data.status === SLOT_STATUS.RESERVED &&
            (data.reservedUntil?.toMillis?.() ?? 0) > stamp
          ) {
            bookedToday += 1;
          }
        });
        if (bookedToday >= settings.maximumDailySessions) {
          throw new BookingConflict(
            'That day is fully booked. Please choose another date.',
            'day_full'
          );
        }

        // Taking over a lapsed hold retires the booking that abandoned it, so
        // the table does not fill with rows that will never be paid.
        const previousBookingId = slotData?.bookingId;
        if (previousBookingId && previousBookingId !== bookingId && !holdIsLive) {
          const previousRef = bookings().doc(previousBookingId);
          const previousSnap = await tx.get(previousRef);
          if (previousSnap.exists && previousSnap.data()?.bookingStatus === BOOKING_STATUS.PENDING) {
            tx.update(previousRef, {
              bookingStatus: BOOKING_STATUS.EXPIRED,
              updatedAt: FieldValue.serverTimestamp()
            });
          }
        }

        // --- writes ---
        const reservedUntil = Timestamp.fromDate(new Date(stamp + holdMs));

        tx.set(
          slotRef,
          {
            dateKey,
            startMinutes: gridSlot.startMinutes,
            endMinutes: gridSlot.endMinutes,
            startTime: Timestamp.fromDate(startsAt),
            endTime: Timestamp.fromDate(endsAt),
            date: Timestamp.fromDate(istInstant(dateKey, 0)),
            status: SLOT_STATUS.RESERVED,
            bookingId,
            reservedUntil,
            timezone: TIMEZONE,
            createdAt: slotSnap.exists ? slotData.createdAt || FieldValue.serverTimestamp() : FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
          },
          { merge: true }
        );

        tx.set(bookingRef, {
          bookingId,
          ...booking,

          slotId,
          dateKey,
          startMinutes: gridSlot.startMinutes,
          appointmentDate: Timestamp.fromDate(istInstant(dateKey, 0)),
          appointmentStart: Timestamp.fromDate(startsAt),
          appointmentEnd: Timestamp.fromDate(endsAt),
          timezone: TIMEZONE,

          amount: settings.participationFee,
          currency: settings.currency,
          paymentMode: settings.paymentMode,
          paymentStatus: PAYMENT_STATUS.PENDING,
          paymentReference: '',
          paymentOrderId: '',

          bookingStatus: BOOKING_STATUS.PENDING,
          meetingLink: '',
          internalNotes: '',

          source: campaign?.source || '',
          medium: campaign?.medium || '',
          campaign: campaign?.campaign || '',
          adCreative: campaign?.adCreative || '',
          campaignTerm: campaign?.term || '',
          fbclid: campaign?.fbclid || '',
          channel: campaign?.channel || 'Direct',
          landingPath: requestMeta?.landingPath || '',

          reservationTokenHash: hashToken(reservationToken),
          reservationExpiresAt: reservedUntil,

          emailsSent: {},
          remindersSent: {},
          history: [
            {
              at: new Date().toISOString(),
              by: 'parent',
              action: 'created',
              detail: 'Slot held while completing payment.'
            }
          ],

          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });

        return { bookingId, expiresAt: new Date(stamp + holdMs).toISOString() };
      });

      return { ...result, reservationToken };
    } catch (error) {
      if (error?.code === 'id-collision') continue;
      throw error;
    }
  }

  throw new BookingConflict('Could not create a booking reference. Please try again.', 'id_exhausted');
};

// ------------------------------------------------------------------ Confirming

export const getBooking = async (bookingId) => {
  const snapshot = await bookings().doc(String(bookingId)).get();
  return snapshot.exists ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const tokenMatches = (booking, token) => {
  if (!booking?.reservationTokenHash || !token) return false;
  const given = hashToken(token);
  const stored = String(booking.reservationTokenHash);
  if (given.length !== stored.length) return false;
  return crypto.timingSafeEqual(Buffer.from(given), Buffer.from(stored));
};

/**
 * Turn a held slot into a confirmed session.
 *
 * Runs in a transaction alongside the slot so a hold that expired a second ago
 * cannot be confirmed on top of somebody else's booking. Confirming twice is a
 * no-op that returns the existing booking, which is what makes a retried
 * request — a double click, a network retry — safe.
 */
export const confirmBooking = async ({
  bookingId,
  paymentStatus,
  paymentReference = '',
  paymentOrderId = ''
}) => {
  const bookingRef = bookings().doc(String(bookingId));

  return adminDb.runTransaction(async (tx) => {
    const bookingSnap = await tx.get(bookingRef);
    if (!bookingSnap.exists) {
      throw new BookingConflict('That booking could not be found.', 'not_found');
    }
    const booking = bookingSnap.data();

    if (booking.bookingStatus === BOOKING_STATUS.CONFIRMED) {
      return { booking: { id: bookingSnap.id, ...booking }, alreadyConfirmed: true };
    }
    if (booking.bookingStatus !== BOOKING_STATUS.PENDING) {
      throw new BookingConflict(
        'That booking is no longer awaiting confirmation.',
        'not_pending'
      );
    }

    const slotRef = slots().doc(booking.slotId);
    const slotSnap = await tx.get(slotRef);
    const slotData = slotSnap.exists ? slotSnap.data() : null;

    // Someone else may have taken the slot while this parent was paying.
    if (slotData && slotData.bookingId !== booking.bookingId) {
      throw new BookingConflict(
        'That slot was just booked by another parent. Please select another available time.'
      );
    }
    if (slotData?.status === SLOT_STATUS.BLOCKED) {
      throw new BookingConflict('That time has been withdrawn. Please select another.');
    }

    const now = FieldValue.serverTimestamp();
    const updates = {
      bookingStatus: BOOKING_STATUS.CONFIRMED,
      paymentStatus,
      paymentReference: String(paymentReference || '').slice(0, 120),
      paymentOrderId: String(paymentOrderId || '').slice(0, 120),
      confirmedAt: now,
      updatedAt: now,
      history: FieldValue.arrayUnion({
        at: new Date().toISOString(),
        by: 'system',
        action: 'confirmed',
        detail: `Payment ${paymentStatus}.`
      })
    };

    tx.update(bookingRef, updates);
    tx.set(
      slotRef,
      {
        status: SLOT_STATUS.BOOKED,
        bookingId: booking.bookingId,
        reservedUntil: FieldValue.delete(),
        updatedAt: now
      },
      { merge: true }
    );

    return {
      booking: {
        id: bookingSnap.id,
        ...booking,
        bookingStatus: BOOKING_STATUS.CONFIRMED,
        paymentStatus,
        paymentReference,
        paymentOrderId
      },
      alreadyConfirmed: false
    };
  });
};

/** Record a failed payment attempt without giving up the hold. */
export const recordPaymentFailure = async (bookingId, detail = '') => {
  await bookings()
    .doc(String(bookingId))
    .update({
      paymentStatus: PAYMENT_STATUS.FAILED,
      updatedAt: FieldValue.serverTimestamp(),
      history: FieldValue.arrayUnion({
        at: new Date().toISOString(),
        by: 'system',
        action: 'payment_failed',
        detail: String(detail || '').slice(0, 300)
      })
    })
    .catch(() => {});
};

export const attachOrder = async (bookingId, orderId) => {
  await bookings()
    .doc(String(bookingId))
    .update({ paymentOrderId: String(orderId), updatedAt: FieldValue.serverTimestamp() });
};

// -------------------------------------------------------------- Email bookkeeping

/**
 * Mark an email as sent, and say whether this call is the one that should send
 * it. A retried server action therefore mails the parent once, not twice.
 */
export const claimEmail = async (bookingId, key) => {
  const bookingRef = bookings().doc(String(bookingId));
  try {
    return await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(bookingRef);
      if (!snap.exists) return false;
      const sent = snap.data()?.emailsSent || {};
      if (sent[key]) return false;
      tx.update(bookingRef, {
        [`emailsSent.${key}`]: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
      return true;
    });
  } catch (error) {
    // If the claim itself fails, do not send: a missing email is recoverable
    // from the portal, a duplicate one is not.
    return false;
  }
};

/** Undo a claim when the send threw, so the admin's resend button can retry. */
export const releaseEmailClaim = async (bookingId, key) => {
  await bookings()
    .doc(String(bookingId))
    .update({ [`emailsSent.${key}`]: FieldValue.delete() })
    .catch(() => {});
};

// ------------------------------------------------------------------- Admin ops

const HISTORY_LIMIT = 60;

export const appendHistory = (entry) => FieldValue.arrayUnion(entry);

export const updateBooking = async (bookingId, updates, historyEntry) => {
  const payload = { ...updates, updatedAt: FieldValue.serverTimestamp() };
  if (historyEntry) payload.history = FieldValue.arrayUnion(historyEntry);
  await bookings().doc(String(bookingId)).update(payload);
};

/**
 * Free the slot a booking holds. Used by cancel and by reschedule, and written
 * so it can never clear a slot that has since been given to somebody else.
 */
export const releaseSlot = async (slotId, bookingId) => {
  if (!slotId) return;
  const slotRef = slots().doc(String(slotId));
  await adminDb
    .runTransaction(async (tx) => {
      const snap = await tx.get(slotRef);
      if (!snap.exists) return;
      if (snap.data()?.bookingId !== bookingId) return;
      tx.set(
        slotRef,
        {
          status: SLOT_STATUS.AVAILABLE,
          bookingId: FieldValue.delete(),
          reservedUntil: FieldValue.delete(),
          updatedAt: FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    })
    .catch(() => {});
};

/** Move a confirmed booking to a different slot, atomically on both sides. */
export const moveBooking = async ({ bookingId, slotId, settings, actorEmail }) => {
  const parsed = parseSlotId(slotId);
  if (!parsed) throw new BookingConflict('That time is not valid.', 'bad_slot');

  const { dateKey } = parsed;
  const gridSlot = slotGridForDate(dateKey, settings).find((s) => s.slotId === slotId);
  if (!gridSlot) {
    throw new BookingConflict('That time is not one the schedule offers.', 'not_offered');
  }

  const bookingRef = bookings().doc(String(bookingId));
  const targetRef = slots().doc(slotId);
  const startsAt = istInstant(dateKey, gridSlot.startMinutes);
  const endsAt = istInstant(dateKey, gridSlot.endMinutes);

  return adminDb.runTransaction(async (tx) => {
    const bookingSnap = await tx.get(bookingRef);
    if (!bookingSnap.exists) throw new BookingConflict('Booking not found.', 'not_found');
    const booking = bookingSnap.data();

    const targetSnap = await tx.get(targetRef);
    const targetData = targetSnap.exists ? targetSnap.data() : null;
    const stamp = Date.now();
    const targetTaken =
      targetData &&
      targetData.bookingId !== booking.bookingId &&
      (targetData.status === SLOT_STATUS.BOOKED ||
        targetData.status === SLOT_STATUS.BLOCKED ||
        (targetData.status === SLOT_STATUS.RESERVED &&
          (targetData.reservedUntil?.toMillis?.() ?? 0) > stamp));
    if (targetTaken) {
      throw new BookingConflict('That time is already taken.', 'slot_taken');
    }

    const previousSlotId = booking.slotId;
    const previousRef = previousSlotId ? slots().doc(previousSlotId) : null;
    const previousSnap = previousRef ? await tx.get(previousRef) : null;

    const now = FieldValue.serverTimestamp();

    if (previousSnap?.exists && previousSnap.data()?.bookingId === booking.bookingId) {
      tx.set(
        previousRef,
        {
          status: SLOT_STATUS.AVAILABLE,
          bookingId: FieldValue.delete(),
          reservedUntil: FieldValue.delete(),
          updatedAt: now
        },
        { merge: true }
      );
    }

    tx.set(
      targetRef,
      {
        dateKey,
        startMinutes: gridSlot.startMinutes,
        endMinutes: gridSlot.endMinutes,
        startTime: Timestamp.fromDate(startsAt),
        endTime: Timestamp.fromDate(endsAt),
        date: Timestamp.fromDate(istInstant(dateKey, 0)),
        status: SLOT_STATUS.BOOKED,
        bookingId: booking.bookingId,
        reservedUntil: FieldValue.delete(),
        timezone: TIMEZONE,
        updatedAt: now,
        createdAt: targetSnap.exists ? targetData.createdAt || now : now
      },
      { merge: true }
    );

    tx.update(bookingRef, {
      slotId,
      dateKey,
      startMinutes: gridSlot.startMinutes,
      appointmentDate: Timestamp.fromDate(istInstant(dateKey, 0)),
      appointmentStart: Timestamp.fromDate(startsAt),
      appointmentEnd: Timestamp.fromDate(endsAt),
      bookingStatus: BOOKING_STATUS.CONFIRMED,
      rescheduledAt: now,
      updatedAt: now,
      // A moved session needs its reminders to fire again against the new time.
      remindersSent: {},
      'emailsSent.rescheduled': FieldValue.delete(),
      history: FieldValue.arrayUnion({
        at: new Date().toISOString(),
        by: actorEmail || 'admin',
        action: 'rescheduled',
        detail: `Moved to ${dateKey} ${gridSlot.label}.`
      })
    });

    return { id: bookingSnap.id, ...booking, slotId, dateKey, startMinutes: gridSlot.startMinutes };
  });
};

/** Block or unblock a single time on the calendar. */
export const setSlotBlocked = async (slotId, blocked, actorEmail) => {
  const parsed = parseSlotId(slotId);
  if (!parsed) throw new BookingConflict('That time is not valid.', 'bad_slot');
  const slotRef = slots().doc(slotId);

  await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(slotRef);
    const data = snap.exists ? snap.data() : null;
    if (blocked && data?.status === SLOT_STATUS.BOOKED) {
      throw new BookingConflict(
        'That time has a confirmed booking. Cancel or move it before blocking the slot.',
        'slot_booked'
      );
    }
    tx.set(
      slotRef,
      {
        dateKey: parsed.dateKey,
        startMinutes: parsed.startMinutes,
        date: Timestamp.fromDate(istInstant(parsed.dateKey, 0)),
        startTime: Timestamp.fromDate(istInstant(parsed.dateKey, parsed.startMinutes)),
        status: blocked ? SLOT_STATUS.BLOCKED : SLOT_STATUS.AVAILABLE,
        blockedBy: blocked ? actorEmail || 'admin' : FieldValue.delete(),
        bookingId: FieldValue.delete(),
        reservedUntil: FieldValue.delete(),
        timezone: TIMEZONE,
        updatedAt: FieldValue.serverTimestamp(),
        createdAt: snap.exists ? data.createdAt || FieldValue.serverTimestamp() : FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  });
};

// ----------------------------------------------------------------- Listing

const isoOf = (value) => value?.toDate?.()?.toISOString?.() || null;

/** The shape the admin table and drawer consume. Timestamps become ISO strings. */
export const serializeBooking = (doc) => {
  const data = doc.data ? doc.data() : doc;
  const id = doc.id || data.bookingId;
  return {
    id,
    bookingId: data.bookingId || id,

    parentName: data.parentName || '',
    mobile: data.mobile || '',
    whatsapp: data.whatsapp || '',
    email: data.email || '',
    preferredCommunication: data.preferredCommunication || '',

    childFirstName: data.childFirstName || '',
    childAge: data.childAge ?? null,
    currentClass: data.currentClass || '',
    currentSchool: data.currentSchool || '',

    primaryConcern: data.primaryConcern || '',
    concernDetails: data.concernDetails || '',
    schoolChangeIntent: data.schoolChangeIntent || '',
    sessionExpectation: data.sessionExpectation || '',
    preferredLanguage: data.preferredLanguage || '',

    marketingConsent: data.marketingConsent === true,
    guidanceConsent: data.guidanceConsent === true,
    dataConsent: data.dataConsent === true,

    slotId: data.slotId || '',
    dateKey: data.dateKey || '',
    startMinutes: data.startMinutes ?? null,
    appointmentStart: isoOf(data.appointmentStart),
    appointmentEnd: isoOf(data.appointmentEnd),
    timezone: data.timezone || TIMEZONE,

    amount: data.amount ?? 0,
    currency: data.currency || 'INR',
    paymentMode: data.paymentMode || 'razorpay',
    paymentStatus: data.paymentStatus || PAYMENT_STATUS.PENDING,
    paymentReference: data.paymentReference || '',
    paymentOrderId: data.paymentOrderId || '',

    bookingStatus: data.bookingStatus || BOOKING_STATUS.PENDING,
    meetingLink: data.meetingLink || '',
    internalNotes: data.internalNotes || '',

    source: data.source || '',
    medium: data.medium || '',
    campaign: data.campaign || '',
    adCreative: data.adCreative || '',
    channel: data.channel || 'Direct',

    emailsSent: Object.keys(data.emailsSent || {}),
    remindersSent: Object.keys(data.remindersSent || {}),
    history: Array.isArray(data.history) ? data.history.slice(-HISTORY_LIMIT) : [],

    createdAt: isoOf(data.createdAt),
    updatedAt: isoOf(data.updatedAt),
    confirmedAt: isoOf(data.confirmedAt)
  };
};

/**
 * What the parent's own confirmation screen is allowed to see.
 *
 * Deliberately narrow: it omits the concern details they typed, the internal
 * notes, the campaign attribution and the reservation hash. The confirmation
 * page is reached with a token, but a token is not a login, and there is no
 * reason for that screen to carry anything beyond the appointment itself.
 */
export const publicBookingView = (booking, settings) => ({
  bookingId: booking.bookingId,
  parentName: booking.parentName,
  childFirstName: booking.childFirstName,
  dateKey: booking.dateKey,
  startMinutes: booking.startMinutes ?? null,
  durationMinutes: settings?.sessionDuration ?? null,
  timezone: booking.timezone || TIMEZONE,
  counsellorName: settings?.counsellorName || '',
  bookingStatus: booking.bookingStatus,
  paymentStatus: booking.paymentStatus,
  amount: booking.amount ?? 0,
  meetingLink: booking.meetingLink || '',
  meetingNote: settings?.defaultMeetingNote || '',
  email: booking.email || ''
});

/**
 * All bookings in a date range, newest appointment first.
 *
 * Filtering and searching happen in the route rather than the query: the
 * volume here is a few hundred sessions, and doing it in memory avoids
 * demanding a composite index for every combination of filters the admin might
 * pick. If this ever grows past a few thousand rows it wants pagination and
 * real indexes, not a bigger fetch.
 */
export const listBookings = async ({ fromDate, toDate, limit = 500 } = {}) => {
  let query = bookings().orderBy('dateKey', 'desc');
  if (fromDate) query = query.where('dateKey', '>=', fromDate);
  if (toDate) query = query.where('dateKey', '<=', toDate);
  const snapshot = await query.limit(Math.min(1000, limit)).get();
  return snapshot.docs.map(serializeBooking);
};

/**
 * Retire holds that were never paid for.
 *
 * Availability already ignores an expired hold, so this is bookkeeping rather
 * than a correctness guard — without it the bookings table slowly fills with
 * rows that will never become sessions. Bounded so one admin page load cannot
 * turn into a long write burst.
 */
export const sweepExpiredHolds = async (limit = 40) => {
  const snapshot = await bookings()
    .where('bookingStatus', '==', BOOKING_STATUS.PENDING)
    .where('reservationExpiresAt', '<', Timestamp.fromDate(new Date()))
    .limit(limit)
    .get()
    .catch(() => null);

  if (!snapshot || snapshot.empty) return 0;

  const batch = adminDb.batch();
  snapshot.forEach((doc) => {
    batch.update(doc.ref, {
      bookingStatus: BOOKING_STATUS.EXPIRED,
      updatedAt: FieldValue.serverTimestamp()
    });
    const slotId = doc.data()?.slotId;
    if (slotId) {
      batch.set(
        slots().doc(slotId),
        {
          status: SLOT_STATUS.AVAILABLE,
          bookingId: FieldValue.delete(),
          reservedUntil: FieldValue.delete(),
          updatedAt: FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    }
  });

  await batch.commit().catch(() => {});
  return snapshot.size;
};

export const ACTIVE_STATUSES = ACTIVE_BOOKING_STATUSES;
export const bookingsCollection = bookings;
export const slotsCollection = slots;
export { buildSlotId };
