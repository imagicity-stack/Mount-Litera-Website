import Link from 'next/link';

import SiteImage from '@/components/media/SiteImage';
import ImageReveal from '@/components/motion/ImageReveal';
import Reveal from '@/components/motion/Reveal';
import ArrowLink from '@/components/ArrowLink';

const mentors = [
  { slot: 'home.faces.1', name: 'Sangeeta Agarwal', subject: 'English' },
  { slot: 'home.faces.2', name: 'Sameeksha Sinha', subject: 'Social Studies' },
  { slot: 'home.faces.3', name: 'Smita Sinha', subject: 'Mathematics' }
];

/**
 * The people a parent is actually entrusting their child to. Faces first —
 * a large feature portrait, then the mentors who teach every day.
 */
export default function OurPeople() {
  return (
    <section className="band-grey">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-medium leading-[1.06] text-ink">
              The people of Elden Heights
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col items-start gap-7">
            <p className="lede">
              A school is only as good as the adults in the room. Ours are teachers who know every
              child by name, track their progress personally, and speak to parents candidly.
            </p>
            <ArrowLink href="/core-mentors">Meet all of our mentors</ArrowLink>
          </Reveal>
        </div>

        <span className="rule-heavy mt-14 md:mt-16" />

        {/* Feature ---------------------------------------------------------- */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <ImageReveal>
            <SiteImage slot="home.faces.feature" imgClassName="object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
          </ImageReveal>

          <Reveal delay={0.1} className="flex flex-col items-start">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-crimson">
              Leading the school
            </p>
            <h3 className="mt-4 font-display text-[clamp(1.9rem,3.2vw,3rem)] font-medium leading-[1.1] text-ink">
              R.K. Singh
            </h3>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-soft">
              As Principal, R.K. Singh holds the school to one standard: that learning here should
              feel purposeful, that teachers stay motivated, and that every parent is assured about
              their child&rsquo;s future. It is a promise the whole school is measured against.
            </p>
            <div className="mt-8">
              <ArrowLink href="/about#principal-note">Read the Principal&rsquo;s note</ArrowLink>
            </div>
          </Reveal>
        </div>

        {/* Mentor row ------------------------------------------------------- */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3 md:mt-20 md:gap-10">
          {mentors.map((mentor, index) => (
            <figure key={mentor.slot}>
              <ImageReveal index={index}>
                <SiteImage slot={mentor.slot} imgClassName="object-top" sizes="(max-width: 640px) 100vw, 33vw" />
              </ImageReveal>
              <figcaption className="mt-5">
                <Link href="/core-mentors" className="hv-link-serif !text-xl">
                  {mentor.name}
                </Link>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-ink-muted">
                  {mentor.subject}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
