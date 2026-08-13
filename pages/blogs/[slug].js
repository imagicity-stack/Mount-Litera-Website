import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { adminDb } from '@/lib/firebaseAdmin';
import { SITE_URL } from '@/lib/seoData';

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

export default function BlogDetailPage({ blog }) {
  if (!blog) {
    return (
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="surface-card max-w-xl space-y-4 rounded-none p-12 text-center">
            <span className="eyebrow justify-center">404</span>
            <h1 className="font-garamond text-3xl font-semibold text-midnight md:text-4xl">
              Story not found.
            </h1>
            <p className="text-midnight/70">
              The blog you are looking for is unavailable. Please return to the journal.
            </p>
            <div className="pt-2">
              <Link href="/blogs" className="btn-primary">Back to Journal</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const canonical = blog.canonicalUrl || `${SITE_URL}/blogs/${blog.slug}`;
  const title = blog.seoTitle || blog.title;
  const description = blog.seoDescription || blog.excerpt || blog.title;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {blog.seoKeywords && <meta name="keywords" content={blog.seoKeywords} />}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.coverImage || `${SITE_URL}/website/header.png`} />
        {blog.coverImageAlt && <meta property="og:image:alt" content={blog.coverImageAlt} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={blog.coverImage || `${SITE_URL}/website/header.png`} />
        {blog.coverImageAlt && <meta name="twitter:image:alt" content={blog.coverImageAlt} />}
      </Head>
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <section className="relative pt-28 pb-12 md:pt-36 md:pb-16">
            <div className="mx-auto max-w-4xl px-6">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-cardinal transition hover:gap-3"
              >
                <span>←</span>
                Back to Journal
              </Link>
              <div className="mt-8 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  {(blog.tags || []).slice(0, 3).map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
                <h1 className="font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[56px]">
                  {blog.title}
                </h1>
                <span className="block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
                {blog.excerpt && (
                  <p className="font-garamond text-xl italic leading-relaxed text-midnight/80 md:text-2xl">
                    {blog.excerpt}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-midnight/60">
                  <span className="font-garamond text-sm normal-case tracking-normal text-midnight">
                    {blog.authorName || 'Editorial Team'}
                  </span>
                  <span className="h-3 w-px bg-midnight/25" />
                  <span>{blog.authorTitle || 'Elden Heights School'}</span>
                  <span className="h-3 w-px bg-midnight/25" />
                  <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                  {blog.readingTime && (
                    <>
                      <span className="h-3 w-px bg-midnight/25" />
                      <span>{blog.readingTime} min read</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="relative pb-24 md:pb-32">
            <div className="mx-auto max-w-4xl px-6 space-y-10">
              {blog.coverImage && (
                <figure className="img-zoom relative overflow-hidden rounded-none border border-midnight/10 shadow-[0_40px_80px_-40px_rgba(10,10,12,0.35)]">
                  <img
                    src={blog.coverImage}
                    alt={blog.coverImageAlt || blog.title}
                    className="w-full object-cover"
                  />
                  {(blog.coverImageCaption || blog.coverImageCredit || blog.coverImageSource) && (
                    <figcaption className="flex flex-wrap items-center gap-3 border-t border-midnight/10 bg-white/90 px-6 py-4 text-xs text-midnight/70 backdrop-blur">
                      {blog.coverImageCaption && <span>{blog.coverImageCaption}</span>}
                      {blog.coverImageCredit && (
                        <span className="text-midnight/50">Credit: {blog.coverImageCredit}</span>
                      )}
                      {blog.coverImageSource && (
                        <a
                          href={blog.coverImageSource}
                          className="text-cardinal underline underline-offset-2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Source
                        </a>
                      )}
                    </figcaption>
                  )}
                </figure>
              )}
              <article className="surface-card rounded-none px-6 py-10 sm:px-10 md:px-14 md:py-14">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                {hasRichText(blog.content) ? (
                  <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  <div className="blog-content">
                    {splitParagraphs(blog.content).map((paragraph, index) => (
                      <p key={`blog-${blog.slug}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </article>
              <div className="flex items-center justify-between border-t border-midnight/10 pt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-midnight/60">
                <Link href="/blogs" className="transition hover:text-cardinal">
                  ← All Journal Entries
                </Link>
                <span>Elden Heights · Journal</span>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  try {
    const snapshot = await adminDb
      .collection('blogs')
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return { props: { blog: null } };
    }

    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      props: {
        blog: {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
          updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
          publishedAt: data.publishedAt ? data.publishedAt.toDate().toISOString() : null
        }
      }
    };
  } catch (error) {
    return { props: { blog: null } };
  }
}
