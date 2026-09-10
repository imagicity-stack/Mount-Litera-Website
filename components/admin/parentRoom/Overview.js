/**
 * The Parent Room at a glance.
 *
 * Every figure is computed from the same bookings list the table renders, so
 * a number here and a row there can never disagree. Revenue counts only what
 * was actually collected — a session the school is settling offline shows as
 * outstanding rather than as income.
 */

import { useMemo } from 'react';

import { Badge, Button, Card } from '@/components/admin/ui';
import { concernLabel } from '@/lib/parentRoom';
import { addDaysToKey, formatDateKey, formatMinutes, istDateKey } from '@/lib/parentRoomTime';

const CARD_TONE = {
  good: 'text-emerald-700',
  warn: 'text-amber-700',
  bad: 'text-cardinal',
  plain: 'text-midnight'
};

function Stat({ label, value, sub, tone = 'plain' }) {
  return (
    <Card className="p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-midnight/45">
        {label}
      </p>
      <p className={`mt-3 font-garamond text-3xl leading-none ${CARD_TONE[tone]}`}>{value}</p>
      {sub && <p className="mt-2 text-xs leading-snug text-midnight/50">{sub}</p>}
    </Card>
  );
}

export default function Overview({ bookings, settings, onOpen, onGoTo }) {
  const stats = useMemo(() => {
    const today = istDateKey(new Date());
    const weekEnd = addDaysToKey(today, 7);

    const counted = {
      total: bookings.length,
      confirmed: 0,
      today: 0,
      week: 0,
      completed: 0,
      cancelled: 0,
      noShow: 0,
      pending: 0,
      revenue: 0,
      outstanding: 0,
      schoolChange: 0
    };

    const byChannel = new Map();

    bookings.forEach((booking) => {
      const live =
        booking.bookingStatus === 'confirmed' || booking.bookingStatus === 'rescheduled';

      if (live) counted.confirmed += 1;
      if (booking.bookingStatus === 'completed') counted.completed += 1;
      if (booking.bookingStatus === 'cancelled') counted.cancelled += 1;
      if (booking.bookingStatus === 'no_show') counted.noShow += 1;
      if (booking.bookingStatus === 'pending') counted.pending += 1;

      if (live && booking.dateKey === today) counted.today += 1;
      if (live && booking.dateKey >= today && booking.dateKey <= weekEnd) counted.week += 1;

      if (booking.paymentStatus === 'paid') counted.revenue += Number(booking.amount) || 0;
      else if (
        booking.paymentStatus === 'pending' &&
        booking.bookingStatus !== 'cancelled' &&
        booking.bookingStatus !== 'expired'
      ) {
        counted.outstanding += Number(booking.amount) || 0;
      }

      if (
        booking.schoolChangeIntent === 'yes-actively' ||
        booking.schoolChangeIntent === 'possibly'
      ) {
        counted.schoolChange += 1;
      }

      const channel = booking.channel || 'Direct';
      const entry = byChannel.get(channel) || { channel, bookings: 0, confirmed: 0, revenue: 0 };
      entry.bookings += 1;
      if (live || booking.bookingStatus === 'completed') entry.confirmed += 1;
      if (booking.paymentStatus === 'paid') entry.revenue += Number(booking.amount) || 0;
      byChannel.set(channel, entry);
    });

    return {
      ...counted,
      channels: Array.from(byChannel.values()).sort((a, b) => b.bookings - a.bookings)
    };
  }, [bookings]);

  const upcoming = useMemo(() => {
    const today = istDateKey(new Date());
    return bookings
      .filter(
        (booking) =>
          booking.dateKey >= today &&
          (booking.bookingStatus === 'confirmed' || booking.bookingStatus === 'rescheduled')
      )
      .sort((a, b) =>
        a.dateKey === b.dateKey ? a.startMinutes - b.startMinutes : a.dateKey.localeCompare(b.dateKey)
      )
      .slice(0, 12);
  }, [bookings]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total registrations" value={stats.total} />
        <Stat label="Confirmed bookings" value={stats.confirmed} tone="good" />
        <Stat label="Sessions today" value={stats.today} />
        <Stat label="Sessions this week" value={stats.week} />
        <Stat label="Completed sessions" value={stats.completed} tone="good" />
        <Stat label="Cancelled" value={stats.cancelled} tone="warn" />
        <Stat label="No shows" value={stats.noShow} tone="bad" />
        <Stat
          label="Revenue collected"
          value={`₹${stats.revenue.toLocaleString('en-IN')}`}
          sub={
            stats.outstanding > 0
              ? `₹${stats.outstanding.toLocaleString('en-IN')} still to collect`
              : 'All confirmed sessions are paid.'
          }
          tone="good"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* -------------------------------------------------- upcoming list */}
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-garamond text-lg font-semibold text-midnight">
              Upcoming appointments
            </h3>
            <Button variant="subtle" onClick={() => onGoTo('calendar')}>
              Open calendar
            </Button>
          </div>

          {upcoming.length === 0 ? (
            <p className="mt-6 text-sm text-midnight/55">Nothing booked yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-midnight/10">
              {upcoming.map((booking) => (
                <li key={booking.bookingId}>
                  <button
                    type="button"
                    onClick={() => onOpen(booking)}
                    className="flex w-full items-baseline justify-between gap-4 py-3 text-left transition hover:text-cardinal"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-midnight">
                        {booking.parentName}
                      </span>
                      <span className="block truncate text-xs text-midnight/50">
                        {booking.childFirstName} · {booking.currentClass} ·{' '}
                        {concernLabel(booking.primaryConcern)}
                      </span>
                    </span>
                    <span className="flex-shrink-0 text-right">
                      <span className="block text-xs font-semibold tabular-nums text-midnight">
                        {formatDateKey(booking.dateKey, { short: true })}
                      </span>
                      <span className="block text-xs tabular-nums text-midnight/50">
                        {formatMinutes(booking.startMinutes)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* --------------------------------------------------- segmentation */}
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-garamond text-lg font-semibold text-midnight">
              Parents considering a school change
            </h3>
            <p className="mt-3 font-garamond text-3xl leading-none text-midnight">
              {stats.schoolChange}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-midnight/50">
              Answered “Yes, actively” or “Possibly”. Recorded for the school’s own follow-up — it
              is never shown to the parent as an admission enquiry.
            </p>
          </Card>

          <Card className="p-5">
            <h3 className="font-garamond text-lg font-semibold text-midnight">
              Conversion by campaign
            </h3>
            {stats.channels.length === 0 ? (
              <p className="mt-4 text-sm text-midnight/55">No bookings yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {stats.channels.map((channel) => (
                  <li key={channel.channel} className="flex items-center justify-between gap-3">
                    <span className="min-w-0">
                      <Badge tone="neutral">{channel.channel}</Badge>
                    </span>
                    <span className="text-right text-xs text-midnight/60">
                      <span className="font-semibold text-midnight">{channel.bookings}</span>{' '}
                      booked · {channel.confirmed} confirmed
                      {channel.revenue > 0 && (
                        <span className="block text-midnight/45">
                          ₹{channel.revenue.toLocaleString('en-IN')}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      {stats.pending > 0 && (
        <p className="border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {stats.pending} booking{stats.pending === 1 ? ' is' : 's are'} still awaiting payment.
          Holds that lapse are retired automatically the next time this page loads.
        </p>
      )}

      {!settings.enabled && (
        <p className="border border-cardinal/30 bg-cardinal/5 px-4 py-3 text-sm font-semibold text-cardinal">
          Bookings are currently closed. Parents see the page but cannot book. Re-open it under
          Availability.
        </p>
      )}
    </div>
  );
}
