import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import SubNav from '@/components/SubNav';
import { sectionNav } from '@/lib/sectionNav';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import SplitFeature from '@/components/sections/SplitFeature';
import FeatureBand from '@/components/sections/FeatureBand';
import { HOUSES } from '@/lib/housesData';

const pillars = [
  {
    title: 'Houses & Belonging',
    description:
      'Eight houses inspired by the animal kingdom give every Eldenite a tribe — a place to lead, support, compete with grace, and discover who they are beyond the classroom.'
  },
  {
    title: 'Sports & Wellness',
    description:
      'Structured games, fitness, yoga, and inter-house tournaments shape a body that listens to a disciplined mind — and a mind that thrives in a healthy, energetic body.'
  },
  {
    title: 'Beyond Academics',
    description:
      'Interest-led clubs and the Life Readiness Program invite every learner to follow curiosity into mastery and prepare for the real world beyond the classroom.'
  }
];

const sports = [
  {
    name: 'Athletics & Track',
    description:
      'Sprints, relays, long-distance, and field events that build stamina, technique, and the unforgettable adrenaline of inter-house meets.'
  },
  {
    name: 'Football & Cricket',
    description:
      'Structured coaching, age-appropriate practice cycles, and competitive house leagues that teach teamwork, strategy, and sportsmanship.'
  },
  {
    name: 'Basketball & Volleyball',
    description:
      'Court games that develop quick decision-making, spatial awareness, vertical strength, and the joy of synchronised teamwork.'
  },
  {
    name: 'Badminton & Table Tennis',
    description:
      'Indoor disciplines that sharpen reflexes, hand-eye coordination, and one-on-one focus through ladder tournaments and clubs.'
  },
  {
    name: 'Yoga & Karate',
    description:
      'Breath, posture, mindful movement, and the disciplined art of self-defence — practices that calm the mind as they strengthen the body.'
  },
  {
    name: 'Chess & Mind Sports',
    description:
      'Strategic thinking, patience, and pattern recognition cultivated through chess, carrom, and brain-game tournaments throughout the year.'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function StudentsLifePage() {
  return (
    <>
      <Seo path="/students-life" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <SubNav section={sectionNav.studentsLife.section} links={sectionNav.studentsLife.links} />
        <main className="flex-1">
          <ImageBanner
            title="Student's Life"
            subtitle="Houses that build belonging. Sports that build character. A life that goes beyond the classroom."
            eyebrow="Beyond the Classroom"
            slot="students.banner"
          />

          <section className="band-white">
            <div className="shell py-20 md:py-28">
              <SplitFeature
                slot="students.houses"
                eyebrow="Houses"
                title="Eight houses, one shared legacy"
                points={[
                'Siblings are placed in the same house.',
                'House prefects are elected by students.',
                'Inter-house events run through the whole year.'
                ]}
              >
                <p>Every Eldenite belongs to a house from their first day — chosen so siblings and family traditions stay woven through generations. Houses compete, but more importantly they give every child a smaller group to belong to.</p>
              </SplitFeature>
            </div>
          </section>

          <section className="relative py-20 md:py-28">
            <div className="shell">
              <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-start">
                <motion.div
                  className="space-y-5"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="eyebrow">Life at The Elden Heights</span>
                  <h1 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                    Where learners become <span className="italic">Eldenites</span>.
                  </h1>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                  <div className="space-y-4 text-base leading-relaxed text-midnight/75 md:text-lg">
                    <p>
                      At The Elden Heights School, life beyond the classroom is not an afterthought —
                      it is where character is forged. From the moment a child is welcomed into one of
                      our eight houses, they begin a journey of belonging, leadership, and lifelong
                      friendship that shapes them as deeply as any subject they will ever study.
                    </p>
                    <p>
                      Student&rsquo;s Life at Elden Heights is built around three pillars — Houses,
                      Sports, and the world Beyond Academics — each designed to draw out what is
                      uniquely promising in a learner. Whether on the field, the stage, or the quiet
                      corridors of leadership, every Eldenite discovers their voice, their team, and
                      their place in a tradition they will one day pass on.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="surface-card relative overflow-hidden rounded-none p-8"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <span className="eyebrow">Three Pillars</span>
                  <h2 className="mt-4 font-garamond text-2xl font-semibold leading-tight text-midnight md:text-3xl">
                    Belonging. <span className="italic">Body. Voice.</span>
                  </h2>
                  <ul className="mt-6 space-y-5">
                    {pillars.map((pillar) => (
                      <li key={pillar.title} className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cardinal">
                          {pillar.title}
                        </p>
                        <p className="text-sm leading-relaxed text-midnight/75">{pillar.description}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="houses" className="relative bg-gradient-to-b from-parchment/50 via-white to-parchment/50 py-20 md:py-28">
            <div className="shell">
              <motion.div
                className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="max-w-2xl space-y-4">
                  <span className="eyebrow">The Eight Houses</span>
                  <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                    Eight tribes, <span className="italic">one Elden spirit</span>.
                  </h2>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                  <p className="text-base leading-relaxed text-midnight/75">
                    Every Eldenite belongs to one of eight houses, each named for a creature of the
                    animal kingdom whose virtues we aspire to embody. The houses are the heartbeat of
                    student life — the place where leadership is practised, friendships are forged,
                    and healthy rivalry sharpens character.
                  </p>
                </div>
                <Link href="/houses" className="btn-primary self-start md:self-end">
                  Explore All Houses
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </motion.div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {HOUSES.map((house, idx) => (
                  <motion.div
                    key={house.slug}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (idx % 4) * 0.05 }}
                  >
                    <Link
                      href={`/houses/${house.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-midnight/5 to-parchment">
                        <Image
                          src={house.crest}
                          alt={`${house.name} house crest`}
                          fill
                          sizes="(max-width: 768px) 50vw, 260px"
                          className="object-contain p-6 transition-transform duration-700 ease-elite group-hover:scale-[1.05]"
                        />
                      </div>
                      <div className="space-y-2 border-t border-midnight/10 bg-white/80 px-5 py-5 text-center backdrop-blur">
                        <p className="font-garamond text-xl font-semibold leading-tight text-midnight">
                          {house.name}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                          {house.animal}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="sports" className="relative py-20 md:py-28">
            <div className="shell">
              <motion.div
                className="mb-14 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Sports</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  A disciplined body. <span className="italic">A focused mind</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  Sport at Elden Heights is not an extra. It is essential — the place where teamwork is
                  learned in real time, where defeat teaches what success cannot, and where every child
                  discovers a healthier, stronger version of themselves. From house leagues to inter-school
                  meets, our programmes are built around participation first and excellence next.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sports.map((sport, idx) => (
                  <motion.article
                    key={sport.name}
                    className="group relative overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (idx % 3) * 0.08 }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                      Sport {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-garamond text-2xl font-semibold leading-tight text-midnight">
                      {sport.name}
                    </h3>
                    <span className="mt-4 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                    <p className="mt-4 text-sm leading-relaxed text-midnight/75">{sport.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>


          <FeatureBand
            slot="students.sports"
            eyebrow="Sport"
            title="Character is built on the field as much as in the classroom"
            body="Explore the houses and what each one stands for."
            link="/houses"
            linkLabel="Meet the eight houses"
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
