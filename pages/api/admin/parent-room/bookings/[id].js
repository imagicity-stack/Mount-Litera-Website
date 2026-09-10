/**
 * One booking: read it, and act on it.
 *
 * Every action is named explicitly rather than accepting a patch of arbitrary
 * fields, so the route decides what may change and what a change implies — that
 * cancelling frees the slot, that rescheduling moves it atomically, that a
 * status the school did not ask for cannot be written at all.
 *
 * Internal notes are readable and writable here and nowhere else. They never
 * appear in the parent's confirmation view, in any email to a parent, or in any
 * public response.
 */

import admin from 'firebase-admin';

import { requireAdmin } from '@/lib/adminAuth';
import {
  BOOKING_STATUS,
  LIMITS,
  PAYMENT_STATUS,
  isValidBookingId
} from '@/lib/parentRoom';
import {
  BookingConflict,
  claimEmail,
  confirmBooking,
  getBooking,
  loadSettings,
  moveBooking,
  releaseEmailClaim,
  releaseSlot,
  serializeBooking,
  updateBooking
} from '@/lib/parentRoomStore';
import {
  adminBookingEmail,
  adminRecipient,
  dispatch,
  parentCancelledEmail,
  parentConfirmationEmail,
  parentMeetingLinkEmail,
  parentRescheduledEmail
} from '@/lib/parentRoomEmails';

const { FieldValue } = admin.firestore;

const historyEntry = (actor, action, detail = '') => ({
  at: new Date().toISOString(),
  by: actor || 'admin',
  action,
  detail: String(detail).slice(0, 300)
});

const isSafeUrl = (value) => {
  try {
    const url = new URL(String(value));
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch (error) {
    return false;
  }
};

export default async function handler(req, res) {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return undefined;

  res.setHeader('Cache-Control', 'no-store');

  const { id } = req.query;
  if (!isValidBookingId(id)) {
    return res.status(400).json({ message: 'That booking reference is not valid.' });
  }

  let settings;
  let raw;
  try {
    settings = await loadSettings();
    raw = await getBooking(id);
  } catch (error) {
    return res.status(503).json({ message: 'Could not reach the booking. Please try again.' });
  }

  if (!raw) {
    return res.status(404).json({ message: 'That booking could not be found.' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ booking: serializeBooking(raw), settings });
  }

  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'GET, PATCH');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const { action } = req.body || {};
  const actor = adminUser.email || 'admin';
  const notify = req.body?.notifyParent !== false;

  /** Send a parent-facing mail at most once per booking per template. */
  const mailParent = async (key, template) => {
    if (!notify || !raw.email) return false;
    if (!(await claimEmail(id, key))) return false;
    const sent = await dispatch({ to: raw.email, template });
    if (!sent) await releaseEmailClaim(id, key);
    return sent;
  };

  try {
    switch (action) {
      // ------------------------------------------------------------- confirm
      case 'confirm': {
        if (raw.bookingStatus === BOOKING_STATUS.CONFIRMED) {
          return res.status(200).json({ booking: serializeBooking(raw), message: 'Already confirmed.' });
        }
        if (raw.bookingStatus !== BOOKING_STATUS.PENDING) {
          return res.status(409).json({ message: 'Only a pending booking can be confirmed.' });
        }
        const paymentStatus = Object.values(PAYMENT_STATUS).includes(req.body?.paymentStatus)
          ? req.body.paymentStatus
          : raw.paymentStatus || PAYMENT_STATUS.PENDING;

        const { booking } = await confirmBooking({
          bookingId: id,
          paymentStatus,
          paymentReference: raw.paymentReference || '',
          paymentOrderId: raw.paymentOrderId || ''
        });
        await updateBooking(
          id,
          {},
          historyEntry(actor, 'confirmed_by_admin', `Payment marked ${paymentStatus}.`)
        );

        await mailParent('parentConfirmation', parentConfirmationEmail(booking, settings));
        // The school's own copy, so a manually confirmed booking still lands in
        // the shared inbox alongside the ones that came through checkout.
        if (await claimEmail(id, 'adminNotification')) {
          const sent = await dispatch({
            to: adminRecipient(),
            template: adminBookingEmail(booking, settings),
            replyTo: booking.email
          });
          if (!sent) await releaseEmailClaim(id, 'adminNotification');
        }

        const fresh = await getBooking(id);
        return res.status(200).json({ booking: serializeBooking(fresh), message: 'Booking confirmed.' });
      }

      // ---------------------------------------------------------- reschedule
      case 'reschedule': {
        const slotId = String(req.body?.slotId || '');
        if (!slotId) return res.status(400).json({ message: 'Choose a new time first.' });
        if (
          raw.bookingStatus === BOOKING_STATUS.CANCELLED ||
          raw.bookingStatus === BOOKING_STATUS.EXPIRED
        ) {
          return res.status(409).json({ message: 'That booking is closed and cannot be moved.' });
        }

        const moved = await moveBooking({ bookingId: id, slotId, settings, actorEmail: actor });
        const fresh = await getBooking(id);
        await mailParent('rescheduled', parentRescheduledEmail(serializeBooking(fresh), settings));

        return res.status(200).json({
          booking: serializeBooking(fresh),
          message: `Moved to ${moved.dateKey}.`
        });
      }

      // -------------------------------------------------------------- cancel
      case 'cancel': {
        if (raw.bookingStatus === BOOKING_STATUS.CANCELLED) {
          return res.status(200).json({ booking: serializeBooking(raw), message: 'Already cancelled.' });
        }
        const reason = String(req.body?.reason || '').slice(0, 300);

        await updateBooking(
          id,
          { bookingStatus: BOOKING_STATUS.CANCELLED, cancelledAt: FieldValue.serverTimestamp() },
          historyEntry(actor, 'cancelled', reason)
        );
        // Free the time so another parent can take it.
        await releaseSlot(raw.slotId, raw.bookingId);

        await mailParent('cancelled', parentCancelledEmail(serializeBooking(raw), settings, reason));

        const fresh = await getBooking(id);
        return res.status(200).json({ booking: serializeBooking(fresh), message: 'Booking cancelled.' });
      }

      // ---------------------------------------------------- complete/no-show
      case 'complete':
      case 'no-show': {
        const next = action === 'complete' ? BOOKING_STATUS.COMPLETED : BOOKING_STATUS.NO_SHOW;
        await updateBooking(
          id,
          { bookingStatus: next, closedAt: FieldValue.serverTimestamp() },
          historyEntry(actor, next)
        );
        const fresh = await getBooking(id);
        return res.status(200).json({
          booking: serializeBooking(fresh),
          message: action === 'complete' ? 'Marked completed.' : 'Marked as a no-show.'
        });
      }

      // ------------------------------------------------------------- payment
      case 'payment': {
        const paymentStatus = req.body?.paymentStatus;
        if (!Object.values(PAYMENT_STATUS).includes(paymentStatus)) {
          return res.status(400).json({ message: 'That is not a payment status.' });
        }
        const reference = String(req.body?.paymentReference || raw.paymentReference || '').slice(0, 120);
        await updateBooking(
          id,
          { paymentStatus, paymentReference: reference },
          historyEntry(actor, 'payment_updated', `Set to ${paymentStatus}.`)
        );
        const fresh = await getBooking(id);
        return res.status(200).json({ booking: serializeBooking(fresh), message: 'Payment updated.' });
      }

      // -------------------------------------------------------- meeting link
      case 'meeting-link': {
        const link = String(req.body?.meetingLink || '').trim().slice(0, LIMITS.meetingLink);
        if (link && !isSafeUrl(link)) {
          return res.status(400).json({ message: 'That does not look like a valid meeting link.' });
        }
        await updateBooking(
          id,
          { meetingLink: link },
          historyEntry(actor, link ? 'meeting_link_set' : 'meeting_link_cleared')
        );

        const fresh = await getBooking(id);
        // A changed link is worth re-sending, so this one is not claim-guarded
        // the way a first confirmation is — but only when asked for, and only
        // when there is a link to send.
        if (notify && link && raw.email) {
          await dispatch({
            to: raw.email,
            template: parentMeetingLinkEmail(serializeBooking(fresh), settings)
          });
        }
        return res.status(200).json({ booking: serializeBooking(fresh), message: 'Meeting link saved.' });
      }

      // --------------------------------------------------------------- notes
      case 'notes': {
        const notes = String(req.body?.internalNotes || '').slice(0, LIMITS.internalNotes);
        await updateBooking(id, { internalNotes: notes }, historyEntry(actor, 'note_updated'));
        const fresh = await getBooking(id);
        return res.status(200).json({ booking: serializeBooking(fresh), message: 'Notes saved.' });
      }

      // ------------------------------------------------------------- resends
      case 'resend-confirmation': {
        if (!raw.email) return res.status(400).json({ message: 'No email address on this booking.' });
        const sent = await dispatch({
          to: raw.email,
          template: parentConfirmationEmail(serializeBooking(raw), settings)
        });
        if (!sent) {
          return res.status(502).json({ message: 'The email could not be sent. Please try again.' });
        }
        await updateBooking(id, {}, historyEntry(actor, 'confirmation_resent'));
        const fresh = await getBooking(id);
        return res.status(200).json({ booking: serializeBooking(fresh), message: 'Confirmation resent.' });
      }

      default:
        return res.status(400).json({ message: 'Unknown action.' });
    }
  } catch (error) {
    if (error instanceof BookingConflict) {
      return res.status(409).json({ message: error.message, code: error.code });
    }
    // eslint-disable-next-line no-console
    console.error('Parent Room booking action failed:', action, error?.message);
    return res.status(500).json({ message: 'That action could not be completed.' });
  }
}
