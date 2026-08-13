import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

import { CONTACT_EMAIL } from '@/lib/contactInfo';

export default function ParentChildContactPage() {
  return (
    <>
      <Seo path="/policies/parent-child-contact-mechanism" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Parent Child Contact Mechanism"
            subtitle="Communication touchpoints that keep families connected."
            eyebrow="Policy"
            image="/policies/parent-child-contact-mechanism/banner-policy.jpg"
          />
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6">
              <div className="mb-10">
                <span className="eyebrow">Policy Document</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl">
                  Parent &amp; Child Contact Mechanism
                </h1>
                <span className="mt-6 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </div>
              <div className="surface-card space-y-6 rounded-none p-8 text-midnight/85 md:p-12">
              <p>
                We believe that education thrives when parents, students, and teachers collaborate. The Elden Heights School maintains
                transparent, timely, and multi-channel communication so that every family stays informed and involved in their
                child’s learning journey.
              </p>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Regular Communication Touchpoints</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Monthly academic updates shared through the school app, email, or printed circulars.</li>
                  <li>Term-wise parent-teacher meetings focusing on progress, goals, and personalised interventions.</li>
                  <li>Emergency alerts and important announcements delivered instantly via SMS and WhatsApp broadcasts.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Dedicated Support Channels</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Class teachers reachable during working hours for quick clarifications.</li>
                  <li>
                    Academic coordinators and the school office available via{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-black underline">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </li>
                  <li>Counsellors and special educators accessible through scheduled appointments.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Feedback &amp; Engagement</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Biannual satisfaction surveys to understand parent perspectives and suggestions.</li>
                  <li>Workshops and orientation sessions designed to equip families with academic and wellness resources.</li>
                  <li>Open-door policy for meeting school leadership with prior appointments.</li>
                </ul>
              </div>
              <p>
                We encourage parents to stay connected and partner with us in shaping confident, compassionate, and future-ready
                learners.
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
