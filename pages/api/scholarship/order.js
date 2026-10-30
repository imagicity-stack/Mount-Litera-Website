/**
 * Raise the ₹199 payment order.
 *
 * The amount is fixed on the server from the scholarship's own settings; a
 * price posted by the browser is ignored. The caller must present the token
 * issued when the registration was opened, so an order can only be raised
 * against your own registration.
 */

import {
  attachOrder,
  getRegistration,
  tokenMatches
} from '@/lib/scholarshipStore';
import {
  PAYMENT_STATUS,
  isValidRegistrationNumber,
  scholarship
} from '@/lib/scholarship';
import { checkoutKeyId, createOrder, paymentsConfigured, toPaise } from '@/lib/parentRoomPayments';
import { GATEWAY_FAULT, classifyGatewayError } from '@/lib/paymentDiagnostics';

/** Room for a Firestore read plus a gateway round-trip on a cold start. */
export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  res.setHeader('Cache-Control', 'no-store');

  const { registrationNumber, token } = req.body || {};
  if (!isValidRegistrationNumber(registrationNumber) || !token) {
    return res.status(400).json({ message: 'That registration reference is not valid.' });
  }

  if (!paymentsConfigured()) {
    return res.status(503).json({
      message: 'Online payment is not available right now. Please try again shortly.',
      code: 'gateway_unconfigured'
    });
  }

  let record;
  try {
    record = await getRegistration(registrationNumber);
  } catch (error) {
    return res.status(503).json({
      message: 'We could not reach your registration just now. Please try again in a moment.',
      code: 'unavailable'
    });
  }

  if (!record || !tokenMatches(record, token)) {
    return res.status(404).json({ message: 'That registration could not be found.' });
  }
  if (record.paymentStatus === PAYMENT_STATUS.PAID) {
    return res.status(409).json({
      message: 'This registration has already been paid for.',
      code: 'already_paid'
    });
  }

  try {
    const order = await createOrder({
      amountInPaise: toPaise(record.amount ?? scholarship.registrationFee),
      receipt: record.registrationNumber,
      notes: {
        registrationNumber: record.registrationNumber,
        module: 'edenwoods_scholarship_2027'
      }
    });

    // Bookkeeping that tightens the binding between registration and payment;
    // the order exists at the gateway either way, so a Firestore hiccup here
    // must not send the parent back to a pay button for an order already
    // raised. Confirm still verifies the signature against the order it is
    // given.
    try {
      await attachOrder(record.registrationNumber, order.id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Scholarship order id not recorded:', record.registrationNumber, error?.message);
    }

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency || 'INR',
      keyId: checkoutKeyId()
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Scholarship order failed:', {
      registrationNumber: record.registrationNumber,
      name: error?.name,
      message: error?.message,
      status: error?.status,
      code: error?.code,
      details: error?.details,
      stack: error?.name === 'RazorpayError' ? undefined : error?.stack
    });

    // The gateway's wording stays in the log. A parent cannot act on
    // "Authentication failed" — every order-creation fault is at our end — and
    // showing it told them their payment had failed for a reason they could do
    // nothing about, while advertising that our payment setup was broken.
    const { fault, payerMessage } = classifyGatewayError(error);

    return res.status(fault === GATEWAY_FAULT.TRANSIENT ? 503 : 502).json({
      message: payerMessage,
      code: fault === GATEWAY_FAULT.CONFIG ? 'gateway_unavailable' : error?.code || 'gateway_error'
    });
  }
}
