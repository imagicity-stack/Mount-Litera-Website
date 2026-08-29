import admin from 'firebase-admin';

import { adminDb } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';
import { CONTENT_ROOT, contentCollectionMap, isKnownCollection } from '@/lib/contentCollections';
import { serializeRecord, sanitizeRecord, missingRequired } from '@/lib/contentRecords';

const itemsRef = (key) => adminDb.collection(CONTENT_ROOT).doc(key).collection('items');

export default async function handler(req, res) {
  const { collection } = req.query;

  if (!collection || !isKnownCollection(collection)) {
    return res.status(404).json({ message: 'Unknown collection.' });
  }

  if (req.method === 'GET') {
    const wantsAll = req.query.all === '1';

    if (wantsAll) {
      const adminUser = await requireAdmin(req, res);
      if (!adminUser) return undefined;
    }

    res.setHeader(
      'Cache-Control',
      wantsAll ? 'no-store' : 'public, max-age=0, s-maxage=60, stale-while-revalidate=300'
    );

    try {
      const snapshot = await itemsRef(collection).get();
      const items = snapshot.docs
        .map((doc) => serializeRecord(collection, doc))
        .filter((item) => (wantsAll ? true : item.status === 'published'))
        .sort((a, b) => a.order - b.order);
      return res.status(200).json({ items });
    } catch (error) {
      // The public site falls back to the rows it shipped with, so an outage
      // shows the previous content rather than an empty page.
      if (wantsAll) return res.status(500).json({ message: 'Could not load this collection.' });
      return res.status(200).json({ items: [], degraded: true });
    }
  }

  if (req.method === 'POST') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    const record = sanitizeRecord(collection, req.body || {});
    const missing = missingRequired(collection, record);
    if (missing) {
      return res.status(400).json({ message: `${missing.label} is required.` });
    }

    // A keyed collection has a fixed set of rows (the eight houses), so a
    // write addresses a known id instead of creating a new document.
    const schema = contentCollectionMap[collection];
    if (schema.keyed) {
      const id = String(req.body?.key || '');
      if (!schema.keys.some((k) => k.key === id)) {
        return res.status(400).json({ message: 'Unknown entry for this collection.' });
      }
      try {
        await itemsRef(collection).doc(id).set(
          {
            ...record,
            key: id,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedBy: adminUser.email || ''
          },
          { merge: true }
        );
        return res.status(200).json({ id });
      } catch (error) {
        return res.status(500).json({ message: 'Could not save this entry.' });
      }
    }

    try {
      const docRef = await itemsRef(collection).add({
        ...record,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: adminUser.email || ''
      });
      return res.status(201).json({ id: docRef.id });
    } catch (error) {
      return res.status(500).json({ message: 'Could not save this entry.' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ message: 'Method not allowed.' });
}
