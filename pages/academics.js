import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { stageDetails } from '@/components/Academics';

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
          <section className="bg-gradient-to-br from-cardinal via-cardinal/90 to-[#7f1d1d] py-20 text-white">
            <div className="max-w-5xl mx-auto px-6 space-y-6">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                Academics
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">Building Foundations, Inspiring Futures</h1>
              <p className="text-lg text-white/80">
                At Mount Litera School, academics go far beyond textbooks. Our curriculum is designed to nurture curiosity, discipline,
                and creativity — preparing students not just for exams, but for life itself. Every stage of learning is carefully
                structured to build strong fundamentals, foster problem-solving ability, and develop confidence in every child.
              </p>
              <p className="text-lg text-white/80">
                We follow the CBSE curriculum, blending traditional academic strength with modern pedagogical practices and digital
                learning tools.
              </p>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-12">
              <div className="max-w-3xl space-y-3">
                <h2 className="text-2xl md:text-3xl font-semibold text-cardinal">Academic Framework</h2>
                <p className="text-gray-600">
                  Each learning stage is intentionally designed to meet the developmental needs of our students, offering experiences
                  that evolve from playful exploration to focused mentorship.
                </p>
              </div>
              <div className="space-y-10">
                {stageDetails.map((stage) => (
                  <div
                    key={stage.title}
                    className="rounded-3xl border border-cardinal/10 bg-[#FDF9F7] p-8 shadow-sm transition hover:shadow-lg md:p-10"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                      <div className="md:max-w-xs">
                        <span className="text-xs uppercase tracking-[0.3em] text-cardinal/70">{stage.grades}</span>
                        <h3 className="mt-3 text-2xl font-semibold text-cardinal">{stage.title}</h3>
                      </div>
                      <div className="space-y-5 text-gray-700">
                        <p>{stage.summary}</p>
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-cardinal/80">Key Focus Areas</h4>
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {stage.focus.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm">
                                <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cardinal"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border-l-4 border-cardinal bg-cardinal/5 px-6 py-5 text-cardinal">
                <strong>Senior Secondary Stage launching soon:</strong> Science, Commerce, and Humanities streams under our new academic
                transition.
              </div>
            </div>
          </section>

          <section className="py-20 bg-[#F8F5F3]">
            <div className="max-w-5xl mx-auto px-6 space-y-6">
              <h2 className="text-3xl font-semibold text-cardinal">Teaching Philosophy</h2>
              <p className="text-gray-700">
                Our approach combines the discipline of traditional education with the curiosity-driven energy of modern classrooms.
                Lessons are designed to make students think, not memorize. Teachers use visual aids, practical experiments, and
                discussions to make learning engaging and purposeful.
              </p>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-cardinal/80">We ensure</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {philosophyPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cardinal"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-2">
              <div className="rounded-3xl border border-cardinal/10 bg-[#FDF9F7] p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-cardinal">Faculty Excellence</h2>
                <p className="mt-4 text-gray-700">
                  Our faculty is our strength. Every teacher at Mount Litera School is trained to bring empathy and expertise together.
                  They are more than instructors — they are guides who help students discover their best selves. Regular workshops and
                  training sessions ensure our educators stay ahead with new teaching methodologies and tools.
                </p>
              </div>
              <div className="rounded-3xl border border-cardinal/10 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-cardinal">Co-Scholastic Integration</h2>
                <p className="mt-4 text-gray-700">
                  We believe that learning happens beyond books too. Our co-scholastic programs include sports, performing arts,
                  creative clubs, and leadership programs that instill discipline, teamwork, and confidence.
                </p>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-cardinal/80">Key Offerings</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    {coScholasticOfferings.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-cardinal"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#101727] py-20 text-white">
            <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg">
                <h2 className="text-2xl font-semibold">Assessment &amp; Progress</h2>
                <p className="mt-4 text-white/80">
                  Learning at Mount Litera School is continuous and reflective. Assessments are designed not just to test knowledge but
                  to identify growth areas and inspire improvement. Regular parent-teacher interactions ensure transparency and shared
                  accountability in every child’s learning journey.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-cardinal/20 p-8 shadow-lg">
                <h2 className="text-2xl font-semibold">Academic Vision Ahead</h2>
                <p className="mt-4 text-white/80">
                  As we transition toward a renewed identity, our academic system is evolving to become more technology-enabled,
                  data-informed, and globally aligned. The future at Mount Litera School will reflect balance — between tradition and
                  innovation, between knowledge and imagination.
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
