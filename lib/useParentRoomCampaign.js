import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { CAMPAIGN_KEYS, sanitizeCampaign } from '@/lib/parentRoom';

const STORAGE_KEY = 'ehs:parent-room:campaign';

const readStored = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Where this parent came from.
 *
 * Captured from the URL on arrival and kept in sessionStorage for the rest of
 * the visit, because the parameters are on the landing URL and a parent who
 * opens the privacy policy and comes back would otherwise be recorded as
 * Direct. First touch wins: a later visit without parameters does not erase
 * the ad that actually brought them.
 */
export default function useParentRoomCampaign() {
  const router = useRouter();
  const [campaign, setCampaign] = useState({ channel: 'Direct' });

  useEffect(() => {
    if (!router.isReady) return;

    const fromUrl = {};
    CAMPAIGN_KEYS.forEach((key) => {
      const value = router.query[key];
      if (typeof value === 'string' && value) fromUrl[key] = value;
    });

    if (Object.keys(fromUrl).length === 0) {
      const stored = readStored();
      setCampaign(stored || sanitizeCampaign({}));
      return;
    }

    const next = sanitizeCampaign(fromUrl);
    setCampaign(next);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      /* private browsing — attribution is a nicety, not a requirement */
    }
  }, [router.isReady, router.query]);

  return campaign;
}
