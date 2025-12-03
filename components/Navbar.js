import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
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

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow bg-white ${
        scrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-semibold text-cardinal">Mount Litera School</div>
        <div className="hidden md:flex space-x-6 text-cardinal font-medium">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-gray-800">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="relative h-10 w-10 rounded-full border border-cardinal/20 bg-white text-cardinal shadow-sm transition hover:border-cardinal"
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
        className={`fixed inset-0 z-40 transform bg-black/30 transition-opacity duration-300 ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-full transform bg-white shadow-xl transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <span className="text-lg font-semibold text-cardinal">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="rounded-full border border-cardinal/20 p-2 text-cardinal transition hover:border-cardinal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-2 px-6 py-6 text-cardinal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-cardinal/10 px-4 py-3 text-base font-medium transition hover:border-cardinal hover:bg-cardinal/5"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
