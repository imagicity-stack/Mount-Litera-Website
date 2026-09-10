/**
 * The Parent Room funnel.
 *
 * One call per step. Each of our own event names goes out as a custom event,
 * and the steps that map onto a standard Meta event send that too — so the ad
 * account can optimise against `Lead`, `InitiateCheckout` and `Purchase` while
 * the named steps stay readable in reporting.
 *
 * The pixel itself is the one already installed in `_app.js`. Nothing here
 * loads a second script or introduces another analytics vendor.
 */

import { trackFacebookCustomEvent, trackFacebookEvent } from '@/lib/facebookPixel';

export const PARENT_ROOM_EVENTS = {
  VIEW: 'parent_room_view',
  BOOK_CLICKED: 'parent_room_book_clicked',
  FORM_STARTED: 'parent_room_form_started',
  CONCERN_SELECTED: 'parent_room_concern_selected',
  SLOT_SELECTED: 'parent_room_slot_selected',
  CHECKOUT_STARTED: 'parent_room_checkout_started',
  BOOKING_COMPLETED: 'parent_room_booking_completed'
};

/** Our step name → the standard Meta event it also counts as, if any. */
const STANDARD_EQUIVALENT = {
  [PARENT_ROOM_EVENTS.VIEW]: 'ViewContent',
  [PARENT_ROOM_EVENTS.FORM_STARTED]: 'Lead',
  [PARENT_ROOM_EVENTS.CHECKOUT_STARTED]: 'InitiateCheckout',
  [PARENT_ROOM_EVENTS.BOOKING_COMPLETED]: 'Schedule'
};

const BASE = {
  content_name: 'The Parent Room',
  content_category: 'parent_guidance'
};

export const trackParentRoom = (event, payload = {}) => {
  const detail = { ...BASE, ...payload };

  trackFacebookCustomEvent(event, detail);

  const standard = STANDARD_EQUIVALENT[event];
  if (standard) trackFacebookEvent(standard, detail);

  // A completed booking is both a scheduled session and, when a fee was
  // actually taken, a purchase — reported separately so revenue reporting is
  // not inflated by sessions the school is collecting for offline.
  if (event === PARENT_ROOM_EVENTS.BOOKING_COMPLETED && payload.value > 0) {
    trackFacebookEvent('Purchase', { ...detail, currency: payload.currency || 'INR' });
  }
};
