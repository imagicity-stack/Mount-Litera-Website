import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import About from '@/components/About';
import ImageBanner from '@/components/ImageBanner';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  principal: {
    src: '/teachers/principal.png',
    alt: 'R.K. Singh, Principal'
  },
  managingDirector: {
    src: '/teachers/shashi-shankar-prasad.jpg',
    alt: 'Mr. Shashi Shankar Prasad, Managing Director'
  }
};

const missionStages = [
  { title: 'Roots', copy: 'The foundation — where discipline, virtue, and cultural heritage are instilled. The child is grounded like the roots of an ancient tree, drawing strength from values that endure.' },
  { title: 'Ascent', copy: 'With firm ground, the learner begins to rise. Exploration, resilience, and intellectual awakening. A spirit that questions, seeks, and climbs with dignity toward truth.' },
  { title: 'Radiance', copy: 'As wisdom matures, the individual begins to illuminate. Talents unfold, leadership emerges. Students radiate creativity, innovation, and excellence.' },
  { title: 'Eternity', copy: 'The pinnacle — where learning transcends achievement and becomes legacy. The Eldenite embodies purpose, virtue, and vision that echo through generations.' }
];

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
      <div className="relative order-first lg:order-last">
        <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-gold/20 via-transparent to-cardinal/15 blur-2xl" />
        <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] border border-gold/25 bg-parchment shadow-[0_40px_80px_-40px_rgba(10,10,12,0.4)]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 340px, 80vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-gold/30 bg-midnight/70 px-4 py-3 text-center backdrop-blur">
            <p className="font-garamond text-sm italic text-parchment">{image.alt.split(',')[0]}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-300">
              {image.alt.split(',')[1]}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function AboutPage() {
  return (
    <>
      <Seo path="/about" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="About The Elden Heights"
            subtitle="A visual journey through our ethos, leadership, and the legacy we are building."
            eyebrow="About · Est. Heritage"
            image="/about/banner-aurora.jpg"
          />

          <About showLink={false} imagePrefix="about" heading="The Ethos Behind Elden Heights" />

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Leadership &amp; Governance</span>
                <h2 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[52px]">
                  Guided by those who believe in <span className="italic">the long view</span>.
                </h2>
                <span className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="mt-6 text-base leading-relaxed text-midnight/75 md:text-lg">
                  Explore the voices and councils that guide The Elden Heights School. Each pillar
                  offers a deeper look at our philosophy, mentors, and stewardship.
                </p>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-midnight/10 bg-gradient-to-br from-white to-parchment p-8 transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
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

          <section className="relative py-24 md:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="mx-auto max-w-6xl space-y-24 px-6">
              <LeaderNote
                id="principal-note"
                title="Note from the Principal"
                image={leadershipPhotos.principal}
                author="R.K. Singh"
                paragraphs={[
                  'At The Elden Heights, our vision is straightforward. Every child who walks into this campus should discover who they are and what they can become. We focus on strong academics, clear values and a learning environment that pushes students to think, question and grow with confidence.',
                  'Our four-stage philosophy — Roots, Ascent, Radiance and Eternity — guides each student through a journey that builds discipline, curiosity, communication and leadership. These are not just words on a brochure. These are practices we apply in classrooms, activities and daily interactions.',
                  'We combine a heritage-inspired culture with modern teaching methods. Students learn to stay grounded while being prepared for a world that is changing fast. They learn to work hard, make responsible choices and take pride in their growth.',
                  'My commitment as the Principal is to maintain a school where learning feels purposeful, teachers stay motivated and parents feel assured about their child’s future. This is a shared responsibility and at Elden Heights, we take it seriously.',
                  'Your child deserves a school that believes in their potential and helps them rise towards it every day. That is the promise of The Elden Heights.'
                ]}
              />
              <LeaderNote
                id="md-note"
                title="Note from the Managing Director"
                image={leadershipPhotos.managingDirector}
                author="Mr. Shashi Shankar Prasad"
                paragraphs={[
                  'The Elden Heights was built with one clear intention. To create a school that doesn’t just teach students, but shapes their entire life trajectory. We are not here to copy the standard school model. We are here to raise the benchmark for what education should feel like in our city and beyond.',
                  'Every decision we make — infrastructure, teachers, culture, systems, activities — reflects one thought. Will this help a child grow into a stronger human being? If the answer is no, we don’t do it. Simple.',
                  'Our four-stage philosophy — Roots, Ascent, Radiance and Eternity — is at the core of everything. It ensures our students begin with strong foundations, rise with discipline, express themselves with confidence and eventually step out as capable young adults who can face a complex world with clarity.',
                  'We are building a school culture that values effort over shortcuts, character over noise and long-term growth over temporary wins. The goal is not just good results. The goal is responsible, confident and well-rounded individuals.',
                  'As the director, my responsibility is to ensure that this institution stays true to its purpose, evolves with time and continues to offer an environment where students, teachers and parents feel aligned towards a shared future.',
                  'The Elden Heights is not just a school. It is a journey of becoming. And we are committed to walking that journey with every child who joins us.'
                ]}
              />
            </div>
          </section>

          <section id="mission-vision" className="relative py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <div className="relative overflow-hidden rounded-[32px] surface-card-dark text-parchment">
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

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
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
