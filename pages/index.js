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
      <div className="relative min-h-screen text-midnight">
        <Navbar />
        <main>
          <Hero />
          <About heading="Why We Are Among the Top Schools in Hazaribagh" />
          <Academics />
          <Admission />
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-4">
                  <span className="eyebrow">Journal</span>
                  <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                    What&rsquo;s happening at <span className="italic">Elden Heights</span>.
                  </h2>
                  <p className="max-w-2xl text-base leading-relaxed text-midnight/70 md:text-lg">
                    Catch up on the newest stories, announcements, and student experiences from our campus.
                  </p>
                </div>
                <Link href="/blogs" className="btn-ghost">
                  View all journal entries
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-4-4l4 4-4 4" />
                  </svg>
                </Link>
              </div>

              <div className="mt-12">
                {isLoadingBlog && (
                  <div className="surface-card rounded-3xl p-10 text-midnight/60">
                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cardinal" />
                    <span className="ml-3 text-sm uppercase tracking-[0.25em]">Loading the latest update…</span>
                  </div>
                )}

                {!isLoadingBlog && latestBlog && (
                  <article className="surface-card group relative grid gap-0 overflow-hidden rounded-[28px] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <div className="space-y-5 p-8 md:p-12">
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="chip">Latest Journal Entry</span>
                        <span className="text-midnight/60">
                          {formattedDate(latestBlog.publishedAt || latestBlog.createdAt)}
                        </span>
                        {latestBlog.readingTime && (
                          <span className="text-midnight/60">{latestBlog.readingTime} min read</span>
                        )}
                      </div>
                      <h3 className="font-garamond text-3xl font-semibold leading-tight text-midnight md:text-4xl">
                        {latestBlog.title}
                      </h3>
                      <p className="text-midnight/75 md:text-lg">
                        {latestBlog.excerpt || 'Read the full story for more details.'}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-midnight/65">
                        <span className="font-semibold text-midnight">
                          {latestBlog.authorName || 'Editorial Team'}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-midnight/30" />
                        <span>{latestBlog.authorTitle || 'Elden Heights School'}</span>
                      </div>
                      <Link href={`/blogs/${latestBlog.slug}`} className="btn-primary">
                        Read the Story
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-4-4l4 4-4 4" />
                        </svg>
                      </Link>
                    </div>
                    <div className="img-zoom relative min-h-[260px] overflow-hidden bg-midnight/5 md:min-h-full">
                      {latestBlog.coverImage ? (
                        <img
                          src={latestBlog.coverImage}
                          alt={latestBlog.coverImageAlt || latestBlog.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full min-h-[260px] items-center justify-center text-sm font-semibold uppercase tracking-[0.3em] text-midnight/40">
                          Cover image coming soon
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-midnight/20 via-transparent to-transparent" />
                    </div>
                  </article>
                )}

                {!isLoadingBlog && !latestBlog && (
                  <div className="surface-card rounded-3xl p-10 text-midnight/60">
                    No journal entries yet. Please check back soon.
                  </div>
                )}
              </div>
            </div>
          </section>
          <Contact />
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
              <div className="surface-card relative overflow-hidden rounded-[28px] p-10 md:p-14">
                <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/10 blur-[100px]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <div className="flex flex-col gap-6">
                  <span className="eyebrow">Hazaribagh · Jharkhand</span>
                  <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[54px]">
                    Among the most sought-after{' '}
                    <span className="italic">schools in Hazaribagh</span>, Jharkhand.
                  </h2>
                  <span className="h-px w-24 bg-gradient-to-r from-gold to-transparent" />
                  <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                    Hazaribagh education is evolving as families seek learning that blends strong academics
                    with character and confidence. For parents looking for quality schools, the search often
                    compares curriculum depth, caring mentors, and a safe campus that supports modern skills.
                  </p>
                  <p className="text-base leading-relaxed text-midnight/75 md:text-lg">
                    The Elden Heights School is designed around future-ready learning, balanced activities,
                    and attentive guidance from UKG through Class 10 — a welcoming environment where every
                    child is seen and supported. Many local parents refer to us when discussing Hazaribagh
                    schools that value both achievement and well-being.
                  </p>
                  <p className="font-garamond text-lg italic text-midnight/80">
                    We invite you to visit and experience the culture.
                  </p>
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
