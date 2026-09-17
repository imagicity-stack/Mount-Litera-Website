import { adminDb } from '@/lib/firebaseAdmin';
import { requireAdmin, resolveAdmin } from '@/lib/adminAuth';
import { defaultPopup } from '@/lib/popupConfig';
import admin from 'firebase-admin';

const COLLECTION = 'popups';

const toTimestamp = (value) =>
  value ? admin.firestore.Timestamp.fromDate(new Date(value)) : null;

const serialize = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    startAt: data.startAt ? data.startAt.toDate().toISOString() : '',
    endAt: data.endAt ? data.endAt.toDate().toISOString() : '',
    createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
    updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null
  };
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      const wantsAll = req.query.all === '1';

      if (wantsAll) {
        // Admin view — return everything.
        const adminUser = await requireAdmin(req, res);
        if (!adminUser) return undefined;
        const snapshot = await adminDb.collection(COLLECTION).get();
        const popups = snapshot.docs.map(serialize).sort((a, b) => (b.priority || 0) - (a.priority || 0));
        return res.status(200).json({ popups });
      }

      // Public view — only active popups (path/frequency handled client-side).
      // A single popup can be requested by id for previewing, including one
      // that is still a draft. Firestore ids are 20 random characters, so this
      // is only reachable by someone who already has the id from the portal.
      const previewId = typeof req.query.preview === 'string' ? req.query.preview : '';
      if (previewId) {
        const doc = await adminDb.collection(COLLECTION).doc(previewId).get();
        return res
          .status(200)
          .json({ popups: doc.exists ? [serialize(doc)] : [], preview: true });
      }

      const snapshot = await adminDb.collection(COLLECTION).where('status', '==', 'active').get();
      const popups = snapshot.docs.map(serialize).sort((a, b) => (b.priority || 0) - (a.priority || 0));
      return res.status(200).json({ popups });
    } catch (error) {
      // The admin view must fail loudly — an admin needs to know the list they
      // are looking at is not the truth.
      if (req.query.all === '1') {
        return res.status(500).json({ message: 'Failed to load popups.' });
      }
      // The public view degrades to "no popups", like every other public read
      // on this site. A 500 here put an error in the console of every page and
      // made a Firestore hiccup indistinguishable from having none configured.
      // eslint-disable-next-line no-console
      console.error('Public popups read failed:', error?.message);
      return res.status(200).json({ popups: [], degraded: true });
    }
  }

  if (req.method === 'POST') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    try {
      const payload = { ...defaultPopup(), ...req.body };
      const docRef = await adminDb.collection(COLLECTION).add({
        ...payload,
        targetPaths: Array.isArray(payload.targetPaths) ? payload.targetPaths : [],
        priority: Number(payload.priority) || 1,
        triggerValue: Number(payload.triggerValue) || 0,
        frequencyDays: Number(payload.frequencyDays) || 0,
        startAt: toTimestamp(payload.startAt),
        endAt: toTimestamp(payload.endAt),
        impressions: 0,
        clicks: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: adminUser.email || ''
      });
      return res.status(201).json({ id: docRef.id });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Unable to create popup.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ message: 'Method not allowed.' });
}
