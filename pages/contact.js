import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Mount Litera School | Connect With Us</title>
        <meta
          name="description"
          content="Reach out to Mount Litera School in Hazaribagh for admission inquiries, campus visits, or general questions."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-16 bg-[#F5F5F5] text-center">
            <div className="max-w-3xl mx-auto px-6 space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">We’d Love to Hear From You</h1>
              <p className="text-gray-600">
                Our team is ready to guide you through admissions, partnerships, and every step of the transition journey.
              </p>
            </div>
          </section>
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
