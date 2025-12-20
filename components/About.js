import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function About({ showLink = true }) {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border border-cardinal/12 bg-white shadow-xl">
          <div className="absolute inset-y-0 left-0 w-2 bg-cardinal" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center px-8 py-12 md:px-14 md:py-16">
            <div className="space-y-5">
              <motion.p
                className="text-sm font-semibold tracking-[0.35em] text-cardinal uppercase"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                A unit of Bhagwati Educational And Charitable Trust
              </motion.p>
              <motion.h2
                className="text-3xl md:text-5xl font-semibold text-midnight"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                Our Future Ahead
              </motion.h2>
              <motion.p
                className="text-lg text-midnight/80 leading-relaxed"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              >
                The Elden Heights School has been a beacon of learning and values. As we move forward into our next chapter, our goal remains unchanged — to nurture confident, capable, and creative learners ready for tomorrow. This transition marks the start of something extraordinary — modern infrastructure, digital innovation, and a renewed vision for every student.
              </motion.p>
              <motion.blockquote
                className="relative overflow-hidden rounded-2xl border border-gold/40 bg-white px-6 py-5 text-left text-midnight/80 shadow-md"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              >
                <span className="absolute -left-3 top-0 h-full w-1 bg-cardinal/70" aria-hidden="true" />
                <p className="text-xl font-garamond text-midnight">“The future belongs to those who prepare for it today.”</p>
              </motion.blockquote>
              {showLink && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center rounded-full bg-cardinal px-7 py-3 text-white font-semibold shadow-lg shadow-cardinal/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cardinal/25"
                  >
                    Read more about us
                  </Link>
                  <span className="text-sm uppercase tracking-[0.25em] text-cardinal/70">Towards Eternal Glory</span>
                </motion.div>
              )}
            </div>
            <div className="space-y-5 rounded-2xl border border-cardinal/15 bg-ivory p-6 shadow-md">
              <div className="flex items-center justify-between gap-4 border-b border-cardinal/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cardinal/70">Academic Ethos</p>
                  <p className="text-2xl font-semibold text-midnight">Excellence with Character</p>
                </div>
                <span className="rounded-full bg-cardinal/10 px-4 py-2 text-sm font-semibold text-cardinal">Heritage</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[['90%', 'Parent Trust'], ['Top 10', 'Regional Ranking'], ['No.1', 'Holistic Care']].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-white/90 px-3 py-4 shadow-sm shadow-cardinal/10">
                    <p className="text-2xl font-semibold text-cardinal">{value}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-midnight/70">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-sm text-midnight/80">
                <p className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
                  Heritage-inspired campus experiences blended with modern pedagogy.
                </p>
                <p className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
                  Guided pathways through Roots, Ascent, Radiance, and Eternity.
                </p>
                <p className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
                  Dedicated mentorship and personalized attention at every stage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
