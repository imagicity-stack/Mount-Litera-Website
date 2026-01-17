export default function Footer() {
  return (
    <footer className="bg-midnight text-parchment">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.32em] text-parchment/70">
              Security &amp; Brand
            </p>
            <ul className="space-y-3 text-sm text-parchment/70">
              <li>
                <a className="transition hover:text-parchment" href="/report-copyright">
                  Report Copyright Infringement
                </a>
              </li>
              <li>
                <a className="transition hover:text-parchment" href="/report-security">
                  Report Security Issue
                </a>
              </li>
              <li>
                <a className="transition hover:text-parchment" href="/trademark-notice">
                  Trademark Notice
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.32em] text-parchment/70">
              Website
            </p>
            <ul className="space-y-3 text-sm text-parchment/70">
              <li>
                <a className="transition hover:text-parchment" href="/accessibility">
                  Accessibility
                </a>
              </li>
              <li>
                <a className="transition hover:text-parchment" href="/digital-accessibility">
                  Digital Accessibility
                </a>
              </li>
              <li>
                <a className="transition hover:text-parchment" href="/privacy-policy">
                  Privacy Statement
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4 md:justify-self-end">
            <p className="text-sm uppercase tracking-[0.32em] text-parchment/70">
              Get In Touch
            </p>
            <ul className="space-y-3 text-sm text-parchment/70">
              <li>
                <a className="transition hover:text-parchment" href="/contact">
                  Contact Elden Heights
                </a>
              </li>
              <li>
                <a className="transition hover:text-parchment" href="/visit">
                  Maps &amp; Directions
                </a>
              </li>
              <li>
                <a className="transition hover:text-parchment" href="/careers">
                  Jobs
                </a>
              </li>
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
            <p className="text-sm text-parchment/70">
              Copyright © 2026 The Elden Heights School. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-parchment/80">
              <a
                href="https://www.instagram.com"
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
                href="https://www.tiktok.com"
                aria-label="TikTok"
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
                    d="M14.5 5.2c1.1 1.5 2.6 2.4 4.3 2.6v3c-1.9-.1-3.5-.8-4.8-2v6.3c0 3-2.4 5.4-5.4 5.4s-5.4-2.4-5.4-5.4 2.4-5.4 5.4-5.4c.5 0 1 .1 1.5.2v3.1c-.5-.3-1-.5-1.6-.5-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V3.8h3.5c.1.5.3 1 .5 1.4z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com"
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
                href="https://www.facebook.com"
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
                href="https://www.youtube.com"
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
