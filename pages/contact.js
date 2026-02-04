import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import ImageBanner from '@/components/ImageBanner';

export default function ContactPage() {
  return (
    <>
      <Seo path="/contact" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="We’d Love to Hear From You"
            subtitle="Our team is ready to guide you through admissions, partnerships, and every step of the journey."
            badge="Contact"
            image="/contact/banner-hello.jpg"
          />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
