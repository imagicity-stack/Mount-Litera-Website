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
          <About heading="Why We Are Among the Top Schools in Hazaribagh" />
          <Academics />
          <Admission />
          <Contact />
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-semibold text-midnight">
                  Schools in Hazaribagh Jharkhand
                </h2>
                <p className="text-base md:text-lg text-midnight/80 leading-relaxed">
                  Hazaribagh education is evolving as families seek learning that blends strong academics with character and confidence. For parents looking for quality schools, the search often compares curriculum depth, caring mentors, and a safe campus that supports modern skills. Elden Heights School is an option designed around future ready learning, balanced activities, and attentive guidance from UKG through Class 10. We aim to help learners grow through structured routines, creative exploration, and clear communication with families. If you are shortlisting schools in hazaribagh jharkhand, this campus offers a welcoming environment where every child is seen and supported. Many local parents refer to us when discussing hazaribagh schools that value both achievement and well being, and we invite you to visit to experience the culture.
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
