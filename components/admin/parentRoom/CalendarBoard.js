/**
 * The admin calendar.
 *
 * A day-by-day view of every configured time and what is sitting in it, with
 * per-slot blocking. Blocking a time that already has a confirmed booking is
 * refused by the API and the message says why — the booking has to be moved or
 * cancelled first, rather than a parent quietly losing their session.
 */

import { useCallback, useEffect, useState } from 'react';

import { Badge, Button, Card, Input, Spinner } from '@/components/admin/ui';
import { SLOT_STATUS } from '@/lib/parentRoom';
import { addDaysToKey, formatDateKey, istDateKey } from '@/lib/parentRoomTime';

const SLOT_TONE = {
  [SLOT_STATUS.BOOKED]: 'border-emerald-300 bg-emerald-50',
  [SLOT_STATUS.RESERVED]: 'border-amber-300 bg-amber-50',
  [SLOT_STATUS.BLOCKED]: 'border-midnight/25 bg-midnight/[0.06]',
  [SLOT_STATUS.AVAILABLE]: 'border-midnight/12 bg-white'
};

export default function CalendarBoard({ request, bookings, onOpen }) {
  const today = istDateKey(new Date());
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(addDaysToKey(today, 20));
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busySlot, setBusySlot] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await request(
        `/api/admin/parent-room/slots?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
      );
      setDays(data.days || []);
    } catch (err) {
      setError(err.message || 'Could not load the calendar.');
    } finally {
      setLoading(false);
    }
  }, [request, from, to]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = async (slot) => {
    setBusySlot(slot.slotId);
    setError('');
    try {
      await request('/api/admin/parent-room/slots', {
        method: 'POST',
        body: JSON.stringify({
          action: slot.status === SLOT_STATUS.BLOCKED ? 'unblock' : 'block',
          slotId: slot.slotId
        })
      });
      await load();
    } catch (err) {
      setError(err.message || 'Could not update that time.');
    } finally {
      setBusySlot('');
    }
  };

  const openBooking = (slot) => {
    const match = bookings.find((booking) => booking.bookingId === slot.booking?.bookingId);
    if (match) onOpen(match);
  };

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[9rem]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-midnight/45">
              From
            </span>
            <Input
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="mt-1.5"
            />
          </div>
          <div className="flex-1 min-w-[9rem]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-midnight/45">
              To
            </span>
            <Input
              type="date"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className="mt-1.5"
            />
          </div>
          <Button variant="ghost" onClick={load}>
            Refresh
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-midnight/55">
          {[
            ['Booked', 'bg-emerald-50 border-emerald-300'],
            ['Held', 'bg-amber-50 border-amber-300'],
            ['Blocked', 'bg-midnight/[0.06] border-midnight/25'],
            ['Open', 'bg-white border-midnight/15']
          ].map(([label, tone]) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 border ${tone}`} />
              {label}
            </span>
          ))}
        </div>
      </Card>

      {error && (
        <p className="border border-cardinal/30 bg-cardinal/5 px-4 py-3 text-sm font-semibold text-cardinal">
          {error}
        </p>
      )}

      {loading ? (
        <div className="py-14 text-center">
          <Spinner label="Loading the calendar…" />
        </div>
      ) : (
        <div className="space-y-3">
          {days.filter((day) => day.open).length === 0 && (
            <Card className="p-8 text-center text-sm text-midnight/55">
              No sessions are configured in this range. Check the weekdays and hours under
              Availability.
            </Card>
          )}

          {days
            .filter((day) => day.open)
            .map((day) => (
              <Card key={day.dateKey} className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-garamond text-lg font-semibold text-midnight">
                    {formatDateKey(day.dateKey)}
                  </h3>
                  <Badge tone={day.remaining === 0 ? 'bad' : 'neutral'}>
                    {day.bookedCount} booked · {day.remaining} left
                  </Badge>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {day.slots.map((slot) => (
                    <div
                      key={slot.slotId}
                      className={`border p-3 ${SLOT_TONE[slot.status] || SLOT_TONE.available}`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-semibold tabular-nums text-midnight">
                          {slot.label}
                        </span>
                        {slot.reason === 'too-soon' && slot.status === SLOT_STATUS.AVAILABLE && (
                          <span className="text-[10px] uppercase tracking-[0.12em] text-midnight/40">
                            Past notice
                          </span>
                        )}
                      </div>

                      {slot.booking ? (
                        <button
                          type="button"
                          onClick={() => openBooking(slot)}
                          className="mt-2 block w-full text-left text-xs text-midnight/70 transition hover:text-cardinal"
                        >
                          <span className="block truncate font-semibold">
                            {slot.booking.parentName}
                          </span>
                          <span className="block truncate">
                            {slot.booking.childFirstName} · {slot.booking.paymentStatus}
                          </span>
                          {!slot.booking.hasMeetingLink && (
                            <span className="mt-1 block text-amber-700">No meeting link yet</span>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={busySlot === slot.slotId}
                          onClick={() => toggle(slot)}
                          className="mt-2 text-xs font-semibold text-midnight/55 underline underline-offset-2 transition hover:text-cardinal disabled:opacity-50"
                        >
                          {busySlot === slot.slotId
                            ? 'Saving…'
                            : slot.status === SLOT_STATUS.BLOCKED
                              ? 'Reopen this time'
                              : 'Block this time'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
