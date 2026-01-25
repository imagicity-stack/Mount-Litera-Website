import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { CONTACT_EMAIL } from '@/lib/contactInfo';

export default function AntiRaggingPolicyPage() {
  return (
    <>
      <Seo path="/policies/anti-ragging-message" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-16 bg-[#F5F5F5]">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-black">Anti-Ragging Message</h1>
              <p>
                The Elden Heights School enforces a strict zero-tolerance policy against ragging in any form. We believe that every
                learner must feel safe, valued, and confident within our campus boundaries. Any behaviour that intimidates,
                humiliates, or harms another individual is unacceptable and attracts immediate disciplinary action.
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-black">Preventive Measures</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Awareness sessions for students, parents, and staff at the start of every academic year.</li>
                  <li>Undertakings signed by students and guardians affirming their commitment to a ragging-free campus.</li>
                  <li>Mentor-mentee programmes that foster trust, empathy, and peer support.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-black">Reporting &amp; Response</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Dedicated anti-ragging committee comprising senior faculty, counsellors, and parent representatives.</li>
                  <li>
                    Multiple reporting channels, including confidential email ({CONTACT_EMAIL}) and in-person escalation.
                  </li>
                  <li>Swift investigation followed by disciplinary action aligned with school policy and legal requirements.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-black">Support for Students</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
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
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
