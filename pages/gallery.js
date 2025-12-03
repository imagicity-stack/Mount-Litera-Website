import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trackFacebookEvent } from '@/lib/facebookPixel';
import { pushToDataLayer } from '@/lib/googleTagManager';

const galleryImages = [
  {
    src: '/teachers/principal.png',
    title: 'Leadership at Mount Litera',
    description: 'Guiding every learner with clarity of purpose and warmth.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/md-hadis.jpg',
    title: 'Hands-on Discovery',
    description: 'Interactive lessons that make complex ideas click.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/kailash-devi.png',
    title: 'Celebrating Achievements',
    description: 'Recognizing milestones that inspire confidence.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/piyush-sinha.png',
    title: 'Creative Classrooms',
    description: 'Bright, welcoming spaces that nurture imagination.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/prarthana-mishra.png',
    title: 'Mentorship Moments',
    description: 'Dedicated educators who elevate every session.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/ck-yadav.png',
    title: 'Active Learning',
    description: 'Curiosity-fueled activities that keep students engaged.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/rk-singh.png',
    title: 'Future-ready Skills',
    description: 'Preparing learners for a digitally connected world.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/sameeksha-sinha.png',
    title: 'Joyful Collaboration',
    description: 'Team projects that encourage empathy and teamwork.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/pratiksha-prasoon.png',
    title: 'Arts & Expression',
    description: 'Spotlighting creativity through music, art, and drama.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/nitesh-kumar.png',
    title: 'Guided Exploration',
    description: 'Coaching students to experiment and learn fearlessly.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/shama-perween.png',
    title: 'Community Spirit',
    description: 'Building a culture of support, respect, and kindness.',
    orientation: 'portrait'
  },
  {
    src: '/teachers/smita-sinha.png',
    title: 'Celebrating Milestones',
    description: 'Moments of pride captured across our vibrant campus.',
    orientation: 'portrait'
  }
];

const handleTracking = (image, index) => {
  trackFacebookEvent('ViewContent', {
    content_name: image.title,
    content_category: 'gallery',
    position: index + 1,
    media_src: image.src
  });

  pushToDataLayer('gallery_interaction', {
    interaction: 'image_click',
    content_name: image.title,
    position: index + 1
  });
};

export default function GalleryPage() {
  useEffect(() => {
    trackFacebookEvent('ViewContent', {
      page_section: 'gallery',
      total_images: galleryImages.length
    });

    pushToDataLayer('gallery_view', {
      page_path: '/gallery',
      total_images: galleryImages.length
    });
  }, []);

  return (
    <>
      <Head>
        <title>Gallery | Mount Litera School</title>
        <meta
          name="description"
          content="Explore the Mount Litera School gallery showcasing campus life, collaborative classrooms, and vibrant student achievements."
        />
        <meta property="og:title" content="Gallery | Mount Litera School" />
        <meta
          property="og:description"
          content="Discover moments from Mount Litera School: joyful learning, active classrooms, and community celebrations."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mountlitera.com/gallery" />
        <meta property="og:image" content="https://www.mountlitera.com/teachers/principal.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-amber-50 text-gray-800">
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <section className="mb-16 rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-blue-100 backdrop-blur">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Our campus, captured</p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-cardinal sm:text-4xl">
                  Step inside the Mount Litera experience
                </h1>
                <p className="mt-4 text-lg text-gray-700">
                  From energizing classrooms to heartfelt celebrations, every frame reflects the curiosity, creativity, and
                  community that power our learners every day.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-blue-700">
                  <span className="rounded-full bg-blue-50 px-4 py-2 ring-1 ring-blue-100">Student Life</span>
                  <span className="rounded-full bg-amber-50 px-4 py-2 ring-1 ring-amber-100">Events</span>
                  <span className="rounded-full bg-emerald-50 px-4 py-2 ring-1 ring-emerald-100">Classrooms</span>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cardinal/10 via-white to-blue-50 p-6 shadow-inner">
                <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-cardinal/10 blur-3xl" />
                <div className="absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-blue-200/50 blur-3xl" />
                <div className="relative flex flex-col gap-3 rounded-xl bg-white/80 p-4 shadow-md ring-1 ring-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-semibold text-cardinal">Gallery Insights</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                      Live
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {galleryImages.slice(0, 3).map((image, index) => (
                      <div
                        key={image.src}
                        className="overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-100"
                      >
                        <Image
                          src={image.src}
                          alt={image.title}
                          width={240}
                          height={200}
                          className="h-20 w-full object-cover transition duration-300 ease-out hover:scale-105"
                          sizes="(max-width: 768px) 33vw, 80px"
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div>
                      <p className="font-semibold text-gray-800">{galleryImages.length} curated photos</p>
                      <p>Optimized for fast loading on every device.</p>
                    </div>
                    <div className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 ring-1 ring-blue-100">
                      Responsive
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-cardinal sm:text-3xl">Featured Gallery</h2>
                <p className="text-gray-700">Swipe through highlights from our classrooms and celebrations.</p>
              </div>
              <div className="flex gap-3 text-sm font-semibold text-blue-700">
                <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-blue-100">Meta Pixel events ready</span>
                <span className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-amber-100">GTM data layer enabled</span>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cardinal"
                  onClick={() => handleTracking(image, index)}
                >
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 2}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-80 transition group-hover:opacity-60" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex items-start justify-between p-4 text-left text-white">
                    <div>
                      <p className="text-lg font-semibold drop-shadow-sm">{image.title}</p>
                      <p className="text-sm text-gray-100 drop-shadow">{image.description}</p>
                    </div>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur">
                      #{index + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
