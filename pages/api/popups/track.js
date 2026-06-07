import { adminDb } from '@/lib/firebaseAdmin';
import admin from 'firebase-admin';

const COLLECTION = 'popups';

// Public endpoint — increments impression/click counters for analytics.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const { id, event } = req.body || {};
  if (!id || !['impression', 'click'].includes(event)) {
    return res.status(400).json({ message: 'Invalid tracking payload.' });
  }

  const field = event === 'impression' ? 'impressions' : 'clicks';

  try {
    await adminDb
      .collection(COLLECTION)
      .doc(id)
      .set(
        {
          [field]: admin.firestore.FieldValue.increment(1),
          lastEventAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(200).json({ ok: false });
  }
}
