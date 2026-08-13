import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

const clubs = [
  {
    name: 'Leadership & Student Council',
    description:
      'Develops leadership, responsibility, and decision making through assemblies, event planning, house activities, and school initiatives.',
    outcome: 'Confident speakers, responsible leaders, strong character.'
  },
  {
    name: 'Sports & Fitness',
    description:
      'Focuses on physical development, teamwork, and discipline with structured games, fitness routines, and intra-school sports activities.',
    outcome: 'Active lifestyle, teamwork, physical fitness, positive energy.'
  },
  {
    name: 'Creative Expression',
    description:
      'Umbrella platform for art, music, dance, and stage performance. Students explore creativity, perform during events, and elevate school aesthetics.',
    outcome: 'Confidence, self-expression, stage presence.'
  },
  {
    name: 'Language & Communication',
    description:
      'Strengthens speaking, reading, storytelling, and public communication in English and Hindi through debates, storytelling sessions, and presentations.',
    outcome: 'Improved communication, clarity of thought, confidence in expression.'
  },
  {
    name: 'Wellness & Yoga',
    description:
      'Centres on emotional balance, mindfulness, posture, breathing, and basic yoga practices to maintain calm and focus.',
    outcome: 'Emotional stability, improved focus, healthy habits.'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function CoCurricularClubsPage() {
  return (
    <>
      <Seo path="/co-curricular-clubs" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Co-Curricular Clubs"
            subtitle="Spaces for exploration, creativity, and student-led excellence."
            eyebrow="Clubs"
            image="/co-curricular-clubs/banner-spectrum.jpg"
          />

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Co-Curricular Clubs</span>
                <h1 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                  Discovering interests. <span className="italic">Building confidence.</span>
                </h1>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  Co-Curricular Clubs are interest-based platforms where students explore their
                  passions, develop soft skills, and express themselves beyond academics.
                  Participation is guided by student interest and age appropriateness.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="relative py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mb-10"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-garamond text-3xl font-semibold text-midnight md:text-4xl">
                  Clubs we&rsquo;re launching.
                </h2>
                <p className="mt-2 text-midnight/70">Purpose and outcomes clearly defined.</p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {clubs.map((club, idx) => (
                  <motion.article
                    key={club.name}
                    className="group relative overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                      Club {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-garamond text-2xl font-semibold leading-tight text-midnight">
                      {club.name}
                    </h3>
                    <span className="mt-4 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                    <p className="mt-4 text-sm leading-relaxed text-midnight/75">
                      {club.description}
                    </p>
                    <div className="mt-5 rounded-xl border border-gold/25 bg-gold/8 px-4 py-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cardinal">
                        Outcome for parents
                      </p>
                      <p className="mt-1 text-sm font-semibold text-midnight">{club.outcome}</p>
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
