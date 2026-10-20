/**
 * Edenwoods Merit Scholarship — registration and payment.
 *
 * Two short steps and a review, rather than one long page: a parent filling
 * this in on a phone from an Instagram ad should never be looking at twenty
 * fields at once.
 *
 * Nothing in this file decides whether a payment succeeded. The gateway's
 * response is forwarded to the server, which recomputes the signature; the
 * confirmation screen renders only what the server sends back.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import {
  LIMITS,
  classLabel,
  classOptions,
  genderOptions,
  hasErrors,
  hearAboutOptions,
  localityOptions,
  relationshipOptions,
  requiresCurrentSchool,
  scholarship,
  validateChildStep,
  validateConsent,
  validateParentStep
} from '@/lib/scholarship';
import { feeDisclosure } from '@/lib/scholarshipCopy';
import {
  ChoiceGrid,
  ConsentCheckbox,
  SelectField,
  SummaryRow,
  TextField
} from '@/components/scholarship/fields';

const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';
const RESUME_KEY = 'edenwoods:scholarship:2027';

const STEPS = ['Child', 'Parent', 'Review & pay'];

const emptyDraft = {
  childName: '',
  dob: '',
  gender: '',
  classApplying: '',
  currentSchool: '',

  parentName: '',
  relationship: '',
  whatsapp: '',
  altPhone: '',
  email: '',
  locality: '',
  localityOther: '',
  hearAbout: '',

  termsAccepted: false
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

/**
 * Read a response without ever throwing on its body. Our routes answer with
 * JSON, but a failure above the route — a crashed or timed-out function —
 * answers with an HTML error page, and `res.json()` throws on that, hiding the
 * one piece of information worth having.
 */
const readBody = async (res) => {
  const raw = await res.text().catch(() => '');
  try {
    return { data: raw ? JSON.parse(raw) : {}, raw, isJson: true };
  } catch (error) {
    return { data: {}, raw, isJson: false };
  }
};

const httpFailure = (res, raw) => {
  const detail = String(raw || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140);
  return `Something went wrong (error ${res.status}${detail ? `: ${detail}` : ''}). Please try again, or message us on WhatsApp.`;
};

function Progress({ step }) {
  return (
    <ol className="flex items-stretch gap-1.5" aria-label="Registration progress">
      {STEPS.map((title, index) => {
        const state = index < step ? 'done' : index === step ? 'current' : 'todo';
        return (
          <li key={title} className="flex-1">
            <span
              className={`block h-[3px] transition-colors duration-500 ${
                state === 'todo' ? 'bg-hairline' : 'bg-eden-600'
              }`}
            />
            <span
              className={`mt-2 block text-[0.65rem] font-bold uppercase tracking-[0.1em] ${
                state === 'current' ? 'text-eden-700' : 'text-ink-muted'
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
    info: 'border-eden-200 bg-eden-50 text-eden-700'
  };
  return (
    <p role="alert" className={`border px-4 py-3 text-[0.9rem] font-semibold ${tones[tone]}`}>
      {children}
    </p>
  );
}

export default function RegistrationForm({ campaign, onComplete }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(emptyDraft);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [done, setDone] = useState(null);
  const panelRef = useRef(null);

  const set = (field) => (value) => {
    setDraft((cur) => ({ ...cur, [field]: value }));
    setErrors((cur) => (cur[field] ? { ...cur, [field]: undefined } : cur));
  };

  // A confirmed registration survives a refresh, so a parent who reloads after
  // paying sees their number rather than an empty form.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let stored;
    try {
      stored = JSON.parse(window.sessionStorage.getItem(RESUME_KEY) || 'null');
    } catch (error) {
      stored = null;
    }
    if (!stored?.registrationNumber || !stored?.token) return;

    fetch(
      `/api/scholarship/registration/${encodeURIComponent(
        stored.registrationNumber
      )}?token=${encodeURIComponent(stored.token)}`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.registration?.paymentStatus === 'paid') {
          setDone({ ...data.registration, token: stored.token });
          onComplete?.(data.registration);
        }
      })
      .catch(() => {});
  }, [onComplete]);

  const scrollToPanel = useCallback(() => {
    if (typeof window === 'undefined' || !panelRef.current) return;
    const top = panelRef.current.getBoundingClientRect().top + window.scrollY - 20;
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

  const next = () => {
    if (step === 0) {
      const found = validateChildStep(draft);
      setErrors(found);
      if (hasErrors(found)) return;
      goTo(1);
      return;
    }
    if (step === 1) {
      const found = validateParentStep(draft);
      setErrors(found);
      if (hasErrors(found)) return;
      goTo(2);
    }
  };

  const back = () => goTo(Math.max(0, step - 1));

  // ------------------------------------------------------------- confirming

  const finish = useCallback(
    async (held, paymentPayload) => {
      setBusy(true);
      try {
        const res = await fetch('/api/scholarship/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            registrationNumber: held.registrationNumber,
            token: held.token,
            ...paymentPayload
          })
        });
        const { data, raw, isJson } = await readBody(res);

        if (!res.ok) {
          setNotice(
            (isJson && data.message) ||
              `We could not confirm the registration (error ${res.status}). If you have been charged, message us on WhatsApp with ${held.registrationNumber} — your payment is safe.`
          );
          // eslint-disable-next-line no-console
          console.error('Scholarship confirm failed', res.status, raw.slice(0, 400));
          return;
        }

        try {
          window.sessionStorage.setItem(
            RESUME_KEY,
            JSON.stringify({
              registrationNumber: held.registrationNumber,
              token: held.token
            })
          );
        } catch (error) {
          /* private browsing — the email and WhatsApp are the durable copies */
        }
        setDone({ ...data.registration, token: held.token, receiptEmailed: data.receiptEmailed });
        onComplete?.(data.registration);
      } catch (error) {
        setNotice(
          `We could not confirm the registration. If you have been charged, message us on WhatsApp with ${held.registrationNumber}.`
        );
      } finally {
        setBusy(false);
      }
    },
    [onComplete]
  );

  // ------------------------------------------------------------ register+pay

  const registerAndPay = async () => {
    const found = {
      ...validateChildStep(draft),
      ...validateParentStep(draft),
      ...validateConsent(draft)
    };
    setErrors(found);
    if (hasErrors(found)) {
      setNotice('Some details still need attention.');
      return;
    }

    setBusy(true);
    setNotice('');

    let held = registration;
    try {
      // Only open a registration once; a retried payment reuses the same
      // number rather than tripping the one-per-child rule against itself.
      if (!held) {
        const res = await fetch('/api/scholarship/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...draft,
            campaign,
            landingPath:
              typeof window !== 'undefined'
                ? window.location.pathname + window.location.search
                : ''
          })
        });
        const { data, raw, isJson } = await readBody(res);

        if (!res.ok) {
          if (data.errors) setErrors(data.errors);
          setNotice((isJson && data.message) || httpFailure(res, raw));
          // eslint-disable-next-line no-console
          console.error('Scholarship register failed', res.status, raw.slice(0, 400));
          setBusy(false);
          return;
        }
        held = { registrationNumber: data.registrationNumber, token: data.token };
        setRegistration(held);
      }

      const orderRes = await fetch('/api/scholarship/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationNumber: held.registrationNumber,
          token: held.token
        })
      });
      const { data: order, raw: orderRaw, isJson: orderIsJson } = await readBody(orderRes);

      if (!orderRes.ok) {
        setNotice((orderIsJson && order.message) || httpFailure(orderRes, orderRaw));
        // eslint-disable-next-line no-console
        console.error('Scholarship order failed', orderRes.status, orderRaw.slice(0, 400));
        setBusy(false);
        return;
      }
      if (!order.orderId || !order.keyId) {
        setNotice('The payment could not be started. Please message us on WhatsApp.');
        setBusy(false);
        return;
      }

      const Checkout = await loadCheckout();
      const checkout = new Checkout({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'Edenwoods Merit Scholarship 2027',
        description: `Registration · ${draft.childName}`,
        prefill: {
          name: draft.parentName,
          email: draft.email || undefined,
          contact: draft.whatsapp
        },
        notes: { registrationNumber: held.registrationNumber },
        theme: { color: '#0C5A54' },
        handler: (response) =>
          finish(held, {
            orderId: order.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature
          }),
        modal: {
          ondismiss: () => {
            setBusy(false);
            setNotice(
              'Payment was not completed. Your details are saved — press the button again to pay.'
            );
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
      setBusy(false);
    }
  };

  const localityLabel = useMemo(
    () => (draft.locality === 'Other' ? draft.localityOther || 'Other' : draft.locality),
    [draft.locality, draft.localityOther]
  );

  // ------------------------------------------------------------- confirmed

  if (done) {
    const admitHref = `/admission/scholarships/edenwoods-merit-2027/admit-card?r=${encodeURIComponent(
      done.registrationNumber
    )}&t=${encodeURIComponent(done.token || '')}`;

    return (
      <div ref={panelRef} className="border border-hairline bg-white p-6 sm:p-9">
        <span className="rule-heavy" />
        <p className="mt-8 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-eden-600">
          Registered
        </p>
        <h3 className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-[1.1] text-ink">
          {done.childName} is registered for the test.
        </h3>

        <div className="mt-8 border-[3px] border-eden-700 p-6">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-muted">
            Registration number
          </p>
          <p className="mt-1.5 font-mono text-[clamp(1.6rem,5vw,2.25rem)] font-bold tracking-[0.06em] text-eden-700">
            {done.registrationNumber}
          </p>
          <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-soft">
            Keep this number. You will need it to check your result.
          </p>
        </div>

        <dl className="mt-8 border-t border-hairline">
          <SummaryRow label="Child">{done.childName}</SummaryRow>
          <SummaryRow label="Class 2027–28">{classLabel(done.classApplying)}</SummaryRow>
          <SummaryRow label="Parent">{done.parentName}</SummaryRow>
          <SummaryRow label="Paid">₹{done.amount} · registration fee</SummaryRow>
          <SummaryRow label="Test">Thursday, 5 November 2026 · TEHS Campus, Silwar</SummaryRow>
        </dl>

        <p className="mt-7 text-[0.95rem] leading-relaxed text-ink-soft">
          {done.receiptEmailed === false || !done.email ? (
            <>
              You did not give an email address, so your receipt and admit card will come on
              WhatsApp. Save your admit card now — you will need it on test day.
            </>
          ) : (
            <>
              We have emailed your receipt and admit card to{' '}
              <span className="font-bold text-ink">{done.email}</span>. Your admit card also comes
              on WhatsApp on 3 November.
            </>
          )}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-hairline pt-7 sm:flex-row">
          <Link href={admitHref} className="btn-primary w-full text-center sm:w-auto">
            Open my admit card
          </Link>
          <Link href="/admission" className="btn-ghost w-full text-center sm:w-auto">
            About the school
          </Link>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------- form

  const body = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <TextField
              label="Child’s full name, as on the birth certificate"
              required
              value={draft.childName}
              onChange={set('childName')}
              error={errors.childName}
              maxLength={LIMITS.childName}
              autoComplete="off"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Date of birth"
                required
                type="date"
                value={draft.dob}
                onChange={set('dob')}
                error={errors.dob}
              />
              <SelectField
                label="Class applying for in 2027–28"
                required
                value={draft.classApplying}
                onChange={set('classApplying')}
                error={errors.classApplying}
                placeholder="Choose a class"
                options={classOptions}
                hint="Class X is not included."
              />
            </div>
            <ChoiceGrid
              label="Gender"
              name="gender"
              required
              options={genderOptions}
              value={draft.gender}
              onChange={set('gender')}
              error={errors.gender}
              columns="grid-cols-1 sm:grid-cols-3"
            />
            <TextField
              label="Current school"
              required={requiresCurrentSchool(draft.classApplying)}
              value={draft.currentSchool}
              onChange={set('currentSchool')}
              error={errors.currentSchool}
              maxLength={LIMITS.currentSchool}
              hint={
                requiresCurrentSchool(draft.classApplying)
                  ? 'The school your child attends now.'
                  : 'Optional — leave blank if your child has not started school yet.'
              }
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <TextField
              label="Parent or guardian name"
              required
              value={draft.parentName}
              onChange={set('parentName')}
              error={errors.parentName}
              maxLength={LIMITS.parentName}
              autoComplete="name"
            />
            <ChoiceGrid
              label="Relationship to the child"
              name="relationship"
              required
              options={relationshipOptions}
              value={draft.relationship}
              onChange={set('relationship')}
              error={errors.relationship}
              columns="grid-cols-1 sm:grid-cols-3"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="WhatsApp number"
                required
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={draft.whatsapp}
                onChange={set('whatsapp')}
                error={errors.whatsapp}
                placeholder="10-digit number"
                hint="Your admit card and result come here."
              />
              <TextField
                label="Alternate phone"
                type="tel"
                inputMode="numeric"
                value={draft.altPhone}
                onChange={set('altPhone')}
                error={errors.altPhone}
                hint="Optional."
              />
            </div>
            <TextField
              label="Email address"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={draft.email}
              onChange={set('email')}
              error={errors.email}
              hint="Optional — but your receipt and admit card are emailed instantly if you give one."
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField
                label="Your area in Hazaribagh"
                required
                value={draft.locality}
                onChange={set('locality')}
                error={errors.locality}
                placeholder="Choose your area"
                options={localityOptions.map((l) => ({ value: l, label: l }))}
              />
              {draft.locality === 'Other' && (
                <TextField
                  label="Which area?"
                  required
                  value={draft.localityOther}
                  onChange={set('localityOther')}
                  error={errors.localityOther}
                  maxLength={LIMITS.localityOther}
                />
              )}
            </div>
            <SelectField
              label="How did you hear about us?"
              required
              value={draft.hearAbout}
              onChange={set('hearAbout')}
              error={errors.hearAbout}
              placeholder="Choose one"
              options={hearAboutOptions}
            />
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <dl className="border-t border-hairline">
              <SummaryRow label="Child">
                {draft.childName}
                <span className="block text-ink-muted">
                  {classLabel(draft.classApplying)} in 2027–28
                  {draft.currentSchool ? ` · now at ${draft.currentSchool}` : ''}
                </span>
              </SummaryRow>
              <SummaryRow label="Date of birth">{draft.dob}</SummaryRow>
              <SummaryRow label="Parent">
                {draft.parentName}
                <span className="block text-ink-muted">
                  {relationshipOptions.find((r) => r.value === draft.relationship)?.label}
                </span>
              </SummaryRow>
              <SummaryRow label="WhatsApp">{draft.whatsapp}</SummaryRow>
              <SummaryRow label="Email">{draft.email || '—'}</SummaryRow>
              <SummaryRow label="Area">{localityLabel}</SummaryRow>
            </dl>

            {/* Both fees, the same size. A parent should learn about the ₹500
                here, not after their child has won. */}
            <div className="border-[3px] border-eden-700 bg-eden-50 p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <span className="text-[0.95rem] font-bold text-ink">Registration fee, now</span>
                <span className="font-display text-[1.9rem] leading-none text-eden-700">
                  ₹{scholarship.registrationFee}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-eden-200 pt-4">
                <span className="text-[0.95rem] font-bold text-ink">
                  TEHS admission form, only if your child wins
                </span>
                <span className="font-display text-[1.9rem] leading-none text-eden-700">
                  ₹{scholarship.admissionFormFee}
                </span>
              </div>
              <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-soft">{feeDisclosure}</p>
            </div>

            <ConsentCheckbox
              required
              checked={draft.termsAccepted}
              onChange={set('termsAccepted')}
              error={errors.termsAccepted}
            >
              Yes, I have read and accept the{' '}
              <Link
                href="/admission/scholarships/edenwoods-merit-2027/terms"
                target="_blank"
                className="font-bold text-eden-700 underline underline-offset-2"
              >
                Terms and Conditions
              </Link>
              , and I understand the ₹{scholarship.registrationFee} registration fee is
              non-refundable.
            </ConsentCheckbox>
          </div>
        );
    }
  };

  return (
    <div ref={panelRef} className="border border-hairline bg-white p-6 sm:p-9">
      <Progress step={step} />

      <h3 className="mt-8 font-display text-[clamp(1.4rem,2.8vw,1.9rem)] font-medium leading-tight text-ink">
        {step === 0
          ? 'About your child'
          : step === 1
            ? 'About you'
            : 'Check and pay'}
      </h3>

      <div className="mt-7">
        {notice && (
          <div className="mb-6">
            <Notice>{notice}</Notice>
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {body()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-9 flex flex-col-reverse gap-3 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="btn-ghost w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>

        {step < 2 ? (
          <button type="button" onClick={next} className="btn-primary w-full sm:w-auto">
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={registerAndPay}
            disabled={busy}
            className="btn-primary w-full sm:w-auto"
          >
            {busy ? 'Opening payment…' : `Pay ₹${scholarship.registrationFee} and register`}
          </button>
        )}
      </div>
    </div>
  );
}
