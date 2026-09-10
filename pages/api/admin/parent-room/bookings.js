/**
 * The bookings table.
 *
 * Admin-only, through the same `requireAdmin` guard as every other portal
 * route: a Firebase Authentication identity plus a `users/{uid}` document with
 * `role: 'admin'`. This response carries parents' contact details and children's
 * names, so there is no public read path to it and no degraded fallback — if
 * the caller is not an admin it gets an error, not a smaller answer.
 */

import { requireAdmin } from '@/lib/adminAuth';
import { BOOKING_STATUS } from '@/lib/parentRoom';
import { listBookings, loadSettings, sweepExpiredHolds } from '@/lib/parentRoomStore';
import { isValidDateKey } from '@/lib/parentRoomTime';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return undefined;

  res.setHeader('Cache-Control', 'no-store');

  const { from, to, limit } = req.query;

  try {
    // Holds that were never paid for are retired here rather than by a
    // background job, so the table an admin is about to read is already true.
    await sweepExpiredHolds();

    const [settings, bookings] = await Promise.all([
      loadSettings(),
      listBookings({
        fromDate: isValidDateKey(from) ? from : undefined,
        toDate: isValidDateKey(to) ? to : undefined,
        limit: Number(limit) || 500
      })
    ]);

    return res.status(200).json({
      bookings,
      settings,
      statuses: Object.values(BOOKING_STATUS)
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Parent Room bookings list failed:', error?.message);
    return res.status(500).json({ message: 'Could not load the bookings.' });
  }
}
