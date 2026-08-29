import { useEffect } from 'react';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import { trackFacebookEvent } from '@/lib/facebookPixel';
import useContent from '@/lib/useContent';


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function GalleryPage() {
  const { items: galleryImages } = useContent('gallery');

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
                      key={image.id}
                      className={`group relative overflow-hidden rounded-none border border-midnight/10 bg-midnight/5 shadow-[0_20px_40px_-30px_rgba(10,10,12,0.3)] transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-30px_rgba(10,10,12,0.35)] ${span}`}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 8) * 0.04 }}
                    >
                      <div className={`relative w-full ${span.includes('row-span-2') ? 'h-full min-h-[340px]' : 'h-52 sm:h-60'}`}>
                        {/* A plain <img>: uploaded photographs are served from the
                            Firebase Storage domain, which next/image would need an
                            explicit remote-host allowlist for. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.image}
                          alt={image.alt}
                          loading={index < 4 ? 'eager' : 'lazy'}
                          decoding="async"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-elite group-hover:scale-[1.07]"
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
