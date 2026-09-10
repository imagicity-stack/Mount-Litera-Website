/**
 * Send the reminders that are due.
 *
 * The site has no scheduler of its own, so this endpoint is the reminder
 * *mechanism* rather than the schedule: it is idempotent, it works out for
 * itself what is due, and it can be called as often as you like. Two things
 * can drive it, and neither is a timer running in somebody's browser:
 *
 *   • the portal's "Send due reminders" button, which an admin can press; and
 *   • a scheduled request carrying `Authorization: Bearer $CRON_SECRET` —
 *     add a `crons` entry to vercel.json pointing here and the reminders
 *     become automatic, with no other change to this module.
 *
 * Until one of those exists, nothing sends silently and nothing pretends to.
 */

import crypto from 'node:crypto';
import admin from 'firebase-admin';

import { adminDb } from '@/lib/firebaseAdmin';
import { resolveAdmin } from '@/lib/adminAuth';
import { BOOKING_STATUS } from '@/lib/parentRoom';
import { bookingsCollection, loadSettings, serializeBooking } from '@/lib/parentRoomStore';
import { dispatch, parentReminderEmail } from '@/lib/parentRoomEmails';

const { FieldValue, Timestamp } = admin.firestore;

const HOUR = 60 * 60 * 1000;

/**
 * Narrowest window first. A reminder is due as soon as the session is inside
 * its lead time, not only on the tick that matches it exactly — so a run that
 * is skipped, or a schedule that only fires every few hours, still delivers
 * rather than silently missing the moment. Picking the narrowest due window
 * means a session booked forty minutes out gets one "starts shortly" note, not
 * a "tomorrow" note as well.
 */
const WINDOWS = [
  { key: '1h', leadMs: HOUR },
  { key: '24h', leadMs: 24 * HOUR }
];

const secretMatches = (header) => {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const given = String(header || '').replace(/^Bearer\s+/i, '');
  if (given.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  res.setHeader('Cache-Control', 'no-store');

  // Either a scheduler holding the shared secret, or a signed-in admin.
  if (!secretMatches(req.headers.authorization)) {
    const adminUser = await resolveAdmin(req);
    if (!adminUser.ok) {
      return res.status(adminUser.status).json({ message: adminUser.reason });
    }
  }

  const settings = await loadSettings();
  const now = Date.now();

  let snapshot;
  try {
    // A range on one field only, so no composite index is required; the status
    // is filtered in memory over the few sessions in the next day.
    snapshot = await bookingsCollection()
      .where('appointmentStart', '>=', Timestamp.fromDate(new Date(now)))
      .where('appointmentStart', '<=', Timestamp.fromDate(new Date(now + 26 * HOUR)))
      .get();
  } catch (error) {
    return res.status(500).json({ message: 'Could not read the upcoming sessions.' });
  }

  const results = { upcoming: 0, sent: 0, alreadySent: 0, notDue: 0, failed: 0 };

  for (const doc of snapshot.docs) {
    const data = doc.data() || {};
    if (data.bookingStatus !== BOOKING_STATUS.CONFIRMED || !data.email) continue;

    const startsAt = data.appointmentStart?.toMillis?.();
    if (!startsAt || startsAt <= now) continue;

    results.upcoming += 1;
    const untilStart = startsAt - now;

    const due = WINDOWS.find((window) => untilStart <= window.leadMs);
    if (!due) {
      results.notDue += 1;
      continue;
    }
    if ((data.remindersSent || {})[due.key]) {
      results.alreadySent += 1;
      continue;
    }

    // Claim before sending, so two overlapping runs cannot both mail a parent.
    // eslint-disable-next-line no-await-in-loop
    const claimed = await adminDb
      .runTransaction(async (tx) => {
        const fresh = await tx.get(doc.ref);
        if (!fresh.exists) return false;
        if ((fresh.data()?.remindersSent || {})[due.key]) return false;
        tx.update(doc.ref, {
          [`remindersSent.${due.key}`]: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });
        return true;
      })
      .catch(() => false);

    if (!claimed) {
      results.alreadySent += 1;
      continue;
    }

    const booking = serializeBooking(doc);
    // eslint-disable-next-line no-await-in-loop
    const sent = await dispatch({
      to: booking.email,
      template: parentReminderEmail(booking, settings, due.key)
    });

    if (sent) {
      results.sent += 1;
    } else {
      results.failed += 1;
      // Release the claim so the next run can try again.
      // eslint-disable-next-line no-await-in-loop
      await doc.ref.update({ [`remindersSent.${due.key}`]: FieldValue.delete() }).catch(() => {});
    }
  }

  return res.status(200).json(results);
}
