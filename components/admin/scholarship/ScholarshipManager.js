/**
 * The Scholarship section of the admin portal.
 *
 * A section inside the existing dashboard, not a second application: same
 * shell, same sign-in, same `getToken` bearer, same UI primitives as every
 * other tab.
 *
 * Three views share one load of the registrations, so the overview figures and
 * the table rows can never disagree. The locality breakdown is the one worth
 * reading before buying more advertising — it is the difference between
 * guessing which neighbourhoods respond and knowing.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Badge, Button, Card, Input, Select, Spinner, TextArea } from '@/components/admin/ui';
import SettingsPanel from '@/components/admin/scholarship/SettingsPanel';
import {
  LIMITS,
  PAYMENT_STATUS,
  REGISTRATION_STATUS,
  classLabel,
  classOptions,
  genderLabel,
  hearAboutLabel,
  localityOptions,
  paymentStatusLabels,
  registrationStatusLabels,
  relationshipLabel,
  scholarship
} from '@/lib/scholarship';

const VIEWS = [
  { id: 'overview', label: 'Overview' },
  { id: 'registrations', label: 'Registrations' },
  { id: 'localities', label: 'Where they came from' },
  { id: 'settings', label: 'Settings' }
];

const ALL = '__all__';

const STATUS_TONE = {
  registered: 'good',
  admit_card_sent: 'good',
  appeared: 'good',
  pending: 'ok',
  absent: 'bad',
  cancelled: 'bad',
  expired: 'neutral'
};

const PAYMENT_TONE = {
  paid: 'good',
  pending: 'ok',
  failed: 'bad',
  refunded: 'neutral'
};

/** CSV for the office: the test-day attendance sheet, basically. */
const toCsv = (rows) => {
  const headers = [
    'Registration',
    'Child',
    'DOB',
    'Class',
    'Current school',
    'Parent',
    'Relationship',
    'WhatsApp',
    'Alternate',
    'Email',
    'Locality',
    'Heard via',
    'Payment',
    'Status',
    'Registered on'
  ];
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [
      r.registrationNumber,
      r.childName,
      r.dob,
      classLabel(r.classApplying),
      r.currentSchool,
      r.parentName,
      relationshipLabel(r.relationship),
      r.whatsapp,
      r.altPhone,
      r.email,
      r.locality === 'Other' ? r.localityOther || 'Other' : r.locality,
      hearAboutLabel(r.hearAbout),
      paymentStatusLabels[r.paymentStatus] || r.paymentStatus,
      registrationStatusLabels[r.status] || r.status,
      r.paidAt || r.createdAt || ''
    ]
      .map(escape)
      .join(',')
  );
  return [headers.map(escape).join(','), ...lines].join('\n');
};

function Stat({ label, value, sub, tone = 'plain' }) {
  const tones = {
    good: 'text-emerald-700',
    warn: 'text-amber-700',
    bad: 'text-cardinal',
    plain: 'text-midnight'
  };
  return (
    <Card className="p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-midnight/45">
        {label}
      </p>
      <p className={`mt-3 font-garamond text-3xl leading-none ${tones[tone]}`}>{value}</p>
      {sub && <p className="mt-2 text-xs leading-snug text-midnight/50">{sub}</p>}
    </Card>
  );
}

export default function ScholarshipManager({ getToken, focusRegistration }) {
  const [view, setView] = useState('overview');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

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

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await request('/api/admin/scholarship/registrations');
      setRows(data.registrations || []);
    } catch (err) {
      setError(err.message || 'Could not load the registrations.');
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    load();
  }, [load]);

  // An admin arriving from the "View registration" button in the notification
  // email lands on that registration rather than searching for it.
  useEffect(() => {
    if (!focusRegistration || rows.length === 0) return;
    const match = rows.find((r) => r.registrationNumber === focusRegistration);
    if (match) {
      setView('registrations');
      setSelected(match);
    }
  }, [focusRegistration, rows]);

  const applyRow = useCallback((updated) => {
    setRows((cur) =>
      cur.map((r) => (r.registrationNumber === updated.registrationNumber ? updated : r))
    );
    setSelected((cur) =>
      cur && cur.registrationNumber === updated.registrationNumber ? updated : cur
    );
  }, []);

  const paid = useMemo(() => rows.filter((r) => r.paymentStatus === PAYMENT_STATUS.PAID), [rows]);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-garamond text-2xl font-semibold text-midnight">
          {scholarship.name}
        </h2>
        <p className="mt-1 text-sm text-midnight/55">
          Registrations, payments and the test-day list for {scholarship.programme}.
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
                ? 'bg-eden-600/10 text-eden-700 shadow-[inset_0_0_0_1px_rgba(12,90,84,0.25)]'
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
          <Spinner label="Loading registrations…" />
        </div>
      ) : (
        <>
          {view === 'overview' && <Overview rows={rows} paid={paid} onGoTo={setView} />}
          {view === 'registrations' && (
            <RegistrationsTable rows={rows} onOpen={setSelected} onRefresh={load} />
          )}
          {view === 'localities' && <Localities rows={paid} />}
          {view === 'settings' && <SettingsPanel request={request} />}
        </>
      )}

      {selected && (
        <RegistrationDrawer
          record={selected}
          request={request}
          onClose={() => setSelected(null)}
          onUpdated={applyRow}
        />
      )}
    </div>
  );
}

// ------------------------------------------------------------------ Overview

function Overview({ rows, paid, onGoTo }) {
  const stats = useMemo(() => {
    const byClass = new Map();
    let revenue = 0;
    let appeared = 0;
    let absent = 0;
    let pending = 0;

    rows.forEach((r) => {
      if (r.paymentStatus === PAYMENT_STATUS.PAID) revenue += Number(r.amount) || 0;
      if (r.status === REGISTRATION_STATUS.PENDING) pending += 1;
      if (r.status === REGISTRATION_STATUS.APPEARED) appeared += 1;
      if (r.status === REGISTRATION_STATUS.ABSENT) absent += 1;
    });

    paid.forEach((r) => {
      const key = r.classApplying;
      byClass.set(key, (byClass.get(key) || 0) + 1);
    });

    return {
      total: rows.length,
      paid: paid.length,
      pending,
      appeared,
      absent,
      revenue,
      byClass: classOptions
        .map((c) => ({ ...c, count: byClass.get(c.value) || 0 }))
        .filter((c) => c.count > 0)
    };
  }, [rows, paid]);

  const withEmail = paid.filter((r) => r.email).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Paid registrations" value={stats.paid} tone="good" />
        <Stat
          label="Fees collected"
          value={`₹${stats.revenue.toLocaleString('en-IN')}`}
          sub={`at ₹${scholarship.registrationFee} per child`}
          tone="good"
        />
        <Stat
          label="Started but unpaid"
          value={stats.pending}
          sub="Holds lapse after 30 minutes and free the child's slot."
          tone={stats.pending > 0 ? 'warn' : 'plain'}
        />
        <Stat
          label="Appeared / absent"
          value={`${stats.appeared} / ${stats.absent}`}
          sub="Marked on test day."
        />
      </div>

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-garamond text-lg font-semibold text-midnight">
            Paid registrations by class
          </h3>
          <Button variant="subtle" onClick={() => onGoTo('registrations')}>
            Open the list
          </Button>
        </div>

        {stats.byClass.length === 0 ? (
          <p className="mt-5 text-sm text-midnight/55">No paid registrations yet.</p>
        ) : (
          <ul className="mt-5 space-y-2.5">
            {stats.byClass.map((c) => {
              const max = Math.max(...stats.byClass.map((x) => x.count));
              return (
                <li key={c.value} className="flex items-center gap-3">
                  <span className="w-24 flex-shrink-0 text-xs font-semibold text-midnight/70">
                    {c.label}
                  </span>
                  <span className="h-5 flex-1 bg-midnight/[0.05]">
                    <span
                      className="block h-full bg-eden-600"
                      style={{ width: `${Math.max(6, (c.count / max) * 100)}%` }}
                    />
                  </span>
                  <span className="w-8 flex-shrink-0 text-right text-xs font-semibold tabular-nums text-midnight">
                    {c.count}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {stats.paid > 0 && withEmail < stats.paid && (
        <p className="border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {stats.paid - withEmail} of {stats.paid} paid registrations have no email address, so
          their receipt and admit card can only go out on WhatsApp.
        </p>
      )}
    </div>
  );
}

// --------------------------------------------------------------- Localities

/**
 * Which neighbourhoods actually responded. This is the whole point of asking
 * for a locality: it tells the Foundation where the next round of advertising
 * should go, and where it would be wasted.
 */
function Localities({ rows }) {
  const data = useMemo(() => {
    const byLocality = new Map();
    const bySource = new Map();
    rows.forEach((r) => {
      const l = r.locality === 'Other' ? r.localityOther || 'Other' : r.locality || 'Not given';
      byLocality.set(l, (byLocality.get(l) || 0) + 1);
      const s = hearAboutLabel(r.hearAbout) || 'Not given';
      bySource.set(s, (bySource.get(s) || 0) + 1);
    });
    const sort = (m) =>
      Array.from(m.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    return { localities: sort(byLocality), sources: sort(bySource), total: rows.length };
  }, [rows]);

  const Bar = ({ items, empty }) =>
    items.length === 0 ? (
      <p className="mt-5 text-sm text-midnight/55">{empty}</p>
    ) : (
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li key={item.name} className="flex items-center gap-3">
            <span className="w-32 flex-shrink-0 truncate text-xs font-semibold text-midnight/70">
              {item.name}
            </span>
            <span className="h-5 flex-1 bg-midnight/[0.05]">
              <span
                className="block h-full bg-eden-600"
                style={{ width: `${Math.max(6, (item.count / items[0].count) * 100)}%` }}
              />
            </span>
            <span className="w-16 flex-shrink-0 text-right text-xs tabular-nums text-midnight">
              <span className="font-semibold">{item.count}</span>
              <span className="ml-1 text-midnight/40">
                {data.total ? `${Math.round((item.count / data.total) * 100)}%` : ''}
              </span>
            </span>
          </li>
        ))}
      </ul>
    );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-5">
        <h3 className="font-garamond text-lg font-semibold text-midnight">
          Area in Hazaribagh
        </h3>
        <p className="mt-1 text-xs text-midnight/50">
          Paid registrations only. Advertise where the bars are long.
        </p>
        <Bar items={data.localities} empty="No paid registrations yet." />
      </Card>

      <Card className="p-5">
        <h3 className="font-garamond text-lg font-semibold text-midnight">
          How they heard about it
        </h3>
        <p className="mt-1 text-xs text-midnight/50">What the parent told us at registration.</p>
        <Bar items={data.sources} empty="No paid registrations yet." />
      </Card>
    </div>
  );
}

// ------------------------------------------------------------------- Table

function RegistrationsTable({ rows, onOpen, onRefresh }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(ALL);
  const [payment, setPayment] = useState(ALL);
  const [klass, setKlass] = useState(ALL);
  const [locality, setLocality] = useState(ALL);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (status !== ALL && r.status !== status) return false;
      if (payment !== ALL && r.paymentStatus !== payment) return false;
      if (klass !== ALL && r.classApplying !== klass) return false;
      if (locality !== ALL && r.locality !== locality) return false;
      if (!needle) return true;
      return [r.childName, r.parentName, r.whatsapp, r.email, r.registrationNumber]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(needle));
    });
  }, [rows, search, status, payment, klass, locality]);

  const download = () => {
    const blob = new Blob([toCsv(filtered)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edenwoods-scholarship-2027-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-garamond text-lg font-semibold text-midnight">Registrations</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={download} disabled={filtered.length === 0}>
              Download CSV
            </Button>
            <Button variant="ghost" onClick={onRefresh}>
              Refresh
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by child, parent, WhatsApp, email or registration number"
          />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value={ALL}>Any status</option>
            {Object.entries(registrationStatusLabels).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </Select>
          <Select value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value={ALL}>Any payment</option>
            {Object.entries(paymentStatusLabels).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </Select>
          <Select value={klass} onChange={(e) => setKlass(e.target.value)}>
            <option value={ALL}>Any class</option>
            {classOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
          <Select value={locality} onChange={(e) => setLocality(e.target.value)}>
            <option value={ALL}>Any area</option>
            {localityOptions.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </div>

        <p className="mt-3 text-xs text-midnight/45">
          Showing {filtered.length} of {rows.length}.
        </p>
      </Card>

      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <p className="px-5 py-14 text-center text-sm text-midnight/55">
            No registrations match.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <thead>
                <tr className="border-b border-midnight/10 text-[10px] uppercase tracking-[0.14em] text-midnight/45">
                  {[
                    'Registration',
                    'Child',
                    'Class',
                    'Parent',
                    'WhatsApp',
                    'Area',
                    'Payment',
                    'Status',
                    ''
                  ].map((h, i) => (
                    <th key={`${h}-${i}`} className="whitespace-nowrap px-4 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-midnight/[0.07]">
                {filtered.map((r) => (
                  <tr key={r.registrationNumber} className="transition hover:bg-midnight/[0.02]">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-eden-700">
                      {r.registrationNumber}
                    </td>
                    <td className="px-4 py-3">
                      <span className="block font-semibold text-midnight">{r.childName}</span>
                      <span className="block text-xs text-midnight/50">{r.dob}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-midnight/75">
                      {classLabel(r.classApplying)}
                    </td>
                    <td className="px-4 py-3 text-midnight/75">{r.parentName}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-midnight/75">{r.whatsapp}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-midnight/60">
                      {r.locality === 'Other' ? r.localityOther || 'Other' : r.locality}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Badge tone={PAYMENT_TONE[r.paymentStatus] || 'neutral'}>
                        {paymentStatusLabels[r.paymentStatus] || r.paymentStatus}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Badge tone={STATUS_TONE[r.status] || 'neutral'}>
                        {registrationStatusLabels[r.status] || r.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <Button variant="subtle" onClick={() => onOpen(r)}>
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

// ------------------------------------------------------------------ Drawer

function Row({ label, children }) {
  if (!children) return null;
  return (
    <div className="grid gap-1 border-b border-midnight/[0.07] py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-midnight/45">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-midnight">{children}</dd>
    </div>
  );
}

function RegistrationDrawer({ record, request, onClose, onUpdated }) {
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState('');
  const [notes, setNotes] = useState(record.internalNotes || '');
  const [reportingTime, setReportingTime] = useState(record.reportingTime || '');
  const [paymentStatus, setPaymentStatus] = useState(record.paymentStatus);

  useEffect(() => {
    setNotes(record.internalNotes || '');
    setReportingTime(record.reportingTime || '');
    setPaymentStatus(record.paymentStatus);
  }, [record]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
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
          `/api/admin/scholarship/registrations/${encodeURIComponent(record.registrationNumber)}`,
          { method: 'PATCH', body: JSON.stringify({ action, ...body }) }
        );
        if (data.registration) onUpdated(data.registration);
        setMessage(data.message || 'Done.');
        setConfirming('');
      } catch (err) {
        setError(err.message || 'That action could not be completed.');
      } finally {
        setBusy('');
      }
    },
    [record.registrationNumber, onUpdated, request]
  );

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
        aria-label={`Registration ${record.registrationNumber}`}
        className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-midnight/15 bg-[#faf8f3]"
      >
        <header className="sticky top-0 z-10 border-b border-midnight/10 bg-white/90 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-mono text-xs font-semibold text-eden-700">
                {record.registrationNumber}
              </p>
              <h3 className="mt-1 truncate font-garamond text-xl font-semibold text-midnight">
                {record.childName}
              </h3>
              <p className="mt-1 text-xs text-midnight/55">
                {classLabel(record.classApplying)} · {record.parentName}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-midnight/15 text-midnight/60 transition hover:border-eden-600 hover:text-eden-700"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone={STATUS_TONE[record.status] || 'neutral'}>
              {registrationStatusLabels[record.status]}
            </Badge>
            <Badge tone={PAYMENT_TONE[record.paymentStatus] || 'neutral'}>
              {paymentStatusLabels[record.paymentStatus]} · ₹{record.amount}
            </Badge>
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

          <section>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-eden-700">
              Child
            </h4>
            <dl className="mt-2 border-t border-midnight/[0.07]">
              <Row label="Name">{record.childName}</Row>
              <Row label="Date of birth">{record.dob}</Row>
              <Row label="Gender">{genderLabel(record.gender)}</Row>
              <Row label="Class 2027–28">{classLabel(record.classApplying)}</Row>
              <Row label="Current school">{record.currentSchool || '—'}</Row>
            </dl>
          </section>

          <section className="mt-7">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-eden-700">
              Parent
            </h4>
            <dl className="mt-2 border-t border-midnight/[0.07]">
              <Row label="Name">{record.parentName}</Row>
              <Row label="Relationship">{relationshipLabel(record.relationship)}</Row>
              <Row label="WhatsApp">
                <a
                  href={`https://wa.me/91${record.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-eden-700 underline underline-offset-2"
                >
                  {record.whatsapp}
                </a>
              </Row>
              <Row label="Alternate">{record.altPhone || '—'}</Row>
              <Row label="Email">
                {record.email ? (
                  <a href={`mailto:${record.email}`} className="break-all text-eden-700">
                    {record.email}
                  </a>
                ) : (
                  <span className="text-midnight/45">Not given — WhatsApp only</span>
                )}
              </Row>
              <Row label="Area">
                {record.locality === 'Other' ? record.localityOther || 'Other' : record.locality}
              </Row>
              <Row label="Heard via">{hearAboutLabel(record.hearAbout)}</Row>
            </dl>
          </section>

          <section className="mt-7">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-eden-700">
              Payment
            </h4>
            <dl className="mt-2 border-t border-midnight/[0.07]">
              <Row label="Amount">₹{record.amount}</Row>
              <Row label="Status">{paymentStatusLabels[record.paymentStatus]}</Row>
              <Row label="Transaction">{record.paymentReference || '—'}</Row>
              <Row label="Order">{record.paymentOrderId || '—'}</Row>
              <Row label="Registered on">
                {record.paidAt ? new Date(record.paidAt).toLocaleString('en-IN') : '—'}
              </Row>
            </dl>
          </section>

          {(record.source || record.campaign) && (
            <section className="mt-7">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-eden-700">
                Campaign
              </h4>
              <dl className="mt-2 border-t border-midnight/[0.07]">
                <Row label="Source">{record.source || '—'}</Row>
                <Row label="Campaign">{record.campaign || '—'}</Row>
                <Row label="Creative">{record.adCreative || '—'}</Row>
              </dl>
            </section>
          )}

          <section className="mt-8 border border-midnight/10 bg-white p-5">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-eden-700">
              Internal notes
            </h4>
            <p className="mt-1.5 text-xs text-midnight/50">
              Staff only. Never shown to the parent and never included in any email.
            </p>
            <TextArea
              rows={4}
              value={notes}
              maxLength={LIMITS.internalNotes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-3"
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

          <section className="mt-6 border border-midnight/10 bg-white p-5">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-eden-700">
              Actions
            </h4>

            <div className="mt-4 grid gap-3">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-midnight/50">
                  Reporting time on the admit card
                </span>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={reportingTime}
                    onChange={(e) => setReportingTime(e.target.value)}
                    placeholder="e.g. 9:30 AM, Hall B"
                  />
                  <Button
                    variant="ghost"
                    disabled={busy === 'reporting-time'}
                    onClick={() => act('reporting-time', { reportingTime })}
                  >
                    {busy === 'reporting-time' ? 'Saving…' : 'Save'}
                  </Button>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-midnight/50">
                  Payment status
                </span>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <Select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                    {Object.values(PAYMENT_STATUS).map((v) => (
                      <option key={v} value={v}>
                        {paymentStatusLabels[v]}
                      </option>
                    ))}
                  </Select>
                  <Button
                    variant="ghost"
                    disabled={busy === 'payment' || paymentStatus === record.paymentStatus}
                    onClick={() => act('payment', { paymentStatus })}
                  >
                    {busy === 'payment' ? 'Saving…' : 'Update'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-midnight/10 pt-5">
              <Button
                variant="ghost"
                disabled={busy === 'mark-appeared'}
                onClick={() => act('mark-appeared')}
              >
                Mark appeared
              </Button>
              <Button variant="ghost" onClick={() => setConfirming('mark-absent')}>
                Mark absent
              </Button>
              <Button
                variant="ghost"
                disabled={busy === 'resend-admit-card' || !record.email}
                onClick={() => act('resend-admit-card')}
              >
                {busy === 'resend-admit-card' ? 'Sending…' : 'Email admit card'}
              </Button>
              <Button
                variant="ghost"
                disabled={busy === 'resend-receipt' || !record.email}
                onClick={() => act('resend-receipt')}
              >
                {busy === 'resend-receipt' ? 'Sending…' : 'Resend receipt'}
              </Button>
              <Button variant="danger" onClick={() => setConfirming('cancel')}>
                Cancel registration
              </Button>
            </div>

            {!record.email && (
              <p className="mt-3 text-xs text-midnight/50">
                No email on this registration, so the admit card has to go out on WhatsApp.
              </p>
            )}

            {confirming === 'mark-absent' && (
              <div className="mt-5 border border-amber-300 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-800">Mark this child absent?</p>
                <div className="mt-3 flex gap-2">
                  <Button disabled={busy === 'mark-absent'} onClick={() => act('mark-absent')}>
                    {busy === 'mark-absent' ? 'Saving…' : 'Yes, absent'}
                  </Button>
                  <Button variant="subtle" onClick={() => setConfirming('')}>
                    Keep as is
                  </Button>
                </div>
              </div>
            )}

            {confirming === 'cancel' && (
              <div className="mt-5 border border-cardinal/30 bg-cardinal/5 p-4">
                <p className="text-sm font-semibold text-cardinal">Cancel this registration?</p>
                <p className="mt-1 text-xs text-cardinal/80">
                  The ₹{record.amount} is non-refundable under the terms. Cancelling does not
                  refund it — handle any refund separately in Razorpay.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="danger" disabled={busy === 'cancel'} onClick={() => act('cancel')}>
                    {busy === 'cancel' ? 'Cancelling…' : 'Yes, cancel it'}
                  </Button>
                  <Button variant="subtle" onClick={() => setConfirming('')}>
                    Keep it
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}
