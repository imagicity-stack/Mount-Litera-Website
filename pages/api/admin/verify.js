import { resolveAdmin } from '@/lib/adminAuth';

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

  return res.status(200).json({
    isAdmin: result.ok,
    uid: result.uid,
    email: result.email,
    name: result.name,
    picture: result.picture,
    role: result.role,
    message: result.ok ? '' : result.reason
  });
}
