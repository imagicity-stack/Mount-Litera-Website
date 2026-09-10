/**
 * The Parent Room — domain layer.
 *
 * One place for the collection names, the configurable settings, the closed
 * sets of values a booking can hold, and the validation rules. Everything else
 * in the module (API routes, the booking wizard, the admin screens, the email
 * templates) reads from here, so a rule is written once and enforced on both
 * sides of the wire.
 *
 * Nothing in this file touches Firebase or the DOM: it is imported by the
 * browser bundle and by the server, and must stay safe in both.
 */

// ---------------------------------------------------------------- Collections

export const BOOKINGS_COLLECTION = 'parent_room_bookings';
export const SLOTS_COLLECTION = 'parent_room_slots';
export const SETTINGS_COLLECTION = 'parent_room_settings';
export const SETTINGS_DOC = 'config';

/** India has no daylight saving, so a fixed offset is exact all year. */
export const IST_OFFSET_MINUTES = 330;
export const TIMEZONE = 'Asia/Kolkata';

// ------------------------------------------------------------------- Settings

/**
 * Every operational decision the school can make without a deploy.
 *
 * `paymentMode` is the honest switch for a school that has not finished its
 * gateway setup: in `offline` mode a booking still confirms and still holds its
 * slot, but it is recorded as payment pending and both emails say the school
 * will be in touch about the fee. Nothing pretends a payment happened.
 */
export const defaultParentRoomSettings = {
  enabled: true,
  sessionDuration: 30,
  bufferMinutes: 0,
  participationFee: 149,
  currency: 'INR',
  maximumDailySessions: 6,
  minimumBookingNoticeHours: 4,
  bookingWindowDays: 30,
  timezone: TIMEZONE,
  // Minutes a slot stays held while a parent is paying.
  reservationHoldMinutes: 15,
  // 0 = Sunday … 6 = Saturday. Weekdays the school offers sessions on.
  availableWeekdays: [1, 2, 3, 4, 5],
  // Minutes from midnight IST. 10:00 → 600, 13:00 → 780.
  dayStartMinutes: 600,
  dayEndMinutes: 780,
  // ISO dates (YYYY-MM-DD) with no sessions at all.
  blockedDates: [],
  // ISO dates that open even when the weekday is normally closed.
  extraDates: [],
  paymentMode: 'razorpay',
  rescheduleNoticeHours: 12,
  allowParentReschedule: false,
  // Used in both emails when a per-booking link has not been set.
  defaultMeetingNote:
    'The video meeting link will be sent to you before the session.',
  counsellorName: 'Neha Jain',
  counsellorTitle: 'Director, Institutional Wellbeing & Strategic Advisory'
};

const NUMBER_KEYS = [
  'sessionDuration',
  'bufferMinutes',
  'participationFee',
  'maximumDailySessions',
  'minimumBookingNoticeHours',
  'bookingWindowDays',
  'reservationHoldMinutes',
  'dayStartMinutes',
  'dayEndMinutes',
  'rescheduleNoticeHours'
];

const BOUNDS = {
  sessionDuration: [5, 240],
  bufferMinutes: [0, 120],
  participationFee: [0, 100000],
  maximumDailySessions: [1, 40],
  minimumBookingNoticeHours: [0, 720],
  bookingWindowDays: [1, 180],
  reservationHoldMinutes: [3, 120],
  dayStartMinutes: [0, 1439],
  dayEndMinutes: [1, 1440],
  rescheduleNoticeHours: [0, 720]
};

const clampNumber = (value, key, fallback) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  const [min, max] = BOUNDS[key] || [-Infinity, Infinity];
  return Math.min(max, Math.max(min, Math.round(n)));
};

const uniqueSortedDates = (value) => {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  value.forEach((entry) => {
    const text = String(entry || '').trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) seen.add(text);
  });
  return Array.from(seen).sort();
};

const normaliseWeekdays = (value, fallback) => {
  if (!Array.isArray(value)) return fallback;
  const days = Array.from(
    new Set(
      value
        .map((d) => Number(d))
        .filter((d) => Number.isInteger(d) && d >= 0 && d <= 6)
    )
  ).sort();
  return days;
};

/** Stored settings layered over the defaults, with every value validated. */
export const mergeParentRoomSettings = (stored) => {
  const merged = { ...defaultParentRoomSettings, ...(stored || {}) };

  NUMBER_KEYS.forEach((key) => {
    merged[key] = clampNumber(merged[key], key, defaultParentRoomSettings[key]);
  });

  merged.enabled = merged.enabled !== false;
  merged.allowParentReschedule = merged.allowParentReschedule === true;
  merged.availableWeekdays = normaliseWeekdays(
    merged.availableWeekdays,
    defaultParentRoomSettings.availableWeekdays
  );
  merged.blockedDates = uniqueSortedDates(merged.blockedDates);
  merged.extraDates = uniqueSortedDates(merged.extraDates);
  merged.paymentMode = merged.paymentMode === 'offline' ? 'offline' : 'razorpay';
  merged.timezone = TIMEZONE;
  merged.currency = 'INR';

  // A day that ends before it starts would generate no slots and read as an
  // outage rather than a misconfiguration, so fall back to the shipped window.
  if (merged.dayEndMinutes <= merged.dayStartMinutes) {
    merged.dayStartMinutes = defaultParentRoomSettings.dayStartMinutes;
    merged.dayEndMinutes = defaultParentRoomSettings.dayEndMinutes;
  }

  ['defaultMeetingNote', 'counsellorName', 'counsellorTitle'].forEach((key) => {
    merged[key] = String(merged[key] || '').trim().slice(0, 300) ||
      defaultParentRoomSettings[key];
  });

  return merged;
};

// -------------------------------------------------------------------- Statuses

export const SLOT_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'temporarily_reserved',
  BOOKED: 'booked',
  BLOCKED: 'blocked'
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  RESCHEDULED: 'rescheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
  EXPIRED: 'expired'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  WAIVED: 'waived'
};

export const bookingStatusLabels = {
  pending: 'Awaiting payment',
  confirmed: 'Confirmed',
  rescheduled: 'Rescheduled',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No show',
  expired: 'Expired'
};

export const paymentStatusLabels = {
  pending: 'Pending',
  paid: 'Paid',
  failed: 'Failed',
  refunded: 'Refunded',
  waived: 'Waived'
};

/** Statuses that still occupy their slot. */
export const ACTIVE_BOOKING_STATUSES = [
  BOOKING_STATUS.PENDING,
  BOOKING_STATUS.CONFIRMED,
  BOOKING_STATUS.RESCHEDULED,
  BOOKING_STATUS.COMPLETED
];

// --------------------------------------------------------------- Option sets

export const concernOptions = [
  { value: 'academic', label: 'Academic performance' },
  { value: 'motivation', label: 'Motivation' },
  { value: 'screen-time', label: 'Screen time' },
  { value: 'confidence', label: 'Confidence' },
  { value: 'behaviour', label: 'Behaviour' },
  { value: 'communication', label: 'Parent-child communication' },
  { value: 'friendships', label: 'Friendships / peer concerns' },
  { value: 'school-environment', label: 'School environment' },
  { value: 'exam-pressure', label: 'Examination pressure' },
  { value: 'career', label: 'Career / subject selection' },
  { value: 'school-change', label: 'Considering a school change' },
  { value: 'other', label: 'Other' }
];

export const schoolChangeOptions = [
  { value: 'yes-actively', label: 'Yes, actively' },
  { value: 'possibly', label: 'Possibly' },
  { value: 'not-currently', label: 'Not currently' },
  { value: 'not-sure', label: 'Not sure' }
];

export const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'hinglish', label: 'Hinglish' }
];

export const communicationOptions = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' }
];

const labelFrom = (options, value) =>
  options.find((option) => option.value === value)?.label || value || '';

export const concernLabel = (value) => labelFrom(concernOptions, value);
export const schoolChangeLabel = (value) => labelFrom(schoolChangeOptions, value);
export const languageLabel = (value) => labelFrom(languageOptions, value);
export const communicationLabel = (value) => labelFrom(communicationOptions, value);

// ------------------------------------------------------------------- Limits

export const LIMITS = {
  parentName: 80,
  email: 120,
  mobile: 20,
  childFirstName: 40,
  currentClass: 30,
  currentSchool: 90,
  concernDetails: 1000,
  sessionExpectation: 500,
  internalNotes: 4000,
  meetingLink: 500
};

// --------------------------------------------------------------- Validation

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Digits only, so `+91 98765 43210` and `09876543210` both normalise. */
export const normalisePhone = (value) => String(value || '').replace(/[^\d]/g, '');

export const isValidEmail = (value) => EMAIL_RE.test(String(value || '').trim());

/**
 * Indian mobile numbers are ten digits starting 6-9, optionally carrying a
 * country code or a trunk zero. Anything else is rejected rather than silently
 * stored, because these numbers are what the school calls back on.
 */
export const isValidPhone = (value) => {
  const digits = normalisePhone(value);
  if (digits.length === 10) return /^[6-9]/.test(digits);
  if (digits.length === 11) return digits.startsWith('0') && /^[6-9]/.test(digits.slice(1));
  if (digits.length === 12) return digits.startsWith('91') && /^[6-9]/.test(digits.slice(2));
  if (digits.length === 13) return digits.startsWith('091') && /^[6-9]/.test(digits.slice(3));
  return false;
};

const text = (value) => String(value ?? '').trim();

/**
 * Field-by-field errors for one step of the wizard, keyed by field name.
 *
 * The same function runs in the browser (to light up a field as the parent
 * moves through the form) and on the server (because a browser check is a
 * courtesy, not a control).
 */
export const validateParentStep = (draft = {}) => {
  const errors = {};
  const name = text(draft.parentName);
  if (name.length < 2) errors.parentName = 'Please enter your full name.';
  else if (name.length > LIMITS.parentName) errors.parentName = 'That name is too long.';

  if (!isValidPhone(draft.mobile)) {
    errors.mobile = 'Please enter a valid 10-digit mobile number.';
  }
  if (text(draft.whatsapp) && !isValidPhone(draft.whatsapp)) {
    errors.whatsapp = 'Please enter a valid WhatsApp number, or leave it blank.';
  }
  if (!isValidEmail(draft.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!communicationOptions.some((o) => o.value === draft.preferredCommunication)) {
    errors.preferredCommunication = 'Please choose how we should reach you.';
  }
  return errors;
};

export const validateChildStep = (draft = {}) => {
  const errors = {};
  const first = text(draft.childFirstName);
  if (first.length < 2) errors.childFirstName = "Please enter your child's first name.";
  else if (first.length > LIMITS.childFirstName) errors.childFirstName = 'That name is too long.';

  const age = Number(draft.childAge);
  if (!Number.isFinite(age) || age < 2 || age > 22) {
    errors.childAge = 'Please enter an age between 2 and 22.';
  }
  if (!text(draft.currentClass)) {
    errors.currentClass = 'Please tell us which class your child is in.';
  } else if (text(draft.currentClass).length > LIMITS.currentClass) {
    errors.currentClass = 'That is too long.';
  }
  if (text(draft.currentSchool).length > LIMITS.currentSchool) {
    errors.currentSchool = 'That is too long.';
  }
  if (!concernOptions.some((o) => o.value === draft.primaryConcern)) {
    errors.primaryConcern = 'Please choose what you would like to discuss.';
  }
  const details = text(draft.concernDetails);
  if (details.length > LIMITS.concernDetails) {
    errors.concernDetails = `Please keep this under ${LIMITS.concernDetails} characters.`;
  }
  if (text(draft.sessionExpectation).length > LIMITS.sessionExpectation) {
    errors.sessionExpectation = `Please keep this under ${LIMITS.sessionExpectation} characters.`;
  }
  if (!schoolChangeOptions.some((o) => o.value === draft.schoolChangeIntent)) {
    errors.schoolChangeIntent = 'Please choose one of the options.';
  }
  if (!languageOptions.some((o) => o.value === draft.preferredLanguage)) {
    errors.preferredLanguage = 'Please choose a language for the session.';
  }
  return errors;
};

export const validateConsentStep = (draft = {}) => {
  const errors = {};
  if (draft.guidanceConsent !== true) {
    errors.guidanceConsent = 'Please confirm you have read this before continuing.';
  }
  if (draft.dataConsent !== true) {
    errors.dataConsent = 'We need this consent to schedule your session.';
  }
  return errors;
};

/** Everything a booking needs before a slot may be held. */
export const validateBooking = (draft = {}) => ({
  ...validateParentStep(draft),
  ...validateChildStep(draft),
  ...validateConsentStep(draft)
});

export const hasErrors = (errors) => Object.keys(errors || {}).length > 0;

// -------------------------------------------------------------- Normalisation

/**
 * The shape stored in Firestore, built only from fields the schema knows about
 * so a crafted request cannot add keys of its own.
 */
export const sanitizeBookingInput = (draft = {}) => ({
  parentName: text(draft.parentName).slice(0, LIMITS.parentName),
  mobile: normalisePhone(draft.mobile).slice(-10),
  whatsapp: text(draft.whatsapp) ? normalisePhone(draft.whatsapp).slice(-10) : '',
  email: text(draft.email).toLowerCase().slice(0, LIMITS.email),
  preferredCommunication: text(draft.preferredCommunication),

  childFirstName: text(draft.childFirstName).slice(0, LIMITS.childFirstName),
  childAge: Number(draft.childAge),
  currentClass: text(draft.currentClass).slice(0, LIMITS.currentClass),
  currentSchool: text(draft.currentSchool).slice(0, LIMITS.currentSchool),

  primaryConcern: text(draft.primaryConcern),
  concernDetails: text(draft.concernDetails).slice(0, LIMITS.concernDetails),
  schoolChangeIntent: text(draft.schoolChangeIntent),
  sessionExpectation: text(draft.sessionExpectation).slice(0, LIMITS.sessionExpectation),
  preferredLanguage: text(draft.preferredLanguage),

  marketingConsent: draft.marketingConsent === true,
  guidanceConsent: draft.guidanceConsent === true,
  dataConsent: draft.dataConsent === true
});

// ------------------------------------------------------------------ Booking ID

// No 0/O and no 1/I/L — the pairs a parent reading a reference down the phone
// gets wrong, and the pairs a member of staff mistypes off a handwritten note.
const ID_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/**
 * A short reference a parent can read down the phone, prefixed so it is
 * obviously a Parent Room booking in the inbox.
 */
export const generateBookingId = (random = Math.random) => {
  let suffix = '';
  for (let i = 0; i < 6; i += 1) {
    suffix += ID_ALPHABET[Math.floor(random() * ID_ALPHABET.length)];
  }
  return `PR-${suffix}`;
};

/** Accepts exactly what `generateBookingId` produces — L and I included in the
 *  exclusions, so a mistyped `PR-ABCDEL` is rejected rather than looked up. */
export const isValidBookingId = (value) =>
  /^PR-[23456789A-HJKMNP-Z]{6}$/.test(String(value || ''));

// ------------------------------------------------------- Campaign attribution

export const CAMPAIGN_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid'
];

/**
 * A readable channel name for the admin table, inferred from the UTM values
 * when the ad platform supplied them and from the click id when it did not.
 */
export const describeChannel = ({ source, medium, fbclid } = {}) => {
  const s = String(source || '').toLowerCase();
  const m = String(medium || '').toLowerCase();
  if (s.includes('instagram') || s === 'ig') return 'Instagram';
  if (s.includes('facebook') || s === 'fb' || s === 'meta') return 'Facebook';
  if (s.includes('whatsapp')) return 'WhatsApp';
  if (s.includes('google')) return 'Google';
  if (fbclid) return 'Facebook';
  if (m.includes('cpc') || m.includes('paid')) return 'Paid social';
  if (m.includes('social')) return 'Organic social';
  if (s) return source;
  return 'Direct';
};

export const sanitizeCampaign = (query = {}) => {
  const pick = (key) => String(query[key] ?? '').trim().slice(0, 120);
  const source = pick('utm_source');
  const medium = pick('utm_medium');
  const campaign = pick('utm_campaign');
  const adCreative = pick('utm_content');
  const term = pick('utm_term');
  const fbclid = pick('fbclid');
  const gclid = pick('gclid');
  return {
    source,
    medium,
    campaign,
    adCreative,
    term,
    fbclid,
    gclid,
    channel: describeChannel({ source, medium, fbclid })
  };
};
