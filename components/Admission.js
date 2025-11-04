import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function Admission() {
  return (
    <section id="admission" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-cardinal"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Admissions Open for 2025–26
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          We’re inviting new learners to join this journey of transformation. The systems you see today are evolving into a bold,
 modern learning experience designed for the next generation.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <Link
            href="/admission"
            className="inline-block px-6 py-3 rounded-xl bg-cardinal text-white font-medium shadow-lg transition hover:bg-white hover:text-cardinal border border-cardinal"
          >
            Read more
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
