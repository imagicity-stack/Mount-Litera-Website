import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const highlights = [
  { title: 'Curated Mentorship', note: 'One-on-one academic & life counsel' },
  { title: 'Culture of Excellence', note: 'Heritage, ethics, and achievement' },
  { title: 'Future-Ready Classrooms', note: 'Digital, collaborative, hands-on' }
];

export default function Admission() {
  return (
    <section id="admission" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[32px] surface-card-dark text-parchment">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
            style={{ backgroundImage: "url('/home/admission-archway.jpg')" }}
            aria-hidden="true"
          />
          <img
            src="/home/admission-archway.jpg"
            alt="Elden Heights School campus in Hazaribagh Jharkhand"
            className="sr-only"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-midnight/95 via-midnight/80 to-graphite/80" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cardinal/25 blur-[120px]" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-gold/15 blur-[120px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="relative grid items-center gap-10 px-8 py-14 md:grid-cols-[1.25fr_1fr] md:gap-16 md:px-14 md:py-20">
            <motion.div
              className="space-y-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eyebrow eyebrow-dark">Admissions 2026 – 27</span>

              <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-parchment sm:text-5xl md:text-[54px]">
                Admissions open at the{' '}
                <span className="italic">
                  <span className="gold-text">best school</span>
                </span>{' '}
                in Hazaribagh.
              </h2>

              <p className="max-w-xl text-base leading-relaxed text-parchment/80 md:text-lg">
                We&rsquo;re inviting new learners to join this journey of transformation — a bold,
                modern learning experience designed for the next generation, rooted in a legacy of excellence.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {highlights.map(({ title, note }) => (
                  <div
                    key={title}
                    className="group rounded-xl border border-parchment/10 bg-white/5 p-4 backdrop-blur transition-all duration-400 hover:border-gold/40 hover:bg-white/10"
                  >
                    <p className="font-garamond text-base font-semibold text-parchment">{title}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-parchment/55">
                      {note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-3">
                <Link href="/admission" className="btn-gold">
                  Apply for Admissions
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-4-4l4 4-4 4" />
                  </svg>
                </Link>
                <Link
                  href="/admission#fee-structure"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-parchment/80 transition hover:text-gold-200"
                >
                  <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
                  Fee Structure
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <div className="glass-panel-dark relative overflow-hidden rounded-3xl p-8 text-center md:p-10">
                <div className="pointer-events-none absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <div className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-300">
                  Exclusive Entry
                </p>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <span className="h-px w-6 bg-gold/60" />
                  <span className="font-garamond text-xl italic text-parchment/90">est.</span>
                  <span className="h-px w-6 bg-gold/60" />
                </div>

                <p className="mt-4 font-garamond text-3xl font-semibold leading-tight text-parchment md:text-[34px]">
                  The Elden Heights School
                </p>

                <p className="mt-5 text-sm leading-relaxed text-parchment/75">
                  Limited seats crafted for families seeking an elite, heritage-inspired education
                  in a campus that blends tradition with tomorrow.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/10">
                  {[
                    ['Limited', 'Seats'],
                    ['CBSE', 'Affiliated']
                  ].map(([v, l]) => (
                    <div
                      key={l}
                      className="flex flex-col items-center gap-1 bg-midnight/80 px-4 py-4 backdrop-blur"
                    >
                      <span className="font-garamond text-lg font-semibold text-parchment">{v}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-parchment/60">
                        {l}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
