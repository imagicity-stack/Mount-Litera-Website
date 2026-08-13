import admin from 'firebase-admin';

import { adminDb, adminStorage } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';
import { MEDIA_COLLECTION, isKnownSlot } from '@/lib/mediaSlots';

const clampPercent = (value, fallback = 50) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(100, Math.max(0, Math.round(num)));
};

/** Best-effort removal of a superseded file; never blocks the write. */
const removeStoredFile = async (storagePath) => {
  if (!storagePath) return;
  try {
    await adminStorage.bucket().file(storagePath).delete();
  } catch (error) {
    /* file already gone, or the bucket is not configured — not fatal */
  }
};

export default async function handler(req, res) {
  const { slot } = req.query;

  if (!slot || !isKnownSlot(slot)) {
    return res.status(404).json({ message: 'Unknown image slot.' });
  }

  const docRef = adminDb.collection(MEDIA_COLLECTION).doc(slot);

  if (req.method === 'PUT') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    const { url, alt, focalX, focalY, storagePath, width, height } = req.body || {};

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ message: 'An image URL is required.' });
    }

    try {
      const existing = await docRef.get();
      const previousPath = existing.exists ? existing.data()?.storagePath : '';

      await docRef.set(
        {
          url,
          alt: typeof alt === 'string' ? alt.slice(0, 300) : '',
          focalX: clampPercent(focalX),
          focalY: clampPercent(focalY),
          storagePath: storagePath || '',
          width: Number(width) || null,
          height: Number(height) || null,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedBy: adminUser.email || ''
        },
        { merge: true }
      );

      // Drop the file this upload replaced so the bucket does not accumulate
      // every previous version of every slot.
      if (previousPath && previousPath !== storagePath) {
        await removeStoredFile(previousPath);
      }

      return res.status(200).json({ message: 'Image saved.' });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Unable to save the image.' });
    }
  }

  if (req.method === 'DELETE') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    try {
      const existing = await docRef.get();
      if (existing.exists) {
        await removeStoredFile(existing.data()?.storagePath);
        await docRef.delete();
      }
      return res.status(200).json({ message: 'Reset to the reference image.' });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Unable to reset the image.' });
    }
  }

  res.setHeader('Allow', 'PUT, DELETE');
  return res.status(405).json({ message: 'Method not allowed.' });
}
