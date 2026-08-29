import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { defaultSettings, mergeSettings } from '@/lib/siteSettings';

const CACHE_KEY = 'ehs:site-settings:v1';
const CACHE_TTL_MS = 30 * 60 * 1000;

const SettingsContext = createContext(defaultSettings);

const readCache = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || Date.now() - parsed.at > CACHE_TTL_MS) return null;
    return parsed.settings || null;
  } catch (error) {
    return null;
  }
};

/**
 * Loads the school's details once per session and shares them with every
 * component that shows a phone number, an address, or an email.
 *
 * Seeded from the built-in defaults so the first render is always correct
 * even before the request lands, and from localStorage so a returning visitor
 * sees any edited value immediately.
 */
export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => mergeSettings(readCache()));

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) throw new Error('settings unavailable');
        const data = await res.json();
        if (cancelled || !data.settings) return;
        setSettings(data.settings);
        try {
          window.localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ at: Date.now(), settings: data.settings })
          );
        } catch (error) {
          /* storage blocked — in-memory is fine */
        }
      } catch (error) {
        /* keep the defaults */
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => settings, [settings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

/** The school's details. Never undefined — falls back to the built-in values. */
export default function useSiteSettings() {
  return useContext(SettingsContext);
}
