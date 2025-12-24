import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const coreSections = [
  {
    title: 'Awards and Recognition',
    description:
      'Discover the honours that celebrate excellence, integrity, leadership, and growth across The Elden Heights.',
    href: '/awards-and-recognition',
    cta: 'View Awards'
  },
  {
    title: 'Beyond Academics',
    description:
      'Explore the dual pathways—Co Curricular Clubs and the Life Readiness Program—that shape confident, well-rounded Eldenites.',
    href: '/beyond-academics',
    cta: 'Explore'
  }
];

export default function CorePage() {
  return (
    <>
      <Head>
        <title>Core | The Elden Heights School</title>
        <meta
          name="description"
          content="Explore the core pillars and recognition pathways that define The Elden Heights School."
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
                  The Core space gathers the honours that safeguard our heritage and celebrate disciplined growth. Explore the
                  recognitions that uphold The Elden Heights ethos.
                </p>
              </div>
              <div className="bg-white border border-cardinal/10 shadow-sm p-6 space-y-3">
                <p className="text-sm uppercase tracking-[0.25em] text-cardinal/60">Essence</p>
                <h2 className="text-2xl font-semibold text-cardinal">Recognition with Purpose</h2>
                <p className="text-gray-700 leading-relaxed">
                  Every accolade and leadership body exists to preserve dignity, scarcity, and accountability—ensuring the Elden
                  standard remains uncompromised.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-8">
              <div className="space-y-3 max-w-4xl">
                <h2 className="text-3xl font-semibold text-cardinal">Core Sections</h2>
                <p className="text-gray-700 leading-relaxed">
                  Access the awards and recognition pathway that defines excellence within The Elden Heights School experience.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-1">
                {coreSections.map((section) => (
                  <div key={section.title} className="border border-cardinal/15 bg-ivory/60 p-6 shadow-sm space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-cardinal/60">Section</p>
                      <h3 className="text-2xl font-semibold text-cardinal">{section.title}</h3>
                    </div>
                    <p className="text-gray-800 leading-relaxed text-sm">{section.description}</p>
                    <Link
                      href={section.href}
                      className="inline-flex items-center justify-center bg-cardinal text-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] shadow-sm shadow-cardinal/20 hover:bg-cardinal/90 transition"
                    >
                      {section.cta}
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
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
