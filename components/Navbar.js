import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Core', href: '/core' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admission', href: '/admission' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' }
];

const quickLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Admission Policy', href: '/policies/admission-policy' },
  { label: 'Disclosures', href: '/disclosures' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const previousOverflow = useRef({ html: '', body: '' });
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleRoute = () => setMenuOpen(false);

    router.events.on('routeChangeComplete', handleRoute);
    return () => {
      router.events.off('routeChangeComplete', handleRoute);
    };
  }, [router]);

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;

    if (menuOpen) {
      previousOverflow.current = {
        html: root.style.overflow,
        body: body.style.overflow
      };

      root.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    } else {
      root.style.overflow = previousOverflow.current.html;
      body.style.overflow = previousOverflow.current.body;
    }

    return () => {
      root.style.overflow = previousOverflow.current.html;
      body.style.overflow = previousOverflow.current.body;
    };
  }, [menuOpen]);

  const headerState = menuOpen
    ? 'bg-parchment shadow-xl'
    : scrolled
      ? 'backdrop-blur-md bg-parchment/90 shadow-xl shadow-cardinal/10'
      : 'bg-parchment';

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${headerState} border-b border-black/15`}
      >
        <div className="mx-auto flex w-full max-w-full items-center justify-between px-5 py-4 md:px-8 lg:px-10">
          <div className="flex items-center">
            <Image
              src="/website/header.png"
              alt="The Elden Heights School logo"
              width={260}
              height={120}
              className="h-[60px] w-auto md:h-[70px] lg:h-[80px]"
              priority
            />
          </div>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center space-x-2 rounded-full border border-black/40 bg-parchment/90 px-5 py-2 text-black shadow-md shadow-cardinal/10 backdrop-blur transition hover:border-black hover:text-midnight"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.18em]">Menu</span>
            <span
              className={`block h-0.5 w-5 bg-cardinal transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[3px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] transform bg-midnight text-gold transition-transform duration-500 ease-out will-change-transform ${
          menuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-full opacity-0'
        }`}
        style={{ transitionProperty: 'transform, opacity' }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-5 md:px-10">
            <Image
              src="/website/header.png"
              alt="The Elden Heights School logo"
              width={220}
              height={100}
              className="h-[50px] w-auto md:h-[60px]"
              priority
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-gold transition hover:text-parchment"
            >
              Close
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
            <div className="flex w-full flex-col justify-center space-y-4 px-6 pb-12 md:w-1/2 md:px-10 md:pb-0">
              {navItems.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-3xl font-semibold leading-tight tracking-tight text-gold transition duration-500 md:text-5xl ${
                    menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="hidden flex-1 md:block" />
          </div>

          <div className="border-t border-gold/40 px-6 py-5 md:px-10">
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.14em] text-gold/80 md:text-sm">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition hover:text-parchment"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
