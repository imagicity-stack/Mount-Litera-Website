import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

import { CONTACT_EMAIL } from '@/lib/contactInfo';

export default function AntiRaggingPolicyPage() {
  return (
    <>
      <Seo path="/policies/anti-ragging-message" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Anti-Ragging Message"
            subtitle="A zero-tolerance commitment to safety and respect."
            eyebrow="Policy"
            image="/policies/anti-ragging-message/banner-policy.jpg"
          />
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6">
              <div className="mb-10">
                <span className="eyebrow">Policy Document</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl">
                  Anti-Ragging Message
                </h1>
                <span className="mt-6 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </div>
              <div className="surface-card space-y-6 rounded-[22px] p-8 text-midnight/85 md:p-12">
              <p>
                The Elden Heights School enforces a strict zero-tolerance policy against ragging in any form. We believe that every
                learner must feel safe, valued, and confident within our campus boundaries. Any behaviour that intimidates,
                humiliates, or harms another individual is unacceptable and attracts immediate disciplinary action.
              </p>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Preventive Measures</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Awareness sessions for students, parents, and staff at the start of every academic year.</li>
                  <li>Undertakings signed by students and guardians affirming their commitment to a ragging-free campus.</li>
                  <li>Mentor-mentee programmes that foster trust, empathy, and peer support.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Reporting &amp; Response</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Dedicated anti-ragging committee comprising senior faculty, counsellors, and parent representatives.</li>
                  <li>
                    Multiple reporting channels, including confidential email ({CONTACT_EMAIL}) and in-person escalation.
                  </li>
                  <li>Swift investigation followed by disciplinary action aligned with school policy and legal requirements.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Support for Students</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Immediate counselling assistance for affected students and families.</li>
                  <li>Restorative practices that encourage accountability, empathy, and positive behaviour changes.</li>
                  <li>Regular campus safety audits and anonymous feedback surveys.</li>
                </ul>
              </div>
              <p>
                We encourage students to raise their voice without fear. Together, we cultivate a culture of kindness where every
                member of The Elden Heights School community is protected and empowered.
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
