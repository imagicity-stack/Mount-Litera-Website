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
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Missing blog id.' });
  }

  if (req.method === 'PUT') {
    try {
      await getAdminFromRequest(req);
      const updates = {
        ...req.body,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      if (updates.publishedAt) {
        updates.publishedAt = admin.firestore.Timestamp.fromDate(new Date(updates.publishedAt));
      }

      if (updates.content) {
        updates.readingTime = Math.max(1, Math.round(updates.content.split(/\s+/).length / 200));
      }

      await adminDb.collection(COLLECTION).doc(id).set(updates, { merge: true });

      return res.status(200).json({ message: 'Blog updated.' });
    } catch (error) {
      return res.status(401).json({ message: error.message || 'Unauthorized.' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await getAdminFromRequest(req);
      await adminDb.collection(COLLECTION).doc(id).delete();

      return res.status(200).json({ message: 'Blog deleted.' });
    } catch (error) {
      return res.status(401).json({ message: error.message || 'Unauthorized.' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).json({ message: 'Method not allowed.' });
}
