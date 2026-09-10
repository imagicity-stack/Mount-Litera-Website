/**
 * The Parent Room — payment service layer.
 *
 * The whole module talks to the gateway through this file and nowhere else, so
 * the booking routes never handle a key, never compute a signature, and never
 * have to know which provider is behind it.
 *
 * The provider is the one the site already uses: the Razorpay client in
 * `app/api/razorpay/order/razorpay.js`, reused rather than reimplemented. The
 * amount is always decided on the server from the saved settings — a price
 * arriving from the browser is ignored, because that is the field an attacker
 * would edit first.
 */

import crypto from 'node:crypto';

import Razorpay from '@/app/api/razorpay/order/razorpay';

export const paymentsConfigured = () =>
  Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

/**
 * The publishable key the checkout widget needs. Razorpay key ids are designed
 * to be public; the secret never leaves the server.
 */
export const checkoutKeyId = () =>
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '';

export const toPaise = (rupees) => Math.round(Number(rupees) * 100);

export const createOrder = async ({ amountInPaise, receipt, notes }) => {
  if (!paymentsConfigured()) {
    throw new Error('Payment gateway is not configured.');
  }

  const client = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const order = await client.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt: String(receipt || '').slice(0, 40),
    notes: notes || {}
  });

  if (!order?.id) {
    throw new Error('Invalid response from the payment gateway.');
  }

  return order;
};

/**
 * Recompute the signature from the order and payment ids and compare it with
 * the one the browser handed back. This is the only thing that turns a booking
 * into a paid booking — a `success` flag from the client is never trusted.
 */
export const verifySignature = ({ orderId, paymentId, signature }) => {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret || !orderId || !paymentId || !signature) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const given = String(signature);
  // Equal-length buffers are required before a constant-time compare, and an
  // unequal length is itself a mismatch.
  if (expected.length !== given.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(given));
};
