import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

import { CONTACT_EMAIL } from '@/lib/contactInfo';

export default function DisabilityPolicyPage() {
  return (
    <>
      <Seo path="/policies/disability-policy" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Disability Policy"
            subtitle="An inclusive learning commitment for every learner."
            eyebrow="Policy"
            image="/policies/disability-policy/banner-policy.jpg"
          />
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6">
              <div className="mb-10">
                <span className="eyebrow">Policy Document</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl">
                  Disability Policy
                </h1>
                <span className="mt-6 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </div>
              <div className="surface-card space-y-6 rounded-none p-8 text-midnight/85 md:p-12">
              <p>
                The Elden Heights School is committed to providing an equitable, dignified, and inclusive learning experience for
                learners with disabilities. Our policy aligns with national education and disability guidelines and ensures that
                every student receives personalised support to thrive academically and socially.
              </p>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Inclusive Access</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Barrier-free access to classrooms, laboratories, and activity zones wherever feasible.</li>
                  <li>Priority seating, assistive furniture, and visual signage to support mobility and orientation.</li>
                  <li>Provision of digital and print learning materials in accessible formats on request.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Learning Support</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Individualised Education Plans (IEPs) designed in partnership with parents and specialists.</li>
                  <li>Assessment accommodations such as extra time, scribes, or assistive devices, as recommended.</li>
                  <li>Regular progress reviews to monitor academic, social, and emotional development.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Collaborative Care</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Training and sensitisation workshops for teachers, staff, and peers.</li>
                  <li>Dedicated counsellor support to address personal, academic, and transition-related concerns.</li>
                  <li>Engagement with certified therapists and medical professionals for specialised interventions.</li>
                </ul>
              </div>
              <p>
                Families can reach our inclusion coordinator at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-black underline">
                  {CONTACT_EMAIL}
                </a>
                to discuss accommodations or share feedback that enhances our inclusive ecosystem.
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
