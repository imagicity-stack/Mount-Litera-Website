import '@/styles/globals.css';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { FACEBOOK_PIXEL_CODE, trackFacebookEvent } from '@/lib/facebookPixel';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }

      trackFacebookEvent('ViewContent', {
        page_path: url,
        page_title: document?.title || '',
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    trackFacebookEvent('ViewContent', {
      page_path: router.asPath,
      page_title: document?.title || '',
    });
  }, [router.asPath]);

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: FACEBOOK_PIXEL_CODE,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
