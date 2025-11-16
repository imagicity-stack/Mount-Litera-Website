export const FACEBOOK_PIXEL_ID = '1349505269968709';

export const FACEBOOK_PIXEL_NO_SCRIPT = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1" />`;

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

const PROMOTED_EVENT_TYPES = {
  AddPaymentInfo: 'ADD_PAYMENT_INFO',
  InitiateCheckout: 'INITIATE_CHECKOUT',
  Purchase: 'PURCHASE',
  Lead: 'LEAD',
  Contact: 'CONTACT'
};

export const trackFacebookEvent = (eventName, payload = {}) => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return;
  }

  const customEventType = PROMOTED_EVENT_TYPES[eventName];

  window.fbq('track', eventName, {
    ...payload,
    ...(customEventType ? { custom_event_type: customEventType } : {})
  });
};
