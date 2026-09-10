/**
 * /parent-room — the campaign landing page.
 *
 * Publicly reachable through its direct URL and deliberately kept out of search
 * results: `noindex, nofollow` comes from the shared `Seo` component (the entry
 * in `lib/seoData.js` sets `noindex`), and the route is disallowed in
 * robots.txt and absent from the sitemap. Not indexed is not the same as
 * private — anyone with the link can open it, which is exactly what an
 * advertisement needs.
 *
 * One page serves every creative. The headline and the offer are fixed; only
 * the supporting line changes, chosen by `?variant=` or by the `utm_content`
 * value the ad already carries, so a new creative needs a new URL parameter
 * rather than a new page.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Seo from '@/components/Seo';
import BookingPanel from '@/components/parent-room/BookingPanel';
import {
  AboutTheSession,
  Concerns,
  Faq,
  Hero,
  HowItWorks,
  ParentRoomFooter,
  ParentRoomHeader
} from '@/components/parent-room/Sections';
import { defaultParentRoomSettings } from '@/lib/parentRoom';
import { PARENT_ROOM_EVENTS, trackParentRoom } from '@/lib/parentRoomAnalytics';
import { parentRoomIdentity, resolveHero } from '@/lib/parentRoomCopy';
import useParentRoomCampaign from '@/lib/useParentRoomCampaign';

export default function ParentRoom() {
  const router = useRouter();
  const campaign = useParentRoomCampaign();
  const bookingRef = useRef(null);
  const viewedRef = useRef(false);

  // Seeded from the shipped defaults so the fee and duration are right on the
  // first paint; the availability request replaces them with what the school
  // has actually configured.
  const [settings, setSettings] = useState(defaultParentRoomSettings);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/parent-room/availability')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.settings) setSettings((current) => ({ ...current, ...data.settings }));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (viewedRef.current || !router.isReady) return;
    viewedRef.current = true;
    trackParentRoom(PARENT_ROOM_EVENTS.VIEW, {
      utm_source: campaign.source || '',
      utm_campaign: campaign.campaign || ''
    });
  }, [router.isReady, campaign]);

  const scrollToBooking = useCallback(() => {
    trackParentRoom(PARENT_ROOM_EVENTS.BOOK_CLICKED);
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // `?variant=screen-time` wins; otherwise the ad's own `utm_content` selects
  // the line, so the ad manager does not have to carry two parameters.
  const hero = resolveHero(router.query.variant || campaign.adCreative);

  return (
    <>
      <Seo path="/parent-room" />
      <Head>
        {/* Stated here as well as in the Seo component: this page must never be
            indexed, and a single source of that instruction is one edit away
            from being lost. */}
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <meta name="theme-color" content="#0D0D0D" />
      </Head>

      <div className="flex min-h-screen flex-col bg-ivory">
        <ParentRoomHeader />

        <main className="flex-1">
          <Hero
            hero={hero}
            onBook={scrollToBooking}
            counsellorName={settings.counsellorName}
            counsellorTitle={settings.counsellorTitle}
            fee={settings.participationFee}
          />

          <Concerns onBook={scrollToBooking} />

          <HowItWorks />

          <AboutTheSession
            fee={settings.participationFee}
            duration={settings.sessionDuration}
            counsellorName={settings.counsellorName}
            counsellorTitle={settings.counsellorTitle}
          />

          {/* ------------------------------------------------------- booking */}
          <section id="book" ref={bookingRef} className="band-grey scroll-mt-4">
            <div className="shell py-16 md:py-24">
              <div className="max-w-3xl">
                <span className="rule-heavy" />
                <h2 className="mt-10 font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.08] text-ink">
                  Book your session
                </h2>
                <p className="lede mt-6">
                  {parentRoomIdentity.tagline} Choose a time that works for you — most parents are
                  through this in under three minutes.
                </p>
              </div>

              <div className="mt-12">
                <BookingPanel campaign={campaign} settings={settings} />
              </div>
            </div>
          </section>

          <Faq />
        </main>

        <ParentRoomFooter />
      </div>
    </>
  );
}
