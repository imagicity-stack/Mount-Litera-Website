import admin from 'firebase-admin';

import { adminDb } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';
import {
  SETTINGS_COLLECTION,
  SETTINGS_DOC,
  defaultSettings,
  mergeSettings
} from '@/lib/siteSettings';

const docRef = () => adminDb.collection(SETTINGS_COLLECTION).doc(SETTINGS_DOC);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.setHeader(
      'Cache-Control',
      'public, max-age=0, s-maxage=120, stale-while-revalidate=600'
    );
    try {
      const snapshot = await docRef().get();
      return res.status(200).json({ settings: mergeSettings(snapshot.data()) });
    } catch (error) {
      // Always answer with something usable — the site's own phone number
      // should never disappear because Firestore is unreachable.
      return res.status(200).json({ settings: defaultSettings, degraded: true });
    }
  }

  if (req.method === 'PUT') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    const body = req.body || {};
    const updates = {};

    // Only fields the schema knows about, so settings cannot grow junk keys.
    Object.keys(defaultSettings).forEach((key) => {
      if (key in body) updates[key] = String(body[key] || '').trim().slice(0, 300);
    });

    try {
      await docRef().set(
        {
          ...updates,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedBy: adminUser.email || ''
        },
        { merge: true }
      );
      return res.status(200).json({ message: 'Settings saved.' });
    } catch (error) {
      return res.status(500).json({ message: 'Could not save the settings.' });
    }
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ message: 'Method not allowed.' });
}
