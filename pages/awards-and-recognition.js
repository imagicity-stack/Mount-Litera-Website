import Link from 'next/link';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import useContent from '@/lib/useContent';
import SplitFeature from '@/components/sections/SplitFeature';
import PhotoStrip from '@/components/sections/PhotoStrip';



const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function AwardsAndRecognitionPage() {
  const { items: awards } = useContent('awards');

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
            slot="core.awards"
          />

          <section className="relative py-20 md:py-28">
            <div className="shell">
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
                  className="surface-card relative overflow-hidden rounded-none p-8"
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

          <section className="band-white">
            <div className="shell py-20 md:py-28">
              <SplitFeature
                slot="awards.strip.1"
                eyebrow="Recognition"
                title="Awards are the evidence, not the aim"
                points={[
                  'Recognition across academics, sport, and the arts.',
                  'House and individual honours awarded every term.',
                  'Accreditation reviewed against published standards.'
                ]}
              >
                <p>
                  We do not chase prizes. But when independent bodies and neighbouring schools
                  keep arriving at the same conclusion about our students, it is worth showing
                  parents the record.
                </p>
              </SplitFeature>

              <PhotoStrip
                className="mt-16"
                slots={['awards.strip.2', 'awards.strip.3', 'core.feature']}
              />
            </div>
          </section>

          <section id="awards" className="relative py-20 md:py-24">
            <div className="shell">
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
                    key={award.id}
                    className="group relative overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
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
                              <li key={`${award.id}-${category}`} className="flex items-start gap-2">
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
                              <li key={`${award.id}-${consideration}`} className="flex items-start gap-2">
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
                className="mt-12 overflow-hidden rounded-none surface-card-dark p-10 text-center text-parchment md:p-14"
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
