# Mount Litera Website — Admin Portal, Blogs & Popups

A Firebase-powered content platform with a public `/blogs` experience and a
state-of-the-art admin portal at **`/admin`** (Google sign-in).

> The admin previously lived at `/blogs/admin`. That URL now permanently
> redirects to `/admin`.

## Features
- **`/admin` portal** with Google authentication and a dark, dashboard-style UI.
- **WordPress-like blog studio**: rich-text editor, featured images, drafts,
  scheduling, categories, and tags.
- **Live SEO analytics** (Yoast-style): focus-keyword checks, readability,
  keyword density, length checks, and a Google search snippet preview.
- **Gemini AI SEO assistant**: one-click SEO titles, meta descriptions,
  excerpts, keyword & title ideas, outlines, and improvement suggestions.
- **Ultra-advanced popup manager**: build, theme, target, schedule, and
  A/B-style measure on-site campaigns (impressions, clicks, CTR) — center
  modals, slide-ins, banners, and fullscreen takeovers.
- **Enhanced public blog page** with a dedicated mobile feed and an
  immersive reading modal (reading progress, share, deep-link).
- Firebase Authentication (Google), Firestore, and Storage.
- Firebase Admin SDK-backed API routes for secure CRUD operations.
- All Firebase config is read from **Vercel environment variables**.

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
3. Enable **Authentication → Google** (add your production domain + `localhost`
   to the authorised domains list).
4. Create a **Firestore Database**.
5. Create a **Storage** bucket.

### 2) Authorise admin accounts
Admin access is granted when **either** condition is met:

**Option A — email allowlist (recommended, simplest):**
Set `ADMIN_EMAILS` in Vercel to a comma-separated list of authorised Google
accounts, e.g. `ADMIN_EMAILS=principal@eldenheights.org,admin@eldenheights.org`.
Anyone who signs in with Google using one of those emails becomes an admin.

**Option B — Firestore role:**
1. In Firestore, create a collection named **`users`**.
2. Create a document with the signed-in user’s `uid` as the document ID.
3. Add a field: `role = "admin"`.

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

All keys below are configured in **Vercel → Project → Settings → Environment
Variables** (and optionally `.env.local` for local dev).

### Client (Next.js public — Firebase web config)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```
> Alternatively, paste the whole web config object as a single JSON variable:
> `NEXT_PUBLIC_FIREBASE_CONFIG={"apiKey":"…","authDomain":"…", …}`

### Server (Admin SDK + integrations)
```
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_STORAGE_BUCKET=

# Admin authorisation (comma separated Google emails)
ADMIN_EMAILS=admin@eldenheights.org

# Gemini SEO assistant
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash   # optional, this is the default

# Email — Microsoft 365 / Outlook (Contact, Admission & Success Meter)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com   # full Microsoft 365 mailbox address
SMTP_PASS=                         # mailbox password, or an app password if MFA is on
SMTP_FROM=noreply@yourdomain.com   # must match SMTP_USER (or a mailbox it has "Send As" rights on)

# Where each form's enquiries are delivered (all optional — sensible defaults exist)
CONTACT_TO=contact@yourdomain.com       # /api/contact
ADMISSION_TO=admission@yourdomain.com   # /api/admission (parent gets an auto-acknowledgement)
SUCCESS_METER_TO=contact@yourdomain.com # /api/successmeter
```

> **Migrating from Google Workspace to Microsoft 365 / Outlook:** no code change is
> required — the mailer (`lib/mailer.js`) is provider-agnostic. Only the env vars
> above change. Point the values at your Microsoft tenant instead of Gmail:
>
> | Setting | Google Workspace (old) | Microsoft 365 / Outlook (new) |
> | --- | --- | --- |
> | `SMTP_HOST` | `smtp.gmail.com` | `smtp.office365.com` (business/custom domain) — or `smtp-mail.outlook.com` for a personal @outlook.com mailbox |
> | `SMTP_PORT` | `587` | `587` (STARTTLS — unchanged) |
> | `SMTP_USER` | Gmail address | full Microsoft 365 mailbox address |
> | `SMTP_PASS` | Google app password | mailbox password, or a Microsoft **app password** if MFA is enabled |
>
> **Microsoft-specific gotchas (these differ from Gmail and cause most failures):**
> 1. **Enable Authenticated SMTP on the mailbox.** It is off by default in M365.
>    Admin center → Users → *(mailbox)* → Mail → *Manage email apps* → tick
>    **Authenticated SMTP**. Or PowerShell:
>    `Set-CASMailbox -Identity noreply@yourdomain.com -SmtpClientAuthenticationDisabled $false`
>    (and ensure it isn't blocked tenant-wide via `Set-TransportConfig`).
> 2. **`SMTP_FROM` must match the authenticated mailbox** (or one it has *Send As* /
>    *Send on Behalf* permission for). Microsoft rejects mismatches with
>    `5.7.60 Client does not have permissions to send as this user` — Gmail was more
>    lenient here.
> 3. **MFA mailboxes can't use the normal password** for SMTP — generate an app
>    password, or (cleaner) use a dedicated `noreply@` mailbox with SMTP AUTH enabled.
>
> **⚠️ Basic-auth SMTP is being retired.** Microsoft is phasing out username/password
> SMTP AUTH: it keeps working through **December 2026**, after which it is disabled by
> default for existing tenants (admins can re-enable for now; final removal to be
> announced in H2 2027). Before then, plan a move to a modern method — OAuth 2.0
> (XOAUTH2, which `nodemailer` supports), the Microsoft Graph API, or Azure
> Communication Services.
> Alternatively, paste the full service-account JSON as a single variable:
> `FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"…", …}`

> **Note:** When setting `FIREBASE_PRIVATE_KEY` directly, paste the full key and
> replace line breaks with `\n`.

> **Gemini key:** create one at [Google AI Studio](https://aistudio.google.com/app/apikey).
> Without it, the editor still works — the AI buttons simply report that the
> assistant is not configured.

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
- **Admin portal:** http://localhost:3000/admin

---

## Popups (`popups` collection)
Popups are managed entirely from **Admin → Popups** and stored in a `popups`
Firestore collection. Each document supports layout (modal / slide-in / banner /
fullscreen), theme, content, CTAs, trigger (delay / scroll / exit / immediate),
frequency, page targeting, scheduling, priority, and live analytics
(`impressions`, `clicks`). The public site renders them via the global
`PopupManager` and records impressions/clicks through `POST /api/popups/track`.

## Security Notes
- Admin access requires a Google sign-in whose email is in `ADMIN_EMAILS`
  **or** a Firestore `users/{uid}` doc with `role = "admin"`.
- All blog, popup, and Gemini routes validate the Firebase ID token server-side
  via the Admin SDK before any write.
- The `/admin` route is `noindex, nofollow` and is not linked publicly.

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
    match /popups/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
