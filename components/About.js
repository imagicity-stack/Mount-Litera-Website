import { motion } from 'framer-motion';

import ArrowLink from '@/components/ArrowLink';
import SiteImage from '@/components/media/SiteImage';
import ImageReveal from '@/components/motion/ImageReveal';
import Reveal from '@/components/motion/Reveal';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const stats = [
  { figure: '99%', label: 'Parent trust', caption: 'Reported year on year' },
  { figure: 'Top 10', label: 'Regional rank', caption: 'Among CBSE schools' },
  { figure: '4', label: 'Learning stages', caption: 'Roots to Eternity' }
];

const pillars = [
  'Heritage-inspired campus experiences blended with modern pedagogy.',
  'Guided pathways through Roots, Ascent, Radiance, and Eternity.',
  'Dedicated mentorship and personalised attention at every stage.'
];

export default function About({
  showLink = true,
  imageSlot = 'home.about.portrait',
  heading = 'Our Future Ahead'
}) {
  return (
    <section id="about" className="band-grey">
      <div className="shell py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="grid gap-8 md:grid-cols-2 md:gap-16"
        >
          <h2 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-medium leading-[1.06] text-ink">
            {heading}
          </h2>
          <div className="flex flex-col items-start gap-7">
            <p className="lede">
              The Elden Heights School — a unit of{' '}
              <span className="font-bold text-ink">Bhagwati Educational &amp; Charitable Trust</span>{' '}
              — continues its next chapter with a simple promise: nurture confident, capable, and
              creative learners who are ready for tomorrow.
            </p>
            {showLink && <ArrowLink href="/about">Explore all of Elden Heights</ArrowLink>}
          </div>
        </motion.div>

        <span className="rule-heavy mt-14 md:mt-16" />

        <div className="mt-14 grid gap-12 md:mt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <ImageReveal>
            <SiteImage slot={imageSlot} sizes="(max-width: 1024px) 100vw, 50vw" />
          </ImageReveal>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-crimson">
              Excellence with character
            </p>

            <blockquote className="mt-5 border-l-[3px] border-crimson pl-6 font-display text-[1.6rem] font-medium leading-[1.3] text-ink md:text-[2rem]">
              The future belongs to those who prepare for it today — with roots deep enough to
              hold, and wings wide enough to soar.
            </blockquote>

            <ul className="mt-9 divide-y divide-hairline border-y border-hairline">
              {pillars.map((line) => (
                <li key={line} className="py-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  {line}
                </li>
              ))}
            </ul>

            <dl className="mt-10 grid grid-cols-3 gap-6">
              {stats.map(({ figure, label, caption }) => (
                <div key={label}>
                  <dt className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-none tracking-[-0.02em] text-ink">
                    {figure}
                  </dt>
                  <dd>
                    <p className="mt-2 text-sm font-bold text-ink">{label}</p>
                    <p className="mt-1 text-xs text-ink-muted">{caption}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
