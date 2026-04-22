import Link from 'next/link';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

const pathways = [
  {
    title: 'Co-Curricular Clubs',
    href: '/co-curricular-clubs',
    tag: 'Initiative · 01',
    subtitle: 'Discover · Build · Express',
    body: 'Interest-based platforms help students explore their passions, develop soft skills, and express themselves beyond academics — discovering interests, building confidence, and shaping talent.',
    cta: 'View Clubs'
  },
  {
    title: 'Life Readiness Program',
    href: '/life-readiness-program',
    tag: 'Initiative · 02',
    subtitle: 'Practical · Progressive · Prepared',
    body: 'Preparing children for the real world through mandatory, progressive life skills. Practical competence and confident independence form the backbone of this program.',
    cta: 'View Program'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function BeyondAcademicsPage() {
  return (
    <>
      <Seo path="/beyond-academics" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Beyond Academics"
            subtitle="A gallery of clubs, leadership, and character-building experiences."
            eyebrow="Beyond"
            image="/beyond-academics/banner-odyssey.jpg"
          />

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
                <motion.div
                  className="space-y-5"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="eyebrow">Beyond the Textbook</span>
                  <h1 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                    Two clear pillars of <span className="italic">student development</span>.
                  </h1>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                  <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                    At our school, learning does not stop with textbooks. We follow a structured
                    approach that balances interest-driven exploration with essential life preparedness
                    — delivered through two distinct initiatives. Both serve different purposes. Both
                    are equally important. But they are not the same.
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
                  <span className="eyebrow">Access</span>
                  <h2 className="mt-4 font-garamond text-2xl font-semibold leading-tight text-midnight md:text-3xl">
                    Choose your <span className="italic">pathway</span>.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-midnight/75 md:text-base">
                    See how we nurture talent, confidence, and real-world readiness across the Elden
                    Heights journey.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="relative py-10 md:py-16">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid gap-6 md:grid-cols-2">
                {pathways.map((pathway, idx) => (
                  <motion.article
                    key={pathway.title}
                    className="surface-card group relative flex flex-col overflow-hidden rounded-[28px] p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/10 blur-[100px]" />

                    <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                      {pathway.tag}
                    </span>
                    <h3 className="mt-3 font-garamond text-3xl font-semibold leading-tight text-midnight md:text-[34px]">
                      {pathway.title}
                    </h3>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-midnight/60">
                      {pathway.subtitle}
                    </p>
                    <span className="mt-5 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                    <p className="mt-5 flex-1 text-base leading-relaxed text-midnight/75">
                      {pathway.body}
                    </p>
                    <div className="mt-7">
                      <Link href={pathway.href} className="btn-primary">
                        {pathway.cta}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
