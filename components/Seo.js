import Head from 'next/head';

import { DEFAULT_OG_IMAGE, SEO_DATA, SITE_URL } from '@/lib/seoData';

export default function Seo({ path }) {
  const seo = SEO_DATA[path];

  if (!seo) {
    return null;
  }

  const canonical = `${SITE_URL}${path === '/' ? '' : path}`;
  const robots = seo.noindex ? 'noindex, nofollow' : 'index, follow';
  const image = seo.image || DEFAULT_OG_IMAGE;

  const breadcrumbs = seo.breadcrumbs?.map((breadcrumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: breadcrumb.name,
    item: `${SITE_URL}${breadcrumb.path === '/' ? '' : breadcrumb.path}`
  }));

  const breadcrumbSchema = breadcrumbs?.length
    ? {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
    }
    : null;

  const faqSchema = seo.faq?.length
    ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: seo.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }
    : null;

  const jsonLd = [breadcrumbSchema, faqSchema].filter(Boolean);

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="The Elden Heights School" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={image} />
      {jsonLd.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}
