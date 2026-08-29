import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

import ArrowLink from '@/components/ArrowLink';
import SiteImage from '@/components/media/SiteImage';
import Parallax from '@/components/motion/Parallax';
import Reveal from '@/components/motion/Reveal';
import useContent from '@/lib/useContent';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};



export default function Hero() {
  const reduce = useReducedMotion();
  const { items: facts } = useContent('keyFacts');

  return (
    <>
      <section id="hero" className="relative isolate overflow-hidden bg-obsidian text-white">
        <Parallax className="absolute inset-0" distance={50} overscan={10}>
          <SiteImage
            slot="home.hero"
            fill
            priority
            imgClassName={reduce ? '' : 'animate-slow-pan'}
            sizes="100vw"
          />
        </Parallax>

        <div
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/45"
          aria-hidden="true"
        />

        <div className="shell relative flex min-h-[78vh] flex-col justify-end pb-16 pt-28 md:min-h-[86vh] md:pb-20 md:pt-40">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.05 }}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/75"
            >
              The Elden Heights School · Hazaribagh
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-medium leading-[1.05] tracking-[-0.015em] text-white"
            >
              A heritage of excellence,
              <br className="hidden sm:block" /> refined for tomorrow
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
            >
              Rigorous academics, cultivated character, and future-ready learning — brought
              together on one campus, for every child from UKG through Class&nbsp;X.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10"
            >
              <ArrowLink href="/admission" tone="light">
                Begin your admission
              </ArrowLink>
              <Link href="/about" className="hv-link hv-link-light">
                Discover the school
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="band-white">
        <div className="shell py-14 md:py-16">
          <span className="rule-heavy" />
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {facts.map(({ id, figure, label, caption }, index) => (
              <Reveal key={id} index={index} y={18} duration={0.7}>
                <dt className="stat-figure">{figure}</dt>
                <dd>
                  <p className="stat-label">{label}</p>
                  <p className="mt-1 text-sm text-ink-muted">{caption}</p>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
