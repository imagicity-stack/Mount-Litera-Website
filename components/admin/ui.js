// Small, theme-consistent building blocks for the dark admin dashboard.
import { forwardRef } from 'react';

export function Field({ label, hint, children, required, className = '' }) {
  return (
    <label className={`block space-y-1.5 ${className}`}>
      {label && (
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-parchment/55">
          {label}
          {required && <span className="text-cardinal-300">*</span>}
        </span>
      )}
      {children}
      {hint && <span className="block text-[11px] leading-snug text-parchment/40">{hint}</span>}
    </label>
  );
}

const baseInput =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-parchment placeholder-parchment/30 outline-none transition focus:border-gold/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-gold/20';

export const Input = forwardRef(function Input({ className = '', ...props }, ref) {
  return <input ref={ref} className={`${baseInput} ${className}`} {...props} />;
});

export const TextArea = forwardRef(function TextArea({ className = '', rows = 3, ...props }, ref) {
  return <textarea ref={ref} rows={rows} className={`${baseInput} resize-y ${className}`} {...props} />;
});

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`${baseInput} appearance-none bg-graphite ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-sm text-parchment/80"
    >
      <span
        className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-gold' : 'bg-white/15'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-midnight shadow transition-all ${
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
      'bg-gradient-to-r from-gold-300 to-gold-500 text-midnight hover:shadow-[0_14px_30px_-12px_rgba(201,162,75,0.7)]',
    cardinal:
      'bg-gradient-to-r from-cardinal-400 to-cardinal-600 text-parchment hover:shadow-[0_14px_30px_-12px_rgba(138,10,18,0.7)]',
    ghost: 'border border-white/15 bg-white/[0.03] text-parchment/85 hover:border-gold/40 hover:text-gold-200',
    danger: 'border border-cardinal-400/40 bg-cardinal-500/10 text-cardinal-200 hover:bg-cardinal-500/20',
    subtle: 'text-parchment/60 hover:text-gold-200'
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
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({ tone = 'neutral', children }) {
  const tones = {
    neutral: 'bg-white/10 text-parchment/70',
    good: 'bg-emerald-500/15 text-emerald-300',
    ok: 'bg-amber-500/15 text-amber-300',
    bad: 'bg-cardinal-500/20 text-cardinal-200',
    gold: 'bg-gold/15 text-gold-200'
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
  tone === 'good' ? '#34d399' : tone === 'ok' ? '#fbbf24' : tone === 'bad' ? '#e5a0a3' : '#C9A24B';

export function ScoreRing({ score = 0, size = 64, label }) {
  const tone = score >= 80 ? 'good' : score >= 55 ? 'ok' : score >= 30 ? 'ok' : 'bad';
  const color = toneColor(tone);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
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
          className="rotate-90"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fill: '#FAF7F1', fontSize: '15px', fontWeight: 700 }}
        >
          {score}
        </text>
      </svg>
      {label && <span className="text-[10px] uppercase tracking-[0.2em] text-parchment/50">{label}</span>}
    </div>
  );
}

export function CheckList({ items = [] }) {
  const dot = (status) => (status === 'good' ? '#34d399' : status === 'ok' ? '#fbbf24' : '#e5a0a3');
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-2.5 text-xs text-parchment/70">
          <span
            className="mt-1 h-2 w-2 flex-shrink-0 rounded-full"
            style={{ background: dot(item.status) }}
          />
          <span>
            <span className="font-semibold text-parchment/85">{item.label}: </span>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Spinner({ label }) {
  return (
    <span className="inline-flex items-center gap-2 text-parchment/60">
      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
      {label}
    </span>
  );
}
