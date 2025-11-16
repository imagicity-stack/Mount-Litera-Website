import '@/styles/globals.css';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { FACEBOOK_PIXEL_CODE } from '@/lib/facebookPixel';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
