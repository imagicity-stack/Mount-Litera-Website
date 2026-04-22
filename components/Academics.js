import Link from 'next/link';
import { motion } from 'framer-motion';

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

const stageImages = [
  '/home/academics-foundation.jpg',
  '/home/academics-prep.jpg',
  '/home/academics-middle.jpg',
  '/home/academics-secondary.jpg'
];
const stageImageAlts = [
  'Students learning at best school in Hazaribagh',
  'Classroom learning at the best school in Hazaribagh',
  'School activities at Elden Heights in Hazaribagh Jharkhand',
  'Elden Heights School campus in Hazaribagh Jharkhand'
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function Academics({ showExplore = true }) {
  return (
    <section id="academics" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
          <motion.div
            className="space-y-7 lg:sticky lg:top-32"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">Academic Expanse</span>
            <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
              Excellence at one of the{' '}
              <span className="italic">
                <span className="relative">
                  leading private
                  <span className="absolute inset-x-0 bottom-0 h-[3px] -translate-y-1 bg-gradient-to-r from-gold via-cardinal to-gold opacity-70" />
                </span>{' '}
                high schools.
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-midnight/75 md:text-lg">
              The Elden Heights School follows a simple, age-appropriate path across four stages.
              Each step gently strengthens confidence, curiosity, and core skills — so children
              feel ready for what comes next.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Warm, caring classrooms',
                'Balanced academics & activities',
                'Focus on communication skills',
                'Early digital awareness'
              ].map((item) => (
                <div
                  key={item}
                  className="group flex items-center gap-3 rounded-xl border border-midnight/10 bg-white/70 px-4 py-3 text-sm text-midnight/80 backdrop-blur transition-all duration-400 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_20px_40px_-20px_rgba(10,10,12,0.2)]"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cardinal/90 to-cardinal-700 shadow-cardinal">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-parchment">
                      <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {showExplore && (
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  href="/academics"
                  className="btn-primary"
                  onClick={() =>
                    trackFacebookEvent('ViewContent', {
                      component: 'academics_section_cta',
                    })
                  }
                >
                  Explore Academics
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-4-4l4 4-4 4" />
                  </svg>
                </Link>
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-midnight/60">
                  <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
                  Four stages · One journey
                </span>
              </div>
            )}
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {stageDetails.map((stage, index) => (
              <motion.article
                key={stage.title}
                className="group relative overflow-hidden rounded-[22px] border border-midnight/10 bg-gradient-to-br from-white to-parchment p-6 shadow-[0_30px_60px_-40px_rgba(10,10,12,0.25)] transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.35)]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12] transition-opacity duration-500 group-hover:opacity-[0.2]"
                  style={{ backgroundImage: `url('${stageImages[index]}')` }}
                  aria-hidden="true"
                >
                  <img src={stageImages[index]} alt={stageImageAlts[index]} className="sr-only" />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/80 via-white/50 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                      Stage {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="rounded-full border border-midnight/15 bg-white/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-midnight/70 backdrop-blur">
                      {stage.grades}
                    </span>
                  </div>

                  <h3 className="font-garamond text-2xl font-semibold leading-tight text-midnight md:text-[26px]">
                    {stage.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-midnight/75">
                    {stage.homeSummary}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                    <span className="ml-4 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-midnight/50 transition-colors group-hover:text-cardinal">
                      Learn more
                      <span className="transition-transform duration-400 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
