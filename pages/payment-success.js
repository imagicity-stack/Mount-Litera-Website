import { useEffect } from 'react';
import Link from 'next/link';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import { trackFacebookEvent } from '@/lib/facebookPixel';
import {
  PRIORITY_TOKEN_CONTENT_DETAILS,
  PRIORITY_TOKEN_SESSION_STORAGE_KEY
} from '@/lib/priorityToken';

const FALLBACK_PURCHASE_PAYLOAD = { ...PRIORITY_TOKEN_CONTENT_DETAILS };

export default function PaymentSuccess() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let payload = null;
    try {
      const storedPayload = window.sessionStorage?.getItem(PRIORITY_TOKEN_SESSION_STORAGE_KEY);
      if (storedPayload) {
        payload = JSON.parse(storedPayload);
        window.sessionStorage.removeItem(PRIORITY_TOKEN_SESSION_STORAGE_KEY);
      }
    } catch (error) {
      console.warn('Unable to hydrate purchase payload for Meta tracking.', error);
    }

    trackFacebookEvent('Purchase', payload || FALLBACK_PURCHASE_PAYLOAD);
  }, []);

  return (
    <>
      <Seo path="/payment-success" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Payment Success"
            subtitle="Your priority seat is secured. We&rsquo;re excited to welcome you."
            eyebrow="Success"
            image="/payment-success/banner-confirm.jpg"
          />
          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-3xl px-6">
              <div className="surface-card relative overflow-hidden rounded-none p-10 text-center md:p-14">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/15 blur-[100px]" />

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/20 to-cardinal/10">
                  <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-cardinal">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <span className="eyebrow mt-8 justify-center">Thank You</span>
                <h1 className="mt-5 font-garamond text-3xl font-semibold leading-[1.1] text-midnight sm:text-4xl md:text-[40px]">
                  Priority seat <span className="italic gold-text">reserved</span>.
                </h1>
                <span className="mx-auto mt-6 block h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="mt-6 text-midnight/75 md:text-lg">
                  A counsellor will call you within 24 hours. Keep your payment reference handy for
                  a smooth discussion.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="https://wa.me/918668868875"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M20.5 3.5A11 11 0 003.5 18L2 22l4.2-1.4A11 11 0 0020.5 3.5zM12 20a8 8 0 01-4.3-1.3l-.3-.2-2.5.8.8-2.4-.2-.3A8 8 0 1112 20z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-midnight/70 transition hover:text-cardinal"
                  >
                    <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
