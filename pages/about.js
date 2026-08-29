import Link from 'next/link';
import { motion } from 'framer-motion';

import About from '@/components/About';
import ImageBanner from '@/components/ImageBanner';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import SubNav from '@/components/SubNav';
import { sectionNav } from '@/lib/sectionNav';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/sections/SectionHeader';
import SplitFeature from '@/components/sections/SplitFeature';
import FeatureBand from '@/components/sections/FeatureBand';
import SiteImage from '@/components/media/SiteImage';
import ImageReveal from '@/components/motion/ImageReveal';
import useContent from '@/lib/useContent';

const policies = [
  { title: 'Disability Policy', href: '/policies/disability-policy' },
  { title: 'Code for Self-Discipline', href: '/policies/code-for-self-discipline' },
  { title: 'Anti-Ragging Message', href: '/policies/anti-ragging-message' },
  { title: 'Parent Child Contact Mechanism', href: '/policies/parent-child-contact-mechanism' },
  { title: 'Complaint Procedures', href: '/policies/complaint-procedures' }
];

const leadershipCards = [
  {
    href: '/the-elden-council',
    label: 'The Elden Council',
    caption: 'Trustees who steward our legacy and long-term vision.'
  },
  {
    href: '/core-mentors',
    label: 'Core Mentors',
    caption: 'Teachers and guides shaping every learner&rsquo;s journey.'
  },
  {
    href: '/managing-committee',
    label: 'Managing Committee',
    caption: 'Operational leadership ensuring our vision stays bold.'
  }
];

const leadershipPhotos = {
  principal: { slot: 'about.principal', name: 'R.K. Singh', role: 'Principal' },
  managingDirector: {
    slot: 'about.director',
    name: 'Mr. Shashi Shankar Prasad',
    role: 'Managing Director'
  }
};



const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

function LeaderNote({ id, title, image, author, paragraphs }) {
  return (
    <motion.article
      id={id}
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14 lg:items-start"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gold" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-cardinal">
            {title}
          </span>
        </div>
        <h2 className="font-garamond text-3xl font-semibold leading-[1.1] text-midnight sm:text-4xl md:text-[42px]">
          A letter to <span className="italic">every parent</span>.
        </h2>
        <div className="space-y-5 pt-2 text-base leading-relaxed text-midnight/80 md:text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-2">
          <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
          <p className="font-garamond text-lg italic text-midnight">— {author}</p>
        </div>
      </div>
      <div className="order-first lg:order-last">
        <ImageReveal>
          <SiteImage slot={image.slot} sizes="(min-width: 1024px) 340px, 80vw" />
        </ImageReveal>
        <p className="mt-4 font-display text-lg text-midnight">{image.name}</p>
        <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
          {image.role}
        </p>
      </div>
    </motion.article>
  );
}

export default function AboutPage() {
  const { items: missionStages } = useContent('missionStages');
  const { items: leadershipNotes } = useContent('leadershipNotes');

  return (
    <>
      <Seo path="/about" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <SubNav section={sectionNav.about.section} links={sectionNav.about.links} />
        <main className="flex-1">
          <ImageBanner
            title="About The Elden Heights"
            subtitle="A visual journey through our ethos, leadership, and the legacy we are building."
            eyebrow="About · Est. Heritage"
            slot="about.banner"
          />

          <About showLink={false} imageSlot="about.vision" heading="The Ethos Behind Elden Heights" />

          <section className="relative py-20 md:py-28">
            <div className="shell">
              <SectionHeader
                eyebrow="Leadership & Governance"
                title="Guided by those who believe in the long view"
                lede="Explore the voices and councils that guide The Elden Heights School. Each pillar offers a deeper look at our philosophy, mentors, and stewardship."
              />

              <SplitFeature
                slot="about.leadership"
                eyebrow="How the school is led"
                title="Four groups, one standard"
                className="mt-14 md:mt-16"
                points={[
                  'The Elden Council — trustees who steward the long-term vision.',
                  'The Principal — accountable for daily academic life.',
                  'Core Mentors — the teachers who know every child by name.',
                  'The Managing Committee — operations, safety, and infrastructure.'
                ]}
              >
                <p>
                  Governance here is deliberately close to the classroom. The people who set the
                  standards are the same people parents meet at the gate, and every one of the four
                  groups below answers for a specific part of your child&rsquo;s experience.
                </p>
              </SplitFeature>

              <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {leadershipCards.map((card, idx) => (
                  <motion.div
                    key={card.href}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                  >
                    <Link
                      href={card.href}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment p-8 transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />

                      <div>
                        <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                          Pillar {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="mt-3 font-garamond text-2xl font-semibold leading-tight text-midnight">
                          {card.label}
                        </h3>
                        <p
                          className="mt-3 text-sm leading-relaxed text-midnight/70"
                          dangerouslySetInnerHTML={{ __html: card.caption }}
                        />
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                        <span className="ml-4 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-midnight/55 transition-colors group-hover:text-cardinal">
                          Explore
                          <span className="transition-transform duration-400 group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative py-20 md:py-28">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="mx-auto max-w-6xl space-y-24 px-6">
              {leadershipNotes.map((note) => (
                <LeaderNote
                  key={note.key}
                  id={note.key}
                  title={note.heading}
                  image={
                    note.key === 'md-note'
                      ? leadershipPhotos.managingDirector
                      : leadershipPhotos.principal
                  }
                  author={note.author}
                  paragraphs={note.paragraphs}
                />
              ))}
            </div>
          </section>

          <FeatureBand
            slot="about.mission"
            eyebrow="Mission & Vision"
            title="Roots deep enough to hold. Wings wide enough to soar."
            body="Four stages carry a child from their first day here to their last — and the promise behind each one is the same."
          />

          <section id="mission-vision" className="relative py-20 md:py-28">
            <div className="shell">
              <div className="relative overflow-hidden rounded-none surface-card-dark text-parchment">
                <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cardinal/25 blur-[120px]" />
                <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-gold/15 blur-[120px]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

                <div className="relative grid gap-12 px-8 py-14 md:grid-cols-[1fr_1.1fr] md:px-14 md:py-20">
                  <motion.div
                    className="space-y-6"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="eyebrow eyebrow-dark">Mission &amp; Vision</span>
                    <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-parchment sm:text-5xl md:text-[52px]">
                      Towards <span className="gold-text italic">Eternal Glory</span>.
                    </h2>
                    <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                    <p className="text-base leading-relaxed text-parchment/80 md:text-lg">
                      The Elden Heights School stands as a citadel of heritage and aspiration — where
                      education is not the mere transfer of knowledge but the cultivation of greatness
                      across generations.
                    </p>
                    <p className="text-base leading-relaxed text-parchment/75">
                      Our emblem translates this philosophy into form. The eagle, sovereign and
                      unyielding, represents the will to soar above the ordinary. The torch, burning
                      eternal, signifies the undimmed pursuit of truth. The four wings mirror the
                      cardinal stages of a student&rsquo;s passage — Roots, Ascent, Radiance, and Eternity.
                    </p>
                    <p className="font-garamond text-lg italic text-parchment/85">
                      More than an institution — an enduring passage to greatness.
                    </p>
                  </motion.div>

                  <motion.div
                    className="space-y-4"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  >
                    {missionStages.map((stage, idx) => (
                      <div
                        key={stage.title}
                        className="group flex gap-5 rounded-2xl border border-parchment/10 bg-white/5 p-5 backdrop-blur transition-all duration-400 hover:border-gold/40 hover:bg-white/10"
                      >
                        <div className="flex-shrink-0 text-center">
                          <span className="font-garamond text-3xl font-semibold text-gold-300">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div className="mt-1 h-px w-6 bg-gold/40" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-garamond text-2xl font-semibold leading-tight text-parchment">
                            {stage.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-parchment/70">{stage.copy}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative py-20 md:py-28">
            <div className="shell max-w-5xl">
              <motion.div
                className="mb-12 flex flex-col items-center text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Principles &amp; Policies</span>
                <h2 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[52px]">
                  The values &amp; safeguards that <span className="italic">guide us</span>.
                </h2>
                <span className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="mt-6 max-w-2xl text-midnight/75 md:text-lg">
                  Our policies reflect the values and safeguards that guide The Elden Heights
                  School — protecting and supporting our students, parents, and staff community.
                </p>
              </motion.div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {policies.map((policy, idx) => (
                  <li key={policy.href}>
                    <Link
                      href={policy.href}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-midnight/10 bg-white/80 px-6 py-5 backdrop-blur transition-all duration-400 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_20px_40px_-20px_rgba(10,10,12,0.2)]"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-garamond text-sm font-semibold text-cardinal/70">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-garamond text-lg font-semibold text-midnight">
                          {policy.title}
                        </span>
                      </div>
                      <span className="text-gold transition-transform duration-400 group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
