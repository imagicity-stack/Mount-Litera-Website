import { useEffect, useState } from 'react';

import { seedFor } from '@/lib/contentCollections';

/**
 * The published rows of a content collection.
 *
 * Falls back to the rows the site shipped with whenever the collection is
 * empty, so a page never renders blank before anyone has touched the backend,
 * and a Firestore outage degrades to the previous content rather than nothing.
 *
 * As with the people directory the fallback is all-or-nothing per collection:
 * the first row added replaces the shipped list entirely. The portal warns
 * about this and offers to import the shipped rows first.
 */
export default function useContent(collectionKey) {
  const [items, setItems] = useState(() => seedFor(collectionKey));
  const [ready, setReady] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setItems(seedFor(collectionKey));
    setLive(false);
    setReady(false);

    const load = async () => {
      try {
        const res = await fetch(`/api/content/${encodeURIComponent(collectionKey)}`);
        if (!res.ok) throw new Error('collection unavailable');
        const data = await res.json();
        if (cancelled) return;
        if ((data.items || []).length) {
          setItems(data.items);
          setLive(true);
        }
      } catch (error) {
        /* keep the seed */
      } finally {
        if (!cancelled) setReady(true);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [collectionKey]);

  return { items, ready, live };
}
