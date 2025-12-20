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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function Academics({ showExplore = true }) {
  return (
    <section id="academics" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <motion.div
            className="space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-cardinal/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cardinal">
              Academic Expanse
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-midnight">Scholarly design for every stage</h2>
            <p className="text-base text-midnight/80 leading-relaxed">
              The Elden Heights School follows a simple, age-appropriate path across four stages. Each step gently strengthens
              confidence, curiosity, and core skills so children feel ready for what comes next.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 text-sm text-midnight/70">
              {[
                'Warm, caring classrooms',
                'Balanced academics and activities',
                'Focus on communication skills',
                'Early digital awareness'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-cardinal/10 bg-white/70 p-3 shadow-sm">
                  <span className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-cardinal"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {showExplore && (
              <div>
                <Link
                  href="/academics"
                  className="inline-flex items-center gap-2 rounded-full bg-midnight px-7 py-3 text-sm font-semibold uppercase tracking-wide text-parchment transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-midnight/20"
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
              </div>
            )}
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2">
            {stageDetails.map((stage, index) => (
              <motion.div
                key={stage.title}
                className="group relative overflow-hidden rounded-2xl border border-cardinal/15 bg-white/80 p-6 shadow-lg shadow-cardinal/5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
              >
                <div className="relative space-y-3">
                  <span className="text-xs uppercase tracking-[0.3em] text-cardinal/70">{stage.grades}</span>
                  <h3 className="text-lg font-semibold text-midnight">{stage.title}</h3>
                  <p className="text-sm text-midnight/70 leading-relaxed">{stage.homeSummary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
