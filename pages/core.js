import Link from 'next/link';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

const coreSections = [
  {
    title: 'Awards and Recognition',
    description:
      'Discover the honours that celebrate excellence, integrity, leadership, and growth across The Elden Heights.',
    href: '/awards-and-recognition',
    cta: 'View Awards',
    image: '/website/images/awards%20and%20recognitions.png',
    imageAlt: 'Students receiving awards and recognitions'
  },
  {
    title: 'Beyond Academics',
    description:
      'Explore the dual pathways — Co-Curricular Clubs and the Life Readiness Program — that shape confident, well-rounded Eldenites.',
    href: '/beyond-academics',
    cta: 'Explore',
    image: '/website/images/beyond%20academics.png',
    imageAlt: 'Students participating in beyond academics activities'
  }
];

const accreditationItems = [
  {
    title: 'Bhagwati Educational & Charitable Trust',
    detail: 'Registered Trust Stewardship',
    description:
      'The Elden Heights operates under the Bhagwati Educational & Charitable Trust, ensuring transparent governance and responsible oversight.'
  },
  {
    title: 'CBSE-Aligned Academic Framework',
    detail: 'Affiliation Readiness',
    description:
      'Curriculum, safety, and operational protocols are structured to meet CBSE norms with ongoing audits to maintain compliance.'
  },
  {
    title: 'Safety & Child Protection Compliance',
    detail: 'Annual Policy Review',
    description:
      'Safeguarding standards are reviewed each year across transport, campus security, and classroom practices to uphold student well-being.'
  },
  {
    title: 'Operational Excellence Standards',
    detail: 'Process Documentation',
    description:
      'ISO-ready documentation practices guide academic, administrative, and facility workflows for consistent quality delivery.'
  },
  {
    title: 'Sports & Co-Curricular Recognition',
    detail: 'District & Intra-School Certifications',
    description:
      'Teams participate in certified events with documented coaching plans, fair-play pledges, and safety protocols.'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function CorePage() {
  return (
    <>
      <Seo path="/core" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Core Philosophy"
            subtitle="The pillars that define culture, learning, and leadership at Elden Heights."
            eyebrow="Core"
            image="/core/banner-foundation.jpg"
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
                  <span className="eyebrow">Core Pillars</span>
                  <h1 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                    Legacy. Discipline. <span className="italic gold-text">Distinction.</span>
                  </h1>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                  <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                    The Core space gathers the honours that safeguard our heritage and celebrate
                    disciplined growth. Explore the recognitions that uphold The Elden Heights ethos.
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
                  <span className="eyebrow">Essence</span>
                  <h2 className="mt-4 font-garamond text-2xl font-semibold leading-tight text-midnight md:text-3xl">
                    Recognition with <span className="italic">purpose</span>.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-midnight/75 md:text-base">
                    Every accolade and leadership body exists to preserve dignity, scarcity, and
                    accountability — ensuring the Elden standard remains uncompromised.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="relative py-20 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mb-14 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Core Sections</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  Two chapters, <span className="italic">one ethos</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </motion.div>

              <div className="space-y-8">
                {coreSections.map((section, idx) => (
                  <motion.article
                    key={section.title}
                    className="surface-card group relative overflow-hidden rounded-[28px]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <div
                      className={`grid items-stretch gap-0 md:grid-cols-[1.1fr_0.9fr] ${
                        idx % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''
                      }`}
                    >
                      <div className="space-y-5 p-10 md:p-12">
                        <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                          Section {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-garamond text-3xl font-semibold leading-tight text-midnight md:text-4xl">
                          {section.title}
                        </h3>
                        <span className="block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                        <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                          {section.description}
                        </p>
                        <div>
                          <Link href={section.href} className="btn-primary">
                            {section.cta}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                      <div className="img-zoom relative min-h-[260px] overflow-hidden bg-ivory md:min-h-full">
                        <img
                          src={section.image}
                          alt={section.imageAlt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-midnight/20 via-transparent to-transparent" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="accreditation" className="relative py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="space-y-4">
                  <span className="eyebrow">Accreditation</span>
                  <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                    Standards, trust, <span className="italic">and compliance</span>.
                  </h2>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                </div>
                <p className="max-w-md text-sm leading-relaxed text-midnight/70">
                  The honours, registrations, and certifications that underpin The Elden Heights
                  School&rsquo;s operations and commitments.
                </p>
              </motion.div>

              <div className="-mx-6 overflow-x-auto px-6 pb-2">
                <div className="flex min-w-full snap-x snap-mandatory gap-5">
                  {accreditationItems.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      className="group flex min-w-[280px] snap-start flex-col gap-3 rounded-[22px] border border-midnight/10 bg-gradient-to-br from-white to-parchment p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(10,10,12,0.3)] md:min-w-[320px]"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.06 }}
                    >
                      <span className="font-garamond text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                        Accolade {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-garamond text-xl font-semibold leading-tight text-midnight">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-midnight/65">
                        {item.detail}
                      </p>
                      <span className="h-px w-12 bg-gradient-to-r from-gold/40 to-transparent" />
                      <p className="text-sm leading-relaxed text-midnight/75">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
