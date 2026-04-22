import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

const rideToRiseDetails = {
  overview:
    'The Ride to Rise Program is a limited student support initiative introduced to encourage responsibility, regular attendance, and commitment among newly admitted students.',
  implementation:
    'This program is implemented by Edenwoods Eduhub Foundation in collaboration with The Elden Heights School.',
  support:
    'Under this initiative, 25 cycles will be provided to selected newly admitted students as a gesture of motivation and support. The program is designed to reward seriousness towards school participation while maintaining clear rules and discipline.',
  eligibility: ['Newly admitted students', 'Students studying in Class 3 to Class 8'],
  eligibilityNote:
    'Participation is limited and subject to approval based on adherence to program guidelines.',
  conditions: [
    'Maintain minimum 85 percent attendance after admission',
    'Follow all school rules and discipline guidelines',
    'Use the cycle responsibly and only by the selected student'
  ],
  conditionsNote:
    'The support is conditional. If attendance or discipline requirements are not met, the cycle may be withdrawn as per program rules.',
  important: [
    'Only 25 cycles are available under this program',
    'Participation is not automatic for all admissions',
    'Selection is done after admission confirmation',
    'Meeting eligibility conditions does not guarantee selection',
    'Final approval rests with Edenwoods Eduhub Foundation'
  ],
  approach:
    'The program reflects our belief that student support should be structured, accountable, and purpose-driven — encouraging commitment and responsibility while ensuring institutional standards remain uncompromised.',
  finalLine: 'Limited support. Clear rules. Responsible students.'
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function NewInitiativesPage() {
  return (
    <>
      <Seo path="/new-initiatives" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="New Initiatives"
            subtitle="Fresh ideas and campus upgrades shaping the next phase of Elden Heights."
            eyebrow="Initiatives"
            image="/new-initiatives/banner-spark.jpg"
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
                <span className="eyebrow">New Initiatives</span>
                <h1 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                  Programs that <span className="italic">expand opportunity</span>.
                </h1>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  Our new initiatives highlight structured, purpose-driven programs that extend
                  access, accountability, and student responsibility beyond the classroom.
                </p>
              </motion.div>
            </div>
          </section>

          <section id="ride-to-rise" className="relative py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mb-10 space-y-3"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal">
                  New Initiative 01
                </span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl">
                  Ride to Rise.
                </h2>
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <motion.div
                  className="surface-card relative overflow-hidden rounded-[24px] p-8 md:p-10"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <h3 className="font-garamond text-2xl font-semibold text-midnight md:text-3xl">
                    A gesture of motivation and support.
                  </h3>
                  <span className="mt-4 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-midnight/80 md:text-lg">
                    <p>{rideToRiseDetails.overview}</p>
                    <p>{rideToRiseDetails.implementation}</p>
                    <p>{rideToRiseDetails.support}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-5"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <div className="surface-card rounded-[18px] p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                      Foundation Partner
                    </p>
                    <p className="mt-2 font-garamond text-lg text-midnight">
                      Edenwoods Eduhub Foundation
                    </p>
                  </div>
                  <div className="surface-card rounded-[18px] p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                      Who Can Be Considered
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-midnight/80">
                      {rideToRiseDetails.eligibility.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs italic text-midnight/60">{rideToRiseDetails.eligibilityNote}</p>
                  </div>
                  <div className="surface-card rounded-[18px] p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                      Program Conditions
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-midnight/80">
                      {rideToRiseDetails.conditions.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs italic text-midnight/60">{rideToRiseDetails.conditionsNote}</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <motion.div
                  className="surface-card rounded-[24px] p-8"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h4 className="font-garamond text-xl font-semibold text-midnight">
                    Important Information
                  </h4>
                  <span className="mt-3 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                  <ul className="mt-4 space-y-2 text-sm text-midnight/80">
                    {rideToRiseDetails.important.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gradient-to-br from-gold to-cardinal" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  className="surface-card rounded-[24px] p-8"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <h4 className="font-garamond text-xl font-semibold text-midnight">Our Approach</h4>
                  <span className="mt-3 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                  <p className="mt-4 text-sm leading-relaxed text-midnight/80">
                    {rideToRiseDetails.approach}
                  </p>
                </motion.div>
              </div>

              <div className="relative mt-10 overflow-hidden rounded-[28px] surface-card-dark p-10 text-center text-parchment md:p-14">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <p className="font-garamond text-2xl italic text-gold-200 md:text-3xl">
                  {rideToRiseDetails.finalLine}
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
