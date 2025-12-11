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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: "url('/images/heritage-hero.jpg')",
        backgroundColor: '#f9f6f2'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b]/65 via-[#111]/55 to-[#1a1a1a]/70 mix-blend-multiply" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(196,180,150,0.35),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(165,0,33,0.25),_transparent_45%)]" aria-hidden="true" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center md:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-10"
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-white drop-shadow-[0_6px_25px_rgba(0,0,0,0.55)]">
            Towards eternal glory
          </h1>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#f9f6f2] via-[#f9f6f2]/80 to-transparent" aria-hidden="true" />
    </section>
  );
}
