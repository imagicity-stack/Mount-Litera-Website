/**
 * The scholarship registrations table.
 *
 * Admin-only, through the same `requireAdmin` guard as every other portal
 * route. This response carries parents' contact details and children's names
 * and dates of birth, so there is no public read path to it and no degraded
 * fallback — a caller who is not an admin gets an error, not a smaller answer.
 */

import { requireAdmin } from '@/lib/adminAuth';
import { REGISTRATION_STATUS, keyDates, scholarship } from '@/lib/scholarship';
import { listRegistrations, sweepExpiredHolds } from '@/lib/scholarshipStore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return undefined;

  res.setHeader('Cache-Control', 'no-store');

  try {
    // Registrations that were never paid for are retired here rather than by a
    // background job, so the table an admin is about to read is already true.
    await sweepExpiredHolds();

    const registrations = await listRegistrations({ limit: Number(req.query.limit) || 1000 });

    return res.status(200).json({
      registrations,
      statuses: Object.values(REGISTRATION_STATUS),
      scholarship: {
        name: scholarship.name,
        session: scholarship.session,
        registrationFee: scholarship.registrationFee,
        fullScholarships: scholarship.fullScholarships
      },
      keyDates
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Scholarship registrations list failed:', error?.message);
    return res.status(500).json({ message: 'Could not load the registrations.' });
  }
}
