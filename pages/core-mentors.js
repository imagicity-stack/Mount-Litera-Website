import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import PersonCard from '@/components/people/PersonCard';
import usePeople from '@/lib/usePeople';
import { byDepartment } from '@/lib/peopleGroups';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function CoreMentorsPage() {
  const { people } = usePeople('mentors');
  const departments = byDepartment('mentors', people);

  return (
    <>
      <Seo path="/core-mentors" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Core Mentors"
            subtitle="Meet the educators and guides shaping every learner&rsquo;s journey."
            eyebrow="Leadership &amp; Faculty"
            slot="people.mentors"
          />

          <section className="relative py-20 md:py-24">
            <div className="shell max-w-5xl text-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <span className="eyebrow">Experience · Empathy · Excellence</span>
                <h2 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  Educators who <span className="italic">guide, not just teach</span>.
                </h2>
                <span className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-midnight/75 md:text-lg">
                  The Elden Heights School is guided by dedicated mentors who bring experience,
                  empathy, and excellence to every classroom and activity.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="relative py-10 md:py-16">
            <div className="shell">
              <div className="hidden space-y-16 md:block">
                {departments.map((group, gIdx) => (
                  <motion.div
                    key={group.department}
                    className="space-y-7"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.4em] text-cardinal">
                        {String(gIdx + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                      <h2 className="font-garamond text-2xl font-semibold text-midnight md:text-3xl">
                        {group.department}
                      </h2>
                      <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-midnight/50">
                        {group.mentors.length} {group.mentors.length === 1 ? 'Member' : 'Members'}
                      </span>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {group.mentors.map((mentor, mIdx) => (
                        <PersonCard key={mentor.id} person={mentor} index={mIdx} ratio="4/5" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-12 md:hidden">
                {departments.map((group) => (
                  <div key={`${group.department}-mobile`} className="space-y-4">
                    <div className="flex items-center gap-3 px-1">
                      <span className="h-px w-8 bg-gold" />
                      <h3 className="font-garamond text-xl font-semibold text-midnight">
                        {group.department}
                      </h3>
                    </div>
                    <div className="-mx-6 overflow-x-auto px-6">
                      <div className="flex snap-x snap-mandatory gap-4 pb-2">
                        {group.mentors.map((mentor) => (
                          <div key={mentor.id} className="w-60 flex-shrink-0 snap-center">
                            <PersonCard person={mentor} ratio="4/5" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
