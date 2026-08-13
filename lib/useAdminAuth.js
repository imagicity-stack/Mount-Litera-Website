import { useCallback, useEffect, useState } from 'react';
import {
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword
} from 'firebase/auth';

import { firebaseAuth, isFirebaseConfigured } from '@/lib/firebaseClient';

const friendlyError = (code, fallback) => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'That password is not correct.';
    case 'auth/invalid-email':
      return 'That email address is not valid.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Wait a few minutes and try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/weak-password':
      return 'Choose a password of at least 8 characters.';
    case 'auth/requires-recent-login':
      return 'For security, sign in again before changing the password.';
    case 'auth/network-request-failed':
      return 'Network problem — check the connection and try again.';
    // Setup mistakes rather than user mistakes. Security rules cannot enable a
    // sign-in provider, so this stays a manual step in the Firebase console and
    // is the likeliest thing to be missed on a fresh project.
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is switched off for this Firebase project. Enable it under Authentication → Sign-in method.';
    case 'auth/configuration-not-found':
      return 'Firebase Authentication is not set up for this project yet.';
    case 'auth/invalid-api-key':
    case 'auth/api-key-not-valid':
      return 'The Firebase web configuration for this deployment is not valid.';
    default:
      return fallback || 'Something went wrong. Please try again.';
  }
};

/**
 * Admin authentication for the /admin portal.
 *
 * Credentials live entirely in Firebase Authentication; the portal never sees
 * or stores a password. Authorisation is a separate question answered by the
 * server from Firestore (`users/{uid}.role === 'admin'`), so signing in
 * successfully is not the same as being let in.
 *
 * Phases: loading | signed-out | verifying | must-change-password | authorised
 *         | denied | error
 */
export default function useAdminAuth() {
  const [phase, setPhase] = useState('loading');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  const verify = useCallback(async (idToken) => {
    setPhase('verifying');
    try {
      const res = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      const data = await res.json();

      if (!res.ok || !data.isAdmin) {
        setPhase('denied');
        setError(data.message || 'This account is not authorised.');
        return;
      }

      // The server just minted the `admin` claim that Storage rules require.
      // Pull a fresh token so the very first upload of the session is allowed
      // rather than rejected by the bucket.
      if (data.claimRefreshed && firebaseAuth.currentUser) {
        try {
          setToken(await firebaseAuth.currentUser.getIdToken(true));
        } catch (err) {
          /* the next write refreshes it anyway */
        }
      }

      setProfile(data);
      // A brand new account has never rotated the password it was issued with.
      setPhase(data.mustChangePassword ? 'must-change-password' : 'authorised');
    } catch (err) {
      setPhase('error');
      setError('Unable to verify admin access. Please retry.');
    }
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      setPhase('error');
      setError('Firebase is not configured. Add the environment variables in your deployment.');
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (nextUser) => {
      if (!nextUser) {
        setUser(null);
        setToken('');
        setProfile(null);
        setPhase('signed-out');
        return;
      }

      setUser(nextUser);
      try {
        const idToken = await nextUser.getIdToken();
        setToken(idToken);
        await verify(idToken);
      } catch (err) {
        setPhase('error');
        setError('Could not read your session token.');
      }
    });

    return () => unsubscribe();
  }, [verify]);

  const signIn = useCallback(async (email, password) => {
    setError('');
    setNotice('');
    setBusy(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
    } catch (err) {
      setError(friendlyError(err?.code, err?.message));
    } finally {
      setBusy(false);
    }
  }, []);

  /**
   * Rotate the password. Re-authenticates with the current password first so
   * Firebase never rejects the change on a stale session, then stamps the
   * server-side flag that ends the first-run state.
   */
  const changePassword = useCallback(
    async (currentPassword, nextPassword) => {
      setError('');
      setNotice('');

      if (!nextPassword || nextPassword.length < 8) {
        setError('Choose a password of at least 8 characters.');
        return false;
      }
      if (nextPassword === currentPassword) {
        setError('The new password must be different from the current one.');
        return false;
      }

      const current = firebaseAuth.currentUser;
      if (!current) {
        setError('Your session expired. Sign in again.');
        return false;
      }

      setBusy(true);
      try {
        const credential = EmailAuthProvider.credential(current.email, currentPassword);
        await reauthenticateWithCredential(current, credential);
        await updatePassword(current, nextPassword);

        const idToken = await current.getIdToken(true);
        setToken(idToken);

        const res = await fetch('/api/admin/password-changed', {
          method: 'POST',
          headers: { Authorization: `Bearer ${idToken}` }
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Password changed, but the portal could not record it.');
        }

        await verify(idToken);
        setNotice('Password updated.');
        return true;
      } catch (err) {
        setError(friendlyError(err?.code, err?.message));
        return false;
      } finally {
        setBusy(false);
      }
    },
    [verify]
  );

  const resetPassword = useCallback(async (email) => {
    setError('');
    setNotice('');
    setBusy(true);
    try {
      await sendPasswordResetEmail(firebaseAuth, (email || '').trim());
      setNotice('If that address has an account, a reset link is on its way.');
    } catch (err) {
      // Do not leak whether the address exists.
      if (err?.code === 'auth/invalid-email') {
        setError('That email address is not valid.');
      } else {
        setNotice('If that address has an account, a reset link is on its way.');
      }
    } finally {
      setBusy(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(firebaseAuth);
  }, []);

  const getFreshToken = useCallback(async () => {
    if (!firebaseAuth?.currentUser) return token;
    const fresh = await firebaseAuth.currentUser.getIdToken();
    setToken(fresh);
    return fresh;
  }, [token]);

  return {
    phase,
    user,
    token,
    profile,
    error,
    notice,
    busy,
    signIn,
    changePassword,
    resetPassword,
    logout,
    getFreshToken
  };
}
