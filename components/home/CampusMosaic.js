import SiteImage from '@/components/media/SiteImage';
import ImageReveal from '@/components/motion/ImageReveal';
import Reveal from '@/components/motion/Reveal';
import ArrowLink from '@/components/ArrowLink';
import { useMediaSlot } from '@/lib/useSiteMedia';

/**
 * The caption is the slot's own description, which the admin edits alongside
 * the picture — so a replaced photograph can never end up under a caption
 * describing the one before it. The image itself is then marked decorative,
 * since the caption already carries the description.
 */
function Frame({ slot, index, className = '' }) {
  const { alt } = useMediaSlot(slot);

  return (
    <figure className={className}>
      <ImageReveal index={index}>
        <SiteImage slot={slot} alt="" />
      </ImageReveal>
      <figcaption className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
        {alt}
      </figcaption>
    </figure>
  );
}

/**
 * A day on campus, told in pictures. Deliberately asymmetric — the right
 * column sits lower than the others so the grid reads as a spread rather than
 * a row of tiles.
 */
export default function CampusMosaic() {
  return (
    <section className="band-white">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-medium leading-[1.06] text-ink">
              A day on our campus
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col items-start gap-7">
            <p className="lede">
              Not a brochure — the ordinary hours. Assembly in the morning light, a question
              answered at a desk, the walk between classes. This is what your child&rsquo;s day
              actually looks like here.
            </p>
            <ArrowLink href="/gallery">See the full gallery</ArrowLink>
          </Reveal>
        </div>

        <span className="rule-heavy mt-14 md:mt-16" />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-[0.95fr_1.3fr_0.85fr] lg:gap-7">
          <Frame slot="home.mosaic.1" index={0} />

          <div className="flex flex-col gap-7">
            <Frame slot="home.mosaic.2" index={1} />
          </div>

          <div className="flex flex-col gap-7 lg:pt-16">
            <Frame slot="home.mosaic.3" index={2} />
            <Frame slot="home.mosaic.4" index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
