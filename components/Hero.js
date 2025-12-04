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
      className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-white via-cardinal/5 to-white overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-cardinal/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cardinal/20 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-10"
        >
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-cardinal/20 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cardinal shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cardinal" />
            Heritage, Reimagined
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-cardinal leading-tight">
            The Elden Heights School is evolving into a new chapter.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            A prestigious learning destination blending timeless values with future-ready innovation. Discover refined spaces,
            premium faculty guidance, and a culture that nurtures confidence, creativity, and character.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/admission"
              className="px-6 py-3 rounded-xl bg-cardinal text-white font-semibold shadow-lg transition hover:bg-white hover:text-cardinal hover:shadow-xl border border-cardinal"
              onClick={() =>
                trackFacebookEvent('ViewContent', {
                  component: 'home_hero_explore_admissions',
                })
              }
            >
              Explore Admissions
            </Link>
            <Link
              href="/academics"
              className="px-6 py-3 rounded-xl border border-cardinal/30 bg-white/70 text-cardinal font-semibold shadow-sm transition hover:border-cardinal hover:shadow-lg"
            >
              Discover Our Academics
            </Link>
          </div>
          <div className="grid gap-4 rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur md:grid-cols-3">
            {[ 
              { title: 'Premium Faculty', detail: 'Seasoned mentors with global perspectives and personalized care.' },
              { title: 'Holistic Growth', detail: 'Clubs, arts, and leadership labs that celebrate every talent.' },
              { title: 'Smart Infrastructure', detail: 'Digitally enabled classrooms with serene, secure campus design.' }
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                <div className="h-12 w-12 rounded-full bg-cardinal/10 text-cardinal flex items-center justify-center">
                  <span className="text-lg font-semibold">•</span>
                </div>
                <p className="text-base font-semibold text-cardinal">{item.title}</p>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-cardinal/10 to-transparent pointer-events-none" />
    </section>
  );
}
