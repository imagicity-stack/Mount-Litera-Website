import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ManagingCommitteePage() {
  return (
    <>
      <Head>
        <title>Managing Committee | The Elden Heights School</title>
        <meta
          name="description"
          content="Learn about the Managing Committee shaping strategy and stewardship at The Elden Heights School."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="relative overflow-hidden bg-gradient-to-br from-cardinal/8 via-white to-ivory/50 py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(123,67,151,0.08),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(220,155,60,0.08),transparent_35%)]" />
            <div className="relative max-w-4xl mx-auto px-6 text-center space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-cardinal/70">Stewardship</p>
              <h1 className="text-4xl font-semibold text-cardinal">Managing Committee</h1>
              <p className="text-gray-700">
                Coming soon. Details of the committee that safeguards our mission and excellence will be shared here.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
