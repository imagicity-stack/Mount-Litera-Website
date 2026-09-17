import { useEffect, useMemo, useState } from 'react';

import { seedFor } from '@/lib/peopleGroups';

/**
 * The published roster for one group.
 *
 * `initialPeople` is the roster the server already rendered into the HTML (see
 * `lib/peopleServer.js`). When it is present the first paint is already
 * correct, so there is nothing for the client to swap and no flash of the
 * roster the site shipped with.
 *
 * Falls back to that shipped roster only when the server had nothing — the
 * directory is genuinely empty for this group, or was unreachable at build —
 * so a page is never blank just because nobody has filled the backend in yet.
 *
 * The client still refetches, which is what lets an editor see a change before
 * the page is regenerated. Normally that returns the same roster and nothing
 * moves; when it differs, replacing stale names with current ones is the
 * correct thing to do.
 *
 * Returns { people, ready, live } where `live` says whether the list came
 * from the directory rather than the seed.
 */
export default function usePeople(groupKey, initialPeople = null) {
  const hasInitial = Array.isArray(initialPeople) && initialPeople.length > 0;

  const [people, setPeople] = useState(() =>
    hasInitial ? initialPeople : seedFor(groupKey)
  );
  const [ready, setReady] = useState(hasInitial);
  const [live, setLive] = useState(hasInitial);

  // Only the identity of the server roster matters for re-seeding, and a new
  // array arrives on every navigation; comparing ids keeps the effect from
  // re-running on an unchanged list.
  const initialKey = useMemo(
    () => (hasInitial ? initialPeople.map((p) => p.id).join('|') : ''),
    [hasInitial, initialPeople]
  );

  useEffect(() => {
    let cancelled = false;
    setPeople(hasInitial ? initialPeople : seedFor(groupKey));
    setLive(hasInitial);
    setReady(hasInitial);

    const load = async () => {
      try {
        const res = await fetch('/api/people');
        if (!res.ok) throw new Error('directory unavailable');
        const data = await res.json();
        if (cancelled) return;

        const forGroup = (data.people || []).filter((p) => p.group === groupKey);
        if (forGroup.length) {
          // Replacing an identical list would re-render the page — and
          // re-trigger every entry animation — for no reason.
          setPeople((current) =>
            sameRoster(current, forGroup) ? current : forGroup
          );
          setLive(true);
        }
      } catch (error) {
        /* keep whatever is already on screen */
      } finally {
        if (!cancelled) setReady(true);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupKey, initialKey]);

  return { people, ready, live };
}

/** Same entries, same order, same content that the page actually renders. */
const sameRoster = (a, b) => {
  if (a === b) return true;
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  return a.every((person, index) => {
    const other = b[index];
    return (
      person.id === other.id &&
      person.name === other.name &&
      person.designation === other.designation &&
      person.department === other.department &&
      person.photo === other.photo &&
      person.bio === other.bio
    );
  });
};
