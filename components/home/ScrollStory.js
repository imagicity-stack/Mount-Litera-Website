import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import SiteImage from '@/components/media/SiteImage';
import { useIsSmallScreen } from '@/lib/useMediaQuery';

const chapters = [
  {
    slot: 'home.story.1',
    step: '01',
    title: 'Roots',
    body: 'The earliest years, where discipline, curiosity, and a love of discovery are planted. Every question is worth asking, and every answer is worth celebrating.'
  },
  {
    slot: 'home.story.2',
    step: '02',
    title: 'Ascent',
    body: 'The middle years, where guided learning gives way to self-driven exploration. Students test ideas, work in teams, and start to think for themselves.'
  },
  {
    slot: 'home.story.3',
    step: '03',
    title: 'Radiance',
    body: 'The senior years, where knowledge finds direction. Board preparation runs alongside leadership, ethics, and the confidence to carry both.'
  }
];

/**
 * Three stages, one continuous scroll. The frame stays pinned while the
 * photographs and their captions cross-fade underneath the reader, so the
 * journey reads as one movement rather than three stacked sections.
 *
 * Under prefers-reduced-motion this degrades to three plainly stacked
 * chapters with no pinning and no scroll-linked motion.
 *
 * The transforms are declared one by one rather than mapped, so the hook
 * order is fixed regardless of which branch renders.
 */
export default function ScrollStory() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const isSmall = useIsSmallScreen();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  // Photographs cross-fade softly into one another.
  const opacity0 = useTransform(scrollYProgress, [0, 0.27, 0.34], [1, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.27, 0.36, 0.6, 0.68], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);

  // The captions swap on a much tighter window than the pictures: two
  // different headlines half-dissolved on top of each other are unreadable, so
  // one clears before the next arrives.
  const copy0 = useTransform(scrollYProgress, [0, 0.295, 0.325], [1, 1, 0]);
  const copy1 = useTransform(scrollYProgress, [0.335, 0.365, 0.625, 0.655], [0, 1, 1, 0]);
  const copy2 = useTransform(scrollYProgress, [0.665, 0.695, 1], [0, 1, 1]);

  // Progress rules under the caption.
  const progress0 = useTransform(scrollYProgress, [0, 1 / 3], [0, 1], { clamp: true });
  const progress1 = useTransform(scrollYProgress, [1 / 3, 2 / 3], [0, 1], { clamp: true });
  const progress2 = useTransform(scrollYProgress, [2 / 3, 1], [0, 1], { clamp: true });

  const opacities = [opacity0, opacity1, opacity2];
  const copyOpacities = [copy0, copy1, copy2];
  const progresses = [progress0, progress1, progress2];

  // Phones get the plain stacked version. Pinning costs three viewport heights
  // of scrolling to read three short paragraphs, which is a poor trade on a
  // small screen, and cross-fading full-bleed images every frame is the most
  // expensive thing on the page.
  if (reduce || isSmall) {
    return (
      <section className="band-ink">
        <div className="shell space-y-16 py-20 md:py-28">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/60">
            The learning journey
          </p>
          {chapters.map((chapter) => (
            <article key={chapter.slot} className="grid gap-8 md:grid-cols-2 md:gap-14">
              <SiteImage slot={chapter.slot} />
              <div>
                <p className="font-display text-lg text-white/50">{chapter.step}</p>
                <h3 className="mt-3 font-display text-4xl font-medium text-white">
                  {chapter.title}
                </h3>
                <p className="mt-5 leading-relaxed text-white/75">{chapter.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-obsidian" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ height: '100svh' }}>
        {chapters.map((chapter, i) => (
          <motion.div
            key={`img-${chapter.slot}`}
            className="absolute inset-0"
            style={{ opacity: opacities[i] }}
          >
            <SiteImage slot={chapter.slot} fill priority={i === 0} />
          </motion.div>
        ))}

        <div
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/40"
          aria-hidden="true"
        />

        <div className="shell relative flex h-full flex-col justify-end pb-16 md:pb-24">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/60">
            The learning journey
          </p>

          <div className="relative mt-6 h-[17rem] sm:h-[15rem]">
            {chapters.map((chapter, i) => (
              <motion.div
                key={`copy-${chapter.slot}`}
                className="absolute inset-x-0 top-0 max-w-2xl"
                style={{ opacity: copyOpacities[i] }}
              >
                <p className="font-display text-lg text-white/50">{chapter.step}</p>
                <h3 className="mt-3 font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.04] text-white">
                  {chapter.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
                  {chapter.body}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-2 flex gap-3">
            {chapters.map((chapter, i) => (
              <div key={`bar-${chapter.slot}`} className="h-[2px] flex-1 bg-white/20">
                <motion.div
                  className="h-full w-full origin-left bg-white"
                  style={{ scaleX: progresses[i] }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
