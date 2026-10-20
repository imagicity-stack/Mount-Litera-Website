/**
 * Confirm a paid scholarship registration.
 *
 * The signature is recomputed here from the order id, the payment id and the
 * secret. That alone marks a registration paid — a `success` flag from the
 * browser confirms nothing.
 *
 * Confirming twice is deliberately harmless: a double-tapped button, a retried
 * request or a reloaded checkout returns the same registration and sends no
 * second email, because the confirmation is a transaction and each email is
 * claimed before it is sent.
 */

import {
  RegistrationConflict,
  claimEmail,
  confirmRegistration,
  getRegistration,
  publicRegistrationView,
  recordPaymentFailure,
  releaseEmailClaim,
  serializeRegistration,
  tokenMatches
} from '@/lib/scholarshipStore';
import { PAYMENT_STATUS, isValidRegistrationNumber } from '@/lib/scholarship';
import { verifySignature } from '@/lib/parentRoomPayments';
import {
  adminRecipient,
  adminRegistrationEmail,
  dispatch,
  parentReceiptEmail
} from '@/lib/scholarshipEmails';

export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  res.setHeader('Cache-Control', 'no-store');

  const body = req.body || {};
  const { registrationNumber, token } = body;

  if (!isValidRegistrationNumber(registrationNumber) || !token) {
    return res.status(400).json({ message: 'That registration reference is not valid.' });
  }

  let existing;
  try {
    existing = await getRegistration(registrationNumber);
  } catch (error) {
    // Never report an unreachable database as a missing registration: the
    // parent may have just been charged.
    return res.status(503).json({
      message: 'We could not reach your registration just now. Please try again in a moment.',
      code: 'unavailable',
      registrationNumber
    });
  }

  if (!existing || !tokenMatches(existing, token)) {
    return res.status(404).json({ message: 'That registration could not be found.' });
  }

  // Already paid: report itself, so a retry is safe.
  if (existing.paymentStatus === PAYMENT_STATUS.PAID) {
    return res.status(200).json({
      registration: publicRegistrationView(existing),
      alreadyConfirmed: true
    });
  }

  const orderId = String(body.orderId || existing.paymentOrderId || '');
  const paymentId = String(body.paymentId || '');
  const signature = String(body.signature || '');

  if (!orderId || !paymentId || !signature) {
    await recordPaymentFailure(registrationNumber, 'Incomplete payment details.');
    return res.status(400).json({
      message: 'We did not receive the payment details. Please try again.',
      code: 'payment_incomplete'
    });
  }
  // The order must be the one this registration raised, or a signature from an
  // unrelated payment would verify perfectly well.
  if (existing.paymentOrderId && orderId !== existing.paymentOrderId) {
    await recordPaymentFailure(registrationNumber, 'Order id did not match.');
    return res.status(400).json({
      message: 'Those payment details do not match this registration.',
      code: 'payment_mismatch'
    });
  }
  if (!verifySignature({ orderId, paymentId, signature })) {
    await recordPaymentFailure(registrationNumber, 'Signature did not verify.');
    return res.status(400).json({
      message: 'We could not verify that payment. No amount has been confirmed.',
      code: 'payment_unverified'
    });
  }

  let confirmed;
  try {
    const result = await confirmRegistration({
      registrationNumber,
      paymentReference: paymentId,
      paymentOrderId: orderId
    });
    confirmed = result.record;
  } catch (error) {
    if (error instanceof RegistrationConflict) {
      return res.status(409).json({ message: error.message, code: error.code });
    }
    // eslint-disable-next-line no-console
    console.error('Scholarship confirm failed:', error?.message);
    return res.status(500).json({
      message:
        'We could not confirm the registration. If you have been charged, contact the school with your registration number — your payment is safe.',
      code: 'server_error',
      registrationNumber
    });
  }

  // Emails come after the registration is safely stored: it exists whether or
  // not the mail server is having a good day, and the portal can resend.
  const record = serializeRegistration(confirmed);

  const sendOnce = async (key, to, template, replyTo) => {
    if (!to) return;
    if (!(await claimEmail(registrationNumber, key))) return;
    const sent = await dispatch({ to, template, replyTo });
    if (!sent) await releaseEmailClaim(registrationNumber, key);
  };

  await Promise.all([
    sendOnce('parentReceipt', record.email, parentReceiptEmail(record, token)),
    sendOnce('adminNotification', adminRecipient(), adminRegistrationEmail(record), record.email)
  ]);

  return res.status(200).json({
    registration: publicRegistrationView(confirmed),
    // The form tells the parent where their receipt went — and, when they gave
    // no email, that WhatsApp is the only copy they will get.
    receiptEmailed: Boolean(record.email),
    alreadyConfirmed: false
  });
}
