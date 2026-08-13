import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import SubNav from '@/components/SubNav';
import { sectionNav } from '@/lib/sectionNav';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import SplitFeature from '@/components/sections/SplitFeature';
import FeatureBand from '@/components/sections/FeatureBand';
import { stageDetails } from '@/components/Academics';

const learningEnhancements = [
  'Immersive digital lessons that keep every child excited to learn',
  'Adaptive assessments with real-time feedback for parents and teachers',
  'Continuous teacher training to blend technology with compassionate guidance'
];

const philosophyPoints = [
  'Individual attention in every class',
  'Periodic assessments for growth tracking',
  'Technology-integrated learning experiences',
  'Mentorship-based support for academic and emotional well-being'
];

const coScholasticOfferings = [
  'Physical education and structured sports programs',
  'Visual and performing arts',
  'Debate, literature, and STEM clubs',
  'Value-based education and leadership sessions'
];

const classroomKitChanges = [
  'Unit-wise digital companions for every major concept',
  'Observation-led progress notes shared with families',
  'Quarterly teacher labs to exchange best practices'
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function AcademicsPage() {
  return (
    <>
      <Seo path="/academics" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <SubNav section={sectionNav.academics.section} links={sectionNav.academics.links} />
        <main className="flex-1">
          <ImageBanner
            title="Academics"
            subtitle="Foundations that inspire futures — learning that grows with every child."
            eyebrow="Curriculum · CBSE Aligned"
            slot="academics.banner"
          />

          <section className="relative py-20 md:py-28">
            <div className="shell">
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
                <motion.div
                  className="space-y-6"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">Next Session 2026 – 27</span>
                    <span className="chip">Classes LKG – VIII</span>
                  </div>
                  <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                    Learning resources that <span className="italic">amplify</span> every classroom.
                  </h2>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                  <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                    Beginning 2026 – 27, our classrooms from LKG to Grade VIII receive refreshed
                    content, measurable progress tracking, and added teacher support — for deeper
                    engagement, clearer outcomes, and confident learners.
                  </p>
                  <ul className="space-y-3">
                    {learningEnhancements.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-midnight/80">
                        <span className="mt-[7px] inline-block h-[6px] w-[6px] flex-shrink-0 rounded-full bg-gradient-to-br from-gold to-cardinal shadow-[0_0_0_3px_rgba(201,162,75,0.15)]" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-garamond text-lg italic text-midnight/70">
                    Families receive orientation support and a refreshed resource hub for a seamless transition.
                  </p>
                </motion.div>

                <motion.div
                  className="relative"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <div className="absolute -inset-4 -z-10 rounded-none bg-gradient-to-br from-gold/20 via-transparent to-cardinal/15 blur-2xl" />
                  <div className="img-zoom relative overflow-hidden rounded-none border border-midnight/10 shadow-[0_40px_80px_-40px_rgba(10,10,12,0.4)]">
                    <div
                      className="img-layer absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: "url('/academics/classroom-kit.jpg')" }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/50 to-midnight/30" />
                    <div className="relative z-10 flex min-h-[460px] flex-col justify-between p-8 text-parchment">
                      <div className="space-y-3">
                        <span className="chip-dark">Classroom Kit</span>
                        <h3 className="font-garamond text-3xl font-semibold leading-tight">
                          Interactive learning hub
                        </h3>
                        <p className="text-sm leading-relaxed text-parchment/80">
                          Lesson visuals, practice sheets, and assessment snapshots organised in one place
                          so teachers move seamlessly between activities.
                        </p>
                      </div>
                      <div className="glass-panel-dark mt-6 rounded-2xl p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-300">
                          What changes in 2026 – 27
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-parchment/85">
                          {classroomKitChanges.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gold" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="relative py-20 md:py-28">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="shell">
              <motion.div
                className="mb-12 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Learning Pathway</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  A clear pathway through <span className="italic">every grade</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  Four progressive stages gently guide our learners from playful exploration to
                  focused preparation. Each stage carries a simple promise for children and families.
                </p>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {stageDetails.map((stage, index) => (
                  <motion.div
                    key={stage.title}
                    className="group relative overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment p-6 shadow-[0_30px_60px_-40px_rgba(10,10,12,0.25)] transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.35)]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                      Stage {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-garamond text-xl font-semibold leading-tight text-midnight">
                      {stage.title}
                    </h3>
                    <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.3em] text-midnight/55">
                      {stage.grades}
                    </span>
                    <p className="mt-4 text-sm leading-relaxed text-midnight/75">
                      {stage.homeSummary}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 overflow-hidden rounded-none border border-gold/30 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 px-6 py-5">
                <p className="flex items-center gap-3 text-midnight">
                  <span className="font-garamond text-sm font-semibold uppercase tracking-[0.3em] text-cardinal">
                    Coming soon
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent" />
                  <span className="text-sm md:text-base">
                    Senior Secondary Stage — Science, Commerce, and Humanities streams.
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section id="learning-journey" className="relative py-20 md:py-28">
            <div className="shell">
              <motion.div
                className="mb-14 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Inside the Classroom</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  The Elden Heights <span className="italic">learning journey</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  Take a closer look at how each stage feels inside our classrooms — from foundational
                  play to secondary guidance and mentorship.
                </p>
              </motion.div>

              <div className="relative">
                <div
                  className="absolute left-4 top-0 bottom-0 hidden w-px bg-gradient-to-b from-gold/50 via-midnight/15 to-gold/30 md:block"
                  aria-hidden="true"
                />
                <div className="space-y-10">
                  {stageDetails.map((stage, index) => (
                    <motion.div
                      key={stage.title}
                      className="grid gap-6 md:grid-cols-[140px_minmax(0,1fr)] md:items-start"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative hidden h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-parchment to-ivory font-garamond text-sm font-semibold text-midnight shadow-[0_0_0_6px_rgba(201,162,75,0.08)] md:flex">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                            {stage.grades}
                          </p>
                          <p className="font-garamond text-lg font-semibold text-midnight">
                            {stage.title}
                          </p>
                        </div>
                      </div>
                      <div className="surface-card rounded-none p-7 md:p-8">
                        <p className="text-base leading-relaxed text-midnight/80 md:text-lg">
                          {stage.summary}
                        </p>
                        <div className="mt-6">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                            Key focus areas
                          </p>
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {stage.focus.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 text-sm text-midnight/80"
                              >
                                <span className="mt-[7px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-gradient-to-br from-gold to-cardinal shadow-[0_0_0_3px_rgba(201,162,75,0.15)]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="band-white">
            <div className="shell py-20 md:py-28">
              <SplitFeature
                slot="academics.classroom"
                eyebrow="Teaching and support"
                title="One teacher, and a class small enough to know"
                flip
                points={[
                  'Progress tracked per child, not per class average.',
                  'Extra support arranged before a gap becomes a problem.',
                  'Parents told early — not at the end of term.'
                ]}
              >
                <p>
                  The thing that decides whether a child does well is rarely the syllabus. It is
                  whether somebody noticed, in week three, that they had stopped putting their hand
                  up. Our mentors carry small enough groups to notice.
                </p>
              </SplitFeature>
            </div>
          </section>

          <section id="teaching-support" className="relative py-20 md:py-28">
            <div className="shell">
              <div className="relative overflow-hidden rounded-none surface-card-dark text-parchment">
                <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cardinal/25 blur-[120px]" />
                <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-gold/15 blur-[120px]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

                <div className="relative space-y-12 px-8 py-14 md:px-14 md:py-20">
                  <motion.div
                    className="max-w-3xl space-y-5"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="eyebrow eyebrow-dark">Academic Ecosystem</span>
                    <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-parchment sm:text-5xl md:text-[48px]">
                      Teaching, support, and progress — <span className="italic">in sync</span>.
                    </h2>
                    <p className="text-base leading-relaxed text-parchment/80 md:text-lg">
                      Our academic ecosystem connects classroom experiences, caring educators, and
                      purposeful assessments to make sure every child keeps moving forward.
                    </p>
                  </motion.div>

                  <div className="grid gap-5 md:grid-cols-3">
                    {[
                      {
                        title: 'Teaching Philosophy',
                        body: 'Our approach blends traditional discipline with curiosity-driven classrooms so students think, question, and express freely.',
                        list: philosophyPoints
                      },
                      {
                        title: 'Faculty Excellence',
                        body: 'Our teachers pair empathy with expertise. Regular workshops and training keep instructional practice sharp and student-centred.'
                      },
                      {
                        title: 'Assessment & Progress',
                        body: 'Continuous assessments, feedback loops, and parent partnerships help every learner understand where they stand and how to grow.'
                      }
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="glass-panel-dark rounded-3xl p-7"
                      >
                        <h3 className="font-garamond text-2xl font-semibold text-parchment">
                          {card.title}
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-parchment/80">
                          {card.body}
                        </p>
                        {card.list && (
                          <ul className="mt-5 space-y-2 text-sm text-parchment/75">
                            {card.list.map((point) => (
                              <li key={point} className="flex items-start gap-2">
                                <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gold" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FeatureBand
            slot="academics.wide"
            eyebrow="Beyond the syllabus"
            title="Learning that does not stop at the last page of the textbook"
            body="Projects, labs, debates, and fieldwork run alongside the CBSE course, not instead of it."
          />

          <section id="beyond-textbooks" className="relative py-20 md:py-28">
            <div className="shell">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
                <motion.div
                  className="space-y-6"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="eyebrow">Beyond the Textbook</span>
                  <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                    Life at Elden Heights — <span className="italic">vibrant &amp; alive</span>.
                  </h2>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                  <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                    Life at The Elden Heights School includes vibrant programs that build confidence,
                    teamwork, and leadership. Students explore talents, collaborate with peers, and
                    learn to express themselves.
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {coScholasticOfferings.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-midnight/10 bg-white/70 px-4 py-3 text-sm text-midnight/80 backdrop-blur transition hover:border-gold/40"
                      >
                        <span className="mt-[5px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-gradient-to-br from-gold to-cardinal" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className="surface-card relative overflow-hidden rounded-none p-10"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/15 blur-[100px]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                    Academic Vision
                  </span>
                  <h3 className="mt-3 font-garamond text-3xl font-semibold leading-tight text-midnight md:text-[36px]">
                    The road ahead.
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-midnight/75 md:text-lg">
                    As we evolve into a renewed identity, our academic system is becoming more
                    technology-enabled, data-informed, and globally aligned — keeping the balance
                    between tradition and innovation alive.
                  </p>
                  <span className="mt-6 block h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  <p className="mt-6 font-garamond text-lg italic text-midnight/80">
                    &ldquo;Tradition informs us. Innovation carries us.&rdquo;
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
