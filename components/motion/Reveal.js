import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Fade-and-rise on entry. The house transition for text blocks.
 *
 * Pass `delay` (or `index` for an evenly staggered list) to sequence a group.
 * Honours prefers-reduced-motion by rendering the content outright.
 */
export default function Reveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  index,
  stagger = 0.08,
  y = 26,
  duration = 0.85,
  amount = 0.25,
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  const computedDelay = typeof index === 'number' ? delay + index * stagger : delay;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay: computedDelay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
