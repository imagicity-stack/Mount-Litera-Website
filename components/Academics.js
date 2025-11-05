import Link from 'next/link';
import { motion } from 'framer-motion';

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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function Academics({ showExplore = true }) {
  return (
    <section id="academics" className="py-20 bg-cardinal text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start">
          <motion.div
            className="space-y-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1">Academics</span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1">Session 2025-26</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Building Foundations, Inspiring Futures</h2>
            <p className="text-white/80">
              At Mount Litera School, academics go far beyond textbooks. Our curriculum nurtures curiosity, discipline, and creativity —
              preparing students not just for exams, but for life. Every stage of learning is structured to build strong fundamentals,
              foster problem-solving ability, and develop confidence in every child while blending traditional academic strength with
              modern pedagogical practices and digital learning tools.
            </p>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm shadow-lg">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="space-y-4 text-white/90 sm:flex-1">
                  <h3 className="text-xl font-semibold text-white">Pinnacle Learning by The Lead Group</h3>
                  <p>
                    From the 2026-25 academic session, we are partnering with Pinnacle Learning by The Lead Group for classes LKG to
                    VIII. This collaboration brings immersive digital content, structured assessments, and teacher training that elevate
                    classroom experiences while preserving our culture of care.
                  </p>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-white/70" />
                      Personalised concept reinforcement, adaptive practice, and bilingual resources.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-white/70" />
                      Integrated projects and skill builders that connect real-world problems with classroom learning.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-white/70" />
                      Dedicated mentor connects for parents and learners to track progress together.
                    </li>
                  </ul>
                  <p className="text-sm text-white/70">
                    A refreshed resource hub and orientation series will ensure families are ready for the transition.
                  </p>
                </div>
                <div className="sm:w-40 md:w-48">
                  <div className="aspect-[3/4] w-full rounded-2xl border-2 border-dashed border-white/50 bg-white/10 text-center text-xs font-semibold uppercase tracking-wide text-white/70 flex items-center justify-center">
                    Photo Space
                  </div>
                </div>
              </div>
            </div>
            {showExplore && (
              <div>
                <Link
                  href="/academics"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cardinal transition hover:bg-cardinal/10 hover:text-white"
                >
                  Explore
                </Link>
              </div>
            )}
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2">
            {stageDetails.map((stage, index) => (
              <motion.div
                key={stage.title}
                className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 shadow-lg transition hover:border-white/40"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              >
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">{stage.grades}</span>
                <h3 className="mt-3 text-xl font-semibold">{stage.title}</h3>
                <p className="mt-3 text-sm text-white/80">{stage.homeSummary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
