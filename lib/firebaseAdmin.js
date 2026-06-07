import admin from 'firebase-admin';

// Server-side Firebase Admin credentials come from Vercel environment variables.
// Two formats are supported:
//   1. A single FIREBASE_SERVICE_ACCOUNT variable containing the full service
//      account JSON (the file you download from the Firebase console).
//   2. Individual FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY.
const normalizeKey = (key) => (key ? key.replace(/\\n/g, '\n') : undefined);

const buildCredentials = () => {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return {
        projectId: parsed.project_id || parsed.projectId,
        clientEmail: parsed.client_email || parsed.clientEmail,
        privateKey: normalizeKey(parsed.private_key || parsed.privateKey),
        storageBucket: parsed.storage_bucket || parsed.storageBucket
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('FIREBASE_SERVICE_ACCOUNT is not valid JSON, falling back to individual vars.');
    }
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: normalizeKey(process.env.FIREBASE_PRIVATE_KEY),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  };
};

const credentials = buildCredentials();
const hasCredentials = Boolean(
  credentials.projectId && credentials.clientEmail && credentials.privateKey
);

const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || credentials.storageBucket;

if (!admin.apps.length) {
  try {
    admin.initializeApp(
      hasCredentials
        ? {
            credential: admin.credential.cert({
              projectId: credentials.projectId,
              clientEmail: credentials.clientEmail,
              privateKey: credentials.privateKey
            }),
            storageBucket
          }
        : {
            // No credentials present (e.g. a build/preview without env vars).
            // Initialise a bare app so importing this module never throws;
            // runtime API calls still require real credentials on Vercel.
            projectId: credentials.projectId,
            storageBucket
          }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Firebase Admin initialization warning:', error.message);
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();
