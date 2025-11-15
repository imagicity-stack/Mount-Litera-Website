import Head from 'next/head';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PaymentSuccess() {
  return (
    <>
      <Head>
        <title>Payment Successful | Mount Litera Zee School</title>
        <meta
          name="description"
          content="Payment successful. Your child’s priority seat is reserved. Our counsellor will connect within 24 hours."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-24">
            <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cardinal">Thank You</p>
              <h1 className="text-3xl md:text-4xl font-bold text-cardinal">
                Payment Successful! Your Child’s Priority Seat Is Reserved
              </h1>
              <p className="text-gray-600 text-base md:text-lg">
                A counsellor will call you within 24 hours. Keep your payment reference handy for a smooth discussion.
              </p>
              <div className="pt-4">
                <a
                  href="https://wa.me/918668868875"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-cardinal text-white font-medium shadow-lg transition hover:bg-white hover:text-cardinal border border-cardinal"
                >
                  Chat with Us on WhatsApp
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
