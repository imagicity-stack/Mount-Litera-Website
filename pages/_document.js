import { Html, Head, Main, NextScript } from 'next/document';

import { FACEBOOK_PIXEL_NO_SCRIPT } from '@/lib/facebookPixel';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
