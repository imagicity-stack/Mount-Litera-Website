/**
 * The admin calendar, and the controls over it.
 *
 * GET returns the full state of every configured time in a date range —
 * including who holds a booked slot — which is more than the public
 * availability endpoint will ever say, and is why this one is admin-guarded.
 *
 * POST blocks or unblocks an individual time. Blocking a time that already has
 * a confirmed booking is refused rather than silently orphaning the parent;
 * the booking has to be moved or cancelled first.
 */

import { requireAdmin } from '@/lib/adminAuth';
import { SLOT_STATUS } from '@/lib/parentRoom';
import {
  BookingConflict,
  bookingsCollection,
  loadSettings,
  setSlotBlocked,
  slotDocsInRange
} from '@/lib/parentRoomStore';
import {
  addDaysToKey,
  formatDateKey,
  isValidDateKey,
  istDateKey,
  resolveDayAvailability
} from '@/lib/parentRoomTime';

/** Booking headlines for the slots in view, so the calendar can label them. */
const bookingSummaries = async (dateKeys) => {
  if (dateKeys.length === 0) return {};
  const summaries = {};
  // Firestore caps an `in` filter at 30 values, so ask a day at a time when the
  // range is wide. A month of dates is a handful of small queries.
  const chunks = [];
  for (let i = 0; i < dateKeys.length; i += 25) chunks.push(dateKeys.slice(i, i + 25));

  await Promise.all(
    chunks.map(async (chunk) => {
      const snapshot = await bookingsCollection().where('dateKey', 'in', chunk).get();
      snapshot.forEach((doc) => {
        const data = doc.data() || {};
        if (!data.slotId) return;
        summaries[data.slotId] = {
          bookingId: data.bookingId || doc.id,
          parentName: data.parentName || '',
          childFirstName: data.childFirstName || '',
          bookingStatus: data.bookingStatus || '',
          paymentStatus: data.paymentStatus || '',
          hasMeetingLink: Boolean(data.meetingLink)
        };
      });
    })
  );

  return summaries;
};

export default async function handler(req, res) {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return undefined;

  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    const settings = await loadSettings();
    const today = istDateKey(new Date());
    const from = isValidDateKey(req.query.from) ? req.query.from : today;
    const to = isValidDateKey(req.query.to) ? req.query.to : addDaysToKey(from, 30);

    if (to < from) {
      return res.status(400).json({ message: 'That date range runs backwards.' });
    }
    // A bounded window keeps one careless request from reading the whole
    // calendar; the UI never needs more than a couple of months at a time.
    if (to > addDaysToKey(from, 92)) {
      return res.status(400).json({ message: 'Please request 92 days or fewer.' });
    }

    try {
      const slotDocs = await slotDocsInRange(from, to);
      const now = new Date();
      const days = [];
      const openDateKeys = [];

      for (let cursor = from; cursor <= to; cursor = addDaysToKey(cursor, 1)) {
        const day = resolveDayAvailability(cursor, settings, slotDocs, now);
        if (!day.open) {
          days.push({
            dateKey: cursor,
            label: formatDateKey(cursor, { short: true }),
            open: false,
            slots: [],
            bookedCount: 0
          });
          continue;
        }
        openDateKeys.push(cursor);
        days.push({
          dateKey: cursor,
          label: formatDateKey(cursor, { short: true }),
          open: true,
          bookedCount: day.bookedCount,
          remaining: day.remaining,
          slots: day.slots
        });
      }

      const summaries = await bookingSummaries(openDateKeys);
      days.forEach((day) => {
        day.slots = day.slots.map((slot) => ({
          ...slot,
          booking:
            slot.status === SLOT_STATUS.BOOKED || slot.status === SLOT_STATUS.RESERVED
              ? summaries[slot.slotId] || null
              : null
        }));
      });

      return res.status(200).json({ days, settings, range: { from, to } });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Parent Room calendar failed:', error?.message);
      return res.status(500).json({ message: 'Could not load the calendar.' });
    }
  }

  if (req.method === 'POST') {
    const { action, slotId } = req.body || {};
    if (action !== 'block' && action !== 'unblock') {
      return res.status(400).json({ message: 'Unknown action.' });
    }
    try {
      await setSlotBlocked(String(slotId), action === 'block', adminUser.email);
      return res
        .status(200)
        .json({ message: action === 'block' ? 'Time blocked.' : 'Time reopened.' });
    } catch (error) {
      if (error instanceof BookingConflict) {
        return res.status(409).json({ message: error.message, code: error.code });
      }
      // eslint-disable-next-line no-console
      console.error('Parent Room slot update failed:', error?.message);
      return res.status(500).json({ message: 'Could not update that time.' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ message: 'Method not allowed.' });
}
