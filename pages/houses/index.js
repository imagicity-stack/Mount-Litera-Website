import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import { HOUSES } from '@/lib/housesData';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function HousesPage() {
  return (
    <>
      <Seo path="/houses" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="The Eight Houses"
            subtitle="Tribes of belonging, leadership, and friendly rivalry — drawn from the animal kingdom."
            eyebrow="Houses"
            image="/beyond-academics/banner-odyssey.jpg"
          />

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mx-auto mb-16 max-w-3xl text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow justify-center">Inspired by the Animal Kingdom</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                  Eight houses. <span className="italic">One shared legacy</span>.
                </h1>
                <span className="mx-auto mt-6 block h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <div className="mt-6 space-y-4 text-base leading-relaxed text-midnight/80 md:text-lg">
                  <p>
                    Each Eldenite is welcomed into one of our eight houses — chosen with care so that
                    siblings, friendships, and family traditions remain woven through generations. The
                    houses are named after creatures of the animal kingdom whose virtues we ask every
                    student to recognise, study, and quietly embody.
                  </p>
                  <p>
                    From the sovereign Regalia to the wise Atlas, every house carries a distinct
                    character — and yet, all eight rise together as one Elden spirit. Click on a house
                    to meet its prefect, learn its motto, and discover the meaning behind the name.
                  </p>
                </div>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {HOUSES.map((house, idx) => (
                  <motion.div
                    key={house.slug}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (idx % 4) * 0.06 }}
                  >
                    <Link
                      href={`/houses/${house.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-midnight/10 bg-gradient-to-br from-white to-parchment transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-midnight/5 to-parchment">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                        <Image
                          src={house.crest}
                          alt={`${house.name} house crest`}
                          fill
                          sizes="(max-width: 768px) 50vw, 260px"
                          className="object-contain p-6 transition-transform duration-700 ease-elite group-hover:scale-[1.05]"
                        />
                      </div>
                      <div className="space-y-3 border-t border-midnight/10 bg-white/85 px-6 py-6 text-center backdrop-blur">
                        <p className="font-garamond text-2xl font-semibold leading-tight text-midnight">
                          {house.name}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cardinal">
                          {house.animal} · {house.tagline}
                        </p>
                        <p className="font-garamond text-sm italic text-midnight/70">
                          &ldquo;{house.motto}&rdquo;
                        </p>
                        <span className="inline-flex items-center gap-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold transition-colors group-hover:text-cardinal">
                          Enter House
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
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
