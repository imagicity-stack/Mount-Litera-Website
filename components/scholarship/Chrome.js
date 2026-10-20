/**
 * Shared chrome for the scholarship pages.
 *
 * These pages belong to Edenwoods Eduhub Foundation rather than the school, so
 * they carry the Foundation's wordmark and its teal — but the same typography,
 * flat bands, square edges and heavy rules as the rest of the site, because a
 * parent arriving from an advertisement should still recognise where they are.
 */

import Link from 'next/link';

import { contact, foundation, scholarship, venue } from '@/lib/scholarship';

export function ScholarshipHeader({ showRegister = true }) {
  return (
    <header className="border-b border-hairline bg-white">
      <div className="shell flex items-center justify-between gap-4 py-3.5">
        <Link href="/admission/scholarships" className="flex items-center gap-3">
          <img
            src={foundation.logo}
            alt=""
            aria-hidden="true"
            className="h-10 w-auto sm:h-12"
            width="120"
            height="81"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[1.05rem] font-medium text-ink sm:text-[1.2rem]">
              Edenwoods Scholars
            </span>
            <span className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-muted sm:text-[0.62rem]">
              Eduhub Foundation
            </span>
          </span>
        </Link>

        {showRegister && (
          <a
            href="#register"
            className="hidden border-2 border-eden-700 px-5 py-2.5 text-[0.8rem] font-bold text-eden-700 transition hover:bg-eden-700 hover:text-white sm:inline-block"
          >
            Register · ₹{scholarship.registrationFee}
          </a>
        )}
      </div>
    </header>
  );
}

export function ScholarshipFooter() {
  return (
    <footer className="bg-eden-700 text-white">
      <div className="shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-display text-[1.35rem] font-medium text-white">
              {foundation.name}
            </p>
            <p className="mt-2 max-w-prose text-[0.9rem] leading-relaxed text-white/70">
              {scholarship.name} is offered by {foundation.name}. The admission that follows a
              scholarship is handled by {scholarship.school}.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem]">
              <Link href="/admission/scholarships/edenwoods-merit-2027/terms" className="font-bold text-white underline underline-offset-4">
                Terms &amp; Conditions
              </Link>
              <Link href="/privacy-policy" className="text-white/70 underline underline-offset-4">
                Privacy policy
              </Link>
              <Link href="/admission" className="text-white/70 underline underline-offset-4">
                TEHS admissions
              </Link>
            </div>
          </div>

          <div className="text-[0.9rem] leading-relaxed">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/50">
              Questions
            </p>
            <a
              href={`https://wa.me/91${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block font-bold text-white underline underline-offset-4"
            >
              WhatsApp {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="mt-1 block text-white/75">
              {contact.email}
            </a>
            <p className="mt-3 text-white/60">{contact.officeHours}</p>
            <p className="mt-3 text-white/60">{venue.address}</p>
          </div>
        </div>

        <p className="mt-10 border-t border-white/15 pt-6 text-[0.75rem] leading-relaxed text-white/45">
          The ₹{scholarship.registrationFee} registration fee is non-refundable. The scholarship is
          a tuition waiver for the {scholarship.session} session only and does not cover admission
          fee, annual charges, transport, books or uniform.
        </p>
      </div>
    </footer>
  );
}

/** Section heading used down the page: heavy rule, eyebrow, serif title. */
export function SectionHead({ eyebrow, title, lede, className = '' }) {
  return (
    <div className={className}>
      <span className="rule-heavy" />
      {eyebrow && (
        <p className="mt-9 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-eden-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 max-w-4xl font-display text-[clamp(1.85rem,3.8vw,3rem)] font-medium leading-[1.08] text-ink">
        {title}
      </h2>
      {lede && <p className="lede mt-5 max-w-prose">{lede}</p>}
    </div>
  );
}
