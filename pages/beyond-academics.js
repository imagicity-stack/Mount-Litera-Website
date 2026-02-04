import Link from 'next/link';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

export default function BeyondAcademicsPage() {
  return (
    <>
      <Seo path="/beyond-academics" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Beyond Academics"
            subtitle="A gallery of clubs, leadership, and character-building experiences."
            badge="Beyond"
            image="/beyond-academics/banner-odyssey.jpg"
          />
          <section className="section-divider bg-ivory/80">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid gap-8 md:grid-cols-[1.1fr,0.9fr] items-start">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-black">Beyond Academics</p>
                <h1 className="text-4xl font-semibold text-black">Two Clear Pillars of Student Development</h1>
                <p className="text-gray-700 leading-relaxed">
                  At our school, learning does not stop with textbooks. We follow a structured approach that balances interest
                  driven exploration with essential life preparedness. This is delivered through two distinct initiatives—Co
                  Curricular Clubs and the Life Readiness Program. Both serve different purposes. Both are equally important.
                  But they are not the same.
                </p>
              </div>
              <div className="border border-black/15 bg-white p-6 space-y-3 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-black">Access</p>
                <h2 className="text-2xl font-semibold text-black">Explore the Pathways</h2>
                <p className="text-gray-700 leading-relaxed">
                  Choose your pathway below to see how we nurture talent, confidence, and real-world readiness across The Elden
                  Heights journey.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-10">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-black/15 bg-ivory/70 p-6 space-y-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-black">Initiative</p>
                  <h3 className="text-2xl font-semibold text-black">Co Curricular Clubs</h3>
                  <p className="text-gray-800 leading-relaxed text-sm">
                    Discovering Interests. Building Confidence. Expressing Talent. These interest-based platforms help students
                    explore their passions, develop soft skills, and express themselves beyond academics.
                  </p>
                  <Link
                    href="/co-curricular-clubs"
                    className="inline-flex items-center justify-center bg-cardinal text-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] shadow-sm shadow-cardinal/20 hover:bg-cardinal/90 transition"
                  >
                    View Clubs
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

                <div className="border border-black/15 bg-ivory/70 p-6 space-y-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-black">Initiative</p>
                  <h3 className="text-2xl font-semibold text-black">Life Readiness Program</h3>
                  <p className="text-gray-800 leading-relaxed text-sm">
                    Preparing Children for the Real World through mandatory, progressive life skills. Practical competence and
                    confident independence form the backbone of this program.
                  </p>
                  <Link
                    href="/life-readiness-program"
                    className="inline-flex items-center justify-center bg-cardinal text-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] shadow-sm shadow-cardinal/20 hover:bg-cardinal/90 transition"
                  >
                    View Program
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
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
