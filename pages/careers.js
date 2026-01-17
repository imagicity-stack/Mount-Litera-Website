import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CareersPage() {
  return (
    <>
      <Head>
        <title>Careers | The Elden Heights School</title>
        <meta name="description" content="Explore career opportunities with The Elden Heights School." />
      </Head>
      <div className="min-h-screen bg-[#F8F5F3] text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="flex flex-1 items-center justify-center px-6 py-24">
            <div className="max-w-xl rounded-3xl border border-black/15 bg-white p-10 text-center shadow-lg">
              <span className="inline-flex items-center rounded-full bg-cardinal/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-black">
                Careers
              </span>
              <h1 className="mt-6 text-3xl font-semibold text-black">We are not hiring right now</h1>
              <p className="mt-4 text-gray-600">
                Thank you for your interest in joining The Elden Heights School. While there are no open positions at the moment,
                we encourage you to check back soon as new opportunities are posted ahead of each academic session.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
