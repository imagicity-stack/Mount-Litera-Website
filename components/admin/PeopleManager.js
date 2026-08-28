import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { firebaseStorage } from '@/lib/firebaseClient';
import {
  peopleGroups,
  peopleGroupMap,
  seedFor,
  initialsOf,
  PEOPLE_STORAGE_PREFIX
} from '@/lib/peopleGroups';
import { Button, Field, Input, Select, TextArea } from '@/components/admin/ui';

const MAX_BYTES = 5 * 1024 * 1024;

const safeName = (name) =>
  name.toLowerCase().replace(/[^a-z0-9.\-_]+/g, '-').replace(/-+/g, '-').slice(-70);

const blank = (groupKey) => ({
  id: null,
  group: groupKey,
  name: '',
  designation: '',
  department: '',
  photo: '',
  photoPath: '',
  bio: '',
  order: 0,
  status: 'published'
});

function Avatar({ person, size = 'h-12 w-12' }) {
  if (person.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={person.photo} alt="" className={`${size} object-cover object-top`} />;
  }
  return (
    <span
      className={`${size} flex items-center justify-center bg-midnight/[0.06] text-xs font-semibold text-midnight/60`}
    >
      {initialsOf(person.name) || '—'}
    </span>
  );
}

/**
 * Add, edit, reorder, and remove the people listed on the public site:
 * the Elden Council, Core Mentors, and the Managing Committee.
 */
export default function PeopleManager({ getToken }) {
  const [groupKey, setGroupKey] = useState(peopleGroups[0].key);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const group = peopleGroupMap[groupKey];

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = await getToken();
      const res = await fetch('/api/people?all=1', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Could not load the directory.');
      setRecords(data.people || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    load();
  }, [load]);

  const inGroup = useMemo(
    () => records.filter((p) => p.group === groupKey),
    [records, groupKey]
  );

  const usingSeed = inGroup.length === 0;
  const seeded = useMemo(() => seedFor(groupKey), [groupKey]);

  const api = useCallback(
    async (path, options) => {
      const token = await getToken();
      const res = await fetch(path, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...(options?.headers || {})
        }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Request failed.');
      return data;
    },
    [getToken]
  );

  const save = async () => {
    if (!draft?.name?.trim()) {
      setError('A name is required.');
      return;
    }
    setSaving(true);
    setError('');
    setStatus('');
    try {
      if (draft.id) {
        await api(`/api/people/${draft.id}`, { method: 'PUT', body: JSON.stringify(draft) });
      } else {
        await api('/api/people', {
          method: 'POST',
          body: JSON.stringify({ ...draft, order: draft.order || inGroup.length })
        });
      }
      setStatus(draft.id ? 'Saved.' : `${draft.name} added.`);
      setDraft(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (person) => {
    if (!window.confirm(`Remove ${person.name} from ${group.label}?`)) return;
    setError('');
    setStatus('');
    try {
      await api(`/api/people/${person.id}`, { method: 'DELETE' });
      setStatus(`${person.name} removed.`);
      if (draft?.id === person.id) setDraft(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const move = async (person, delta) => {
    const list = [...inGroup];
    const i = list.findIndex((p) => p.id === person.id);
    const j = i + delta;
    if (i < 0 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];

    // Renumber the whole group so order stays dense and predictable.
    setRecords((prev) =>
      prev.map((p) => {
        const idx = list.findIndex((q) => q.id === p.id);
        return idx === -1 ? p : { ...p, order: idx };
      })
    );

    try {
      await Promise.all(
        list.map((p, idx) =>
          p.order === idx
            ? null
            : api(`/api/people/${p.id}`, { method: 'PUT', body: JSON.stringify({ order: idx }) })
        )
      );
    } catch (err) {
      setError(err.message);
      await load();
    }
  };

  const toggleStatus = async (person) => {
    const next = person.status === 'hidden' ? 'published' : 'hidden';
    try {
      await api(`/api/people/${person.id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: next })
      });
      setRecords((prev) => prev.map((p) => (p.id === person.id ? { ...p, status: next } : p)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhoto = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !draft) return;

    setError('');
    if (!file.type.startsWith('image/')) {
      setError('That file is not an image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('Portraits must be under 5 MB.');
      return;
    }
    if (!firebaseStorage) {
      setError('Firebase Storage is not configured for this deployment.');
      return;
    }

    setUploading(true);
    try {
      const path = `${PEOPLE_STORAGE_PREFIX}/${groupKey}/${Date.now()}-${safeName(file.name)}`;
      const snapshot = await uploadBytes(ref(firebaseStorage, path), file, {
        contentType: file.type
      });
      const url = await getDownloadURL(snapshot.ref);
      setDraft((d) => ({ ...d, photo: url, photoPath: path }));
    } catch (err) {
      setError('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="border border-midnight/12 bg-white p-6">
        <h2 className="font-garamond text-2xl font-semibold text-midnight">People</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-midnight/65">
          Everyone listed publicly on the site. Add a person here and they appear on their page
          immediately — no deploy needed. Portraits are stored in the school&rsquo;s Firebase
          bucket.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {peopleGroups.map((g) => {
            const count = records.filter((p) => p.group === g.key).length;
            const active = g.key === groupKey;
            return (
              <button
                key={g.key}
                type="button"
                onClick={() => {
                  setGroupKey(g.key);
                  setDraft(null);
                  setStatus('');
                  setError('');
                }}
                className={`border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'border-cardinal bg-cardinal/10 text-cardinal'
                    : 'border-midnight/20 text-midnight/65 hover:border-midnight/45'
                }`}
              >
                {g.label}
                <span className="ml-2 text-xs opacity-70">{count || seedFor(g.key).length}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="button" onClick={() => setDraft(blank(groupKey))} className="!py-2 !text-xs">
          Add to {group.label}
        </Button>
        {status && <span className="text-xs font-semibold text-midnight/60">{status}</span>}
        {error && <span className="text-xs font-semibold text-cardinal">{error}</span>}
      </div>

      {usingSeed && !loading && (
        <div className="border-l-[3px] border-midnight bg-white p-5 text-sm text-midnight/75">
          <p className="font-semibold text-midnight">
            {group.label} is still showing the list the site shipped with.
          </p>
          <p className="mt-2">
            The page currently lists {seeded.length}{' '}
            {seeded.length === 1 ? 'person' : 'people'} from the built-in roster. As soon as you
            add someone here, the directory takes over and the built-in list is no longer used —
            so add everyone who should appear, not just the new person.
          </p>
          {seeded.length > 0 && (
            <>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-midnight/45">
                Currently shown
              </p>
              <p className="mt-1 text-xs text-midnight/60">
                {seeded.map((p) => p.name).join(' · ')}
              </p>
              <Button
                type="button"
                variant="ghost"
                className="mt-4 !py-2 !text-xs"
                disabled={saving}
                onClick={async () => {
                  if (
                    !window.confirm(
                      `Copy all ${seeded.length} people from the built-in list into the directory so you can edit them?`
                    )
                  )
                    return;
                  setSaving(true);
                  setError('');
                  try {
                    for (let i = 0; i < seeded.length; i += 1) {
                      const p = seeded[i];
                      // Sequential: each POST is a separate write and the order
                      // field must match the order they are listed in.
                      // eslint-disable-next-line no-await-in-loop
                      await api('/api/people', {
                        method: 'POST',
                        body: JSON.stringify({
                          group: groupKey,
                          name: p.name,
                          designation: p.designation,
                          department: p.department,
                          photo: p.photo,
                          order: i,
                          status: 'published'
                        })
                      });
                    }
                    setStatus('Built-in list imported. You can now edit everyone.');
                    await load();
                  } catch (err) {
                    setError(err.message);
                  } finally {
                    setSaving(false);
                  }
                }}
              >
                Import the built-in list
              </Button>
            </>
          )}
        </div>
      )}

      {/* Editor ------------------------------------------------------------ */}
      {draft && (
        <div className="border border-midnight/12 bg-white p-6">
          <h3 className="font-garamond text-xl font-semibold text-midnight">
            {draft.id ? `Edit ${draft.name || 'person'}` : `Add to ${group.label}`}
          </h3>

          <div className="mt-5 grid gap-5 md:grid-cols-[160px_minmax(0,1fr)]">
            <div>
              <div className="aspect-[3/4] w-full overflow-hidden border border-midnight/12 bg-[#faf8f3]">
                <Avatar person={draft} size="h-full w-full" />
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhoto}
              />
              <Button
                type="button"
                variant="ghost"
                className="mt-3 w-full !py-2 !text-xs"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
              >
                {uploading ? 'Uploading…' : draft.photo ? 'Replace photo' : 'Upload photo'}
              </Button>
              {draft.photo && (
                <button
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, photo: '', photoPath: '' }))}
                  className="mt-2 w-full text-[11px] font-semibold uppercase tracking-[0.12em] text-midnight/45 hover:text-cardinal"
                >
                  Remove photo
                </button>
              )}
              <p className="mt-2 text-[11px] leading-snug text-midnight/45">
                Portrait orientation, roughly 900 × 1200. Optional — initials are shown without
                one.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" required>
                  <Input
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    placeholder="Full name"
                  />
                </Field>
                <Field label={group.roleLabel}>
                  <Input
                    value={draft.designation}
                    onChange={(e) => setDraft({ ...draft, designation: e.target.value })}
                    placeholder={group.rolePlaceholder}
                  />
                </Field>
              </div>

              {group.hasDepartments && (
                <Field label="Department" hint="Pick an existing one or type a new name.">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Select
                      value={group.departments.includes(draft.department) ? draft.department : ''}
                      onChange={(e) => setDraft({ ...draft, department: e.target.value })}
                    >
                      <option value="">— choose —</option>
                      {group.departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </Select>
                    <Input
                      value={draft.department}
                      onChange={(e) => setDraft({ ...draft, department: e.target.value })}
                      placeholder="Or a new department"
                    />
                  </div>
                </Field>
              )}

              <Field label="Short note" hint="Optional. Shown on pages that have room for it.">
                <TextArea
                  rows={3}
                  value={draft.bio}
                  onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                />
              </Field>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button type="button" onClick={save} disabled={saving} className="!py-2 !text-xs">
                  {saving ? 'Saving…' : draft.id ? 'Save changes' : 'Add person'}
                </Button>
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-midnight/45 hover:text-midnight"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Roster ------------------------------------------------------------ */}
      {loading && <p className="text-sm text-midnight/50">Loading the directory…</p>}

      {!loading && inGroup.length > 0 && (
        <div className="divide-y divide-midnight/10 border border-midnight/12 bg-white">
          {inGroup.map((person, index) => (
            <div key={person.id} className="flex flex-wrap items-center gap-4 p-4">
              <Avatar person={person} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-midnight">
                  {person.name}
                  {person.status === 'hidden' && (
                    <span className="ml-2 border border-midnight/25 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-midnight/50">
                      Hidden
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-midnight/55">
                  {[person.designation, person.department].filter(Boolean).join(' · ') || '—'}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label={`Move ${person.name} up`}
                  onClick={() => move(person, -1)}
                  disabled={index === 0}
                  className="h-8 w-8 border border-midnight/15 text-xs text-midnight/60 disabled:opacity-30 hover:border-midnight/45"
                >
                  ↑
                </button>
                <button
                  type="button"
                  aria-label={`Move ${person.name} down`}
                  onClick={() => move(person, 1)}
                  disabled={index === inGroup.length - 1}
                  className="h-8 w-8 border border-midnight/15 text-xs text-midnight/60 disabled:opacity-30 hover:border-midnight/45"
                >
                  ↓
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleStatus(person)}
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-midnight/45 hover:text-midnight"
                >
                  {person.status === 'hidden' ? 'Show' : 'Hide'}
                </button>
                <button
                  type="button"
                  onClick={() => setDraft({ ...person })}
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-midnight/60 hover:text-cardinal"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(person)}
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-cardinal/70 hover:text-cardinal"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
