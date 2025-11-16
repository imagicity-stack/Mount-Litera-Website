import Link from 'next/link';
import { motion } from 'framer-motion';

import { trackFacebookEvent } from '@/lib/facebookPixel';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-cardinal/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cardinal/20 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-red-50 text-cardinal font-semibold uppercase tracking-wide text-xs">
            Transitioning Forward
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-cardinal leading-tight">
            Mount Litera School is evolving into a new chapter.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We’re building a brighter, more dynamic future for our students — rooted in excellence and powered by change.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/admission"
              className="px-6 py-3 rounded-xl bg-cardinal text-white font-medium shadow-lg transition hover:bg-white hover:text-cardinal hover:shadow-xl border border-cardinal"
              onClick={() =>
                trackFacebookEvent('ViewContent', {
                  component: 'home_hero_explore_admissions',
                })
              }
            >
              Explore Admissions
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-cardinal/10 to-transparent pointer-events-none" />
    </section>
  );
}
