/**
 * The printable admit card.
 *
 * Reached from the receipt email with the registration's token, because
 * registration numbers appear on the public merit list — a number-only link
 * would hand a child's name and date of birth to anyone reading it.
 *
 * Styled to print: the chrome is hidden at print time and the card sits alone
 * on the sheet, so "Ctrl-P, print" produces something a parent can carry to
 * the gate.
 */

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ScholarshipFooter, ScholarshipHeader } from '@/components/scholarship/Chrome';
import {
  bandFor,
  classLabel,
  contact,
  foundation,
  keyDates,
  scholarship,
  testFormats,
  venue,
  whatToBring
} from '@/lib/scholarship';

const formatDob = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value || '';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

function Row({ label, children }) {
  if (!children) return null;
  return (
    <div className="grid grid-cols-[8.5rem_1fr] gap-3 border-b border-hairline py-3">
      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </dt>
      <dd className="text-[0.95rem] leading-snug text-ink">{children}</dd>
    </div>
  );
}

export default function AdmitCardPage() {
  const router = useRouter();
  const [state, setState] = useState({ phase: 'loading', registration: null, message: '' });

  useEffect(() => {
    if (!router.isReady) return;
    const { r, t } = router.query;
    if (typeof r !== 'string' || typeof t !== 'string' || !r || !t) {
      setState({
        phase: 'error',
        registration: null,
        message:
          'This link is incomplete. Open the admit card from the link in your confirmation email, or message us on WhatsApp.'
      });
      return;
    }

    fetch(`/api/scholarship/registration/${encodeURIComponent(r)}?token=${encodeURIComponent(t)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setState({
            phase: 'error',
            registration: null,
            message: data.message || 'We could not find that registration.'
          });
          return;
        }
        setState({ phase: 'ready', registration: data.registration, message: '' });
      })
      .catch(() => {
        setState({
          phase: 'error',
          registration: null,
          message: 'We could not reach the server. Please check your connection and try again.'
        });
      });
  }, [router.isReady, router.query]);

  const record = state.registration;
  const band = record ? bandFor(record.classApplying) : 'activity';
  const format = testFormats.find((f) => f.band === band);

  return (
    <>
      <Head>
        <title>Admit card · Edenwoods Merit Scholarship 2027</title>
        {/* Never indexed: this page exists only behind a token. */}
        <meta name="robots" content="noindex,nofollow" />
        <meta name="theme-color" content="#06423C" />
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: #fff !important; }
            .admit-sheet { border-width: 2px !important; margin: 0 !important; }
          }
        `}</style>
      </Head>

      <div className="eden-theme flex min-h-screen flex-col bg-ivory">
        <div className="no-print">
          <ScholarshipHeader showRegister={false} />
        </div>

        <main className="flex-1">
          <div className="shell max-w-[44rem] py-10 md:py-14">
            {state.phase === 'loading' && (
              <p className="py-20 text-center text-[0.95rem] text-ink-muted">
                Loading your admit card…
              </p>
            )}

            {state.phase === 'error' && (
              <div className="border border-hairline bg-white p-8 text-center">
                <p className="font-display text-[1.5rem] text-ink">Admit card not found</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{state.message}</p>
                <a
                  href={`https://wa.me/91${contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-7 inline-block"
                >
                  WhatsApp {contact.phone}
                </a>
              </div>
            )}

            {state.phase === 'ready' && record && (
              <>
                <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[0.85rem] text-ink-muted">
                    Print this, or show it on your phone at the gate.
                  </p>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-primary px-6 py-3 text-[0.85rem]"
                  >
                    Print admit card
                  </button>
                </div>

                {record.paymentStatus !== 'paid' && (
                  <p className="no-print mb-6 border border-crimson bg-crimson/[0.05] px-5 py-4 text-[0.9rem] font-semibold text-crimson">
                    This registration is not paid for yet, so it is not confirmed. Please complete
                    the ₹{scholarship.registrationFee} payment.
                  </p>
                )}

                <article className="admit-sheet border-[3px] border-eden-700 bg-white">
                  <header className="flex items-center justify-between gap-4 bg-eden-700 px-6 py-5">
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/70">
                        {foundation.name}
                      </p>
                      <p className="mt-1 font-display text-[1.35rem] font-medium text-white">
                        Admit Card
                      </p>
                      <p className="mt-0.5 text-[0.72rem] text-white/70">{scholarship.name}</p>
                    </div>
                    <img
                      src={foundation.logo}
                      alt=""
                      aria-hidden="true"
                      className="h-14 w-auto brightness-0 invert"
                      width="80"
                      height="54"
                    />
                  </header>

                  <div className="px-6 py-7">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Registration number
                    </p>
                    <p className="mt-1 font-mono text-[clamp(1.6rem,6vw,2.3rem)] font-bold tracking-[0.06em] text-eden-700">
                      {record.registrationNumber}
                    </p>

                    <dl className="mt-7 border-t border-hairline">
                      <Row label="Child">{record.childName}</Row>
                      <Row label="Date of birth">{formatDob(record.dob)}</Row>
                      <Row label="Class 2027–28">{classLabel(record.classApplying)}</Row>
                      <Row label="Parent">{record.parentName}</Row>
                      <Row label="Test date">{keyDates.test.label}</Row>
                      <Row label="Reporting">
                        {record.reportingTime || 'Confirmed on WhatsApp before the test'}
                      </Row>
                      <Row label="Format">
                        {format?.title} · {format?.duration}
                      </Row>
                      {format?.subjects?.length > 0 && (
                        <Row label="Subjects">{format.subjects.join(', ')}</Row>
                      )}
                      <Row label="Venue">
                        <span className="font-bold">{venue.name}</span>
                        <br />
                        {venue.address}
                      </Row>
                    </dl>

                    <div className="mt-7 border-t border-hairline pt-5">
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink-muted">
                        Bring with you
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {whatToBring.map((item) => (
                          <li key={item} className="text-[0.9rem] leading-snug text-ink-soft">
                            · {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {band === 'activity' && (
                      <p className="mt-5 border-l-[3px] border-eden-600 pl-4 text-[0.9rem] font-bold text-eden-700">
                        A parent stays with the child throughout the activity.
                      </p>
                    )}

                    <p className="mt-7 border-t border-hairline pt-5 text-[0.78rem] leading-relaxed text-ink-muted">
                      A child who misses the test cannot take it again on another day. Any child
                      found copying or using unfair means will be disqualified. Parents are
                      responsible for travel to and from the campus. Questions: WhatsApp{' '}
                      {contact.phone}.
                    </p>
                  </div>
                </article>

                <div className="no-print mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                  <a href={venue.mapsUrl} target="_blank" rel="noreferrer" className="hv-link font-bold">
                    Open the venue in Google Maps
                  </a>
                  <Link
                    href="/admission/scholarships/edenwoods-merit-2027/terms"
                    className="hv-link font-bold"
                  >
                    Terms and Conditions
                  </Link>
                </div>
              </>
            )}
          </div>
        </main>

        <div className="no-print">
          <ScholarshipFooter />
        </div>
      </div>
    </>
  );
}
