import Link from 'next/link';

function Arrow() {
  return (
    <span className="arrow-cta__dot">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M5 12h13m-5-5l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Circular-arrow call to action: a filled disc holding an arrow, followed by a
 * bold label. `tone="light"` inverts it for use on ink-coloured bands.
 */
export default function ArrowLink({
  href,
  children,
  tone = 'dark',
  external = false,
  className = '',
  onClick
}) {
  const classes = `arrow-cta ${tone === 'light' ? 'arrow-cta--light' : ''} ${className}`.trim();

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" onClick={onClick}>
        <Arrow />
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      <Arrow />
      {children}
    </Link>
  );
}
