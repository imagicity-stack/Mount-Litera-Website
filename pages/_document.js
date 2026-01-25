import { Html, Head, Main, NextScript } from 'next/document';

import { FACEBOOK_PIXEL_NO_SCRIPT } from '@/lib/facebookPixel';

export default function Document() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://eldenheights.org/#organization',
        name: 'The Elden Heights School',
        url: 'https://eldenheights.org',
        logo: 'https://eldenheights.org/website/shield.png',
        sameAs: [
          'https://www.instagram.com/elden.heights',
          'https://www.linkedin.com/company/eldenheights/',
          'https://www.facebook.com/theeldenheights',
          'https://www.youtube.com/@theeldenheights'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-9431904333',
          contactType: 'Admissions',
          areaServed: 'IN',
          availableLanguage: ['en', 'hi']
        }
      },
      {
        '@type': ['School', 'LocalBusiness'],
        '@id': 'https://eldenheights.org/#school',
        name: 'The Elden Heights School',
        url: 'https://eldenheights.org',
        image: 'https://eldenheights.org/website/header.png',
        telephone: '+91-9431904333',
        email: 'admission@eldenheights.org',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Katghara, Opp. BSF Firing Range, Silwar',
          addressLocality: 'Hazaribagh',
          addressRegion: 'Jharkhand',
          addressCountry: 'IN'
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://eldenheights.org/#website',
        url: 'https://eldenheights.org',
        name: 'The Elden Heights School',
        publisher: {
          '@id': 'https://eldenheights.org/#organization'
        }
      }
    ]
  };

  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7SDCLJ3YK5"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-7SDCLJ3YK5');
            `,
          }}
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="/website/favicon.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: FACEBOOK_PIXEL_NO_SCRIPT,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
