/**
 * Edenwoods scholarship — funnel events.
 *
 * One call per step, fanned out to both of the site's existing analytics
 * surfaces: the Meta Pixel in `_app.js`, and the Google Tag Manager container
 * in `_document.js`. Neither is loaded here — these are the tags the site
 * already carries, and a second copy of either would double-count every event.
 *
 * Nothing identifying a child or a parent is ever pushed. A registration
 * number is, because an analytics report needs a transaction id and that
 * number is already on a public merit list; a name, phone or email is not.
 */

import { trackFacebookCustomEvent, trackFacebookEvent } from '@/lib/facebookPixel';

export const SCHOLARSHIP_EVENTS = {
  VIEW: 'scholarship_view',
  REGISTER_CLICKED: 'scholarship_register_clicked',
  FORM_STARTED: 'scholarship_form_started',
  STEP_COMPLETED: 'scholarship_step_completed',
  CHECKOUT_STARTED: 'scholarship_checkout_started',
  COMPLETED: 'scholarship_registration_completed'
};

/** Our step name → the standard Meta event it also counts as, if any. */
const STANDARD_EQUIVALENT = {
  [SCHOLARSHIP_EVENTS.VIEW]: 'ViewContent',
  [SCHOLARSHIP_EVENTS.FORM_STARTED]: 'Lead',
  [SCHOLARSHIP_EVENTS.CHECKOUT_STARTED]: 'InitiateCheckout',
  [SCHOLARSHIP_EVENTS.COMPLETED]: 'Purchase'
};

const BASE = {
  content_name: 'Edenwoods Merit Scholarship 2027',
  content_category: 'scholarship'
};

/**
 * Push to the GTM container's queue.
 *
 * `dataLayer` is created by the GTM snippet in `_document.js`, which runs
 * before React hydrates — but it is initialised here as well so an event
 * fired during a slow or blocked GTM load is queued rather than thrown away.
 */
const pushToDataLayer = (payload) => {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch (error) {
    /* a blocked tag manager must never break a registration */
  }
};

export const trackScholarship = (event, payload = {}) => {
  const detail = { ...BASE, ...payload };

  // Google Tag Manager, which is what GA4 and any Google Ads conversion read.
  pushToDataLayer({ event, ...detail });

  // Meta Pixel: the named step, plus the standard event it maps onto.
  trackFacebookCustomEvent(event, detail);
  const standard = STANDARD_EQUIVALENT[event];
  if (standard) trackFacebookEvent(standard, detail);
};

/**
 * The completed registration, shaped the way GA4 expects a purchase so the
 * ₹199 shows up as revenue without anyone having to map fields in GTM.
 */
export const trackScholarshipCompleted = ({ registrationNumber, amount = 199, classApplying }) => {
  const detail = {
    ...BASE,
    transaction_id: registrationNumber,
    value: amount,
    currency: 'INR',
    items: [
      {
        item_id: 'edenwoods-merit-2027',
        item_name: 'Edenwoods Merit Scholarship 2027 registration',
        item_category: classApplying || '',
        price: amount,
        quantity: 1
      }
    ]
  };

  pushToDataLayer({ event: SCHOLARSHIP_EVENTS.COMPLETED, ...detail });
  pushToDataLayer({ event: 'purchase', ecommerce: detail });

  trackFacebookCustomEvent(SCHOLARSHIP_EVENTS.COMPLETED, detail);
  trackFacebookEvent('Purchase', {
    ...BASE,
    value: amount,
    currency: 'INR',
    content_ids: [registrationNumber]
  });
};
