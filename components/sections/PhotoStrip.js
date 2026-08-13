import SiteImage from '@/components/media/SiteImage';
import ImageReveal from '@/components/motion/ImageReveal';
import { useMediaSlot } from '@/lib/useSiteMedia';

/**
 * A row of photographs that arrive one after another.
 *
 * Captions read from each slot's own description, which the admin edits with
 * the picture, so replacing an image can never leave a caption describing the
 * previous one.
 */
function Frame({ slot, index, captioned }) {
  const { alt } = useMediaSlot(slot);

  return (
    <figure>
      <ImageReveal index={index} stagger={0.09}>
        <SiteImage
          slot={slot}
          alt={captioned ? '' : undefined}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </ImageReveal>
      {captioned && (
        <figcaption className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

export default function PhotoStrip({ slots = [], columns, captioned = true, className = '' }) {
  const cols =
    columns ||
    (slots.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : slots.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2');

  return (
    <div className={`grid gap-6 ${cols} ${className}`}>
      {slots.map((slot, index) => (
        <Frame key={slot} slot={slot} index={index} captioned={captioned} />
      ))}
    </div>
  );
}
