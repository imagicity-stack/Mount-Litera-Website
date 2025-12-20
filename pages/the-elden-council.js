import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TheEldenCouncilPage() {
  return (
    <>
      <Head>
        <title>The Elden Council | The Elden Heights School</title>
        <meta
          name="description"
          content="Explore leadership insights and guiding principles from The Elden Council of The Elden Heights School."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="relative overflow-hidden bg-gradient-to-br from-cardinal/8 via-white to-ivory/50 py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(123,67,151,0.08),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(220,155,60,0.08),transparent_35%)]" />
            <div className="relative max-w-4xl mx-auto px-6 text-center space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-cardinal/70">Governance</p>
              <h1 className="text-4xl font-semibold text-cardinal">The Elden Council</h1>
              <p className="text-gray-700">
                Coming soon. This space will share the council's perspective on heritage, academics, and the enduring promise of The Elden Heights School.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
