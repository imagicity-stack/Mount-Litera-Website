import Link from 'next/link';

const exploreLinks = [
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admission', href: '/admission' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' }
];

const policyLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Admission Policy', href: '/policies/admission-policy' },
  { label: 'Disclosures', href: '/disclosures' },
  { label: 'Anti-Ragging', href: '/policies/anti-ragging-message' },
  { label: 'Disability Policy', href: '/policies/disability-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' }
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/elden.heights',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/eldenheights/',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M6.2 9.3H3.6v11.1h2.6V9.3zm.3-3.6a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0zM20.4 13.9c0-3-1.6-4.4-3.7-4.4-1.7 0-2.5.9-3 1.5v-1.3h-2.6c.1.9 0 11.1 0 11.1h2.6v-6.2c0-.3 0-.7.1-1 .3-.7.9-1.5 2.1-1.5 1.5 0 2.1 1.1 2.1 2.7v6h2.6v-6.9z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/theeldenheights',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M14.2 8.2V6.7c0-.8.5-1.1 1.1-1.1h1.6V2.8h-2.2c-2.5 0-3.5 1.6-3.5 3.7v1.7H9v2.8h2.2V21h2.9v-10h2.2l.4-2.8h-2.6z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@theeldenheights',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M21.6 7.6a2.5 2.5 0 00-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.6 26.4 26.4 0 002 12a26.4 26.4 0 00.4 4.4 2.5 2.5 0 001.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26.4 26.4 0 0022 12a26.4 26.4 0 00-.4-4.4z"
          fill="currentColor"
        />
        <path d="M10 15.2l5-3.2-5-3.2v6.4z" fill="#0A0A0C" />
      </svg>
    )
  }
];

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-gradient-to-br from-midnight via-graphite to-midnight text-parchment">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-cardinal/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[140px]" />

      <nav className="sr-only" aria-label="Site navigation">
        <p>Explore Elden Heights School pages</p>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/academics">Academics</Link></li>
          <li><Link href="/admission">Admission</Link></li>
          <li><Link href="/awards-and-recognition">Awards and Recognition</Link></li>
          <li><Link href="/beyond-academics">Beyond Academics</Link></li>
          <li><Link href="/co-curricular-clubs">Co-Curricular Clubs</Link></li>
          <li><Link href="/life-readiness-program">Life Readiness Program</Link></li>
          <li><Link href="/students-life">Student&apos;s Life</Link></li>
          <li><Link href="/houses">Houses</Link></li>
          <li><Link href="/core">Core</Link></li>
          <li><Link href="/core-mentors">Core Mentors</Link></li>
          <li><Link href="/the-elden-council">The Elden Council</Link></li>
          <li><Link href="/managing-committee">Managing Committee</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/careers">Careers</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/disclosures">Disclosures</Link></li>
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
        </ul>
      </nav>

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-10 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-300">
                Est. Heritage
              </span>
            </div>
            <p className="font-garamond text-4xl font-semibold leading-tight text-parchment md:text-5xl">
              The Elden Heights
              <br />
              <span className="italic">
                <span className="gold-text">School</span>
              </span>
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-parchment/70">
              Recognised among the top schools in Hazaribagh — shaping confident, capable, and
              creative learners since inception, under the patronage of Bhagwati Educational &amp;
              Charitable Trust.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="noreferrer"
                  target="_blank"
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-parchment/20 bg-white/5 text-parchment transition-all duration-400 ease-elite hover:-translate-y-0.5 hover:border-gold/60 hover:bg-gold/15 hover:text-gold-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-300">
              Explore
            </p>
            <ul className="space-y-3 text-sm text-parchment/80">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline transition hover:text-gold-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-300">
              Policies
            </p>
            <ul className="space-y-3 text-sm text-parchment/80">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline transition hover:text-gold-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-300">
              Contact
            </p>
            <ul className="space-y-4 text-sm text-parchment/80">
              <li>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-parchment/50">General</p>
                <a
                  href="mailto:contact@eldenhieghts.org"
                  className="mt-1 block transition hover:text-gold-200"
                >
                  contact@eldenhieghts.org
                </a>
              </li>
              <li>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-parchment/50">Admissions</p>
                <a
                  href="mailto:admission@eldenheights.org"
                  className="mt-1 block transition hover:text-gold-200"
                >
                  admission@eldenheights.org
                </a>
              </li>
              <li>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-parchment/50">Phone</p>
                <a href="tel:+919431904333" className="mt-1 block transition hover:text-gold-200">
                  +91 94319 04333
                </a>
              </li>
              <li>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-parchment/50">Location</p>
                <p className="mt-1">Hazaribagh, Jharkhand · India</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8">
          <div className="gold-rule-wide" />
          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs md:flex-row">
            <p className="text-parchment/60">
              © {new Date().getFullYear()} The Elden Heights School · All rights reserved.
            </p>
            <p className="flex items-center gap-3 font-garamond italic text-parchment/70">
              <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
              Towards Eternal Glory
              <span className="h-px w-8 bg-gradient-to-l from-gold to-transparent" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
