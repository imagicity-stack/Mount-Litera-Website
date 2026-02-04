import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch('/api/blogs?status=published');
        const data = await res.json();
        setBlogs(data.blogs || []);
        setStatus('ready');
      } catch (error) {
        setStatus('error');
      }
    };

    loadBlogs();
  }, []);

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
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="bg-[#f8f4ef] py-16">
            <div className="max-w-6xl mx-auto px-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.3em] text-cardinal">Blogs</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black">
                  Stories, updates, and learning journeys from Elden Heights.
                </h1>
                <p className="text-lg text-gray-700">
                  Stay connected with campus highlights, student achievements, and thought leadership from our mentors.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/blogs/admin"
                    className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 transition hover:text-cardinal"
                  >
                    Admin Login
                  </Link>
                  <div className="relative flex-1 min-w-[220px]">
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search posts, tags, authors..."
                      className="w-full rounded-full border border-black/20 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-black/20 bg-white p-8 shadow-xl shadow-cardinal/10">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-black">Editorial highlights</h2>
                  <p className="text-gray-600">
                    Discover curated insights, thoughtful reflections, and event recaps shared by our leadership and faculty teams.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {['Learning Journeys', 'Campus Events', 'Student Voices', 'Achievements'].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-black/10 bg-[#fefaf5] px-4 py-3 text-sm font-semibold text-gray-800"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-3xl font-semibold text-black">Latest news &amp; stories</h2>
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                  {filtered.length} Posts
                </span>
              </div>

              {status === 'loading' && (
                <div className="rounded-3xl border border-dashed border-black/20 bg-[#f8f4ef] p-10 text-center text-gray-600">
                  Loading blog updates...
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
                  Unable to load blogs right now. Please try again later.
                </div>
              )}

              {status === 'ready' && filtered.length === 0 && (
                <div className="rounded-3xl border border-dashed border-black/20 bg-[#f8f4ef] p-10 text-center text-gray-600">
                  No blogs matched your search. Try a different keyword or check back soon.
                </div>
              )}

              <div className="grid gap-8 lg:grid-cols-2">
                {filtered.map((blog) => {
                  const isOpen = Boolean(expanded[blog.id]);
                  const publishedAt = blog.publishedAt || blog.createdAt;
                  return (
                    <motion.article
                      key={blog.id}
                      layout
                      className="rounded-3xl border border-black/10 bg-white shadow-xl shadow-cardinal/5 overflow-hidden"
                    >
                      <div className="relative h-56 bg-black/5">
                        {blog.coverImage ? (
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.3em] text-gray-400">
                            Elden Heights
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 px-6 pb-4">
                          {(blog.tags || []).slice(0, 3).map((tag) => (
                            <span
                              key={`${blog.id}-${tag}`}
                              className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-gray-500">
                          <span>{formatDate(publishedAt)}</span>
                          {blog.readingTime && <span>{blog.readingTime} min read</span>}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-semibold text-black">{blog.title}</h3>
                          <p className="text-gray-600">{blog.excerpt || 'Read the full story for more details.'}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div>
                            <p className="font-semibold text-black">{blog.authorName || 'Editorial Team'}</p>
                            <p>{blog.authorTitle || 'Elden Heights School'}</p>
                          </div>
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="text-sm font-semibold uppercase tracking-[0.2em] text-cardinal"
                          >
                            Full Story →
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded((prev) => ({ ...prev, [blog.id]: !prev[blog.id] }))
                          }
                          className="flex w-full items-center justify-between rounded-full border border-black/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:border-black"
                        >
                          {isOpen ? 'Collapse Story' : 'Expand Story'}
                          <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
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
                              <div className="mt-4 space-y-3 text-gray-700">
                                {splitParagraphs(blog.content).map((paragraph, index) => (
                                  <p key={`${blog.id}-para-${index}`}>{paragraph}</p>
                                ))}
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
