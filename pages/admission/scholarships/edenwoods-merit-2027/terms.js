/**
 * The full Terms and Conditions, on one page.
 *
 * This is the document a parent agrees to when they pay, so it is set as a
 * document: numbered clauses, generous measure, no marketing. The numbering
 * matches the signed PDF, so "clause 6.5" means the same thing to a parent and
 * to the office.
 */

import Head from 'next/head';
import Link from 'next/link';

import Seo from '@/components/Seo';
import { ScholarshipFooter, ScholarshipHeader } from '@/components/scholarship/Chrome';
import { foundation, scholarship, tiers } from '@/lib/scholarship';
import { terms } from '@/lib/scholarshipCopy';

export default function ScholarshipTerms() {
  return (
    <>
      <Seo path="/admission/scholarships/edenwoods-merit-2027/terms" />
      <Head>
        <meta name="theme-color" content="#06423C" />
      </Head>

      <div className="eden-theme flex min-h-screen flex-col bg-ivory">
        <ScholarshipHeader showRegister={false} />

        <main className="flex-1">
          <article className="shell max-w-[52rem] py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="text-[0.8rem] text-ink-muted">
              <Link href="/admission" className="hover:text-eden-700">
                Admission
              </Link>
              <span className="mx-2">/</span>
              <Link href="/admission/scholarships" className="hover:text-eden-700">
                Scholarships
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/admission/scholarships/edenwoods-merit-2027"
                className="hover:text-eden-700"
              >
                Edenwoods Merit Scholarship 2027
              </Link>
            </nav>

            <span className="rule-heavy mt-8" />

            <h1 className="mt-9 font-display text-[clamp(1.9rem,4.2vw,3rem)] font-medium leading-[1.1] text-ink">
              {terms.title}
            </h1>

            <p className="mt-5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
              {foundation.name} · Last updated {terms.updated}
            </p>

            <p className="lede mt-7 border-l-[3px] border-eden-600 pl-6">{terms.intro}</p>

            {terms.sections.map((section, sectionIndex) => (
              <section key={section.heading} className="mt-12">
                <h2 className="font-display text-[1.45rem] font-medium leading-snug text-ink md:text-[1.7rem]">
                  <span className="mr-2 text-eden-600">{sectionIndex + 1}.</span>
                  {section.heading}
                </h2>

                {section.lede && (
                  <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">{section.lede}</p>
                )}

                {section.table && (
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[30rem] border-collapse text-left">
                      <thead>
                        <tr className="border-y-2 border-ink">
                          <th className="py-3 pr-6 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                            Score in the test or activity
                          </th>
                          <th className="py-3 text-right text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                            Tuition fee waived for 2027-28
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tiers.map((tier) => (
                          <tr key={tier.score} className="border-b border-hairline">
                            <td className="py-3.5 pr-6 align-top text-[0.95rem] text-ink-soft">
                              {tier.score}
                              {tier.qualifier && (
                                <span className="block text-[0.85rem] text-ink-muted">
                                  {tier.qualifier}
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 text-right align-top text-[0.95rem] font-bold text-ink">
                              {tier.award}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <ol className="mt-5 space-y-3.5">
                  {section.items.map((item, index) => (
                    <li
                      key={item}
                      className="grid grid-cols-[2.2rem_1fr] gap-1 text-[0.98rem] leading-relaxed text-ink-soft"
                    >
                      <span className="font-bold tabular-nums text-ink-muted">
                        {sectionIndex + 1}.{index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}

            <section className="mt-14 border-t-[3px] border-ink pt-9">
              <h2 className="font-display text-[1.45rem] font-medium text-ink">
                {terms.contact.lede}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {terms.contact.items.map((item) => (
                  <li key={item} className="text-[0.98rem] leading-relaxed text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-9 sm:flex-row sm:items-center">
              <Link
                href="/admission/scholarships/edenwoods-merit-2027#register"
                className="btn-primary w-full text-center sm:w-auto"
              >
                Register · ₹{scholarship.registrationFee}
              </Link>
              <p className="text-[0.85rem] leading-relaxed text-ink-muted sm:ml-3">
                By registering, you agree to these terms.
              </p>
            </div>
          </article>
        </main>

        <ScholarshipFooter />
      </div>
    </>
  );
}
