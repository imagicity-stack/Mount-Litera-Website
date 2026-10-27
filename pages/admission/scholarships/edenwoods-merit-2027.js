/**
 * /admission/scholarships/edenwoods-merit-2027
 *
 * The campaign landing page for the Edenwoods Merit Scholarship 2027. One
 * page, top to bottom: what it is, who can apply, how it works, what a child
 * can win, the test, what is and is not covered, the form, the questions
 * parents ask, and who is behind it.
 *
 * It wears the Foundation's teal rather than the school's crimson — the
 * scholarship is the Foundation's — but the same typography, flat bands and
 * heavy rules as the rest of the site.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';

import Seo from '@/components/Seo';
import SiteImage from '@/components/media/SiteImage';
import Reveal from '@/components/motion/Reveal';
import PhotoStrip from '@/components/sections/PhotoStrip';
import RegistrationForm from '@/components/scholarship/RegistrationForm';
import {
  ScholarshipFooter,
  ScholarshipHeader,
  SectionHead
} from '@/components/scholarship/Chrome';
import {
  SCHOLARSHIP_EVENTS,
  trackScholarship,
  trackScholarshipCompleted
} from '@/lib/scholarshipAnalytics';
import {
  CAMPAIGN_KEYS,
  classXNote,
  contact,
  daysUntilClose,
  foundation,
  fullScholarshipRule,
  keyDates,
  registrationIsOpen,
  sanitizeCampaign,
  scholarship,
  testFormats,
  tiers,
  venue,
  whatToBring
} from '@/lib/scholarship';
import {
  aboutSchool,
  covered,
  eligibility,
  faqs,
  hero,
  steps,
  timeline
} from '@/lib/scholarshipCopy';

const EASE = [0.22, 1, 0.36, 1];

export default function EdenwoodsMeritScholarship2027() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const registerRef = useRef(null);
  const viewedRef = useRef(false);
  const [campaign, setCampaign] = useState({});
  const [open, setOpen] = useState(true);
  const [daysLeft, setDaysLeft] = useState(null);

  // Resolved on the client: the deadline is a real instant, and a statically
  // rendered "6 days left" would be wrong by the time anyone read it.
  useEffect(() => {
    setOpen(registrationIsOpen());
    setDaysLeft(daysUntilClose());
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const fromUrl = {};
    CAMPAIGN_KEYS.forEach((key) => {
      const v = router.query[key];
      if (typeof v === 'string' && v) fromUrl[key] = v;
    });
    setCampaign(sanitizeCampaign(fromUrl));

    if (viewedRef.current) return;
    viewedRef.current = true;
    trackScholarship(SCHOLARSHIP_EVENTS.VIEW, {
      utm_source: fromUrl.utm_source || '',
      utm_campaign: fromUrl.utm_campaign || ''
    });
  }, [router.isReady, router.query]);

  const scrollToRegister = useCallback(() => {
    trackScholarship(SCHOLARSHIP_EVENTS.REGISTER_CLICKED);
    registerRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [reduce]);

  const onComplete = useCallback((registration) => {
    trackScholarshipCompleted({
      registrationNumber: registration?.registrationNumber || '',
      amount: registration?.amount ?? scholarship.registrationFee,
      classApplying: registration?.classApplying || ''
    });
  }, []);

  const rise = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <>
      <Seo path="/admission/scholarships/edenwoods-merit-2027" />
      <Head>
        <meta name="theme-color" content="#06423C" />
      </Head>

      <div className="eden-theme flex min-h-screen flex-col bg-ivory">
        <ScholarshipHeader />

        <main className="flex-1">
          {/* ------------------------------------------------------ 1. hero */}
          <section className="relative isolate overflow-hidden bg-eden-700 text-white">
            <SiteImage
              slot="scholarship.hero"
              className="absolute inset-0"
              fill
              priority
              sizes="100vw"
              imgClassName="opacity-25"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-eden-800 via-eden-700/92 to-eden-700/70"
              aria-hidden="true"
            />

            <div className="shell relative py-14 md:py-20">
              <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: reduce ? 0 : 0.09 }}
                className="max-w-4xl"
              >
                <motion.div variants={rise} transition={{ duration: 0.7, ease: EASE }}>
                  <img
                    src={foundation.logo}
                    alt={foundation.name}
                    className="h-16 w-auto brightness-0 invert sm:h-20"
                    width="160"
                    height="108"
                  />
                </motion.div>

                <motion.p
                  variants={rise}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mt-7 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/70"
                >
                  {hero.eyebrow}
                </motion.p>

                <motion.h1
                  variants={rise}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mt-4 font-display text-[clamp(1.9rem,4.8vw,3.9rem)] font-medium leading-[1.08] tracking-[-0.015em] text-white"
                >
                  {hero.headline}
                </motion.h1>

                <motion.p
                  variants={rise}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-white/80 md:text-[1.1rem]"
                >
                  {hero.supporting}
                </motion.p>

                <motion.div
                  variants={rise}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
                >
                  <button
                    type="button"
                    onClick={scrollToRegister}
                    className="w-full border-2 border-white bg-white px-8 py-4 text-[0.95rem] font-bold text-eden-700 transition hover:bg-transparent hover:text-white sm:w-auto"
                  >
                    {hero.cta}
                  </button>
                  <p className="text-[1.05rem] font-bold text-white">
                    {hero.feeLine}
                    <span className="ml-2 text-[0.82rem] font-normal text-white/60">
                      non-refundable
                    </span>
                  </p>
                </motion.div>

                {/* The four dates, given hero billing because they are what
                    decides whether a parent acts today or forgets. */}
                <motion.dl
                  variants={rise}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mt-12 grid gap-px border border-white/20 bg-white/20 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {timeline.map((item) => (
                    <div key={item.title} className="bg-eden-700 px-5 py-5">
                      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/55">
                        {item.title}
                      </dt>
                      <dd className="mt-2 font-display text-[1.3rem] leading-tight text-white">
                        {item.short}
                      </dd>
                    </div>
                  ))}
                </motion.dl>

                {open && daysLeft !== null && daysLeft <= 14 && (
                  <motion.p
                    variants={rise}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mt-6 inline-block border-l-[3px] border-white px-4 py-1 text-[0.9rem] font-bold text-white"
                  >
                    {daysLeft === 1 ? 'Last day to register.' : `${daysLeft} days left to register.`}
                  </motion.p>
                )}
                {!open && (
                  <motion.p
                    variants={rise}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mt-6 inline-block border-l-[3px] border-white bg-white/10 px-4 py-2 text-[0.9rem] font-bold text-white"
                  >
                    Registration for 2027 has closed.
                  </motion.p>
                )}
              </motion.div>
            </div>
          </section>

          {/* ------------------------------------------------- 2. who can apply */}
          <section className="band-white">
            <div className="shell py-16 md:py-22">
              <SectionHead
                eyebrow="Who can apply"
                title="Children joining Nursery to Class IX in 2027–28"
                lede={eligibility.lede}
              />
              <ul className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
                {eligibility.points.map((point, index) => (
                  <li key={point} className="bg-white">
                    <Reveal index={index} y={14} duration={0.55} className="h-full px-6 py-7">
                      <span aria-hidden="true" className="block h-1.5 w-8 bg-eden-600" />
                      <p className="mt-4 text-[0.97rem] leading-relaxed text-ink-soft">{point}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-l-[3px] border-eden-600 bg-eden-50 px-6 py-5 text-[0.95rem] leading-relaxed text-ink-soft">
                <span className="font-bold text-ink">Class X is not included.</span>{' '}
                {classXNote.replace('Class X is not included. ', '')}
              </p>
            </div>
          </section>

          {/* --------------------------------------------------- 3. how it works */}
          <section className="band-grey">
            <div className="shell py-16 md:py-22">
              <SectionHead
                eyebrow="How it works"
                title="Four steps, two fees, no small print"
              />
              <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((item, index) => (
                  <Reveal as="li" key={item.step} index={index} y={18} duration={0.6}>
                    <p className="font-display text-[2.6rem] font-normal leading-none tracking-[-0.02em] text-eden-600">
                      {item.step}
                    </p>
                    <span className="mt-5 block h-px w-full bg-hairline" />
                    <h3 className="mt-5 font-display text-[1.2rem] font-medium leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
                  </Reveal>
                ))}
              </ol>

              <div className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
                <div className="bg-white px-7 py-8">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    To sit the test
                  </p>
                  <p className="mt-3 font-display text-[2.75rem] leading-none text-eden-700">
                    ₹{scholarship.registrationFee}
                  </p>
                  <p className="mt-3 text-[0.9rem] text-ink-soft">
                    Paid now. Non-refundable. Every child who takes the test gets a certificate.
                  </p>
                </div>
                <div className="bg-white px-7 py-8">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    To claim a scholarship
                  </p>
                  <p className="mt-3 font-display text-[2.75rem] leading-none text-eden-700">
                    ₹{scholarship.admissionFormFee}
                  </p>
                  <p className="mt-3 text-[0.9rem] text-ink-soft">
                    The TEHS admission form, paid to the school — only if your child wins and you
                    want to take the place.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------ 4. what your child can win */}
          <section className="band-white">
            <div className="shell py-16 md:py-22">
              <SectionHead
                eyebrow="What your child can win"
                title="A tuition waiver for the whole of 2027–28"
                lede={`Eight full scholarships in total, across every class. The rest of the table is open — there is no cap on the 50%, 25% and 10% awards.`}
              />

              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-left">
                  <thead>
                    <tr className="border-y-[3px] border-ink">
                      <th className="py-4 pr-6 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                        Score in the test or activity
                      </th>
                      <th className="py-4 text-right text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                        Tuition fee waived for 2027–28
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiers.map((tier) => (
                      <tr
                        key={tier.score}
                        className={`border-b border-hairline ${tier.headline ? 'bg-eden-50' : ''}`}
                      >
                        <td className="py-5 pr-6 align-top">
                          <span
                            className={`text-[1rem] ${
                              tier.headline ? 'font-bold text-ink' : 'text-ink-soft'
                            }`}
                          >
                            {tier.score}
                          </span>
                          {tier.qualifier && (
                            <span className="mt-1 block text-[0.85rem] text-ink-muted">
                              {tier.qualifier}
                            </span>
                          )}
                        </td>
                        <td className="py-5 text-right align-top">
                          <span
                            className={`font-display leading-none ${
                              tier.headline
                                ? 'text-[2.1rem] text-eden-700'
                                : 'text-[1.5rem] text-ink'
                            }`}
                          >
                            {tier.award}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-8 border-l-[3px] border-eden-600 bg-eden-50 px-6 py-5 text-[0.95rem] leading-relaxed text-ink-soft">
                <span className="font-bold text-ink">
                  Only {scholarship.fullScholarships} full scholarships.
                </span>{' '}
                {fullScholarshipRule.replace(
                  `There are ${scholarship.fullScholarships} full (100%) scholarships in total across all classes. `,
                  ''
                )}
              </p>
            </div>
          </section>

          {/* ---------------------------------------------------- 5. the test */}
          <section className="band-grey">
            <div className="shell py-16 md:py-22">
              <SectionHead
                eyebrow="The test"
                title={`One day: ${keyDates.test.label}`}
                lede="Two formats, by age. Nothing to buy, nothing to coach for."
              />

              <div className="mt-10 grid gap-px border border-hairline bg-hairline lg:grid-cols-2">
                {testFormats.map((format, index) => (
                  <div key={format.band} className="bg-white">
                    <Reveal index={index} y={16} duration={0.6} className="h-full px-7 py-8">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-eden-600">
                        {format.classes}
                      </p>
                      <h3 className="mt-3 font-display text-[1.45rem] font-medium leading-snug text-ink">
                        {format.title}
                      </h3>
                      <p className="mt-2 text-[0.88rem] font-bold text-ink-muted">
                        {format.duration}
                      </p>
                      <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                        {format.detail}
                      </p>
                      {format.subjects.length > 0 && (
                        <div className="mt-6 border-t border-hairline pt-5">
                          <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                            Subjects
                          </p>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {format.subjects.map((subject) => (
                              <li
                                key={subject}
                                className="border border-eden-200 bg-eden-50 px-3 py-1.5 text-[0.85rem] font-bold text-eden-700"
                              >
                                {subject}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {format.withParent && (
                        <p className="mt-6 border-t border-hairline pt-5 text-[0.9rem] font-bold text-eden-700">
                          A parent stays in the room throughout.
                        </p>
                      )}
                    </Reveal>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-[1.25rem] font-medium text-ink">
                    What to bring
                  </h3>
                  <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                    {whatToBring.map((item) => (
                      <li key={item} className="py-3.5 text-[0.95rem] text-ink-soft">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-[1.25rem] font-medium text-ink">Where</h3>
                  <p className="mt-4 text-[1rem] font-bold text-ink">{venue.name}</p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
                    {venue.address}
                  </p>
                  <a
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 border-2 border-eden-700 px-5 py-3 text-[0.85rem] font-bold text-eden-700 transition hover:bg-eden-700 hover:text-white"
                  >
                    Open in Google Maps
                    <span aria-hidden="true">↗</span>
                  </a>
                  <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-muted">
                    Your admit card carries the reporting time, and for Class III to IX the
                    subjects. It reaches you on WhatsApp on {keyDates.admitCard.short} — and by
                    email the moment you register.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------- 6. covered / not covered */}
          <section className="band-white">
            <div className="shell py-16 md:py-22">
              <SectionHead
                eyebrow="What it covers"
                title="Tuition fee only — and we would rather say so now"
              />

              <div className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
                <div className="bg-white px-7 py-8">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-eden-600">
                    Covered
                  </p>
                  <ul className="mt-5 space-y-3">
                    {covered.yes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.97rem] text-ink">
                        <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 bg-eden-600" />
                        <span className="font-bold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white px-7 py-8">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    Not covered
                  </p>
                  <ul className="mt-5 space-y-3">
                    {covered.no.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.97rem] text-ink-soft">
                        <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 bg-hairline" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {covered.notes.map((note) => (
                  <li key={note} className="text-[0.9rem] leading-relaxed text-ink-muted">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ------------------------------------------------------ 7. register */}
          <section id="register" ref={registerRef} className="band-grey scroll-mt-4">
            <div className="shell py-16 md:py-22">
              <div className="max-w-3xl">
                <SectionHead
                  eyebrow="Register"
                  title="Register your child"
                  lede={`It takes about two minutes. Registration closes on ${keyDates.registrationCloses.label}.`}
                />
              </div>

              <div className="mt-12 lg:grid lg:grid-cols-[1fr_20rem] lg:gap-0">
                <div className="order-1">
                  {open ? (
                    <RegistrationForm campaign={campaign} onComplete={onComplete} />
                  ) : (
                    <div className="border border-hairline bg-white p-8 text-center">
                      <p className="font-display text-[1.5rem] text-ink">
                        Registration has closed.
                      </p>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                        Registration for the {scholarship.name} closed on{' '}
                        {keyDates.registrationCloses.label}. For admission to {scholarship.school}{' '}
                        through the normal process, the admissions office can help.
                      </p>
                      <Link href="/admission" className="btn-primary mt-7 inline-block">
                        TEHS admissions
                      </Link>
                    </div>
                  )}
                </div>

                <aside className="order-2 mt-6 border border-hairline bg-white p-6 lg:mt-0 lg:border-l-0">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-eden-600">
                    At a glance
                  </p>
                  <dl className="mt-5 space-y-3.5 border-t border-hairline pt-5 text-[0.9rem]">
                    {[
                      ['Test fee', `₹${scholarship.registrationFee}`],
                      ['Claim fee', `₹${scholarship.admissionFormFee}`],
                      ['Classes', 'Nursery to IX'],
                      ['Test day', keyDates.test.short],
                      ['Results', keyDates.results.short],
                      ['Full awards', `${scholarship.fullScholarships}`]
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-baseline justify-between gap-4">
                        <dt className="text-ink-muted">{label}</dt>
                        <dd className="text-right font-bold text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 border-t border-hairline pt-5 text-[0.82rem] leading-relaxed text-ink-muted">
                    Stuck on the form? Message us on WhatsApp and we will register your child
                    over the phone.
                  </p>
                  <a
                    href={`https://wa.me/91${contact.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block border-2 border-eden-700 px-4 py-3 text-center text-[0.85rem] font-bold text-eden-700 transition hover:bg-eden-700 hover:text-white"
                  >
                    WhatsApp {contact.phone}
                  </a>
                </aside>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------- 8. FAQ */}
          <section className="band-white">
            <div className="shell py-16 md:py-22">
              <SectionHead eyebrow="Questions" title="What parents ask us" />
              <div className="mt-11 border-t border-hairline">
                {faqs.map((item, index) => (
                  <Reveal
                    key={item.question}
                    index={index}
                    stagger={0.04}
                    y={12}
                    duration={0.5}
                    className="grid gap-3 border-b border-hairline py-7 md:grid-cols-[1fr_1.45fr] md:gap-12"
                  >
                    <h3 className="font-display text-[1.15rem] font-medium leading-snug text-ink">
                      {item.question}
                    </h3>
                    <p className="text-[0.96rem] leading-relaxed text-ink-soft">{item.answer}</p>
                  </Reveal>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href="/admission/scholarships/edenwoods-merit-2027/terms"
                  className="hv-link font-bold"
                >
                  Read the full Terms and Conditions
                </Link>
                <span className="text-[0.85rem] text-ink-muted">
                  One page. Everything that governs the ₹{scholarship.registrationFee}.
                </span>
              </div>
            </div>
          </section>

          {/* --------------------------------------------------- 9. about TEHS */}
          <section className="band-grey">
            <div className="shell py-16 md:py-22">
              <SectionHead
                eyebrow="Where your child would study"
                title={aboutSchool.title}
              />
              <div className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <ul className="space-y-4">
                  {aboutSchool.lines.map((line) => (
                    <li
                      key={line}
                      className="border-l-[3px] border-eden-600 pl-5 text-[1rem] leading-relaxed text-ink-soft"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="border border-hairline bg-white px-6 py-6 text-[0.93rem] leading-relaxed text-ink-soft">
                  {aboutSchool.foundationLine}
                </p>
              </div>

              <PhotoStrip
                className="mt-12"
                slots={['scholarship.campus.1', 'scholarship.campus.2', 'scholarship.campus.3']}
              />

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link href="/about" className="hv-link font-bold">
                  More about the school
                </Link>
                <Link href="/gallery" className="hv-link font-bold">
                  Campus gallery
                </Link>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------ 10. contact */}
          <section className="band-white">
            <div className="shell py-16 md:py-22">
              <SectionHead eyebrow="Contact" title="Talk to a person" />
              <div className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
                <div className="bg-white px-7 py-8">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    WhatsApp or call
                  </p>
                  <a
                    href={`https://wa.me/91${contact.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block font-display text-[1.45rem] text-eden-700 underline underline-offset-4"
                  >
                    {contact.phone}
                  </a>
                  <p className="mt-3 text-[0.88rem] text-ink-muted">{contact.officeHours}</p>
                </div>
                <div className="bg-white px-7 py-8">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-3 block break-all font-display text-[1.2rem] text-eden-700 underline underline-offset-4"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="bg-white px-7 py-8">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    Campus
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                    {venue.address}
                  </p>
                  <a
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-[0.88rem] font-bold text-eden-700 underline underline-offset-4"
                  >
                    Open in Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <ScholarshipFooter />
      </div>
    </>
  );
}
