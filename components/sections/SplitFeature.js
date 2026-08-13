import Reveal from '@/components/motion/Reveal';
import ImageReveal from '@/components/motion/ImageReveal';
import SiteImage from '@/components/media/SiteImage';
import ArrowLink from '@/components/ArrowLink';

/**
 * A picture beside a block of copy — the workhorse for breaking up long text.
 *
 * `flip` puts the image on the right. Alternating it down a page gives the
 * reading rhythm a spread-like feel instead of a stack of identical rows.
 *
 * On phones the image always comes first: a wall of text that opens with a
 * photograph is far more inviting than one that ends with it.
 */
export default function SplitFeature({
  slot,
  eyebrow,
  title,
  children,
  link,
  linkLabel,
  flip = false,
  tone = 'dark',
  points = [],
  className = ''
}) {
  const light = tone === 'light';

  return (
    <div
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${className}`}
    >
      <ImageReveal className={flip ? 'lg:order-2' : ''}>
        <SiteImage slot={slot} sizes="(max-width: 1024px) 100vw, 50vw" />
      </ImageReveal>

      <Reveal delay={0.08} className={flip ? 'lg:order-1' : ''}>
        {eyebrow && (
          <p
            className={`text-[0.72rem] font-bold uppercase tracking-[0.14em] ${
              light ? 'text-white/65' : 'text-crimson'
            }`}
          >
            {eyebrow}
          </p>
        )}

        {title && (
          <h3
            className={`mt-4 font-display text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.12] ${
              light ? 'text-white' : 'text-ink'
            }`}
          >
            {title}
          </h3>
        )}

        <div
          className={`mt-5 space-y-4 text-[1.02rem] leading-relaxed ${
            light ? 'text-white/80' : 'text-ink-soft'
          }`}
        >
          {children}
        </div>

        {points.length > 0 && (
          <ul
            className={`mt-7 divide-y border-y ${
              light ? 'divide-white/15 border-white/15' : 'divide-hairline border-hairline'
            }`}
          >
            {points.map((point) => (
              <li
                key={point}
                className={`py-3.5 text-[0.95rem] ${light ? 'text-white/80' : 'text-ink-soft'}`}
              >
                {point}
              </li>
            ))}
          </ul>
        )}

        {link && (
          <div className="mt-8">
            <ArrowLink href={link} tone={tone}>
              {linkLabel}
            </ArrowLink>
          </div>
        )}
      </Reveal>
    </div>
  );
}
