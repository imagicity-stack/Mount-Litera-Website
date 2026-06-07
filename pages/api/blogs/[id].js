import slugify from '@/lib/slugify';
import { adminDb } from '@/lib/firebaseAdmin';
import { requireAdmin } from '@/lib/adminAuth';
import admin from 'firebase-admin';

const COLLECTION = 'blogs';

const getReadingTime = (content = '') => {
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return 1;
  return Math.max(1, Math.round(text.split(' ').length / 200));
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Missing blog id.' });
  }

  if (req.method === 'PUT') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    try {
      const updates = {
        ...req.body,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      if (updates.slug) {
        updates.slug = slugify(updates.slug);
      }

      if (updates.publishedAt) {
        updates.publishedAt = admin.firestore.Timestamp.fromDate(new Date(updates.publishedAt));
      } else if (updates.status === 'published') {
        updates.publishedAt = admin.firestore.FieldValue.serverTimestamp();
      }

      if ('scheduledAt' in updates) {
        updates.scheduledAt = updates.scheduledAt
          ? admin.firestore.Timestamp.fromDate(new Date(updates.scheduledAt))
          : null;
      }

      if (updates.content) {
        updates.readingTime = getReadingTime(updates.content);
      }

      await adminDb.collection(COLLECTION).doc(id).set(updates, { merge: true });

      return res.status(200).json({ message: 'Blog updated.' });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Unable to update blog.' });
    }
  }

  if (req.method === 'DELETE') {
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    try {
      await adminDb.collection(COLLECTION).doc(id).delete();
      return res.status(200).json({ message: 'Blog deleted.' });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Unable to delete blog.' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).json({ message: 'Method not allowed.' });
}
