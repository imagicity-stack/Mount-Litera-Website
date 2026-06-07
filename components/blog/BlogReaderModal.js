import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const formatDate = (value) => {
  if (!value) return 'TBA';
  const date = value.seconds ? new Date(value.seconds * 1000) : new Date(value);
  if (Number.isNaN(date.getTime())) return 'TBA';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

const splitParagraphs = (content = '') =>
  content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

const hasRichText = (content = '') => /<\/?[a-z][\s\S]*>/i.test(content);

export default function BlogReaderModal({ blog, onClose }) {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Lock background scroll while open.
  useEffect(() => {
    if (!blog) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [blog, onClose]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
  };

  const shareUrl = blog ? `${typeof window !== 'undefined' ? window.location.origin : ''}/blogs/${blog.slug}` : '';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: blog.title, text: blog.excerpt || blog.title, url: shareUrl });
        return;
      } catch (error) {
        /* fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      /* ignore */
    }
  };

  const publishedAt = blog ? blog.publishedAt || blog.createdAt : null;

  return (
    <AnimatePresence>
      {blog && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close article"
            onClick={onClose}
            className="absolute inset-0 bg-midnight/80 backdrop-blur-md"
            tabIndex={-1}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={blog.title}
            initial={{ y: '100%', opacity: 0.6, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="relative flex h-[94vh] w-full flex-col overflow-hidden rounded-t-[28px] bg-parchment shadow-[0_-30px_80px_-30px_rgba(0,0,0,0.6)] sm:h-[90vh] sm:max-w-3xl sm:rounded-[28px]"
          >
            {/* Progress bar */}
            <div className="absolute inset-x-0 top-0 z-20 h-1 bg-black/5">
              <div className="h-full bg-gradient-to-r from-gold via-cardinal to-gold transition-[width] duration-150" style={{ width: `${progress}%` }} />
            </div>

            {/* Mobile drag handle */}
            <div className="flex justify-center pt-2.5 sm:hidden">
              <span className="h-1.5 w-12 rounded-full bg-midnight/15" />
            </div>

            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 px-5 py-3 sm:px-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">Elden Journal</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 rounded-full border border-midnight/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-midnight transition hover:border-gold/50"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {copied ? 'Copied!' : 'Share'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-midnight/15 bg-white text-midnight transition hover:border-cardinal/50 hover:text-cardinal"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div ref={scrollRef} onScroll={onScroll} className="flex-1 overflow-y-auto overscroll-contain">
              {blog.coverImage && (
                <div className="relative h-52 w-full overflow-hidden sm:h-72">
                  <img src={blog.coverImage} alt={blog.coverImageAlt || blog.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-parchment via-transparent to-transparent" />
                </div>
              )}

              <div className="mx-auto max-w-2xl px-5 pb-16 pt-5 sm:px-8">
                <div className="flex flex-wrap items-center gap-2">
                  {(blog.tags || []).slice(0, 4).map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>

                <h1 className="mt-4 font-garamond text-3xl font-semibold leading-[1.08] text-midnight sm:text-4xl">
                  {blog.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-midnight/55">
                  <span className="font-garamond text-sm normal-case tracking-normal text-midnight">
                    {blog.authorName || 'Editorial Team'}
                  </span>
                  <span className="h-3 w-px bg-midnight/25" />
                  <span>{formatDate(publishedAt)}</span>
                  {blog.readingTime && (
                    <>
                      <span className="h-3 w-px bg-midnight/25" />
                      <span>{blog.readingTime} min read</span>
                    </>
                  )}
                </div>

                <span className="mt-5 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />

                {blog.excerpt && (
                  <p className="mt-5 font-garamond text-lg italic leading-relaxed text-midnight/80">{blog.excerpt}</p>
                )}

                <div className="mt-6">
                  {hasRichText(blog.content) ? (
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                  ) : (
                    <div className="blog-content">
                      {splitParagraphs(blog.content).map((p, i) => (
                        <p key={`p-${i}`}>{p}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-10 flex flex-col items-start gap-4 border-t border-midnight/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <Link href={`/blogs/${blog.slug}`} className="btn-ghost text-xs">
                    Open full page ↗
                  </Link>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} — ${shareUrl}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cardinal"
                  >
                    Share on WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
