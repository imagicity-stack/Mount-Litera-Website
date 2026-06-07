// Small, theme-consistent building blocks for the light admin dashboard.
import { forwardRef } from 'react';

export function Field({ label, hint, children, required, className = '' }) {
  return (
    <label className={`block space-y-1.5 ${className}`}>
      {label && (
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-midnight/50">
          {label}
          {required && <span className="text-cardinal">*</span>}
        </span>
      )}
      {children}
      {hint && <span className="block text-[11px] leading-snug text-midnight/40">{hint}</span>}
    </label>
  );
}

const baseInput =
  'w-full rounded-xl border border-midnight/15 bg-white px-4 py-2.5 text-sm text-midnight placeholder-midnight/35 outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/25';

export const Input = forwardRef(function Input({ className = '', ...props }, ref) {
  return <input ref={ref} className={`${baseInput} ${className}`} {...props} />;
});

export const TextArea = forwardRef(function TextArea({ className = '', rows = 3, ...props }, ref) {
  return <textarea ref={ref} rows={rows} className={`${baseInput} resize-y ${className}`} {...props} />;
});

export function Select({ className = '', children, ...props }) {
  return (
    <select className={`${baseInput} pr-9 ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-sm text-midnight/75"
    >
      <span className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-cardinal' : 'bg-midnight/15'}`}>
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </span>
      {label && <span>{label}</span>}
    </button>
  );
}

export function Button({ variant = 'primary', className = '', children, ...props }) {
  const variants = {
    primary:
      'bg-gradient-to-r from-cardinal-500 to-cardinal-700 text-parchment hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(138,10,18,0.55)]',
    gold: 'bg-gradient-to-r from-gold-300 to-gold-500 text-midnight hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(201,162,75,0.6)]',
    ghost: 'border border-midnight/20 bg-white text-midnight hover:border-midnight/45 hover:-translate-y-0.5',
    danger: 'border border-cardinal-200 bg-cardinal-50 text-cardinal-600 hover:bg-cardinal-100',
    subtle: 'text-midnight/55 hover:text-cardinal'
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-midnight/10 bg-white shadow-elite-sm ${className}`}>{children}</div>
  );
}

export function Badge({ tone = 'neutral', children }) {
  const tones = {
    neutral: 'bg-midnight/[0.06] text-midnight/65',
    good: 'bg-emerald-100 text-emerald-700',
    ok: 'bg-amber-100 text-amber-700',
    bad: 'bg-cardinal-50 text-cardinal-600',
    gold: 'bg-gold-50 text-gold-700'
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

const toneColor = (tone) =>
  tone === 'good' ? '#059669' : tone === 'ok' ? '#d97706' : tone === 'bad' ? '#B92A32' : '#C9A24B';

export function ScoreRing({ score = 0, size = 64, label }) {
  const tone = score >= 80 ? 'good' : score >= 55 ? 'ok' : score >= 30 ? 'ok' : 'bad';
  const color = toneColor(tone);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(10,10,12,0.08)" strokeWidth="6" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fill: '#0A0A0C', fontSize: '15px', fontWeight: 700 }}
        >
          {score}
        </text>
      </svg>
      {label && <span className="text-[10px] uppercase tracking-[0.2em] text-midnight/45">{label}</span>}
    </div>
  );
}

export function CheckList({ items = [] }) {
  const dot = (status) => (status === 'good' ? '#059669' : status === 'ok' ? '#d97706' : '#B92A32');
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-2.5 text-xs text-midnight/65">
          <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: dot(item.status) }} />
          <span>
            <span className="font-semibold text-midnight/85">{item.label}: </span>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Spinner({ label }) {
  return (
    <span className="inline-flex items-center gap-2 text-midnight/60">
      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
      {label}
    </span>
  );
}
