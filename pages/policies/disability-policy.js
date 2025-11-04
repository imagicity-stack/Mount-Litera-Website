import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DisabilityPolicyPage() {
  return (
    <>
      <Head>
        <title>Disability Policy | Mount Litera School</title>
        <meta
          name="description"
          content="Mount Litera School's disability policy outlines inclusive practices, accessible infrastructure, and equal opportunities for all learners."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-16 bg-[#F5F5F5]">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">Disability Policy</h1>
              <p>
                Mount Litera School is committed to providing an equitable, dignified, and inclusive learning experience for
                learners with disabilities. Our policy aligns with national education and disability guidelines and ensures that
                every student receives personalised support to thrive academically and socially.
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Inclusive Access</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Barrier-free access to classrooms, laboratories, and activity zones wherever feasible.</li>
                  <li>Priority seating, assistive furniture, and visual signage to support mobility and orientation.</li>
                  <li>Provision of digital and print learning materials in accessible formats on request.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Learning Support</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Individualised Education Plans (IEPs) designed in partnership with parents and specialists.</li>
                  <li>Assessment accommodations such as extra time, scribes, or assistive devices, as recommended.</li>
                  <li>Regular progress reviews to monitor academic, social, and emotional development.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Collaborative Care</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Training and sensitisation workshops for teachers, staff, and peers.</li>
                  <li>Dedicated counsellor support to address personal, academic, and transition-related concerns.</li>
                  <li>Engagement with certified therapists and medical professionals for specialised interventions.</li>
                </ul>
              </div>
              <p>
                Families can reach our inclusion coordinator at <a href="mailto:smmlzshzb@gmail.com" className="text-cardinal underline">smmlzshzb@gmail.com</a>
                to discuss accommodations or share feedback that enhances our inclusive ecosystem.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
