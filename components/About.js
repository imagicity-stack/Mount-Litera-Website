import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function About({ showLink = true }) {
  return (
    <section id="about" className="relative py-20 bg-[#FDF9F7] overflow-hidden">
      <div className="pointer-events-none absolute -left-10 top-12 h-24 w-24 rounded-full bg-cardinal/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 bottom-10 h-32 w-32 rounded-full bg-cardinal/5 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-5xl mx-auto px-6 text-center space-y-10">
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
          className="text-lg text-gray-700"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          The Elden Heights School has been a beacon of learning and values. As we move forward into our next chapter, our goal remains unchanged — to nurture confident, capable, and creative learners ready for tomorrow. This transition marks the start of something extraordinary — modern infrastructure, digital innovation, and a renewed vision for every student.
        </motion.p>
        <motion.blockquote
          className="mx-auto max-w-3xl rounded-2xl border border-cardinal/20 bg-white/80 p-6 text-left text-gray-700 shadow-sm backdrop-blur"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          “The future belongs to those who prepare for it today.”
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
            title: 'Culture of Excellence',
            copy: 'Premium sans and serif typography, serene learning spaces, and traditions that honour every learner.'
          },
          {
            title: 'Tailored Care',
            copy: 'Small cohorts, attentive mentors, and personalised feedback that celebrates individual pace.'
          },
          {
            title: 'Beyond Classrooms',
            copy: 'Leadership studios, performing arts, sports, and service that shape character and community.'
          }].map((item) => (
            <div key={item.title} className="rounded-2xl border border-cardinal/10 bg-white/90 p-5 shadow-sm">
              <p className="text-cardinal font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-gray-700">{item.copy}</p>
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
