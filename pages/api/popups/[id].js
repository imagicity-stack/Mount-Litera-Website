import { adminDb } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';
import admin from 'firebase-admin';

const COLLECTION = 'popups';

const toTimestamp = (value) =>
  value ? admin.firestore.Timestamp.fromDate(new Date(value)) : null;

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Missing popup id.' });
  }

  if (req.method === 'PUT') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    try {
      const updates = { ...req.body, updatedAt: admin.firestore.FieldValue.serverTimestamp() };

      // Never let the client overwrite analytics counters through an edit.
      delete updates.impressions;
      delete updates.clicks;
      delete updates.createdAt;

      if ('startAt' in updates) updates.startAt = toTimestamp(updates.startAt);
      if ('endAt' in updates) updates.endAt = toTimestamp(updates.endAt);
      if ('priority' in updates) updates.priority = Number(updates.priority) || 1;
      if ('triggerValue' in updates) updates.triggerValue = Number(updates.triggerValue) || 0;
      if ('frequencyDays' in updates) updates.frequencyDays = Number(updates.frequencyDays) || 0;
      if ('targetPaths' in updates && !Array.isArray(updates.targetPaths)) {
        updates.targetPaths = [];
      }

      await adminDb.collection(COLLECTION).doc(id).set(updates, { merge: true });
      return res.status(200).json({ message: 'Popup updated.' });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Unable to update popup.' });
    }
  }

  if (req.method === 'DELETE') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    try {
      await adminDb.collection(COLLECTION).doc(id).delete();
      return res.status(200).json({ message: 'Popup deleted.' });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Unable to delete popup.' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).json({ message: 'Method not allowed.' });
}
