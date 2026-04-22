import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import ImageBanner from '@/components/ImageBanner';

export default function ContactPage() {
  return (
    <>
      <Seo path="/contact" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="We&rsquo;d Love to Hear From You"
            subtitle="Our team is ready to guide you through admissions, partnerships, and every step of the journey."
            eyebrow="Contact"
            image="/contact/banner-hello.jpg"
          />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
