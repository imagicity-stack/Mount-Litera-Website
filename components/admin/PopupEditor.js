import { useCallback, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from '@/lib/firebaseClient';
import {
  POPUP_FREQUENCIES,
  POPUP_IMAGE_POSITIONS,
  POPUP_LAYOUTS,
  POPUP_TARGETS,
  POPUP_THEMES,
  POPUP_TRIGGERS,
  resolveTheme
} from '@/lib/popupConfig';
import { Badge, Button, Field, Input, Select, TextArea, Toggle } from '@/components/admin/ui';

const cardClass = 'rounded-2xl border border-midnight/10 bg-white p-5 shadow-elite-sm';
const sectionLabel = 'text-xs font-semibold uppercase tracking-[0.2em] text-midnight/45';

function PopupPreview({ form }) {
  const theme = resolveTheme(form);
  const layout = form.layout || 'modal';
  const isBanner = layout === 'banner-top' || layout === 'banner-bottom';

  const ctas = (
    <div className={`mt-4 flex gap-2 ${isBanner ? '' : 'flex-col sm:flex-row'}`}>
      {form.primaryCtaLabel && (
        <span className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold" style={{ background: theme.accent, color: theme.bg }}>
          {form.primaryCtaLabel}
        </span>
      )}
      {form.secondaryCtaLabel && !isBanner && (
        <span className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold" style={{ borderColor: `${theme.text}40`, color: theme.text }}>
          {form.secondaryCtaLabel}
        </span>
      )}
    </div>
  );

  return (
    <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-midnight/10 bg-[repeating-linear-gradient(45deg,#ece7dd,#ece7dd_12px,#f4f1ea_12px,#f4f1ea_24px)] p-5">
      {isBanner ? (
        <div className="w-full rounded-xl p-4" style={{ background: theme.bg }}>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              {form.eyebrow && <p className="text-[9px] font-semibold uppercase tracking-[0.3em]" style={{ color: theme.accent }}>{form.eyebrow}</p>}
              <p className="font-garamond text-base font-semibold" style={{ color: theme.text }}>{form.title || 'Banner headline'}</p>
            </div>
            {form.primaryCtaLabel && (
              <span className="rounded-full px-4 py-1.5 text-xs font-semibold" style={{ background: theme.accent, color: theme.bg }}>{form.primaryCtaLabel}</span>
            )}
          </div>
        </div>
      ) : (
        <div className={`relative overflow-hidden rounded-2xl ${layout === 'slide-in' ? 'w-[240px]' : 'w-full max-w-sm'}`} style={{ background: theme.bg, border: `1px solid ${theme.accent}55` }}>
          {form.image && form.imagePosition === 'top' && <img src={form.image} alt="" className="h-24 w-full object-cover" />}
          {form.image && form.imagePosition === 'background' && (
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url('${form.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          )}
          <div className="relative p-5">
            {form.eyebrow && <p className="text-[9px] font-semibold uppercase tracking-[0.3em]" style={{ color: theme.accent }}>{form.eyebrow}</p>}
            <p className="mt-2 font-garamond text-xl font-semibold leading-tight" style={{ color: theme.text }}>{form.title || 'Your popup title'}</p>
            {form.body && <p className="mt-2 text-xs leading-relaxed" style={{ color: `${theme.text}cc` }}>{form.body}</p>}
            {ctas}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PopupEditor({ form, setField, onSave, onClose, onDelete, saving, message, user }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const uid = user?.uid || 'admin';
        const storageRef = ref(firebaseStorage, `popups/${uid}/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        setField('image', url);
      } catch (error) {
        window.alert('Image upload failed.');
      } finally {
        setUploading(false);
      }
    },
    [setField, user]
  );

  const onThemeChange = (value) => {
    setField('theme', value);
    const preset = POPUP_THEMES.find((t) => t.value === value);
    if (preset && value !== 'custom') {
      setField('bgColor', preset.bg);
      setField('textColor', preset.text);
      setField('accentColor', preset.accent);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-midnight/10 bg-white px-4 py-3 shadow-elite-sm">
        <button type="button" onClick={onClose} className="text-sm font-semibold text-midnight/60 transition hover:text-cardinal">
          ← All popups
        </button>
        <div className="flex items-center gap-2">
          <Badge tone={form.status === 'active' ? 'good' : form.status === 'paused' ? 'ok' : 'neutral'}>{form.status}</Badge>
          <Button variant="primary" onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : form.id ? 'Update popup' : 'Create popup'}
          </Button>
        </div>
      </div>

      {message && <p className="rounded-xl border border-gold/30 bg-gold-50 px-4 py-2.5 text-sm text-midnight">{message}</p>}

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <div className="space-y-5">
          {/* Identity */}
          <div className={`${cardClass} space-y-3`}>
            <p className={sectionLabel}>Campaign</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Internal name"><Input value={form.name} onChange={(e) => setField('name', e.target.value)} /></Field>
              <Field label="Status">
                <Select value={form.status} onChange={(e) => setField('status', e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </Select>
              </Field>
            </div>
          </div>

          {/* Content */}
          <div className={`${cardClass} space-y-3`}>
            <p className={sectionLabel}>Content</p>
            <Field label="Eyebrow"><Input value={form.eyebrow} onChange={(e) => setField('eyebrow', e.target.value)} placeholder="Just opened · Classes XI & XII" /></Field>
            <Field label="Title"><Input value={form.title} onChange={(e) => setField('title', e.target.value)} placeholder="Reserve your seat today" /></Field>
            <Field label="Body"><TextArea value={form.body} onChange={(e) => setField('body', e.target.value)} rows={3} /></Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Image position">
                <Select value={form.imagePosition} onChange={(e) => setField('imagePosition', e.target.value)}>
                  {POPUP_IMAGE_POSITIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                </Select>
              </Field>
              <Field label="Image">
                <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-midnight/20 px-3 py-2.5 text-xs text-midnight/55 hover:border-gold/50">
                  {uploading ? 'Uploading…' : form.image ? 'Replace image' : 'Upload image'}
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
              </Field>
            </div>
            {form.image && <img src={form.image} alt="" className="h-24 w-full rounded-xl object-cover" />}
          </div>

          {/* CTAs */}
          <div className={`${cardClass} space-y-3`}>
            <p className={sectionLabel}>Call to action</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Primary label"><Input value={form.primaryCtaLabel} onChange={(e) => setField('primaryCtaLabel', e.target.value)} /></Field>
              <Field label="Primary URL"><Input value={form.primaryCtaUrl} onChange={(e) => setField('primaryCtaUrl', e.target.value)} placeholder="/admission or https://…" /></Field>
              <Field label="Secondary label"><Input value={form.secondaryCtaLabel} onChange={(e) => setField('secondaryCtaLabel', e.target.value)} /></Field>
              <Field label="Secondary URL"><Input value={form.secondaryCtaUrl} onChange={(e) => setField('secondaryCtaUrl', e.target.value)} /></Field>
            </div>
          </div>

          {/* Design */}
          <div className={`${cardClass} space-y-3`}>
            <p className={sectionLabel}>Design</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Layout">
                <Select value={form.layout} onChange={(e) => setField('layout', e.target.value)}>
                  {POPUP_LAYOUTS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                </Select>
              </Field>
              <Field label="Theme">
                <Select value={form.theme} onChange={(e) => onThemeChange(e.target.value)}>
                  {POPUP_THEMES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </Select>
              </Field>
            </div>
            {form.theme === 'custom' && (
              <div className="grid grid-cols-3 gap-3">
                <Field label="Background"><input type="color" value={form.bgColor} onChange={(e) => setField('bgColor', e.target.value)} className="h-10 w-full rounded-lg border border-midnight/15 bg-white" /></Field>
                <Field label="Text"><input type="color" value={form.textColor} onChange={(e) => setField('textColor', e.target.value)} className="h-10 w-full rounded-lg border border-midnight/15 bg-white" /></Field>
                <Field label="Accent"><input type="color" value={form.accentColor} onChange={(e) => setField('accentColor', e.target.value)} className="h-10 w-full rounded-lg border border-midnight/15 bg-white" /></Field>
              </div>
            )}
            <div className="flex flex-wrap gap-5 pt-1">
              <Toggle checked={form.showCloseButton !== false} onChange={(v) => setField('showCloseButton', v)} label="Close button" />
              <Toggle checked={form.overlayClose !== false} onChange={(v) => setField('overlayClose', v)} label="Click outside to close" />
            </div>
          </div>

          {/* Behavior */}
          <div className={`${cardClass} space-y-3`}>
            <p className={sectionLabel}>Behaviour</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Trigger" hint={POPUP_TRIGGERS.find((t) => t.value === form.trigger)?.hint}>
                <Select value={form.trigger} onChange={(e) => setField('trigger', e.target.value)}>
                  {POPUP_TRIGGERS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </Select>
              </Field>
              {(form.trigger === 'delay' || form.trigger === 'scroll') && (
                <Field label={form.trigger === 'delay' ? 'Delay (seconds)' : 'Scroll depth (%)'}>
                  <Input type="number" value={form.triggerValue} onChange={(e) => setField('triggerValue', e.target.value)} />
                </Field>
              )}
              <Field label="Frequency">
                <Select value={form.frequency} onChange={(e) => setField('frequency', e.target.value)}>
                  {POPUP_FREQUENCIES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                </Select>
              </Field>
              {form.frequency === 'cooldown' && (
                <Field label="Cooldown (days)"><Input type="number" value={form.frequencyDays} onChange={(e) => setField('frequencyDays', e.target.value)} /></Field>
              )}
            </div>
          </div>

          {/* Targeting & schedule */}
          <div className={`${cardClass} space-y-3`}>
            <p className={sectionLabel}>Targeting & schedule</p>
            <Field label="Show on">
              <Select value={form.targetType} onChange={(e) => setField('targetType', e.target.value)}>
                {POPUP_TARGETS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </Select>
            </Field>
            {(form.targetType === 'include' || form.targetType === 'exclude') && (
              <Field label="Paths" hint="Comma separated. Use /blogs/* to match a section.">
                <Input
                  value={Array.isArray(form.targetPaths) ? form.targetPaths.join(', ') : form.targetPaths}
                  onChange={(e) => setField('targetPaths', e.target.value.split(',').map((p) => p.trim()).filter(Boolean))}
                  placeholder="/, /admission, /blogs/*"
                />
              </Field>
            )}
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Start"><Input type="datetime-local" value={form.startAt ? form.startAt.slice(0, 16) : ''} onChange={(e) => setField('startAt', e.target.value)} /></Field>
              <Field label="End"><Input type="datetime-local" value={form.endAt ? form.endAt.slice(0, 16) : ''} onChange={(e) => setField('endAt', e.target.value)} /></Field>
              <Field label="Priority" hint="Higher wins."><Input type="number" value={form.priority} onChange={(e) => setField('priority', e.target.value)} /></Field>
            </div>
          </div>

          {form.id && (
            <button type="button" onClick={onDelete} className="text-xs font-semibold uppercase tracking-[0.2em] text-cardinal-500 hover:text-cardinal-700">
              Delete popup
            </button>
          )}
        </div>

        {/* Preview */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <p className={sectionLabel}>Live preview</p>
          <PopupPreview form={form} />
          {(form.impressions != null || form.clicks != null) && (
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { v: form.impressions || 0, l: 'Views' },
                { v: form.clicks || 0, l: 'Clicks' },
                { v: form.impressions ? `${(((form.clicks || 0) / form.impressions) * 100).toFixed(1)}%` : '0%', l: 'CTR' }
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-midnight/10 bg-white py-2.5 shadow-elite-sm">
                  <p className="text-lg font-semibold text-midnight">{s.v}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-midnight/45">{s.l}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
