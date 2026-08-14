import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import BlogReaderModal from '@/components/blog/BlogReaderModal';

const formatDate = (value) => {
  if (!value) return 'TBA';
  const date = value.seconds ? new Date(value.seconds * 1000) : new Date(value);
  if (Number.isNaN(date.getTime())) return 'TBA';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [reader, setReader] = useState(null);

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

  const tags = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
      (b.tags || []).forEach((t) => set.add(t));
    });
    return ['All', ...Array.from(set).slice(0, 12)];
  }, [blogs]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesTag =
        activeTag === 'All' ||
        blog.category === activeTag ||
        (blog.tags || []).includes(activeTag);
      if (!matchesTag) return false;
      if (!term) return true;
      const haystack = [blog.title, blog.excerpt, blog.content, blog.authorName, (blog.tags || []).join(' ')]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [blogs, query, activeTag]);

  const featured = filtered[0] || null;
  const rest = filtered.slice(1);

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

          {/* Controls */}
          <section className="relative pt-14 md:pt-20">
            <div className="shell">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                  <span className="eyebrow">Latest News &amp; Stories</span>
                  <h2 className="font-garamond text-3xl font-semibold leading-[1.05] text-midnight sm:text-5xl">
                    Campus highlights &amp; <span className="italic">student voices</span>.
                  </h2>
                  <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-midnight/55">
                  {filtered.length} Post{filtered.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="mt-7 flex items-center gap-3 rounded-full border border-midnight/15 bg-white px-5 py-3 shadow-[0_20px_40px_-20px_rgba(10,10,12,0.15)] focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/30">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-midnight/50">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts, tags, authors…"
                  className="w-full bg-transparent text-sm text-midnight placeholder-midnight/40 focus:outline-none"
                />
              </div>

              {tags.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                        activeTag === tag
                          ? 'border-cardinal bg-cardinal text-parchment'
                          : 'border-midnight/15 bg-white text-midnight/65 hover:border-gold/50'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* States */}
          <section className="relative pb-24 pt-10 md:pb-32">
            <div className="shell">
              {status === 'loading' && (
                <div className="surface-card rounded-none p-12 text-center text-midnight/60">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cardinal" />
                  <span className="ml-3 text-sm uppercase tracking-[0.25em]">Loading journal…</span>
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-none border border-cardinal/25 bg-cardinal/5 p-10 text-center text-cardinal">
                  Unable to load the journal right now. Please try again later.
                </div>
              )}

              {status === 'ready' && filtered.length === 0 && (
                <div className="surface-card rounded-none p-12 text-center text-midnight/60">
                  No entries matched your search. Try a different keyword.
                </div>
              )}

              {status === 'ready' && featured && (
                <>
                  {/* Featured */}
                  <motion.button
                    type="button"
                    onClick={() => setReader(featured)}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="surface-card group relative grid w-full overflow-hidden rounded-none text-left md:grid-cols-[1.15fr_1fr]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <div className="img-zoom relative h-56 overflow-hidden bg-midnight/5 md:h-full md:min-h-[340px]">
                      {featured.coverImage ? (
                        <img src={featured.coverImage} alt={featured.coverImageAlt || featured.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center font-garamond text-midnight/40">Elden Heights</div>
                      )}
                      <span className="absolute left-5 top-5 rounded-full bg-cardinal px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-parchment">
                        Featured
                      </span>
                    </div>
                    <div className="space-y-4 p-7 md:p-10">
                      <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-midnight/55">
                        <span>{formatDate(featured.publishedAt || featured.createdAt)}</span>
                        {featured.readingTime && <span>· {featured.readingTime} min read</span>}
                      </div>
                      <h3 className="font-garamond text-2xl font-semibold leading-tight text-midnight md:text-3xl">
                        {featured.title}
                      </h3>
                      <p className="text-midnight/75 line-clamp-3">{featured.excerpt || 'Read the full story for more details.'}</p>
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cardinal transition group-hover:gap-3">
                        Read story <span>→</span>
                      </span>
                    </div>
                  </motion.button>

                  {/* MOBILE feed — compact, app-like list */}
                  {rest.length > 0 && (
                    <div className="mt-6 space-y-4 md:hidden">
                      {rest.map((blog) => (
                        <button
                          key={blog.id}
                          type="button"
                          onClick={() => setReader(blog)}
                          className="surface-card flex w-full gap-4 overflow-hidden rounded-2xl p-3 text-left"
                        >
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-midnight/5">
                            {blog.coverImage ? (
                              <img src={blog.coverImage} alt={blog.coverImageAlt || blog.title} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-widest text-midnight/40">EHS</div>
                            )}
                          </div>
                          <div className="flex min-w-0 flex-col justify-center">
                            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-midnight/50">
                              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                              {blog.readingTime && <span>· {blog.readingTime}m</span>}
                            </div>
                            <h3 className="mt-1 font-garamond text-lg font-semibold leading-snug text-midnight line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="mt-1 text-xs text-midnight/60 line-clamp-2">{blog.excerpt}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* DESKTOP grid — rich cards */}
                  {rest.length > 0 && (
                    <div className="mt-6 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
                      {rest.map((blog, idx) => (
                        <motion.button
                          key={blog.id}
                          type="button"
                          onClick={() => setReader(blog)}
                          layout
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.1 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (idx % 3) * 0.06 }}
                          className="surface-card group relative flex flex-col overflow-hidden rounded-none text-left hover-lift"
                        >
                          <div className="img-zoom relative h-48 overflow-hidden bg-midnight/5">
                            {blog.coverImage ? (
                              <img src={blog.coverImage} alt={blog.coverImageAlt || blog.title} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full items-center justify-center font-garamond text-midnight/40">Elden Heights</div>
                            )}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 px-4 pb-3">
                              {(blog.tags || []).slice(0, 2).map((tag) => (
                                <span key={`${blog.id}-${tag}`} className="rounded-full bg-white/85 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-midnight backdrop-blur">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col gap-3 p-6">
                            <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.24em] text-midnight/50">
                              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                              {blog.readingTime && <span>{blog.readingTime} min</span>}
                            </div>
                            <h3 className="font-garamond text-xl font-semibold leading-tight text-midnight line-clamp-2">{blog.title}</h3>
                            <p className="text-sm text-midnight/70 line-clamp-3">{blog.excerpt || 'Read the full story for more details.'}</p>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <span className="text-xs font-semibold text-midnight">{blog.authorName || 'Editorial Team'}</span>
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-cardinal transition group-hover:gap-2.5">
                                Read <span>→</span>
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>

      <BlogReaderModal blog={reader} onClose={() => setReader(null)} />
    </>
  );
}
