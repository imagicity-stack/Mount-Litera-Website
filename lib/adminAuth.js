import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

const USERS_COLLECTION = 'users';

const extractToken = (req) => {
  const authHeader = req.headers.authorization || '';
  return authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length).trim() : null;
};

/**
 * Resolve whether the bearer token belongs to an authorised admin.
 *
 * Identity comes from Firebase Authentication (email and password) and
 * authorisation comes from Firestore: a `users/{uid}` document with
 * `role === 'admin'`. There is no environment allowlist and no way to grant
 * yourself the role through the application — the document is created by hand
 * in the Firebase console, which is the only step that confers access.
 *
 * Never throws; returns a descriptor callers can inspect.
 */
export const resolveAdmin = async (req) => {
  const token = extractToken(req);
  if (!token) {
    return { ok: false, status: 401, reason: 'Missing authentication token.' };
  }

  let decoded;
  try {
    decoded = await adminAuth.verifyIdToken(token);
  } catch (error) {
    return { ok: false, status: 401, reason: 'Invalid or expired session.' };
  }

  let role = null;
  let passwordChangedAt = null;
  try {
    const userDoc = await adminDb.collection(USERS_COLLECTION).doc(decoded.uid).get();
    if (userDoc.exists) {
      const data = userDoc.data() || {};
      role = data.role || null;
      passwordChangedAt = data.passwordChangedAt || null;
    }
  } catch (error) {
    // A Firestore outage must not accidentally grant access.
    role = null;
  }

  const isAdmin = role === 'admin';

  return {
    ok: isAdmin,
    status: isAdmin ? 200 : 403,
    reason: isAdmin ? '' : 'This account is not authorised for the admin portal.',
    uid: decoded.uid,
    email: decoded.email || '',
    name: decoded.name || '',
    picture: decoded.picture || '',
    role,
    // The account is still on the password it was issued with until the portal
    // records a rotation, so the first sign-in is forced through a change.
    mustChangePassword: !passwordChangedAt,
    // Storage rules gate uploads on this custom claim. It is minted into the
    // ID token, so a freshly granted claim is only visible after a refresh.
    hasAdminClaim: decoded.admin === true
  };
};

/**
 * Guard helper for API routes. Returns the admin descriptor on success or
 * writes the appropriate error response and returns null.
 */
export const requireAdmin = async (req, res) => {
  const result = await resolveAdmin(req);
  if (!result.ok) {
    res.status(result.status).json({ message: result.reason });
    return null;
  }
  return result;
};

export const USERS_COLLECTION_NAME = USERS_COLLECTION;
