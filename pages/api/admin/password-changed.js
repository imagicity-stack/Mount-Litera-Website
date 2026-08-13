import admin from 'firebase-admin';

import { adminDb } from '@/lib/firebaseAdmin';
import { requireAdmin, USERS_COLLECTION_NAME } from '@/lib/adminAuth';

/**
 * Records that the administrator has rotated the password they were issued
 * with. Until this stamp exists, /api/admin/verify reports
 * `mustChangePassword` and the portal holds the session on the change screen.
 *
 * The rotation itself happens client-side against Firebase Auth; this only
 * marks that it happened, and only for the caller's own account.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return undefined;

  try {
    await adminDb
      .collection(USERS_COLLECTION_NAME)
      .doc(adminUser.uid)
      .set(
        {
          email: adminUser.email || '',
          role: 'admin',
          passwordChangedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );

    return res.status(200).json({ message: 'Password rotation recorded.' });
  } catch (error) {
    return res.status(500).json({ message: 'Could not record the password change.' });
  }
}
