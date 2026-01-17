import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const modules = [
  {
    title: 'Financial Literacy and ATM Usage',
    description:
      'Students learn how to use an ATM, understand debit and digital payments, basic banking behaviour, and money responsibility.',
    outcome: 'Outcome for parents: financially aware, independent children.'
  },
  {
    title: 'Basic Nursing and First Aid',
    description: 'Training in basic first aid, handling minor injuries, emergency response, and CPR awareness.',
    outcome: 'Outcome for parents: safety awareness, calmness during emergencies.'
  },
  {
    title: 'Digital Safety and Online Awareness',
    description: 'Covers password safety, online behaviour, scam awareness, and responsible screen usage.',
    outcome: 'Outcome for parents: digitally responsible and secure children.'
  },
  {
    title: 'Public Behaviour and Personal Safety',
    description:
      'Focuses on road safety, emergency response, public etiquette, asking for help, and situational awareness.',
    outcome: 'Outcome for parents: street smart and confident children.'
  },
  {
    title: 'Everyday Documentation and Practical Skills',
    description: 'Students learn to read bills, understand receipts, fill simple forms, and manage basic documentation.',
    outcome: 'Outcome for parents: practical intelligence and independence.'
  }
];

const characteristics = [
  'Mandatory for all students',
  'Practical and hands on learning',
  'No exams or marks',
  'Focused on real world independence'
];

export default function LifeReadinessProgramPage() {
  return (
    <>
      <Head>
        <title>Life Readiness Program | The Elden Heights School</title>
        <meta
          name="description"
          content="Explore the Life Readiness Program that equips Elden Heights students with real-world skills and confident independence."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="section-divider bg-ivory/80">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 space-y-6">
              <div className="space-y-4 max-w-5xl">
                <p className="text-xs uppercase tracking-[0.35em] text-black">Life Readiness Program</p>
                <h1 className="text-4xl font-semibold text-black">Preparing Children for the Real World</h1>
                <p className="text-gray-700 leading-relaxed">
                  The Life Readiness Program is a foundational and mandatory initiative designed to equip every child with
                  essential real world skills. These are not optional activities. These are life skills every student must learn
                  to function independently and responsibly. This program follows an age appropriate, progressive structure,
                  ensuring students build real competence as they grow.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-12">
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold text-black">Core Life Readiness Modules</h2>
                <p className="text-gray-700 leading-relaxed max-w-4xl">
                  Practical, hands-on learning that grows with every student so readiness becomes second nature.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {modules.map((module) => (
                  <div key={module.title} className="border border-black/15 bg-ivory/70 p-6 space-y-3 shadow-sm">
                    <h3 className="text-2xl font-semibold text-black">{module.title}</h3>
                    <p className="text-gray-800 leading-relaxed text-sm">{module.description}</p>
                    <p className="text-gray-700 text-sm font-semibold">{module.outcome}</p>
                  </div>
                ))}
              </div>

              <div className="border border-black/15 bg-ivory/80 p-6 space-y-3 shadow-sm">
                <h3 className="text-2xl font-semibold text-black">Key Characteristics of Life Readiness Program</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-800 text-sm">
                  {characteristics.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
