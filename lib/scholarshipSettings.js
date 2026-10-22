/**
 * Edenwoods scholarship — backend-managed settings.
 *
 * What the office can change without a deploy: the registration number series,
 * how those numbers are made, and whether registration is accepting entries at
 * all.
 *
 * What is deliberately NOT here is the ₹199 fee and the dates. Those appear in
 * the signed Terms and Conditions that every parent agrees to at payment, and
 * a figure that could be edited in a portal while the document said something
 * else would be the worst kind of mismatch. They live in `lib/scholarship.js`
 * and change only alongside the document.
 */

export const SCHOLARSHIP_SETTINGS_COLLECTION = 'scholarship_settings';
export const SCHOLARSHIP_SETTINGS_DOC = 'config';

export const defaultScholarshipSettings = {
  /**
   * The series a registration number carries — `EMS27` gives `EMS27-K7M2QX`.
   * Next year this becomes `EMS28` and nothing else has to change.
   */
  registrationPrefix: 'EMS27',

  /**
   * `random`   — six unguessable characters. Two children registering a second
   *              apart get unrelated numbers, and a number tells an outsider
   *              nothing about how many have registered.
   * `sequential` — EMS27-0001, EMS27-0002. Easier to read out, to file, and to
   *              build a seating plan from; but it leaks the running total and
   *              leaves gaps wherever a payment was abandoned.
   */
  numberingMode: 'random',

  /** The next number to issue in sequential mode. */
  sequentialNext: 1,

  /** Zero-padded width in sequential mode: 4 gives 0001. */
  sequentialPadding: 4,

  /**
   * A manual switch that can close registration **early** — the hall is full,
   * or the office wants to stop taking entries before the published date.
   *
   * It deliberately cannot extend past the closing date. That date is in the
   * Terms every parent agreed to at payment, so taking entries after it would
   * put the page and the document in conflict. Extending means changing the
   * date and the Terms together, which is a deploy, not a toggle.
   */
  registrationOpen: true,

  /** Shown to a parent who arrives after registration has been closed. */
  closedMessage: ''
};

const PREFIX_RE = /^[A-Z][A-Z0-9]{1,11}$/;

export const sanitizePrefix = (value, fallback = defaultScholarshipSettings.registrationPrefix) => {
  const clean = String(value || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 12);
  return PREFIX_RE.test(clean) ? clean : fallback;
};

const clamp = (value, min, max, fallback) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
};

/** Stored settings layered over the defaults, with every value validated. */
export const mergeScholarshipSettings = (stored) => {
  const merged = { ...defaultScholarshipSettings, ...(stored || {}) };

  merged.registrationPrefix = sanitizePrefix(merged.registrationPrefix);
  merged.numberingMode = merged.numberingMode === 'sequential' ? 'sequential' : 'random';
  merged.sequentialNext = clamp(merged.sequentialNext, 1, 999999, 1);
  merged.sequentialPadding = clamp(merged.sequentialPadding, 3, 6, 4);
  merged.registrationOpen = merged.registrationOpen !== false;
  merged.closedMessage = String(merged.closedMessage || '').trim().slice(0, 300);

  return merged;
};

/** What the next number will look like — shown live in the portal. */
export const previewNextNumber = (settings) => {
  const s = mergeScholarshipSettings(settings);
  if (s.numberingMode === 'sequential') {
    return `${s.registrationPrefix}-${String(s.sequentialNext).padStart(s.sequentialPadding, '0')}`;
  }
  return `${s.registrationPrefix}-K7M2QX`;
};
