import Reveal from '@/components/motion/Reveal';
import ArrowLink from '@/components/ArrowLink';

/**
 * The recurring page-section opening: title on the left, standfirst on the
 * right, a heavy rule beneath. Used everywhere so every section on the site
 * starts the same way.
 */
export default function SectionHeader({
  eyebrow,
  title,
  lede,
  link,
  linkLabel,
  tone = 'dark',
  rule = true,
  children
}) {
  const light = tone === 'light';

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        <Reveal>
          {eyebrow && (
            <p
              className={`mb-5 text-[0.72rem] font-bold uppercase tracking-[0.14em] ${
                light ? 'text-white/65' : 'text-crimson'
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className={`font-display text-[clamp(2rem,4.4vw,3.75rem)] font-medium leading-[1.06] ${
              light ? 'text-white' : 'text-ink'
            }`}
          >
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col items-start gap-7">
          {lede && (
            <p className={light ? 'text-base leading-relaxed text-white/80 md:text-lg' : 'lede'}>
              {lede}
            </p>
          )}
          {children}
          {link && (
            <ArrowLink href={link} tone={tone}>
              {linkLabel}
            </ArrowLink>
          )}
        </Reveal>
      </div>

      {rule && (
        <span className={`${light ? 'rule-heavy-light' : 'rule-heavy'} mt-12 md:mt-16`} />
      )}
    </>
  );
}
