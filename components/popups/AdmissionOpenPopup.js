import { useEffect, useState } from 'react';
import Link from 'next/link';

import { trackFacebookEvent } from '@/lib/facebookPixel';

const STORAGE_KEY = 'eh_classes_11_12_popup_dismissed';
const SHOW_DELAY_MS = 2500;

const AdmissionOpenPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    } catch (e) {
      // sessionStorage may be unavailable (Safari private mode) — just show the popup
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      trackFacebookEvent('ViewContent', {
        component: 'classes_11_12_popup'
      });
    }
  }, [isVisible]);

  const dismiss = () => {
    setIsVisible(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {
      // ignore
    }
  };

  const handleCtaClick = (label) => {
    trackFacebookEvent('ViewContent', {
      component: 'classes_11_12_popup_cta',
      cta: label
    });
    dismiss();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="classes-11-12-title"
      aria-describedby="classes-11-12-description"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close announcement"
        className="absolute inset-0 bg-midnight/75 backdrop-blur-sm transition-opacity duration-500 animate-[fadeIn_0.5s_ease-out]"
      />

      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-gold/25 bg-gradient-to-br from-midnight via-graphite to-midnight text-parchment shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)] animate-[popIn_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/main gate new.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cardinal/25 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-gold/15 blur-[110px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-parchment/20 bg-white/5 text-parchment/80 backdrop-blur transition hover:border-gold/50 hover:text-gold-200"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative px-8 py-10 md:px-10 md:py-12">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-gold opacity-70" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-gold-300">
              Just Opened · Classes XI &amp; XII
            </span>
          </div>

          <h2
            id="classes-11-12-title"
            className="mt-6 font-garamond text-[2.1rem] font-semibold leading-[1.05] text-parchment sm:text-[2.4rem]"
          >
            Stop hunting for schools.
            <br />
            <span className="italic">
              <span className="gold-text">Your seat</span> is here.
            </span>
          </h2>

          <span className="mt-5 block h-px w-16 bg-gradient-to-r from-gold to-transparent" />

          <p
            id="classes-11-12-description"
            className="mt-5 text-base leading-relaxed text-parchment/80"
          >
            The Elden Heights School is now accepting admissions for
            <span className="font-semibold text-parchment"> Class 11 &amp; Class 12 </span>
            for the 2026 – 27 session — CBSE-aligned, mentor-led, and built for board excellence.
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {[
              'Science · Commerce · Humanities',
              'Limited seats — merit &amp; first-come',
              'Board-focused mentorship cells',
              'Career counselling built in'
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-parchment/10 bg-white/5 px-3.5 py-2.5 text-xs text-parchment/85 backdrop-blur"
              >
                <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-gold to-cardinal" />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/admission#admission-inquiry"
              onClick={() => handleCtaClick('enquire')}
              className="btn-gold flex-1 justify-center"
            >
              Reserve My Seat
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-4-4l4 4-4 4" />
              </svg>
            </Link>
            <a
              href="https://wa.me/919431904333?text=Hi%2C%20I'm%20interested%20in%20admission%20for%20Class%2011%2F12%20at%20The%20Elden%20Heights%20School."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCtaClick('whatsapp')}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-parchment/25 bg-white/5 px-5 py-3 text-sm font-semibold text-parchment backdrop-blur transition hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white/10 hover:text-gold-200"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M20.5 3.5A11 11 0 003.5 18L2 22l4.2-1.4A11 11 0 0020.5 3.5zM12 20a8 8 0 01-4.3-1.3l-.3-.2-2.5.8.8-2.4-.2-.3A8 8 0 1112 20zm4.6-5.7c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.4-1 1-1 2.4s1 2.8 1.2 3 2.1 3.3 5.2 4.6c.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5l-.4-.3z" />
              </svg>
              WhatsApp Counsellor
            </a>
          </div>

          <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-parchment/55">
            Hazaribagh · Jharkhand · CBSE Affiliated
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AdmissionOpenPopup;
