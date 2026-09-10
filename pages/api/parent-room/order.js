/**
 * Open a payment order against a held booking.
 *
 * The amount comes from the saved settings and the booking record, never from
 * the request — a price posted by the browser is ignored outright. The caller
 * must present the reservation token issued when the slot was held, so an order
 * can only be raised against your own booking.
 */

import {
  getBooking,
  attachOrder,
  loadSettings,
  tokenMatches
} from '@/lib/parentRoomStore';
import { BOOKING_STATUS, isValidBookingId } from '@/lib/parentRoom';
import { checkoutKeyId, createOrder, paymentsConfigured, toPaise } from '@/lib/parentRoomPayments';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  res.setHeader('Cache-Control', 'no-store');

  const { bookingId, reservationToken } = req.body || {};
  if (!isValidBookingId(bookingId) || !reservationToken) {
    return res.status(400).json({ message: 'That booking reference is not valid.' });
  }

  if (!paymentsConfigured()) {
    return res.status(503).json({
      message: 'Online payment is not available right now.',
      code: 'gateway_unconfigured'
    });
  }

  let booking;
  try {
    booking = await getBooking(bookingId);
  } catch (error) {
    return res.status(503).json({
      message: 'We could not reach the booking just now. Please try again in a moment.',
      code: 'unavailable'
    });
  }

  if (!booking || !tokenMatches(booking, reservationToken)) {
    return res.status(404).json({ message: 'That booking could not be found.' });
  }
  if (booking.bookingStatus !== BOOKING_STATUS.PENDING) {
    return res.status(409).json({
      message: 'That booking is no longer awaiting payment.',
      code: 'not_pending'
    });
  }

  const expiresAt = booking.reservationExpiresAt?.toMillis?.() ?? 0;
  if (expiresAt && expiresAt < Date.now()) {
    return res.status(409).json({
      message: 'Your hold on that time has expired. Please choose a time again.',
      code: 'hold_expired'
    });
  }

  const settings = await loadSettings();
  const amount = Number(booking.amount ?? settings.participationFee);
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'No payment is due for this booking.' });
  }

  try {
    const order = await createOrder({
      amountInPaise: toPaise(amount),
      receipt: booking.bookingId,
      notes: { bookingId: booking.bookingId, module: 'parent_room' }
    });

    // Recording the order id is bookkeeping that tightens the binding between
    // booking and payment; the order itself already exists at the gateway.
    // Failing the request here would send the parent back to a pay button for
    // an order that was raised, so this is logged and stepped over — confirm
    // still verifies the signature against the order id it is given.
    try {
      await attachOrder(booking.bookingId, order.id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Parent Room order id not recorded:', booking.bookingId, error?.message);
    }

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency || 'INR',
      keyId: checkoutKeyId()
    });
  } catch (error) {
    // The gateway's own words, logged in full. A bare "Bad Gateway" told
    // nobody anything the first time this failed in production.
    // eslint-disable-next-line no-console
    console.error('Parent Room order failed:', {
      bookingId: booking.bookingId,
      amount,
      message: error?.message,
      status: error?.status,
      code: error?.code,
      reason: error?.reason,
      details: error?.details
    });

    // Razorpay's descriptions are written to be shown ("amount must be at
    // least 100", "authentication failed") and carry no secret, so passing one
    // through turns an unactionable error into an actionable one. Anything
    // unrecognised falls back to the neutral line.
    const gatewayMessage =
      error?.name === 'RazorpayError' && error.message ? error.message : '';

    return res.status(502).json({
      message: gatewayMessage
        ? `The payment gateway refused the request: ${gatewayMessage}`
        : 'We could not start the payment. Please try again.',
      code: error?.code || 'gateway_error'
    });
  }
}
