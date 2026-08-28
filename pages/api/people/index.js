import admin from 'firebase-admin';

import { adminDb } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';
import { PEOPLE_COLLECTION, isKnownGroup } from '@/lib/peopleGroups';

const serialize = (doc) => {
  const d = doc.data() || {};
  return {
    id: doc.id,
    group: d.group || '',
    name: d.name || '',
    designation: d.designation || '',
    department: d.department || '',
    photo: d.photo || '',
    photoPath: d.photoPath || '',
    bio: d.bio || '',
    order: typeof d.order === 'number' ? d.order : 0,
    status: d.status || 'published',
    updatedAt: d.updatedAt ? d.updatedAt.toDate().toISOString() : null
  };
};

const clean = (body) => {
  const name = (body.name || '').trim();
  return {
    group: body.group,
    name,
    designation: (body.designation || '').trim().slice(0, 120),
    department: (body.department || '').trim().slice(0, 120),
    photo: (body.photo || '').trim(),
    photoPath: (body.photoPath || '').trim(),
    bio: (body.bio || '').trim().slice(0, 2000),
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    status: body.status === 'hidden' ? 'hidden' : 'published'
  };
};

const sortPeople = (a, b) =>
  a.order - b.order || a.name.localeCompare(b.name);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const wantsAll = req.query.all === '1';

    // The admin view needs hidden entries too, so it is guarded.
    if (wantsAll) {
      const adminUser = await requireAdmin(req, res);
      if (!adminUser) return undefined;
    }

    res.setHeader(
      'Cache-Control',
      wantsAll ? 'no-store' : 'public, max-age=0, s-maxage=60, stale-while-revalidate=300'
    );

    try {
      const snapshot = await adminDb.collection(PEOPLE_COLLECTION).get();
      const people = snapshot.docs
        .map(serialize)
        .filter((p) => isKnownGroup(p.group))
        .filter((p) => (wantsAll ? true : p.status === 'published'))
        .sort(sortPeople);
      return res.status(200).json({ people });
    } catch (error) {
      // Never fail the public site over this: an empty list makes the pages
      // fall back to the roster they shipped with.
      if (wantsAll) {
        return res.status(500).json({ message: 'Could not load the directory.' });
      }
      return res.status(200).json({ people: [], degraded: true });
    }
  }

  if (req.method === 'POST') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    const payload = clean(req.body || {});

    if (!payload.name) {
      return res.status(400).json({ message: 'A name is required.' });
    }
    if (!isKnownGroup(payload.group)) {
      return res.status(400).json({ message: 'Unknown group.' });
    }

    try {
      const docRef = await adminDb.collection(PEOPLE_COLLECTION).add({
        ...payload,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: adminUser.email || ''
      });
      return res.status(201).json({ id: docRef.id });
    } catch (error) {
      return res.status(500).json({ message: 'Could not add this person.' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ message: 'Method not allowed.' });
}
