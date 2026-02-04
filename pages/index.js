import { useEffect, useState } from 'react';
import Link from 'next/link';
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
  const [latestBlog, setLatestBlog] = useState(null);
  const [isLoadingBlog, setIsLoadingBlog] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadLatestBlog = async () => {
      try {
        const res = await fetch('/api/blogs?status=published');
        if (!res.ok) throw new Error('Unable to load blogs');
        const data = await res.json();
        if (isMounted) {
          setLatestBlog(data.blogs?.[0] || null);
        }
      } catch (error) {
        if (isMounted) {
          setLatestBlog(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingBlog(false);
        }
      }
    };

    loadLatestBlog();

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedDate = (dateValue) => {
    if (!dateValue) return 'Latest update';
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return 'Latest update';
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

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
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-midnight/60">Blog</p>
                  <h2 className="text-3xl md:text-4xl font-semibold text-midnight">Whats Happening</h2>
                  <p className="text-base md:text-lg text-midnight/70 max-w-2xl">
                    Catch up on the newest story, announcements, and student experiences.
                  </p>
                </div>
                <Link
                  href="/blogs"
                  className="inline-flex items-center justify-center rounded-full border border-midnight/30 px-6 py-2 text-sm font-semibold text-midnight transition hover:border-midnight hover:bg-midnight hover:text-white"
                >
                  View More
                </Link>
              </div>

              <div className="mt-10">
                {isLoadingBlog && (
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-midnight/70">
                    Loading the latest update...
                  </div>
                )}

                {!isLoadingBlog && latestBlog && (
                  <article className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-midnight/60">
                        <span className="rounded-full bg-midnight/5 px-3 py-1 font-semibold text-midnight">
                          Latest Blog
                        </span>
                        <span>{formattedDate(latestBlog.publishedAt || latestBlog.createdAt)}</span>
                        {latestBlog.readingTime && <span>{latestBlog.readingTime} min read</span>}
                      </div>
                      <h3 className="text-2xl font-semibold text-midnight">{latestBlog.title}</h3>
                      <p className="text-midnight/80">
                        {latestBlog.excerpt || 'Read the full story for more details.'}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-midnight/70">
                        <span className="font-semibold text-midnight">
                          {latestBlog.authorName || 'Editorial Team'}
                        </span>
                        <span>{latestBlog.authorTitle || 'Elden Heights School'}</span>
                      </div>
                      <Link
                        href={`/blogs/${latestBlog.slug}`}
                        className="inline-flex items-center justify-center rounded-full bg-midnight px-5 py-2 text-sm font-semibold text-white transition hover:bg-midnight/90"
                      >
                        Read More
                      </Link>
                    </div>
                    <div className="overflow-hidden rounded-2xl bg-midnight/5">
                      {latestBlog.coverImage ? (
                        <img
                          src={latestBlog.coverImage}
                          alt={latestBlog.coverImageAlt || latestBlog.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full min-h-[220px] items-center justify-center text-sm text-midnight/50">
                          Cover image coming soon.
                        </div>
                      )}
                    </div>
                  </article>
                )}

                {!isLoadingBlog && !latestBlog && (
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 text-midnight/70">
                    No blog updates yet. Please check back soon.
                  </div>
                )}
              </div>
            </div>
          </section>
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
