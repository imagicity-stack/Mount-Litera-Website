import { adminDb } from '@/lib/firebaseAdmin';
import { MEDIA_COLLECTION, isKnownSlot } from '@/lib/mediaSlots';

const serialize = (doc) => {
  const data = doc.data() || {};
  return {
    url: data.url || '',
    alt: data.alt || '',
    focalX: typeof data.focalX === 'number' ? data.focalX : 50,
    focalY: typeof data.focalY === 'number' ? data.focalY : 50,
    storagePath: data.storagePath || '',
    updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
    updatedBy: data.updatedBy || ''
  };
};

/**
 * Public map of managed images: { [slotKey]: { url, alt, focalX, focalY } }.
 *
 * Always answers 200. When Firebase is unreachable or nothing has been
 * uploaded yet the map is simply empty and the site renders the reference
 * images shipped in /public, so a broken backend never blanks the site.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');

  try {
    const snapshot = await adminDb.collection(MEDIA_COLLECTION).get();
    const media = {};

    snapshot.docs.forEach((doc) => {
      // Ignore records for slots that no longer exist in the registry.
      if (!isKnownSlot(doc.id)) return;
      const entry = serialize(doc);
      if (entry.url) media[doc.id] = entry;
    });

    return res.status(200).json({ media });
  } catch (error) {
    return res.status(200).json({ media: {}, degraded: true });
  }
}
