import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

const council = [
  { name: 'Anit Ankur', title: 'Settlor', initials: 'AA' },
  { name: 'Shashi Shankar Prasad', title: 'Managing Trustee', initials: 'SP' },
  { name: 'Vinita Ankur', title: 'Trustee', initials: 'VA' },
  { name: 'Vandana Prasad', title: 'Trustee', initials: 'VP' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function TheEldenCouncilPage() {
  return (
    <>
      <Seo path="/the-elden-council" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="The Elden Council"
            subtitle="Guiding voices that shape strategy, culture, and stewardship."
            eyebrow="Governance"
            image="/the-elden-council/banner-council.jpg"
          />

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
              <motion.div
                className="mx-auto mb-16 max-w-3xl text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow justify-center">Trust &amp; Stewardship</span>
                <h2 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  Safeguarding <span className="italic">the legacy</span>.
                </h2>
                <span className="mx-auto mt-6 block h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <div className="mt-6 space-y-4 text-base leading-relaxed text-midnight/80 md:text-lg">
                  <p>
                    The Elden Heights School is registered under the <span className="font-semibold text-midnight">Bhagwati Educational &amp; Charitable Trust</span> —
                    an institution devoted to building a lineage of scholars, leaders, and responsible citizens.
                    The Elden Council safeguards this commitment, ensuring that every decision, tradition, and
                    innovation upholds our heritage of excellence and our motto,{' '}
                    <span className="font-garamond italic">&ldquo;Towards Eternal Glory.&rdquo;</span>
                  </p>
                  <p>
                    Guided by trustees who embody integrity and vision, the Council shapes policy, nurtures
                    faculty excellence, and strengthens the partnership between families and the school community.
                  </p>
                </div>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {council.map((member, idx) => (
                  <motion.article
                    key={member.name}
                    className="group overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                  >
                    <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-midnight via-graphite to-midnight">
                      <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/15 blur-[80px]" />
                      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cardinal/20 blur-[80px]" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                      <span className="relative font-garamond text-7xl font-semibold text-parchment">
                        {member.initials}
                      </span>
                      <span className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-[9px] font-semibold uppercase tracking-[0.35em] text-parchment/40">
                        Portrait &nbsp;·&nbsp; Forthcoming
                      </span>
                    </div>
                    <div className="space-y-2 border-t border-midnight/10 bg-white/80 px-5 py-5 text-center backdrop-blur">
                      <p className="font-garamond text-xl font-semibold leading-tight text-midnight">
                        {member.name}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                        {member.title}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
