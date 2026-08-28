import Link from 'next/link';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import SectionHeader from '@/components/sections/SectionHeader';
import FeatureBand from '@/components/sections/FeatureBand';
import PersonCard from '@/components/people/PersonCard';
import Reveal from '@/components/motion/Reveal';
import usePeople from '@/lib/usePeople';

export default function ManagingCommitteePage() {
  const { people, ready } = usePeople('committee');

  return (
    <>
      <Seo path="/managing-committee" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Managing Committee"
            subtitle="The leaders ensuring our vision stays bold, transparent, and future-ready."
            eyebrow="Stewardship"
            slot="people.committee"
          />

          <section className="band-white">
            <div className="shell py-20 md:py-28">
              <SectionHeader
                eyebrow="Governance"
                title="Who runs the school day to day"
                lede="The Managing Committee carries operations: safety, infrastructure, staffing, and the practical decisions that shape an ordinary school day."
              />

              <div className="mt-14">
                {people.length > 0 ? (
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {people.map((member, idx) => (
                      <PersonCard key={member.id} person={member} index={idx} ratio="4/5" />
                    ))}
                  </div>
                ) : (
                  // The committee is published from the admin portal. Until
                  // somebody is added there, say so plainly rather than
                  // rendering an empty grid.
                  ready && (
                    <Reveal className="border-l-[3px] border-crimson bg-ivory p-8 md:p-10">
                      <p className="font-display text-2xl font-medium text-ink md:text-3xl">
                        Details coming soon
                      </p>
                      <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
                        Information about the committee safeguarding our mission will be published
                        here as our governance structure takes shape. In the meantime, the Elden
                        Council sets the school&rsquo;s direction.
                      </p>
                      <Link href="/the-elden-council" className="hv-link mt-6 inline-block">
                        Meet the Elden Council
                      </Link>
                    </Reveal>
                  )
                )}
              </div>
            </div>
          </section>

          <FeatureBand
            slot="people.council.feature"
            eyebrow="Accountability"
            title="Every part of the school answers for something specific"
            body="Read how governance is structured, and who is responsible for what."
            link="/about"
            linkLabel="How the school is led"
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
