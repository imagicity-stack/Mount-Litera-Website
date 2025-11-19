import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function About({ showLink = true }) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <motion.p
          className="text-sm font-semibold tracking-wide text-cardinal uppercase"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          A unit of Bhagwati Educational And Charitable Trust
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-cardinal"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Our Future Ahead
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          Mount Litera School has been a beacon of learning and values. As we move forward into our next chapter, our goal remains unchanged — to nurture confident, capable, and creative learners ready for tomorrow. This transition marks the start of something extraordinary — modern infrastructure, digital innovation, and a renewed vision for every student.
        </motion.p>
        <motion.blockquote
          className="border-l-4 border-cardinal pl-6 italic text-left text-gray-700"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          “The future belongs to those who prepare for it today.”
        </motion.blockquote>
        {showLink && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-cardinal bg-cardinal text-white font-medium shadow-lg transition hover:bg-white hover:text-cardinal"
            >
              Read more about us
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
