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
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f9f6f2] via-white to-[#fefbf7]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(165,0,33,0.06),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(165,0,33,0.04),_transparent_40%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-10 w-px bg-gradient-to-b from-transparent via-cardinal/20 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-10 w-px bg-gradient-to-b from-transparent via-cardinal/20 to-transparent" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-10"
        >
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-cardinal/30 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-cardinal shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cardinal" />
            Established Traditions, Forward Vision
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold text-cardinal leading-tight max-w-4xl mx-auto">
            The Elden Heights School carries the heritage of scholarship into a new century.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Inspired by the timeless campuses of the world’s great universities, our halls blend rich legacy with meticulous care.
            Walk into cloistered courtyards, attentive mentorship, and a curriculum shaped to forge character, intellect, and purpose.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/admission"
              className="px-7 py-3 rounded-full bg-cardinal text-white font-semibold shadow-lg transition hover:bg-[#f9f6f2] hover:text-cardinal hover:shadow-xl border border-cardinal"
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
              className="px-7 py-3 rounded-full border border-cardinal/30 bg-white/80 text-cardinal font-semibold shadow-sm transition hover:border-cardinal hover:shadow-lg"
            >
              Discover Our Academics
            </Link>
          </div>
          <div className="grid gap-6 rounded-3xl bg-white/90 p-8 shadow-2xl ring-1 ring-cardinal/10 backdrop-blur md:grid-cols-3">
            {[{ title: 'Scholarship & Grace', detail: 'Garamond-inspired typography, curated halls, and ceremonies that honour academic pursuit.' },
            { title: 'Mentorship for Life', detail: 'Faculty advisors who know every learner by name, guiding intellect and integrity in equal measure.' },
            { title: 'Campus Craftsmanship', detail: 'Light-filled libraries, landscaped greens, and digital studios where tradition meets innovation.' }].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3 text-center">
                <div className="h-12 w-12 rounded-full bg-cardinal/10 text-cardinal flex items-center justify-center ring-1 ring-cardinal/20">
                  <span className="text-lg font-semibold">•</span>
                </div>
                <p className="text-base font-semibold text-cardinal">{item.title}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-cardinal/10 to-transparent pointer-events-none" />
    </section>
  );
}
