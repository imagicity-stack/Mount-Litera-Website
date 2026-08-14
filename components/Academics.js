import Link from 'next/link';
import { motion } from 'framer-motion';

import ArrowLink from '@/components/ArrowLink';
import SiteImage from '@/components/media/SiteImage';
import ImageReveal from '@/components/motion/ImageReveal';
import { trackFacebookEvent } from '@/lib/facebookPixel';

export const stageDetails = [
  {
    title: 'Foundational Stage',
    grades: 'Nursery – Grade II',
    homeSummary: 'Play-integrated discovery builds curiosity, language, and confidence in every young learner.',
    summary:
      'The early years of learning focus on developing curiosity and a love for discovery. Students are introduced to language, numbers, and environmental awareness through activity-based, play-integrated methods. The classroom becomes a space for imagination, storytelling, and exploration, where every question is valued and every answer is celebrated.',
    focus: [
      'Literacy and numeracy skills',
      'Sensory and experiential learning',
      'Art, rhythm, and movement',
      'Building social and emotional understanding'
    ]
  },
  {
    title: 'Preparatory Stage',
    grades: 'Grade III – Grade V',
    homeSummary: 'Concept-based lessons encourage independent thought, teamwork, and fearless self-expression.',
    summary:
      'This is where the spark of learning becomes structured knowledge. Students are guided through concept-based learning that strengthens their understanding of core subjects. Teachers encourage independent thought, teamwork, and communication skills through interactive lessons and small projects.',
    focus: [
      'Concept-based understanding across subjects',
      'Introduction to scientific and digital tools',
      'Creative writing and expression',
      'Early exposure to life skills and values'
    ]
  },
  {
    title: 'Middle Stage',
    grades: 'Grade VI – Grade VIII',
    homeSummary: 'Learners transition to self-driven exploration, connecting theory with real-world challenges.',
    summary:
      'The middle school years shape analytical thinking. Students transition from guided learning to self-driven exploration. They dive deeper into subjects like Mathematics, Science, Social Studies, and Languages while participating in project-based learning that connects theory with real-life situations.',
    focus: [
      'Critical and analytical thinking',
      'STEM-oriented learning modules',
      'Collaborative and research-based projects',
      'Digital literacy and innovation challenges'
    ]
  },
  {
    title: 'Secondary Stage',
    grades: 'Grade IX – Grade X',
    homeSummary: 'Focused mentorship balances board preparation with leadership, ethics, and personal growth.',
    summary:
      'This is the phase where knowledge meets direction. Students begin focused preparation for board examinations while engaging in leadership roles, debates, and community-based projects. The emphasis remains on balanced development — academic achievement with personal growth and ethical responsibility.',
    focus: [
      'Structured CBSE board preparation',
      'Advanced conceptual clarity and practice',
      'Skill-based subjects and electives',
      'Mentorship and counseling for career readiness'
    ]
  }
];

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
              key={stage.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
              className="group flex flex-col"
            >
              <ImageReveal index={index} stagger={0.09}>
                <Link href={stageAnchors[index]} className="img-zoom block">
                  <SiteImage slot={stageSlots[index]} imgClassName="img-layer" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
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
