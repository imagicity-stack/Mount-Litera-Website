/**
 * A parent re-reading their own confirmation.
 *
 * Requires the reservation token issued when the slot was held, so a guessed
 * booking id returns nothing, and returns only the narrow confirmation view —
 * never the concern the parent typed, the internal notes, or the campaign the
 * click came from.
 */

import { getBooking, loadSettings, publicBookingView, tokenMatches } from '@/lib/parentRoomStore';
import { isValidBookingId } from '@/lib/parentRoom';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  res.setHeader('Cache-Control', 'no-store');

  const { id, token } = req.query;
  if (!isValidBookingId(id) || !token) {
    return res.status(400).json({ message: 'That booking reference is not valid.' });
  }

  let booking;
  try {
    booking = await getBooking(id);
  } catch (error) {
    // "We cannot reach the database" and "that booking does not exist" are
    // very different things to tell someone who has just paid, so a lookup
    // failure is never reported as a missing booking.
    return res.status(503).json({
      message: 'We could not reach the booking just now. Please try again in a moment.',
      code: 'unavailable'
    });
  }

  // Same answer for "no such booking" and "wrong token", so the endpoint
  // cannot be used to find out which booking ids exist.
  if (!booking || !tokenMatches(booking, String(token))) {
    return res.status(404).json({ message: 'That booking could not be found.' });
  }

  const settings = await loadSettings();
  return res.status(200).json({ booking: publicBookingView(booking, settings) });
}
