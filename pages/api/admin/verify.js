import { resolveAdmin } from '@/lib/adminAuth';
import { adminAuth } from '@/lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const result = await resolveAdmin(req);

  if (!result.uid) {
    // No valid token at all.
    return res.status(result.status).json({ isAdmin: false, message: result.reason });
  }

  // Storage rules gate uploads on an `admin` custom claim rather than on mere
  // authentication. Grant it here, where the allowlist has just been checked,
  // so authorisation has exactly one source of truth. The claim only reaches
  // the browser on the next token refresh, hence claimRefreshed.
  let claimRefreshed = false;
  if (result.ok && !result.hasAdminClaim) {
    try {
      await adminAuth.setCustomUserClaims(result.uid, { admin: true });
      claimRefreshed = true;
    } catch (error) {
      // Uploads will fail until this succeeds, but reading the portal should
      // not break — the next verify will retry.
    }
  }

  return res.status(200).json({
    isAdmin: result.ok,
    uid: result.uid,
    email: result.email,
    name: result.name,
    picture: result.picture,
    role: result.role,
    mustChangePassword: result.ok ? result.mustChangePassword : false,
    claimRefreshed,
    message: result.ok ? '' : result.reason
  });
}
