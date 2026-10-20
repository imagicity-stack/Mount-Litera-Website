/**
 * Form primitives for the scholarship registration.
 *
 * Built on the site's `.field-label` / `.field-input` classes so a field here
 * looks like a field anywhere else, with the additions this form needs: an
 * error state that announces itself to a screen reader, a 16px input size so
 * iOS does not zoom on focus, and touch targets sized for a parent filling
 * this in on a phone.
 */

import { useId } from 'react';

const errorId = (id) => `${id}-error`;

function Wrap({ id, label, required, hint, error, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="field-label">
          {label}
          {required && <span className="ml-1 text-eden-600">*</span>}
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
  `field-input text-[16px] ${
    error ? 'border-crimson shadow-[inset_0_0_0_1px_#A51C30]' : 'focus:border-eden-600'
  }`;

export function TextField({ label, value, onChange, error, hint, required, className = '', ...props }) {
  const id = useId();
  return (
    <Wrap id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <input
        id={id}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId(id) : undefined}
        className={inputClass(error)}
        {...props}
      />
    </Wrap>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  error,
  hint,
  required,
  options = [],
  placeholder = 'Choose one',
  className = ''
}) {
  const id = useId();
  return (
    <Wrap id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <select
        id={id}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId(id) : undefined}
        className={`${inputClass(error)} appearance-none bg-white pr-10`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C5C5C' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.9rem center',
          backgroundSize: '1.1rem'
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Wrap>
  );
}

/**
 * A single-select set of tiles. Radio inputs rather than buttons, so the group
 * is keyboard- and screen-reader-navigable the way a browser expects — the
 * tile is only the paint.
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
          {required && <span className="ml-1 text-eden-600">*</span>}
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
                  ? 'border-eden-600 bg-eden-50 font-bold text-ink'
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
                  active ? 'border-eden-600 bg-eden-600' : 'border-hairline'
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
          error ? 'border-crimson' : checked ? 'border-eden-600 bg-eden-50' : 'border-hairline bg-white'
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked === true}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? 'true' : undefined}
          className="mt-0.5 h-5 w-5 flex-shrink-0 accent-eden-600"
        />
        <span className="text-[0.9rem] leading-relaxed text-ink-soft">
          {children}
          {required && <span className="ml-1 text-eden-600">*</span>}
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
