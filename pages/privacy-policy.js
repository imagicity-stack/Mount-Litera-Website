import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

import { CONTACT_EMAIL } from '@/lib/contactInfo';

const sections = [
  {
    heading: '1 · Information We Collect',
    lead: 'We may collect the following information from you:',
    bullets: [
      '<strong>Personal Details:</strong> Name, Parent’s Name, Email, Phone, and Class Interested In — as provided in inquiry or admission forms.',
      '<strong>Payment Information:</strong> Limited payment-related data (through secure payment gateways) when you make admission or registration payments.',
      '<strong>Automatically Collected Data:</strong> Browser type, device details, IP address, and website usage statistics via cookies or analytics tools.'
    ]
  },
  {
    heading: '2 · How We Use Your Information',
    lead: 'Your data is collected solely for the purpose of:',
    bullets: [
      'Processing admission inquiries and applications.',
      'Responding to your questions or requests.',
      'Communicating important school updates or events.',
      'Processing fee or admission payments through secure channels.',
      'Improving website performance and user experience.'
    ],
    note: 'We do not sell, rent, or trade your personal information with any third party.'
  },
  {
    heading: '3 · Data Protection',
    paragraph:
      'We use secure systems and third-party services to protect your data against unauthorized access or misuse. All payment transactions are handled through verified and encrypted gateways (such as Razorpay or other secure payment partners).'
  },
  {
    heading: '4 · Sharing of Information',
    lead: 'We may share information only when:',
    bullets: [
      'Required by law or government authorities.',
      'Necessary to complete a payment or service process (e.g., payment gateway partners).',
      'Required for website maintenance or analytics (anonymous data only).'
    ]
  },
  {
    heading: '5 · Cookies',
    paragraph:
      'Our website may use cookies to improve user experience and analyze website traffic. You can disable cookies through your browser settings, but certain parts of the website may not function optimally.'
  },
  {
    heading: '6 · External Links',
    paragraph:
      'Our website may contain links to third-party sites. We are not responsible for their privacy policies or practices. Please review their policies before sharing any personal information.'
  },
  {
    heading: '7 · Your Rights',
    paragraph:
      `You can request access, correction, or deletion of your personal data by writing to ${CONTACT_EMAIL}. We will respond within a reasonable timeframe and take necessary action as per applicable regulations.`
  },
  {
    heading: '8 · Policy Updates',
    paragraph:
      'We may update this Privacy Policy periodically to reflect changes in our practices. The revised version will always be available on this page with an updated effective date.'
  }
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo path="/privacy-policy" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Privacy Policy"
            subtitle="How we protect, use, and respect your information."
            eyebrow="Privacy"
            image="/privacy-policy/banner-trust.jpg"
          />
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6">
              <div className="mb-12">
                <span className="eyebrow">Effective · November 2025</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl">
                  Privacy Policy
                </h1>
                <span className="mt-6 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="mt-6 text-midnight/75 md:text-lg">
                  The Elden Heights School (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
                  respects your privacy and is committed to protecting the personal information you
                  share through this website. This Privacy Policy explains how we collect, use, and
                  protect your data when you visit our site or submit an inquiry form.
                </p>
              </div>

              <div className="space-y-6">
                {sections.map((section) => (
                  <div key={section.heading} className="surface-card rounded-[22px] p-8">
                    <h2 className="font-garamond text-2xl font-semibold text-midnight">
                      {section.heading}
                    </h2>
                    <span className="mt-3 block h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                    {section.lead && (
                      <p className="mt-4 text-midnight/80">{section.lead}</p>
                    )}
                    {section.paragraph && (
                      <p className="mt-4 leading-relaxed text-midnight/80">{section.paragraph}</p>
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
                    {section.note && (
                      <p className="mt-4 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm font-semibold text-midnight">
                        {section.note}
                      </p>
                    )}
                  </div>
                ))}

                <div className="surface-card rounded-[22px] p-8">
                  <h2 className="font-garamond text-2xl font-semibold text-midnight">9 · Contact Us</h2>
                  <span className="mt-3 block h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                  <p className="mt-4 text-midnight/80">
                    If you have any questions, concerns, or requests related to this Privacy Policy,
                    please contact us:
                  </p>
                  <ul className="mt-4 space-y-3 text-midnight/80">
                    <li className="flex items-start gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">
                        Email
                      </span>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-midnight underline decoration-gold/60 underline-offset-4 hover:text-cardinal">
                        {CONTACT_EMAIL}
                      </a>
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
