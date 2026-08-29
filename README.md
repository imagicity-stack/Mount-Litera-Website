# Mount Litera Website — Admin Portal, Blogs & Popups

A Firebase-powered content platform with a public `/blogs` experience and a
state-of-the-art admin portal at **`/admin`** (Google sign-in).

> The admin previously lived at `/blogs/admin`. That URL now permanently
> redirects to `/admin`.

## Features
- **`/admin` portal** with Firebase email/password authentication (no federated
  sign-in, no env-var credentials) and a forced password change on first login.
  Access is granted solely by a Firestore `users/{uid}` doc with `role: admin`.
- **Site Images library**: every managed photograph on the public site,
  uploadable from the portal with a reference image shown for comparison.
- **People directory**: add, edit, reorder, hide, and remove the Elden Council,
  Core Mentors, and Managing Committee, with portraits in Firebase Storage.
- **Content collections**: gallery, mandatory disclosures, awards, vacancies and
  the house roster — all schema-driven, with image and PDF uploads.
- **School details**: one place for phone, address, emails and social links,
  read by every page that shows them.
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
   manual console step — security rules cannot switch a provider on. (Google
   sign-in is *not* used by the portal and does not need to be enabled.)
4. Create a **Firestore Database**.
5. Create a **Storage** bucket.

### 2) Create the administrator account
Identity lives entirely in **Firebase Authentication**; authorisation lives in
**Firestore**. There is no environment allowlist, no provisioning endpoint, and
no self-service registration — the account is created by hand, once.

**Step 1 — create the sign-in.**
Firebase Console → **Authentication → Users → Add user**. Enter the email
address and a temporary password.

**Step 2 — grant the role.** *(Without this the account can sign in but the
portal will refuse it.)*
Firebase Console → **Firestore Database** → collection **`users`** → add a
document whose **document ID is that user's UID** (copy it from the Users tab):

| Field | Type | Value |
| --- | --- | --- |
| `role` | string | `admin` |

**Step 3 — first sign-in.**
Go to `/admin` and sign in with the temporary password. The portal immediately
requires a new password and will not let you past that screen until you set
one. Once set it records `users/{uid}.passwordChangedAt` and the prompt never
returns.

Forgotten passwords use the **Forgotten your password?** link on the login
screen, which sends a Firebase reset email.

**Revoking access** — delete the `users/{uid}` document (or change `role`), then
clear the Storage claim, which survives in already-issued tokens:

```js
await admin.auth().setCustomUserClaims(uid, { admin: false });
await admin.auth().revokeRefreshTokens(uid);
```

Deleting the Firebase Auth user revokes everything outright.

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

# Admin access is NOT configured here — it comes from a Firestore
# users/{uid} document with role = "admin". See "Create the administrator
# account" above.

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
- **Signing in is not the same as being let in.** Firebase Authentication
  proves who you are; a Firestore `users/{uid}` document with `role = "admin"`
  decides whether the portal opens. An account without that document is
  rejected with 403 on every route.
- The role document is created by hand in the Firebase console. No application
  code writes `role`, so there is no code path to granting yourself access —
  including `/api/admin/password-changed`, which only stamps a timestamp.
- A new account cannot use the portal until it replaces the password it was
  issued with; `/api/admin/verify` reports `mustChangePassword` until
  `users/{uid}.passwordChangedAt` exists.
- A Firestore outage denies access rather than granting it.
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

## People (admin-managed)

The **People** tab of the portal manages everyone the site lists publicly:
the Elden Council, Core Mentors, and the Managing Committee. Adding someone
publishes them to their page immediately — no deploy.

### How it works

- **`lib/peopleGroups.js`** defines the three groups, whether they use
  departments, and — importantly — the roster the site shipped with.
- Records live in the Firestore collection **`people`**; portraits go to
  Firebase Storage under **`people/{group}/`**.
- `GET /api/people` returns published entries. `?all=1` includes hidden ones
  and requires admin. `POST /api/people`, `PUT|DELETE /api/people/{id}` are
  admin-only.

### The seed roster, and the one thing to know about it

Each group falls back to its built-in roster **whenever the directory holds no
entries for that group**. That is what keeps a page from coming up empty
before anyone has touched the backend, and what makes a Firestore outage
degrade to the previous list rather than to nothing.

The consequence: **the moment you add one person to a group, the built-in list
stops being used for that group.** Add one mentor and the page shows one
mentor. The portal warns about this and offers a one-click **Import the
built-in list** button that copies the shipped roster into the directory so
you can edit it person by person. Use that first.

### Per person

| Field | Notes |
| --- | --- |
| Name | Required. |
| Title / Designation / Role | Label varies by group (Trustee, Mathematics, …). |
| Department | Core Mentors only. Pick an existing one or type a new one — new departments appear on the page automatically, after the known ones. |
| Photo | Optional, under 5 MB. Without one the card shows the person's initials on ink, which is a deliberate style rather than a broken image. |
| Short note | Optional. |
| Order | Set with the ↑ ↓ buttons; the whole group is renumbered so ordering stays dense. |
| Hidden | Keeps the record but removes them from the public page. |

Removing a person also deletes their portrait from the bucket, as does
replacing a photo, so old files do not accumulate.

---

## Content & School Details (admin-managed)

Two more portal tabs, added after an audit of what was still hardcoded.

### Content

One screen driven entirely by **`lib/contentCollections.js`**. Each collection
declares its fields and the rows the site shipped with; the API route, the form,
the validation and the row list are all generated from that schema, so a new
managed list is a schema entry rather than a new feature.

| Collection | What it controls | Uploads |
| --- | --- | --- |
| Gallery | The photographs on `/gallery` | Images |
| Mandatory Disclosures | The CBSE documents on `/disclosures` | PDFs |
| Awards & Recognition | The awards on `/awards-and-recognition` | — |
| Careers & Vacancies | Open roles on `/careers` | — |
| House Roster | Prefect and house master per house | Images |

Field types: `text`, `textarea`, `image`, `file`, `list`.

Records live in Firestore under `content/{collection}/items`; uploads go to
Storage under `content/{collection}/`. Replacing a file or deleting a record
removes the old upload from the bucket.

**Vacancies** are worth calling out: with none listed the careers page says the
school is not currently hiring; add one and it becomes a list of open roles,
each with its own apply-by-email button.

**House Roster is a *keyed* collection.** The eight houses are part of the
site's structure — their names, crests, colours and stories generate the
`/houses/[slug]` routes — so entries cannot be added or removed, only filled
in. Only the parts that change every year are editable: prefect and house
master, name and photograph. A blank field keeps whatever the site ships with.

### Seed fallback

As with the people directory, every collection falls back to its built-in rows
while it is empty, and the first row added replaces that list **for that
collection**. The portal warns and offers a one-click import of the built-in
rows. The keyed House Roster is exempt — it merges field by field instead.

### School Details

`lib/siteSettings.js` holds the school's phone, WhatsApp, address, the general
/ admissions / careers email addresses, and the social links. The portal writes
overrides to `settings/site` in Firestore and every page reads them through
`useSiteSettings`.

These were previously copied into five files, which is how the general email
came to be misspelled in the footer (`eldenhieghts.org`) while the rest of the
site had it right. There is now one place to change them.

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
immediately after the Firestore `role` has been checked, so upload permission
and portal access can never drift apart.

The claim is minted into the ID token, so it only reaches the browser after a
refresh. `verify` returns `claimRefreshed: true` the first time it grants the
claim and the portal immediately pulls a fresh token, so the first upload of a
session is not rejected.

**Revoking access.** Deleting the `users/{uid}` document stops portal access at
once, but the `admin` claim already minted into that account's token survives
until it is cleared:

```bash
# Node, with the Admin SDK credentials loaded
await admin.auth().setCustomUserClaims(uid, { admin: false });
await admin.auth().revokeRefreshTokens(uid);
```
