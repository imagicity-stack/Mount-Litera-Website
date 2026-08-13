import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import { HOUSES, getHouseBySlug } from '@/lib/housesData';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function HouseDetailPage({ house }) {
  if (!house) {
    return (
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="surface-card max-w-xl space-y-4 rounded-none p-12 text-center">
            <span className="eyebrow justify-center">404</span>
            <h1 className="font-garamond text-3xl font-semibold text-midnight md:text-4xl">
              House not found.
            </h1>
            <p className="text-midnight/70">
              The house you are looking for is unavailable. Return to the houses overview.
            </p>
            <div className="pt-2">
              <Link href="/houses" className="btn-primary">Back to Houses</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const otherHouses = HOUSES.filter((entry) => entry.slug !== house.slug);

  return (
    <>
      <Seo path={`/houses/${house.slug}`} />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title={`${house.name} House`}
            subtitle={`${house.animal} · ${house.tagline}`}
            eyebrow="House of Elden Heights"
            slot="houses.feature"
          />

          <section className="relative py-20 md:py-28">
            <div className="shell">
              <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <motion.div
                  className="relative mx-auto w-full max-w-md"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="surface-card relative overflow-hidden rounded-none p-10">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                    <div className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full bg-gold/15 blur-[100px]" />
                    <div className="relative aspect-square w-full">
                      <Image
                        src={house.crest}
                        alt={`${house.name} house crest`}
                        fill
                        sizes="(max-width: 768px) 80vw, 400px"
                        className="object-contain p-2"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-5"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <span className="eyebrow">{house.tagline}</span>
                  <h1 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                    {house.name}
                    <span className="block font-garamond text-2xl font-normal italic text-midnight/60 sm:text-3xl">
                      Inspired by the {house.animal}
                    </span>
                  </h1>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                  <p className="font-garamond text-2xl italic text-cardinal">
                    &ldquo;{house.motto}&rdquo;
                  </p>
                  <p className="text-base leading-relaxed text-midnight/80 md:text-lg">
                    {house.essence}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {house.virtues.map((virtue) => (
                      <span key={virtue} className="chip">{virtue}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="relative bg-gradient-to-b from-parchment/40 via-white to-parchment/40 py-20 md:py-24">
            <div className="mx-auto max-w-4xl px-6">
              <motion.div
                className="mb-10 space-y-4"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">The Meaning Behind the Name</span>
                <h2 className="font-garamond text-3xl font-semibold leading-tight text-midnight md:text-4xl">
                  Why we call this house <span className="italic">{house.name}</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </motion.div>
              <div className="space-y-6 text-base leading-relaxed text-midnight/80 md:text-lg">
                {house.paragraphs.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.05 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </section>

          <section className="relative py-20 md:py-28">
            <div className="shell max-w-5xl">
              <motion.div
                className="mb-12 text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow justify-center">House Leadership</span>
                <h2 className="mt-5 font-garamond text-3xl font-semibold leading-tight text-midnight md:text-4xl">
                  Those who carry the <span className="italic">{house.name}</span> standard.
                </h2>
                <span className="mx-auto mt-6 block h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2">
                <motion.article
                  className="group overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-midnight/5">
                    <Image
                      src={house.prefect.image}
                      alt={`${house.prefect.name}, House Prefect of ${house.name}`}
                      fill
                      sizes="(max-width: 768px) 90vw, 400px"
                      className="object-cover transition-transform duration-[1.2s] ease-elite group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="space-y-2 border-t border-midnight/10 bg-white/85 px-6 py-6 text-center backdrop-blur">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                      House Prefect
                    </p>
                    <p className="font-garamond text-2xl font-semibold leading-tight text-midnight">
                      {house.prefect.name}
                    </p>
                  </div>
                </motion.article>

                <motion.article
                  className="group overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-midnight via-graphite to-midnight">
                    <div className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full bg-gold/15 blur-[80px]" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-cardinal/20 blur-[80px]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                      <span className="font-garamond text-6xl font-semibold text-parchment">HM</span>
                      <span className="mt-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-parchment/60">
                        Portrait &nbsp;·&nbsp; Forthcoming
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-midnight/10 bg-white/85 px-6 py-6 text-center backdrop-blur">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                      House Master
                    </p>
                    <p className="font-garamond text-2xl font-semibold leading-tight text-midnight">
                      {house.houseMaster.name}
                    </p>
                  </div>
                </motion.article>
              </div>
            </div>
          </section>

          <section className="relative bg-gradient-to-b from-parchment/40 via-white to-parchment/40 py-20 md:py-24">
            <div className="shell">
              <motion.div
                className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="space-y-3">
                  <span className="eyebrow">Other Houses</span>
                  <h2 className="font-garamond text-2xl font-semibold text-midnight md:text-3xl">
                    Meet the rest of <span className="italic">the eight</span>.
                  </h2>
                </div>
                <Link href="/houses" className="btn-primary">
                  View All Houses
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </motion.div>

              <div className="-mx-6 overflow-x-auto px-6 pb-2">
                <div className="flex min-w-full snap-x snap-mandatory gap-4">
                  {otherHouses.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/houses/${entry.slug}`}
                      className="group flex w-[220px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-none border border-midnight/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(10,10,12,0.3)]"
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-midnight/5 to-parchment">
                        <Image
                          src={entry.crest}
                          alt={`${entry.name} house crest`}
                          fill
                          sizes="220px"
                          className="object-contain p-5 transition-transform duration-700 ease-elite group-hover:scale-[1.05]"
                        />
                      </div>
                      <div className="border-t border-midnight/10 px-4 py-4 text-center">
                        <p className="font-garamond text-lg font-semibold text-midnight">{entry.name}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cardinal">
                          {entry.animal}
                        </p>
                      </div>
                    </Link>
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

export async function getStaticPaths() {
  return {
    paths: HOUSES.map((house) => ({ params: { slug: house.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const house = getHouseBySlug(params.slug);

  if (!house) {
    return { notFound: true };
  }

  return {
    props: { house }
  };
}
