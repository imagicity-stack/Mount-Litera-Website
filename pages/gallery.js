import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import { trackFacebookEvent } from '@/lib/facebookPixel';

const galleryImages = [
  { src: '/gallery/DSC00293.jpg', alt: 'Students collaborating in a bright classroom' },
  { src: '/gallery/DSC00296.jpg', alt: 'Teacher guiding a student during a lesson' },
  { src: '/gallery/DSC00297.jpg', alt: 'Classmates working together on an assignment' },
  { src: '/gallery/DSC00306.jpg', alt: 'Learning materials arranged for an activity' },
  { src: '/gallery/DSC01117.jpg', alt: 'Students smiling during a campus event' },
  { src: '/gallery/DSC01120.jpg', alt: 'Group discussion taking place indoors' },
  { src: '/gallery/DSC01122.jpg', alt: 'Students participating in hands-on learning' },
  { src: '/gallery/DSC01123.jpg', alt: 'Teacher engaging students with visual aids' },
  { src: '/gallery/DSC01125.jpg', alt: 'Students presenting their classroom work' },
  { src: '/gallery/DSC01126.jpg', alt: 'Focused learner taking careful notes' },
  { src: '/gallery/DSC01129.jpg', alt: 'Students interacting during a group task' },
  { src: '/gallery/DSC01131.jpg', alt: 'Teacher providing personalized feedback' },
  { src: '/gallery/DSC04871.jpg', alt: 'Students celebrating with colorful decorations' },
  { src: '/gallery/DSC04883.jpg', alt: 'Artistic display created by students' },
  { src: '/gallery/DSC04884.jpg', alt: 'Students preparing props for a performance' },
  { src: '/gallery/DSC04889.jpg', alt: 'Energetic performance on the school stage' },
  { src: '/gallery/DSC04891.jpg', alt: 'Students lined up for a school program' },
  { src: '/gallery/DSC04899.jpg', alt: 'Performers sharing a moment backstage' },
  { src: '/gallery/DSC04904.jpg', alt: 'Students rehearsing in coordinated outfits' },
  { src: '/gallery/DSC04907.jpg', alt: 'Cheerful students applauding on stage' },
  { src: '/gallery/DSC04910.jpg', alt: 'Stage lighting highlighting the performance' },
  { src: '/gallery/DSC04924.jpg', alt: 'Students performing a choreographed dance' },
  { src: '/gallery/DSC04931.jpg', alt: 'Friends sharing a smile after the show' },
  { src: '/gallery/DSC04932.jpg', alt: 'Students showcasing a traditional performance' },
  { src: '/gallery/DSC04937.jpg', alt: 'Colorful costumes during a cultural program' },
  { src: '/gallery/DSC04952.jpg', alt: 'Students taking a bow after the performance' },
  { src: '/gallery/DSC05617.jpg', alt: 'Students playing sports on the field' },
  { src: '/gallery/DSC05620.jpg', alt: 'Athletes sprinting during track practice' },
  { src: '/gallery/DSC05621.jpg', alt: 'Team huddle before a sports match' },
  { src: '/gallery/DSC05626.jpg', alt: 'Outdoor activities on the school grounds' },
  { src: '/gallery/DSC05628.jpg', alt: 'Students enjoying a friendly competition' },
  { src: '/gallery/DSC05639.jpg', alt: 'Coach encouraging students during drills' },
  { src: '/gallery/DSC08665.jpg', alt: 'Students celebrating achievements together' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function GalleryPage() {
  useEffect(() => {
    trackFacebookEvent('ViewContent', {
      page_path: '/gallery',
      content_name: 'school_gallery',
      content_category: 'gallery',
    });
  }, []);

  return (
    <>
      <Seo path="/gallery" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Gallery"
            subtitle="A visual tour of campus life, celebrations, and everyday moments."
            eyebrow="Our Story in Frames"
            slot="gallery.banner"
          />

          <section className="relative py-20 md:py-28">
            <div className="shell">
              <motion.div
                className="mb-14 max-w-3xl space-y-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="eyebrow">Life at Elden Heights</span>
                <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                  Classrooms, <span className="italic">celebrations</span>, sport &amp; song.
                </h2>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                  Take a walk through our classrooms, celebrations, and sports fields. Every photograph
                  captures the joy of learning, the spirit of teamwork, and the community that makes
                  The Elden Heights School feel like home.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {galleryImages.map((image, index) => {
                  const span =
                    index % 9 === 0
                      ? 'col-span-2 row-span-2'
                      : index % 7 === 3
                        ? 'row-span-2'
                        : '';
                  return (
                    <motion.figure
                      key={image.src}
                      className={`group relative overflow-hidden rounded-none border border-midnight/10 bg-midnight/5 shadow-[0_20px_40px_-30px_rgba(10,10,12,0.3)] transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-30px_rgba(10,10,12,0.35)] ${span}`}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 8) * 0.04 }}
                    >
                      <div className={`relative w-full ${span.includes('row-span-2') ? 'h-full min-h-[340px]' : 'h-52 sm:h-60'}`}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-[1.2s] ease-elite group-hover:scale-[1.07]"
                          priority={index < 4}
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <figcaption className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-500 ease-elite group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300">
                          Moment {String(index + 1).padStart(2, '0')}
                        </p>
                        <p className="mt-1 font-garamond text-sm text-parchment md:text-base">
                          {image.alt}
                        </p>
                      </figcaption>
                    </motion.figure>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
