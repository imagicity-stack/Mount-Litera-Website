/**
 * Scholarship settings.
 *
 * Two things the office needs and should not need a developer for: the
 * registration number series, and proof that the notification email is
 * reaching them.
 *
 * The fee and the dates are deliberately absent. They are in the Terms every
 * parent agrees to at payment, and a figure editable here while the document
 * said something else would be the worst kind of mismatch — so those change in
 * code alongside the document.
 */

import { useCallback, useEffect, useState } from 'react';

import { Button, Card, Field, Input, Select, TextArea, Toggle } from '@/components/admin/ui';
import { defaultScholarshipSettings, previewNextNumber } from '@/lib/scholarshipSettings';

export default function SettingsPanel({ request }) {
  const [values, setValues] = useState(defaultScholarshipSettings);
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await request('/api/admin/scholarship/settings');
      if (data.settings) setValues(data.settings);
      if (data.notifications) setNotifications(data.notifications);
    } catch (err) {
      setError(err.message || 'Could not load the settings.');
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    load();
  }, [load]);

  const set = (key) => (value) => {
    setValues((cur) => ({ ...cur, [key]: value }));
    setStatus('');
  };

  const save = useCallback(async () => {
    setSaving(true);
    setStatus('');
    setError('');
    try {
      const data = await request('/api/admin/scholarship/settings', {
        method: 'PUT',
        body: JSON.stringify(values)
      });
      if (data.settings) setValues(data.settings);
      setStatus('Saved.');
    } catch (err) {
      setError(err.message || 'Could not save the settings.');
    } finally {
      setSaving(false);
    }
  }, [request, values]);

  const sendTest = useCallback(async () => {
    setTesting(true);
    setStatus('');
    setError('');
    try {
      const data = await request('/api/admin/scholarship/settings', {
        method: 'POST',
        body: JSON.stringify({ action: 'test-email' })
      });
      setStatus(data.message || 'Test email sent.');
    } catch (err) {
      setError(err.message || 'The test email could not be sent.');
    } finally {
      setTesting(false);
    }
  }, [request]);

  if (loading) {
    return <p className="py-14 text-center text-sm text-midnight/55">Loading settings…</p>;
  }

  const preview = previewNextNumber(values);
  const sequential = values.numberingMode === 'sequential';

  return (
    <div className="space-y-4">
      {(error || status) && (
        <p
          className={`border px-4 py-3 text-sm font-semibold ${
            error
              ? 'border-cardinal/30 bg-cardinal/5 text-cardinal'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          {error || status}
        </p>
      )}

      {/* ------------------------------------------- registration numbers */}
      <Card className="p-5">
        <h3 className="font-garamond text-lg font-semibold text-midnight">
          Registration numbers
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-midnight/55">
          The number a child is given at registration. It goes on their admit card, on the merit
          list, and is what a parent quotes on the phone.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Series"
            hint="Letters and numbers only. Next year, change EMS27 to EMS28 — nothing else needs touching."
          >
            <Input
              value={values.registrationPrefix}
              maxLength={12}
              onChange={(e) => set('registrationPrefix')(e.target.value.toUpperCase())}
            />
          </Field>

          <Field label="How numbers are made">
            <Select
              value={values.numberingMode}
              onChange={(e) => set('numberingMode')(e.target.value)}
            >
              <option value="random">Random — EMS27-K7M2QX</option>
              <option value="sequential">Sequential — EMS27-0001</option>
            </Select>
          </Field>
        </div>

        {sequential && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Next number"
              hint="The next roll number to issue. Already-issued numbers are never reused."
            >
              <Input
                type="number"
                min={1}
                max={999999}
                value={values.sequentialNext}
                onChange={(e) => set('sequentialNext')(Number(e.target.value))}
              />
            </Field>
            <Field label="Digits" hint="4 gives 0001, 5 gives 00001.">
              <Input
                type="number"
                min={3}
                max={6}
                value={values.sequentialPadding}
                onChange={(e) => set('sequentialPadding')(Number(e.target.value))}
              />
            </Field>
          </div>
        )}

        <div className="mt-5 border-t border-midnight/10 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-midnight/45">
            The next registration will be
          </p>
          <p className="mt-1.5 font-mono text-xl font-bold tracking-[0.06em] text-eden-700">
            {preview}
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-midnight/50">
          {sequential
            ? 'Sequential numbers are easier to read out and to build a seating plan from, but they reveal how many children have registered, and leave a gap wherever a payment was abandoned.'
            : 'Random numbers are unguessable and reveal nothing about how many children have registered. Characters that are easily confused — 0/O, 1/I/L — are never used.'}
        </p>
      </Card>

      {/* ------------------------------------------------------- open/closed */}
      <Card className="p-5">
        <h3 className="font-garamond text-lg font-semibold text-midnight">Accepting entries</h3>
        <p className="mt-1 text-xs leading-relaxed text-midnight/55">
          Turn this off to stop taking entries before the published closing date — if the hall is
          full, for instance. It cannot extend past that date: the date is in the Terms every
          parent agrees to at payment, so extending means changing both together.
        </p>
        <div className="mt-4">
          <Toggle
            checked={values.registrationOpen !== false}
            onChange={set('registrationOpen')}
            label={
              values.registrationOpen !== false
                ? 'Accepting registrations'
                : 'Closed — the form is not taking entries'
            }
          />
        </div>
        {values.registrationOpen === false && (
          <Field
            label="What a parent sees"
            hint="Leave blank for the standard “registration has closed” message."
            className="mt-4"
          >
            <TextArea
              rows={2}
              value={values.closedMessage}
              maxLength={300}
              onChange={(e) => set('closedMessage')(e.target.value)}
              placeholder="Registration has closed as all test slots are full."
            />
          </Field>
        )}
      </Card>

      <div>
        <Button onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save settings'}
        </Button>
      </div>

      {/* ------------------------------------------------------ notifications */}
      <Card className="p-5">
        <h3 className="font-garamond text-lg font-semibold text-midnight">
          Who gets told about a registration
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-midnight/55">
          Set in the environment, not here — so it cannot be changed by anyone who gets into the
          portal. This is what is in effect right now.
        </p>

        {notifications && (
          <dl className="mt-5 border-t border-midnight/[0.07]">
            {[
              ['Alerts go to', notifications.recipient, notifications.recipientSource],
              ['Sent from', notifications.sender, notifications.senderSource],
              ['Transport', notifications.transport, '']
            ].map(([label, value, source]) => (
              <div
                key={label}
                className="grid gap-1 border-b border-midnight/[0.07] py-3 sm:grid-cols-[9rem_1fr] sm:gap-4"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-midnight/45">
                  {label}
                </dt>
                <dd className="text-sm text-midnight">
                  <span className="font-semibold">{value}</span>
                  {source && (
                    <span className="ml-2 text-xs text-midnight/45">
                      from <code>{source}</code>
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-4 text-xs leading-relaxed text-midnight/55">
          The chain is <code>SCHOLARSHIP_TO</code> → <code>ADMISSION_TO</code> →{' '}
          <code>CONTACT_TO</code>, falling back to a built-in address. The alert is sent the moment
          a ₹199 payment is confirmed — never for a registration that was started and abandoned.
        </p>

        <div className="mt-4">
          <Button variant="ghost" onClick={sendTest} disabled={testing}>
            {testing ? 'Sending…' : 'Send a test email'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
