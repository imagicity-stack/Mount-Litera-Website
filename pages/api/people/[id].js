import admin from 'firebase-admin';

import { adminDb, adminStorage } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';
import { PEOPLE_COLLECTION, isKnownGroup } from '@/lib/peopleGroups';

/** Best-effort removal of a superseded photograph; never blocks the write. */
const removeStoredFile = async (path) => {
  if (!path) return;
  try {
    await adminStorage.bucket().file(path).delete();
  } catch (error) {
    /* already gone, or no bucket configured — not fatal */
  }
};

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'Missing id.' });

  const docRef = adminDb.collection(PEOPLE_COLLECTION).doc(id);

  if (req.method === 'PUT') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    const body = req.body || {};

    if (body.group && !isKnownGroup(body.group)) {
      return res.status(400).json({ message: 'Unknown group.' });
    }
    if ('name' in body && !(body.name || '').trim()) {
      return res.status(400).json({ message: 'A name is required.' });
    }

    try {
      const existing = await docRef.get();
      if (!existing.exists) {
        return res.status(404).json({ message: 'That person is no longer in the directory.' });
      }
      const previousPath = existing.data()?.photoPath || '';

      const updates = { updatedAt: admin.firestore.FieldValue.serverTimestamp() };
      if ('group' in body) updates.group = body.group;
      if ('name' in body) updates.name = body.name.trim();
      if ('designation' in body) updates.designation = (body.designation || '').trim().slice(0, 120);
      if ('department' in body) updates.department = (body.department || '').trim().slice(0, 120);
      if ('bio' in body) updates.bio = (body.bio || '').trim().slice(0, 2000);
      if ('order' in body) updates.order = Number(body.order) || 0;
      if ('status' in body) updates.status = body.status === 'hidden' ? 'hidden' : 'published';
      if ('photo' in body) updates.photo = (body.photo || '').trim();
      if ('photoPath' in body) updates.photoPath = (body.photoPath || '').trim();

      // Never let a client rewrite provenance.
      delete updates.createdAt;
      delete updates.createdBy;

      await docRef.set(updates, { merge: true });

      // Drop the file this upload replaced so the bucket does not accumulate
      // every previous portrait of every person.
      if ('photoPath' in updates && previousPath && previousPath !== updates.photoPath) {
        await removeStoredFile(previousPath);
      }

      return res.status(200).json({ message: 'Saved.' });
    } catch (error) {
      return res.status(500).json({ message: 'Could not save this person.' });
    }
  }

  if (req.method === 'DELETE') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    try {
      const existing = await docRef.get();
      if (existing.exists) {
        await removeStoredFile(existing.data()?.photoPath);
        await docRef.delete();
      }
      return res.status(200).json({ message: 'Removed.' });
    } catch (error) {
      return res.status(500).json({ message: 'Could not remove this person.' });
    }
  }

  res.setHeader('Allow', 'PUT, DELETE');
  return res.status(405).json({ message: 'Method not allowed.' });
}
