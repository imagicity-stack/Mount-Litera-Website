import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const rideToRiseDetails = {
  overview:
    'The Ride to Rise Program is a structured educational mobility initiative designed to support consistent school attendance by reducing access related barriers for students.',
  implementation:
    'Implemented by Edenwoods Eduhub Foundation in collaboration with The Elden Heights School, the program focuses on enabling safe and independent travel to school while maintaining strict standards of discipline, attendance, and academic responsibility.',
  eligibility:
    'Selection under the Ride to Rise Program is need based and discipline driven, not automatic. The initiative is open to a limited number of students from Classes 3 to 8 who reside at a distance from the school and demonstrate a strong commitment to regular attendance and conduct.',
  criteria:
    'Participation in the program is governed by clear eligibility norms, including minimum attendance requirements, adherence to the school’s code of conduct, and compliance with the academic session framework. Support provided under the program follows a conditional usage model, ensuring accountability and long term commitment from both students and parents.',
  impact:
    'The Ride to Rise Program reflects the institution’s belief that access to education should be enabled without compromising standards. By addressing mobility challenges through a structured and disciplined approach, the initiative reinforces the school’s commitment to inclusive growth, operational excellence, and student responsibility.'
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
                  <p className="text-gray-700 leading-relaxed">{rideToRiseDetails.impact}</p>
                </div>

                <div className="space-y-6">
                  <div className="border border-black/15 bg-ivory/80 p-6 space-y-2 shadow-sm">
                    <h4 className="text-lg font-semibold text-black">Foundation Partner</h4>
                    <p className="text-sm text-gray-700">Edenwoods Eduhub Foundation</p>
                  </div>
                  <div className="border border-black/15 bg-ivory/80 p-6 space-y-2 shadow-sm">
                    <h4 className="text-lg font-semibold text-black">Eligibility &amp; Criteria</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{rideToRiseDetails.eligibility}</p>
                  </div>
                  <div className="border border-black/15 bg-ivory/80 p-6 space-y-2 shadow-sm">
                    <h4 className="text-lg font-semibold text-black">Participation Framework</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{rideToRiseDetails.criteria}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
