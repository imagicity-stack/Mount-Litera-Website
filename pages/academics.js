import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Academics from '@/components/Academics';

export default function AcademicsPage() {
  return (
    <>
      <Head>
        <title>Academic Framework | Mount Litera School</title>
        <meta
          name="description"
          content="Discover the learning stages, teaching philosophy, and academic support that power Mount Litera School's curriculum."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="bg-[#F5F5F5] py-16">
            <div className="max-w-4xl mx-auto px-6 space-y-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">Academic Philosophy</h1>
              <p className="text-lg text-gray-600">
                Mount Litera School blends rigorous academics with experiential learning. Each stage of schooling is supported by
                passionate educators, data-informed strategies, and a culture that encourages curiosity, collaboration, and
                resilience.
              </p>
            </div>
          </section>
          <Academics />
          <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-6 grid gap-12 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Learning Beyond the Classroom</h2>
                <p>
                  Co-curricular clubs, sports, and visual and performing arts form an integral part of our timetable. Students are
                  encouraged to explore their passions while building leadership, teamwork, and communication skills.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Supportive Guidance</h2>
                <p>
                  Academic mentors and class teachers collaborate with parents to track progress and design personalised
                  interventions. Counsellors provide socio-emotional guidance to ensure every learner feels heard and supported.
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
