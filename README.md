# Mount Litera Website — Admin Portal, Blogs & Popups

A Firebase-powered content platform with a public `/blogs` experience and a
state-of-the-art admin portal at **`/admin`** (Google sign-in).

> The admin previously lived at `/blogs/admin`. That URL now permanently
> redirects to `/admin`.

## Features
- **`/admin` portal** with email/password authentication (no federated
  sign-in) and a forced password change on the first login.
- **Site Images library**: every managed photograph on the public site,
  uploadable from the portal with a reference image shown for comparison.
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
- Firebase Authentication (email/password), Firestore, and Storage.
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
3. Enable **Authentication → Sign-in method → Email/Password**. This is a
   manual console step — security rules cannot switch a provider on, and
   `/api/admin/bootstrap` will happily create the account without it, so the
   failure shows up later as a refused sign-in. (Google sign-in is *not* used
   by the portal and does not need to be enabled.)
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

# The administrator address shown on the /admin login screen.
NEXT_PUBLIC_ADMIN_EMAIL=admin@eldenheights.org
```
> Alternatively, paste the whole web config object as a single JSON variable:
> `NEXT_PUBLIC_FIREBASE_CONFIG={"apiKey":"…","authDomain":"…", …}`

### Server (Admin SDK + integrations)
```
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_STORAGE_BUCKET=

# Admin authorisation (comma separated; the first entry is the account that
# /api/admin/bootstrap provisions)
ADMIN_EMAILS=admin@eldenheights.org

# One-time bootstrap password for the very first sign-in. Remove after the
# administrator has set their own password.
ADMIN_INITIAL_PASSWORD=

# Gemini SEO assistant
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash   # optional, this is the default

# Email — Microsoft Graph API (recommended: Contact, Admission & Success Meter)
MS_TENANT_ID=              # Entra "Directory (tenant) ID"
MS_CLIENT_ID=             # Entra app "Application (client) ID"
MS_CLIENT_SECRET=          # Entra app client-secret VALUE (not the secret ID)
MS_SENDER=noreply@yourdomain.com   # mailbox the site sends AS (must be licensed)

# Where each form's enquiries are delivered (all optional — sensible defaults exist)
CONTACT_TO=contact@yourdomain.com       # /api/contact
ADMISSION_TO=admission@yourdomain.com   # /api/admission (parent gets an auto-acknowledgement)
SUCCESS_METER_TO=contact@yourdomain.com # /api/successmeter
```

The mailer (`lib/mailer.js`) uses **Microsoft Graph** when the four `MS_*` vars are
set, and falls back to SMTP otherwise. Graph is app-only (OAuth client credentials),
so it needs **no mailbox password**, works with **Security Defaults / MFA left ON**,
and is unaffected by the December 2026 SMTP basic-auth retirement.

> **One-time Entra (Azure AD) app registration** — do this once in the
> [Entra admin center](https://entra.microsoft.com) as a Global/Application admin:
> 1. **Identity → Applications → App registrations → New registration.** Name it
>    e.g. `Website Mailer`, leave redirect URI blank, **Register**. On the overview
>    page copy the **Application (client) ID** → `MS_CLIENT_ID` and the
>    **Directory (tenant) ID** → `MS_TENANT_ID`.
> 2. **API permissions → Add a permission → Microsoft Graph → Application permissions**
>    → search **`Mail.Send`** → add it. Then click **Grant admin consent for
>    &lt;tenant&gt;** (the row must show a green "Granted" tick).
> 3. **Certificates & secrets → Client secrets → New client secret.** Set an expiry
>    (e.g. 24 months — note the calendar reminder to rotate it) → **Add**. Copy the
>    secret **Value** immediately → `MS_CLIENT_SECRET`. *(You can't see it again after
>    leaving the page; copy the Value, not the Secret ID.)*
> 4. **Lock the app to just your sender mailbox** so it cannot send as anyone else in
>    the tenant. In **Exchange Online PowerShell** (`Connect-ExchangeOnline`):
>    ```powershell
>    New-DistributionGroup -Name "Website Mailer Senders" -Type Security `
>      -Members noreply@yourdomain.com
>    New-ApplicationAccessPolicy -AppId <MS_CLIENT_ID> `
>      -PolicyScopeGroupId "Website Mailer Senders" `
>      -AccessRight RestrictAccess `
>      -Description "Restrict website mailer to the noreply mailbox"
>    ```
>    (Without this policy, `Mail.Send` can send as *any* mailbox in the tenant.)
> 5. Add `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET`, `MS_SENDER` to
>    **Vercel → Settings → Environment Variables** (Production), then **redeploy**.
>
> **Notes:**
> - `MS_SENDER` must be a **licensed** mailbox (Office 365 A1 for Faculty is fine) and
>   must be a member of the Application Access Policy group from step 4.
> - Policy changes can take a few minutes to propagate across Exchange Online.
> - Rotate `MS_CLIENT_SECRET` before it expires (a new secret Value + updated env var);
>   email stops sending the moment the secret expires.

<details>
<summary><strong>SMTP fallback (legacy — only if you cannot use Graph)</strong></summary>

Set these instead of the `MS_*` vars. Requires **Authenticated SMTP** enabled on the
mailbox and **Security Defaults turned OFF** (SMTP basic-auth is blocked while Security
Defaults is on, and retires by default at the end of **December 2026**):

```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587                      # STARTTLS
SMTP_USER=noreply@yourdomain.com   # licensed mailbox that authenticates
SMTP_PASS=                         # its password, or an app password if MFA is on
SMTP_FROM=noreply@yourdomain.com   # sender address (match SMTP_USER, or have "Send As")
```

Enable Authenticated SMTP: `Set-CASMailbox -Identity noreply@yourdomain.com -SmtpClientAuthenticationDisabled $false`
(and confirm it isn't blocked tenant-wide via `Set-TransportConfig` or Security Defaults).
</details>

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
- Admin access requires an email/password sign-in whose email is in
  `ADMIN_EMAILS` **or** a Firestore `users/{uid}` doc with `role = "admin"`.
  The email published in `NEXT_PUBLIC_ADMIN_EMAIL` is a convenience for the
  login form only — it grants nothing on its own.
- A newly provisioned account cannot use the portal until it has replaced the
  password it was issued with; `/api/admin/verify` reports
  `mustChangePassword` until `users/{uid}.passwordChangedAt` exists.
- `/api/admin/bootstrap` is idempotent and refuses to modify an existing
  account, so it cannot be used to reset a live administrator's password.
- Firestore denies all direct client access; Storage writes require the `admin`
  custom claim. See **Security Rules** below — the rules ship in the repo as
  `firestore.rules` and `storage.rules`.
- All blog, popup, and Gemini routes validate the Firebase ID token server-side
  via the Admin SDK before any write.
- The `/admin` route is `noindex, nofollow` and is not linked publicly.

---

## Site Images (admin-managed)

Every photograph on the public site that the school can change lives in the
**Site Images** tab of the admin portal. Nothing needs a deploy.

### How it works

- **`lib/mediaSlots.js`** is the catalogue. Each entry is a *slot*: a stable
  key (`home.hero`), the page group it belongs to, the aspect ratio it renders
  in, the recommended pixel size, and a **reference image** shipped in
  `/public`.
- The reference image is what renders until someone uploads a replacement, and
  it is shown in the portal beside the live image so the editor can see exactly
  what they are replacing.
- Uploads go to Firebase Storage under `site-media/{slotKey}/` and the record
  is written to the Firestore collection **`siteMedia`**, document id = slot key.
- `GET /api/media` returns the public map and is consumed once per session by
  `SiteMediaProvider` (in `_app.js`), which caches it in `localStorage` so
  returning visitors paint the uploaded image on the first frame.
- `components/media/SiteImage.js` renders a slot. The frame holds its aspect
  ratio whichever image is showing, so swapping one in never shifts the layout.

### What the editor controls per slot

| Control | Effect |
| --- | --- |
| Upload / replace | Sets the live image. Takes effect immediately. |
| Description | The alt text for screen readers. In the campus mosaic it is also the visible caption, so it can never contradict the picture. |
| Focus of the crop | Which part of the picture to keep when the frame is narrower than the image (`object-position`). |
| Reset to reference | Deletes the upload and its stored file, restoring the image shipped with the site. |

### Adding a new managed image

1. Add an entry to `mediaSlots` in `lib/mediaSlots.js` (key, group, label, note,
   ratio, size, `ref`, `alt`).
2. Render it: `<SiteImage slot="your.new.key" />`.

It appears in the portal automatically — there is no second place to register
it. Records whose slot has been removed from the registry are ignored by
`/api/media`, so deleting a slot is safe.

### Degraded behaviour

If Firebase is unreachable, `/api/media` returns an empty map with `200` rather
than an error, and every slot falls back to its reference image. A broken
backend can never blank the site.

---

## Motion

Three shared primitives in `components/motion/`, all of which honour
`prefers-reduced-motion`:

- **`Reveal`** — fade and rise for text blocks. `index` staggers a group.
- **`ImageReveal`** — the house transition for photographs: the frame fades up
  while the image settles back from a slight overscale.
- **`Parallax`** — scroll-linked drift for full-bleed backdrops. The inner
  layer is over-tall so the movement never exposes an edge.

`components/home/ScrollStory.js` is the one bespoke piece: a pinned section
where the learning-journey photographs and captions cross-fade as you scroll.
Under reduced motion it degrades to three plainly stacked chapters.

---

## Security Rules

The rules live in the repository and are the source of truth — do not edit them
in the Firebase console, or the next deploy will overwrite your changes.

| File | Covers |
| --- | --- |
| `firestore.rules` | Firestore — denies all direct client access |
| `storage.rules` | Storage — public read, admin-only write |
| `firebase.json` | Points the CLI at both files |

### Deploying them

```bash
npm i -g firebase-tools
firebase login
firebase use --add            # select the project, once per machine
firebase deploy --only firestore:rules,storage
```

Hosting is Vercel; the Firebase CLI is used only to publish these rules.

### Firestore — closed by default

The browser never queries Firestore. Every read and write goes through a
Next.js API route that checks the caller and then uses the Admin SDK, which
bypasses security rules altogether. The client policy is therefore `allow read,
write: if false`, which costs the application nothing and removes the entire
"signed-in user queries the database directly" surface.

If a future feature needs direct client reads, add a narrow rule for that one
collection rather than loosening the default.

### Storage — public read, admin-only write

Storage *is* written from the browser: the portal uploads straight from the
editor so large files never pass through a serverless function. Reads are
public because the resulting URLs are rendered in `<img>` tags for anonymous
visitors.

Writes require a custom claim, `admin: true`, and are limited to images under
10 MB:

```
allow write: if request.auth.token.admin == true
  && request.resource.size < 10 * 1024 * 1024
  && request.resource.contentType.matches('image/.*');
```

**Why a claim and not `request.auth != null`.** Any authenticated account would
satisfy `auth != null` — including any account the project ever gains for an
unrelated reason. The claim is granted in exactly one place, `/api/admin/verify`,
immediately after the `ADMIN_EMAILS` allowlist has been checked, so upload
permission and portal access can never drift apart.

The claim is minted into the ID token, so it only reaches the browser after a
refresh. `verify` returns `claimRefreshed: true` the first time it grants the
claim and the portal immediately pulls a fresh token, so the first upload of a
session is not rejected. `/api/admin/bootstrap` sets the claim at account
creation for the same reason.

**Revoking access.** Removing an address from `ADMIN_EMAILS` stops portal
access at once, but the `admin` claim already minted into that account's token
survives until it is cleared:

```bash
# Node, with the Admin SDK credentials loaded
await admin.auth().setCustomUserClaims(uid, { admin: false });
await admin.auth().revokeRefreshTokens(uid);
```
