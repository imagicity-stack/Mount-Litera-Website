import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const awards = [
  {
    name: 'The Elden Laureate',
    eligibility: 'Class X students',
    recognition: 'Medal with formal citation | Gifted with a premium book or fountain pen',
    represents:
      'The highest honour of the school, awarded to a student who best embodies the spirit, values, leadership, and character of The Elden Heights.',
    selection:
      'Selection is based on overall conduct, leadership, contribution to school life, and consistency over years. Academic performance is considered as a supporting factor. This award may be withheld if no student meets the standard.'
  },
  {
    name: 'Founder’s Medal of Distinction',
    eligibility: 'Classes VIII to X',
    recognition: 'Gold plated medal | Gifted with a personalised memento or premium diary',
    represents: 'Recognition of students who consistently demonstrate integrity, responsibility, maturity, and institutional values.',
    selection: 'Awarded through holistic faculty judgement based on behaviour, discipline, and positive influence within the school community.'
  },
  {
    name: 'Governor’s Medal for Academic Excellence',
    eligibility: 'Class X students',
    recognition: 'Academic medal and certificate | Gifted with an academic reference book or learning voucher',
    represents: 'The highest academic distinction of the graduating cohort.',
    selection:
      'Awarded to the student securing the highest aggregate marks in the final board examination, with a minimum attendance requirement and a clean academic conduct record. This award is strictly numerical and data driven.'
  },
  {
    name: 'Subject Topper Awards',
    eligibility: 'Classes IX and X',
    recognition: 'Subject wise shield | Gifted with subject specific learning material',
    represents: 'Recognition of exceptional academic mastery in individual subjects.',
    selection: 'Awarded to students achieving the highest marks in each subject in the annual examination. Selection is based purely on academic scores.'
  },
  {
    name: 'The Elden Honours Book',
    eligibility: 'Classes IV to X',
    recognition: 'Permanent entry into the institutional Honours Book | No physical trophy or certificate',
    represents:
      'A lasting institutional record of distinction. Names recorded in the Honours Book become part of the school’s permanent legacy.',
    selection: 'Selection is based on sustained performance, faculty recommendation, and conduct.',
    categories: ['Academic distinction', 'Leadership and responsibility', 'Sports excellence', 'Cultural excellence']
  },
  {
    name: 'The Elden Code Bearer',
    eligibility: 'Classes VI to X',
    recognition: 'Medal | Gifted with an inspirational book',
    represents: 'Recognition of exemplary character, honesty, discipline, and adherence to the school’s code of conduct.',
    selection: 'Awarded through consistent observation of conduct across the academic year. Selection is based entirely on holistic judgement.'
  },
  {
    name: 'Young Leader’s Commendation',
    eligibility: 'Classes VIII to X',
    recognition: 'Trophy | Gifted with a leadership or communication kit',
    represents: 'Recognition of initiative, responsibility, and leadership within the school community.',
    selection: 'Based on demonstrated leadership roles, initiative taken, peer impact, and faculty recommendation.'
  },
  {
    name: 'The Ascension Award',
    eligibility: 'Classes IV to X',
    recognition: 'Shield | Gifted with a personal development book',
    represents: 'Recognition of exceptional improvement and personal growth across academics, behaviour, or attitude.',
    selection:
      'Selection considers visible progress across the academic year supported by internal assessment trends and faculty observation.'
  },
  {
    name: 'Colours Award',
    eligibility: 'Classes VI to X',
    recognition: 'Blazer badge or medal | Gifted with a sports kit accessory',
    represents: 'Sustained excellence, discipline, and sportsmanship in physical education and competitive sports.',
    selection: 'Awarded on the recommendation of sports faculty based on consistent participation and conduct over time.'
  },
  {
    name: 'Cultural Laureate',
    eligibility: 'Classes VI to X',
    recognition: 'Trophy | Gifted with an art or music related kit',
    represents: 'Outstanding contribution and excellence in arts, music, theatre, or cultural expression.',
    selection: 'Selection is based on performance quality, participation, representation of the school, and faculty recommendation.'
  }
];

export default function CorePage() {
  return (
    <>
      <Head>
        <title>Core | The Elden Heights School</title>
        <meta
          name="description"
          content="Discover the core ethos of The Elden Heights School and explore our distinguished awards and recognition framework."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="bg-ivory border-b border-cardinal/10">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid gap-10 md:grid-cols-[1.2fr,0.8fr] items-start">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-cardinal/70">Core Pillars</p>
                <h1 className="text-4xl font-semibold text-cardinal">Legacy, Discipline, Distinction</h1>
                <p className="text-gray-700 leading-relaxed">
                  The Core space celebrates the standards, recognitions, and guiding principles that shape every Eldenite. Here
                  you will find the honours we bestow with intention and the promise we make to uphold a culture of meaningful
                  excellence.
                </p>
                <Link
                  href="#awards"
                  className="inline-flex items-center justify-center bg-cardinal text-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] shadow-lg shadow-cardinal/20 hover:bg-cardinal/90 transition"
                >
                  Awards and Recognition
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="ml-3 h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
              <div className="bg-white border border-cardinal/10 shadow-sm p-6 space-y-3">
                <p className="text-sm uppercase tracking-[0.25em] text-cardinal/60">Awards and Recognition</p>
                <h2 className="text-2xl font-semibold text-cardinal">Recognition with Purpose</h2>
                <p className="text-gray-700 leading-relaxed">
                  At The Elden Heights, recognition is not routine. It is earned. Each honour is designed to uphold dignity and
                  scarcity, reflecting the values of the institution and awarded only after thoughtful evaluation.
                </p>
              </div>
            </div>
          </section>

          <section id="awards" className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-10">
              <div className="space-y-3 max-w-4xl">
                <h2 className="text-3xl font-semibold text-cardinal">Awards and Recognition</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our awards honour excellence, integrity, growth, and contribution. Each recognition is conferred through a
                  balanced approach that combines holistic judgement with clearly defined academic benchmarks where required. Not
                  every year guarantees every award; merit alone decides.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {awards.map((award) => (
                  <div key={award.name} className="border border-cardinal/15 bg-ivory/60 p-6 shadow-sm space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-cardinal/60">Honour</p>
                      <h3 className="text-2xl font-semibold text-cardinal">{award.name}</h3>
                    </div>
                    <div className="space-y-2 text-gray-800 text-sm leading-relaxed">
                      <p><span className="font-semibold text-midnight">Eligibility:</span> {award.eligibility}</p>
                      <p><span className="font-semibold text-midnight">Nature of Recognition:</span> {award.recognition}</p>
                      <p><span className="font-semibold text-midnight">What it Represents:</span> {award.represents}</p>
                      <p><span className="font-semibold text-midnight">How Selection Works:</span> {award.selection}</p>
                      {award.categories && (
                        <div className="space-y-1">
                          <p className="font-semibold text-midnight">Categories of Recognition:</p>
                          <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                            {award.categories.map((category) => (
                              <li key={`${award.name}-${category}`}>{category}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-cardinal/15 bg-ivory/60 p-6 shadow-sm space-y-3">
                <h3 className="text-2xl font-semibold text-cardinal">A Culture of Meaningful Recognition</h3>
                <p className="text-gray-800 leading-relaxed">
                  At The Elden Heights, awards are not distributed for participation. They are conferred for purpose. Each
                  recognition reflects our belief that true excellence lies not only in achievement, but in character, consistency,
                  and growth.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  This approach ensures that every honour carries weight, pride, and lifelong significance.
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
