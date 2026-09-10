/**
 * Neha Jain, as she appears beside the session details and in the booking
 * panel.
 *
 * There is no approved photograph of her in the repository, so the portrait
 * slot ships empty and this component falls back to a monogram rather than
 * borrowing a stock face or another member of staff. On a page whose entire
 * proposition is trust, an invented portrait would be the one thing that
 * undoes it. The moment a real photograph is uploaded to the
 * `parentRoom.counsellor.portrait` slot in the portal, it appears here with no
 * code change.
 */

import SiteImage from '@/components/media/SiteImage';
import { useMediaSlot } from '@/lib/useSiteMedia';

const SLOT = 'parentRoom.counsellor.portrait';

const initialsOf = (name) =>
  String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export function CounsellorPortrait({ name, className = '', sizes }) {
  const resolved = useMediaSlot(SLOT);

  if (resolved.src) {
    return <SiteImage slot={SLOT} className={className} sizes={sizes} />;
  }

  return (
    <div
      className={`flex items-center justify-center border border-hairline bg-ivory ${className}`}
      style={{ aspectRatio: '3 / 4' }}
      role="img"
      aria-label={name}
    >
      <span className="font-display text-[clamp(2.5rem,7vw,4rem)] font-medium tracking-[0.02em] text-ink">
        {initialsOf(name)}
      </span>
    </div>
  );
}

/**
 * The name block. Used on its own next to the portrait, and inside the booking
 * panel where the portrait would crowd the form.
 */
export function CounsellorIdentity({ name, title, compact = false }) {
  return (
    <div>
      <p
        className={`font-display font-medium leading-tight text-ink ${
          compact ? 'text-[1.25rem]' : 'text-[clamp(1.5rem,2.6vw,2rem)]'
        }`}
      >
        {name}
      </p>
      <p
        className={`mt-2 leading-relaxed text-ink-muted ${
          compact ? 'text-[0.8rem]' : 'text-[0.9rem]'
        }`}
      >
        {title}
      </p>
    </div>
  );
}

export default function Counsellor({ name, title }) {
  return (
    <div className="flex items-center gap-5">
      <CounsellorPortrait name={name} className="w-[5.5rem] flex-shrink-0" sizes="88px" />
      <CounsellorIdentity name={name} title={title} compact />
    </div>
  );
}
