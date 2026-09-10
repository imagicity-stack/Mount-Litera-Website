/**
 * Form primitives for the Parent Room booking flow.
 *
 * Built on the site's existing `.field-label` / `.field-input` classes so a
 * field here looks like a field anywhere else on the site, with two additions
 * the wizard needs: an error state that announces itself to a screen reader,
 * and touch targets sized for a parent filling this in on a phone from an
 * Instagram ad.
 */

import { useId } from 'react';

const errorId = (id) => `${id}-error`;

function Wrap({ id, label, required, hint, error, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="field-label">
          {label}
          {required && <span className="ml-1 text-crimson">*</span>}
        </label>
      )}
      <div className={label ? 'mt-2' : ''}>{children}</div>
      {hint && !error && <p className="mt-2 text-[0.8rem] leading-snug text-ink-muted">{hint}</p>}
      {error && (
        <p id={errorId(id)} role="alert" className="mt-2 text-[0.8rem] font-semibold text-crimson">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (error) =>
  `field-input text-[16px] ${error ? 'border-crimson shadow-[inset_0_0_0_1px_var(--crimson)]' : ''}`;

export function TextField({
  label,
  value,
  onChange,
  error,
  hint,
  required,
  className = '',
  ...props
}) {
  const id = useId();
  return (
    <Wrap id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <input
        id={id}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId(id) : undefined}
        className={inputClass(error)}
        {...props}
      />
    </Wrap>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  error,
  hint,
  required,
  maxLength,
  rows = 5,
  className = '',
  ...props
}) {
  const id = useId();
  const used = String(value || '').length;
  return (
    <Wrap id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        rows={rows}
        value={value ?? ''}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId(id) : undefined}
        className={`${inputClass(error)} resize-y leading-relaxed`}
        {...props}
      />
      {maxLength && (
        <p className="mt-1.5 text-right text-[0.72rem] tabular-nums text-ink-muted">
          {used} / {maxLength}
        </p>
      )}
    </Wrap>
  );
}

/**
 * A single-select set of tiles.
 *
 * Radio inputs rather than buttons, so the group is keyboard- and
 * screen-reader-navigable the way a parent's browser expects — the tile is
 * only the paint.
 */
export function ChoiceGrid({
  label,
  name,
  options,
  value,
  onChange,
  error,
  hint,
  required,
  columns = 'sm:grid-cols-2',
  className = ''
}) {
  const id = useId();
  return (
    <fieldset className={className} aria-describedby={error ? errorId(id) : undefined}>
      {label && (
        <legend className="field-label">
          {label}
          {required && <span className="ml-1 text-crimson">*</span>}
        </legend>
      )}
      <div className={`mt-3 grid gap-2 ${columns}`}>
        {options.map((option) => {
          const active = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-3 border px-4 py-3.5 text-[0.95rem] transition-colors duration-200 ${
                active
                  ? 'border-crimson bg-crimson/[0.06] font-bold text-ink'
                  : 'border-hairline bg-white text-ink-soft hover:border-ink'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={active}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 ${
                  active ? 'border-crimson bg-crimson' : 'border-hairline'
                }`}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      {hint && !error && <p className="mt-2 text-[0.8rem] text-ink-muted">{hint}</p>}
      {error && (
        <p id={errorId(id)} role="alert" className="mt-2 text-[0.8rem] font-semibold text-crimson">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function ConsentCheckbox({ checked, onChange, error, children, required }) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3.5 border p-4 transition-colors ${
          error ? 'border-crimson' : checked ? 'border-ink bg-white' : 'border-hairline bg-white'
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked === true}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? 'true' : undefined}
          className="mt-0.5 h-5 w-5 flex-shrink-0 accent-crimson"
        />
        <span className="text-[0.9rem] leading-relaxed text-ink-soft">
          {children}
          {required && <span className="ml-1 text-crimson">*</span>}
        </span>
      </label>
      {error && (
        <p role="alert" className="mt-2 text-[0.8rem] font-semibold text-crimson">
          {error}
        </p>
      )}
    </div>
  );
}

/** The label/value pairs on the review step and the confirmation screen. */
export function SummaryRow({ label, children }) {
  if (children === '' || children === null || children === undefined) return null;
  return (
    <div className="grid gap-1 border-b border-hairline py-3.5 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
      <dt className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </dt>
      <dd className="text-[0.95rem] leading-relaxed text-ink">{children}</dd>
    </div>
  );
}
