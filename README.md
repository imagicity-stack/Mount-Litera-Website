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

## Image Placeholder Map (Non-blog pages)
Each page now has a dedicated placeholder manifest in `/public/<page>/<page>.md` that lists the image names and totals. Example format: `banner -1`, `section -1`, `background -1` (counts by placement type).

### Page image counts by placement
- Home: banner -1, section -1, card background -4, feature -1, background -1.
- About: banner -1, section -1.
- Academics: banner -1, feature -1.
- Admission: banner -1.
- Admissions: banner -1.
- Awards & Recognition: banner -1.
- Beyond Academics: banner -1.
- Careers: banner -1.
- Co-Curricular Clubs: banner -1.
- Contact: banner -1.
- Core Mentors: banner -1.
- Core: banner -1.
- Disclosures: banner -1.
- Gallery: banner -1.
- Life Readiness Program: banner -1.
- Managing Committee: banner -1.
- New Initiatives: banner -1.
- Privacy Policy: banner -1.
- Terms & Conditions: banner -1.
- The Elden Council: banner -1.
- Payment Success: banner -1.
- Policies:
  - Admission Policy: banner -1.
  - Anti-Ragging Message: banner -1.
  - Code for Self-Discipline: banner -1.
  - Complaint Procedures: banner -1.
  - Disability Policy: banner -1.
  - Parent Child Contact Mechanism: banner -1.

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
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@eldenheights.org
SUCCESS_METER_TO=contact@eldenheights.org
```

> **Note:** When setting `FIREBASE_PRIVATE_KEY` in Vercel, paste the full key and replace line breaks with `\n`.

### Success Meter campaign flow
- Hidden campaign page is available at `/successmetere` and is marked `noindex` for search engines.
- Form submissions are posted to `POST /api/successmeter`.
- Server validates required fields + phone format, then emails the lead to `SUCCESS_METER_TO` (defaults to `contact@eldenheights.org`) from `SMTP_FROM` (defaults to `noreply@eldenheights.org`).
- Email includes all parent/student fields, quiz answers, timestamp, and source marker (`successmetere` or `successmeterh`) in both text and HTML formats.

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
