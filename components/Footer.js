import Link from 'next/link';
import Image from 'next/image';

import useSiteSettings from '@/lib/useSiteSettings';
import { telHref } from '@/lib/siteSettings';

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
    key: 'instagram',
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
    key: 'linkedin',
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
    key: 'facebook',
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
    key: 'youtube',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M21.6 7.6a2.5 2.5 0 00-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.6 26.4 26.4 0 002 12a26.4 26.4 0 00.4 4.4 2.5 2.5 0 001.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26.4 26.4 0 0022 12a26.4 26.4 0 00-.4-4.4z"
          fill="currentColor"
        />
        <path d="M10 15.2l5-3.2-5-3.2v6.4z" fill="#0D0D0D" />
      </svg>
    )
  }
];

export default function Footer() {
  const settings = useSiteSettings();

  return (
    <footer className="band-ink">
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

      <div className="shell py-16 md:py-20">
        <span className="rule-heavy-light" />

        <div className="mt-12 grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1.1fr] md:gap-10">
          <div>
            <Link href="/" aria-label="Go to home page" className="inline-flex">
              <Image
                src="/website/header.png"
                alt="The Elden Heights School logo"
                width={260}
                height={120}
                className="h-[54px] w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              Recognised among the top schools in Hazaribagh — shaping confident, capable, and
              creative learners under the patronage of {settings.trust}.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.filter(({ key }) => settings[key]).map(({ label, key, icon }) => (
                <a
                  key={label}
                  href={settings[key]}
                  aria-label={label}
                  rel="noreferrer"
                  target="_blank"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-crimson hover:bg-crimson"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/55">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-white transition-colors hover:text-crimson-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/55">
              Policies
            </p>
            <ul className="mt-5 space-y-3">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-white transition-colors hover:text-crimson-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/55">
              Contact
            </p>
            <ul className="mt-5 space-y-5 text-sm">
              <li>
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-white/45">General</p>
                <a
                  href={`mailto:${settings.emailGeneral}`}
                  className="mt-1 block font-bold text-white transition-colors hover:text-crimson-300"
                >
                  {settings.emailGeneral}
                </a>
              </li>
              <li>
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-white/45">Admissions</p>
                <a
                  href={`mailto:${settings.emailAdmissions}`}
                  className="mt-1 block font-bold text-white transition-colors hover:text-crimson-300"
                >
                  {settings.emailAdmissions}
                </a>
              </li>
              <li>
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-white/45">Phone</p>
                <a
                  href={telHref(settings.phone)}
                  className="mt-1 block font-bold text-white transition-colors hover:text-crimson-300"
                >
                  {settings.phone}
                </a>
              </li>
              <li>
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-white/45">Location</p>
                <p className="mt-1 text-white/75">{settings.region}</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/15 pt-8">
          <div className="flex flex-col gap-3 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} {settings.schoolName}. All rights reserved.</p>
            <p className="font-display text-sm italic text-white/70">{settings.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
