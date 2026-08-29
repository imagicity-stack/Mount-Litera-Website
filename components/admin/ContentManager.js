import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { firebaseStorage } from '@/lib/firebaseClient';
import {
  contentCollections,
  contentCollectionMap,
  emptyRecord,
  seedFor,
  keysFor,
  CONTENT_STORAGE_PREFIX
} from '@/lib/contentCollections';
import { Button, Field, Input, TextArea } from '@/components/admin/ui';

const MAX_IMAGE = 8 * 1024 * 1024;
const MAX_FILE = 20 * 1024 * 1024;

const safeName = (name) =>
  name.toLowerCase().replace(/[^a-z0-9.\-_]+/g, '-').replace(/-+/g, '-').slice(-80);

/** A repeatable list of single lines — award criteria, job requirements. */
function ListField({ label, itemLabel, value, onChange }) {
  const rows = value?.length ? value : [''];

  const set = (i, v) => onChange(rows.map((r, idx) => (idx === i ? v : r)));
  const add = () => onChange([...rows, '']);
  const removeAt = (i) => onChange(rows.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-midnight/50">
        {label}
      </span>
      {rows.map((row, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="flex gap-2">
          <Input
            value={row}
            onChange={(e) => set(i, e.target.value)}
            placeholder={`${itemLabel || 'Item'} ${i + 1}`}
          />
          <button
            type="button"
            onClick={() => removeAt(i)}
            aria-label={`Remove ${itemLabel || 'item'} ${i + 1}`}
            className="w-10 flex-shrink-0 border border-midnight/15 text-midnight/45 transition hover:border-cardinal/50 hover:text-cardinal"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-midnight/50 hover:text-cardinal"
      >
        + Add another
      </button>
    </div>
  );
}

/** Upload control for an image or a document. */
function UploadField({ field, draft, setDraft, collectionKey, onError }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const isImage = field.type === 'image';
  const current = draft[field.name];

  const handle = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    onError('');

    if (isImage && !file.type.startsWith('image/')) {
      onError('That file is not an image.');
      return;
    }
    if (!isImage && file.type !== 'application/pdf') {
      onError('Please upload a PDF.');
      return;
    }
    if (file.size > (isImage ? MAX_IMAGE : MAX_FILE)) {
      onError(`Files must be under ${isImage ? '8 MB' : '20 MB'}.`);
      return;
    }
    if (!firebaseStorage) {
      onError('Firebase Storage is not configured for this deployment.');
      return;
    }

    setBusy(true);
    try {
      const path = `${CONTENT_STORAGE_PREFIX}/${collectionKey}/${Date.now()}-${safeName(file.name)}`;
      const snapshot = await uploadBytes(ref(firebaseStorage, path), file, {
        contentType: file.type
      });
      const url = await getDownloadURL(snapshot.ref);
      setDraft((d) => ({
        ...d,
        [field.name]: url,
        filePaths: { ...(d.filePaths || {}), [field.name]: path }
      }));
    } catch (err) {
      onError('Upload failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-midnight/50">
        {field.label}
        {field.required && <span className="text-cardinal">*</span>}
      </span>

      {isImage && current && (
        <div
          className="w-full max-w-xs overflow-hidden border border-midnight/12 bg-[#faf8f3]"
          style={{ aspectRatio: (field.ratio || '3/2').replace('/', ' / ') }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current} alt="" className="h-full w-full object-cover" />
        </div>
      )}

      {!isImage && current && (
        <a
          href={current}
          target="_blank"
          rel="noreferrer"
          className="block truncate text-xs font-semibold text-cardinal underline"
        >
          {current.startsWith('http') ? 'View current document' : current}
        </a>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={isImage ? 'image/*' : 'application/pdf'}
        className="hidden"
        onChange={handle}
      />
      <Button
        type="button"
        variant="ghost"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="!py-2 !text-xs"
      >
        {busy ? 'Uploading…' : current ? `Replace ${isImage ? 'image' : 'document'}` : `Upload ${isImage ? 'image' : 'document'}`}
      </Button>
      {field.hint && <p className="text-[11px] leading-snug text-midnight/45">{field.hint}</p>}
    </div>
  );
}

/**
 * One screen for every editable list on the site. The form, the validation and
 * the row summaries are all generated from the collection's schema in
 * lib/contentCollections.js, so a new managed list needs no new UI.
 */
export default function ContentManager({ getToken }) {
  const [key, setKey] = useState(contentCollections[0].key);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const collection = contentCollectionMap[key];
  const seeded = useMemo(() => seedFor(key), [key]);
  const usingSeed = items.length === 0;

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

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api(`/api/content/${key}?all=1`);
      setItems(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api, key]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    setSaving(true);
    setError('');
    setStatus('');
    try {
      if (collection.keyed) {
        await api(`/api/content/${key}`, { method: 'POST', body: JSON.stringify(draft) });
      } else if (draft.id) {
        await api(`/api/content/${key}/${draft.id}`, { method: 'PUT', body: JSON.stringify(draft) });
      } else {
        await api(`/api/content/${key}`, {
          method: 'POST',
          body: JSON.stringify({ ...draft, order: items.length })
        });
      }
      setStatus('Saved.');
      setDraft(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    const label = item[collection.titleField] || `this ${collection.itemNoun}`;
    if (!window.confirm(`Remove ${label}?`)) return;
    try {
      await api(`/api/content/${key}/${item.id}`, { method: 'DELETE' });
      setStatus('Removed.');
      if (draft?.id === item.id) setDraft(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const move = async (item, delta) => {
    const list = [...items];
    const i = list.findIndex((x) => x.id === item.id);
    const j = i + delta;
    if (i < 0 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    setItems(list.map((x, idx) => ({ ...x, order: idx })));
    try {
      await Promise.all(
        list.map((x, idx) =>
          x.order === idx
            ? null
            : api(`/api/content/${key}/${x.id}`, {
                method: 'PUT',
                body: JSON.stringify({ order: idx })
              })
        )
      );
    } catch (err) {
      setError(err.message);
      await load();
    }
  };

  const importSeed = async () => {
    if (
      !window.confirm(
        `Copy the ${seeded.length} built-in ${collection.itemNoun}s into the backend so you can edit them?`
      )
    )
      return;
    setSaving(true);
    setError('');
    try {
      for (let i = 0; i < seeded.length; i += 1) {
        const row = { ...seeded[i], order: i };
        delete row.id;
        delete row.seeded;
        // Sequential: each POST is its own write and order must match.
        // eslint-disable-next-line no-await-in-loop
        await api(`/api/content/${key}`, { method: 'POST', body: JSON.stringify(row) });
      }
      setStatus('Built-in list imported. You can now edit every entry.');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="border border-midnight/12 bg-white p-6">
        <h2 className="font-garamond text-2xl font-semibold text-midnight">Content</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-midnight/65">
          Lists the school keeps up to date itself. Changes go live immediately.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {contentCollections.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                setKey(c.key);
                setDraft(null);
                setStatus('');
                setError('');
              }}
              className={`border px-4 py-2 text-sm font-semibold transition ${
                c.key === key
                  ? 'border-cardinal bg-cardinal/10 text-cardinal'
                  : 'border-midnight/20 text-midnight/65 hover:border-midnight/45'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-midnight/60">{collection.blurb}</p>
      </header>

      <div className="flex flex-wrap items-center gap-4">
        {!collection.keyed && (
          <Button
            type="button"
            onClick={() => setDraft(emptyRecord(key))}
            className="!py-2 !text-xs"
          >
            Add {collection.itemNoun}
          </Button>
        )}
        {status && <span className="text-xs font-semibold text-midnight/60">{status}</span>}
        {error && <span className="text-xs font-semibold text-cardinal">{error}</span>}
      </div>

      {usingSeed && !loading && !collection.keyed && seeded.length > 0 && (
        <div className="border-l-[3px] border-midnight bg-white p-5 text-sm text-midnight/75">
          <p className="font-semibold text-midnight">
            {collection.label} is still showing the list the site shipped with.
          </p>
          <p className="mt-2">
            The page currently shows {seeded.length} {collection.itemNoun}
            {seeded.length === 1 ? '' : 's'} from the built-in list. Adding one entry here replaces
            that whole list — so import it first and edit from there.
          </p>
          <Button
            type="button"
            variant="ghost"
            className="mt-4 !py-2 !text-xs"
            disabled={saving}
            onClick={importSeed}
          >
            {saving ? 'Importing…' : 'Import the built-in list'}
          </Button>
        </div>
      )}

      {draft && (
        <div className="border border-midnight/12 bg-white p-6">
          <h3 className="font-garamond text-xl font-semibold text-midnight">
            {collection.keyed
              ? keysFor(key).find((k) => k.key === draft.key)?.label || 'Edit'
              : draft.id
                ? 'Edit'
                : `New ${collection.itemNoun}`}
          </h3>

          <div className="mt-5 space-y-4">
            {collection.fields.map((field) => {
              if (field.type === 'image' || field.type === 'file') {
                return (
                  <UploadField
                    key={field.name}
                    field={field}
                    draft={draft}
                    setDraft={setDraft}
                    collectionKey={key}
                    onError={setError}
                  />
                );
              }
              if (field.type === 'list') {
                return (
                  <ListField
                    key={field.name}
                    label={field.label}
                    itemLabel={field.itemLabel}
                    value={draft[field.name]}
                    onChange={(v) => setDraft({ ...draft, [field.name]: v })}
                  />
                );
              }
              const Control = field.type === 'textarea' ? TextArea : Input;
              return (
                <Field key={field.name} label={field.label} hint={field.hint} required={field.required}>
                  <Control
                    value={draft[field.name] || ''}
                    onChange={(e) => setDraft({ ...draft, [field.name]: e.target.value })}
                  />
                </Field>
              );
            })}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button type="button" onClick={save} disabled={saving} className="!py-2 !text-xs">
                {saving ? 'Saving…' : draft.id || collection.keyed ? 'Save changes' : `Add ${collection.itemNoun}`}
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
      )}

      {loading && <p className="text-sm text-midnight/50">Loading…</p>}

      {!loading && collection.keyed && (
        <div className="divide-y divide-midnight/10 border border-midnight/12 bg-white">
          {keysFor(key).map((entry) => {
            const record = items.find((i) => i.key === entry.key);
            const filled = collection.fields
              .filter((f) => f.type === 'text')
              .map((f) => record?.[f.name])
              .filter(Boolean);
            return (
              <div key={entry.key} className="flex flex-wrap items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-midnight">{entry.label}</p>
                  <p className="mt-1 truncate text-xs text-midnight/55">
                    {filled.length ? filled.join(' · ') : 'Using the names the site ships with'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDraft(record ? { ...record } : { ...emptyRecord(key), key: entry.key })
                  }
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-midnight/60 hover:text-cardinal"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !collection.keyed && items.length > 0 && (
        <div className="divide-y divide-midnight/10 border border-midnight/12 bg-white">
          {items.map((item, index) => {
            const imageField = collection.fields.find((f) => f.type === 'image');
            return (
              <div key={item.id} className="flex flex-wrap items-center gap-4 p-4">
                {imageField && item[imageField.name] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item[imageField.name]} alt="" className="h-12 w-16 object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-midnight">
                    {item[collection.titleField] || `Untitled ${collection.itemNoun}`}
                    {item.status === 'hidden' && (
                      <span className="ml-2 border border-midnight/25 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-midnight/50">
                        Hidden
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Move up"
                    onClick={() => move(item, -1)}
                    disabled={index === 0}
                    className="h-8 w-8 border border-midnight/15 text-xs text-midnight/60 disabled:opacity-30 hover:border-midnight/45"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    onClick={() => move(item, 1)}
                    disabled={index === items.length - 1}
                    className="h-8 w-8 border border-midnight/15 text-xs text-midnight/60 disabled:opacity-30 hover:border-midnight/45"
                  >
                    ↓
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      api(`/api/content/${key}/${item.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                          status: item.status === 'hidden' ? 'published' : 'hidden'
                        })
                      })
                        .then(load)
                        .catch((err) => setError(err.message))
                    }
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-midnight/45 hover:text-midnight"
                  >
                    {item.status === 'hidden' ? 'Show' : 'Hide'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDraft({ ...item })}
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-midnight/60 hover:text-cardinal"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(item)}
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-cardinal/70 hover:text-cardinal"
                  >
                    Remove
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
