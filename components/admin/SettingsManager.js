import { useCallback, useEffect, useMemo, useState } from 'react';

import { defaultSettings, settingsFields } from '@/lib/siteSettings';
import { Button, Field, Input } from '@/components/admin/ui';

/**
 * The school's own details — the single place phone numbers, addresses and
 * email addresses are edited. Every page reads these, so a change here updates
 * the footer, the contact section, and the structured data at once.
 */
export default function SettingsManager({ getToken }) {
  const [values, setValues] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (!cancelled && data.settings) setValues(data.settings);
      } catch (err) {
        if (!cancelled) setError('Could not load the current settings.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const groups = useMemo(() => {
    const out = [];
    const index = new Map();
    settingsFields.forEach((field) => {
      if (!index.has(field.group)) {
        const entry = { group: field.group, fields: [] };
        index.set(field.group, entry);
        out.push(entry);
      }
      index.get(field.group).fields.push(field);
    });
    return out;
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    setStatus('');
    setError('');
    try {
      const token = await getToken();
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(values)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Could not save.');
      setStatus('Saved. The change is live across the site.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [getToken, values]);

  if (loading) return <p className="text-sm text-midnight/50">Loading settings…</p>;

  return (
    <div className="space-y-6">
      <header className="border border-midnight/12 bg-white p-6">
        <h2 className="font-garamond text-2xl font-semibold text-midnight">School details</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-midnight/65">
          Phone, address, email addresses and social links. These are used everywhere they appear
          on the site — the footer, the contact page, and the data search engines read — so you
          only change them once.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.group} className="border border-midnight/12 bg-white p-6">
          <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-midnight/55">
            {group.group}
          </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {group.fields.map((field) => (
              <Field key={field.name} label={field.label} hint={field.hint}>
                <Input
                  type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
                  value={values[field.name] || ''}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  placeholder={defaultSettings[field.name]}
                />
              </Field>
            ))}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="button" onClick={save} disabled={saving} className="!py-2 !text-xs">
          {saving ? 'Saving…' : 'Save school details'}
        </Button>
        {status && <span className="text-xs font-semibold text-midnight/60">{status}</span>}
        {error && <span className="text-xs font-semibold text-cardinal">{error}</span>}
      </div>
    </div>
  );
}
