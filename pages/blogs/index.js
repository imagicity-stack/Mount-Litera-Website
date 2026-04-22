import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

const formatDate = (value) => {
  if (!value) return 'TBA';
  const date = value.seconds ? new Date(value.seconds * 1000) : new Date(value);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const splitParagraphs = (content = '') =>
  content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const hasRichText = (content = '') => /<\/?[a-z][\s\S]*>/i.test(content);

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');

  const loadBlogs = useCallback(async () => {
    try {
      const res = await fetch('/api/blogs?status=published', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      const data = await res.json();
      setBlogs(data.blogs || []);
      setStatus('ready');
    } catch (error) {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadBlogs();
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') loadBlogs();
    };
    window.addEventListener('focus', loadBlogs);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('focus', loadBlogs);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [loadBlogs]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return blogs;
    return blogs.filter((blog) => {
      const haystack = [
        blog.title,
        blog.excerpt,
        blog.content,
        blog.authorName,
        (blog.tags || []).join(' ')
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [blogs, query]);

  return (
    <>
      <Seo path="/blogs" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="The Elden Journal"
            subtitle="Stories, updates, and learning journeys from Elden Heights."
            eyebrow="Journal"
            image="/main gate new.jpeg"
          />

          <section className="relative py-20 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-4">
                  <span className="eyebrow">Latest News &amp; Stories</span>
                  <h2 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                    Campus highlights &amp; <span className="italic">student voices</span>.
                  </h2>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-midnight/60">
                  <span>{filtered.length} Posts</span>
                  <span className="h-3 w-px bg-midnight/20" />
                  <Link
                    href="/blogs/admin"
                    className="transition hover:text-cardinal"
                  >
                    Admin Login
                  </Link>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 rounded-full border border-midnight/15 bg-white px-5 py-3 shadow-[0_20px_40px_-20px_rgba(10,10,12,0.15)] focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/30">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-midnight/50">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search posts, tags, authors…"
                  className="w-full bg-transparent text-sm text-midnight placeholder-midnight/40 focus:outline-none"
                />
              </div>
            </div>
          </section>

          <section className="relative pb-24 md:pb-32">
            <div className="mx-auto max-w-6xl px-6">
              {status === 'loading' && (
                <div className="surface-card rounded-[28px] p-12 text-center text-midnight/60">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cardinal" />
                  <span className="ml-3 text-sm uppercase tracking-[0.25em]">Loading journal…</span>
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-[28px] border border-cardinal/25 bg-cardinal/5 p-10 text-center text-cardinal">
                  Unable to load the journal right now. Please try again later.
                </div>
              )}

              {status === 'ready' && filtered.length === 0 && (
                <div className="surface-card rounded-[28px] p-12 text-center text-midnight/60">
                  No entries matched your search. Try a different keyword.
                </div>
              )}

              <div className="grid gap-6 lg:grid-cols-2">
                {filtered.map((blog, idx) => {
                  const isOpen = Boolean(expanded[blog.id]);
                  const publishedAt = blog.publishedAt || blog.createdAt;
                  return (
                    <motion.article
                      key={blog.id}
                      layout
                      className="surface-card group relative overflow-hidden rounded-[28px]"
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (idx % 4) * 0.06 }}
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                      <div className="img-zoom relative h-60 overflow-hidden bg-midnight/5">
                        {blog.coverImage ? (
                          <img
                            src={blog.coverImage}
                            alt={blog.coverImageAlt || blog.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center font-garamond text-parchment/70">
                            Elden Heights
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 px-6 pb-4">
                          {(blog.tags || []).slice(0, 3).map((tag) => (
                            <span
                              key={`${blog.id}-${tag}`}
                              className="rounded-full border border-white/30 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-midnight backdrop-blur"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4 p-8">
                        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.28em] text-midnight/55">
                          <span>{formatDate(publishedAt)}</span>
                          {blog.readingTime && <span>{blog.readingTime} min read</span>}
                        </div>
                        <h3 className="font-garamond text-2xl font-semibold leading-tight text-midnight md:text-[26px]">
                          {blog.title}
                        </h3>
                        <p className="text-midnight/75">
                          {blog.excerpt || 'Read the full story for more details.'}
                        </p>
                        <div className="flex items-center justify-between text-sm text-midnight/70">
                          <div>
                            <p className="font-garamond text-base font-semibold text-midnight">
                              {blog.authorName || 'Editorial Team'}
                            </p>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-midnight/55">
                              {blog.authorTitle || 'Elden Heights School'}
                            </p>
                          </div>
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cardinal transition hover:gap-3"
                          >
                            Full Story
                            <span>→</span>
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded((prev) => ({ ...prev, [blog.id]: !prev[blog.id] }))
                          }
                          className="flex w-full items-center justify-between rounded-full border border-midnight/20 bg-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-midnight transition hover:border-gold/60 hover:text-cardinal"
                        >
                          {isOpen ? 'Collapse Story' : 'Expand Story'}
                          <span aria-hidden="true" className="text-gold">{isOpen ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 space-y-3 text-midnight/80">
                                {hasRichText(blog.content) ? (
                                  <div
                                    className="blog-content"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                  />
                                ) : (
                                  splitParagraphs(blog.content).map((paragraph, index) => (
                                    <p key={`${blog.id}-para-${index}`}>{paragraph}</p>
                                  ))
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.article>
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
