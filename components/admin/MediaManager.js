import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { firebaseStorage } from '@/lib/firebaseClient';
import { groupedMediaSlots, MEDIA_STORAGE_PREFIX } from '@/lib/mediaSlots';
import { Button, Field, Input } from '@/components/admin/ui';

const MAX_BYTES = 8 * 1024 * 1024;

const FOCAL_POINTS = [
  ['Top left', 0, 0],
  ['Top', 50, 0],
  ['Top right', 100, 0],
  ['Left', 0, 50],
  ['Centre', 50, 50],
  ['Right', 100, 50],
  ['Bottom left', 0, 100],
  ['Bottom', 50, 100],
  ['Bottom right', 100, 100]
];

const safeName = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(-80);

/**
 * A single managed image position: the picture that currently sits there, the
 * reference shipped with the site for comparison, and the controls to replace
 * it.
 */
function SlotCard({ slot, record, onSaved, onReset, getToken }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [alt, setAlt] = useState(record?.alt || slot.alt || '');
  const [focal, setFocal] = useState({
    x: record?.focalX ?? 50,
    y: record?.focalY ?? 50
  });

  useEffect(() => {
    setAlt(record?.alt || slot.alt || '');
    setFocal({ x: record?.focalX ?? 50, y: record?.focalY ?? 50 });
  }, [record, slot.alt]);

  const live = record?.url || slot.ref;
  const isOverridden = Boolean(record?.url);

  const persist = useCallback(
    async (payload) => {
      const token = await getToken();
      const res = await fetch(`/api/media/${encodeURIComponent(slot.key)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Could not save the image.');
      return data;
    },
    [getToken, slot.key]
  );

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setError('');
    setStatus('');

    if (!file.type.startsWith('image/')) {
      setError('That file is not an image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('Images must be under 8 MB. Please compress and try again.');
      return;
    }
    if (!firebaseStorage) {
      setError('Firebase Storage is not configured for this deployment.');
      return;
    }

    setUploading(true);
    try {
      const storagePath = `${MEDIA_STORAGE_PREFIX}/${slot.key}/${Date.now()}-${safeName(file.name)}`;
      const storageRef = ref(firebaseStorage, storagePath);
      const snapshot = await uploadBytes(storageRef, file, { contentType: file.type });
      const url = await getDownloadURL(snapshot.ref);

      await persist({ url, alt, focalX: focal.x, focalY: focal.y, storagePath });
      onSaved(slot.key, { url, alt, focalX: focal.x, focalY: focal.y, storagePath });
      setStatus('Image updated. It is live on the site.');
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const saveDetails = async () => {
    if (!isOverridden) {
      setError('Upload an image before saving its description.');
      return;
    }
    setError('');
    setStatus('');
    try {
      await persist({
        url: record.url,
        alt,
        focalX: focal.x,
        focalY: focal.y,
        storagePath: record.storagePath || ''
      });
      onSaved(slot.key, { ...record, alt, focalX: focal.x, focalY: focal.y });
      setStatus('Saved.');
    } catch (err) {
      setError(err.message || 'Could not save.');
    }
  };

  const reset = async () => {
    if (!isOverridden) return;
    if (!window.confirm(`Remove the uploaded image and show the reference picture again?`)) return;

    setError('');
    setStatus('');
    try {
      const token = await getToken();
      const res = await fetch(`/api/media/${encodeURIComponent(slot.key)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Could not reset.');
      }
      onReset(slot.key);
      setStatus('Reset to the reference image.');
    } catch (err) {
      setError(err.message || 'Could not reset.');
    }
  };

  return (
    <article className="border border-midnight/12 bg-white">
      <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:p-6">
        {/* Preview pair -------------------------------------------------- */}
        <div className="space-y-3">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-midnight/45">
              {isOverridden ? 'Live on the site' : 'Reference image (live)'}
            </p>
            <div
              className="mt-2 w-full overflow-hidden border border-midnight/12 bg-ivory"
              style={{ aspectRatio: slot.ratio.replace('/', ' / ') }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={live}
                alt=""
                className="h-full w-full object-cover"
                style={{ objectPosition: `${focal.x}% ${focal.y}%` }}
              />
            </div>
          </div>

          {isOverridden && (
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-midnight/45">
                Reference (what shipped here)
              </p>
              <div
                className="mt-2 w-full overflow-hidden border border-dashed border-midnight/20 bg-ivory opacity-70"
                style={{ aspectRatio: slot.ratio.replace('/', ' / ') }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slot.ref} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Controls ------------------------------------------------------ */}
        <div className="min-w-0 space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-garamond text-lg font-semibold text-midnight">{slot.label}</h3>
              {isOverridden ? (
                <span className="border border-crimson px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-crimson">
                  Custom
                </span>
              ) : (
                <span className="border border-midnight/25 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-midnight/50">
                  Default
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-midnight/65">{slot.note}</p>
            <p className="mt-2 text-xs text-midnight/45">
              Recommended {slot.size} · ratio {slot.ratio} · slot <code>{slot.key}</code>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="!py-2 !text-xs"
            >
              {uploading ? 'Uploading…' : isOverridden ? 'Replace image' : 'Upload image'}
            </Button>
            {isOverridden && (
              <button
                type="button"
                onClick={reset}
                className="text-xs font-bold uppercase tracking-[0.12em] text-midnight/45 transition hover:text-crimson"
              >
                Reset to reference
              </button>
            )}
          </div>

          <Field label="Description for screen readers">
            <Input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder={slot.alt}
              maxLength={300}
            />
          </Field>

          <div>
            <span className="block text-[0.65rem] font-bold uppercase tracking-[0.14em] text-midnight/45">
              Focus of the crop
            </span>
            <p className="mt-1 text-xs text-midnight/45">
              Which part of the picture to keep when the frame is narrower than the image.
            </p>
            <div className="mt-2 grid w-max grid-cols-3 gap-1">
              {FOCAL_POINTS.map(([label, x, y]) => {
                const active = focal.x === x && focal.y === y;
                return (
                  <button
                    key={label}
                    type="button"
                    title={label}
                    aria-label={label}
                    aria-pressed={active}
                    onClick={() => setFocal({ x, y })}
                    className={`h-7 w-7 border transition ${
                      active
                        ? 'border-crimson bg-crimson/15'
                        : 'border-midnight/20 bg-white hover:border-midnight/50'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={saveDetails}
              disabled={!isOverridden}
              className="!py-2 !text-xs"
            >
              Save description &amp; focus
            </Button>
            {status && <span className="text-xs font-semibold text-midnight/60">{status}</span>}
            {error && <span className="text-xs font-semibold text-crimson">{error}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * The image library. Every picture on the public site that the school can
 * change lives here, grouped by the page it appears on.
 */
export default function MediaManager({ getToken }) {
  const groups = useMemo(() => groupedMediaSlots(), []);
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/media');
        const data = await res.json();
        if (!cancelled) setRecords(data.media || {});
      } catch (err) {
        if (!cancelled) setLoadError('Could not load the current images.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSaved = (key, record) => setRecords((prev) => ({ ...prev, [key]: record }));

  const handleReset = (key) =>
    setRecords((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const needle = filter.trim().toLowerCase();
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      slots: needle
        ? group.slots.filter(
            (slot) =>
              slot.label.toLowerCase().includes(needle) ||
              slot.key.toLowerCase().includes(needle) ||
              group.group.toLowerCase().includes(needle)
          )
        : group.slots
    }))
    .filter((group) => group.slots.length > 0);

  const customCount = Object.keys(records).length;
  const totalCount = groups.reduce((sum, group) => sum + group.slots.length, 0);

  return (
    <div className="space-y-7">
      <header className="border border-midnight/12 bg-white p-6">
        <h2 className="font-garamond text-2xl font-semibold text-midnight">Site images</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-midnight/65">
          Every picture position on the public site is listed here. Each one shows the picture
          that is live right now, alongside the reference image the site shipped with, so you can
          see exactly what you are replacing. Uploads go live immediately.
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-midnight/45">
          {customCount} of {totalCount} positions customised
        </p>

        <div className="mt-5 max-w-sm">
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by page or position…"
          />
        </div>
      </header>

      {loading && <p className="text-sm text-midnight/50">Loading image positions…</p>}
      {loadError && <p className="text-sm text-crimson">{loadError}</p>}

      {!loading &&
        visibleGroups.map((group) => (
          <section key={group.group} className="space-y-4">
            <div className="flex items-baseline gap-4">
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-midnight/55">
                {group.group}
              </h3>
              <span className="h-px flex-1 bg-midnight/12" />
            </div>

            <div className="space-y-4">
              {group.slots.map((slot) => (
                <SlotCard
                  key={slot.key}
                  slot={slot}
                  record={records[slot.key]}
                  onSaved={handleSaved}
                  onReset={handleReset}
                  getToken={getToken}
                />
              ))}
            </div>
          </section>
        ))}

      {!loading && visibleGroups.length === 0 && (
        <p className="text-sm text-midnight/50">No image positions match that filter.</p>
      )}
    </div>
  );
}
