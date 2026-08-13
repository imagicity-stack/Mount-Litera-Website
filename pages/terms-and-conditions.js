import Link from 'next/link';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

import { CONTACT_EMAIL } from '@/lib/contactInfo';

const sections = [
  {
    heading: '1 · General Use',
    paragraph:
      'This website is managed by The Elden Heights School, located in Katghara, Opp. BSF Firing Range, Silwar, Hazaribagh, Jharkhand. The content is intended to share information about our school, admission process, facilities, and events. You agree to use the website only for lawful purposes and in a way that does not violate the rights of, restrict, or inhibit anyone else’s use and enjoyment of it.'
  },
  {
    heading: '2 · Accuracy of Information',
    paragraph:
      'We make every effort to ensure that all information is accurate and up to date. However, we do not warrant or guarantee that the information is complete, reliable, or error-free. The Elden Heights School reserves the right to modify content, admission details, or any part of the website at any time without prior notice.'
  },
  {
    heading: '3 · Admissions &amp; Payments',
    bullets: [
      'All admissions and related payments are subject to school verification and approval.',
      'Fees once paid are non-transferable and may be partially refundable based on specific school policies or circumstances (handled case by case).',
      'The school is not responsible for technical issues, payment gateway errors, or failed transactions caused by network or user-end problems.',
      'Payments are processed securely through authorized partners such as Razorpay or other recognized payment gateways.'
    ]
  },
  {
    heading: '4 · Intellectual Property',
    paragraph:
      'All content on this website — including text, logos, graphics, layouts, and design elements — is the property of The Elden Heights School unless otherwise stated. You may not reproduce, distribute, or commercially exploit any content without written permission.'
  },
  {
    heading: '5 · Limitation of Liability',
    paragraph:
      'The Elden Heights School and its representatives are not liable for any direct, indirect, or consequential damages arising out of the use or inability to use the website or any linked content. Users are responsible for ensuring that any materials downloaded from this site are free from viruses or harmful components.'
  },
  {
    heading: '6 · External Links',
    paragraph:
      'Our website may contain links to third-party websites or services. These are provided for convenience only. The Elden Heights School is not responsible for the content, accuracy, or practices of these external sites.'
  },
  {
    heading: '7 · Privacy',
    paragraphHtml:
      'Your use of this website is also governed by our <a href="/privacy-policy" class="text-cardinal underline underline-offset-4">Privacy Policy</a>. By continuing to use this site, you consent to our data collection and usage practices as described there.'
  },
  {
    heading: '8 · Changes to Terms',
    paragraph:
      'We reserve the right to modify or replace these Terms and Conditions at any time. Any changes will be posted on this page with an updated effective date. Continued use of the site after changes are made implies your acceptance of the revised terms.'
  }
];

export default function TermsPage() {
  return (
    <>
      <Seo path="/terms-and-conditions" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Terms &amp; Conditions"
            subtitle="The guidelines that keep our community safe and aligned."
            eyebrow="Terms"
            image="/terms-and-conditions/banner-terms.jpg"
          />
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6">
              <div className="mb-12">
                <span className="eyebrow">Effective · November 2025</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl">
                  Terms &amp; Conditions
                </h1>
                <span className="mt-6 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="mt-6 text-midnight/75 md:text-lg">
                  Welcome to The Elden Heights School&rsquo;s website. By accessing or using this
                  website, you agree to comply with the following terms. If you do not agree with
                  any part of these terms, please refrain from using the site.
                </p>
              </div>

              <div className="space-y-6">
                {sections.map((section) => (
                  <div key={section.heading} className="surface-card rounded-none p-8">
                    <h2
                      className="font-garamond text-2xl font-semibold text-midnight"
                      dangerouslySetInnerHTML={{ __html: section.heading }}
                    />
                    <span className="mt-3 block h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                    {section.paragraph && (
                      <p className="mt-4 leading-relaxed text-midnight/80">{section.paragraph}</p>
                    )}
                    {section.paragraphHtml && (
                      <p
                        className="mt-4 leading-relaxed text-midnight/80"
                        dangerouslySetInnerHTML={{ __html: section.paragraphHtml }}
                      />
                    )}
                    {section.bullets && (
                      <ul className="mt-4 space-y-2 text-midnight/80">
                        {section.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-[7px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-gradient-to-br from-gold to-cardinal shadow-[0_0_0_3px_rgba(201,162,75,0.15)]" />
                            <span dangerouslySetInnerHTML={{ __html: b }} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <div className="surface-card rounded-none p-8">
                  <h2 className="font-garamond text-2xl font-semibold text-midnight">9 · Contact</h2>
                  <span className="mt-3 block h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                  <ul className="mt-4 space-y-3 text-midnight/80">
                    <li className="flex items-start gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                        Email
                      </span>
                      <Link href={`mailto:${CONTACT_EMAIL}`} className="text-midnight underline decoration-gold/60 underline-offset-4 hover:text-cardinal">
                        {CONTACT_EMAIL}
                      </Link>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                        Address
                      </span>
                      <span>
                        The Elden Heights School, Katghara, Opp. BSF Firing Range, Silwar, Hazaribagh, Jharkhand.
                      </span>
                    </li>
                  </ul>
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
