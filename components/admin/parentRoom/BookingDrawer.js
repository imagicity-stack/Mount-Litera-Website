/**
 * One booking, in full.
 *
 * Everything the counsellor needs before the call, and every action the school
 * can take on it. Destructive actions — cancelling, marking a no-show — ask for
 * confirmation inline rather than firing on a single click.
 *
 * The internal notes box at the bottom is staff-only. It is stored on the
 * booking, returned by the admin API alone, and appears in no email and in no
 * response the parent can reach.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Badge, Button, Field, Input, Select, TextArea } from '@/components/admin/ui';
import {
  LIMITS,
  PAYMENT_STATUS,
  bookingStatusLabels,
  communicationLabel,
  concernLabel,
  languageLabel,
  paymentStatusLabels,
  schoolChangeLabel
} from '@/lib/parentRoom';
import {
  addDaysToKey,
  formatDateKey,
  formatMinutes,
  istDateKey
} from '@/lib/parentRoomTime';

function Row({ label, children }) {
  if (children === '' || children === null || children === undefined) return null;
  return (
    <div className="grid gap-1 border-b border-midnight/[0.07] py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-midnight/45">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-midnight">{children}</dd>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-7 first:mt-0">
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cardinal">
        {title}
      </h4>
      <dl className="mt-2 border-t border-midnight/[0.07]">{children}</dl>
    </section>
  );
}

export default function BookingDrawer({ booking, settings, request, onClose, onUpdated }) {
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState('');

  const [notes, setNotes] = useState(booking.internalNotes || '');
  const [meetingLink, setMeetingLink] = useState(booking.meetingLink || '');
  const [paymentStatus, setPaymentStatus] = useState(booking.paymentStatus);
  const [cancelReason, setCancelReason] = useState('');
  const [notifyParent, setNotifyParent] = useState(true);

  const [rescheduling, setRescheduling] = useState(false);
  const [calendar, setCalendar] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('');

  useEffect(() => {
    setNotes(booking.internalNotes || '');
    setMeetingLink(booking.meetingLink || '');
    setPaymentStatus(booking.paymentStatus);
  }, [booking]);

  // Close on Escape, the way a drawer is expected to behave.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const act = useCallback(
    async (action, body = {}) => {
      setBusy(action);
      setError('');
      setMessage('');
      try {
        const data = await request(
          `/api/admin/parent-room/bookings/${encodeURIComponent(booking.bookingId)}`,
          { method: 'PATCH', body: JSON.stringify({ action, notifyParent, ...body }) }
        );
        if (data.booking) onUpdated(data.booking);
        setMessage(data.message || 'Done.');
        setConfirming('');
      } catch (err) {
        setError(err.message || 'That action could not be completed.');
      } finally {
        setBusy('');
      }
    },
    [booking.bookingId, notifyParent, onUpdated, request]
  );

  const openReschedule = useCallback(async () => {
    setRescheduling(true);
    setError('');
    if (calendar) return;
    try {
      const today = istDateKey(new Date());
      const data = await request(
        `/api/admin/parent-room/slots?from=${today}&to=${addDaysToKey(today, 60)}`
      );
      setCalendar(data.days || []);
    } catch (err) {
      setError(err.message || 'Could not load the calendar.');
    }
  }, [calendar, request]);

  const openDays = useMemo(
    () => (calendar || []).filter((day) => day.open && day.slots.some((slot) => slot.selectable)),
    [calendar]
  );

  const slotsForDate = useMemo(
    () => openDays.find((day) => day.dateKey === newDate)?.slots.filter((s) => s.selectable) || [],
    [openDays, newDate]
  );

  const duration = settings.sessionDuration || 30;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-midnight/40 backdrop-blur-[2px]"
      />

      <aside
        role="dialog"
        aria-label={`Booking ${booking.bookingId}`}
        className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-midnight/15 bg-[#faf8f3] shadow-elite-xl"
      >
        {/* ------------------------------------------------------------ head */}
        <header className="sticky top-0 z-10 border-b border-midnight/10 bg-white/90 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-xs font-semibold text-cardinal">{booking.bookingId}</p>
              <h3 className="mt-1 truncate font-garamond text-xl font-semibold text-midnight">
                {booking.parentName}
              </h3>
              <p className="mt-1 text-xs text-midnight/55">
                {formatDateKey(booking.dateKey)} · {formatMinutes(booking.startMinutes)} –{' '}
                {formatMinutes(booking.startMinutes + duration)} IST
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-midnight/15 text-midnight/60 transition hover:border-cardinal hover:text-cardinal"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone={booking.bookingStatus === 'cancelled' ? 'bad' : 'neutral'}>
              {bookingStatusLabels[booking.bookingStatus] || booking.bookingStatus}
            </Badge>
            <Badge tone={booking.paymentStatus === 'paid' ? 'good' : 'ok'}>
              {paymentStatusLabels[booking.paymentStatus]} · ₹{booking.amount}
            </Badge>
            <Badge tone="neutral">{booking.channel}</Badge>
          </div>
        </header>

        <div className="flex-1 px-6 py-6">
          {(message || error) && (
            <p
              className={`mb-5 border px-4 py-3 text-sm font-semibold ${
                error
                  ? 'border-cardinal/30 bg-cardinal/5 text-cardinal'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}
            >
              {error || message}
            </p>
          )}

          <Section title="Parent">
            <Row label="Name">{booking.parentName}</Row>
            <Row label="Phone">
              <a href={`tel:${booking.mobile}`} className="text-cardinal">
                {booking.mobile}
              </a>
            </Row>
            <Row label="WhatsApp">{booking.whatsapp}</Row>
            <Row label="Email">
              <a href={`mailto:${booking.email}`} className="break-all text-cardinal">
                {booking.email}
              </a>
            </Row>
            <Row label="Prefers">{communicationLabel(booking.preferredCommunication)}</Row>
          </Section>

          <Section title="Child">
            <Row label="First name">{booking.childFirstName}</Row>
            <Row label="Age">{booking.childAge}</Row>
            <Row label="Class">{booking.currentClass}</Row>
            <Row label="Current school">{booking.currentSchool}</Row>
          </Section>

          <Section title="Session concern">
            <Row label="Primary concern">{concernLabel(booking.primaryConcern)}</Row>
            <Row label="In their words">
              <span className="whitespace-pre-line">{booking.concernDetails}</span>
            </Row>
            <Row label="Hopes to get">
              <span className="whitespace-pre-line">{booking.sessionExpectation}</span>
            </Row>
            <Row label="Language">{languageLabel(booking.preferredLanguage)}</Row>
          </Section>

          <Section title="School intent">
            <Row label="School change">{schoolChangeLabel(booking.schoolChangeIntent)}</Row>
            <Row label="Marketing consent">{booking.marketingConsent ? 'Yes' : 'No'}</Row>
          </Section>

          <Section title="Appointment">
            <Row label="Date">{formatDateKey(booking.dateKey)}</Row>
            <Row label="Time">
              {formatMinutes(booking.startMinutes)} – {formatMinutes(booking.startMinutes + duration)}{' '}
              IST
            </Row>
            <Row label="Meeting link">
              {booking.meetingLink ? (
                <a href={booking.meetingLink} target="_blank" rel="noreferrer" className="break-all text-cardinal">
                  {booking.meetingLink}
                </a>
              ) : (
                <span className="text-midnight/45">Not set</span>
              )}
            </Row>
            <Row label="Status">{bookingStatusLabels[booking.bookingStatus]}</Row>
          </Section>

          <Section title="Payment">
            <Row label="Amount">₹{booking.amount}</Row>
            <Row label="Status">{paymentStatusLabels[booking.paymentStatus]}</Row>
            <Row label="Transaction">{booking.paymentReference || '—'}</Row>
            <Row label="Order">{booking.paymentOrderId || '—'}</Row>
          </Section>

          <Section title="Campaign attribution">
            <Row label="Channel">{booking.channel}</Row>
            <Row label="Source">{booking.source || '—'}</Row>
            <Row label="Medium">{booking.medium || '—'}</Row>
            <Row label="Campaign">{booking.campaign || '—'}</Row>
            <Row label="Creative">{booking.adCreative || '—'}</Row>
          </Section>

          {/* --------------------------------------------------------- notes */}
          <section className="mt-8 border border-midnight/10 bg-white p-5">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cardinal">
              Internal session notes
            </h4>
            <p className="mt-1.5 text-xs text-midnight/50">
              Staff only. Never shown to the parent and never included in any email.
            </p>
            <TextArea
              rows={5}
              value={notes}
              maxLength={LIMITS.internalNotes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-3"
              placeholder="Observations, follow-up, anything the next conversation should start from."
            />
            <div className="mt-3">
              <Button
                variant="ghost"
                disabled={busy === 'notes'}
                onClick={() => act('notes', { internalNotes: notes })}
              >
                {busy === 'notes' ? 'Saving…' : 'Save notes'}
              </Button>
            </div>
          </section>

          {/* ------------------------------------------------------- actions */}
          <section className="mt-6 border border-midnight/10 bg-white p-5">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cardinal">
              Actions
            </h4>

            <label className="mt-4 flex items-center gap-2.5 text-xs text-midnight/70">
              <input
                type="checkbox"
                checked={notifyParent}
                onChange={(event) => setNotifyParent(event.target.checked)}
                className="h-4 w-4 accent-cardinal"
              />
              Email the parent about this change
            </label>

            <div className="mt-4 grid gap-3">
              <Field label="Meeting link">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={meetingLink}
                    onChange={(event) => setMeetingLink(event.target.value)}
                    placeholder="https://…"
                  />
                  <Button
                    variant="ghost"
                    disabled={busy === 'meeting-link'}
                    onClick={() => act('meeting-link', { meetingLink })}
                  >
                    {busy === 'meeting-link' ? 'Saving…' : 'Save link'}
                  </Button>
                </div>
              </Field>

              <Field label="Payment status">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select
                    value={paymentStatus}
                    onChange={(event) => setPaymentStatus(event.target.value)}
                  >
                    {Object.values(PAYMENT_STATUS).map((value) => (
                      <option key={value} value={value}>
                        {paymentStatusLabels[value]}
                      </option>
                    ))}
                  </Select>
                  <Button
                    variant="ghost"
                    disabled={busy === 'payment' || paymentStatus === booking.paymentStatus}
                    onClick={() => act('payment', { paymentStatus })}
                  >
                    {busy === 'payment' ? 'Saving…' : 'Update payment'}
                  </Button>
                </div>
              </Field>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-midnight/10 pt-5">
              {booking.bookingStatus === 'pending' && (
                <Button disabled={busy === 'confirm'} onClick={() => act('confirm')}>
                  {busy === 'confirm' ? 'Confirming…' : 'Confirm booking'}
                </Button>
              )}
              <Button variant="ghost" onClick={openReschedule}>
                Reschedule
              </Button>
              <Button
                variant="ghost"
                disabled={busy === 'complete'}
                onClick={() => act('complete')}
              >
                Mark completed
              </Button>
              <Button variant="ghost" onClick={() => setConfirming('no-show')}>
                Mark no-show
              </Button>
              <Button
                variant="ghost"
                disabled={busy === 'resend-confirmation'}
                onClick={() => act('resend-confirmation')}
              >
                {busy === 'resend-confirmation' ? 'Sending…' : 'Resend confirmation'}
              </Button>
              <Button variant="danger" onClick={() => setConfirming('cancel')}>
                Cancel booking
              </Button>
            </div>

            {/* -------------------------------------------- confirm dialogs */}
            {confirming === 'no-show' && (
              <div className="mt-5 border border-amber-300 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-800">
                  Mark this session as a no-show?
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  The time stays used. The parent is not emailed.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button disabled={busy === 'no-show'} onClick={() => act('no-show')}>
                    {busy === 'no-show' ? 'Saving…' : 'Yes, mark no-show'}
                  </Button>
                  <Button variant="subtle" onClick={() => setConfirming('')}>
                    Keep as is
                  </Button>
                </div>
              </div>
            )}

            {confirming === 'cancel' && (
              <div className="mt-5 border border-cardinal/30 bg-cardinal/5 p-4">
                <p className="text-sm font-semibold text-cardinal">Cancel this booking?</p>
                <p className="mt-1 text-xs text-cardinal/80">
                  The time is released for another parent. This cannot be undone — a cancelled
                  booking has to be rebooked.
                </p>
                <TextArea
                  rows={2}
                  value={cancelReason}
                  onChange={(event) => setCancelReason(event.target.value)}
                  placeholder="Reason (included in the parent's email, optional)"
                  className="mt-3"
                />
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="danger"
                    disabled={busy === 'cancel'}
                    onClick={() => act('cancel', { reason: cancelReason })}
                  >
                    {busy === 'cancel' ? 'Cancelling…' : 'Yes, cancel it'}
                  </Button>
                  <Button variant="subtle" onClick={() => setConfirming('')}>
                    Keep the booking
                  </Button>
                </div>
              </div>
            )}

            {/* ------------------------------------------------- reschedule */}
            {rescheduling && (
              <div className="mt-5 border border-midnight/15 bg-[#faf8f3] p-4">
                <p className="text-sm font-semibold text-midnight">Move to a different time</p>
                {!calendar ? (
                  <p className="mt-2 text-xs text-midnight/55">Loading the calendar…</p>
                ) : openDays.length === 0 ? (
                  <p className="mt-2 text-xs text-midnight/55">
                    No open times in the next 60 days. Open more under Availability first.
                  </p>
                ) : (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Select
                      value={newDate}
                      onChange={(event) => {
                        setNewDate(event.target.value);
                        setNewSlot('');
                      }}
                    >
                      <option value="">Choose a date</option>
                      {openDays.map((day) => (
                        <option key={day.dateKey} value={day.dateKey}>
                          {formatDateKey(day.dateKey, { short: true })}
                        </option>
                      ))}
                    </Select>
                    <Select
                      value={newSlot}
                      onChange={(event) => setNewSlot(event.target.value)}
                      disabled={!newDate}
                    >
                      <option value="">Choose a time</option>
                      {slotsForDate.map((slot) => (
                        <option key={slot.slotId} value={slot.slotId}>
                          {slot.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  <Button
                    disabled={!newSlot || busy === 'reschedule'}
                    onClick={() => act('reschedule', { slotId: newSlot })}
                  >
                    {busy === 'reschedule' ? 'Moving…' : 'Move booking'}
                  </Button>
                  <Button variant="subtle" onClick={() => setRescheduling(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </section>

          {/* ------------------------------------------------------- history */}
          {booking.history?.length > 0 && (
            <section className="mt-6">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-midnight/45">
                History
              </h4>
              <ul className="mt-3 space-y-2">
                {[...booking.history].reverse().map((entry, index) => (
                  <li key={`${entry.at}-${index}`} className="text-xs text-midnight/55">
                    <span className="font-semibold text-midnight/75">{entry.action}</span>
                    {entry.detail ? ` — ${entry.detail}` : ''}
                    <span className="ml-1 text-midnight/40">
                      · {new Date(entry.at).toLocaleString('en-IN')} · {entry.by}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </aside>
    </div>
  );
}
