import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function About({ showLink = true }) {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border border-cardinal/15 bg-white/70 shadow-2xl shadow-cardinal/5 backdrop-blur">
          <div className="absolute inset-0 bg-gradient-to-br from-parchment via-white to-parchment" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'radial-gradient(circle at 10% 20%, rgba(195,165,114,0.2) 0, rgba(195,165,114,0.2) 6%, transparent 24%), radial-gradient(circle at 80% 0%, rgba(165,0,33,0.14) 0, rgba(165,0,33,0.14) 8%, transparent 30%)',
            }}
            aria-hidden="true"
          />
          <div className="relative px-8 py-12 md:px-14 md:py-16 text-center space-y-8">
            <motion.p
              className="text-sm font-semibold tracking-[0.35em] text-cardinal uppercase"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              A unit of Bhagwati Educational And Charitable Trust
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl font-semibold text-midnight"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Our Future Ahead
            </motion.h2>
            <motion.p
              className="text-lg text-midnight/80 max-w-4xl mx-auto leading-relaxed"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              The Elden Heights School has been a beacon of learning and values. As we move forward into our next chapter, our goal remains unchanged — to nurture confident, capable, and creative learners ready for tomorrow. This transition marks the start of something extraordinary — modern infrastructure, digital innovation, and a renewed vision for every student.
            </motion.p>
            <motion.blockquote
              className="mx-auto max-w-3xl rounded-2xl border border-gold/40 bg-white/70 px-8 py-6 text-left text-midnight/80 shadow-lg shadow-cardinal/5"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <p className="text-xl font-garamond text-midnight">“The future belongs to those who prepare for it today.”</p>
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
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-cardinal/20 bg-cardinal text-white font-semibold shadow-lg shadow-cardinal/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cardinal/25"
                >
                  Read more about us
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
