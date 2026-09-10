/**
 * The Parent Room section of the admin portal.
 *
 * A section inside the existing dashboard, not a second application: it uses
 * the same shell, the same sign-in, the same `getToken` bearer, and the same UI
 * primitives as every other tab. Six views share one load of the bookings, so
 * moving between Overview, Bookings and Completed Sessions is instant and the
 * numbers on the cards always agree with the rows in the table.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Spinner } from '@/components/admin/ui';
import Overview from '@/components/admin/parentRoom/Overview';
import BookingsTable from '@/components/admin/parentRoom/BookingsTable';
import BookingDrawer from '@/components/admin/parentRoom/BookingDrawer';
import CalendarBoard from '@/components/admin/parentRoom/CalendarBoard';
import ConfigPanel from '@/components/admin/parentRoom/ConfigPanel';
import { defaultParentRoomSettings } from '@/lib/parentRoom';

const VIEWS = [
  { id: 'overview', label: 'Overview' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'availability', label: 'Availability' },
  { id: 'completed', label: 'Completed Sessions' },
  { id: 'settings', label: 'Settings' }
];

export default function ParentRoomManager({ getToken, focusBookingId }) {
  const [view, setView] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [settings, setSettings] = useState(defaultParentRoomSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  /** Every admin request in this section goes through here. */
  const request = useCallback(
    async (url, options = {}) => {
      const token = await getToken();
      const res = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...(options.headers || {})
        }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const failure = new Error(data.message || 'That request failed.');
        failure.status = res.status;
        throw failure;
      }
      return data;
    },
    [getToken]
  );

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await request('/api/admin/parent-room/bookings');
      setBookings(data.bookings || []);
      if (data.settings) setSettings(data.settings);
    } catch (err) {
      setError(err.message || 'Could not load the bookings.');
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // An admin arriving from the "View booking" button in the notification email
  // lands directly on that booking rather than having to search for it.
  useEffect(() => {
    if (!focusBookingId || bookings.length === 0) return;
    const match = bookings.find((booking) => booking.bookingId === focusBookingId);
    if (match) {
      setView('bookings');
      setSelected(match);
    }
  }, [focusBookingId, bookings]);

  /** Replace one row after an action, without refetching the whole table. */
  const applyBooking = useCallback((updated) => {
    setBookings((current) =>
      current.map((booking) => (booking.bookingId === updated.bookingId ? updated : booking))
    );
    setSelected((current) =>
      current && current.bookingId === updated.bookingId ? updated : current
    );
  }, []);

  const completed = useMemo(
    () => bookings.filter((b) => b.bookingStatus === 'completed' || b.bookingStatus === 'no_show'),
    [bookings]
  );

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-garamond text-2xl font-semibold text-midnight">The Parent Room</h2>
        <p className="mt-1 text-sm text-midnight/55">
          Private parent guidance sessions — bookings, calendar and availability.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2 border-b border-midnight/10 pb-3">
        {VIEWS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setView(item.id)}
            className={`px-4 py-2 text-sm font-semibold transition ${
              view === item.id
                ? 'bg-cardinal/10 text-cardinal shadow-[inset_0_0_0_1px_rgba(165,28,48,0.2)]'
                : 'text-midnight/55 hover:bg-midnight/[0.04] hover:text-midnight'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {error && (
        <p className="border border-cardinal/30 bg-cardinal/5 px-4 py-3 text-sm font-semibold text-cardinal">
          {error}
        </p>
      )}

      {loading ? (
        <div className="py-16 text-center">
          <Spinner label="Loading the Parent Room…" />
        </div>
      ) : (
        <>
          {view === 'overview' && (
            <Overview
              bookings={bookings}
              settings={settings}
              onOpen={setSelected}
              onGoTo={setView}
            />
          )}

          {view === 'bookings' && (
            <BookingsTable
              bookings={bookings}
              settings={settings}
              onOpen={setSelected}
              onRefresh={loadBookings}
            />
          )}

          {view === 'completed' && (
            <BookingsTable
              bookings={completed}
              settings={settings}
              onOpen={setSelected}
              onRefresh={loadBookings}
              title="Completed and missed sessions"
              emptyMessage="No sessions have been marked completed or no-show yet."
            />
          )}

          {view === 'calendar' && <CalendarBoard request={request} onOpen={setSelected} bookings={bookings} />}

          {(view === 'availability' || view === 'settings') && (
            <ConfigPanel
              mode={view}
              request={request}
              settings={settings}
              onSaved={(next) => setSettings(next)}
            />
          )}
        </>
      )}

      {selected && (
        <BookingDrawer
          booking={selected}
          settings={settings}
          request={request}
          onClose={() => setSelected(null)}
          onUpdated={applyBooking}
        />
      )}
    </div>
  );
}
