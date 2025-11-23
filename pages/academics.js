import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { stageDetails } from '@/components/Academics';

const learningEnhancements = [
  'Immersive digital lessons that keep every child excited to learn',
  'Adaptive assessments with real-time feedback for parents and teachers',
  'Continuous teacher training to blend technology with compassionate guidance'
];

const philosophyPoints = [
  'Individual attention in every class',
  'Periodic assessments for growth tracking',
  'Technology-integrated learning experiences',
  'Mentorship-based support for academic and emotional well-being'
];

const coScholasticOfferings = [
  'Physical education and structured sports programs',
  'Visual and performing arts',
  'Debate, literature, and STEM clubs',
  'Value-based education and leadership sessions'
];

const heroHighlights = [
  { label: 'Curriculum', value: 'CBSE Aligned' },
  { label: 'Learning Path', value: 'Foundational to Secondary' },
  { label: 'Focus', value: 'Confidence, Curiosity, Character' }
];

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
          <section className="relative overflow-hidden bg-gradient-to-br from-[#7f1d1d] via-cardinal to-[#410b0b] py-24 text-white">
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
              <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute bottom-0 left-[-4rem] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            </div>
            <div className="relative max-w-6xl mx-auto px-6 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-center">
              <div className="space-y-6">
                <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                  Academics
                </span>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  Building foundations that inspire futures
                </h1>
                <p className="text-lg text-white/80">
                  At Mount Litera School, learning is a journey that grows with every child. Our curriculum blends structured
                  academics with meaningful experiences so students feel ready for life, not just exams.
                </p>
                <p className="text-lg text-white/80">
                  Each stage brings the right balance of curiosity, discipline, and creativity while staying firmly rooted in the
                  CBSE framework.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {heroHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg backdrop-blur flex flex-col items-center justify-center text-center"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">{item.label}</p>
                    <p className="mt-3 text-lg font-semibold leading-snug">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-cardinal/70">
                  <span className="rounded-full bg-cardinal/10 px-4 py-1">Next Session 2026-25</span>
                  <span className="rounded-full bg-cardinal/10 px-4 py-1">Classes LKG – VIII</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-cardinal">Learning resources that amplify every classroom</h2>
                <p className="text-gray-700">
                  Beginning 2026-25, our classrooms from LKG to Grade VIII receive refreshed content, measurable progress trackin
                  g, and added teacher support. The aim: deeper engagement, clearer outcomes, and confident learners.
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  {learningEnhancements.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cardinal"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-cardinal/80">
                  Families will receive orientation support and a refreshed resource hub to make the transition seamless.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-cardinal/10 bg-gradient-to-br from-[#FDF9F7] via-white to-[#F8F5F3] p-6 shadow-lg">
                  <div className="flex h-full flex-col justify-between text-cardinal">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.3em] text-cardinal/70">Classroom kit</p>
                      <h3 className="text-2xl font-semibold leading-tight">Interactive learning hub</h3>
                      <p className="text-sm text-cardinal/80">
                        Lesson visuals, practice sheets, and assessment snapshots are organized in one place so teachers can move
                        seamlessly between activities.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-cardinal/10 p-4 text-sm text-cardinal">
                      <p className="font-semibold">What changes in 2026-25?</p>
                      <ul className="mt-2 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cardinal"></span>
                          <span>Unit-wise digital companions for every major concept</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cardinal"></span>
                          <span>Observation-led progress notes shared with families</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cardinal"></span>
                          <span>Quarterly teacher labs to exchange best practices</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-10">
              <div className="max-w-3xl space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-cardinal">A clear pathway through every grade</h2>
                <p className="text-gray-600">
                  Four progressive stages gently guide our learners from playful exploration to focused preparation. Each stage has a
                  simple promise for children and families.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stageDetails.map((stage) => (
                  <div key={stage.title} className="rounded-3xl border border-cardinal/10 bg-[#FDF9F7] p-6 shadow-sm">
                    <span className="text-xs uppercase tracking-[0.3em] text-cardinal/70">{stage.grades}</span>
                    <h3 className="mt-3 text-xl font-semibold text-cardinal">{stage.title}</h3>
                    <p className="mt-4 text-sm text-gray-700">{stage.homeSummary}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border-l-4 border-cardinal bg-cardinal/5 px-6 py-4 text-cardinal">
                <strong>Coming soon:</strong> Senior Secondary Stage with Science, Commerce, and Humanities streams.
              </div>
            </div>
          </section>

          <section className="py-20 bg-[#F8F5F3]">
            <div className="max-w-6xl mx-auto px-6 space-y-12">
              <div className="max-w-3xl space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-cardinal">The Mount Litera learning journey</h2>
                <p className="text-gray-700">
                  Take a closer look at how each stage feels inside our classrooms — from foundational play to secondary guidance and
                  mentorship.
                </p>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-cardinal/20 md:block" aria-hidden="true" />
                <div className="space-y-10">
                  {stageDetails.map((stage, index) => (
                    <div key={stage.title} className="grid gap-6 md:grid-cols-[120px_minmax(0,1fr)] md:items-start">
                      <div className="flex items-center gap-3 text-cardinal">
                        <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-cardinal/30 bg-white font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-cardinal/70">{stage.grades}</p>
                          <p className="font-semibold">{stage.title}</p>
                        </div>
                      </div>
                      <div className="rounded-3xl border border-cardinal/10 bg-white p-6 shadow-sm">
                        <p className="text-gray-700">{stage.summary}</p>
                        <div className="mt-5">
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-cardinal/70">Key focus areas</h4>
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {stage.focus.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cardinal"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-[#101727] text-white">
            <div className="max-w-6xl mx-auto px-6 space-y-10">
              <div className="max-w-3xl space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold">Teaching, support, and progress that stay in sync</h2>
                <p className="text-white/80">
                  Our academic ecosystem connects classroom experiences, caring educators, and purposeful assessments to make sure
                  every child keeps moving forward.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
                  <h3 className="text-lg font-semibold">Teaching Philosophy</h3>
                  <p className="mt-3 text-white/80">
                    Our approach blends traditional discipline with curiosity-driven classrooms so students think, question, and
                    express freely.
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-white/70">
                    {philosophyPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-white/60"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-cardinal/30 p-6 shadow-lg">
                  <h3 className="text-lg font-semibold">Faculty Excellence</h3>
                  <p className="mt-3 text-white/80">
                    Our teachers pair empathy with expertise. Regular workshops and training sessions keep instructional practices
                    sharp and student-centered.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
                  <h3 className="text-lg font-semibold">Assessment &amp; Progress</h3>
                  <p className="mt-3 text-white/80">
                    Continuous assessments, feedback loops, and parent partnerships help every learner understand where they stand and
                    how to grow.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-cardinal">Beyond textbooks</h2>
                <p className="text-gray-700">
                  Life at Mount Litera School includes vibrant programs that build confidence, teamwork, and leadership. Students explore
                  talents, collaborate with peers, and learn to express themselves.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2 text-sm text-gray-700">
                  {coScholasticOfferings.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cardinal"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-cardinal/10 bg-[#FDF9F7] p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-cardinal">Academic vision ahead</h3>
                <p className="mt-4 text-gray-700">
                  As we evolve into a renewed identity, our academic system is becoming more technology-enabled, data-informed, and
                  globally aligned — keeping the balance between tradition and innovation alive.
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
