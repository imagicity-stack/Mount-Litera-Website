import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ComplaintProceduresPage() {
  return (
    <>
      <Head>
        <title>Complaint Procedures | Mount Litera School</title>
        <meta
          name="description"
          content="Learn how Mount Litera School addresses complaints promptly, fairly, and transparently."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-16 bg-[#F5F5F5]">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">Complaint Procedures</h1>
              <p>
                Mount Litera School values constructive feedback and treats every complaint with confidentiality and seriousness.
                Our structured procedure ensures that concerns are resolved efficiently while keeping all stakeholders informed.
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Step-by-Step Resolution</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Submit the concern via email to <a href="mailto:smmlzshzb@gmail.com" className="text-cardinal underline">smmlzshzb@gmail.com</a> or through the school office.</li>
                  <li>The relevant coordinator acknowledges receipt within two working days and logs the complaint.</li>
                  <li>An internal review is conducted with the concerned faculty or department to gather facts.</li>
                  <li>Resolution, recommendations, or corrective actions are shared with the complainant within ten working days.</li>
                </ol>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Escalation Matrix</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Unresolved issues at the class level escalate to the academic coordinator or vice principal.</li>
                  <li>Matters requiring administrative intervention are reviewed by the principal and school management.</li>
                  <li>For sensitive cases, a special committee including counsellors and parent representatives convenes.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Commitment to Fairness</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
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
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
