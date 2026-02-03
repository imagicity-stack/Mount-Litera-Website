import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const rideToRiseDetails = {
  overview:
    'The Ride to Rise Program is a limited student support initiative introduced to encourage responsibility, regular attendance, and commitment among newly admitted students.',
  implementation:
    'This program is implemented by Edenwoods Eduhub Foundation in collaboration with The Elden Heights School.',
  support:
    'Under this initiative, 25 cycles will be provided to selected newly admitted students as a gesture of motivation and support. The program is designed to reward seriousness towards school participation while maintaining clear rules and discipline.',
  eligibility: ['Newly admitted students', 'Students studying in Class 3 to Class 8'],
  eligibilityNote:
    'Participation in the program is limited and subject to approval based on adherence to program guidelines.',
  conditions: [
    'Maintain minimum 85 percent attendance after admission',
    'Follow all school rules and discipline guidelines',
    'Use the cycle responsibly and only by the selected student'
  ],
  conditionsNote:
    'The support provided under this program is conditional. If attendance or discipline requirements are not met, the cycle may be withdrawn as per program rules.',
  important: [
    'Only 25 cycles are available under this program',
    'Participation is not automatic for all admissions',
    'Selection is done after admission confirmation',
    'Meeting eligibility conditions does not guarantee selection',
    'Final approval rests with Edenwoods Eduhub Foundation.'
  ],
  approach:
    'The Ride to Rise Program reflects the institution’s belief that student support should be structured, accountable, and purpose driven. The initiative focuses on encouraging commitment and responsibility while ensuring that institutional standards remain uncompromised.',
  finalLine: 'Limited support. Clear rules. Responsible students.'
};

export default function NewInitiativesPage() {
  return (
    <>
      <Seo path="/new-initiatives" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="section-divider bg-ivory/80">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 space-y-6">
              <div className="space-y-4 max-w-5xl">
                <p className="text-xs uppercase tracking-[0.35em] text-black">New Initiatives</p>
                <h1 className="text-4xl font-semibold text-black">Programs That Expand Opportunity</h1>
                <p className="text-gray-700 leading-relaxed">
                  Our new initiatives highlight structured, purpose driven programs that extend access, accountability,
                  and student responsibility beyond the classroom.
                </p>
              </div>
            </div>
          </section>

          <section id="ride-to-rise" className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-10">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-black/70">New Initiative 01</p>
                <h2 className="text-3xl font-semibold text-black">Ride to Rise</h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <div className="border border-black/15 bg-ivory/70 p-8 space-y-4 shadow-sm">
                  <h3 className="text-2xl font-semibold text-black">Ride to Rise Program</h3>
                  <p className="text-gray-700 leading-relaxed">{rideToRiseDetails.overview}</p>
                  <p className="text-gray-700 leading-relaxed">{rideToRiseDetails.implementation}</p>
                  <p className="text-gray-700 leading-relaxed">{rideToRiseDetails.support}</p>
                </div>

                <div className="space-y-6">
                  <div className="border border-black/15 bg-ivory/80 p-6 space-y-2 shadow-sm">
                    <h4 className="text-lg font-semibold text-black">Foundation Partner</h4>
                    <p className="text-sm text-gray-700">Edenwoods Eduhub Foundation</p>
                  </div>
                  <div className="border border-black/15 bg-ivory/80 p-6 space-y-3 shadow-sm">
                    <h4 className="text-lg font-semibold text-black">Who Can Be Considered</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {rideToRiseDetails.eligibility.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-700 leading-relaxed">{rideToRiseDetails.eligibilityNote}</p>
                  </div>
                  <div className="border border-black/15 bg-ivory/80 p-6 space-y-3 shadow-sm">
                    <h4 className="text-lg font-semibold text-black">Program Conditions</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {rideToRiseDetails.conditions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-700 leading-relaxed">{rideToRiseDetails.conditionsNote}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-black/15 bg-ivory/70 p-6 space-y-3 shadow-sm">
                  <h4 className="text-lg font-semibold text-black">Important Information</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {rideToRiseDetails.important.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="border border-black/15 bg-ivory/70 p-6 space-y-3 shadow-sm">
                  <h4 className="text-lg font-semibold text-black">Our Approach</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{rideToRiseDetails.approach}</p>
                </div>
              </div>

              <div className="border border-black/15 bg-midnight p-6 text-center text-parchment shadow-sm">
                <p className="text-sm uppercase tracking-[0.25em]">{rideToRiseDetails.finalLine}</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
