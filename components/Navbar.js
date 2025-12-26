import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const headerState = menuOpen
    ? 'bg-white shadow-xl'
    : scrolled
      ? 'backdrop-blur-md bg-white/85 shadow-xl shadow-cardinal/5'
      : 'bg-white';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${headerState} border-b border-cardinal/10`}>
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Image
            src="/website/header.png"
            alt="The Elden Heights School logo"
            width={160}
            height={107}
            className="h-auto w-32 md:w-40"
            priority
          />
        </div>
        <div className="hidden md:flex items-center space-x-6 text-midnight font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative pb-1 transition duration-200 hover:text-cardinal"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-cardinal/70 transition-transform duration-200 ease-out hover:scale-x-100" />
            </Link>
          ))}
          <a
            href="https://elnode.in"
            target="_blank"
            rel="noreferrer"
            className="bg-cardinal px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-cardinal/25 transition hover:bg-cardinal/90"
          >
            ERP
          </a>
        </div>
        <div className="md:hidden">
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="relative h-11 w-11 rounded-full border border-cardinal/20 bg-white/90 text-cardinal shadow-md shadow-cardinal/10 backdrop-blur"
          >
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-2 transform rounded-full bg-cardinal transition ${
                menuOpen ? 'translate-y-0 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 transform rounded-full bg-cardinal transition ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 translate-y-2 transform rounded-full bg-cardinal transition ${
                menuOpen ? 'translate-y-0 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>
      <div
        className={`fixed inset-0 z-40 transform bg-white transition-opacity duration-300 ${
          menuOpen ? 'pointer-events-auto opacity-95' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-full transform bg-white shadow-2xl transition-transform duration-300 mobile-drawer ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#ffffff', opacity: 1, backdropFilter: 'none' }}
      >
        <div className="flex items-center justify-between border-b border-cardinal/10 px-6 py-5">
          <span className="text-lg font-semibold text-midnight font-garamond">Navigate</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="rounded-full border border-cardinal/20 p-2 text-cardinal transition hover:border-cardinal hover:bg-cardinal/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-3 px-6 py-6 text-midnight">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-cardinal/10 px-4 py-3 text-base font-medium transition hover:border-cardinal hover:bg-cardinal/5 shadow-sm"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://elnode.in"
            target="_blank"
            rel="noreferrer"
            className="border border-cardinal bg-cardinal px-4 py-3 text-center text-base font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-cardinal/90"
          >
            ERP
          </a>
        </div>
      </div>
    </header>
  );
}
