/**
 * Hold a slot and open a booking.
 *
 * This is the point where a parent's answers become a record and a time on the
 * calendar becomes theirs. Every field is revalidated here — the browser
 * checked the same rules a moment ago, but a browser check is a courtesy to the
 * person filling the form, not a control over what reaches the database.
 *
 * The response carries a reservation token. It is the only thing that will let
 * the confirm route finish this booking, so knowing a booking id — which ends
 * up in an email, a URL and an admin table — is not enough to complete, alter
 * or hijack somebody else's session.
 */

import {
  BookingConflict,
  loadSettings,
  reserveSlot
} from '@/lib/parentRoomStore';
import {
  hasErrors,
  sanitizeBookingInput,
  sanitizeCampaign,
  validateBooking
} from '@/lib/parentRoom';
import { paymentsConfigured } from '@/lib/parentRoomPayments';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  res.setHeader('Cache-Control', 'no-store');

  const body = req.body || {};
  const settings = await loadSettings();

  if (!settings.enabled) {
    return res.status(503).json({
      message: 'Parent Room bookings are closed at the moment. Please check back shortly.',
      code: 'closed'
    });
  }
  if (settings.degraded) {
    return res.status(503).json({
      message: 'We could not reach the booking calendar. Please try again in a moment.',
      code: 'degraded'
    });
  }

  const errors = validateBooking(body);
  if (hasErrors(errors)) {
    return res.status(400).json({
      message: 'Some details still need attention.',
      errors,
      code: 'invalid'
    });
  }

  const slotId = String(body.slotId || '');
  if (!slotId) {
    return res.status(400).json({ message: 'Please choose a date and time.', code: 'no_slot' });
  }

  const booking = sanitizeBookingInput(body);
  const campaign = sanitizeCampaign(body.campaign || {});

  try {
    const { bookingId, reservationToken, expiresAt } = await reserveSlot({
      slotId,
      settings,
      booking,
      campaign,
      requestMeta: { landingPath: String(body.landingPath || '').slice(0, 300) }
    });

    // Only ever `true` when the gateway is genuinely configured — the wizard
    // uses this to decide between a real checkout and the offline path, and
    // must never be told a payment is possible when it is not.
    const online = settings.paymentMode === 'razorpay' && paymentsConfigured();

    return res.status(201).json({
      bookingId,
      reservationToken,
      expiresAt,
      amount: settings.participationFee,
      currency: settings.currency,
      payment: {
        required: settings.participationFee > 0,
        mode: settings.participationFee > 0 ? (online ? 'razorpay' : 'offline') : 'waived'
      }
    });
  } catch (error) {
    if (error instanceof BookingConflict) {
      return res.status(409).json({ message: error.message, code: error.code });
    }
    // eslint-disable-next-line no-console
    console.error('Parent Room hold failed:', error?.message);
    return res.status(500).json({
      message: 'We could not hold that time. Please try again.',
      code: 'server_error'
    });
  }
}
