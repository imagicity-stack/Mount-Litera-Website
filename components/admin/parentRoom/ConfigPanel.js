/**
 * Availability and Settings.
 *
 * Both write to the same `parent_room_settings/config` document; the split is
 * about who is looking. Availability is the schedule — the weekdays, the hours,
 * the caps, the days off. Settings is the commercial and operational side — the
 * fee, how it is collected, how long a slot is held, whose name is on the page.
 *
 * Nothing here is validated only in the browser: `mergeParentRoomSettings`
 * clamps every value again on the server, so a day that ends before it starts
 * or a fee of minus ten never reaches the database.
 */

import { useCallback, useEffect, useState } from 'react';

import { Button, Card, Field, Input, Select, TextArea, Toggle } from '@/components/admin/ui';
import { defaultParentRoomSettings } from '@/lib/parentRoom';
import { formatMinutes, isValidDateKey, weekdayName } from '@/lib/parentRoomTime';

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

/** `600` ⇄ `10:00`, so the form can use a native time input. */
const minutesToTime = (minutes) => {
  const hh = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mm = String(minutes % 60).padStart(2, '0');
  return `${hh}:${mm}`;
};

const timeToMinutes = (value) => {
  const [hh, mm] = String(value || '').split(':').map(Number);
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return null;
  return hh * 60 + mm;
};

function DateList({ label, hint, values, onChange }) {
  const [entry, setEntry] = useState('');

  const add = () => {
    if (!isValidDateKey(entry)) return;
    if (values.includes(entry)) {
      setEntry('');
      return;
    }
    onChange([...values, entry].sort());
    setEntry('');
  };

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input type="date" value={entry} onChange={(event) => setEntry(event.target.value)} />
        <Button variant="ghost" onClick={add} disabled={!isValidDateKey(entry)}>
          Add
        </Button>
      </div>
      {values.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {values.map((value) => (
            <li key={value}>
              <button
                type="button"
                onClick={() => onChange(values.filter((v) => v !== value))}
                className="inline-flex items-center gap-2 border border-midnight/15 bg-white px-3 py-1.5 text-xs text-midnight/70 transition hover:border-cardinal hover:text-cardinal"
              >
                {value}
                <span aria-hidden="true">✕</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Field>
  );
}

export default function ConfigPanel({ mode, request, settings, onSaved }) {
  const [values, setValues] = useState(settings || defaultParentRoomSettings);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [reminding, setReminding] = useState(false);
  const [checking, setChecking] = useState(false);
  const [check, setCheck] = useState(null);

  useEffect(() => {
    setValues(settings || defaultParentRoomSettings);
  }, [settings]);

  const set = (key) => (value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setStatus('');
  };

  const number = (key) => (event) => {
    const raw = event.target.value;
    setValues((current) => ({ ...current, [key]: raw === '' ? '' : Number(raw) }));
    setStatus('');
  };

  const save = useCallback(async () => {
    setSaving(true);
    setStatus('');
    setError('');
    try {
      const data = await request('/api/admin/parent-room/settings', {
        method: 'PUT',
        body: JSON.stringify(values)
      });
      if (data.settings) {
        setValues(data.settings);
        onSaved(data.settings);
      }
      setStatus('Saved.');
    } catch (err) {
      setError(err.message || 'Could not save the settings.');
    } finally {
      setSaving(false);
    }
  }, [request, values, onSaved]);

  const sendReminders = useCallback(async () => {
    setReminding(true);
    setStatus('');
    setError('');
    try {
      const data = await request('/api/parent-room/reminders', { method: 'POST' });
      setStatus(
        `${data.sent} reminder${data.sent === 1 ? '' : 's'} sent · ${data.alreadySent} already sent · ${
          data.upcoming
        } upcoming session${data.upcoming === 1 ? '' : 's'} checked.`
      );
    } catch (err) {
      setError(err.message || 'Could not send the reminders.');
    } finally {
      setReminding(false);
    }
  }, [request]);

  /** Ask the gateway itself what is wrong, rather than guessing from a 502. */
  const runPaymentCheck = useCallback(async () => {
    setChecking(true);
    setCheck(null);
    setError('');
    try {
      const data = await request('/api/admin/parent-room/payment-check', { method: 'POST' });
      setCheck(data);
    } catch (err) {
      setError(err.message || 'Could not run the payment check.');
    } finally {
      setChecking(false);
    }
  }, [request]);

  const toggleWeekday = (day) => {
    const current = values.availableWeekdays || [];
    set('availableWeekdays')(
      current.includes(day) ? current.filter((d) => d !== day) : [...current, day].sort()
    );
  };

  const feedback = (error || status) && (
    <p
      className={`border px-4 py-3 text-sm font-semibold ${
        error
          ? 'border-cardinal/30 bg-cardinal/5 text-cardinal'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700'
      }`}
    >
      {error || status}
    </p>
  );

  // -------------------------------------------------------------- schedule

  if (mode === 'availability') {
    return (
      <div className="space-y-4">
        {feedback}

        <Card className="p-5">
          <h3 className="font-garamond text-lg font-semibold text-midnight">Bookings</h3>
          <p className="mt-1 text-xs text-midnight/50">
            When this is off the page still loads, but no times can be booked.
          </p>
          <div className="mt-4">
            <Toggle
              checked={values.enabled !== false}
              onChange={set('enabled')}
              label={values.enabled !== false ? 'Bookings are open' : 'Bookings are closed'}
            />
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-garamond text-lg font-semibold text-midnight">Weekly schedule</h3>

          <div className="mt-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-midnight/50">
              Days sessions run
            </span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {WEEKDAYS.map((day) => {
                const active = (values.availableWeekdays || []).includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleWeekday(day)}
                    className={`border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? 'border-cardinal bg-cardinal/10 text-cardinal'
                        : 'border-midnight/15 bg-white text-midnight/55 hover:border-midnight/40'
                    }`}
                  >
                    {weekdayName(day).slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Day starts" hint="First session of the day.">
              <Input
                type="time"
                value={minutesToTime(values.dayStartMinutes ?? 600)}
                onChange={(event) => {
                  const minutes = timeToMinutes(event.target.value);
                  if (minutes !== null) set('dayStartMinutes')(minutes);
                }}
              />
            </Field>
            <Field label="Day ends" hint="No session starts after this.">
              <Input
                type="time"
                value={minutesToTime(values.dayEndMinutes ?? 780)}
                onChange={(event) => {
                  const minutes = timeToMinutes(event.target.value);
                  if (minutes !== null) set('dayEndMinutes')(minutes);
                }}
              />
            </Field>
            <Field label="Session length" hint="Minutes.">
              <Input type="number" min={5} max={240} value={values.sessionDuration} onChange={number('sessionDuration')} />
            </Field>
            <Field label="Gap between sessions" hint="Minutes. 0 for back to back.">
              <Input type="number" min={0} max={120} value={values.bufferMinutes} onChange={number('bufferMinutes')} />
            </Field>
          </div>

          <p className="mt-4 border-t border-midnight/10 pt-4 text-xs text-midnight/55">
            That gives sessions at{' '}
            <span className="font-semibold text-midnight">
              {(() => {
                const step = Math.max(
                  5,
                  (Number(values.sessionDuration) || 30) + (Number(values.bufferMinutes) || 0)
                );
                const times = [];
                for (
                  let m = Number(values.dayStartMinutes) || 0;
                  m + (Number(values.sessionDuration) || 30) <= (Number(values.dayEndMinutes) || 0);
                  m += step
                ) {
                  times.push(formatMinutes(m));
                }
                return times.length ? times.join(', ') : 'no times — check the hours above';
              })()}
            </span>
            .
          </p>
        </Card>

        <Card className="p-5">
          <h3 className="font-garamond text-lg font-semibold text-midnight">Booking rules</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Maximum sessions a day" hint="The day closes once this is reached.">
              <Input type="number" min={1} max={40} value={values.maximumDailySessions} onChange={number('maximumDailySessions')} />
            </Field>
            <Field label="Minimum notice" hint="Hours. Rules out times too close to now.">
              <Input type="number" min={0} max={720} value={values.minimumBookingNoticeHours} onChange={number('minimumBookingNoticeHours')} />
            </Field>
            <Field label="Booking window" hint="Days ahead a parent can book.">
              <Input type="number" min={1} max={180} value={values.bookingWindowDays} onChange={number('bookingWindowDays')} />
            </Field>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-garamond text-lg font-semibold text-midnight">Exceptions</h3>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <DateList
              label="Blocked dates and holidays"
              hint="No sessions at all on these dates."
              values={values.blockedDates || []}
              onChange={set('blockedDates')}
            />
            <DateList
              label="Extra open dates"
              hint="Opens a date that the weekly schedule would keep closed."
              values={values.extraDates || []}
              onChange={set('extraDates')}
            />
          </div>
          <p className="mt-4 text-xs text-midnight/50">
            To block a single time rather than a whole day, use the Calendar tab.
          </p>
        </Card>

        <div className="flex items-center gap-3">
          <Button onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save availability'}
          </Button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------- settings

  return (
    <div className="space-y-4">
      {feedback}

      <Card className="p-5">
        <h3 className="font-garamond text-lg font-semibold text-midnight">Participation fee</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Fee (₹)" hint="Set to 0 to make sessions free — no payment step is shown.">
            <Input type="number" min={0} max={100000} value={values.participationFee} onChange={number('participationFee')} />
          </Field>
          <Field
            label="How it is collected"
            hint="Offline confirms the booking and records the fee as pending, so nothing is presented as paid when it is not."
          >
            <Select value={values.paymentMode} onChange={(event) => set('paymentMode')(event.target.value)}>
              <option value="razorpay">Online — Razorpay checkout</option>
              <option value="offline">Offline — the school collects it</option>
            </Select>
          </Field>
        </div>
        <p className="mt-4 border-t border-midnight/10 pt-4 text-xs text-midnight/55">
          Online payment also needs <code>RAZORPAY_KEY_ID</code> and{' '}
          <code>RAZORPAY_KEY_SECRET</code> in the environment. Without them the booking flow falls
          back to offline on its own rather than failing at checkout.
        </p>

        {/* If the pay button ever fails, this is the first place to look: it
            raises a real ₹1 order so the gateway itself says what is wrong. */}
        <div className="mt-4 border-t border-midnight/10 pt-4">
          <Button variant="ghost" onClick={runPaymentCheck} disabled={checking}>
            {checking ? 'Checking with Razorpay…' : 'Test the payment connection'}
          </Button>

          {check && (
            <div className="mt-4 space-y-3 text-xs">
              <dl className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {[
                  ['Key ID', check.config.keyIdPresent ? `${check.config.keyIdPrefix} (${check.config.mode})` : 'not set'],
                  ['Key secret', check.config.keySecretPresent ? `${check.config.keySecretLength} characters` : 'not set'],
                  ['Collecting', check.settings.paymentMode === 'razorpay' ? 'online' : 'offline'],
                  ['Fee', `₹${check.settings.participationFee}`]
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 border-b border-midnight/[0.07] py-1.5">
                    <dt className="text-midnight/45">{label}</dt>
                    <dd className="font-semibold text-midnight">{value}</dd>
                  </div>
                ))}
              </dl>

              {check.problems.length > 0 && (
                <ul className="space-y-1.5 border border-amber-300 bg-amber-50 p-3 text-amber-800">
                  {check.problems.map((problem) => (
                    <li key={problem}>• {problem}</li>
                  ))}
                </ul>
              )}

              {check.probe && (
                <p
                  className={`border p-3 font-semibold ${
                    check.probe.ok
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-cardinal/30 bg-cardinal/5 text-cardinal'
                  }`}
                >
                  {check.probe.message}
                  {check.probe.code ? ` (${check.probe.code})` : ''}
                </p>
              )}

              {check.problems.length === 0 && check.probe?.ok && (
                <p className="text-midnight/50">
                  Nothing to fix. The ₹1 test order is never charged — it simply proves the
                  credentials are accepted.
                </p>
              )}
            </div>
          )}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-garamond text-lg font-semibold text-midnight">Holding a slot</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Hold time" hint="Minutes a time is reserved while a parent pays.">
            <Input type="number" min={3} max={120} value={values.reservationHoldMinutes} onChange={number('reservationHoldMinutes')} />
          </Field>
          <Field label="Reschedule notice" hint="Hours of notice the school asks for.">
            <Input type="number" min={0} max={720} value={values.rescheduleNoticeHours} onChange={number('rescheduleNoticeHours')} />
          </Field>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-garamond text-lg font-semibold text-midnight">Who conducts the session</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <Input value={values.counsellorName} onChange={(event) => set('counsellorName')(event.target.value)} />
          </Field>
          <Field label="Title">
            <Input value={values.counsellorTitle} onChange={(event) => set('counsellorTitle')(event.target.value)} />
          </Field>
        </div>
        <p className="mt-3 text-xs text-midnight/50">
          Her photograph is uploaded under Site Images → The Parent Room. Until one is uploaded the
          page shows her initials rather than a stand-in picture.
        </p>
      </Card>

      <Card className="p-5">
        <h3 className="font-garamond text-lg font-semibold text-midnight">Joining instructions</h3>
        <Field
          label="Default meeting note"
          hint="Shown on the confirmation and in the email when a booking has no meeting link of its own."
          className="mt-4"
        >
          <TextArea
            rows={2}
            value={values.defaultMeetingNote}
            onChange={(event) => set('defaultMeetingNote')(event.target.value)}
          />
        </Field>
        <p className="mt-3 text-xs text-midnight/50">
          Each booking gets its own link in the booking drawer. There is deliberately no single
          public meeting link.
        </p>
      </Card>

      <Card className="p-5">
        <h3 className="font-garamond text-lg font-semibold text-midnight">Reminders</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-midnight/55">
          Parents are reminded 24 hours and 1 hour before a session. The site has no scheduler of
          its own, so either press this button, or point a scheduled job at{' '}
          <code>POST /api/parent-room/reminders</code> with{' '}
          <code>Authorization: Bearer $CRON_SECRET</code>. Sending twice is harmless — each reminder
          is only ever sent once per booking.
        </p>
        <div className="mt-4">
          <Button variant="ghost" onClick={sendReminders} disabled={reminding}>
            {reminding ? 'Checking…' : 'Send due reminders now'}
          </Button>
        </div>
      </Card>

      <div>
        <Button onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save settings'}
        </Button>
      </div>
    </div>
  );
}
