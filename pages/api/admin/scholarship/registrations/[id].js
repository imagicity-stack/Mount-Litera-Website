/**
 * One registration: read it, and act on it.
 *
 * Every action is named explicitly rather than accepting a patch of arbitrary
 * fields, so the route decides what may change — a status the Foundation did
 * not ask for cannot be written at all.
 *
 * Internal notes are readable and writable here and nowhere else. They appear
 * in no email to a parent and in no public response.
 */

import { requireAdmin } from '@/lib/adminAuth';
import {
  LIMITS,
  PAYMENT_STATUS,
  REGISTRATION_STATUS,
  isValidRegistrationNumber
} from '@/lib/scholarship';
import {
  getRegistration,
  serializeRegistration,
  updateRegistration
} from '@/lib/scholarshipStore';
import { admitCardEmail, dispatch, parentReceiptEmail } from '@/lib/scholarshipEmails';

export default async function handler(req, res) {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return undefined;

  res.setHeader('Cache-Control', 'no-store');

  const { id } = req.query;
  if (!isValidRegistrationNumber(id)) {
    return res.status(400).json({ message: 'That registration reference is not valid.' });
  }

  let raw;
  try {
    raw = await getRegistration(id);
  } catch (error) {
    return res.status(503).json({ message: 'Could not reach the registration. Please try again.' });
  }
  if (!raw) {
    return res.status(404).json({ message: 'That registration could not be found.' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ registration: serializeRegistration(raw) });
  }

  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'GET, PATCH');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const { action } = req.body || {};

  try {
    switch (action) {
      // --------------------------------------------------------- attendance
      case 'mark-appeared':
      case 'mark-absent': {
        const next =
          action === 'mark-appeared' ? REGISTRATION_STATUS.APPEARED : REGISTRATION_STATUS.ABSENT;
        await updateRegistration(id, { status: next });
        const fresh = await getRegistration(id);
        return res.status(200).json({
          registration: serializeRegistration(fresh),
          message: action === 'mark-appeared' ? 'Marked as appeared.' : 'Marked as absent.'
        });
      }

      // ------------------------------------------------------------- cancel
      case 'cancel': {
        await updateRegistration(id, { status: REGISTRATION_STATUS.CANCELLED });
        const fresh = await getRegistration(id);
        return res
          .status(200)
          .json({ registration: serializeRegistration(fresh), message: 'Registration cancelled.' });
      }

      // ------------------------------------------------------------ payment
      case 'payment': {
        const paymentStatus = req.body?.paymentStatus;
        if (!Object.values(PAYMENT_STATUS).includes(paymentStatus)) {
          return res.status(400).json({ message: 'That is not a payment status.' });
        }
        await updateRegistration(id, { paymentStatus });
        const fresh = await getRegistration(id);
        return res
          .status(200)
          .json({ registration: serializeRegistration(fresh), message: 'Payment updated.' });
      }

      // ----------------------------------------------------- reporting time
      case 'reporting-time': {
        const reportingTime = String(req.body?.reportingTime || '').trim().slice(0, 80);
        await updateRegistration(id, { reportingTime });
        const fresh = await getRegistration(id);
        return res
          .status(200)
          .json({ registration: serializeRegistration(fresh), message: 'Reporting time saved.' });
      }

      // --------------------------------------------------------------- notes
      case 'notes': {
        const internalNotes = String(req.body?.internalNotes || '').slice(0, LIMITS.internalNotes);
        await updateRegistration(id, { internalNotes });
        const fresh = await getRegistration(id);
        return res
          .status(200)
          .json({ registration: serializeRegistration(fresh), message: 'Notes saved.' });
      }

      // ------------------------------------------------------------- resends
      case 'resend-admit-card':
      case 'resend-receipt': {
        const record = serializeRegistration(raw);
        if (!record.email) {
          return res.status(400).json({
            message: 'No email address on this registration — send the admit card on WhatsApp.'
          });
        }
        const template =
          action === 'resend-admit-card'
            ? admitCardEmail(record)
            // A resent receipt deliberately carries no admit-card link: the
            // link needs the registration's token, which is stored only as a
            // hash and cannot be rebuilt here.
            : parentReceiptEmail(record, '');
        const sent = await dispatch({ to: record.email, template });
        if (!sent) {
          return res.status(502).json({ message: 'The email could not be sent. Please try again.' });
        }
        if (action === 'resend-admit-card') {
          await updateRegistration(id, { status: REGISTRATION_STATUS.ADMIT_CARD_SENT });
        }
        const fresh = await getRegistration(id);
        return res.status(200).json({
          registration: serializeRegistration(fresh),
          message: action === 'resend-admit-card' ? 'Admit card sent.' : 'Receipt resent.'
        });
      }

      default:
        return res.status(400).json({ message: 'Unknown action.' });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Scholarship registration action failed:', action, error?.message);
    return res.status(500).json({ message: 'That action could not be completed.' });
  }
}
