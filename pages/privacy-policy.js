import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Mount Litera School</title>
        <meta
          name="description"
          content="Read how Mount Litera School collects, uses, and protects personal information shared through mlzshazaribagh.in."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-16 bg-[#F8F5F3]">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">Privacy Policy</h1>
              <p className="text-sm text-gray-500">Effective Date: November 2025</p>
              <p>Website: mlzshazaribagh.in</p>
              <p>Email: <a href="mailto:smmlzshzb@gmail.com" className="text-cardinal underline">smmlzshzb@gmail.com</a></p>
              <p>
                Mount Litera School (“we,” “our,” or “us”) respects your privacy and is committed to protecting the personal
                information you share with us through this website. This Privacy Policy explains how we collect, use, and protect
                your data when you visit our site or submit an inquiry form.
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">1. Information We Collect</h2>
                <p>We may collect the following information from you:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Personal Details:</strong> Name, Parent’s Name, Email Address, Phone Number, and Class Interested In, as
                    provided in inquiry or admission forms.
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Limited payment-related data (through secure payment gateways) when you make
                    admission or registration payments.
                  </li>
                  <li>
                    <strong>Automatically Collected Data:</strong> Browser type, device details, IP address, and website usage statistics via
                    cookies or analytics tools.
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">2. How We Use Your Information</h2>
                <p>Your data is collected solely for the purpose of:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Processing admission inquiries and applications.</li>
                  <li>Responding to your questions or requests.</li>
                  <li>Communicating important school updates or events.</li>
                  <li>Processing fee or admission payments through secure channels.</li>
                  <li>Improving website performance and user experience.</li>
                </ul>
                <p>We do not sell, rent, or trade your personal information with any third party.</p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">3. Data Protection</h2>
                <p>
                  We use secure systems and third-party services to protect your data against unauthorized access or misuse. All
                  payment transactions are handled through verified and encrypted gateways (such as Razorpay or other secure
                  payment partners).
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">4. Sharing of Information</h2>
                <p>We may share information only when:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Required by law or government authorities.</li>
                  <li>Necessary to complete a payment or service process (e.g., payment gateway partners).</li>
                  <li>Required for website maintenance or analytics (anonymous data only).</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">5. Cookies</h2>
                <p>
                  Our website may use cookies to improve user experience and analyze website traffic. You can choose to disable
                  cookies through your browser settings, but certain parts of the website may not function optimally.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">6. External Links</h2>
                <p>
                  Our website may contain links to third-party sites. We are not responsible for the privacy policies or practices
                  of these external websites. Please review their policies before sharing any personal information.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">7. Your Rights</h2>
                <p>
                  You can request access, correction, or deletion of your personal data by writing to
                  <a href="mailto:smmlzshzb@gmail.com" className="text-cardinal underline">smmlzshzb@gmail.com</a>. We will respond within a
                  reasonable timeframe and take necessary action as per applicable regulations.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">8. Policy Updates</h2>
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices. The revised version will
                  always be available on this page with an updated effective date.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">9. Contact Us</h2>
                <p>If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at:</p>
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
