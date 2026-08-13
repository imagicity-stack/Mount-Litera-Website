import Link from 'next/link';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import SubNav from '@/components/SubNav';
import { sectionNav } from '@/lib/sectionNav';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import ImageBanner from '@/components/ImageBanner';
import ArrowLink from '@/components/ArrowLink';

const whyChoose = [
  { title: 'Future-Ready Curriculum', body: 'A blend of strong academics and practical learning experiences.' },
  { title: 'Experienced Faculty', body: 'Dedicated educators who mentor — not just teach.' },
  { title: 'Modern Learning Environment', body: 'Digitally-equipped classrooms, safe campus, and evolving infrastructure.' },
  { title: 'Holistic Growth', body: 'Equal focus on academics, sports, arts, and values.' },
  { title: 'Personalized Guidance', body: 'Every student&rsquo;s journey is tracked, mentored, and celebrated.' }
];

const processSteps = [
  { step: '01', title: 'Inquiry', body: 'Fill out the Admission Inquiry Form below.' },
  { step: '02', title: 'Counsel', body: 'Our counselor schedules a campus visit and interaction.' },
  { step: '03', title: 'Register', body: 'Submit required documents and complete the registration at the school office.' },
  { step: '04', title: 'Welcome', body: 'Receive confirmation and orientation details for the upcoming session.' }
];

const documents = [
  'Birth Certificate (original and photocopy)',
  'Previous Report Card (where applicable)',
  'Transfer Certificate (for higher grades)',
  'Two recent passport-size photographs',
  'Parent&rsquo;s ID Proof (Aadhaar or equivalent)'
];



const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function AdmissionPage() {
  return (
    <>
      <Seo path="/admission" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <SubNav section={sectionNav.admission.section} links={sectionNav.admission.links} />
        <main className="flex-1">
          <ImageBanner
            title="Admissions 2026 – 27"
            subtitle="Explore the next chapter of learning with a campus designed for confidence and curiosity."
            eyebrow="Admissions Open"
            slot="admission.banner"
          />

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <span className="eyebrow">A New Chapter Begins</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                  Join the story of the <span className="italic">best school in Hazaribagh</span>.
                </h1>
                <span className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="mt-6 text-base leading-relaxed text-midnight/75 md:text-lg">
                  The Elden Heights School is opening admissions for the 2026 – 27 academic session.
                  As we move through our transition, we continue to stand for the values that shaped
                  our legacy — discipline, curiosity, and academic excellence. Be part of the next
                  generation of learners who will experience an upgraded, modern, and future-ready
                  school environment.
                </p>
              </motion.div>
            </div>
          </section>

          <section id="why-choose-elden-heights" className="relative scroll-mt-24 py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mb-14 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Why The Elden Heights</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  Not just for exams — <span className="italic">for life</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  Our re-imagined structure ensures every child grows with purpose, confidence, and creativity.
                </p>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {whyChoose.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    className="group relative overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment p-7 transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(10,10,12,0.3)]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.32em] text-cardinal">
                      Pillar {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-garamond text-2xl font-semibold leading-tight text-midnight">
                      {item.title}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed text-midnight/75"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mb-14 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Admission Process</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  From inquiry to <span className="italic">welcome</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((step, idx) => (
                  <motion.div
                    key={step.step}
                    className="relative rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment p-7"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                  >
                    <span className="font-garamond text-5xl font-semibold text-gold-300">
                      {step.step}
                    </span>
                    <div className="mt-2 h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                    <h3 className="mt-4 font-garamond text-xl font-semibold text-midnight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-midnight/75">{step.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative py-24 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
              <motion.div
                className="surface-card rounded-none p-10"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Eligibility</span>
                <h2 className="mt-4 font-garamond text-3xl font-semibold leading-tight text-midnight md:text-4xl">
                  Nursery through Grade 10 for 2026 – 27.
                </h2>
                <span className="mt-5 block h-px w-16 bg-gradient-to-r from-gold to-transparent" />
                <p className="mt-5 text-base leading-relaxed text-midnight/75">
                  Seats are limited and allocated on a first-come, first-served basis following the
                  interaction round. Classes 11 and 12 are under the upcoming academic expansion phase.
                </p>
              </motion.div>

              <motion.div
                className="surface-card rounded-none p-10"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <span className="eyebrow">Documents Required</span>
                <h2 className="mt-4 font-garamond text-3xl font-semibold leading-tight text-midnight md:text-4xl">
                  Ready at registration.
                </h2>
                <span className="mt-5 block h-px w-16 bg-gradient-to-r from-gold to-transparent" />
                <ul className="mt-6 space-y-3">
                  {documents.map((doc) => (
                    <li key={doc} className="flex items-start gap-3 text-sm text-midnight/80">
                      <span className="mt-[7px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-gradient-to-br from-gold to-cardinal shadow-[0_0_0_3px_rgba(201,162,75,0.15)]" />
                      <span dangerouslySetInnerHTML={{ __html: doc }} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          <section className="relative py-10 md:py-14">
            <div className="mx-auto max-w-4xl px-6">
              <div className="overflow-hidden rounded-none border border-gold/30 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 px-6 py-5 md:px-8">
                <p className="flex flex-col gap-2 text-midnight md:flex-row md:items-center md:gap-4">
                  <span className="font-garamond text-sm font-semibold uppercase tracking-[0.3em] text-cardinal">
                    Important Note
                  </span>
                  <span className="text-sm md:text-base">
                    Elden Heights is transitioning toward a renewed identity and academic vision.
                    All admissions remain valid under the recognised CBSE framework and continue
                    seamlessly through the upgraded system.
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section className="band-ink">
            <div className="shell py-20 md:py-28">
              <div className="grid gap-10 md:grid-cols-2 md:gap-16">
                <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.06] text-white">
                  Secure your child&rsquo;s place while seats remain
                </h2>

                <div className="flex flex-col items-start gap-8">
                  <p className="text-base leading-relaxed text-white/80 md:text-lg">
                    Families who confirm early receive the first choice of interaction dates,
                    faster document processing, and priority in class allocation for the
                    2026 &ndash; 27 session.
                  </p>

                  <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
                    <ArrowLink href="#admission-inquiry" tone="light">
                      Begin inquiry
                    </ArrowLink>
                    <Link href="/contact" className="hv-link hv-link-light">
                      Talk to a counsellor
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InquiryForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
