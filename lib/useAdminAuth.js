import { useCallback, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth';
import { firebaseAuth, googleProvider, isFirebaseConfigured } from '@/lib/firebaseClient';

/**
 * Centralised admin authentication for the /admin portal.
 * Handles Google sign-in, id-token retrieval, and server-side admin
 * verification (ADMIN_EMAILS allowlist or Firestore role).
 */
export default function useAdminAuth() {
  const [phase, setPhase] = useState('loading'); // loading | signed-out | verifying | authorised | denied | error
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const verify = useCallback(async (idToken) => {
    setPhase('verifying');
    try {
      const res = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      const data = await res.json();
      if (res.ok && data.isAdmin) {
        setProfile(data);
        setPhase('authorised');
      } else {
        setPhase('denied');
        setError(data.message || 'This account is not authorised.');
      }
    } catch (err) {
      setPhase('error');
      setError('Unable to verify admin access. Please retry.');
    }
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setPhase('error');
      setError('Firebase is not configured. Add the environment variables in Vercel.');
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (nextUser) => {
      if (nextUser) {
        setUser(nextUser);
        try {
          const idToken = await nextUser.getIdToken();
          setToken(idToken);
          await verify(idToken);
        } catch (err) {
          setPhase('error');
          setError('Could not read your session token.');
        }
      } else {
        setUser(null);
        setToken('');
        setProfile(null);
        setPhase('signed-out');
      }
    });

    return () => unsubscribe();
  }, [verify]);

  const signIn = useCallback(async () => {
    setError('');
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (err) {
      const credential = GoogleAuthProvider.credentialFromError?.(err);
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        return; // user dismissed — no error needed
      }
      setError(credential ? 'Google sign-in failed.' : err?.message || 'Sign-in failed.');
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(firebaseAuth);
  }, []);

  // Always hand back a fresh token for write operations.
  const getFreshToken = useCallback(async () => {
    if (!firebaseAuth.currentUser) return token;
    const fresh = await firebaseAuth.currentUser.getIdToken();
    setToken(fresh);
    return fresh;
  }, [token]);

  return { phase, user, token, profile, error, signIn, logout, getFreshToken };
}
