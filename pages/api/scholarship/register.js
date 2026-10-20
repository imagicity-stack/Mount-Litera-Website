/**
 * Open a scholarship registration.
 *
 * Every field is revalidated here — the browser applied the same rules a
 * moment ago, but a browser check is a courtesy to the person filling the
 * form, not a control over what reaches the database.
 *
 * Nothing is taken from the parent yet. This reserves the child against the
 * one-registration-per-child rule and returns a token; the ₹199 is collected
 * by `/order` and `/confirm`.
 */

import {
  RegistrationConflict,
  createRegistration
} from '@/lib/scholarshipStore';
import {
  hasErrors,
  registrationIsOpen,
  sanitizeCampaign,
  sanitizeRegistration,
  scholarship,
  validateRegistration
} from '@/lib/scholarship';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  res.setHeader('Cache-Control', 'no-store');

  const body = req.body || {};

  if (!registrationIsOpen()) {
    return res.status(410).json({
      message: 'Registration for the Edenwoods Merit Scholarship 2027 has closed.',
      code: 'closed'
    });
  }

  const errors = validateRegistration(body);
  if (hasErrors(errors)) {
    return res.status(400).json({
      message: 'Some details still need attention.',
      errors,
      code: 'invalid'
    });
  }

  const registration = sanitizeRegistration(body);
  const campaign = sanitizeCampaign(body.campaign || {});

  try {
    const { registrationNumber, token } = await createRegistration({
      registration,
      campaign,
      meta: {
        amount: scholarship.registrationFee,
        landingPath: String(body.landingPath || '').slice(0, 300)
      }
    });

    return res.status(201).json({
      registrationNumber,
      token,
      amount: scholarship.registrationFee,
      currency: 'INR'
    });
  } catch (error) {
    if (error instanceof RegistrationConflict) {
      return res.status(409).json({ message: error.message, code: error.code });
    }
    // eslint-disable-next-line no-console
    console.error('Scholarship registration failed:', error?.message);
    return res.status(503).json({
      message: 'We could not save that registration. Please try again in a moment.',
      code: 'server_error'
    });
  }
}
