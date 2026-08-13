import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Scroll-linked drift. The inner layer is deliberately taller than its frame so
 * the movement never exposes an edge.
 *
 * The caller owns the height of the frame; this only moves what is inside it.
 */
export default function Parallax({ children, className = '', distance = 70, overscan = 14 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const raw = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });

  if (reduce) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, top: `-${overscan}%`, bottom: `-${overscan}%` }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
