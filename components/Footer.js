import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-midnight text-parchment">
      <div className="max-w-6xl mx-auto px-6 py-12">
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
            <li><Link href="/policies/admission-policy">Admission Policy</Link></li>
            <li><Link href="/policies/anti-ragging-message">Anti-Ragging Message</Link></li>
            <li><Link href="/policies/code-for-self-discipline">Code for Self-Discipline</Link></li>
            <li><Link href="/policies/complaint-procedures">Complaint Procedures</Link></li>
            <li><Link href="/policies/disability-policy">Disability Policy</Link></li>
            <li><Link href="/policies/parent-child-contact-mechanism">Parent-Child Contact Mechanism</Link></li>
          </ul>
        </nav>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.32em] text-parchment/70">
              Quick Links
            </p>
            <ul className="space-y-3 text-base font-semibold text-parchment">
              <li>Privacy Policy</li>
              <li>Admission Policy</li>
              <li>Disclosures</li>
              <li>Terms &amp; Conditions</li>
            </ul>
          </div>
          <div className="space-y-4 md:justify-self-end">
            <p className="text-sm uppercase tracking-[0.32em] text-parchment/70">
              Contact Information
            </p>
            <ul className="space-y-3 text-base font-semibold text-parchment">
              <li>General query - contact@eldenhieghts.org</li>
              <li>For admissions - admission@eldenheights.org</li>
              <li>Ph : 9431904333</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-parchment/10 pt-8">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="space-y-2">
              <p className="text-2xl font-garamond font-semibold tracking-[0.2em]">
                Elden Heights
              </p>
              <p className="text-xs uppercase tracking-[0.4em] text-parchment/60">
                The Elden Heights School
              </p>
            </div>
            <div className="text-sm text-parchment/70 space-y-1">
              <p>Copyright © 2026 The Elden Heights School. All rights reserved.</p>
              <p className="text-parchment/60">Recognized among the top schools in Hazaribagh for quality education.</p>
            </div>
            <div className="flex items-center gap-4 text-parchment/80">
              <a
                href="https://www.instagram.com/elden.heights"
                aria-label="Instagram"
                className="transition hover:text-parchment"
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/eldenheights/"
                aria-label="LinkedIn"
                className="transition hover:text-parchment"
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M6.2 9.3H3.6v11.1h2.6V9.3zm.3-3.6a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0zM20.4 13.9c0-3-1.6-4.4-3.7-4.4-1.7 0-2.5.9-3 1.5v-1.3h-2.6c.1.9 0 11.1 0 11.1h2.6v-6.2c0-.3 0-.7.1-1 .3-.7.9-1.5 2.1-1.5 1.5 0 2.1 1.1 2.1 2.7v6h2.6v-6.9z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/theeldenheights"
                aria-label="Facebook"
                className="transition hover:text-parchment"
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M14.2 8.2V6.7c0-.8.5-1.1 1.1-1.1h1.6V2.8h-2.2c-2.5 0-3.5 1.6-3.5 3.7v1.7H9v2.8h2.2V21h2.9v-10h2.2l.4-2.8h-2.6z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@theeldenheights"
                aria-label="YouTube"
                className="transition hover:text-parchment"
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M21 8.2a2.8 2.8 0 00-2-2c-1.7-.4-8.6-.4-8.6-.4s-6.9 0-8.6.4a2.8 2.8 0 00-2 2C-.4 9.9-.4 12-.4 12s0 2.1.2 3.8a2.8 2.8 0 002 2c1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4a2.8 2.8 0 002-2c.2-1.7.2-3.8.2-3.8s0-2.1-.2-3.8z"
                    fill="currentColor"
                  />
                  <path d="M10 15.2l5-3.2-5-3.2v6.4z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
