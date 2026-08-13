import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

const USERS_COLLECTION = 'users';

const getAllowedEmails = () =>
  (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

const extractToken = (req) => {
  const authHeader = req.headers.authorization || '';
  return authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length).trim() : null;
};

/**
 * Resolve whether the bearer token belongs to an authorised admin.
 * Admin status is granted when EITHER:
 *   - the verified email is present in the ADMIN_EMAILS allowlist, OR
 *   - a `users/{uid}` document exists with `role === 'admin'`.
 * Returns a descriptor that callers can inspect; never throws.
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

  const email = (decoded.email || '').toLowerCase();
  const allowlist = getAllowedEmails();
  const allowlisted = email && allowlist.includes(email);

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
    role = null;
  }

  const isAdmin = allowlisted || role === 'admin';

  return {
    ok: isAdmin,
    status: isAdmin ? 200 : 403,
    reason: isAdmin ? '' : 'This account is not authorised for the admin portal.',
    uid: decoded.uid,
    email: decoded.email || '',
    name: decoded.name || '',
    picture: decoded.picture || '',
    role: role || (allowlisted ? 'admin' : null),
    // The account is still on the password it was issued with until the portal
    // records a rotation, so the first sign-in is forced through a change.
    mustChangePassword: !passwordChangedAt,
    // Storage rules gate uploads on this custom claim. It is minted into the
    // ID token, so a freshly granted claim is only visible after a refresh.
    hasAdminClaim: decoded.admin === true
  };
};

export const USERS_COLLECTION_NAME = USERS_COLLECTION;

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
