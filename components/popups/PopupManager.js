import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { popupIsLive, popupMatchesPath, resolveTheme } from '@/lib/popupConfig';
import { trackFacebookEvent } from '@/lib/facebookPixel';

const storageKey = (id) => `eh_popup_${id}`;

const safeGet = (storage, key) => {
  try {
    return storage.getItem(key);
  } catch (error) {
    return null;
  }
};

const safeSet = (storage, key, value) => {
  try {
    storage.setItem(key, value);
  } catch (error) {
    /* ignore */
  }
};

const canShow = (popup) => {
  if (typeof window === 'undefined') return false;
  const key = storageKey(popup.id);
  switch (popup.frequency) {
    case 'always':
      return true;
    case 'session':
      return !safeGet(window.sessionStorage, key);
    case 'once':
      return !safeGet(window.localStorage, key);
    case 'daily': {
      const last = safeGet(window.localStorage, key);
      if (!last) return true;
      return new Date(last).toDateString() !== new Date().toDateString();
    }
    case 'cooldown': {
      const last = safeGet(window.localStorage, key);
      if (!last) return true;
      const days = Number(popup.frequencyDays) || 7;
      return Date.now() - new Date(last).getTime() > days * 86400000;
    }
    default:
      return true;
  }
};

const markShown = (popup) => {
  if (typeof window === 'undefined') return;
  const key = storageKey(popup.id);
  const stamp = new Date().toISOString();
  if (popup.frequency === 'session') {
    safeSet(window.sessionStorage, key, stamp);
  } else if (popup.frequency !== 'always') {
    safeSet(window.localStorage, key, stamp);
  }
};

export default function PopupManager() {
  const router = useRouter();
  const [popups, setPopups] = useState([]);
  const [active, setActive] = useState(null);
  const [closing, setClosing] = useState(false);
  const trackedRef = useRef(new Set());
  const timersRef = useRef([]);

  const path = router.asPath || '/';
  const isAdminPath = path.startsWith('/admin') || path.startsWith('/blogs/admin');

  // Load active popups once on mount.
  useEffect(() => {
    let mounted = true;
    fetch('/api/popups', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : { popups: [] }))
      .then((data) => {
        if (mounted) setPopups(data.popups || []);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const eligible = useMemo(() => {
    if (isAdminPath) return null;
    const now = new Date();
    return (
      popups
        .filter((p) => popupIsLive(p, now))
        .filter((p) => popupMatchesPath(p, path))
        .filter((p) => canShow(p))
        .sort((a, b) => (b.priority || 0) - (a.priority || 0))[0] || null
    );
  }, [popups, path, isAdminPath]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  const reveal = useCallback((popup) => {
    setActive(popup);
    setClosing(false);
    markShown(popup);
    if (!trackedRef.current.has(`${popup.id}-imp`)) {
      trackedRef.current.add(`${popup.id}-imp`);
      fetch('/api/popups/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: popup.id, event: 'impression' })
      }).catch(() => {});
      trackFacebookEvent('ViewContent', { component: 'popup', popup_id: popup.id });
    }
  }, []);

  // Wire up the trigger for the eligible popup whenever path / eligibility changes.
  useEffect(() => {
    clearTimers();
    setActive(null);
    setClosing(false);

    if (!eligible) return undefined;

    const popup = eligible;
    const value = Number(popup.triggerValue) || 0;

    if (popup.trigger === 'immediate') {
      reveal(popup);
      return undefined;
    }

    if (popup.trigger === 'delay') {
      const t = setTimeout(() => reveal(popup), Math.max(0, value) * 1000);
      timersRef.current.push(t);
      return () => clearTimers();
    }

    if (popup.trigger === 'scroll') {
      const onScroll = () => {
        const scrolled =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight || 1)) * 100;
        if (scrolled >= (value || 40)) {
          reveal(popup);
          window.removeEventListener('scroll', onScroll);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    if (popup.trigger === 'exit') {
      const onLeave = (e) => {
        if (e.clientY <= 0) {
          reveal(popup);
          document.removeEventListener('mouseout', onLeave);
        }
      };
      // Small guard so exit-intent doesn't fire instantly on load.
      const t = setTimeout(() => document.addEventListener('mouseout', onLeave), 2000);
      timersRef.current.push(t);
      return () => {
        document.removeEventListener('mouseout', onLeave);
        clearTimers();
      };
    }

    return undefined;
  }, [eligible, reveal, clearTimers]);

  const dismiss = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setActive(null);
      setClosing(false);
    }, 250);
  }, []);

  const handleCta = useCallback(
    (popup, url) => {
      fetch('/api/popups/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: popup.id, event: 'click' })
      }).catch(() => {});
      trackFacebookEvent('Lead', { component: 'popup', popup_id: popup.id });
      if (url) {
        if (/^https?:\/\//i.test(url)) {
          window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          router.push(url);
        }
      }
      dismiss();
    },
    [router, dismiss]
  );

  if (!active) return null;

  return <PopupView popup={active} onClose={dismiss} onCta={handleCta} closing={closing} />;
}

function PopupView({ popup, onClose, onCta, closing }) {
  const theme = resolveTheme(popup);
  const layout = popup.layout || 'modal';

  const cta = (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      {popup.primaryCtaLabel && (
        <button
          type="button"
          onClick={() => onCta(popup, popup.primaryCtaUrl)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
          style={{ background: theme.accent, color: theme.bg }}
        >
          {popup.primaryCtaLabel}
          <span aria-hidden="true">→</span>
        </button>
      )}
      {popup.secondaryCtaLabel && (
        <button
          type="button"
          onClick={() => onCta(popup, popup.secondaryCtaUrl)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
          style={{ borderColor: `${theme.text}40`, color: theme.text }}
        >
          {popup.secondaryCtaLabel}
        </button>
      )}
    </div>
  );

  const closeButton = popup.showCloseButton !== false && (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition hover:scale-105"
      style={{ borderColor: `${theme.text}33`, color: theme.text, background: `${theme.text}14` }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );

  const body = (
    <>
      {popup.imagePosition === 'background' && popup.image && (
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{ backgroundImage: `url('${popup.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          aria-hidden="true"
        />
      )}
      {popup.imagePosition === 'top' && popup.image && (
        <img src={popup.image} alt={popup.imageAlt || ''} className="h-40 w-full object-cover" />
      )}
      <div className="relative p-7 sm:p-9">
        {popup.eyebrow && (
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.4em]"
            style={{ color: theme.accent }}
          >
            {popup.eyebrow}
          </span>
        )}
        {popup.title && (
          <h2 className="mt-3 font-garamond text-3xl font-semibold leading-tight" style={{ color: theme.text }}>
            {popup.title}
          </h2>
        )}
        {popup.body && (
          <p className="mt-4 text-sm leading-relaxed" style={{ color: `${theme.text}cc` }}>
            {popup.body}
          </p>
        )}
        {cta}
      </div>
    </>
  );

  // Layout-specific wrappers.
  if (layout === 'banner-top' || layout === 'banner-bottom') {
    return (
      <AnimatePresence>
        {!closing && (
          <motion.div
            initial={{ y: layout === 'banner-top' ? -80 : 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: layout === 'banner-top' ? -80 : 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-x-0 z-[80] ${layout === 'banner-top' ? 'top-0' : 'bottom-0'}`}
            style={{ background: theme.bg }}
          >
            <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-4 sm:flex-row sm:justify-between">
              <div className="flex flex-col text-center sm:text-left">
                {popup.eyebrow && (
                  <span className="text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: theme.accent }}>
                    {popup.eyebrow}
                  </span>
                )}
                <span className="font-garamond text-lg font-semibold" style={{ color: theme.text }}>
                  {popup.title}
                </span>
                {popup.body && (
                  <span className="text-xs" style={{ color: `${theme.text}b3` }}>
                    {popup.body}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {popup.primaryCtaLabel && (
                  <button
                    type="button"
                    onClick={() => onCta(popup, popup.primaryCtaUrl)}
                    className="rounded-full px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
                    style={{ background: theme.accent, color: theme.bg }}
                  >
                    {popup.primaryCtaLabel}
                  </button>
                )}
                {popup.showCloseButton !== false && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="flex h-8 w-8 items-center justify-center rounded-full border"
                    style={{ borderColor: `${theme.text}33`, color: theme.text }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (layout === 'slide-in') {
    return (
      <AnimatePresence>
        {!closing && (
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-5 z-[80] w-[min(92vw,360px)] overflow-hidden rounded-3xl shadow-2xl"
            style={{ background: theme.bg, border: `1px solid ${theme.accent}40` }}
          >
            {closeButton}
            {body}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // modal + fullscreen
  const isFullscreen = layout === 'fullscreen';
  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={popup.overlayClose !== false ? onClose : undefined}
            aria-label="Close"
            className="absolute inset-0 bg-midnight/75 backdrop-blur-sm"
            tabIndex={-1}
          />
          <motion.div
            initial={{ y: 24, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`relative overflow-hidden shadow-2xl ${
              isFullscreen ? 'h-full w-full max-w-3xl rounded-[28px]' : 'w-full max-w-lg rounded-[28px]'
            }`}
            style={{ background: theme.bg, border: `1px solid ${theme.accent}40` }}
          >
            {closeButton}
            {popup.imagePosition === 'side' && popup.image ? (
              <div className="grid sm:grid-cols-2">
                <img src={popup.image} alt={popup.imageAlt || ''} className="h-full w-full object-cover" />
                <div>{body}</div>
              </div>
            ) : (
              body
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
