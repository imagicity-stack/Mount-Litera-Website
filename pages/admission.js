import Link from 'next/link';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import SubNav from '@/components/SubNav';
import { sectionNav } from '@/lib/sectionNav';
import Footer from '@/components/Footer';
import InquiryForm from '@/components/InquiryForm';
import ImageBanner from '@/components/ImageBanner';

const whyChoose = [
  { title: 'Future-Ready Curriculum', body: 'A blend of strong academics and practical learning experiences.' },
  { title: 'Experienced Faculty', body: 'Dedicated educators who mentor — not just teach.' },
  { title: 'Modern Learning Environment', body: 'Digitally-equipped classrooms, safe campus, and evolving infrastructure.' },
  { title: 'Holistic Growth', body: 'Equal focus on academics, sports, arts, and values.' },
  { title: 'Personalized Guidance', body: 'Every student&rsquo;s journey is tracked, mentored, and celebrated.' }
];

const processSteps = [
  { step: '01', title: 'Inquiry', body: 'Fill out the Admission Inquiry Form below.' },
  { step: '02', title: 'Counsel', body: 'Our counselor schedules a campus visit and interaction.' },
  { step: '03', title: 'Register', body: 'Submit required documents and complete the registration at the school office.' },
  { step: '04', title: 'Welcome', body: 'Receive confirmation and orientation details for the upcoming session.' }
];

const documents = [
  'Birth Certificate (original and photocopy)',
  'Previous Report Card (where applicable)',
  'Transfer Certificate (for higher grades)',
  'Two recent passport-size photographs',
  'Parent&rsquo;s ID Proof (Aadhaar or equivalent)'
];

const kitRows = [
  ['1', 'Nursery', '4,200'],
  ['2', 'KG I', '4,400'],
  ['3', 'KG II', '5,000'],
  ['4', 'I', '5,500'],
  ['5', 'II', '5,600'],
  ['6', 'III', '6,000'],
  ['7', 'IV', '6,500'],
  ['8', 'V', '6,500'],
  ['9', 'VI', '7,000'],
  ['10', 'VII', '7,000'],
  ['11', 'VIII', '7,000']
];

const monthlyFees = [
  ['Nursery · KG I · KG II', '₹2,000'],
  ['I to V', '₹2,400'],
  ['VI to X', '₹2,700']
];
const quarterlyFees = [
  ['Nursery · KG I · KG II', '₹6,000'],
  ['I to V', '₹7,200'],
  ['VI to X', '₹8,100']
];
const miscHeads = [
  'Exam Fees', 'Lab Charges', 'ERP Charges', 'Library Fee',
  'Activity Fee', 'Sports Fund', 'Smart Class', 'ID Card',
  'Maintenance', 'Assessment Fee', 'Event Fund', 'Development Fund'
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function AdmissionPage() {
  return (
    <>
      <Seo path="/admission" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <SubNav section={sectionNav.admission.section} links={sectionNav.admission.links} />
        <main className="flex-1">
          <ImageBanner
            title="Admissions 2026 – 27"
            subtitle="Explore the next chapter of learning with a campus designed for confidence and curiosity."
            eyebrow="Admissions Open"
            image="/admission/banner-horizon.jpg"
          />

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <span className="eyebrow">A New Chapter Begins</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                  Join the story of the <span className="italic">best school in Hazaribagh</span>.
                </h1>
                <span className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="mt-6 text-base leading-relaxed text-midnight/75 md:text-lg">
                  The Elden Heights School is opening admissions for the 2026 – 27 academic session.
                  As we move through our transition, we continue to stand for the values that shaped
                  our legacy — discipline, curiosity, and academic excellence. Be part of the next
                  generation of learners who will experience an upgraded, modern, and future-ready
                  school environment.
                </p>
              </motion.div>
            </div>
          </section>

          <section id="why-choose-elden-heights" className="relative scroll-mt-24 py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mb-14 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Why The Elden Heights</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  Not just for exams — <span className="italic">for life</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  Our re-imagined structure ensures every child grows with purpose, confidence, and creativity.
                </p>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {whyChoose.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    className="group relative overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment p-7 transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(10,10,12,0.3)]"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.32em] text-cardinal">
                      Pillar {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-garamond text-2xl font-semibold leading-tight text-midnight">
                      {item.title}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed text-midnight/75"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mb-14 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Admission Process</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  From inquiry to <span className="italic">welcome</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((step, idx) => (
                  <motion.div
                    key={step.step}
                    className="relative rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment p-7"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
                  >
                    <span className="font-garamond text-5xl font-semibold text-gold-300">
                      {step.step}
                    </span>
                    <div className="mt-2 h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                    <h3 className="mt-4 font-garamond text-xl font-semibold text-midnight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-midnight/75">{step.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative py-24 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
              <motion.div
                className="surface-card rounded-none p-10"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Eligibility</span>
                <h2 className="mt-4 font-garamond text-3xl font-semibold leading-tight text-midnight md:text-4xl">
                  Nursery through Grade 10 for 2026 – 27.
                </h2>
                <span className="mt-5 block h-px w-16 bg-gradient-to-r from-gold to-transparent" />
                <p className="mt-5 text-base leading-relaxed text-midnight/75">
                  Seats are limited and allocated on a first-come, first-served basis following the
                  interaction round. Classes 11 and 12 are under the upcoming academic expansion phase.
                </p>
              </motion.div>

              <motion.div
                className="surface-card rounded-none p-10"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <span className="eyebrow">Documents Required</span>
                <h2 className="mt-4 font-garamond text-3xl font-semibold leading-tight text-midnight md:text-4xl">
                  Ready at registration.
                </h2>
                <span className="mt-5 block h-px w-16 bg-gradient-to-r from-gold to-transparent" />
                <ul className="mt-6 space-y-3">
                  {documents.map((doc) => (
                    <li key={doc} className="flex items-start gap-3 text-sm text-midnight/80">
                      <span className="mt-[7px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-gradient-to-br from-gold to-cardinal shadow-[0_0_0_3px_rgba(201,162,75,0.15)]" />
                      <span dangerouslySetInnerHTML={{ __html: doc }} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          <section className="relative py-10 md:py-14">
            <div className="mx-auto max-w-4xl px-6">
              <div className="overflow-hidden rounded-none border border-gold/30 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 px-6 py-5 md:px-8">
                <p className="flex flex-col gap-2 text-midnight md:flex-row md:items-center md:gap-4">
                  <span className="font-garamond text-sm font-semibold uppercase tracking-[0.3em] text-cardinal">
                    Important Note
                  </span>
                  <span className="text-sm md:text-base">
                    Elden Heights is transitioning toward a renewed identity and academic vision.
                    All admissions remain valid under the recognised CBSE framework and continue
                    seamlessly through the upgraded system.
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section id="fee-structure" className="relative scroll-mt-24 py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                className="mb-14 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Fee Structure · 2026 – 27</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  Transparent, published, <span className="italic">and fair</span>.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </motion.div>

              <div className="space-y-10">
                <div className="surface-card overflow-hidden rounded-none p-8 md:p-10">
                  <h3 className="font-garamond text-2xl font-semibold text-midnight">
                    1 · Admission &amp; Processing Fee
                  </h3>
                  <span className="mt-3 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-midnight/15 text-[10px] font-semibold uppercase tracking-[0.22em] text-midnight/60">
                          <th className="py-3 pr-4">Particulars</th>
                          <th className="py-3 pr-4">Frequency</th>
                          <th className="py-3 pr-4">Nur – KG II</th>
                          <th className="py-3 pr-4">I – III</th>
                          <th className="py-3 pr-4">Class IV</th>
                          <th className="py-3 pr-4">Class V</th>
                          <th className="py-3 pr-4">VI – VIII</th>
                          <th className="py-3">Class IX</th>
                        </tr>
                      </thead>
                      <tbody className="text-midnight/80">
                        <tr className="border-b border-midnight/10">
                          <td className="py-3 pr-4 font-medium text-midnight">Registration Fee</td>
                          <td className="py-3 pr-4">One Time</td>
                          <td className="py-3 pr-4">₹2,000</td>
                          <td className="py-3 pr-4">₹2,000</td>
                          <td className="py-3 pr-4">₹2,000</td>
                          <td className="py-3 pr-4">₹2,000</td>
                          <td className="py-3 pr-4">₹2,000</td>
                          <td className="py-3">₹2,000</td>
                        </tr>
                        <tr className="border-b border-midnight/10">
                          <td className="py-3 pr-4 font-medium text-midnight">Processing Fee</td>
                          <td className="py-3 pr-4">One Time</td>
                          <td className="py-3 pr-4">₹23,000</td>
                          <td className="py-3 pr-4">₹23,000</td>
                          <td className="py-3 pr-4">₹23,000</td>
                          <td className="py-3 pr-4">₹23,000</td>
                          <td className="py-3 pr-4">₹23,000</td>
                          <td className="py-3">₹30,000</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-semibold text-midnight">Total</td>
                          <td className="py-3 pr-4" />
                          <td className="py-3 pr-4 font-semibold text-cardinal">₹25,000</td>
                          <td className="py-3 pr-4 font-semibold text-cardinal">₹25,000</td>
                          <td className="py-3 pr-4 font-semibold text-cardinal">₹25,000</td>
                          <td className="py-3 pr-4 font-semibold text-cardinal">₹25,000</td>
                          <td className="py-3 pr-4 font-semibold text-cardinal">₹25,000</td>
                          <td className="py-3 font-semibold text-cardinal">₹32,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="surface-card overflow-hidden rounded-none p-8 md:p-10">
                  <h3 className="font-garamond text-2xl font-semibold text-midnight">2 · KIT Charges</h3>
                  <span className="mt-3 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                  <div className="mt-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {kitRows.map(([sr, className, price]) => (
                      <div
                        key={sr}
                        className="flex items-center justify-between rounded-xl border border-midnight/10 bg-white px-4 py-3 text-sm"
                      >
                        <span className="font-medium text-midnight">Class {className}</span>
                        <span className="font-garamond font-semibold text-cardinal">₹{price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="surface-card rounded-none p-8">
                    <h3 className="font-garamond text-xl font-semibold text-midnight">
                      3a · Monthly Tuition
                    </h3>
                    <span className="mt-3 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                    <div className="mt-5 space-y-2">
                      {monthlyFees.map(([label, fee]) => (
                        <div key={label} className="flex items-center justify-between rounded-xl border border-midnight/10 bg-white px-4 py-3 text-sm">
                          <span className="font-medium text-midnight">{label}</span>
                          <span className="font-garamond font-semibold text-cardinal">{fee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="surface-card rounded-none p-8">
                    <h3 className="font-garamond text-xl font-semibold text-midnight">
                      3b · Quarterly Tuition
                    </h3>
                    <span className="mt-3 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                    <div className="mt-5 space-y-2">
                      {quarterlyFees.map(([label, fee]) => (
                        <div key={label} className="flex items-center justify-between rounded-xl border border-midnight/10 bg-white px-4 py-3 text-sm">
                          <span className="font-medium text-midnight">{label}</span>
                          <span className="font-garamond font-semibold text-cardinal">{fee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="surface-card rounded-none p-8 md:p-10">
                  <h3 className="font-garamond text-2xl font-semibold text-midnight">
                    4 · Annual Miscellaneous Charges
                  </h3>
                  <span className="mt-3 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                  <p className="mt-4 text-sm text-midnight/70">
                    Applicable for existing students only · <span className="font-semibold text-midnight">₹6,000 per year</span>
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {miscHeads.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-midnight"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-cardinal" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="surface-card rounded-none p-8 md:p-10">
                  <h3 className="font-garamond text-2xl font-semibold text-midnight">
                    5 · Additional Information
                  </h3>
                  <span className="mt-3 block h-px w-14 bg-gradient-to-r from-gold to-transparent" />
                  <ul className="mt-5 space-y-3 text-sm text-midnight/80">
                    {[
                      'Transport Fee · ₹1,500 per month',
                      'School books to be purchased separately',
                      'School uniform to be purchased separately'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-[7px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-gradient-to-br from-gold to-cardinal shadow-[0_0_0_3px_rgba(201,162,75,0.15)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-16 overflow-hidden rounded-none surface-card-dark p-10 text-center text-parchment md:p-14">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <span className="eyebrow eyebrow-dark justify-center">Priority Booking</span>
                <h3 className="mt-4 font-garamond text-3xl font-semibold leading-tight text-parchment md:text-4xl">
                  Secure your child&rsquo;s place <span className="italic gold-text">while seats remain</span>.
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-parchment/80">
                  Families who confirm early receive the first choice of interaction dates, faster
                  document processing, and priority in class allocations for the 2026 – 27 session.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="#admission-inquiry" className="btn-gold">Begin Inquiry</Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-parchment/20 bg-white/5 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-parchment backdrop-blur transition hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold-200"
                  >
                    Talk to Counsellor
                  </Link>
                </div>
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
