import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

const USERS_COLLECTION = 'users';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ message: 'Missing token.' });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const userDoc = await adminDb.collection(USERS_COLLECTION).doc(decoded.uid).get();
    const role = userDoc.exists ? userDoc.data()?.role : null;
    const isAdmin = role === 'admin';

    return res.status(200).json({ isAdmin, uid: decoded.uid, role });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}
