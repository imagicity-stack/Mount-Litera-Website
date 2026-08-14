import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import SplitFeature from '@/components/sections/SplitFeature';
import FeatureBand from '@/components/sections/FeatureBand';

const modules = [
  {
    title: 'Financial Literacy & ATM Usage',
    description:
      'Students learn how to use an ATM, understand debit and digital payments, basic banking behaviour, and money responsibility.',
    outcome: 'Financially aware, independent children.'
  },
  {
    title: 'Basic Nursing & First Aid',
    description: 'Training in basic first aid, handling minor injuries, emergency response, and CPR awareness.',
    outcome: 'Safety awareness, calmness during emergencies.'
  },
  {
    title: 'Digital Safety & Online Awareness',
    description: 'Covers password safety, online behaviour, scam awareness, and responsible screen usage.',
    outcome: 'Digitally responsible and secure children.'
  },
  {
    title: 'Public Behaviour & Personal Safety',
    description: 'Road safety, emergency response, public etiquette, asking for help, and situational awareness.',
    outcome: 'Street-smart and confident children.'
  },
  {
    title: 'Everyday Documentation',
    description: 'Students learn to read bills, understand receipts, fill simple forms, and manage basic documentation.',
    outcome: 'Practical intelligence and independence.'
  }
];

const characteristics = [
  'Mandatory for all students',
  'Practical and hands-on learning',
  'No exams or marks',
  'Focused on real-world independence'
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function LifeReadinessProgramPage() {
  return (
    <>
      <Seo path="/life-readiness-program" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Life Readiness Program"
            subtitle="Skill-building pathways that prepare learners for leadership and real-world challenges."
            eyebrow="Life Readiness"
            slot="liferead.banner"
          />

          <section className="band-white">
            <div className="shell py-20 md:py-28">
              <SplitFeature
                slot="liferead.feature"
                eyebrow="Life Readiness"
                title="The lessons a report card never shows"
                points={[
                'Compulsory for every child, not an optional extra.',
                'Progressive — the same skill returns at a harder level.',
                'Assessed by demonstration, not by written test.'
                ]}
              >
                <p>Handling money, speaking to a stranger, cooking a meal, reading a timetable, staying calm under pressure. Practical competence, taught deliberately and revisited every year.</p>
              </SplitFeature>
            </div>
          </section>

          <section className="relative py-20 md:py-28">
            <div className="shell">
              <motion.div
                className="max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Life Readiness Program</span>
                <h1 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                  Preparing children for the <span className="italic">real world</span>.
                </h1>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  A foundational and mandatory initiative designed to equip every child with
                  essential real-world skills. These are not optional activities — these are life
                  skills every student must learn to function independently and responsibly, through
                  an age-appropriate, progressive structure.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="relative py-16 md:py-20">
            <div className="shell">
              <motion.div
                className="mb-10"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-garamond text-3xl font-semibold text-midnight md:text-4xl">
                  Core modules.
                </h2>
                <p className="mt-2 max-w-2xl text-midnight/70">
                  Practical, hands-on learning that grows with every student.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {modules.map((mod, idx) => (
                  <motion.article
                    key={mod.title}
                    className="group relative overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                      Module {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-garamond text-2xl font-semibold leading-tight text-midnight">
                      {mod.title}
                    </h3>
                    <span className="mt-4 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                    <p className="mt-4 text-sm leading-relaxed text-midnight/75">{mod.description}</p>
                    <div className="mt-5 rounded-xl border border-gold/25 bg-gold/8 px-4 py-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cardinal">
                        Outcome
                      </p>
                      <p className="mt-1 text-sm font-semibold text-midnight">{mod.outcome}</p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <motion.div
                className="mt-12 overflow-hidden rounded-none surface-card-dark p-10 text-parchment md:p-14"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <span className="eyebrow eyebrow-dark">Program Characteristics</span>
                <h3 className="mt-4 font-garamond text-3xl font-semibold leading-tight text-parchment md:text-4xl">
                  How the program <span className="italic gold-text">works</span>.
                </h3>
                <ul className="mt-8 grid gap-4 md:grid-cols-2">
                  {characteristics.map((item, idx) => (
                    <li
                      key={item}
                      className="glass-panel-dark flex items-center gap-4 rounded-2xl p-5"
                    >
                      <span className="font-garamond text-2xl font-semibold text-gold-300">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-semibold text-parchment md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          <FeatureBand
            slot="students.strip.3"
            eyebrow="Ready for what comes next"
            title="We would rather they be capable than merely certified"
            body="Read how the programme fits into the wider curriculum."
            link="/academics"
            linkLabel="See our academics"
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
