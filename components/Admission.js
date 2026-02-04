import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function Admission() {
  return (
    <section id="admission" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="overflow-hidden rounded-3xl border border-black/20 bg-white shadow-xl">
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              className="space-y-6 p-10 md:p-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-midnight">Admissions Open for 2026–27</h2>
              <p className="text-lg text-midnight/80 leading-relaxed">
                We’re inviting new learners to join this journey of transformation. The systems you see today are evolving into a bold,
                modern learning experience designed for the next generation.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-midnight/70">
                {['Curated mentorship', 'Culture of excellence', 'Future-ready classrooms'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full bg-cardinal/10 px-3 py-2 font-semibold text-black">
                    <span className="h-1.5 w-1.5 rounded-full bg-cardinal" />
                    {item}
                  </span>
                ))}
              </div>
              <div>
                <Link
                  href="/admission"
                  className="inline-flex items-center gap-2 rounded-full bg-cardinal px-7 py-3 text-base font-semibold text-white shadow-lg shadow-cardinal/25 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Begin your application
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-4-4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="relative h-full w-full overflow-hidden bg-ivory"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/home/admission-archway.jpg')" }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-midnight/20 backdrop-blur-[2px]" aria-hidden="true" />
              <div className="relative flex h-full items-center justify-center p-10">
                <div className="rounded-2xl border border-white/40 bg-white/85 p-8 text-center shadow-md backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.3em] text-black">Exclusive Entry</p>
                  <p className="mt-3 text-2xl font-semibold text-midnight font-garamond">The Elden Heights School</p>
                  <p className="mt-2 text-midnight/70">Limited seats crafted for families seeking an elite, heritage-inspired education.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
