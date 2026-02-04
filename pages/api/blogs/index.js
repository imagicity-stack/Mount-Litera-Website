import slugify from '@/lib/slugify';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';
import admin from 'firebase-admin';

const COLLECTION = 'blogs';

const getAdminFromRequest = async (req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    throw new Error('Missing token.');
  }

  const decoded = await adminAuth.verifyIdToken(token);
  const userDoc = await adminDb.collection('users').doc(decoded.uid).get();
  const role = userDoc.exists ? userDoc.data()?.role : null;

  if (role !== 'admin') {
    throw new Error('Unauthorized.');
  }

  return decoded.uid;
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      const status = req.query.status;
      let query = adminDb.collection(COLLECTION);

      if (status) {
        query = query.where('status', '==', status);
      } else {
        query = query.orderBy('createdAt', 'desc');
      }

      const snapshot = await query.get();
      const blogs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
          updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
          publishedAt: data.publishedAt ? data.publishedAt.toDate().toISOString() : null
        };
      });
      if (status) {
        blogs.sort((a, b) => {
          const aDate = a.publishedAt || a.createdAt || 0;
          const bDate = b.publishedAt || b.createdAt || 0;
          return new Date(bDate) - new Date(aDate);
        });
      }

      return res.status(200).json({ blogs });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to load blogs.' });
    }
  }

  if (req.method === 'POST') {
    try {
      await getAdminFromRequest(req);
      const {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        authorName,
        authorTitle,
        tags = [],
        status = 'draft',
        seoTitle,
        seoDescription,
        publishedAt
      } = req.body;

      const resolvedSlug = slug ? slugify(slug) : slugify(title || '');

      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
      }

      const readingTime = Math.max(1, Math.round(content.split(/\s+/).length / 200));

      const docRef = await adminDb.collection(COLLECTION).add({
        title,
        slug: resolvedSlug,
        excerpt: excerpt || '',
        content,
        coverImage: coverImage || '',
        authorName: authorName || 'Editorial Team',
        authorTitle: authorTitle || 'Elden Heights School',
        tags,
        status,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || '',
        publishedAt: publishedAt ? admin.firestore.Timestamp.fromDate(new Date(publishedAt)) : null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        readingTime
      });

      return res.status(201).json({ id: docRef.id, slug: resolvedSlug });
    } catch (error) {
      return res.status(401).json({ message: error.message || 'Unauthorized.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ message: 'Method not allowed.' });
}
