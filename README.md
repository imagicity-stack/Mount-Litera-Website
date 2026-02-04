# Mount Litera Website — Blogs & CMS

This update introduces a Firebase-powered blog system with a public `/blogs` page and a secure admin CMS at `/blogs/admin`.

## Features
- SEO-optimized blog landing and detail pages.
- Expandable news cards with smooth animations.
- WordPress-like admin studio for publishing, editing, and deleting posts.
- Firebase Authentication for admin login.
- Firebase Storage for blog cover images.
- Firebase Admin SDK-backed API routes for secure CRUD operations.

---

## Firebase Setup

### 1) Create a Firebase project
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Enable **Authentication → Email/Password**.
4. Create a **Firestore Database**.
5. Create a **Storage** bucket.

### 2) Create an Admin user
1. Add a user under **Authentication**.
2. In Firestore, create a collection named **`users`**.
3. Create a document with the user’s `uid` as the document ID.
4. Add a field: `role = "admin"`.

### 3) Firestore collections & fields

**Collection: `blogs`**
| Field | Type | Description |
| --- | --- | --- |
| `title` | string | Blog title |
| `slug` | string | URL slug |
| `excerpt` | string | Short summary |
| `content` | string | Full text content |
| `coverImage` | string | Firebase Storage URL |
| `authorName` | string | Author display name |
| `authorTitle` | string | Author role/title |
| `tags` | array<string> | Tags for filtering |
| `status` | string | `draft` or `published` |
| `seoTitle` | string | SEO title |
| `seoDescription` | string | SEO meta description |
| `readingTime` | number | Approx. minutes read |
| `publishedAt` | timestamp | Published date |
| `createdAt` | timestamp | Created date |
| `updatedAt` | timestamp | Updated date |

**Recommended index**
- Collection: `blogs`
- Fields: `status` (Ascending), `createdAt` (Descending)

---

## Environment Variables

### Client (Next.js public)
Add these to `.env.local` (and Vercel):
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### Server (Admin SDK)
Add these to `.env.local` (and Vercel):
```
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_STORAGE_BUCKET=
```

> **Note:** When setting `FIREBASE_PRIVATE_KEY` in Vercel, paste the full key and replace line breaks with `\n`.

---

## Running Locally
```
npm install
npm run dev
```

Visit:
- **Public blog page:** http://localhost:3000/blogs
- **Admin CMS:** http://localhost:3000/blogs/admin

---

## Security Notes
- Only authenticated users with `role = "admin"` in Firestore can create/edit/delete blogs.
- All CRUD routes use the Firebase Admin SDK for secure validation.

---

## Firebase Storage Rules (Recommended)
Use Storage rules to allow authenticated admins to upload blog images. Replace the example project ID as needed.

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /blogs/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
