import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SelfDisciplinePolicyPage() {
  return (
    <>
      <Head>
        <title>Code for Self-Discipline | Mount Litera School</title>
        <meta
          name="description"
          content="Understand the behavioural expectations and self-discipline charter that guides Mount Litera School students."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-16 bg-[#F8F5F3]">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">Code for Self-Discipline</h1>
              <p>
                Mount Litera School nurtures responsible citizens who demonstrate respect, integrity, and resilience. Our Code for
                Self-Discipline empowers students to lead themselves, contribute positively to school life, and uphold the
                Mount Litera ethos on and off campus.
              </p>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Core Expectations</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Arrive on time, prepared for learning, and dressed in the prescribed school attire.</li>
                  <li>Show respect to peers, teachers, staff, and visitors through courteous words and actions.</li>
                  <li>Use school property responsibly and maintain cleanliness across classrooms and common areas.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Responsible Conduct</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Follow classroom procedures, listen actively, and participate constructively.</li>
                  <li>Practice digital citizenship by using technology ethically and safeguarding personal information.</li>
                  <li>Resolve disagreements peacefully, seeking guidance from mentors whenever required.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-cardinal">Leadership in Action</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Take ownership of assignments, deadlines, and collaborative projects.</li>
                  <li>Support peers through empathy, inclusion, and positive encouragement.</li>
                  <li>Represent the school with pride during events, competitions, and community engagements.</li>
                </ul>
              </div>
              <p>
                Reinforcement sessions, mentorship circles, and parental collaboration ensure that the Code for Self-Discipline is
                lived every day. Together, we cultivate a campus culture where discipline stems from self-awareness and mutual
                respect.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
