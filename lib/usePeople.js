import { useEffect, useState } from 'react';

import { seedFor } from '@/lib/peopleGroups';

/**
 * The published roster for one group.
 *
 * Falls back to the roster the site shipped with whenever the directory has
 * no entries for that group — so a page is never empty just because nobody
 * has filled the backend in yet, and a Firestore outage degrades to the
 * previous list rather than to nothing.
 *
 * Returns { people, ready, live } where `live` says whether the list came
 * from the directory rather than the seed.
 */
export default function usePeople(groupKey) {
  const [people, setPeople] = useState(() => seedFor(groupKey));
  const [ready, setReady] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPeople(seedFor(groupKey));
    setLive(false);
    setReady(false);

    const load = async () => {
      try {
        const res = await fetch('/api/people');
        if (!res.ok) throw new Error('directory unavailable');
        const data = await res.json();
        if (cancelled) return;

        const forGroup = (data.people || []).filter((p) => p.group === groupKey);
        if (forGroup.length) {
          setPeople(forGroup);
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
  }, [groupKey]);

  return { people, ready, live };
}
