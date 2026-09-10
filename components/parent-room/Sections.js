/**
 * The Parent Room landing sections.
 *
 * Same design language as the rest of the site — flat bands, one crimson
 * accent, square edges, Playfair over Inter — pitched a little quieter and a
 * little more editorial. The page has no school navigation on purpose: a parent
 * arriving from an advertisement should be able to get to a confirmed booking
 * without being offered eleven other places to go.
 */

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

import SiteImage from '@/components/media/SiteImage';
import Reveal from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import { CounsellorPortrait, CounsellorIdentity } from '@/components/parent-room/Counsellor';
import {
  assurances,
  concernCards,
  faq,
  howItWorks,
  parentRoomIdentity,
  privacyLine,
  sessionFacts
} from '@/lib/parentRoomCopy';

const EASE = [0.22, 1, 0.36, 1];

// ------------------------------------------------------------------- Wordmark

export function ParentRoomHeader() {
  return (
    <header className="border-b border-hairline bg-white">
      <div className="shell flex items-center justify-between py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-[1.15rem] font-medium text-ink">The Parent Room</span>
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
            The Elden Heights School
          </span>
        </Link>
        <a
          href="#book"
          className="hidden border-2 border-ink px-5 py-2.5 text-[0.8rem] font-bold text-ink transition hover:border-crimson hover:bg-crimson hover:text-white sm:inline-block"
        >
          Book a session
        </a>
      </div>
    </header>
  );
}

export function ParentRoomFooter() {
  return (
    <footer className="band-ink">
      <div className="shell py-12">
        <p className="font-display text-[1.35rem] font-medium text-white">The Parent Room</p>
        <p className="mt-2 text-[0.85rem] text-white/60">{parentRoomIdentity.positioning}</p>
        <p className="mt-7 max-w-prose border-t border-white/15 pt-6 text-[0.8rem] leading-relaxed text-white/55">
          {privacyLine}{' '}
          <Link href="/privacy-policy" className="font-bold text-white underline underline-offset-4">
            Privacy policy
          </Link>
          .
        </p>
        <p className="mt-5 text-[0.75rem] leading-relaxed text-white/45">
          The Parent Room provides educational and parental guidance. It is not medical,
          psychiatric or clinical psychological treatment.
        </p>
      </div>
    </footer>
  );
}

// ----------------------------------------------------------------------- Hero

export function Hero({ hero, onBook, counsellorName, counsellorTitle, fee }) {
  const reduce = useReducedMotion();

  const rise = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative isolate overflow-hidden bg-obsidian text-white">
      <Parallax className="absolute inset-0" distance={40} overscan={8}>
        <SiteImage slot="parentRoom.hero" fill priority sizes="100vw" />
      </Parallax>
      <div
        className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-obsidian/60"
        aria-hidden="true"
      />

      <div className="shell relative py-16 md:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: reduce ? 0 : 0.1 }}
          className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16"
        >
          <div>
            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/70"
            >
              {parentRoomIdentity.positioning}
            </motion.p>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-6 font-display text-[clamp(2.1rem,5.2vw,4.25rem)] font-medium leading-[1.06] tracking-[-0.015em] text-white"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-7 max-w-2xl text-[1rem] leading-relaxed text-white/75 md:text-[1.1rem]"
            >
              {hero.supporting}
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            >
              <button
                type="button"
                onClick={onBook}
                className="w-full border-2 border-white bg-white px-8 py-4 text-[0.95rem] font-bold text-ink transition hover:border-crimson hover:bg-crimson hover:text-white sm:w-auto"
              >
                Book a Private Session
              </button>
              <p className="text-[0.85rem] font-bold tracking-[0.02em] text-white/80">
                30 Minutes &nbsp;|&nbsp; 1-to-1 &nbsp;|&nbsp; Online &nbsp;|&nbsp; ₹{fee}
              </p>
            </motion.div>

            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-7 border-l-[3px] border-crimson pl-5 text-[0.92rem] leading-relaxed text-white/70"
            >
              {hero.trust}
            </motion.p>
          </div>

          {/* The person you will actually be speaking to, given her own column
              rather than a byline — it is the single most reassuring fact on
              the page. */}
          <motion.div
            variants={rise}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="max-w-[19rem] border border-white/20 bg-white/[0.04] p-5 backdrop-blur-sm sm:max-w-[21rem] lg:justify-self-end"
          >
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/60">
              Your session is with
            </p>
            <div className="mt-4">
              <CounsellorPortrait name={counsellorName} className="w-full" sizes="(max-width: 1024px) 60vw, 21rem" />
            </div>
            <p className="mt-5 font-display text-[1.5rem] font-medium leading-tight text-white">
              {counsellorName}
            </p>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-white/60">{counsellorTitle}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------- Concerns

export function Concerns({ onBook }) {
  return (
    <section className="band-white">
      <div className="shell py-16 md:py-24">
        <Reveal>
          <span className="rule-heavy" />
          <h2 className="mt-10 max-w-3xl font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
            What has been on your mind lately?
          </h2>
          <p className="lede mt-6 max-w-prose">
            You do not need a diagnosis or a crisis to book one of these. Most parents come with
            something much more ordinary — and much harder to say out loud.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {concernCards.map((card, index) => (
            <li key={card} className="bg-white">
              <Reveal
                index={index}
                stagger={0.035}
                y={14}
                duration={0.55}
                className="flex h-full items-start gap-3.5 px-6 py-6"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.55rem] h-1.5 w-1.5 flex-shrink-0 bg-crimson"
                />
                <span className="text-[0.98rem] leading-relaxed text-ink-soft">{card}</span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12">
          <button type="button" onClick={onBook} className="arrow-cta">
            <span className="arrow-cta__dot" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Book a private session
          </button>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- How it works

export function HowItWorks() {
  return (
    <section className="band-grey">
      <div className="shell py-16 md:py-24">
        <Reveal>
          <span className="rule-heavy" />
          <h2 className="mt-10 font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
            How the session works
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, index) => (
            <Reveal as="li" key={item.step} index={index} y={20} duration={0.65}>
              <p className="font-display text-[2.75rem] font-normal leading-none tracking-[-0.02em] text-crimson">
                {item.step}
              </p>
              <span className="mt-5 block h-px w-full bg-hairline" />
              <h3 className="mt-5 font-display text-[1.25rem] font-medium leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ------------------------------------------------------------ About the session

export function AboutTheSession({ fee, counsellorName, counsellorTitle, duration }) {
  return (
    <section className="band-white">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <span className="rule-heavy" />
            <h2 className="mt-10 font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
              Private Parent Guidance Session
            </h2>

            <dl className="mt-10 border-t border-hairline">
              {[
                ['Duration', `${duration} minutes`],
                ['Mode', sessionFacts.mode],
                ['Format', sessionFacts.format],
                ['Participation fee', `₹${fee}`],
                ['Conducted by', counsellorName]
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline py-4"
                >
                  <dt className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                    {label}
                  </dt>
                  <dd className="text-right text-[1rem] font-bold text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex items-center gap-5">
              <CounsellorPortrait name={counsellorName} className="w-24 flex-shrink-0" sizes="96px" />
              <CounsellorIdentity name={counsellorName} title={counsellorTitle} compact />
            </div>
          </Reveal>

          {/* The two boundaries, given real estate rather than a footnote —
              they are the reason a cautious parent books at all. */}
          <div className="flex flex-col gap-5 lg:pt-[4.5rem]">
            {assurances.map((item, index) => (
              <Reveal
                key={item.title}
                index={index}
                y={18}
                className="border-l-[3px] border-crimson bg-ivory px-7 py-8"
              >
                <h3 className="font-display text-[1.35rem] font-medium leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[0.97rem] leading-relaxed text-ink-soft">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------- FAQ

export function Faq() {
  return (
    <section className="band-grey">
      <div className="shell py-16 md:py-24">
        <Reveal>
          <span className="rule-heavy" />
          <h2 className="mt-10 font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
            Questions parents ask
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-hairline">
          {faq.map((item, index) => (
            <Reveal
              key={item.question}
              index={index}
              stagger={0.045}
              y={14}
              duration={0.55}
              className="grid gap-3 border-b border-hairline py-7 md:grid-cols-[1fr_1.4fr] md:gap-12"
            >
              <h3 className="font-display text-[1.2rem] font-medium leading-snug text-ink">
                {item.question}
              </h3>
              <p className="text-[0.97rem] leading-relaxed text-ink-soft">{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
