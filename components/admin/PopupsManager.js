import { useCallback, useEffect, useMemo, useState } from 'react';
import { Badge, Button, Input } from '@/components/admin/ui';
import { defaultPopup, POPUP_LAYOUTS } from '@/lib/popupConfig';
import PopupEditor from '@/components/admin/PopupEditor';

const layoutLabel = (value) => POPUP_LAYOUTS.find((l) => l.value === value)?.label || value;

export default function PopupsManager({ user, getToken, onStats }) {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(defaultPopup());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch('/api/popups?all=1', {
        cache: 'no-store',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPopups(data.popups || []);
      onStats?.(data.popups || []);
    } catch (error) {
      setPopups([]);
    } finally {
      setLoading(false);
    }
  }, [getToken, onStats]);

  useEffect(() => {
    load();
  }, [load]);

  const setField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const startNew = () => {
    setForm(defaultPopup());
    setMessage('');
    setEditing(true);
  };

  const startEdit = (popup) => {
    setForm({ ...defaultPopup(), ...popup });
    setMessage('');
    setEditing(true);
  };

  const save = async () => {
    if (!form.title) {
      setMessage('Give your popup a title.');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const token = await getToken();
      const { id, impressions, clicks, createdAt, updatedAt, ...payload } = form;
      const res = await fetch(id ? `/api/popups/${id}` : '/api/popups', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Unable to save popup.');
      }
      await load();
      setEditing(false);
      setForm(defaultPopup());
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!id) return;
    if (!window.confirm('Delete this popup permanently?')) return;
    setSaving(true);
    try {
      const token = await getToken();
      await fetch(`/api/popups/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      await load();
      setEditing(false);
      setForm(defaultPopup());
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (popup) => {
    const next = popup.status === 'active' ? 'paused' : 'active';
    try {
      const token = await getToken();
      await fetch(`/api/popups/${popup.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: next })
      });
      await load();
    } catch (error) {
      /* ignore */
    }
  };

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return [...popups]
      .filter((p) => (term ? `${p.name} ${p.title}`.toLowerCase().includes(term) : true))
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }, [popups, query]);

  if (editing) {
    return (
      <PopupEditor
        form={form}
        setField={setField}
        onSave={save}
        onClose={() => {
          setEditing(false);
          setForm(defaultPopup());
        }}
        onDelete={() => remove(form.id)}
        saving={saving}
        message={message}
        user={user}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-garamond text-2xl font-semibold">Popups</h2>
          <p className="text-sm text-parchment/55">Design, target, and measure on-site campaigns.</p>
        </div>
        <Button variant="primary" onClick={startNew}>
          <span className="text-base leading-none">＋</span> New popup
        </Button>
      </div>

      <div className="w-full max-w-xs">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search popups…" />
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/10 px-5 py-10 text-center text-sm text-parchment/50">Loading popups…</div>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 px-5 py-12 text-center text-sm text-parchment/50">
          No popups yet. Create your first campaign.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((popup) => {
            const ctr = popup.impressions ? ((popup.clicks || 0) / popup.impressions) * 100 : 0;
            return (
              <div key={popup.id} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-parchment">{popup.name || 'Untitled'}</p>
                    <p className="truncate text-xs text-parchment/45">{popup.title}</p>
                  </div>
                  <Badge tone={popup.status === 'active' ? 'good' : popup.status === 'paused' ? 'ok' : 'neutral'}>
                    {popup.status}
                  </Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge tone="gold">{layoutLabel(popup.layout)}</Badge>
                  <Badge>{popup.trigger}</Badge>
                  <Badge>P{popup.priority || 1}</Badge>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white/[0.03] py-2">
                    <p className="text-sm font-semibold text-parchment">{popup.impressions || 0}</p>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-parchment/40">Views</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] py-2">
                    <p className="text-sm font-semibold text-parchment">{popup.clicks || 0}</p>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-parchment/40">Clicks</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] py-2">
                    <p className="text-sm font-semibold text-parchment">{ctr.toFixed(1)}%</p>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-parchment/40">CTR</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs">
                  <button type="button" onClick={() => startEdit(popup)} className="font-semibold text-gold-200 hover:text-gold-100">
                    Edit
                  </button>
                  <button type="button" onClick={() => toggleStatus(popup)} className="text-parchment/55 hover:text-parchment">
                    {popup.status === 'active' ? 'Pause' : 'Activate'}
                  </button>
                  <button type="button" onClick={() => remove(popup.id)} className="text-cardinal-300 hover:text-cardinal-200">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
