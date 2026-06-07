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

const toTimestamp = (value) =>
  value ? admin.firestore.Timestamp.fromDate(new Date(value)) : null;

const serialize = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
    updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
    publishedAt: data.publishedAt ? data.publishedAt.toDate().toISOString() : null,
    scheduledAt: data.scheduledAt ? data.scheduledAt.toDate().toISOString() : null
  };
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
      let blogs = snapshot.docs.map(serialize);

      // For the public listing, hide posts scheduled for the future.
      if (status === 'published') {
        const now = Date.now();
        blogs = blogs.filter((b) => {
          if (!b.scheduledAt) return true;
          return new Date(b.scheduledAt).getTime() <= now;
        });
      }

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
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return undefined;

    try {
      const {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        coverImageAlt,
        coverImageCaption,
        coverImageCredit,
        coverImageSource,
        authorName,
        authorTitle,
        tags = [],
        category = '',
        status = 'draft',
        seoTitle,
        seoDescription,
        seoKeywords,
        focusKeyword = '',
        canonicalUrl,
        publishedAt,
        scheduledAt,
        seoScore = null,
        readabilityScore = null
      } = req.body;

      const resolvedSlug = slug ? slugify(slug) : slugify(title || '');

      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
      }

      const readingTime = getReadingTime(content);
      const resolvedPublishedAt =
        status === 'published' && !publishedAt ? new Date().toISOString() : publishedAt;

      const docRef = await adminDb.collection(COLLECTION).add({
        title,
        slug: resolvedSlug,
        excerpt: excerpt || '',
        content,
        coverImage: coverImage || '',
        coverImageAlt: coverImageAlt || '',
        coverImageCaption: coverImageCaption || '',
        coverImageCredit: coverImageCredit || '',
        coverImageSource: coverImageSource || '',
        authorName: authorName || 'Editorial Team',
        authorTitle: authorTitle || 'Elden Heights School',
        tags,
        category,
        status,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt || '',
        seoKeywords: seoKeywords || '',
        focusKeyword,
        canonicalUrl: canonicalUrl || '',
        seoScore,
        readabilityScore,
        publishedAt: toTimestamp(resolvedPublishedAt),
        scheduledAt: toTimestamp(scheduledAt),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        readingTime,
        authorEmail: adminUser.email || ''
      });

      return res.status(201).json({ id: docRef.id, slug: resolvedSlug });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Unable to save blog.' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ message: 'Method not allowed.' });
}
