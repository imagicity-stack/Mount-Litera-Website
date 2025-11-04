import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ParentChildContactPage() {
  return (
    <>
      <Head>
        <title>Parent Child Contact Mechanism | Mount Litera School</title>
        <meta
          name="description"
          content="Explore the communication channels that keep Mount Litera School parents connected with their child’s progress."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-16 bg-[#F8F5F3]">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">Parent Child Contact Mechanism</h1>
              <p>
                We believe that education thrives when parents, students, and teachers collaborate. Mount Litera School maintains
                transparent, timely, and multi-channel communication so that every family stays informed and involved in their
                child’s learning journey.
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Regular Communication Touchpoints</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Monthly academic updates shared through the school app, email, or printed circulars.</li>
                  <li>Term-wise parent-teacher meetings focusing on progress, goals, and personalised interventions.</li>
                  <li>Emergency alerts and important announcements delivered instantly via SMS and WhatsApp broadcasts.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Dedicated Support Channels</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Class teachers reachable during working hours for quick clarifications.</li>
                  <li>Academic coordinators and the school office available via <a href="mailto:smmlzshzb@gmail.com" className="text-cardinal underline">smmlzshzb@gmail.com</a>.</li>
                  <li>Counsellors and special educators accessible through scheduled appointments.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Feedback &amp; Engagement</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
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
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
