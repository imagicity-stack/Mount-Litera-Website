import { adminAuth } from '@/lib/firebaseAdmin';

const getAllowedEmails = () =>
  (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

/**
 * One-time provisioning of the administrator account.
 *
 * Creates the Firebase Auth user for the allowlisted address using
 * ADMIN_INITIAL_PASSWORD so that the very first sign-in is possible. The
 * portal then forces that password to be changed before anything else.
 *
 * Deliberately refuses to touch an account that already exists: without that
 * rule this endpoint would be a password reset for anyone who found it. Once
 * the administrator has signed in, the safe recovery path is the reset-link
 * flow on the login screen.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
  const allowlist = getAllowedEmails();

  if (!initialPassword || allowlist.length === 0) {
    return res.status(404).json({ message: 'Provisioning is not available.' });
  }

  if (initialPassword.length < 8) {
    return res
      .status(500)
      .json({ message: 'ADMIN_INITIAL_PASSWORD must be at least 8 characters.' });
  }

  const email = allowlist[0];

  try {
    await adminAuth.getUserByEmail(email);
    // Already provisioned — never re-issue a password for a live account.
    return res.status(200).json({ created: false, message: 'The account already exists.' });
  } catch (error) {
    if (error?.code !== 'auth/user-not-found') {
      return res.status(500).json({ message: 'Could not check the administrator account.' });
    }
  }

  try {
    const created = await adminAuth.createUser({
      email,
      password: initialPassword,
      emailVerified: false,
      disabled: false
    });

    // Storage rules require this claim; setting it now means the first token
    // the account is ever issued can already upload.
    await adminAuth.setCustomUserClaims(created.uid, { admin: true });

    return res.status(201).json({
      created: true,
      message: 'Administrator account created. Sign in and set a new password.'
    });
  } catch (error) {
    return res.status(500).json({ message: 'Could not create the administrator account.' });
  }
}
