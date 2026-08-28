import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import SplitFeature from '@/components/sections/SplitFeature';
import PersonCard from '@/components/people/PersonCard';
import usePeople from '@/lib/usePeople';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function TheEldenCouncilPage() {
  const { people } = usePeople('council');

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
            slot="people.council"
          />

          <section className="relative py-20 md:py-28">
            <div className="shell max-w-5xl">
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

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {people.map((member, idx) => (
                  <PersonCard key={member.id} person={member} index={idx} ratio="4/5" />
                ))}
              </div>
            </div>
          </section>
          <section className="band-white">
            <div className="shell py-20 md:py-28">
              <SplitFeature
                slot="people.council.feature"
                eyebrow="Stewardship"
                title="Trustees who think in decades"
                flip
                points={[
                  'Long-term custody of the school\u2019s purpose and finances.',
                  'Appointments and major investment decisions.',
                  'Accountable to families, not to shareholders.'
                ]}
              >
                <p>
                  The Council exists to protect what a school is for when short-term pressures push
                  the other way. Its members are not involved in daily teaching — that is
                  deliberate, and it is what lets them take the long view.
                </p>
              </SplitFeature>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
