/**
 * The Parent Room booking flow.
 *
 * Five steps, laid out the way a scheduling tool is: the session and the person
 * on the left, the form and the calendar on the right, stacked on a phone.
 *
 * Three things in here are deliberate rather than incidental:
 *
 *   1. A slot is not held until the parent has finished the questionnaire and
 *      pressed confirm. Holding it earlier would mean an abandoned form takes a
 *      time out of circulation for fifteen minutes.
 *   2. The hold has a visible countdown. A parent who walks away and comes back
 *      is told plainly that the time was released, rather than failing at the
 *      last step with an error they cannot act on.
 *   3. Nothing in this file decides whether a payment succeeded. The gateway's
 *      response is forwarded to the server, which recomputes the signature; the
 *      confirmation screen renders only what the server sends back.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import Calendar from '@/components/parent-room/Calendar';
import Confirmation from '@/components/parent-room/Confirmation';
import { CounsellorPortrait, CounsellorIdentity } from '@/components/parent-room/Counsellor';
import {
  ChoiceGrid,
  ConsentCheckbox,
  SummaryRow,
  TextAreaField,
  TextField
} from '@/components/parent-room/fields';
import {
  LIMITS,
  communicationOptions,
  concernLabel,
  concernOptions,
  hasErrors,
  languageOptions,
  schoolChangeLabel,
  schoolChangeOptions,
  validateChildStep,
  validateConsentStep,
  validateParentStep
} from '@/lib/parentRoom';
import { formatDateKey } from '@/lib/parentRoomTime';
import { PARENT_ROOM_EVENTS, trackParentRoom } from '@/lib/parentRoomAnalytics';
import { privacyLine, sessionFacts, stepTitles } from '@/lib/parentRoomCopy';

const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';
const RESUME_KEY = 'ehs:parent-room:booking';

const emptyDraft = {
  parentName: '',
  mobile: '',
  whatsapp: '',
  email: '',
  preferredCommunication: 'whatsapp',

  childFirstName: '',
  childAge: '',
  currentClass: '',
  currentSchool: '',

  primaryConcern: '',
  concernDetails: '',
  schoolChangeIntent: '',
  sessionExpectation: '',
  preferredLanguage: 'english',

  guidanceConsent: false,
  dataConsent: false,
  marketingConsent: false
};

/**
 * Read a response without ever throwing on its body.
 *
 * Our own routes answer with JSON, but a failure that happens *above* the route
 * — a crashed or timed-out serverless function, a gateway in front of it —
 * answers with an HTML error page. `res.json()` throws on that, and the throw
 * used to be caught as a generic network problem, which hid the one piece of
 * information worth having. Whatever comes back, the caller gets something it
 * can show.
 */
const readBody = async (res) => {
  const text = await res.text().catch(() => '');
  try {
    return { data: text ? JSON.parse(text) : {}, raw: text, isJson: true };
  } catch (error) {
    return { data: {}, raw: text, isJson: false };
  }
};

/** A message for a failure that produced no usable JSON of its own. */
const httpFailureMessage = (res, raw) => {
  const detail = String(raw || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140);
  return `The payment could not be started (error ${res.status}${
    detail ? `: ${detail}` : ''
  }). Your time is still held — please try again, or contact the school.`;
};

/** Load the gateway's widget once, on demand. */
const loadCheckout = () =>
  new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'));
    if (window.Razorpay) return resolve(window.Razorpay);
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Razorpay));
      existing.addEventListener('error', () => reject(new Error('checkout failed to load')));
      return undefined;
    }
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT;
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error('checkout failed to load'));
    document.body.appendChild(script);
    return undefined;
  });

function Progress({ step }) {
  return (
    <ol className="flex items-stretch gap-1.5" aria-label="Booking progress">
      {stepTitles.map((title, index) => {
        const state = index < step ? 'done' : index === step ? 'current' : 'todo';
        return (
          <li key={title} className="flex-1">
            <span
              aria-current={state === 'current' ? 'step' : undefined}
              className={`block h-[3px] transition-colors duration-500 ${
                state === 'todo' ? 'bg-hairline' : 'bg-crimson'
              }`}
            />
            <span
              className={`mt-2 hidden text-[0.65rem] font-bold uppercase tracking-[0.1em] sm:block ${
                state === 'current' ? 'text-crimson' : 'text-ink-muted'
              }`}
            >
              {title}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Notice({ tone = 'error', children }) {
  if (!children) return null;
  const tones = {
    error: 'border-crimson bg-crimson/[0.05] text-crimson',
    info: 'border-hairline bg-ivory text-ink-soft'
  };
  return (
    <p role="alert" className={`border px-4 py-3 text-[0.9rem] font-semibold ${tones[tone]}`}>
      {children}
    </p>
  );
}

/** Minutes:seconds left on the hold, so the pressure is visible but calm. */
function HoldCountdown({ expiresAt, onExpire }) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, new Date(expiresAt).getTime() - Date.now())
  );

  useEffect(() => {
    const id = setInterval(() => {
      const left = Math.max(0, new Date(expiresAt).getTime() - Date.now());
      setRemaining(left);
      if (left === 0) onExpire();
    }, 1000);
    return () => clearInterval(id);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return (
    <p className="text-[0.8rem] text-ink-muted">
      This time is held for you for{' '}
      <span className="font-bold tabular-nums text-ink">
        {minutes}:{String(seconds).padStart(2, '0')}
      </span>
      .
    </p>
  );
}

export default function BookingPanel({ campaign, settings: seedSettings }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(emptyDraft);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  const [availability, setAvailability] = useState({ days: [], months: [], loading: true });
  const [settings, setSettings] = useState(seedSettings);
  const [slot, setSlot] = useState(null);

  const [hold, setHold] = useState(null);
  const [busy, setBusy] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const startedRef = useRef(false);
  const panelRef = useRef(null);

  const set = (field) => (value) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
    if (!startedRef.current) {
      startedRef.current = true;
      trackParentRoom(PARENT_ROOM_EVENTS.FORM_STARTED);
    }
  };

  // ------------------------------------------------------------ availability

  const loadAvailability = useCallback(async () => {
    setAvailability((current) => ({ ...current, loading: true }));
    try {
      const res = await fetch('/api/parent-room/availability');
      const data = await res.json();
      setAvailability({ days: data.days || [], months: data.months || [], loading: false });
      if (data.settings) setSettings(data.settings);
      if (data.degraded) {
        setNotice('We could not reach the booking calendar. Please refresh in a moment.');
      }
    } catch (error) {
      setAvailability({ days: [], months: [], loading: false });
      setNotice('We could not load the available times. Please refresh and try again.');
    }
  }, []);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  // A confirmed booking survives a refresh, so a parent who reloads the page
  // after paying sees their confirmation rather than an empty form.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let stored;
    try {
      stored = JSON.parse(window.sessionStorage.getItem(RESUME_KEY) || 'null');
    } catch (error) {
      stored = null;
    }
    if (!stored?.bookingId || !stored?.token) return;

    fetch(
      `/api/parent-room/booking/${encodeURIComponent(stored.bookingId)}?token=${encodeURIComponent(
        stored.token
      )}`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.booking?.bookingStatus === 'confirmed') {
          setConfirmation(data.booking);
          setStep(4);
        }
      })
      .catch(() => {});
  }, []);

  const scrollToPanel = useCallback(() => {
    if (typeof window === 'undefined' || !panelRef.current) return;
    const top = panelRef.current.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  }, [reduce]);

  const goTo = useCallback(
    (next) => {
      setStep(next);
      setNotice('');
      scrollToPanel();
    },
    [scrollToPanel]
  );

  // ------------------------------------------------------------- navigation

  const next = () => {
    if (step === 0) {
      const found = validateParentStep(draft);
      setErrors(found);
      if (hasErrors(found)) return;
      goTo(1);
      return;
    }
    if (step === 1) {
      const found = validateChildStep(draft);
      setErrors(found);
      if (hasErrors(found)) return;
      goTo(2);
      return;
    }
    if (step === 2) {
      if (!slot) {
        setNotice('Please choose a date and a time to continue.');
        return;
      }
      goTo(3);
    }
  };

  const back = () => goTo(Math.max(0, step - 1));

  const chooseConcern = (value) => {
    set('primaryConcern')(value);
    trackParentRoom(PARENT_ROOM_EVENTS.CONCERN_SELECTED, { concern: value });
  };

  const chooseSlot = (picked) => {
    setSlot(picked);
    setNotice('');
    trackParentRoom(PARENT_ROOM_EVENTS.SLOT_SELECTED, { slot: picked.slotId });
  };

  // ------------------------------------------------------------------- hold

  const releaseAndReturnToCalendar = useCallback(
    (message) => {
      setHold(null);
      setSlot(null);
      setNotice(message);
      loadAvailability();
      setStep(2);
      scrollToPanel();
    },
    [loadAvailability, scrollToPanel]
  );

  const startBooking = async () => {
    const found = { ...validateParentStep(draft), ...validateChildStep(draft), ...validateConsentStep(draft) };
    setErrors(found);
    if (hasErrors(found)) {
      setNotice('Some details still need attention.');
      return;
    }
    if (!slot) {
      releaseAndReturnToCalendar('Please choose a date and a time.');
      return;
    }

    setBusy(true);
    setNotice('');
    try {
      const res = await fetch('/api/parent-room/hold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...draft,
          childAge: Number(draft.childAge),
          slotId: slot.slotId,
          campaign,
          landingPath: typeof window !== 'undefined' ? window.location.pathname + window.location.search : ''
        })
      });
      const { data, raw, isJson } = await readBody(res);

      if (!res.ok) {
        if (res.status === 409) {
          releaseAndReturnToCalendar(data.message || 'That time has just been taken.');
        } else if (data.errors) {
          setErrors(data.errors);
          setNotice(data.message || 'Some details still need attention.');
        } else {
          setNotice(
            (isJson && data.message) ||
              `We could not hold that time (error ${res.status}). Please try again.`
          );
          // eslint-disable-next-line no-console
          console.error('Parent Room hold failed', res.status, raw.slice(0, 500));
        }
        return;
      }

      setHold(data);
      trackParentRoom(PARENT_ROOM_EVENTS.CHECKOUT_STARTED, {
        value: data.amount,
        currency: data.currency
      });
      goTo(4);
    } catch (error) {
      setNotice('We could not reach the school just now. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  // ---------------------------------------------------------------- confirm

  const finish = useCallback(
    async (paymentPayload = {}) => {
      if (!hold) return;
      setBusy(true);
      try {
        const res = await fetch('/api/parent-room/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: hold.bookingId,
            reservationToken: hold.reservationToken,
            ...paymentPayload
          })
        });
        const { data, raw, isJson } = await readBody(res);

        if (!res.ok) {
          if (res.status === 409) {
            releaseAndReturnToCalendar(
              data.message || 'That time was taken while you were paying. Please choose another.'
            );
          } else {
            // By this point the parent may already have been charged, so a
            // vague apology is the wrong thing to show. Give them the booking
            // reference and tell them to quote it.
            setNotice(
              (isJson && data.message) ||
                `We could not confirm the booking (error ${res.status}). If you have been charged, contact the school quoting ${hold.bookingId} — your payment is safe and the session will be confirmed manually.`
            );
            // eslint-disable-next-line no-console
            console.error('Parent Room confirm failed', res.status, raw.slice(0, 500));
          }
          return;
        }

        setConfirmation(data.booking);
        try {
          window.sessionStorage.setItem(
            RESUME_KEY,
            JSON.stringify({ bookingId: hold.bookingId, token: hold.reservationToken })
          );
        } catch (error) {
          /* private browsing — the confirmation email is the durable copy */
        }
        trackParentRoom(PARENT_ROOM_EVENTS.BOOKING_COMPLETED, {
          value: data.booking.paymentStatus === 'paid' ? data.booking.amount : 0,
          currency: 'INR',
          booking_id: data.booking.bookingId
        });
      } catch (error) {
        setNotice(
          `We could not confirm the booking. If you have been charged, contact the school quoting ${hold.bookingId}.`
        );
      } finally {
        setBusy(false);
      }
    },
    [hold, releaseAndReturnToCalendar]
  );

  const pay = async () => {
    if (!hold) return;
    setBusy(true);
    setNotice('');
    try {
      const res = await fetch('/api/parent-room/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: hold.bookingId,
          reservationToken: hold.reservationToken
        })
      });
      const { data: order, raw, isJson } = await readBody(res);

      if (!res.ok) {
        if (order.code === 'hold_expired') {
          releaseAndReturnToCalendar('Your hold on that time has expired. Please pick a time again.');
        } else {
          // A response without JSON never came from the route itself, so there
          // is no friendly message to show — say what actually happened rather
          // than "please try again" over and over.
          setNotice(
            (isJson && order.message) || httpFailureMessage(res, raw)
          );
          // eslint-disable-next-line no-console
          console.error('Parent Room order failed', res.status, raw.slice(0, 500));
        }
        return;
      }

      if (!order.orderId || !order.keyId) {
        setNotice('The payment could not be started. Please contact the school.');
        // eslint-disable-next-line no-console
        console.error('Parent Room order response incomplete', order);
        return;
      }

      const Checkout = await loadCheckout();
      const checkout = new Checkout({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'The Parent Room',
        description: 'Private parent guidance session',
        prefill: {
          name: draft.parentName,
          email: draft.email,
          contact: draft.mobile
        },
        notes: { bookingId: hold.bookingId },
        theme: { color: '#A51C30' },
        handler: (response) =>
          finish({
            orderId: order.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature
          }),
        modal: {
          ondismiss: () => {
            setBusy(false);
            setNotice('Payment was not completed. Your time is still held — you can try again.');
          }
        }
      });

      checkout.on?.('payment.failed', (response) => {
        setBusy(false);
        setNotice(
          response?.error?.description || 'That payment did not go through. Please try again.'
        );
      });

      checkout.open();
    } catch (error) {
      setNotice('We could not open the payment window. Please try again.');
    } finally {
      // The gateway takes over from here; `finish` and `ondismiss` release the
      // button. Leaving it disabled while the modal is open is intentional.
      if (typeof window !== 'undefined' && !window.Razorpay) setBusy(false);
    }
  };

  // ------------------------------------------------------------------ render

  const slotSummary = useMemo(
    () => (slot ? `${formatDateKey(slot.dateKey)} · ${slot.label}` : ''),
    [slot]
  );

  const fee = settings?.participationFee ?? 149;

  const stepBody = () => {
    switch (step) {
      // ---------------------------------------------------------- 1. parent
      case 0:
        return (
          <div className="space-y-6">
            <TextField
              label="Parent / guardian full name"
              required
              value={draft.parentName}
              onChange={set('parentName')}
              error={errors.parentName}
              autoComplete="name"
              maxLength={LIMITS.parentName}
              placeholder="Your full name"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Mobile number"
                required
                value={draft.mobile}
                onChange={set('mobile')}
                error={errors.mobile}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile"
              />
              <TextField
                label="WhatsApp number"
                value={draft.whatsapp}
                onChange={set('whatsapp')}
                error={errors.whatsapp}
                type="tel"
                inputMode="numeric"
                placeholder="Only if different"
                hint="Leave blank if it is the same."
              />
            </div>
            <TextField
              label="Email address"
              required
              value={draft.email}
              onChange={set('email')}
              error={errors.email}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              hint="Your confirmation and joining details go here."
            />
            <ChoiceGrid
              label="How should we reach you?"
              name="preferredCommunication"
              options={communicationOptions}
              value={draft.preferredCommunication}
              onChange={set('preferredCommunication')}
              error={errors.preferredCommunication}
              columns="grid-cols-1 sm:grid-cols-3"
            />
          </div>
        );

      // ----------------------------------------------------- 2. child+concern
      case 1:
        return (
          <div className="space-y-7">
            <div className="grid gap-6 sm:grid-cols-3">
              <TextField
                label="Child's first name"
                required
                value={draft.childFirstName}
                onChange={set('childFirstName')}
                error={errors.childFirstName}
                maxLength={LIMITS.childFirstName}
                className="sm:col-span-1"
              />
              <TextField
                label="Age"
                required
                value={draft.childAge}
                onChange={set('childAge')}
                error={errors.childAge}
                type="number"
                inputMode="numeric"
                min={2}
                max={22}
              />
              <TextField
                label="Current class"
                required
                value={draft.currentClass}
                onChange={set('currentClass')}
                error={errors.currentClass}
                maxLength={LIMITS.currentClass}
                placeholder="e.g. Class 7"
              />
            </div>
            <TextField
              label="Current school"
              value={draft.currentSchool}
              onChange={set('currentSchool')}
              error={errors.currentSchool}
              maxLength={LIMITS.currentSchool}
              hint="Optional."
            />

            <div className="border-t border-hairline pt-7">
              <ChoiceGrid
                label="What would you primarily like to discuss?"
                name="primaryConcern"
                options={concernOptions}
                value={draft.primaryConcern}
                onChange={chooseConcern}
                error={errors.primaryConcern}
                required
              />
            </div>

            <TextAreaField
              label="Tell us a little more about what has been concerning you"
              value={draft.concernDetails}
              onChange={set('concernDetails')}
              error={errors.concernDetails}
              maxLength={LIMITS.concernDetails}
              hint="You do not need to share anything you are uncomfortable sharing."
            />

            <ChoiceGrid
              label="Are you currently considering changing your child's school?"
              name="schoolChangeIntent"
              options={schoolChangeOptions}
              value={draft.schoolChangeIntent}
              onChange={set('schoolChangeIntent')}
              error={errors.schoolChangeIntent}
              required
              columns="grid-cols-1 sm:grid-cols-2"
            />

            <TextAreaField
              label="What would make this session useful for you?"
              value={draft.sessionExpectation}
              onChange={set('sessionExpectation')}
              error={errors.sessionExpectation}
              maxLength={LIMITS.sessionExpectation}
              rows={3}
              hint="Optional."
            />

            <ChoiceGrid
              label="Preferred language"
              name="preferredLanguage"
              options={languageOptions}
              value={draft.preferredLanguage}
              onChange={set('preferredLanguage')}
              error={errors.preferredLanguage}
              columns="grid-cols-1 sm:grid-cols-3"
            />
          </div>
        );

      // ------------------------------------------------------- 3. date/time
      case 2:
        return (
          <Calendar
            days={availability.days}
            months={availability.months}
            value={slot?.slotId}
            onSelect={chooseSlot}
            loading={availability.loading}
          />
        );

      // ----------------------------------------------------------- 4. review
      case 3:
        return (
          <div className="space-y-8">
            <dl className="border-t border-hairline">
              <SummaryRow label="Session">
                {slotSummary}
                <span className="block text-ink-muted">
                  {settings?.sessionDuration || 30} minutes · Online · with {sessionFacts.conductedBy}
                </span>
              </SummaryRow>
              <SummaryRow label="Parent">
                {draft.parentName}
                <span className="block text-ink-muted">
                  {draft.mobile} · {draft.email}
                </span>
              </SummaryRow>
              <SummaryRow label="Child">
                {draft.childFirstName}, {draft.childAge} · {draft.currentClass}
                {draft.currentSchool ? ` · ${draft.currentSchool}` : ''}
              </SummaryRow>
              <SummaryRow label="To discuss">{concernLabel(draft.primaryConcern)}</SummaryRow>
              <SummaryRow label="School change">
                {schoolChangeLabel(draft.schoolChangeIntent)}
              </SummaryRow>
              <SummaryRow label="Language">
                {languageOptions.find((o) => o.value === draft.preferredLanguage)?.label}
              </SummaryRow>
              <SummaryRow label="Fee">₹{fee}</SummaryRow>
            </dl>

            <div className="space-y-3">
              <ConsentCheckbox
                required
                checked={draft.guidanceConsent}
                onChange={set('guidanceConsent')}
                error={errors.guidanceConsent}
              >
                I understand that The Parent Room provides educational and parental guidance and is
                not a substitute for professional medical, psychiatric or clinical psychological
                care.
              </ConsentCheckbox>
              <ConsentCheckbox
                required
                checked={draft.dataConsent}
                onChange={set('dataConsent')}
                error={errors.dataConsent}
              >
                I consent to the information submitted here being used for scheduling and conducting
                this Parent Room session.
              </ConsentCheckbox>
              <ConsentCheckbox checked={draft.marketingConsent} onChange={set('marketingConsent')}>
                I would like to receive future parenting resources and educational updates from The
                Elden Heights School.
              </ConsentCheckbox>
            </div>

            <p className="text-[0.8rem] leading-relaxed text-ink-muted">
              {privacyLine}{' '}
              <Link href="/privacy-policy" className="hv-link">
                Read the privacy policy
              </Link>
              .
            </p>
          </div>
        );

      // ------------------------------------------------ 5. payment/confirmed
      case 4:
      default:
        if (confirmation) {
          return <Confirmation booking={confirmation} />;
        }
        if (!hold) {
          return <Notice tone="info">Your booking session has ended. Please choose a time again.</Notice>;
        }
        return (
          <div className="space-y-7">
            <div className="border border-hairline bg-white p-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                Your session
              </p>
              <p className="mt-3 font-display text-[1.5rem] leading-snug text-ink">{slotSummary}</p>
              <p className="mt-2 text-[0.9rem] text-ink-soft">
                {settings?.sessionDuration || 30} minutes · Online · with {sessionFacts.conductedBy}
              </p>
              <div className="mt-5 flex items-baseline justify-between border-t border-hairline pt-4">
                <span className="text-[0.9rem] font-bold text-ink">Participation fee</span>
                <span className="font-display text-[1.75rem] text-ink">₹{hold.amount}</span>
              </div>
              <div className="mt-4">
                <HoldCountdown
                  expiresAt={hold.expiresAt}
                  onExpire={() =>
                    releaseAndReturnToCalendar(
                      'Your hold on that time has expired. Please pick a time again.'
                    )
                  }
                />
              </div>
            </div>

            {hold.payment.mode === 'razorpay' && (
              <button type="button" onClick={pay} disabled={busy} className="btn-primary w-full">
                {busy ? 'Opening payment…' : `Pay ₹${hold.amount} and confirm`}
              </button>
            )}

            {hold.payment.mode === 'offline' && (
              <div className="space-y-4">
                <Notice tone="info">
                  Online payment is not available at the moment. Confirm your session now and the
                  school will contact you about the ₹{hold.amount} participation fee before it.
                </Notice>
                <button
                  type="button"
                  onClick={() => finish()}
                  disabled={busy}
                  className="btn-primary w-full"
                >
                  {busy ? 'Confirming…' : 'Confirm my session'}
                </button>
              </div>
            )}

            {hold.payment.mode === 'waived' && (
              <button
                type="button"
                onClick={() => finish()}
                disabled={busy}
                className="btn-primary w-full"
              >
                {busy ? 'Confirming…' : 'Confirm my session'}
              </button>
            )}

            <p className="text-center text-[0.78rem] text-ink-muted">
              Booking reference {hold.bookingId}
            </p>
          </div>
        );
    }
  };

  const showNav = step < 3;
  const onConfirmation = step === 4 && Boolean(confirmation);

  return (
    <div ref={panelRef} className="grid gap-0 lg:grid-cols-[20rem_1fr]">
      {/* ------------------------------------------------------- left rail */}
      <aside className="border border-hairline bg-ivory p-6 sm:p-8 lg:border-r-0">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-crimson">
          Private parent guidance session
        </p>
        <h3 className="mt-4 font-display text-[1.75rem] font-medium leading-tight text-ink">
          30 minutes, one to one
        </h3>

        <dl className="mt-7 space-y-3.5 border-t border-hairline pt-6 text-[0.9rem]">
          {[
            ['Duration', `${settings?.sessionDuration || 30} minutes`],
            ['Mode', sessionFacts.mode],
            ['Fee', `₹${fee}`],
            ['Language', 'English, Hindi or Hinglish']
          ].map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4">
              <dt className="text-ink-muted">{label}</dt>
              <dd className="text-right font-bold text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 border-t border-hairline pt-6">
          <CounsellorPortrait
            name={settings?.counsellorName || sessionFacts.conductedBy}
            className="w-full"
            sizes="(max-width: 1024px) 100vw, 20rem"
          />
          <div className="mt-4">
            <CounsellorIdentity
              name={settings?.counsellorName || sessionFacts.conductedBy}
              title={settings?.counsellorTitle || ''}
              compact
            />
          </div>
        </div>

        <p className="mt-7 border-t border-hairline pt-6 text-[0.82rem] leading-relaxed text-ink-muted">
          No admission discussion unless you ask for it.
        </p>
      </aside>

      {/* ----------------------------------------------------------- wizard */}
      <div className="border border-hairline bg-white p-6 sm:p-8 lg:p-10">
        {!onConfirmation && (
          <>
            <Progress step={step} />
            <h3 className="mt-8 font-display text-[clamp(1.5rem,3vw,2rem)] font-medium leading-tight text-ink">
              {stepTitles[step]}
            </h3>
          </>
        )}

        <div className={onConfirmation ? '' : 'mt-7'}>
          {notice && (
            <div className="mb-6">
              <Notice>{notice}</Notice>
            </div>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={reduce ? {} : { opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {stepBody()}
            </motion.div>
          </AnimatePresence>
        </div>

        {showNav && (
          <div className="mt-9 flex flex-col-reverse gap-3 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="btn-ghost w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>
            <button type="button" onClick={next} className="btn-primary w-full sm:w-auto">
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="mt-9 flex flex-col-reverse gap-3 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={back} className="btn-ghost w-full sm:w-auto">
              Back
            </button>
            <button
              type="button"
              onClick={startBooking}
              disabled={busy}
              className="btn-primary w-full sm:w-auto"
            >
              {busy ? 'Holding your time…' : `Confirm and pay ₹${fee}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
