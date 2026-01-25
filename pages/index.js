import Seo from '@/components/Seo';
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
      <Seo path="/" />
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
