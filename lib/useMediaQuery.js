import { useEffect, useState } from 'react';

/**
 * SSR-safe media query hook. Returns false on the server and on the first
 * client render, then settles to the real answer — so markup always hydrates
 * consistently and only the behaviour changes afterwards.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event) => setMatches(event.matches);

    // Safari below 14 only has the deprecated listener API.
    if (list.addEventListener) {
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    }
    list.addListener(onChange);
    return () => list.removeListener(onChange);
  }, [query]);

  return matches;
}

/** True on phones and small tablets — the breakpoint the layout switches at. */
export const useIsSmallScreen = () => useMediaQuery('(max-width: 767px)');
