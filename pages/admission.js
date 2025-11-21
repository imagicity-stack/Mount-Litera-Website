import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import Link from 'next/link';

export default function AdmissionPage() {
  return (
    <>
      <Head>
        <title>Admissions 2025–2026 | Mount Litera School</title>
        <meta
          name="description"
          content="Learn about the Mount Litera School admission process for the 2025–2026 session, eligibility, documents required, and how to apply."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-16 bg-[#F8F5F3]">
            <div className="max-w-4xl mx-auto px-6 space-y-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">Admission</h1>
              <p className="text-lg text-gray-600">A New Chapter Begins</p>
              <p>
                Mount Litera School is opening admissions for the 2025–2026 academic session. As we move through our transition
                into a brighter and more dynamic future, we continue to stand for the same values that shaped our legacy —
                discipline, curiosity, and academic excellence. This is your chance to be part of the next generation of learners
                who will experience an upgraded, modern, and future-ready school environment.
              </p>
            </div>
          </section>
          <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-6 space-y-10">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Why Choose Mount Litera School</h2>
                <p>We are not just preparing students for exams but for life. Our re-imagined structure ensures every child grows with purpose, confidence, and creativity.</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Future-Ready Curriculum – A blend of strong academics and practical learning experiences.</li>
                  <li>Experienced Faculty – Dedicated educators who mentor, not just teach.</li>
                  <li>Modern Learning Environment – Digitally-equipped classrooms, safe campus, and an evolving infrastructure.</li>
                  <li>Holistic Growth – Equal focus on academics, sports, arts, and values.</li>
                  <li>Personalized Guidance – Every student’s journey is tracked, mentored, and celebrated.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Admission Process</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Step 1: Fill out the Admission Inquiry Form below.</li>
                  <li>Step 2: Our counselor will contact you to schedule a campus visit and interaction.</li>
                  <li>Step 3: Submit the required documents and complete the registration process at the school office.</li>
                  <li>Step 4: Receive confirmation and orientation details for the upcoming academic session.</li>
                </ol>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Eligibility</h2>
                <p>
                  Admissions are open for Nursery to Grade 10 for the 2025–2026 session. Seats are limited and will be allocated on
                  a first-come, first-served basis following the interaction round. Classes 11 and 12 are under the upcoming
                  academic expansion phase.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Documents Required</h2>
                <p>Parents are requested to keep the following ready for submission at the time of registration:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Birth Certificate (original and photocopy)</li>
                  <li>Previous Report Card (where applicable)</li>
                  <li>Transfer Certificate (for higher grades)</li>
                  <li>Two recent passport-size photographs of the student</li>
                  <li>Parent’s ID Proof (Aadhaar or equivalent)</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Important Note</h2>
                <p>
                  Mount Litera School is currently undergoing a structured transition toward a renewed identity and academic
                  vision. All admissions made during this phase remain valid under the recognized CBSE framework and will
                  seamlessly continue through the upgraded system.
                </p>
              </div>
              <div className="space-y-4 rounded-2xl border border-cardinal/10 bg-cardinal/5 p-6 text-center">
                <h3 className="text-xl font-semibold text-cardinal">Priority booking slots now open</h3>
                <p className="text-gray-700">
                  Families who confirm early get the first choice of interaction dates, faster document processing, and
                  priority in class allocations for the 2026–27 session. Secure your child’s place while seats are still open.
                </p>
                <Link
                  href="/admissions"
                  className="inline-flex items-center justify-center rounded-full bg-cardinal px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-cardinal/90 focus:outline-none focus:ring-2 focus:ring-cardinal/40 focus:ring-offset-2"
                >
                  Explore Admissions
                </Link>
              </div>
            </div>
          </section>
          <InquiryForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
