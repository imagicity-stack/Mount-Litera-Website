/**
 * The Parent Room — payment service layer.
 *
 * The whole module talks to the gateway through this file and nowhere else, so
 * the booking routes never handle a key, never compute a signature, and never
 * have to know which provider is behind it.
 *
 * The provider is the one the site already uses: the Razorpay client in
 * `lib/razorpayClient.js`, shared with the admission-token routes rather than
 * reimplemented. The amount is always decided on the server from the saved
 * settings — a price arriving from the browser is ignored, because that is the
 * field an attacker would edit first.
 *
 * Every credential is read through `cleanKey`. A key pasted into a hosting
 * dashboard routinely picks up a trailing newline, and untrimmed that breaks
 * two things at once: order creation is rejected with a 401 that looks like a
 * wrong key, and — far worse — the HMAC would be computed with a different
 * secret than the one Razorpay signed with, so a real payment would fail
 * verification and never confirm.
 */

import crypto from 'node:crypto';

import Razorpay, { cleanKey } from '@/lib/razorpayClient';

const keyId = () => cleanKey(process.env.RAZORPAY_KEY_ID);
const keySecret = () => cleanKey(process.env.RAZORPAY_KEY_SECRET);

export const paymentsConfigured = () => Boolean(keyId() && keySecret());

/**
 * The publishable key the checkout widget needs. Razorpay key ids are designed
 * to be public; the secret never leaves the server.
 */
export const checkoutKeyId = () =>
  cleanKey(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) || keyId();

export const toPaise = (rupees) => Math.round(Number(rupees) * 100);

export const createOrder = async ({ amountInPaise, receipt, notes }) => {
  if (!paymentsConfigured()) {
    throw new Error('Payment gateway is not configured.');
  }

  const client = new Razorpay({ key_id: keyId(), key_secret: keySecret() });

  return client.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt: String(receipt || '').slice(0, 40),
    notes: notes || {}
  });
};

/**
 * Recompute the signature from the order and payment ids and compare it with
 * the one the browser handed back. This is the only thing that turns a booking
 * into a paid booking — a `success` flag from the client is never trusted.
 */
export const verifySignature = ({ orderId, paymentId, signature }) => {
  const secret = keySecret();
  if (!secret || !orderId || !paymentId || !signature) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const given = String(signature).trim();
  // Equal-length buffers are required before a constant-time compare, and an
  // unequal length is itself a mismatch.
  if (expected.length !== given.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(given));
};

/**
 * What is actually wrong with the payment configuration, for the portal's
 * self-check. Reports the *shape* of the credentials — never their value.
 */
export const describePaymentConfig = () => {
  const id = keyId();
  const secret = keySecret();
  const rawId = String(process.env.RAZORPAY_KEY_ID ?? '');
  const rawSecret = String(process.env.RAZORPAY_KEY_SECRET ?? '');

  return {
    keyIdPresent: Boolean(id),
    keySecretPresent: Boolean(secret),
    // A key that only works after trimming is a configuration bug worth naming
    // explicitly, because it is invisible in a dashboard.
    keyIdHadWhitespace: rawId !== rawId.trim(),
    keySecretHadWhitespace: rawSecret !== rawSecret.trim(),
    mode: id.startsWith('rzp_live_') ? 'live' : id.startsWith('rzp_test_') ? 'test' : 'unrecognised',
    keyIdPrefix: id ? `${id.slice(0, 12)}…` : '',
    keySecretLength: secret.length,
    publishableKeyMatchesSecretKey: !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      ? true
      : cleanKey(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) === id
  };
};
