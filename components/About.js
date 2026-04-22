import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 }
};

const stats = [
  { value: '99%', label: 'Parent Trust', caption: 'Year on year' },
  { value: 'Top 10', label: 'Regional Rank', caption: 'Amongst CBSE schools' },
  { value: 'No. 1', label: 'Holistic Care', caption: 'Mentored pathway' }
];

const pillars = [
  'Heritage-inspired campus experiences blended with modern pedagogy.',
  'Guided pathways through Roots, Ascent, Radiance, and Eternity.',
  'Dedicated mentorship and personalized attention at every stage.'
];

export default function About({
  showLink = true,
  imagePrefix = 'home',
  heading = 'Our Future Ahead'
}) {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="mb-14 flex flex-col items-center text-center"
        >
          <span className="eyebrow">The Elden Heights Ethos</span>
          <h2 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[56px]">
            {heading}
          </h2>
          <span className="mt-6 h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-midnight/75 md:text-lg">
            A unit of <span className="font-semibold text-midnight">Bhagwati Educational & Charitable Trust</span> —
            nurturing confident, capable, and creative learners for tomorrow.
          </p>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-br from-gold/20 via-transparent to-cardinal/10 opacity-60 blur-2xl" />

          <div className="surface-card relative overflow-hidden rounded-[32px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <div className="pointer-events-none absolute left-0 top-10 bottom-10 w-[2px] bg-gradient-to-b from-cardinal via-gold to-cardinal" />

            <div className="grid gap-12 px-6 py-12 md:grid-cols-[1.15fr_1fr] md:px-14 md:py-16 lg:gap-16">
              <motion.div
                className="relative space-y-7"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                  <span className="h-[1px] w-8 bg-cardinal/60" />
                  Established Heritage
                </div>
                <h3 className="font-garamond text-3xl font-semibold leading-tight text-midnight sm:text-4xl md:text-[44px]">
                  A simple promise.
                  <br />
                  <span className="italic text-midnight/80">
                    Excellence with <span className="text-cardinal">character</span>.
                  </span>
                </h3>
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  The Elden Heights School continues its next chapter with a simple promise:
                  nurture confident, capable, and creative learners who are ready for tomorrow —
                  grounded in heritage, propelled by purpose.
                </p>

                <motion.blockquote
                  className="relative mt-4 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-parchment to-ivory/70 px-7 py-6 shadow-[0_30px_60px_-40px_rgba(10,10,12,0.3)]"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <span className="pointer-events-none absolute -top-2 left-6 font-garamond text-7xl leading-none text-cardinal/25">
                    &ldquo;
                  </span>
                  <p className="relative font-garamond text-xl italic leading-snug text-midnight md:text-2xl">
                    The future belongs to those who prepare for it today — with roots deep enough
                    to hold, and wings wide enough to soar.
                  </p>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                    — Elden Heights Ethos
                  </p>
                </motion.blockquote>

                <ul className="space-y-3 pt-2 text-sm text-midnight/75">
                  {pillars.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] inline-block h-[6px] w-[6px] flex-shrink-0 rounded-full bg-gradient-to-br from-gold to-cardinal shadow-[0_0_0_3px_rgba(201,162,75,0.15)]"
                      />
                      <span className="leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>

                {showLink && (
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="flex flex-wrap items-center gap-5 pt-3"
                  >
                    <Link href="/about" className="btn-primary">
                      Why Elden Heights is a Top School in Hazaribagh
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-4-4l4 4-4 4" />
                      </svg>
                    </Link>
                    <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-midnight/60">
                      <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
                      Towards Eternal Glory
                    </span>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                className="relative flex flex-col gap-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <div className="img-zoom relative h-64 overflow-hidden rounded-3xl border border-midnight/10 shadow-[0_40px_80px_-40px_rgba(10,10,12,0.45)]">
                  <div
                    className="img-layer absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: `url('/${imagePrefix}/about-vision.jpg')` }}
                    aria-hidden="true"
                  />
                  <img
                    src={`/${imagePrefix}/about-vision.jpg`}
                    alt="Elden Heights School campus in Hazaribagh Jharkhand"
                    className="sr-only"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/20 to-transparent" aria-hidden="true" />
                  <div className="relative z-10 flex h-full flex-col justify-between p-5">
                    <span className="chip-dark self-start backdrop-blur">Campus Lens</span>
                    <div>
                      <p className="font-garamond text-2xl text-parchment">A heritage in bloom.</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-parchment/75">Hazaribagh · Jharkhand</p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-midnight/10 bg-gradient-to-br from-white to-parchment p-6 shadow-[0_30px_60px_-40px_rgba(10,10,12,0.25)]">
                  <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
                  <div className="flex items-center justify-between gap-4 border-b border-midnight/10 pb-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-midnight/60">
                        Academic Ethos
                      </p>
                      <p className="mt-1 font-garamond text-2xl font-semibold text-midnight">
                        Excellence with Character
                      </p>
                    </div>
                    <span className="chip">Heritage</span>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {stats.map(({ value, label, caption }) => (
                      <div
                        key={label}
                        className="group relative overflow-hidden rounded-xl border border-midnight/10 bg-white/90 px-3 py-4 text-center transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_20px_40px_-20px_rgba(10,10,12,0.25)]"
                      >
                        <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <p className="font-garamond text-2xl font-semibold text-midnight md:text-3xl">
                          {value}
                        </p>
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-midnight/70">
                          {label}
                        </p>
                        <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-midnight/45">
                          {caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
