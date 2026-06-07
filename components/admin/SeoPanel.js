import { useState } from 'react';
import { SITE_URL } from '@/lib/seoData';
import { scoreLabel } from '@/lib/seoAnalysis';
import { Badge, CheckList, ScoreRing, Spinner } from '@/components/admin/ui';

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3l1.8 4.6L18 9.4l-4.2 1.8L12 16l-1.8-4.8L6 9.4l4.2-1.8L12 3Z" strokeLinejoin="round" />
    <path d="M19 14l.8 2 .2.0M5 17l.7 1.7" strokeLinecap="round" />
  </svg>
);

const AI_BUTTONS = [
  { action: 'titles', label: 'Title ideas', kind: 'list' },
  { action: 'seoTitle', label: 'SEO title', kind: 'value', field: 'seoTitle' },
  { action: 'metaDescription', label: 'Meta description', kind: 'value', field: 'seoDescription' },
  { action: 'excerpt', label: 'Excerpt', kind: 'value', field: 'excerpt' },
  { action: 'keywords', label: 'Keyword ideas', kind: 'list' },
  { action: 'improve', label: 'Improve SEO', kind: 'list' },
  { action: 'outline', label: 'Draft outline', kind: 'content' }
];

const JSON_ACTIONS = new Set(['keywords', 'titles', 'improve']);

const card = 'rounded-2xl border border-midnight/10 bg-white p-4 shadow-elite-sm';

export default function SeoPanel({ form, analysis, onChange, onInsertContent, getToken }) {
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [lists, setLists] = useState({});
  const [tab, setTab] = useState('seo');

  const seo = scoreLabel(analysis.seoScore);
  const read = scoreLabel(analysis.readabilityScore);

  const callGemini = async (btn) => {
    setBusy(btn.action);
    setError('');
    try {
      const token = await getToken();
      const res = await fetch('/api/admin/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: btn.action,
          context: {
            title: form.title,
            content: form.content,
            metaDescription: form.seoDescription,
            focusKeyword: form.focusKeyword
          }
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'AI request failed.');

      if (btn.kind === 'value' && data.result) {
        onChange(btn.field, data.result);
      } else if (btn.kind === 'content' && data.result) {
        onInsertContent?.(data.result);
      } else if (JSON_ACTIONS.has(btn.action)) {
        setLists((prev) => ({ ...prev, [btn.action]: data.items || [] }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy('');
    }
  };

  const snippetTitle = (form.seoTitle || form.title || 'Your blog title appears here').slice(0, 70);
  const snippetDesc = (
    form.seoDescription ||
    form.excerpt ||
    'Your meta description preview appears here — keep it between 120 and 160 characters for the best results.'
  ).slice(0, 165);
  const snippetUrl = `${SITE_URL}/blogs/${form.slug || 'your-post-slug'}`;

  return (
    <div className="space-y-5">
      {/* Scores */}
      <div className="flex items-center justify-around rounded-2xl border border-midnight/10 bg-white p-4 shadow-elite-sm">
        <div className="text-center">
          <ScoreRing score={analysis.seoScore} label="SEO" />
          <Badge tone={seo.tone}>{seo.label}</Badge>
        </div>
        <div className="h-16 w-px bg-midnight/10" />
        <div className="text-center">
          <ScoreRing score={analysis.readabilityScore} label="Read" />
          <Badge tone={read.tone}>{read.label}</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { v: analysis.stats.wordCount, l: 'Words' },
          { v: `${analysis.stats.readingTime}m`, l: 'Read' },
          { v: `${analysis.stats.keywordDensity.toFixed(1)}%`, l: 'Density' }
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-midnight/10 bg-white py-2.5 shadow-elite-sm">
            <p className="text-lg font-semibold text-midnight">{s.v}</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-midnight/45">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Google snippet preview */}
      <div className={card}>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-midnight/45">Search preview</p>
        <div className="rounded-lg border border-midnight/5 bg-white p-3">
          <p className="truncate text-xs text-[#202124]">{snippetUrl}</p>
          <p className="truncate text-[16px] leading-tight text-[#1a0dab]">{snippetTitle}</p>
          <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-[#4d5156]">{snippetDesc}</p>
        </div>
      </div>

      {/* AI assistant */}
      <div className="rounded-2xl border border-gold/30 bg-gold-50 p-4">
        <div className="flex items-center gap-2 text-gold-700">
          <SparkIcon />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">Gemini SEO Assistant</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {AI_BUTTONS.map((btn) => (
            <button
              key={btn.action}
              type="button"
              onClick={() => callGemini(btn)}
              disabled={Boolean(busy)}
              className="rounded-full border border-gold/40 bg-white px-3 py-1.5 text-[11px] font-semibold text-gold-700 transition hover:bg-gold-100 disabled:opacity-40"
            >
              {busy === btn.action ? '…' : btn.label}
            </button>
          ))}
        </div>
        {busy && <div className="mt-3"><Spinner label="Gemini is thinking…" /></div>}
        {error && <p className="mt-3 text-xs text-cardinal-600">{error}</p>}

        {Object.entries(lists).map(([key, items]) =>
          items.length ? (
            <div key={key} className="mt-4 space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-midnight/45">
                {key === 'titles' ? 'Title suggestions' : key === 'keywords' ? 'Keyword suggestions' : 'Suggestions'}
              </p>
              {items.map((item, i) => (
                <button
                  key={`${key}-${i}`}
                  type="button"
                  onClick={() => {
                    if (key === 'titles') onChange('title', item);
                    else if (key === 'keywords') onChange('focusKeyword', item);
                  }}
                  className={`block w-full rounded-lg border border-midnight/10 bg-white px-3 py-2 text-left text-xs text-midnight/80 transition ${
                    key === 'improve' ? 'cursor-default' : 'hover:border-gold/50 hover:text-cardinal'
                  }`}
                >
                  {key !== 'improve' && <span className="mr-1.5 text-gold-700">＋</span>}
                  {item}
                </button>
              ))}
            </div>
          ) : null
        )}
      </div>

      {/* Checklists */}
      <div>
        <div className="mb-3 flex gap-2">
          <button
            type="button"
            onClick={() => setTab('seo')}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
              tab === 'seo' ? 'bg-cardinal/10 text-cardinal' : 'text-midnight/50 hover:text-midnight'
            }`}
          >
            SEO · {analysis.seo.filter((c) => c.status === 'good').length}/{analysis.seo.length}
          </button>
          <button
            type="button"
            onClick={() => setTab('readability')}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
              tab === 'readability' ? 'bg-cardinal/10 text-cardinal' : 'text-midnight/50 hover:text-midnight'
            }`}
          >
            Readability
          </button>
        </div>
        <div className={card}>
          <CheckList items={tab === 'seo' ? analysis.seo : analysis.readability} />
        </div>
      </div>
    </div>
  );
}
