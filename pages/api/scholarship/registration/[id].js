/**
 * A parent looking up their own registration.
 *
 * Requires the token issued when the registration was opened. A registration
 * number alone is deliberately not enough: those numbers appear on the public
 * merit list, so a number-only lookup would let anyone reading that list pull
 * up a child's name and date of birth.
 *
 * Returns only the narrow view — never the campaign attribution, the internal
 * notes or the token hash.
 */

import {
  getRegistration,
  publicRegistrationView,
  tokenMatches
} from '@/lib/scholarshipStore';
import { isValidRegistrationNumber } from '@/lib/scholarship';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  res.setHeader('Cache-Control', 'no-store');

  const { id, token } = req.query;
  if (!isValidRegistrationNumber(id) || !token) {
    return res.status(400).json({ message: 'That registration reference is not valid.' });
  }

  let record;
  try {
    record = await getRegistration(id);
  } catch (error) {
    return res.status(503).json({
      message: 'We could not reach your registration just now. Please try again in a moment.',
      code: 'unavailable'
    });
  }

  // The same answer for "no such registration" and "wrong token", so the
  // endpoint cannot be used to find out which registration numbers exist.
  if (!record || !tokenMatches(record, String(token))) {
    return res.status(404).json({ message: 'That registration could not be found.' });
  }

  return res.status(200).json({ registration: publicRegistrationView(record) });
}
