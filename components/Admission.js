import Link from 'next/link';
import { motion } from 'framer-motion';

import ArrowLink from '@/components/ArrowLink';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const highlights = [
  { title: 'Curated mentorship', note: 'One-to-one academic and life counsel' },
  { title: 'Culture of excellence', note: 'Heritage, ethics, and achievement' },
  { title: 'Future-ready classrooms', note: 'Digital, collaborative, hands-on' }
];

export default function Admission() {
  return (
    <section id="admission" className="band-ink">
      <div className="shell py-20 md:py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 md:grid-cols-2 md:gap-16"
        >
          <h2 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-medium leading-[1.06] text-white">
            Admissions 2026 – 27
          </h2>

          <div className="flex flex-col items-start gap-8">
            <p className="text-base leading-relaxed text-white/80 md:text-lg">
              We are inviting new learners to join this journey. Read{' '}
              <Link href="/admission#why-choose-elden-heights" className="hv-link hv-link-light">
                why families choose Elden Heights
              </Link>
              , review the{' '}
              <Link href="/admission#fee-structure" className="hv-link hv-link-light">
                fee structure
              </Link>
              , and send us an{' '}
              <Link href="/admission#admission-inquiry" className="hv-link hv-link-light">
                admission inquiry
              </Link>
              .
            </p>

            <ArrowLink href="/admission" tone="light">
              Apply for admission
            </ArrowLink>
          </div>
        </motion.div>

        <span className="rule-heavy-light mt-14 md:mt-16" />

        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {highlights.map(({ title, note }) => (
            <div key={title}>
              <p className="font-display text-2xl font-medium text-white">{title}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{note}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-2 md:mt-16">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/55">
              Seats
            </p>
            <p className="mt-2 font-display text-3xl font-normal text-white">Limited</p>
          </div>
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/55">
              Curriculum
            </p>
            <p className="mt-2 font-display text-3xl font-normal text-white">CBSE affiliated</p>
          </div>
        </div>
      </div>
    </section>
  );
}
