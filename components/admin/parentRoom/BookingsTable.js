/**
 * The bookings table.
 *
 * Filtering and searching happen in the browser over the rows already loaded,
 * which keeps every combination of filters instant and avoids demanding a
 * Firestore composite index for each one. At the volumes a single counsellor
 * can actually see — a few hundred sessions — that is the right trade; past
 * that it wants server-side paging.
 */

import { useMemo, useState } from 'react';

import { Badge, Button, Card, Input, Select } from '@/components/admin/ui';
import {
  bookingStatusLabels,
  concernLabel,
  concernOptions,
  paymentStatusLabels,
  schoolChangeLabel,
  schoolChangeOptions
} from '@/lib/parentRoom';
import { formatDateKey, formatMinutes } from '@/lib/parentRoomTime';

const STATUS_TONE = {
  confirmed: 'good',
  completed: 'good',
  rescheduled: 'ok',
  pending: 'ok',
  cancelled: 'bad',
  no_show: 'bad',
  expired: 'neutral'
};

const PAYMENT_TONE = {
  paid: 'good',
  waived: 'good',
  pending: 'ok',
  failed: 'bad',
  refunded: 'neutral'
};

const ALL = '__all__';

export default function BookingsTable({
  bookings,
  onOpen,
  onRefresh,
  title = 'All bookings',
  emptyMessage = 'No bookings yet.'
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(ALL);
  const [payment, setPayment] = useState(ALL);
  const [concern, setConcern] = useState(ALL);
  const [childClass, setChildClass] = useState(ALL);
  const [intent, setIntent] = useState(ALL);
  const [channel, setChannel] = useState(ALL);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const classes = useMemo(
    () => Array.from(new Set(bookings.map((b) => b.currentClass).filter(Boolean))).sort(),
    [bookings]
  );
  const channels = useMemo(
    () => Array.from(new Set(bookings.map((b) => b.channel).filter(Boolean))).sort(),
    [bookings]
  );

  const rows = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return bookings.filter((booking) => {
      if (status !== ALL && booking.bookingStatus !== status) return false;
      if (payment !== ALL && booking.paymentStatus !== payment) return false;
      if (concern !== ALL && booking.primaryConcern !== concern) return false;
      if (childClass !== ALL && booking.currentClass !== childClass) return false;
      if (intent !== ALL && booking.schoolChangeIntent !== intent) return false;
      if (channel !== ALL && booking.channel !== channel) return false;
      if (from && booking.dateKey < from) return false;
      if (to && booking.dateKey > to) return false;

      if (!needle) return true;
      return [booking.parentName, booking.mobile, booking.email, booking.bookingId]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(needle));
    });
  }, [bookings, search, status, payment, concern, childClass, intent, channel, from, to]);

  const clear = () => {
    setSearch('');
    setStatus(ALL);
    setPayment(ALL);
    setConcern(ALL);
    setChildClass(ALL);
    setIntent(ALL);
    setChannel(ALL);
    setFrom('');
    setTo('');
  };

  const filtered = rows.length !== bookings.length;

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="font-garamond text-lg font-semibold text-midnight">{title}</h3>
          <div className="flex items-center gap-2">
            {filtered && (
              <Button variant="subtle" onClick={clear}>
                Clear filters
              </Button>
            )}
            <Button variant="ghost" onClick={onRefresh}>
              Refresh
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by parent name, mobile, email or booking ID"
          />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value={ALL}>Any booking status</option>
            {Object.entries(bookingStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>

          <Select value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value={ALL}>Any payment status</option>
            {Object.entries(paymentStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>

          <Select value={concern} onChange={(e) => setConcern(e.target.value)}>
            <option value={ALL}>Any concern</option>
            {concernOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select value={intent} onChange={(e) => setIntent(e.target.value)}>
            <option value={ALL}>Any school-change answer</option>
            {schoolChangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select value={childClass} onChange={(e) => setChildClass(e.target.value)}>
            <option value={ALL}>Any class</option>
            {classes.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>

          <Select value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value={ALL}>Any source</option>
            {channels.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>

          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From date" />
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="To date" />
        </div>

        <p className="mt-3 text-xs text-midnight/45">
          Showing {rows.length} of {bookings.length}.
        </p>
      </Card>

      <Card className="overflow-hidden">
        {rows.length === 0 ? (
          <p className="px-5 py-14 text-center text-sm text-midnight/55">{emptyMessage}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[62rem] text-left text-sm">
              <thead>
                <tr className="border-b border-midnight/10 text-[10px] uppercase tracking-[0.14em] text-midnight/45">
                  {[
                    'Booking',
                    'Parent',
                    'Child',
                    'Class',
                    'Concern',
                    'Date',
                    'Time',
                    'Payment',
                    'Status',
                    'School change',
                    'Source',
                    ''
                  ].map((heading, index) => (
                    <th key={`${heading}-${index}`} className="whitespace-nowrap px-4 py-3 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-midnight/[0.07]">
                {rows.map((booking) => (
                  <tr key={booking.bookingId} className="transition hover:bg-midnight/[0.02]">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-cardinal">
                      {booking.bookingId}
                    </td>
                    <td className="px-4 py-3">
                      <span className="block font-semibold text-midnight">{booking.parentName}</span>
                      <span className="block text-xs text-midnight/50">{booking.mobile}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-midnight/75">
                      {booking.childFirstName}
                      {booking.childAge ? `, ${booking.childAge}` : ''}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-midnight/75">
                      {booking.currentClass}
                    </td>
                    <td className="px-4 py-3 text-midnight/75">
                      {concernLabel(booking.primaryConcern)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-midnight/75">
                      {formatDateKey(booking.dateKey, { short: true })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-midnight/75">
                      {formatMinutes(booking.startMinutes)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Badge tone={PAYMENT_TONE[booking.paymentStatus] || 'neutral'}>
                        {paymentStatusLabels[booking.paymentStatus] || booking.paymentStatus}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Badge tone={STATUS_TONE[booking.bookingStatus] || 'neutral'}>
                        {bookingStatusLabels[booking.bookingStatus] || booking.bookingStatus}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-midnight/60">
                      {schoolChangeLabel(booking.schoolChangeIntent)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-midnight/60">
                      {booking.channel}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <Button variant="subtle" onClick={() => onOpen(booking)}>
                        Open
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
