import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

import { CONTACT_EMAIL } from '@/lib/contactInfo';

export default function ComplaintProceduresPage() {
  return (
    <>
      <Seo path="/policies/complaint-procedures" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Complaint Procedures"
            subtitle="Clear steps for raising and resolving concerns."
            eyebrow="Policy"
            image="/policies/complaint-procedures/banner-policy.jpg"
          />
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6">
              <div className="mb-10">
                <span className="eyebrow">Policy Document</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl">
                  Complaint Procedures
                </h1>
                <span className="mt-6 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </div>
              <div className="surface-card space-y-6 rounded-[22px] p-8 text-midnight/85 md:p-12">
              <p>
                The Elden Heights School values constructive feedback and treats every complaint with confidentiality and seriousness.
                Our structured procedure ensures that concerns are resolved efficiently while keeping all stakeholders informed.
              </p>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Step-by-Step Resolution</h2>
                <ol className="space-y-2 text-midnight/80 list-decimal list-inside">
                  <li>
                    Submit the concern via email to{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-black underline">
                      {CONTACT_EMAIL}
                    </a>{' '}
                    or through the school office.
                  </li>
                  <li>The relevant coordinator acknowledges receipt within two working days and logs the complaint.</li>
                  <li>An internal review is conducted with the concerned faculty or department to gather facts.</li>
                  <li>Resolution, recommendations, or corrective actions are shared with the complainant within ten working days.</li>
                </ol>
              </div>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Escalation Matrix</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Unresolved issues at the class level escalate to the academic coordinator or vice principal.</li>
                  <li>Matters requiring administrative intervention are reviewed by the principal and school management.</li>
                  <li>For sensitive cases, a special committee including counsellors and parent representatives convenes.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Commitment to Fairness</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>All complaints are handled without bias, ensuring privacy and respect for every individual involved.</li>
                  <li>Documentation of actions taken is maintained for accountability and future reference.</li>
                  <li>Feedback from the complainant is collected to confirm satisfaction with the resolution provided.</li>
                </ul>
              </div>
              <p>
                We encourage students, parents, and staff to voice their concerns confidently. Together we build a responsive and
                transparent school culture.
              </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
