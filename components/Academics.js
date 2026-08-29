import Link from 'next/link';
import { motion } from 'framer-motion';

import ArrowLink from '@/components/ArrowLink';
import SiteImage from '@/components/media/SiteImage';
import ImageReveal from '@/components/motion/ImageReveal';
import { trackFacebookEvent } from '@/lib/facebookPixel';
import useContent from '@/lib/useContent';

const stageSlots = [
  'academics.stage.foundational',
  'academics.stage.preparatory',
  'academics.stage.middle',
  'academics.stage.secondary'
];

const stageAnchors = [
  '/academics#learning-journey',
  '/academics#learning-journey',
  '/academics#learning-journey',
  '/academics#learning-journey'
];

const commitments = [
  'Warm, caring classrooms',
  'Balanced academics and activities',
  'Focus on communication skills',
  'Early digital awareness'
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function Academics({ showExplore = true }) {
  const { items: stageDetails } = useContent('academicStages');

  return (
    <section id="academics" className="band-white">
      <div className="shell py-20 md:py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 md:grid-cols-2 md:gap-16"
        >
          <h2 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-medium leading-[1.06] text-ink">
            Academics
          </h2>
          <div className="flex flex-col items-start gap-7">
            <p className="lede">
              The Elden Heights School follows a simple, age-appropriate path across four stages.
              Each step strengthens confidence, curiosity, and core skills — so children feel ready
              for what comes next.
            </p>
            {showExplore && (
              <ArrowLink
                href="/academics"
                onClick={() =>
                  trackFacebookEvent('ViewContent', { component: 'academics_section_cta' })
                }
              >
                Explore all of our academics
              </ArrowLink>
            )}
          </div>
        </motion.div>

        <span className="rule-heavy mt-14 md:mt-16" />

        <p className="mt-12 text-[1.05rem] text-ink-soft md:text-lg">
          The Elden Heights{' '}
          <Link href="/academics#learning-journey" className="hv-link">
            learning journey
          </Link>{' '}
          is composed of four stages:
        </p>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {stageDetails.map((stage, index) => (
            <motion.article
              key={stage.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
              className="group flex flex-col"
            >
              <ImageReveal index={index} stagger={0.09}>
                <Link href={stageAnchors[index]} className="img-zoom block">
                  <SiteImage slot={stageSlots[index] || stageSlots[stageSlots.length - 1]} imgClassName="img-layer" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                </Link>
              </ImageReveal>

              <p className="mt-6 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                Stage {String(index + 1).padStart(2, '0')} · {stage.grades}
              </p>

              <h3 className="mt-3">
                <Link href={stageAnchors[index]} className="hv-link-serif">
                  {stage.title}
                </Link>
              </h3>

              <p className="mt-5 text-[0.95rem] italic leading-relaxed text-ink-soft">
                {stage.homeSummary}
              </p>
            </motion.article>
          ))}
        </div>

        <ul className="mt-16 grid gap-x-8 border-t border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item) => (
            <li
              key={item}
              className="border-b border-hairline py-5 text-[0.95rem] font-bold text-ink lg:border-b-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
