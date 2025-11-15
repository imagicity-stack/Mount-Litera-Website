import { useCallback } from 'react';
import Head from 'next/head';
import Script from 'next/script';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/admissions/Hero';
import TokenInfo from '@/components/admissions/TokenInfo';
import QuickForm from '@/components/admissions/QuickForm';
import Testimonials from '@/components/admissions/Testimonials';

export default function AdmissionsPage() {
  const handleScrollToForm = useCallback(() => {
    if (typeof window === 'undefined') return;

    const section = document.getElementById('admissions-form');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Priority Admissions 2026–27 | Mount Litera School</title>
        <meta
          name="description"
          content="Reserve your child’s seat for the 2026–27 session with a simple token booking. Quick form, transparent process, and a safe CBSE school campus."
        />
      </Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero onCtaClick={handleScrollToForm} />
          <TokenInfo />
          <QuickForm />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </>
  );
}
