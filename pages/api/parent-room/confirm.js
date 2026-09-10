/**
 * Turn a held slot into a confirmed session.
 *
 * The server decides how this booking is being paid for; the browser only
 * supplies the gateway's response. A `success: true` arriving from the client
 * confirms nothing — the signature is recomputed here from the order id, the
 * payment id and the secret, and a booking becomes paid only if that matches.
 *
 * Confirming twice is deliberately harmless. A double-tapped button, a retried
 * request or a reloaded checkout returns the same booking and sends no second
 * email, because the confirmation is a transaction and each email is claimed
 * before it is sent.
 */

import {
  BookingConflict,
  claimEmail,
  confirmBooking,
  getBooking,
  loadSettings,
  publicBookingView,
  recordPaymentFailure,
  releaseEmailClaim,
  tokenMatches
} from '@/lib/parentRoomStore';
import { BOOKING_STATUS, PAYMENT_STATUS, isValidBookingId } from '@/lib/parentRoom';
import { paymentsConfigured, verifySignature } from '@/lib/parentRoomPayments';
import {
  adminBookingEmail,
  adminRecipient,
  dispatch,
  parentConfirmationEmail
} from '@/lib/parentRoomEmails';

/**
 * Decide, on the server, what payment state this booking may be confirmed in.
 * Every branch is a real state of the world — none of them is a stand-in for a
 * payment that did not happen.
 */
const resolvePayment = (booking, settings, body) => {
  const fee = Number(booking.amount ?? settings.participationFee);

  if (!Number.isFinite(fee) || fee <= 0) {
    return { status: PAYMENT_STATUS.WAIVED, reference: '', orderId: '' };
  }

  const gatewayLive = settings.paymentMode === 'razorpay' && paymentsConfigured();

  if (!gatewayLive) {
    // The school is collecting the fee outside the site. The booking is real
    // and holds its slot; the money is simply not settled yet, and both emails
    // say so.
    return { status: PAYMENT_STATUS.PENDING, reference: '', orderId: '' };
  }

  const orderId = String(body.orderId || booking.paymentOrderId || '');
  const paymentId = String(body.paymentId || '');
  const signature = String(body.signature || '');

  if (!orderId || !paymentId || !signature) {
    return { error: 'We did not receive the payment details. Please try again.' };
  }
  // The order must be the one this booking raised, or a signature from an
  // unrelated payment would verify perfectly well.
  if (booking.paymentOrderId && orderId !== booking.paymentOrderId) {
    return { error: 'Those payment details do not match this booking.' };
  }
  if (!verifySignature({ orderId, paymentId, signature })) {
    return { error: 'We could not verify that payment. No amount has been confirmed.' };
  }

  return { status: PAYMENT_STATUS.PAID, reference: paymentId, orderId };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  res.setHeader('Cache-Control', 'no-store');

  const body = req.body || {};
  const { bookingId, reservationToken } = body;

  if (!isValidBookingId(bookingId) || !reservationToken) {
    return res.status(400).json({ message: 'That booking reference is not valid.' });
  }

  let settings;
  let existing;
  try {
    settings = await loadSettings();
    existing = await getBooking(bookingId);
  } catch (error) {
    // Never report an unreachable database as a missing booking: the parent
    // may have just been charged, and "not found" would be the wrong thing to
    // tell them.
    return res.status(503).json({
      message: 'We could not reach the booking just now. Please try again in a moment.',
      code: 'unavailable',
      bookingId
    });
  }

  if (!existing || !tokenMatches(existing, reservationToken)) {
    return res.status(404).json({ message: 'That booking could not be found.' });
  }

  // A booking already confirmed simply reports itself, so a retry is safe.
  if (existing.bookingStatus === BOOKING_STATUS.CONFIRMED) {
    return res.status(200).json({
      booking: publicBookingView(existing, settings),
      alreadyConfirmed: true
    });
  }

  const payment = resolvePayment(existing, settings, body);
  if (payment.error) {
    await recordPaymentFailure(bookingId, payment.error);
    return res.status(400).json({ message: payment.error, code: 'payment_unverified' });
  }

  let confirmed;
  try {
    const result = await confirmBooking({
      bookingId,
      paymentStatus: payment.status,
      paymentReference: payment.reference,
      paymentOrderId: payment.orderId
    });
    confirmed = result.booking;
  } catch (error) {
    if (error instanceof BookingConflict) {
      return res.status(409).json({ message: error.message, code: error.code });
    }
    // eslint-disable-next-line no-console
    console.error('Parent Room confirm failed:', error?.message);
    return res.status(500).json({
      message: 'We could not confirm that booking. Please contact the school with your booking ID.',
      code: 'server_error',
      bookingId
    });
  }

  // Emails come after the booking is safely stored: the session exists whether
  // or not the mail server is having a good day, and the portal can resend.
  const sendOnce = async (key, to, template, replyTo) => {
    if (!(await claimEmail(bookingId, key))) return;
    const sent = await dispatch({ to, template, replyTo });
    if (!sent) await releaseEmailClaim(bookingId, key);
  };

  await Promise.all([
    sendOnce('parentConfirmation', confirmed.email, parentConfirmationEmail(confirmed, settings)),
    sendOnce(
      'adminNotification',
      adminRecipient(),
      adminBookingEmail(confirmed, settings),
      confirmed.email
    )
  ]);

  return res.status(200).json({
    booking: publicBookingView(confirmed, settings),
    alreadyConfirmed: false
  });
}
