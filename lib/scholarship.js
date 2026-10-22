/**
 * Edenwoods Merit Scholarship 2027 — domain layer.
 *
 * Every date, fee, tier and option the scholarship runs on, plus the
 * validation the registration form and the API both apply. Nothing here
 * touches Firebase or the DOM: it is imported by the browser bundle and by the
 * server, and must stay safe in both.
 *
 * The figures are taken from the signed Terms and Conditions. Where this file
 * and that document could ever disagree, the document is the one parents are
 * held to — so change both together.
 */

// ---------------------------------------------------------------- Collections

export const REGISTRATIONS_COLLECTION = 'scholarship_registrations';
export const SCHOLARSHIP_ID = 'edenwoods-merit-2027';
export const SCHOLARSHIP_PATH = '/admission/scholarships/edenwoods-merit-2027';

export const IST_OFFSET_MINUTES = 330;

// ----------------------------------------------------------------- Identity

export const foundation = {
  name: 'Edenwoods Eduhub Foundation',
  short: 'Edenwoods',
  logo: '/scholarships/edenwoods-logo.webp'
};

export const scholarship = {
  id: SCHOLARSHIP_ID,
  name: 'Edenwoods Merit Scholarship 2027',
  programme: 'Edenwoods Scholars 2027–28',
  session: '2027–28',
  school: 'The Elden Heights School',
  schoolShort: 'TEHS',
  registrationFee: 199,
  admissionFormFee: 500,
  fullScholarships: 8,
  fullScholarshipThreshold: 90
};

// --------------------------------------------------------------------- Dates

/**
 * The published dates, in India time. `iso` is the instant a deadline passes —
 * end of day on the closing date — so "is registration still open?" is a
 * comparison rather than a judgement call.
 */
export const keyDates = {
  registrationCloses: {
    label: '31 October 2026',
    short: '31 Oct 2026',
    iso: '2026-10-31T18:29:59.999Z', // 23:59:59 IST
    note: 'Last date to register'
  },
  admitCard: {
    label: '3 November 2026',
    short: '3 Nov 2026',
    iso: '2026-11-03T03:30:00.000Z',
    note: 'Admit card sent on WhatsApp'
  },
  test: {
    label: 'Thursday, 5 November 2026',
    short: '5 Nov 2026',
    iso: '2026-11-05T03:30:00.000Z',
    note: 'Test day at the TEHS campus'
  },
  results: {
    label: '1 December 2026',
    short: '1 Dec 2026',
    iso: '2026-12-01T03:30:00.000Z',
    note: 'Results announced on WhatsApp'
  },
  claimDeadline: {
    label: '31 January 2027',
    short: '31 Jan 2027',
    iso: '2027-01-31T18:29:59.999Z',
    note: 'Last date to claim a scholarship'
  }
};

export const registrationIsOpen = (now = new Date()) =>
  now.getTime() <= new Date(keyDates.registrationCloses.iso).getTime();

/** Whole days left to register; 0 once the deadline has passed. */
export const daysUntilClose = (now = new Date()) => {
  const ms = new Date(keyDates.registrationCloses.iso).getTime() - now.getTime();
  return ms <= 0 ? 0 : Math.ceil(ms / 86400000);
};

// ------------------------------------------------------------------- Venue

export const venue = {
  name: 'The Elden Heights School',
  address: 'Katghara, Opp. BSF Firing Range, Silwar, Hazaribagh, Jharkhand – 825301',
  // A search link rather than a pinned coordinate: it resolves correctly on
  // every device and never points at the wrong side of the road.
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('The Elden Heights School, Silwar, Hazaribagh, Jharkhand 825301')
};

export const contact = {
  whatsapp: '9431904333',
  phone: '+91 94319 04333',
  email: 'admissions@eldenheights.org',
  officeHours: 'Monday to Saturday, 9:00 AM – 4:00 PM'
};

// ------------------------------------------------------------------ Classes

/** Nursery to Class IX. Class X is deliberately absent — see `classXNote`. */
export const classOptions = [
  { value: 'nursery', label: 'Nursery', band: 'activity' },
  { value: 'lkg', label: 'LKG', band: 'activity' },
  { value: 'ukg', label: 'UKG', band: 'activity' },
  { value: 'i', label: 'Class I', band: 'activity' },
  { value: 'ii', label: 'Class II', band: 'activity' },
  { value: 'iii', label: 'Class III', band: 'written' },
  { value: 'iv', label: 'Class IV', band: 'written' },
  { value: 'v', label: 'Class V', band: 'written' },
  { value: 'vi', label: 'Class VI', band: 'written' },
  { value: 'vii', label: 'Class VII', band: 'written' },
  { value: 'viii', label: 'Class VIII', band: 'written' },
  { value: 'ix', label: 'Class IX', band: 'written' }
];

export const classLabel = (value) =>
  classOptions.find((c) => c.value === value)?.label || value || '';

export const bandFor = (value) =>
  classOptions.find((c) => c.value === value)?.band || 'activity';

/** Current school is only meaningful once a child is actually at one. */
export const requiresCurrentSchool = (classValue) => bandFor(classValue) === 'written';

export const classXNote =
  'Class X is not included. CBSE board registration for Class X happens in Class IX, so a mid-board transfer is not possible.';

// ---------------------------------------------------------------- The test

export const testFormats = [
  {
    band: 'activity',
    classes: 'Nursery to Class II',
    title: 'A short play-based activity',
    duration: 'About 20 minutes, in a booked time slot',
    withParent: true,
    detail:
      'No preparation, no writing and no syllabus. A teacher sits with your child for a short set of play activities — recognising shapes and colours, simple sorting, listening and talking. A parent stays in the room throughout.',
    // Deliberately empty: there is nothing for a four-year-old to revise.
    subjects: []
  },
  {
    band: 'written',
    classes: 'Class III to Class IX',
    title: 'A written test',
    duration: '90 minutes',
    withParent: false,
    detail:
      'A single written paper based on the syllabus of the class your child is currently in — not the class they are applying for. Objective and short-answer questions.',
    subjects: ['English', 'Mathematics', 'General Awareness']
  }
];

export const whatToBring = [
  'The admit card, printed or on your phone',
  'Two sharpened pencils, an eraser and a blue or black pen',
  'A water bottle',
  'One recent passport-size photograph of the child'
];

// ------------------------------------------------------------ Award tiers

/**
 * The tier table, exactly as the Terms and Conditions state it.
 *
 * The 100% row carries two conditions, not one: a score of 90% or more *and* a
 * top rank within the eight full scholarships. Showing only the percentage
 * would read as a promise the scholarship does not make.
 */
export const tiers = [
  {
    score: '90% and above',
    qualifier: 'top ranks within the 8 full scholarships',
    award: '100%',
    headline: true
  },
  { score: '85% and above', qualifier: '', award: '50%' },
  { score: '70% to 84%', qualifier: '', award: '25%' },
  { score: '50% to 69%', qualifier: '', award: '10%' },
  { score: 'Every child who takes the test', qualifier: '', award: 'Certificate of participation' }
];

export const fullScholarshipRule =
  'There are 8 full (100%) scholarships in total across all classes. A full scholarship needs a score of 90% or more. If no child in a class group reaches 90%, no full scholarship is given in that group.';

// ------------------------------------------------------------ Form options

export const genderOptions = [
  { value: 'girl', label: 'Girl' },
  { value: 'boy', label: 'Boy' },
  { value: 'other', label: 'Prefer not to say' }
];

export const relationshipOptions = [
  { value: 'mother', label: 'Mother' },
  { value: 'father', label: 'Father' },
  { value: 'guardian', label: 'Guardian' }
];

/**
 * Hazaribagh localities. Kept as a list rather than a free-text box so the
 * admin dashboard can show which neighbourhoods actually respond — which is
 * the difference between guessing where to advertise and knowing.
 */
export const localityOptions = [
  'Silwar',
  'Korrah',
  'Matwari',
  'Hurhuru',
  'Bada Bazar',
  'Jabra',
  'Pelawal',
  'Okni',
  'Charhi',
  'Barhi',
  'Katkamsandi',
  'Demotand',
  'Meru',
  'Sindoor',
  'Ichak',
  'Other'
];

export const hearAboutOptions = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'friend', label: 'A friend or family member' },
  { value: 'school', label: 'My child’s current school' },
  { value: 'hoarding', label: 'A hoarding or poster' },
  { value: 'newspaper', label: 'Newspaper' },
  { value: 'other', label: 'Somewhere else' }
];

const labelFrom = (options, value) =>
  options.find((o) => o.value === value)?.label || value || '';

export const genderLabel = (v) => labelFrom(genderOptions, v);
export const relationshipLabel = (v) => labelFrom(relationshipOptions, v);
export const hearAboutLabel = (v) => labelFrom(hearAboutOptions, v);

// ------------------------------------------------------------------ Statuses

export const REGISTRATION_STATUS = {
  PENDING: 'pending',
  REGISTERED: 'registered',
  ADMIT_CARD_SENT: 'admit_card_sent',
  APPEARED: 'appeared',
  ABSENT: 'absent',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const registrationStatusLabels = {
  pending: 'Payment pending',
  registered: 'Registered',
  admit_card_sent: 'Admit card sent',
  appeared: 'Appeared',
  absent: 'Absent',
  cancelled: 'Cancelled',
  expired: 'Expired'
};

export const paymentStatusLabels = {
  pending: 'Pending',
  paid: 'Paid',
  failed: 'Failed',
  refunded: 'Refunded'
};

// -------------------------------------------------------------------- Limits

export const LIMITS = {
  childName: 80,
  parentName: 80,
  currentSchool: 120,
  mobile: 20,
  email: 120,
  localityOther: 60,
  internalNotes: 4000
};

// ---------------------------------------------------------------- Validation

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const text = (v) => String(v ?? '').trim();

export const normalisePhone = (value) => String(value || '').replace(/[^\d]/g, '');

export const isValidEmail = (value) => EMAIL_RE.test(text(value));

/** Ten digits starting 6-9, with or without a country code or trunk zero. */
export const isValidPhone = (value) => {
  const d = normalisePhone(value);
  if (d.length === 10) return /^[6-9]/.test(d);
  if (d.length === 11) return d.startsWith('0') && /^[6-9]/.test(d.slice(1));
  if (d.length === 12) return d.startsWith('91') && /^[6-9]/.test(d.slice(2));
  if (d.length === 13) return d.startsWith('091') && /^[6-9]/.test(d.slice(3));
  return false;
};

/**
 * A date of birth that could plausibly belong to a child joining Nursery to
 * Class IX in 2027-28 — roughly 2 to 18 years old at the test. Rejecting an
 * obvious typo here saves a phone call later.
 */
export const isPlausibleDob = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return false;
  const testDay = new Date(keyDates.test.iso);
  const years = (testDay - d) / (365.25 * 86400000);
  return years >= 2 && years <= 18;
};

export const ageOnTestDay = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const years = (new Date(keyDates.test.iso) - d) / (365.25 * 86400000);
  return Math.floor(years);
};

export const validateChildStep = (draft = {}) => {
  const errors = {};
  const name = text(draft.childName);
  if (name.length < 2) errors.childName = "Please enter your child's full name.";
  else if (name.length > LIMITS.childName) errors.childName = 'That name is too long.';

  if (!text(draft.dob)) errors.dob = "Please enter your child's date of birth.";
  else if (!isPlausibleDob(draft.dob)) {
    errors.dob = 'Please check the date of birth — it does not look right for Nursery to Class IX.';
  }

  if (!genderOptions.some((o) => o.value === draft.gender)) {
    errors.gender = 'Please choose one.';
  }
  if (!classOptions.some((o) => o.value === draft.classApplying)) {
    errors.classApplying = 'Please choose the class for 2027–28.';
  }
  if (requiresCurrentSchool(draft.classApplying) && !text(draft.currentSchool)) {
    errors.currentSchool = 'Please tell us which school your child attends now.';
  }
  if (text(draft.currentSchool).length > LIMITS.currentSchool) {
    errors.currentSchool = 'That is too long.';
  }
  return errors;
};

export const validateParentStep = (draft = {}) => {
  const errors = {};
  const name = text(draft.parentName);
  if (name.length < 2) errors.parentName = 'Please enter your full name.';
  else if (name.length > LIMITS.parentName) errors.parentName = 'That name is too long.';

  if (!relationshipOptions.some((o) => o.value === draft.relationship)) {
    errors.relationship = 'Please choose one.';
  }
  if (!isValidPhone(draft.whatsapp)) {
    errors.whatsapp = 'Please enter a valid 10-digit WhatsApp number.';
  }
  if (text(draft.altPhone) && !isValidPhone(draft.altPhone)) {
    errors.altPhone = 'Please enter a valid phone number, or leave it blank.';
  }
  // Email is optional by design — plenty of parents here do not use one, and
  // forcing a fake address loses the receipt rather than delivering it.
  if (text(draft.email) && !isValidEmail(draft.email)) {
    errors.email = 'Please enter a valid email address, or leave it blank.';
  }
  if (!localityOptions.includes(draft.locality)) {
    errors.locality = 'Please choose your area.';
  }
  if (draft.locality === 'Other' && !text(draft.localityOther)) {
    errors.localityOther = 'Please tell us the area.';
  }
  if (!hearAboutOptions.some((o) => o.value === draft.hearAbout)) {
    errors.hearAbout = 'Please choose one.';
  }
  return errors;
};

export const validateConsent = (draft = {}) => {
  const errors = {};
  if (draft.termsAccepted !== true) {
    errors.termsAccepted = 'Please confirm you have read the terms before paying.';
  }
  return errors;
};

export const validateRegistration = (draft = {}) => ({
  ...validateChildStep(draft),
  ...validateParentStep(draft),
  ...validateConsent(draft)
});

export const hasErrors = (errors) => Object.keys(errors || {}).length > 0;

/** Only fields the schema knows about, so a crafted request adds no keys. */
export const sanitizeRegistration = (draft = {}) => ({
  childName: text(draft.childName).slice(0, LIMITS.childName),
  dob: text(draft.dob).slice(0, 10),
  gender: text(draft.gender),
  classApplying: text(draft.classApplying),
  currentSchool: text(draft.currentSchool).slice(0, LIMITS.currentSchool),

  parentName: text(draft.parentName).slice(0, LIMITS.parentName),
  relationship: text(draft.relationship),
  whatsapp: normalisePhone(draft.whatsapp).slice(-10),
  altPhone: text(draft.altPhone) ? normalisePhone(draft.altPhone).slice(-10) : '',
  email: text(draft.email).toLowerCase().slice(0, LIMITS.email),
  locality: text(draft.locality),
  localityOther:
    draft.locality === 'Other' ? text(draft.localityOther).slice(0, LIMITS.localityOther) : '',
  hearAbout: text(draft.hearAbout),

  termsAccepted: draft.termsAccepted === true
});

// --------------------------------------------------------- Registration number

const ID_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/**
 * `EMS27-K7M2QX`. No 0/O or 1/I/L — these are read down the phone, written on
 * an admit card by hand, and checked against a merit list.
 *
 * The series is a parameter rather than a constant because the office sets it
 * in the portal: next year it becomes EMS28 and nothing in the code changes.
 */
export const generateRegistrationNumber = (prefix = 'EMS27', random = Math.random) => {
  let suffix = '';
  for (let i = 0; i < 6; i += 1) {
    suffix += ID_ALPHABET[Math.floor(random() * ID_ALPHABET.length)];
  }
  return `${prefix}-${suffix}`;
};

/** `EMS27-0001`, for offices that would rather file by roll number. */
export const formatSequentialNumber = (prefix, value, padding = 4) =>
  `${prefix}-${String(value).padStart(padding, '0')}`;

/**
 * Shape validation, not identity.
 *
 * Deliberately prefix-agnostic: the series is configurable, and a validator
 * hardcoded to EMS27 would start rejecting next year's registrations the day
 * someone changed it in the portal. This is input hygiene — what actually
 * protects a registration is the token, not the unguessability of its number.
 */
export const isValidRegistrationNumber = (value) =>
  /^[A-Z][A-Z0-9]{1,11}-(?:[23456789A-HJKMNP-Z]{4,10}|\d{3,8})$/.test(String(value || ''));

// ------------------------------------------------------- Campaign attribution

export const CAMPAIGN_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid'
];

export const sanitizeCampaign = (query = {}) => {
  const pick = (k) => String(query[k] ?? '').trim().slice(0, 120);
  return {
    source: pick('utm_source'),
    medium: pick('utm_medium'),
    campaign: pick('utm_campaign'),
    adCreative: pick('utm_content'),
    fbclid: pick('fbclid')
  };
};
