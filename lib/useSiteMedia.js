import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { mediaSlotMap } from '@/lib/mediaSlots';

const CACHE_KEY = 'ehs:site-media:v1';
const CACHE_TTL_MS = 10 * 60 * 1000;

const SiteMediaContext = createContext({ media: {}, ready: false });

const readCache = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || Date.now() - parsed.at > CACHE_TTL_MS) return null;
    return parsed.media || null;
  } catch (error) {
    return null;
  }
};

const writeCache = (media) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), media }));
  } catch (error) {
    /* storage full or blocked — the in-memory map still works */
  }
};

/**
 * Loads the map of admin-uploaded images once per session and shares it with
 * every SiteImage on the page.
 *
 * The map is seeded synchronously from localStorage so returning visitors
 * paint the uploaded image on the first frame rather than flashing the
 * reference image shipped in /public.
 */
export function SiteMediaProvider({ children }) {
  const [media, setMedia] = useState(() => readCache() || {});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/media');
        if (!res.ok) throw new Error('media unavailable');
        const data = await res.json();
        if (cancelled) return;
        const next = data.media || {};
        setMedia(next);
        writeCache(next);
      } catch (error) {
        /* keep whatever we have; SiteImage falls back to the reference image */
      } finally {
        if (!cancelled) setReady(true);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ media, ready }), [media, ready]);

  return <SiteMediaContext.Provider value={value}>{children}</SiteMediaContext.Provider>;
}

/**
 * Resolve a slot key to the image that should render right now: the uploaded
 * override when one exists, otherwise the reference image from the registry.
 */
export function useMediaSlot(key) {
  const { media } = useContext(SiteMediaContext);
  const slot = mediaSlotMap[key];
  const override = media[key];

  return useMemo(() => {
    if (!slot) {
      // An unknown key is a developer mistake; surface it loudly in dev only.
      if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn(`[SiteImage] Unknown media slot "${key}". Add it to lib/mediaSlots.js.`);
      }
      return { src: '', alt: '', focalX: 50, focalY: 50, ratio: '16 / 9', managed: false };
    }

    return {
      src: override?.url || slot.ref,
      alt: override?.alt || slot.alt || '',
      focalX: override?.focalX ?? 50,
      focalY: override?.focalY ?? 50,
      ratio: (slot.ratio || '16/9').replace('/', ' / '),
      managed: Boolean(override?.url)
    };
  }, [key, slot, override]);
}

export default SiteMediaContext;
