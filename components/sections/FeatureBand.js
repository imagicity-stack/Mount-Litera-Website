import SiteImage from '@/components/media/SiteImage';
import Parallax from '@/components/motion/Parallax';
import Reveal from '@/components/motion/Reveal';
import ArrowLink from '@/components/ArrowLink';

/**
 * A full-bleed photograph with a short statement over it — a pause between
 * dense sections, and the fastest way to stop a page reading as a wall of text.
 */
export default function FeatureBand({
  slot,
  eyebrow,
  title,
  body,
  link,
  linkLabel,
  height = 'min-h-[58vh] md:min-h-[66vh]',
  align = 'end'
}) {
  return (
    <section className="relative isolate bg-obsidian text-white">
      <Parallax className="absolute inset-0" distance={55}>
        <SiteImage slot={slot} fill sizes="100vw" />
      </Parallax>

      <div
        className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/35"
        aria-hidden="true"
      />

      <div
        className={`shell relative flex flex-col ${
          align === 'center' ? 'justify-center' : 'justify-end'
        } ${height} py-20 md:py-24`}
      >
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/70">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3.5rem)] font-medium leading-[1.08] text-white">
            {title}
          </h2>
          {body && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {body}
            </p>
          )}
          {link && (
            <div className="mt-9">
              <ArrowLink href={link} tone="light">
                {linkLabel}
              </ArrowLink>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
