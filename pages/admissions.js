import { useCallback } from 'react';
import Script from 'next/script';

import Seo from '@/components/Seo';
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
      <Seo path="/admissions" />
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
