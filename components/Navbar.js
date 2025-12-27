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

const quickLinks = [
  { label: 'Quick Links', href: '#' },
  { label: 'A to Z Index', href: '#' },
  { label: 'Find a person', href: '#' },
  { label: 'Events', href: '#' },
  { label: 'Media Relations', href: '#' },
  { label: 'Alumni', href: '#' },
  { label: 'Give Now', href: '#' },
  { label: 'Emergency', href: '#' }
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${headerState} border-b border-cardinal/10`}
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
          className="flex items-center space-x-2 rounded-full border border-cardinal/30 bg-white/80 px-5 py-2 text-cardinal shadow-md shadow-cardinal/10 backdrop-blur transition hover:border-cardinal hover:text-midnight"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">Menu</span>
          <span
            className={`block h-0.5 w-5 bg-cardinal transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[3px]' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 transform bg-neutral-950/95 text-white transition-all duration-500 ease-out ${
          menuOpen
            ? 'pointer-events-auto opacity-100 translate-y-0'
            : 'pointer-events-none opacity-0 -translate-y-full'
        }`}
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
              className="text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:text-cardinal"
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
                  className={`text-3xl font-semibold leading-tight tracking-tight text-white transition duration-500 md:text-5xl ${
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

          <div className="border-t border-white/10 px-6 py-5 md:px-10">
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.14em] text-white/70 md:text-sm">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
