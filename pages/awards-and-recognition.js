import Link from 'next/link';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

const awards = [
  {
    name: 'The Elden Laureate',
    eligibility: 'Class X students',
    natureLabel: 'Nature of Award',
    nature: 'Medal with formal citation · Premium book or fountain pen',
    recognitionLabel: 'What This Award Recognises',
    recognises:
      'The student who best represents the values, character, leadership, and overall spirit of The Elden Heights.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Be enrolled in the school for a minimum of three years',
      'Maintain a consistently strong discipline and conduct record',
      'Demonstrate leadership through actions, not position alone',
      'Positively contribute to school culture, events, or initiatives',
      'Maintain above average academic performance across years'
    ],
    note: 'This award may not be given every year if the standard is not met.'
  },
  {
    name: 'Founder’s Medal of Distinction',
    eligibility: 'Classes VIII to X',
    natureLabel: 'Nature of Award',
    nature: 'Gold-plated medal · Personalised memento or premium diary',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Integrity, responsibility, maturity, and adherence to school values.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Be enrolled for a minimum of two years',
      'Show respectful behaviour towards peers and staff',
      'Demonstrate honesty, responsibility, and reliability',
      'Have no major disciplinary action on record',
      'Be consistently recognised by teachers for ethical conduct'
    ]
  },
  {
    name: 'Governor’s Medal for Academic Excellence',
    eligibility: 'Class X students',
    natureLabel: 'Nature of Award',
    nature: 'Academic medal and certificate · Academic reference book or learning voucher',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Highest academic achievement in the graduating class.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Secure the highest aggregate marks in the final board examination',
      'Maintain minimum 90 percent attendance',
      'Have no record of academic misconduct',
      'Meet all examination and assessment requirements',
      'This award is based strictly on numerical academic data'
    ]
  },
  {
    name: 'Subject Topper Awards',
    eligibility: 'Classes IX and X',
    natureLabel: 'Nature of Award',
    nature: 'Subject-wise shield · Subject-specific learning material',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Outstanding mastery in individual subjects.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Achieve the highest marks in the subject in the annual examination',
      'Meet minimum internal assessment requirements',
      'In case of a tie, internal assessments may be considered',
      'Selection is purely academic and score-based'
    ]
  },
  {
    name: 'The Elden Honours Book',
    eligibility: 'Classes IV to X',
    natureLabel: 'Nature of Recognition',
    nature: 'Permanent entry in the institutional Honours Book',
    recognitionLabel: 'What This Recognition Represents',
    recognises: 'Long-term distinction recorded as part of the school&rsquo;s permanent legacy.',
    categoriesLabel: 'Students May Be Recorded For',
    categories: [
      'Consistent academic excellence',
      'Demonstrated leadership and responsibility',
      'Sustained sports excellence',
      'Significant cultural contribution'
    ],
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Show sustained performance throughout the academic year',
      'Receive faculty recommendation',
      'Maintain a clean conduct record'
    ]
  },
  {
    name: 'The Elden Code Bearer',
    eligibility: 'Classes VI to X',
    natureLabel: 'Nature of Award',
    nature: 'Medal · Inspirational book',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Exemplary character and adherence to the school code.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Maintain a discipline record free of major violations',
      'Demonstrate honesty and respect consistently',
      'Follow school rules even without supervision',
      'Be recognised by teachers for dependable conduct',
      'This award is based on continuous observation, not single incidents'
    ]
  },
  {
    name: 'Young Leader’s Commendation',
    eligibility: 'Classes VIII to X',
    natureLabel: 'Nature of Award',
    nature: 'Trophy · Leadership or communication kit',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Initiative, responsibility, and leadership through action.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Actively take responsibility in school activities or roles',
      'Demonstrate accountability and decision making',
      'Positively influence peers',
      'Maintain discipline and attendance standards'
    ]
  },
  {
    name: 'The Ascension Award',
    eligibility: 'Classes IV to X',
    natureLabel: 'Nature of Award',
    nature: 'Shield · Personal development book',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Exceptional improvement and personal growth.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Show clear improvement compared to previous academic terms',
      'Demonstrate positive behavioural or attitudinal change',
      'Show commitment to self improvement',
      'Be recommended by class teachers'
    ]
  },
  {
    name: 'Colours Award',
    eligibility: 'Classes VI to X',
    natureLabel: 'Nature of Award',
    nature: 'Blazer badge or medal · Sports kit accessory',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Sustained excellence and discipline in sports.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Consistently participate in sports activities over time',
      'Represent school or house teams',
      'Demonstrate sportsmanship and discipline',
      'Receive recommendation from sports faculty'
    ]
  },
  {
    name: 'Cultural Laureate',
    eligibility: 'Classes VI to X',
    natureLabel: 'Nature of Award',
    nature: 'Trophy · Art or music-related kit',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Excellence and commitment in arts, music, theatre, or cultural expression.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Actively participate in cultural activities',
      'Demonstrate skill and dedication in the chosen discipline',
      'Represent the school in events or performances',
      'Be recommended by cultural faculty'
    ]
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function AwardsAndRecognitionPage() {
  return (
    <>
      <Seo path="/awards-and-recognition" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Awards &amp; Recognition"
            subtitle="Celebrate the accolades that honour character, leadership, and academic excellence."
            eyebrow="Honours"
            image="/awards-and-recognition/banner-laurel.jpg"
          />

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-start">
                <motion.div
                  className="space-y-5"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="eyebrow">The Elden Honours</span>
                  <h1 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                    Merit <span className="italic">alone</span> decides.
                  </h1>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                  <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                    Our honours uphold dignity, scarcity, and purpose. Each is conferred only after
                    careful evaluation to ensure it truly reflects the Elden standard of excellence,
                    character, and contribution.
                  </p>
                </motion.div>

                <motion.div
                  className="surface-card relative overflow-hidden rounded-[24px] p-8"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <span className="eyebrow">Navigate</span>
                  <h2 className="mt-4 font-garamond text-2xl font-semibold leading-tight text-midnight">
                    Back to Core.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-midnight/75">
                    Return to the core sections to explore governance, committees, and mentor-led
                    initiatives that shape every Eldenite.
                  </p>
                  <div className="mt-6">
                    <Link href="/core" className="btn-primary">
                      Core Overview
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="awards" className="relative py-20 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mb-14 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Honours &amp; Recognitions</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  Weight, pride, and <span className="italic">lifelong significance</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  Each recognition is conferred through a balanced approach that combines holistic
                  judgement with clearly defined academic benchmarks where required. Not every year
                  guarantees every award — merit alone decides.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {awards.map((award, idx) => (
                  <motion.article
                    key={award.name}
                    className="group relative overflow-hidden rounded-[24px] border border-midnight/10 bg-gradient-to-br from-white to-parchment p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (idx % 3) * 0.08 }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                          Honour {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="mt-2 font-garamond text-2xl font-semibold leading-tight text-midnight">
                          {award.name}
                        </h3>
                      </div>
                      <span className="chip flex-shrink-0 self-start">
                        {award.eligibility}
                      </span>
                    </div>

                    <span className="my-5 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />

                    <div className="space-y-4 text-sm leading-relaxed text-midnight/80">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                          {award.natureLabel || 'Nature of Award'}
                        </p>
                        <p className="mt-1">{award.nature}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                          {award.recognitionLabel || 'What it Represents'}
                        </p>
                        <p className="mt-1">{award.recognises}</p>
                      </div>

                      {award.categories && (
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                            {award.categoriesLabel || 'Categories of Recognition'}
                          </p>
                          <ul className="mt-2 space-y-1">
                            {award.categories.map((category) => (
                              <li key={`${award.name}-${category}`} className="flex items-start gap-2">
                                <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gold" />
                                <span>{category}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {award.considerations && (
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                            {award.considerationLabel || 'To Be Considered'}
                          </p>
                          <ul className="mt-2 space-y-1">
                            {award.considerations.map((consideration) => (
                              <li key={`${award.name}-${consideration}`} className="flex items-start gap-2">
                                <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gold" />
                                <span>{consideration}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {award.note && (
                        <p className="rounded-xl border border-cardinal/25 bg-cardinal/5 px-4 py-3 font-garamond italic text-midnight">
                          {award.note}
                        </p>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>

              <motion.div
                className="mt-12 overflow-hidden rounded-[28px] surface-card-dark p-10 text-center text-parchment md:p-14"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <span className="eyebrow eyebrow-dark justify-center">Our Belief</span>
                <h3 className="mt-4 font-garamond text-3xl font-semibold leading-tight text-parchment md:text-4xl">
                  A culture of <span className="italic gold-text">meaningful recognition</span>.
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-parchment/80">
                  At The Elden Heights, awards are not distributed for participation — they are
                  conferred for purpose. Each recognition reflects our belief that true excellence
                  lies not only in achievement, but in character, consistency, and growth.
                </p>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
