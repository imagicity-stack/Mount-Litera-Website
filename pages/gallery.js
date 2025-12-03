import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
      <Head>
        <title>Gallery | Mount Litera School</title>
        <meta
          name="description"
          content="Explore vibrant moments from Mount Litera School — classroom learning, cultural programs, sports, and celebrations."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="bg-gradient-to-b from-cardinal/5 via-white to-white py-16">
            <div className="max-w-6xl mx-auto px-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cardinal/70">Our Story in Frames</p>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold text-cardinal">Gallery</h1>
              <p className="mt-4 max-w-3xl text-base md:text-lg text-gray-700">
                Take a walk through our classrooms, celebrations, and sports fields. Every photograph captures the joy of learning,
                the spirit of teamwork, and the community that makes Mount Litera School feel like home.
              </p>
              <div className="mt-8 rounded-3xl bg-white/80 p-6 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.35)] ring-1 ring-cardinal/10 backdrop-blur">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-cardinal/70">Experience</p>
                    <h2 className="mt-2 text-2xl font-semibold text-cardinal">Life at Mount Litera</h2>
                    <p className="mt-2 max-w-2xl text-gray-700">
                      From immersive lessons to spirited performances and athletic triumphs, explore moments that inspire our students
                      to dream bigger every day.
                    </p>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {galleryImages.map((image, index) => (
                    <figure
                      key={image.src}
                      className={`group relative overflow-hidden rounded-2xl border border-cardinal/10 bg-white/60 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl ${
                        index % 7 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                      }`}
                    >
                      <div className="relative h-56 w-full sm:h-64">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                          priority={index < 4}
                        />
                      </div>
                      <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                        {image.alt}
                      </figcaption>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cardinal/10 via-transparent to-cardinal/5 opacity-0 transition group-hover:opacity-100" />
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
