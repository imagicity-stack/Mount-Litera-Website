/**
 * Payment configuration self-check.
 *
 * Answers "why did the pay button fail?" without anyone reading a hosting log.
 * It reports the *shape* of the credentials — present, trimmed, test or live,
 * how long the secret is — and never their value, then optionally raises a
 * real ₹1 order so the gateway itself gets to say what is wrong.
 *
 * Admin-guarded: it describes the school's payment setup, which is not
 * something a visitor gets to enumerate.
 */

import { requireAdmin } from '@/lib/adminAuth';
import { createOrder, describePaymentConfig, paymentsConfigured } from '@/lib/parentRoomPayments';
import { diagnoseCredentials, interpretProbeFailure } from '@/lib/paymentDiagnostics';
import { loadSettings } from '@/lib/parentRoomStore';

/**
 * A plain-English reading of the configuration, most severe first. The
 * credential half is shared with the site-wide check in
 * `pages/api/admin/payment-check.js`; only the booking-settings reasons a
 * checkout might not appear are particular to the Parent Room.
 */
const diagnose = (config, settings) => {
  const problems = diagnoseCredentials(config);

  if (settings.paymentMode !== 'razorpay') {
    problems.push(
      'Parent Room settings are set to collect the fee offline, so no checkout is offered regardless of these keys.'
    );
  }
  if (settings.participationFee <= 0) {
    problems.push('The participation fee is 0, so bookings confirm as waived with no payment step.');
  }

  return problems;
};

export default async function handler(req, res) {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return undefined;

  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const config = describePaymentConfig();
  const settings = await loadSettings();
  const problems = diagnose(config, settings);

  const payload = {
    config,
    settings: {
      paymentMode: settings.paymentMode,
      participationFee: settings.participationFee
    },
    problems,
    configured: paymentsConfigured()
  };

  // GET reports; POST additionally proves it by asking the gateway.
  if (req.method === 'GET' || !paymentsConfigured()) {
    return res.status(200).json({ ...payload, probe: null });
  }

  try {
    const order = await createOrder({
      amountInPaise: 100, // ₹1 — the smallest order Razorpay accepts.
      receipt: `check-${Date.now()}`.slice(0, 40),
      notes: { module: 'parent_room', purpose: 'configuration_check' }
    });
    return res.status(200).json({
      ...payload,
      probe: {
        ok: true,
        message: 'Razorpay accepted a test order. The credentials work.',
        orderId: order.id
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Parent Room payment check failed:', {
      message: error?.message,
      status: error?.status,
      code: error?.code,
      details: error?.details
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
      guidance: interpretProbeFailure(probe, config)
    });
  }
}
