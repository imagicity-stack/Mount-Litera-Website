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
    cta: 'View Awards',
    image: '/website/images/awards%20and%20recognitions.png',
    imageAlt: 'Students receiving awards and recognitions'
  },
  {
    title: 'Beyond Academics',
    description:
      'Explore the dual pathways—Co Curricular Clubs and the Life Readiness Program—that shape confident, well-rounded Eldenites.',
    href: '/beyond-academics',
    cta: 'Explore',
    image: '/website/images/beyond%20academics.png',
    imageAlt: 'Students participating in beyond academics activities'
  }
];

const accreditationItems = [
  {
    title: 'Bhagwati Educational & Charitable Trust',
    detail: 'Registered Trust Stewardship',
    description:
      'The Elden Heights operates under the Bhagwati Educational & Charitable Trust, ensuring transparent governance and responsible oversight.'
  },
  {
    title: 'CBSE-Aligned Academic Framework',
    detail: 'Affiliation Readiness',
    description:
      'Curriculum, safety, and operational protocols are structured to meet CBSE norms with ongoing audits to maintain compliance.'
  },
  {
    title: 'Safety & Child Protection Compliance',
    detail: 'Annual Policy Review',
    description:
      'Safeguarding standards are reviewed each year across transport, campus security, and classroom practices to uphold student well-being.'
  },
  {
    title: 'Operational Excellence Standards',
    detail: 'Process Documentation',
    description:
      'ISO-ready documentation practices guide academic, administrative, and facility workflows for consistent quality delivery.'
  },
  {
    title: 'Sports & Co-Curricular Recognition',
    detail: 'District & Intra-School Certifications',
    description:
      'Teams participate in certified events with documented coaching plans, fair-play pledges, and safety protocols.'
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
                <p className="text-xs uppercase tracking-[0.35em] text-black">Core Pillars</p>
                <h1 className="text-4xl font-semibold text-black">Legacy, Discipline, Distinction</h1>
                <p className="text-gray-700 leading-relaxed">
                  The Core space gathers the honours that safeguard our heritage and celebrate disciplined growth. Explore the
                  recognitions that uphold The Elden Heights ethos.
                </p>
              </div>
              <div className="bg-white border border-cardinal/10 shadow-sm p-6 space-y-3">
                <p className="text-sm uppercase tracking-[0.25em] text-black">Essence</p>
                <h2 className="text-2xl font-semibold text-black">Recognition with Purpose</h2>
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
                <h2 className="text-3xl font-semibold text-black">Core Sections</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-1">
                {coreSections.map((section) => (
                  <div
                    key={section.title}
                    className="border border-cardinal/15 bg-ivory/60 shadow-sm overflow-hidden"
                  >
                    <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr] items-stretch">
                      <div className="p-6 md:p-8 space-y-4">
                        <div className="space-y-1">
                          <p className="text-xs uppercase tracking-[0.3em] text-black">Section</p>
                          <h3 className="text-2xl font-semibold text-black">{section.title}</h3>
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
                      <div className="h-full bg-white/80">
                        <img
                          src={section.image}
                          alt={section.imageAlt}
                          className="w-full h-full object-cover max-h-72 md:max-h-none"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-ivory border-t border-cardinal/10">
            <div className="max-w-6xl mx-auto px-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-black">Accreditation</p>
                  <h2 className="text-3xl font-semibold text-black">Standards, Trust, and Compliance</h2>
                </div>
                <p className="text-sm text-gray-700 md:max-w-xl leading-relaxed">
                  Review the honours, registrations, and certifications that underpin The Elden Heights School’s operations and
                  commitments.
                </p>
              </div>

              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-full snap-x snap-mandatory">
                  {accreditationItems.map((item) => (
                    <div
                      key={item.title}
                      className="snap-start min-w-[260px] md:min-w-[300px] bg-white border border-cardinal/15 shadow-sm p-5 flex flex-col gap-2"
                    >
                      <p className="text-xs uppercase tracking-[0.28em] text-black">Accolade</p>
                      <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                      <p className="text-sm text-black font-medium">{item.detail}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
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
