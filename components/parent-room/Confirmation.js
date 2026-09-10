/**
 * The confirmation screen.
 *
 * Renders only what the server returned. Nothing here is assembled from what
 * the parent typed a moment ago — if the booking says it is confirmed, it is
 * confirmed in Firestore, and if the meeting link is absent the screen says so
 * plainly rather than inventing a joining URL.
 */

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

import { SummaryRow } from '@/components/parent-room/fields';
import { formatDateKey, formatMinutes } from '@/lib/parentRoomTime';

export default function Confirmation({ booking }) {
  const reduce = useReducedMotion();
  const duration = booking.durationMinutes || 30;
  const start = booking.startMinutes;

  const Frame = reduce ? 'div' : motion.div;
  const animation = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      };

  return (
    <Frame {...animation}>
      <span className="rule-heavy" />

      <p className="mt-8 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-crimson">
        Confirmed
      </p>
      <h3 className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.6rem)] font-medium leading-[1.1] text-ink">
        Your Parent Room session is confirmed.
      </h3>
      <p className="mt-5 max-w-prose text-[1rem] leading-relaxed text-ink-soft">
        We’ve also sent the session details to{' '}
        <span className="font-bold text-ink">{booking.email}</span>. There is nothing special you
        need to prepare — just come with the question that has been on your mind.
      </p>

      <dl className="mt-9 border-t border-hairline">
        <SummaryRow label="Parent">{booking.parentName}</SummaryRow>
        <SummaryRow label="Date">{formatDateKey(booking.dateKey)}</SummaryRow>
        <SummaryRow label="Time">
          {formatMinutes(start)} – {formatMinutes(start + duration)} IST
        </SummaryRow>
        <SummaryRow label="Duration">{duration} minutes</SummaryRow>
        <SummaryRow label="Session with">{booking.counsellorName}</SummaryRow>
        <SummaryRow label="Mode">Online video conference</SummaryRow>
        <SummaryRow label="Booking ID">
          <span className="font-bold tracking-[0.06em] text-crimson">{booking.bookingId}</span>
        </SummaryRow>
        <SummaryRow label="Joining">
          {booking.meetingLink ? (
            <a
              href={booking.meetingLink}
              className="hv-link break-all"
              target="_blank"
              rel="noreferrer"
            >
              {booking.meetingLink}
            </a>
          ) : (
            booking.meetingNote || 'The video meeting link will be sent to you before the session.'
          )}
        </SummaryRow>
      </dl>

      {booking.paymentStatus === 'pending' && (
        <p className="mt-7 border border-hairline bg-ivory px-5 py-4 text-[0.9rem] leading-relaxed text-ink-soft">
          <span className="font-bold text-ink">Fee: ₹{booking.amount}.</span> The school will
          contact you with the payment details before your session.
        </p>
      )}

      <div className="mt-9 flex flex-col gap-3 border-t border-hairline pt-7 sm:flex-row sm:items-center">
        <Link href="/" className="btn-ghost w-full text-center sm:w-auto">
          Return to the school site
        </Link>
        <p className="text-[0.82rem] leading-relaxed text-ink-muted sm:ml-2">
          Need to change something? Reply to your confirmation email quoting{' '}
          <span className="font-bold text-ink">{booking.bookingId}</span>.
        </p>
      </div>
    </Frame>
  );
}
