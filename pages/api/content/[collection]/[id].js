import admin from 'firebase-admin';

import { adminDb, adminStorage } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';
import { CONTENT_ROOT, isKnownCollection } from '@/lib/contentCollections';
import { sanitizeRecord } from '@/lib/contentRecords';

const itemRef = (key, id) =>
  adminDb.collection(CONTENT_ROOT).doc(key).collection('items').doc(id);

/** Best-effort removal of superseded uploads; never blocks the write. */
const removeStoredFile = async (path) => {
  if (!path) return;
  try {
    await adminStorage.bucket().file(path).delete();
  } catch (error) {
    /* already gone, or no bucket configured — not fatal */
  }
};

export default async function handler(req, res) {
  const { collection, id } = req.query;

  if (!collection || !isKnownCollection(collection)) {
    return res.status(404).json({ message: 'Unknown collection.' });
  }
  if (!id) return res.status(400).json({ message: 'Missing id.' });

  const ref = itemRef(collection, id);

  if (req.method === 'PUT') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    try {
      const existing = await ref.get();
      if (!existing.exists) {
        return res.status(404).json({ message: 'That entry no longer exists.' });
      }

      const previousPaths = existing.data()?.filePaths || {};
      const updates = sanitizeRecord(collection, req.body || {});
      updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();

      await ref.set(updates, { merge: true });

      // Drop any file this write replaced, so the bucket does not accumulate
      // every previous version of every document.
      if (updates.filePaths) {
        await Promise.all(
          Object.entries(previousPaths)
            .filter(([field, path]) => path && updates.filePaths[field] !== path)
            .map(([, path]) => removeStoredFile(path))
        );
      }

      return res.status(200).json({ message: 'Saved.' });
    } catch (error) {
      return res.status(500).json({ message: 'Could not save this entry.' });
    }
  }

  if (req.method === 'DELETE') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    try {
      const existing = await ref.get();
      if (existing.exists) {
        const paths = existing.data()?.filePaths || {};
        await Promise.all(Object.values(paths).map(removeStoredFile));
        await ref.delete();
      }
      return res.status(200).json({ message: 'Removed.' });
    } catch (error) {
      return res.status(500).json({ message: 'Could not remove this entry.' });
    }
  }

  res.setHeader('Allow', 'PUT, DELETE');
  return res.status(405).json({ message: 'Method not allowed.' });
}
