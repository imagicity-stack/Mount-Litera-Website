import Link from 'next/link';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const awards = [
  {
    name: 'The Elden Laureate',
    eligibility: 'Class X students',
    natureLabel: 'Nature of Award',
    nature: 'Medal with formal citation | Premium book or fountain pen',
    recognitionLabel: 'What This Award Recognises',
    recognises:
      'The student who best represents the values, character, leadership, and overall spirit of The Elden Heights.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Be enrolled in the school for a minimum of three years',
      'Maintain a consistently strong discipline and conduct record',
      'Demonstrate leadership through actions, not position alone',
      'Positively contribute to school culture, events, or initiatives',
      'Maintain above average academic performance across years'
    ],
    note: 'This award may not be given every year if the standard is not met.'
  },
  {
    name: 'Founder’s Medal of Distinction',
    eligibility: 'Classes VIII to X',
    natureLabel: 'Nature of Award',
    nature: 'Gold plated medal | Personalised memento or premium diary',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Integrity, responsibility, maturity, and adherence to school values.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Be enrolled for a minimum of two years',
      'Show respectful behaviour towards peers and staff',
      'Demonstrate honesty, responsibility, and reliability',
      'Have no major disciplinary action on record',
      'Be consistently recognised by teachers for ethical conduct'
    ]
  },
  {
    name: 'Governor’s Medal for Academic Excellence',
    eligibility: 'Class X students',
    natureLabel: 'Nature of Award',
    nature: 'Academic medal and certificate | Academic reference book or learning voucher',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Highest academic achievement in the graduating class.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Secure the highest aggregate marks in the final board examination',
      'Maintain minimum 90 percent attendance',
      'Have no record of academic misconduct',
      'Meet all examination and assessment requirements',
      'This award is based strictly on numerical academic data'
    ]
  },
  {
    name: 'Subject Topper Awards',
    eligibility: 'Classes IX and X',
    natureLabel: 'Nature of Award',
    nature: 'Subject wise shield | Subject specific learning material',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Outstanding mastery in individual subjects.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Achieve the highest marks in the subject in the annual examination',
      'Meet minimum internal assessment requirements',
      'In case of a tie, internal assessments may be considered',
      'Selection is purely academic and score based'
    ]
  },
  {
    name: 'The Elden Honours Book',
    eligibility: 'Classes IV to X',
    natureLabel: 'Nature of Recognition',
    nature: 'Permanent entry in the institutional Honours Book',
    recognitionLabel: 'What This Recognition Represents',
    recognises: 'Long term distinction recorded as part of the school’s permanent legacy.',
    categoriesLabel: 'Students May Be Recorded For',
    categories: [
      'Consistent academic excellence',
      'Demonstrated leadership and responsibility',
      'Sustained sports excellence',
      'Significant cultural contribution'
    ],
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Show sustained performance throughout the academic year',
      'Receive faculty recommendation',
      'Maintain a clean conduct record'
    ]
  },
  {
    name: 'The Elden Code Bearer',
    eligibility: 'Classes VI to X',
    natureLabel: 'Nature of Award',
    nature: 'Medal | Inspirational book',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Exemplary character and adherence to the school code.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Maintain a discipline record free of major violations',
      'Demonstrate honesty and respect consistently',
      'Follow school rules even without supervision',
      'Be recognised by teachers for dependable conduct',
      'This award is based on continuous observation, not single incidents'
    ]
  },
  {
    name: 'Young Leader’s Commendation',
    eligibility: 'Classes VIII to X',
    natureLabel: 'Nature of Award',
    nature: 'Trophy | Leadership or communication kit',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Initiative, responsibility, and leadership through action.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Actively take responsibility in school activities or roles',
      'Demonstrate accountability and decision making',
      'Positively influence peers',
      'Maintain discipline and attendance standards'
    ]
  },
  {
    name: 'The Ascension Award',
    eligibility: 'Classes IV to X',
    natureLabel: 'Nature of Award',
    nature: 'Shield | Personal development book',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Exceptional improvement and personal growth.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Show clear improvement compared to previous academic terms',
      'Demonstrate positive behavioural or attitudinal change',
      'Show commitment to self improvement',
      'Be recommended by class teachers'
    ]
  },
  {
    name: 'Colours Award',
    eligibility: 'Classes VI to X',
    natureLabel: 'Nature of Award',
    nature: 'Blazer badge or medal | Sports kit accessory',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Sustained excellence and discipline in sports.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Consistently participate in sports activities over time',
      'Represent school or house teams',
      'Demonstrate sportsmanship and discipline',
      'Receive recommendation from sports faculty'
    ]
  },
  {
    name: 'Cultural Laureate',
    eligibility: 'Classes VI to X',
    natureLabel: 'Nature of Award',
    nature: 'Trophy | Art or music related kit',
    recognitionLabel: 'What This Award Recognises',
    recognises: 'Excellence and commitment in arts, music, theatre, or cultural expression.',
    considerationLabel: 'To Be Considered, a Student Must',
    considerations: [
      'Actively participate in cultural activities',
      'Demonstrate skill and dedication in the chosen discipline',
      'Represent the school in events or performances',
      'Be recommended by cultural faculty'
    ]
  }
];

export default function AwardsAndRecognitionPage() {
  return (
    <>
      <Seo path="/awards-and-recognition" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="section-divider bg-ivory">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid gap-10 md:grid-cols-[1.2fr,0.8fr] items-start">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-black">Awards</p>
                <h1 className="text-4xl font-semibold text-black">Awards and Recognition</h1>
                <p className="text-gray-700 leading-relaxed">
                  Our honours uphold dignity, scarcity, and purpose. Each is conferred only after careful evaluation to ensure
                  it truly reflects the Elden standard of excellence, character, and contribution.
                </p>
              </div>
              <div className="bg-white border border-black/10 shadow-sm p-6 space-y-3">
                <p className="text-sm uppercase tracking-[0.25em] text-black">Navigate</p>
                <h2 className="text-2xl font-semibold text-black">Back to Core</h2>
                <p className="text-gray-700 leading-relaxed">
                  Return to the core sections to explore governance, committees, and mentor-led initiatives that shape every
                  Eldenite.
                </p>
                <Link
                  href="/core"
                  className="inline-flex items-center justify-center bg-cardinal text-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] shadow-sm shadow-cardinal/20 hover:bg-cardinal/90 transition"
                >
                  Core Overview
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
            </div>
          </section>

          <section id="awards" className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-10">
              <div className="space-y-3 max-w-4xl">
                <h2 className="text-3xl font-semibold text-black">Awards and Recognition</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our awards honour excellence, integrity, growth, and contribution. Each recognition is conferred through a
                  balanced approach that combines holistic judgement with clearly defined academic benchmarks where required.
                  Not every year guarantees every award; merit alone decides.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {awards.map((award) => (
                  <div key={award.name} className="border border-black/15 bg-ivory/60 p-6 shadow-sm space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-black">Honour</p>
                      <h3 className="text-2xl font-semibold text-black">{award.name}</h3>
                    </div>
                    <div className="space-y-3 text-gray-800 text-sm leading-relaxed">
                      <p>
                        <span className="font-semibold text-midnight">Eligibility:</span> {award.eligibility}
                      </p>
                      <p>
                        <span className="font-semibold text-midnight">{award.natureLabel || 'Nature of Award'}:</span>{' '}
                        {award.nature}
                      </p>
                      <p>
                        <span className="font-semibold text-midnight">{award.recognitionLabel || 'What it Represents'}:</span>{' '}
                        {award.recognises}
                      </p>

                      {award.categories && (
                        <div className="space-y-1">
                          <p className="font-semibold text-midnight">{award.categoriesLabel || 'Categories of Recognition'}:</p>
                          <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                            {award.categories.map((category) => (
                              <li key={`${award.name}-${category}`}>{category}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {award.considerations && (
                        <div className="space-y-1">
                          <p className="font-semibold text-midnight">{award.considerationLabel || 'To Be Considered'}:</p>
                          <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                            {award.considerations.map((consideration) => (
                              <li key={`${award.name}-${consideration}`}>{consideration}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {award.note && <p className="text-black font-medium">{award.note}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-black/15 bg-ivory/60 p-6 shadow-sm space-y-3">
                <h3 className="text-2xl font-semibold text-black">A Culture of Meaningful Recognition</h3>
                <p className="text-gray-800 leading-relaxed">
                  At The Elden Heights, awards are not distributed for participation. They are conferred for purpose. Each
                  recognition reflects our belief that true excellence lies not only in achievement, but in character,
                  consistency, and growth.
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
