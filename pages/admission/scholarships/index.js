/**
 * /admission/scholarships
 *
 * The Scholarships section of Admission. Built as a list rather than a single
 * page about one scholarship, because there will be a second one: each entry
 * in `scholarships` below becomes a card, and a closed scholarship stays
 * listed with its dates rather than disappearing.
 */

import Head from 'next/head';
import Link from 'next/link';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import Reveal from '@/components/motion/Reveal';
import {
  foundation,
  keyDates,
  registrationIsOpen,
  scholarship
} from '@/lib/scholarship';

/** Every scholarship the school lists. Add the next one here. */
const scholarships = [
  {
    id: scholarship.id,
    name: scholarship.name,
    programme: scholarship.programme,
    href: '/admission/scholarships/edenwoods-merit-2027',
    offeredBy: foundation.name,
    summary:
      'A merit test for children joining Nursery to Class IX in 2027–28. Up to a 100% tuition waiver, with eight full scholarships across all classes.',
    facts: [
      ['Test fee', `₹${scholarship.registrationFee}`],
      ['Classes', 'Nursery to IX'],
      ['Test day', keyDates.test.short],
      ['Registration closes', keyDates.registrationCloses.short]
    ]
  }
];

export default function ScholarshipsIndex({ open }) {
  return (
    <>
      <Seo path="/admission/scholarships" />
      <Head>
        <meta name="theme-color" content="#06423C" />
      </Head>

      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Scholarships"
            subtitle="Merit should decide a child's school, not a fee receipt."
            eyebrow="Admission"
            slot="scholarship.banner"
          />

          <section className="band-white">
            <div className="shell py-16 md:py-22">
              <span className="rule-heavy" />
              <h2 className="mt-9 max-w-3xl font-display text-[clamp(1.85rem,3.8vw,3rem)] font-medium leading-[1.08] text-ink">
                Open scholarships
              </h2>
              <p className="lede mt-5 max-w-prose">
                Scholarships at The Elden Heights School are offered with partner foundations and
                decided by a test, not by an application fee. Each one has its own dates, its own
                terms and its own registration.
              </p>

              <div className="mt-12 grid gap-8">
                {scholarships.map((item, index) => (
                  <Reveal key={item.id} index={index} y={18}>
                    <article className="eden-theme border border-hairline bg-white">
                      <div className="grid gap-0 lg:grid-cols-[1.6fr_1fr]">
                        <div className="p-7 sm:p-9">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={`inline-block px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] ${
                                open
                                  ? 'bg-eden-600 text-white'
                                  : 'border border-hairline text-ink-muted'
                              }`}
                            >
                              {open ? 'Registration open' : 'Closed'}
                            </span>
                            <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                              Offered by {item.offeredBy}
                            </span>
                          </div>

                          <h3 className="mt-5 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-medium leading-tight text-ink">
                            <Link href={item.href} className="hv-link-serif">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="mt-2 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-eden-600">
                            {item.programme}
                          </p>

                          <p className="mt-5 max-w-prose text-[1rem] leading-relaxed text-ink-soft">
                            {item.summary}
                          </p>

                          <div className="mt-8">
                            <Link href={item.href} className="btn-primary inline-block">
                              {open ? `Register · ₹${scholarship.registrationFee}` : 'Read the details'}
                            </Link>
                          </div>
                        </div>

                        <dl className="grid grid-cols-2 gap-px bg-hairline lg:grid-cols-1 lg:border-l lg:border-hairline">
                          {item.facts.map(([label, value]) => (
                            <div key={label} className="bg-ivory px-6 py-5">
                              <dt className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                                {label}
                              </dt>
                              <dd className="mt-1.5 font-display text-[1.25rem] leading-tight text-ink">
                                {value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="band-grey">
            <div className="shell py-16 md:py-22">
              <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-[1.08] text-ink">
                  Not sitting a scholarship test?
                </h2>
                <div className="flex flex-col items-start gap-6">
                  <p className="text-[1rem] leading-relaxed text-ink-soft">
                    A scholarship test is one route in, not the only one. Admission to The Elden
                    Heights School runs through its own process, and taking a scholarship test
                    neither helps nor harms a normal application.
                  </p>
                  <Link href="/admission" className="hv-link font-bold">
                    The admission process
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

/**
 * Whether registration is open is resolved on the server so the card is right
 * on the first paint — a statically baked "Registration open" would still be
 * claiming it in November.
 */
export const getStaticProps = async () => ({
  props: { open: registrationIsOpen() },
  revalidate: 3600
});
