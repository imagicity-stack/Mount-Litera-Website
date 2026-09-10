export const FACEBOOK_PIXEL_ID = '1349505269968709';

export const FACEBOOK_PIXEL_NO_SCRIPT = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1" />`;

export const FACEBOOK_PIXEL_IMG_SRC = `https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`;

export const FACEBOOK_PIXEL_CODE = `!function(f,b,e,v,n,t,s){
  if (f.fbq) return;
  n = f.fbq = function() {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = '2.0';
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
window.fbq('init', '${FACEBOOK_PIXEL_ID}');
window.fbq('track', 'PageView');`;

const pendingEvents = [];
let flushTimeoutId = null;

const flushPendingEvents = () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.fbq !== 'function') {
    if (!flushTimeoutId) {
      flushTimeoutId = window.setTimeout(() => {
        flushTimeoutId = null;
        flushPendingEvents();
      }, 400);
    }
    return;
  }

  while (pendingEvents.length > 0) {
    const { method, eventName, payload } = pendingEvents.shift();
    window.fbq(method, eventName, payload);
  }
};

const queueOrSend = (method, eventName, payload) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.fbq !== 'function') {
    pendingEvents.push({ method, eventName, payload });
    flushPendingEvents();
    return;
  }

  window.fbq(method, eventName, payload);
};

export const trackFacebookEvent = (eventName, payload = {}) =>
  queueOrSend('track', eventName, payload);

/**
 * A funnel step of our own, reported alongside the standard events rather than
 * instead of them. `trackCustom` is the call Meta expects for a name that is
 * not one of its own — sending an invented name through `track` is silently
 * dropped at the other end.
 */
export const trackFacebookCustomEvent = (eventName, payload = {}) =>
  queueOrSend('trackCustom', eventName, payload);
