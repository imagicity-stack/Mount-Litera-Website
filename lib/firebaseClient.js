import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// The Firebase web config is pulled from Vercel environment variables.
// Two formats are supported so deployments stay flexible:
//   1. Individual NEXT_PUBLIC_FIREBASE_* variables (recommended).
//   2. A single NEXT_PUBLIC_FIREBASE_CONFIG variable holding the JSON blob
//      copied straight out of the Firebase console.
const parseConfigBlob = () => {
  const raw = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (error) {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn('NEXT_PUBLIC_FIREBASE_CONFIG is not valid JSON.');
    }
    return {};
  }
};

const blob = parseConfigBlob();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || blob.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || blob.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || blob.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || blob.storageBucket,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || blob.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || blob.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || blob.measurementId
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Initialise services defensively. With a valid config (Vercel inlines the
// NEXT_PUBLIC_* vars at build time) these succeed; without one — e.g. a
// preview build with no env — getAuth would otherwise throw at import.
const initService = (factory, label) => {
  try {
    return factory(app);
  } catch (error) {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn(`Firebase ${label} unavailable:`, error.message);
    }
    return null;
  }
};

export const firebaseApp = app;
export const firebaseAuth = initService(getAuth, 'auth');
export const firebaseDb = initService(getFirestore, 'firestore');
export const firebaseStorage = initService(getStorage, 'storage');

// The portal authenticates with email and password only — no federated
// providers are configured or exported.

// Keep the admin signed in across reloads of the portal.
if (typeof window !== 'undefined' && firebaseAuth) {
  setPersistence(firebaseAuth, browserLocalPersistence).catch(() => {
    /* ignore — falls back to in-memory persistence */
  });
}
