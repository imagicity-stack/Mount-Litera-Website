import { Html, Head, Main, NextScript } from 'next/document';

import { FACEBOOK_PIXEL_IMG_SRC } from '@/lib/facebookPixel';

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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WJ74ZGGV');`,
          }}
        />
        {/* End Google Tag Manager */}
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700;800&display=swap"
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
        <iframe
          title="Google Tag Manager"
          src="https://www.googletagmanager.com/ns.html?id=GTM-WJ74ZGGV"
          height="0"
          width="0"
          aria-hidden="true"
          style={{ display: 'none', visibility: 'hidden' }}
        />
        <img
          alt=""
          height="1"
          width="1"
          aria-hidden="true"
          style={{ display: 'none' }}
          src={FACEBOOK_PIXEL_IMG_SRC}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
