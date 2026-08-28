import ImageReveal from '@/components/motion/ImageReveal';
import { initialsOf } from '@/lib/peopleGroups';

/**
 * One person as the public site shows them.
 *
 * A portrait is optional — the directory lets an entry exist before a
 * photograph does, and initials on ink read as deliberate rather than as a
 * missing image.
 */
export default function PersonCard({ person, index = 0, ratio = '3/4' }) {
  const { name, designation, photo, bio } = person;

  return (
    <figure className="flex flex-col">
      <ImageReveal index={index} stagger={0.07}>
        <div
          className="relative w-full overflow-hidden bg-obsidian"
          style={{ aspectRatio: ratio.replace('/', ' / ') }}
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt={designation ? `${name}, ${designation}` : name}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 25vw"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-medium text-white/85">
              {initialsOf(name)}
            </span>
          )}
        </div>
      </ImageReveal>

      <figcaption className="mt-4">
        <p className="font-display text-xl font-medium leading-tight text-ink">{name}</p>
        {designation && (
          <p className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-crimson">
            {designation}
          </p>
        )}
        {bio && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{bio}</p>}
      </figcaption>
    </figure>
  );
}
