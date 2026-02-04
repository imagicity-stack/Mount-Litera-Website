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

export default function BlogDetailPage({ blog }) {
  if (!blog) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-xl text-center space-y-4">
            <h1 className="text-3xl font-semibold text-black">Story not found</h1>
            <p className="text-gray-600">
              The blog you are looking for is unavailable. Please return to the blog home.
            </p>
            <Link
              href="/blogs"
              className="inline-flex rounded-full border border-black/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black"
            >
              Back to blogs
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const canonical = `${SITE_URL}/blogs/${blog.slug}`;
  const title = blog.seoTitle || blog.title;
  const description = blog.seoDescription || blog.excerpt || blog.title;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.coverImage || `${SITE_URL}/website/header.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={blog.coverImage || `${SITE_URL}/website/header.png`} />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="bg-[#f8f4ef] py-16">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <Link
                href="/blogs"
                className="text-sm font-semibold uppercase tracking-[0.3em] text-cardinal"
              >
                ← Back to Blogs
              </Link>
              <h1 className="text-4xl sm:text-5xl font-semibold text-black">{blog.title}</h1>
              <p className="text-lg text-gray-700">{blog.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="font-semibold text-black">{blog.authorName || 'Editorial Team'}</span>
                <span>{blog.authorTitle || 'Elden Heights School'}</span>
                <span>•</span>
                <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                {blog.readingTime && (
                  <>
                    <span>•</span>
                    <span>{blog.readingTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </section>
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-6 space-y-8">
              {blog.coverImage && (
                <div className="overflow-hidden rounded-3xl border border-black/10 shadow-xl shadow-cardinal/10">
                  <img src={blog.coverImage} alt={blog.title} className="w-full object-cover" />
                </div>
              )}
              <article className="space-y-6 text-gray-700">
                {splitParagraphs(blog.content).map((paragraph, index) => (
                  <p key={`blog-${blog.slug}-${index}`}>{paragraph}</p>
                ))}
              </article>
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
