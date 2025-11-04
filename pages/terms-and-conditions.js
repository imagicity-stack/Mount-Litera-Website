import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Mount Litera School</title>
        <meta
          name="description"
          content="Review the terms and conditions for using Mount Litera School's official website."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-16 bg-[#F8F5F3]">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">Terms and Conditions</h1>
              <p className="text-sm text-gray-500">Effective Date: November 2025</p>
              <p>Website: Mount Litera School</p>
              <p>Email: <a href="mailto:smmlzshzb@gmail.com" className="text-cardinal underline">smmlzshzb@gmail.com</a></p>
              <p>
                Welcome to Mount Litera School’s website. By accessing or using this website, you agree to comply with the
                following Terms and Conditions. If you do not agree with any part of these terms, please refrain from using the
                site.
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">1. General Use</h2>
                <p>
                  This website is managed by Mount Litera School, located in Katghara, Opp. BSF Firing Range, Silwar, Hazaribagh,
                  Jharkhand. The content provided here is intended to share information about our school, admission process,
                  facilities, and events. You agree to use the website only for lawful purposes and in a way that does not violate
                  the rights of, restrict, or inhibit anyone else’s use and enjoyment of it.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">2. Accuracy of Information</h2>
                <p>
                  We make every effort to ensure that all information on this website is accurate and up-to-date. However, we do
                  not warrant or guarantee that the information is complete, reliable, or error-free. Mount Litera School
                  reserves the right to modify content, admission details, or any part of the website at any time without prior
                  notice.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">3. Admissions and Payments</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>All admissions and related payments are subject to school verification and approval.</li>
                  <li>
                    Fees once paid are non-transferable and may be partially refundable based on specific school policies or
                    circumstances (to be handled case-by-case).
                  </li>
                  <li>
                    The school is not responsible for technical issues, payment gateway errors, or failed transactions caused by
                    network or user-end problems.
                  </li>
                  <li>
                    Payments are processed securely through authorized partners such as Razorpay or other recognized payment
                    gateways.
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">4. Intellectual Property</h2>
                <p>
                  All content on this website — including text, logos, graphics, layouts, and design elements — is the property
                  of Mount Litera School unless otherwise stated. You may not reproduce, distribute, or commercially exploit any
                  content without written permission from the school administration.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">5. Limitation of Liability</h2>
                <p>
                  Mount Litera School and its representatives are not liable for any direct, indirect, or consequential damages
                  arising out of the use or inability to use the website or any linked content. Users are responsible for
                  ensuring that any materials downloaded from this site are free from viruses or harmful components.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">6. External Links</h2>
                <p>
                  Our website may contain links to third-party websites or services. These are provided for convenience only.
                  Mount Litera School is not responsible for the content, accuracy, or practices of these external sites.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">7. Privacy</h2>
                <p>
                  Your use of this website is also governed by our <a href="/privacy-policy" className="text-cardinal underline">Privacy Policy</a>.
                  By continuing to use this site, you consent to our data collection and usage practices as described there.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">8. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms and Conditions at any time. Any changes will be posted on
                  this page with an updated effective date. Continued use of the site after changes are made implies your
                  acceptance of the revised terms.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">9. Contact Information</h2>
                <p>If you have any questions regarding these Terms and Conditions, please contact us at:</p>
                <ul className="space-y-1 text-gray-700">
                  <li>
                    <span role="img" aria-label="email">📧</span> <a href="mailto:smmlzshzb@gmail.com" className="text-cardinal underline">smmlzshzb@gmail.com</a>
                  </li>
                  <li>
                    <span role="img" aria-label="location">🏫</span> Mount Litera School, Katghara, Opp. BSF Firing Range, Silwar, Hazaribagh,
                    Jharkhand.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
