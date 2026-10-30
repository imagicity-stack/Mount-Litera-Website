/**
 * Payment configuration self-check, for the whole site.
 *
 * Answers "why did the pay button fail?" without anyone reading a hosting log.
 * It reports the *shape* of the credentials — present, trimmed, test or live,
 * how long the secret is — and never their value; then, on POST, raises a real
 * ₹1 order so the gateway itself gets to say whether the keys work, and reads
 * that answer back as instructions.
 *
 * Deliberately touches no database. The Parent Room has its own check that
 * layers its booking settings on top of this one, but when a payment is
 * failing the first question is only ever whether the credentials are good,
 * and a Firestore read in that path is one more thing that can fail and
 * obscure the answer.
 *
 * Admin-guarded: it describes the school's payment setup, which is not
 * something a visitor gets to enumerate.
 */

import { requireAdmin } from '@/lib/adminAuth';
import { createOrder, describePaymentConfig, paymentsConfigured } from '@/lib/parentRoomPayments';
import { diagnoseCredentials, interpretProbeFailure } from '@/lib/paymentDiagnostics';

export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return undefined;

  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const credentials = describePaymentConfig();
  const payload = {
    credentials,
    problems: diagnoseCredentials(credentials),
    configured: paymentsConfigured()
  };

  // GET reports the shape; POST proves it by asking the gateway.
  if (req.method === 'GET' || !paymentsConfigured()) {
    return res.status(200).json({ ...payload, probe: null, guidance: null });
  }

  try {
    const order = await createOrder({
      amountInPaise: 100, // ₹1 — the smallest order Razorpay accepts.
      receipt: `check-${Date.now()}`.slice(0, 40),
      notes: { purpose: 'configuration_check' }
    });

    return res.status(200).json({
      ...payload,
      probe: {
        ok: true,
        message: 'Razorpay accepted a test order, so the credentials work. Nothing was charged — an unpaid order expires on its own.',
        orderId: order.id
      },
      guidance: null
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Payment check failed:', {
      message: error?.message,
      status: error?.status,
      code: error?.code,
      reason: error?.reason
    });

    const probe = {
      ok: false,
      message: error?.message || 'The gateway rejected the request.',
      status: error?.status || null,
      code: error?.code || null,
      reason: error?.reason || ''
    };

    return res.status(200).json({
      ...payload,
      probe,
      guidance: interpretProbeFailure(probe, credentials)
    });
  }
}
