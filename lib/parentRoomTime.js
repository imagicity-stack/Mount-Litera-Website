/**
 * The Parent Room — time and slot arithmetic.
 *
 * Every session time in this module is Asia/Kolkata, and every stored instant
 * is a plain UTC Date. India observes no daylight saving, so a fixed +05:30
 * offset converts between the two exactly, all year, without a timezone
 * library. Doing the maths here rather than with `toLocaleString` keeps the
 * server and the browser in agreement no matter where either one is running.
 *
 * The other job of this file is the slot *id*. A slot's identity is derived
 * from its date and start minute — `2026-09-15T1000` — which means the booking
 * transaction can address the document directly instead of querying for it.
 * That is what makes the double-booking guard a single-document atomic
 * read-modify-write rather than a race between two queries.
 */

import { IST_OFFSET_MINUTES, SLOT_STATUS } from '@/lib/parentRoom';

const MINUTE = 60 * 1000;
const DAY_MINUTES = 24 * 60;

const pad = (n, width = 2) => String(n).padStart(width, '0');

// --------------------------------------------------------------- Conversions

/** The wall-clock date in India for a given instant, as `YYYY-MM-DD`. */
export const istDateKey = (instant) => {
  const shifted = new Date(instant.getTime() + IST_OFFSET_MINUTES * MINUTE);
  return `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}-${pad(
    shifted.getUTCDate()
  )}`;
};

/** Minutes past midnight India time for a given instant. */
export const istMinutesOfDay = (instant) => {
  const shifted = new Date(instant.getTime() + IST_OFFSET_MINUTES * MINUTE);
  return shifted.getUTCHours() * 60 + shifted.getUTCMinutes();
};

/** The instant at `minutes` past midnight India time on `dateKey`. */
export const istInstant = (dateKey, minutes = 0) => {
  const [year, month, day] = String(dateKey).split('-').map(Number);
  const midnightUtc = Date.UTC(year, month - 1, day, 0, 0, 0, 0);
  return new Date(midnightUtc - IST_OFFSET_MINUTES * MINUTE + minutes * MINUTE);
};

/** 0 = Sunday … 6 = Saturday, in India time. */
export const istWeekday = (dateKey) => {
  const [year, month, day] = String(dateKey).split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
};

export const addDaysToKey = (dateKey, days) => {
  const [year, month, day] = String(dateKey).split('-').map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}-${pad(
    shifted.getUTCDate()
  )}`;
};

export const isValidDateKey = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return false;
  const [year, month, day] = String(value).split('-').map(Number);
  const probe = new Date(Date.UTC(year, month - 1, day));
  return (
    probe.getUTCFullYear() === year &&
    probe.getUTCMonth() === month - 1 &&
    probe.getUTCDate() === day
  );
};

// ----------------------------------------------------------------- Formatting

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const MONTH_SHORT = MONTH_NAMES.map((m) => m.slice(0, 3));

export const weekdayName = (index) => WEEKDAY_NAMES[index] || '';
export const weekdayShort = (index) => WEEKDAY_SHORT[index] || '';
export const monthName = (index) => MONTH_NAMES[index] || '';

/** `10:00 AM` — the form every time is shown in, to parents and to staff. */
export const formatMinutes = (minutes) => {
  const total = ((Math.round(minutes) % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES;
  const hour24 = Math.floor(total / 60);
  const minute = total % 60;
  const suffix = hour24 < 12 ? 'AM' : 'PM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${pad(minute)} ${suffix}`;
};

/** `Monday, 15 September 2026`. */
export const formatDateKey = (dateKey, { short = false } = {}) => {
  if (!isValidDateKey(dateKey)) return '';
  const [year, month, day] = String(dateKey).split('-').map(Number);
  const weekday = istWeekday(dateKey);
  return short
    ? `${WEEKDAY_SHORT[weekday]}, ${day} ${MONTH_SHORT[month - 1]} ${year}`
    : `${WEEKDAY_NAMES[weekday]}, ${day} ${MONTH_NAMES[month - 1]} ${year}`;
};

/** The one line an email or a confirmation screen shows for an appointment. */
export const formatAppointment = (dateKey, startMinutes, durationMinutes) =>
  `${formatDateKey(dateKey)} · ${formatMinutes(startMinutes)} – ${formatMinutes(
    startMinutes + durationMinutes
  )} IST`;

// ----------------------------------------------------------------- Slot ids

/** `2026-09-15T1000` — derived, so two requests for one slot collide by design. */
export const buildSlotId = (dateKey, startMinutes) => {
  const hours = Math.floor(startMinutes / 60);
  const minutes = startMinutes % 60;
  return `${dateKey}T${pad(hours)}${pad(minutes)}`;
};

export const parseSlotId = (slotId) => {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2})(\d{2})$/.exec(String(slotId || ''));
  if (!match) return null;
  const [, dateKey, hh, mm] = match;
  if (!isValidDateKey(dateKey)) return null;
  const startMinutes = Number(hh) * 60 + Number(mm);
  if (startMinutes >= DAY_MINUTES) return null;
  return { dateKey, startMinutes };
};

// -------------------------------------------------------------- Slot grid

/**
 * The times the school offers on one date, before any bookings are considered.
 *
 * Returns `[]` for a date the configuration closes — a blocked date, a weekday
 * that is not in the roster and not opened explicitly — so a caller can treat
 * "no times" and "closed" the same way.
 */
export const slotGridForDate = (dateKey, settings) => {
  if (!isValidDateKey(dateKey)) return [];

  const {
    availableWeekdays = [],
    blockedDates = [],
    extraDates = [],
    dayStartMinutes,
    dayEndMinutes,
    sessionDuration,
    bufferMinutes
  } = settings;

  if (blockedDates.includes(dateKey)) return [];

  const openByWeekday = availableWeekdays.includes(istWeekday(dateKey));
  const openByException = extraDates.includes(dateKey);
  if (!openByWeekday && !openByException) return [];

  const step = Math.max(5, sessionDuration + bufferMinutes);
  const slots = [];
  for (
    let start = dayStartMinutes;
    start + sessionDuration <= dayEndMinutes;
    start += step
  ) {
    slots.push({
      slotId: buildSlotId(dateKey, start),
      dateKey,
      startMinutes: start,
      endMinutes: start + sessionDuration,
      label: formatMinutes(start)
    });
  }
  return slots;
};

/**
 * The earliest instant a parent may book, given the notice the school requires.
 * A four-hour notice at 09:00 rules out everything before 13:00 today.
 */
export const earliestBookableInstant = (settings, now = new Date()) =>
  new Date(now.getTime() + Math.max(0, settings.minimumBookingNoticeHours) * 60 * MINUTE);

/** The inclusive date range the booking window covers. */
export const bookingWindow = (settings, now = new Date()) => {
  const firstDate = istDateKey(now);
  return {
    firstDate,
    lastDate: addDaysToKey(firstDate, Math.max(0, settings.bookingWindowDays - 1))
  };
};

export const isWithinBookingWindow = (dateKey, settings, now = new Date()) => {
  const { firstDate, lastDate } = bookingWindow(settings, now);
  return dateKey >= firstDate && dateKey <= lastDate;
};

/**
 * Merge the configured grid for a date with what Firestore already knows,
 * and decide what a parent may actually pick.
 *
 * `slotDocs` is keyed by slot id. A hold that has run out of time is treated as
 * available again here and reclaimed for real inside the booking transaction,
 * so an abandoned checkout frees its slot without needing a sweeper job.
 */
export const resolveDayAvailability = (dateKey, settings, slotDocs = {}, now = new Date()) => {
  const grid = slotGridForDate(dateKey, settings);
  if (grid.length === 0) {
    return { dateKey, open: false, slots: [], bookedCount: 0, remaining: 0 };
  }

  const cutoff = earliestBookableInstant(settings, now);
  let bookedCount = 0;

  const slots = grid.map((slot) => {
    const doc = slotDocs[slot.slotId];
    const startsAt = istInstant(dateKey, slot.startMinutes);
    const reservedUntil = doc?.reservedUntil ? new Date(doc.reservedUntil) : null;
    const holdIsLive = Boolean(reservedUntil && reservedUntil.getTime() > now.getTime());

    let status = SLOT_STATUS.AVAILABLE;
    if (doc?.status === SLOT_STATUS.BOOKED) status = SLOT_STATUS.BOOKED;
    else if (doc?.status === SLOT_STATUS.BLOCKED) status = SLOT_STATUS.BLOCKED;
    else if (doc?.status === SLOT_STATUS.RESERVED && holdIsLive) status = SLOT_STATUS.RESERVED;

    if (status === SLOT_STATUS.BOOKED) bookedCount += 1;

    const tooSoon = startsAt.getTime() < cutoff.getTime();
    return {
      ...slot,
      status,
      startsAt: startsAt.toISOString(),
      endsAt: istInstant(dateKey, slot.endMinutes).toISOString(),
      selectable: status === SLOT_STATUS.AVAILABLE && !tooSoon,
      // Distinguishing these lets the calendar explain itself rather than
      // silently greying half the day out.
      reason: status !== SLOT_STATUS.AVAILABLE ? 'taken' : tooSoon ? 'too-soon' : ''
    };
  });

  // A daily cap closes the rest of the day once it is reached, rather than
  // letting the seventh parent of the day get all the way to payment.
  const capped = bookedCount >= settings.maximumDailySessions;
  const finalSlots = capped
    ? slots.map((slot) =>
        slot.selectable ? { ...slot, selectable: false, reason: 'day-full' } : slot
      )
    : slots;

  return {
    dateKey,
    open: true,
    slots: finalSlots,
    bookedCount,
    remaining: Math.max(0, settings.maximumDailySessions - bookedCount)
  };
};

/** Calendar months spanned by the booking window, for the month grid. */
export const monthsInWindow = (settings, now = new Date()) => {
  const { firstDate, lastDate } = bookingWindow(settings, now);
  const [firstYear, firstMonth] = firstDate.split('-').map(Number);
  const [lastYear, lastMonth] = lastDate.split('-').map(Number);
  const months = [];
  let year = firstYear;
  let month = firstMonth;
  while (year < lastYear || (year === lastYear && month <= lastMonth)) {
    months.push({ year, month, key: `${year}-${pad(month)}` });
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return months;
};

/** The day cells of one month, padded so the 1st lands under its weekday. */
export const monthGrid = (year, month) => {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(`${year}-${pad(month)}-${pad(day)}`);
  }
  return cells;
};
