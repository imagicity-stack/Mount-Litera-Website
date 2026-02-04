import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import Link from 'next/link';
import ImageBanner from '@/components/ImageBanner';

export default function AdmissionPage() {
  return (
    <>
      <Seo path="/admission" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Admissions 2026–27"
            subtitle="Explore the next chapter of learning with a campus designed for confidence and curiosity."
            badge="Admissions"
            image="/admission/banner-horizon.jpg"
          />
          <section className="py-16 bg-[#F8F5F3]">
            <div className="max-w-4xl mx-auto px-6 space-y-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-black">Admission</h1>
              <p className="text-lg text-gray-600">A New Chapter Begins</p>
              <p>
                The Elden Heights School is opening admissions for the 2026–27 academic session. As we move through our transition
                as the Best School in Hazaribagh, we continue to stand for the same values that shaped our legacy —
                discipline, curiosity, and academic excellence. This is your chance to be part of the next generation of learners
                who will experience an upgraded, modern, and future-ready school environment.
              </p>
            </div>
          </section>
          <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-6 space-y-10">
              <div id="why-choose-elden-heights" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-semibold text-black">Why Choose The Elden Heights School</h2>
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
                <h2 className="text-2xl font-semibold text-black">Admission Process</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Step 1: Fill out the Admission Inquiry Form below.</li>
                  <li>Step 2: Our counselor will contact you to schedule a campus visit and interaction.</li>
                  <li>Step 3: Submit the required documents and complete the registration process at the school office.</li>
                  <li>Step 4: Receive confirmation and orientation details for the upcoming academic session.</li>
                </ol>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-black">Eligibility</h2>
                <p>
                  Admissions are open for Nursery to Grade 10 for the 2026–27 session. Seats are limited and will be allocated on
                  a first-come, first-served basis following the interaction round. Classes 11 and 12 are under the upcoming
                  academic expansion phase.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-black">Documents Required</h2>
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
                <h2 className="text-2xl font-semibold text-black">Important Note</h2>
                <p>
                  The Elden Heights School is currently undergoing a structured transition toward a renewed identity and academic
                  vision. All admissions made during this phase remain valid under the recognized CBSE framework and will
                  seamlessly continue through the upgraded system.
                </p>
              </div>
              <div id="fee-structure" className="space-y-6 scroll-mt-24">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-black">Fee Structure</h2>
                  <p className="text-gray-600">Academic Year 2026 to 2027</p>
                </div>
                <div className="space-y-6 rounded-2xl border border-black/10 bg-[#F8F5F3] p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black">1. Admission and Processing Fee</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-black/20 text-xs uppercase tracking-wide text-gray-500">
                            <th className="py-3 pr-4">Particulars</th>
                            <th className="py-3 pr-4">Frequency</th>
                            <th className="py-3 pr-4">Pre Primary (Nur to KG II)</th>
                            <th className="py-3 pr-4">Primary (I to III)</th>
                            <th className="py-3 pr-4">Class IV</th>
                            <th className="py-3 pr-4">Class V</th>
                            <th className="py-3 pr-4">Upper Primary (VI to VIII)</th>
                            <th className="py-3">Secondary (IX)</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700">
                          <tr className="border-b border-black/10">
                            <td className="py-3 pr-4 font-medium text-black">Registration Fee</td>
                            <td className="py-3 pr-4">One Time</td>
                            <td className="py-3 pr-4">2000</td>
                            <td className="py-3 pr-4">2000</td>
                            <td className="py-3 pr-4">2000</td>
                            <td className="py-3 pr-4">2000</td>
                            <td className="py-3 pr-4">2000</td>
                            <td className="py-3">2000</td>
                          </tr>
                          <tr className="border-b border-black/10">
                            <td className="py-3 pr-4 font-medium text-black">Processing Fee (At the time of Admission)</td>
                            <td className="py-3 pr-4">One Time</td>
                            <td className="py-3 pr-4">23000</td>
                            <td className="py-3 pr-4">23000</td>
                            <td className="py-3 pr-4">23000</td>
                            <td className="py-3 pr-4">23000</td>
                            <td className="py-3 pr-4">23000</td>
                            <td className="py-3">30000</td>
                          </tr>
                          <tr>
                            <td className="py-3 pr-4 font-semibold text-black">Total Admission Charges</td>
                            <td className="py-3 pr-4" />
                            <td className="py-3 pr-4 font-semibold text-black">25000</td>
                            <td className="py-3 pr-4 font-semibold text-black">25000</td>
                            <td className="py-3 pr-4 font-semibold text-black">25000</td>
                            <td className="py-3 pr-4 font-semibold text-black">25000</td>
                            <td className="py-3 pr-4 font-semibold text-black">25000</td>
                            <td className="py-3 font-semibold text-black">32000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black">2. KIT Charges</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-black/20 text-xs uppercase tracking-wide text-gray-500">
                            <th className="py-3 pr-4">Sr No</th>
                            <th className="py-3 pr-4">Class</th>
                            <th className="py-3">KIT Price</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700">
                          {[
                            ['1', 'Nursery', '4200'],
                            ['2', 'KG I', '4400'],
                            ['3', 'KG II', '5000'],
                            ['4', 'I', '5500'],
                            ['5', 'II', '5600'],
                            ['6', 'III', '6000'],
                            ['7', 'IV', '6500'],
                            ['8', 'V', '6500'],
                            ['9', 'VI', '7000'],
                            ['10', 'VII', '7000'],
                            ['11', 'VIII', '7000']
                          ].map(([sr, className, price]) => (
                            <tr key={sr} className="border-b border-black/10 last:border-b-0">
                              <td className="py-3 pr-4">{sr}</td>
                              <td className="py-3 pr-4 font-medium text-black">{className}</td>
                              <td className="py-3">{price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black">3. Tuition Fee Structure</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="rounded-xl border border-black/10 bg-white p-4">
                        <h4 className="text-base font-semibold text-black">Monthly Tuition Fee</h4>
                        <div className="mt-3 overflow-x-auto">
                          <table className="w-full min-w-[260px] border-collapse text-left text-sm">
                            <thead>
                              <tr className="border-b border-black/20 text-xs uppercase tracking-wide text-gray-500">
                                <th className="py-3 pr-4">Classes</th>
                                <th className="py-3">Monthly Fee</th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-700">
                              {[
                                ['Nursery, KG I, KG II', '2000'],
                                ['I to V', '2400'],
                                ['VI to X', '2700']
                              ].map(([label, fee]) => (
                                <tr key={label} className="border-b border-black/10 last:border-b-0">
                                  <td className="py-3 pr-4 font-medium text-black">{label}</td>
                                  <td className="py-3">{fee}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="rounded-xl border border-black/10 bg-white p-4">
                        <h4 className="text-base font-semibold text-black">Quarterly Tuition Fee</h4>
                        <div className="mt-3 overflow-x-auto">
                          <table className="w-full min-w-[260px] border-collapse text-left text-sm">
                            <thead>
                              <tr className="border-b border-black/20 text-xs uppercase tracking-wide text-gray-500">
                                <th className="py-3 pr-4">Classes</th>
                                <th className="py-3">Quarterly Fee</th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-700">
                              {[
                                ['Nursery, KG I, KG II', '6000'],
                                ['I to V', '7200'],
                                ['VI to X', '8100']
                              ].map(([label, fee]) => (
                                <tr key={label} className="border-b border-black/10 last:border-b-0">
                                  <td className="py-3 pr-4 font-medium text-black">{label}</td>
                                  <td className="py-3">{fee}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-black">4. Annual Miscellaneous Charges</h3>
                    <p className="text-gray-700">Applicable for Existing Students Only</p>
                    <div className="rounded-xl border border-black/10 bg-white p-4">
                      <div className="flex flex-col gap-1 text-sm text-gray-700">
                        <span className="font-semibold text-black">Amount: 6000 per Year</span>
                        <span className="text-gray-600">Heads Covered:</span>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                          'Exam Fees',
                          'Lab Charges',
                          'ERP Charges',
                          'Library Fee',
                          'Activity Fee',
                          'Sports Fund',
                          'Smart Class',
                          'ID Card',
                          'Maintenance',
                          'Assessment Fee',
                          'Event Fund',
                          'Development Fund'
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 rounded-full bg-cardinal/10 px-3 py-1 text-xs font-semibold text-cardinal"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-cardinal" aria-hidden="true" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-black">5. Additional Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Transport Fee: 1500 per month</li>
                      <li>School Books to be purchased separately</li>
                      <li>School Uniform to be purchased separately</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-4 rounded-2xl border border-black/10 bg-cardinal/5 p-6 text-center">
                <h3 className="text-xl font-semibold text-black">Priority booking slots now open</h3>
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
