import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * The house transition for photographs: the frame fades up while the image
 * inside settles back from a slight overscale, so a picture arrives as one
 * deliberate gesture rather than a flat fade.
 *
 * Only opacity and transform are animated. An earlier version wiped the frame
 * open with clip-path; that left photographs clipped to nothing when the
 * animation failed to run, and a missing animation is a far better failure
 * than a missing photograph.
 *
 * Wrap a SiteImage (or any block) — the wrapper clips, so the child should
 * fill it.
 */
export default function ImageReveal({
  children,
  className = '',
  delay = 0,
  index,
  stagger = 0.1,
  amount = 0.15,
  duration = 0.95
}) {
  const reduce = useReducedMotion();
  const computedDelay = typeof index === 'number' ? delay + index * stagger : delay;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay: computedDelay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount }}
        transition={{ duration: duration + 0.5, ease: EASE, delay: computedDelay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
