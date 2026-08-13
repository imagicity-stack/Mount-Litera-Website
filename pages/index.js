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
import ArrowLink from '@/components/ArrowLink';
import CampusMosaic from '@/components/home/CampusMosaic';
import ScrollStory from '@/components/home/ScrollStory';
import OurPeople from '@/components/home/OurPeople';
import BelongingBand from '@/components/home/BelongingBand';
import Reveal from '@/components/motion/Reveal';
import ImageReveal from '@/components/motion/ImageReveal';

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
      <div className="relative min-h-screen text-ink">
        <Navbar />
        <main>
          <Hero />
          <About heading="Why We Are Among the Top Schools in Hazaribagh" />
          <CampusMosaic />
          <ScrollStory />
          <Academics />
          <OurPeople />
          <Admission />
          <BelongingBand />

          <section className="band-grey">
            <div className="shell py-20 md:py-28">
              <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                <h2 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-medium leading-[1.06] text-ink">
                  News &amp; journal
                </h2>
                <div className="flex flex-col items-start gap-7">
                  <p className="lede">
                    Catch up on the newest stories, announcements, and student experiences from
                    our campus in Hazaribagh.
                  </p>
                  <ArrowLink href="/blogs">View all journal entries</ArrowLink>
                </div>
              </div>

              <span className="rule-heavy mt-14 md:mt-16" />

              <div className="mt-14">
                {isLoadingBlog && (
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">
                    Loading the latest update…
                  </p>
                )}

                {!isLoadingBlog && latestBlog && (
                  <article className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                    <ImageReveal className="relative h-[280px] bg-stone md:h-[400px]">
                      {latestBlog.coverImage ? (
                        <img
                          src={latestBlog.coverImage}
                          alt={latestBlog.coverImageAlt || latestBlog.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                          Cover image coming soon
                        </div>
                      )}
                    </ImageReveal>

                    <Reveal delay={0.1} className="flex flex-col justify-center">
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-crimson">
                        Latest journal entry
                      </p>

                      <h3 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.12] text-ink">
                        <Link href={`/blogs/${latestBlog.slug}`} className="transition-colors hover:text-crimson">
                          {latestBlog.title}
                        </Link>
                      </h3>

                      <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-soft">
                        {latestBlog.excerpt || 'Read the full story for more details.'}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
                        <span className="font-bold text-ink">
                          {latestBlog.authorName || 'Editorial Team'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{formattedDate(latestBlog.publishedAt || latestBlog.createdAt)}</span>
                        {latestBlog.readingTime && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{latestBlog.readingTime} min read</span>
                          </>
                        )}
                      </div>

                      <div className="mt-9">
                        <ArrowLink href={`/blogs/${latestBlog.slug}`}>Read the story</ArrowLink>
                      </div>
                    </Reveal>
                  </article>
                )}

                {!isLoadingBlog && !latestBlog && (
                  <p className="text-ink-muted">No journal entries yet. Please check back soon.</p>
                )}
              </div>
            </div>
          </section>

          <Contact />

          <section className="band-grey">
            <div className="shell py-20 md:py-28">
              <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                <Reveal>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    Hazaribagh · Jharkhand
                  </p>
                  <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.06] text-ink">
                    Among the most sought-after schools in Hazaribagh
                  </h2>
                </Reveal>

                <Reveal delay={0.08} className="space-y-5">
                  <p className="text-[1.02rem] leading-relaxed text-ink-soft">
                    Hazaribagh education is evolving as families seek learning that blends strong
                    academics with character and confidence. For parents looking for quality
                    schools, the search often compares curriculum depth, caring mentors, and a safe
                    campus that supports modern skills.
                  </p>
                  <p className="text-[1.02rem] leading-relaxed text-ink-soft">
                    The Elden Heights School is designed around future-ready learning, balanced
                    activities, and attentive guidance from UKG through Class 10 — a welcoming
                    environment where every child is seen and supported. Many local parents refer
                    to us when discussing Hazaribagh schools that value both achievement and
                    well-being.
                  </p>
                  <p className="font-display text-xl italic text-ink">
                    We invite you to visit and experience the culture.
                  </p>
                </Reveal>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
