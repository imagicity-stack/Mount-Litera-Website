/**
 * Public availability for the booking calendar.
 *
 * Returns only what a calendar needs to draw itself: which dates are open, and
 * which times on them can be picked. No booking, no parent and no child ever
 * appears in this response — a slot that is taken is simply not selectable.
 */

import { loadSettings, slotDocsInRange } from '@/lib/parentRoomStore';
import {
  addDaysToKey,
  bookingWindow,
  isValidDateKey,
  monthsInWindow,
  resolveDayAvailability
} from '@/lib/parentRoomTime';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  // Availability changes as parents book, so it is never cached at the edge.
  res.setHeader('Cache-Control', 'no-store');

  const settings = await loadSettings();
  const now = new Date();
  const { firstDate, lastDate } = bookingWindow(settings, now);

  const publicSettings = {
    enabled: settings.enabled,
    sessionDuration: settings.sessionDuration,
    participationFee: settings.participationFee,
    currency: settings.currency,
    timezone: settings.timezone,
    minimumBookingNoticeHours: settings.minimumBookingNoticeHours,
    bookingWindowDays: settings.bookingWindowDays,
    reservationHoldMinutes: settings.reservationHoldMinutes,
    counsellorName: settings.counsellorName,
    counsellorTitle: settings.counsellorTitle,
    paymentMode: settings.paymentMode
  };

  if (!settings.enabled) {
    return res.status(200).json({
      settings: publicSettings,
      window: { firstDate, lastDate },
      months: [],
      days: [],
      closed: true
    });
  }

  let slotDocs = {};
  let degraded = Boolean(settings.degraded);
  try {
    slotDocs = await slotDocsInRange(firstDate, lastDate);
  } catch (error) {
    // Without the slot documents every time would look free, and a parent
    // would be sent to a slot the transaction will reject. Say so instead.
    degraded = true;
  }

  const days = [];
  if (!degraded) {
    for (let cursor = firstDate; cursor <= lastDate; cursor = addDaysToKey(cursor, 1)) {
      if (!isValidDateKey(cursor)) break;
      const day = resolveDayAvailability(cursor, settings, slotDocs, now);
      if (!day.open) continue;
      const selectable = day.slots.filter((slot) => slot.selectable);
      if (selectable.length === 0) continue;
      days.push({
        dateKey: day.dateKey,
        remaining: day.remaining,
        slots: selectable.map(({ slotId, startMinutes, endMinutes, label, startsAt, endsAt }) => ({
          slotId,
          startMinutes,
          endMinutes,
          label,
          startsAt,
          endsAt
        }))
      });
    }
  }

  return res.status(200).json({
    settings: publicSettings,
    window: { firstDate, lastDate },
    months: monthsInWindow(settings, now),
    days,
    degraded,
    closed: false
  });
}
