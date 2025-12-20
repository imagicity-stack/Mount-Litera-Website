import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Academics from '@/components/Academics';
import Admission from '@/components/Admission';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdmissionOpenPopup from '@/components/popups/AdmissionOpenPopup';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Elden Heights School | Transitioning Into a Brighter Future</title>
        <meta
          name="description"
          content="The Elden Heights School is evolving into a new chapter with modern infrastructure, digital innovation, and a renewed vision for every student."
        />
      </Head>
      <AdmissionOpenPopup />
      <div className="relative min-h-screen text-midnight">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Academics />
          <Admission />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
