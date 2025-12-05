import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function About({ showLink = true }) {
  return (
    <section id="about" className="relative py-20 bg-[#f6f1ea] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-10 top-16 h-px bg-gradient-to-r from-transparent via-cardinal/25 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-10 bottom-16 h-px bg-gradient-to-r from-transparent via-cardinal/25 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-16 top-16 h-40 w-40 rounded-full bg-cardinal/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 bottom-10 h-48 w-48 rounded-full bg-cardinal/10 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-5xl mx-auto px-6 text-center space-y-10">
        <motion.p
          className="text-sm font-semibold tracking-[0.28em] text-cardinal uppercase"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          A unit of Bhagwati Educational And Charitable Trust
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-cardinal"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          An Heirloom of Learning
        </motion.h2>
        <motion.p
          className="text-lg text-gray-800 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          The Elden Heights School stands on the shoulders of institutions that shaped history. Our ethos blends scholarship, service, and the quiet discipline of daily craft. As we restore and renew our campus, every corridor is being reimagined—arched entrances, curated galleries, and spaces that respect both heritage and innovation.
        </motion.p>
        <motion.blockquote
          className="mx-auto max-w-3xl rounded-2xl border border-cardinal/25 bg-white/90 p-6 text-left text-gray-800 shadow-md backdrop-blur ring-1 ring-cardinal/10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          “A school’s character is not built in a day—it is earned through generations of minds awakened and values practiced.”
        </motion.blockquote>
        <motion.div
          className="grid gap-4 md:grid-cols-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
        >
          {[{
            title: 'Heritage of Excellence',
            copy: 'An academic atmosphere influenced by storied universities—arched motifs, curated literature, and ceremonies that honour scholarship.'
          },
          {
            title: 'Tailored Mentorship',
            copy: 'Small cohorts with advisors who guide reflection, rhetoric, and research—ensuring every learner finds their voice.'
          },
          {
            title: 'Beyond Classrooms',
            copy: 'Debate halls, chamber choirs, service clubs, and leadership labs that connect tradition with contemporary purpose.'
          }].map((item) => (
            <div key={item.title} className="rounded-2xl border border-cardinal/15 bg-white/95 p-6 shadow-sm ring-1 ring-cardinal/10">
              <p className="text-cardinal font-semibold tracking-wide">{item.title}</p>
              <p className="mt-3 text-sm text-gray-800 leading-relaxed">{item.copy}</p>
            </div>
          ))}
        </motion.div>
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
              className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-cardinal bg-cardinal text-white font-semibold shadow-lg transition hover:bg-[#f6f1ea] hover:text-cardinal"
            >
              Read more about us
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
