import { motion } from 'framer-motion';
import Link from 'next/link';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative -mt-[96px] md:-mt-[108px] lg:-mt-[120px] flex min-h-screen items-center justify-center overflow-hidden bg-midnight text-parchment"
    >
      <div
        className="absolute inset-0 animate-slow-pan bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/main gate new.jpeg')"
        }}
        aria-hidden="true"
      />
      <img
        src="/main gate new.jpeg"
        alt="Elden Heights School campus in Hazaribagh Jharkhand"
        className="sr-only"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/55 to-midnight"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,10,12,0.55)_80%)]"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="pointer-events-none absolute left-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-gold/60 to-gold/10" />
        <span className="rotate-180 [writing-mode:vertical-rl] text-[10px] font-semibold uppercase tracking-[0.45em] text-parchment/65">
          Est. Legacy · Towards Eternal Glory
        </span>
        <span className="h-16 w-px bg-gradient-to-t from-transparent via-gold/60 to-gold/10" />
      </div>

      <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="h-16 w-px bg-gradient-to-b from-transparent via-gold/60 to-gold/10" />
        <span className="[writing-mode:vertical-rl] text-[10px] font-semibold uppercase tracking-[0.45em] text-parchment/65">
          Hazaribagh · Jharkhand · India
        </span>
        <span className="h-16 w-px bg-gradient-to-t from-transparent via-gold/60 to-gold/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-[120px] pb-24 text-center md:pt-[140px] lg:pt-[160px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-gold-200">
              The Elden Heights School
            </span>
            <span className="h-px w-10 bg-gold/70" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-garamond text-[clamp(2.75rem,7vw,6.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-parchment drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]"
          >
            A heritage of excellence,
            <br className="hidden sm:block" />{' '}
            <span className="italic">
              <span className="gold-text">refined</span>{' '}
              for tomorrow.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-base font-medium leading-relaxed text-parchment/80 md:text-lg"
          >
            The most sought-after private school in Hazaribagh — where rigorous academics,
            cultivated character, and future-ready learning meet under one prestigious roof.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/admission" className="btn-primary">
              Begin Your Admission
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-4-4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-parchment/30 bg-white/5 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-parchment backdrop-blur transition-all duration-500 ease-elite hover:-translate-y-0.5 hover:border-gold/60 hover:bg-white/10 hover:text-gold-200"
            >
              Discover the Legacy
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-parchment/15 bg-parchment/10 backdrop-blur sm:grid-cols-4"
          >
            {[
              ['Est. 1999', 'Heritage'],
              ['CBSE', 'Affiliated'],
              ['K — 10', 'Grades'],
              ['Top 10', 'Regional']
            ].map(([v, l]) => (
              <div
                key={l}
                className="flex flex-col items-center gap-1 bg-midnight/60 px-4 py-5 backdrop-blur"
              >
                <span className="font-garamond text-2xl font-semibold text-parchment">{v}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-parchment/60">
                  {l}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.45em] text-parchment/50">
          Scroll
        </span>
        <span className="relative block h-10 w-[1px] overflow-hidden bg-parchment/20">
          <span className="absolute left-0 top-0 block h-4 w-px animate-[slideDown_2.4s_ease-in-out_infinite] bg-gold" />
        </span>
      </motion.div>

      <style jsx>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
      `}</style>
    </section>
  );
}
