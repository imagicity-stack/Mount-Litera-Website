import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

import { useIsSmallScreen } from '@/lib/useMediaQuery';

/**
 * Scroll-linked drift. The inner layer is deliberately taller than its frame so
 * the movement never exposes an edge.
 *
 * Switched off on phones. Scroll-linked transforms force a repaint of a
 * full-bleed image on every frame, which is exactly the work a mid-range phone
 * cannot spare during a flick-scroll — and the effect is barely legible on a
 * small screen anyway. The frame and its contents are identical either way;
 * only the movement is dropped.
 */
export default function Parallax({ children, className = '', distance = 70, overscan = 14 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const isSmall = useIsSmallScreen();

  // The frame needs a positioning context for its absolutely placed layers, but
  // callers routinely pass `absolute inset-0` to stretch it over a section.
  // Emitting both classes lets Tailwind's own source order decide, and
  // `.relative` is written after `.absolute` — which silently collapsed the
  // frame to zero height and blanked every full-bleed image. Only supply
  // `relative` when the caller has not positioned the frame themselves.
  const positioned = /(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(className);
  const frameClass = `${positioned ? '' : 'relative'} overflow-hidden ${className}`.trim();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const raw = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });

  if (reduce || isSmall) {
    return (
      <div ref={ref} className={frameClass}>
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={frameClass}>
      <motion.div
        style={{ y, top: `-${overscan}%`, bottom: `-${overscan}%` }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
