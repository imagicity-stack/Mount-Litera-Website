import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const navItems = [
  {
    label: 'About',
    href: '/about',
    subItems: [
      { label: 'About', href: '/about' },
      { label: "Principal's Note", href: '/about#principal-note' },
      { label: "MD's Note", href: '/about#md-note' },
      { label: 'Mission and Vision', href: '/about#mission-vision' },
      { label: 'The Elden Council', href: '/the-elden-council' },
      { label: 'Core Mentors', href: '/core-mentors' },
      { label: 'Managing Committee', href: '/managing-committee' }
    ]
  },
  {
    label: 'Core',
    href: '/core',
    subItems: [
      { label: 'Core', href: '/core' },
      { label: 'Awards And Recognition', href: '/awards-and-recognition' },
      { label: 'BEYOND Academics', href: '/beyond-academics' },
      { label: 'Accreditation', href: '/core#accreditation' }
    ]
  },
  {
    label: 'New Initiatives',
    href: '/new-initiatives',
    subItems: [
      { label: 'New Initiatives', href: '/new-initiatives' },
      { label: 'Ride to Rise', href: '/new-initiatives#ride-to-rise' }
    ]
  },
  {
    label: 'Academics',
    href: '/academics',
    subItems: [
      { label: 'Academics', href: '/academics' },
      { label: 'Learning journey', href: '/academics#learning-journey' },
      { label: 'Teaching, support', href: '/academics#teaching-support' },
      { label: 'Beyond textbooks', href: '/academics#beyond-textbooks' }
    ]
  },
  {
    label: 'Admission',
    href: '/admission',
    subItems: [
      { label: 'Admission', href: '/admission' },
      { label: 'Why Choose The Elden Heights School', href: '/admission#why-choose-elden-heights' },
      { label: 'Admission Inquiry Form', href: '/admission#admission-inquiry' },
      { label: 'Fee Structure', href: '/admission#fee-structure' }
    ]
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blogs', href: '/blogs' },
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
  const defaultMenu = navItems.find((item) => item.subItems)?.label ?? '';
  const [activeMenu, setActiveMenu] = useState(defaultMenu);
  const [mobileOpenMenu, setMobileOpenMenu] = useState(defaultMenu);
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
    if (menuOpen && defaultMenu) {
      setActiveMenu((current) => current || defaultMenu);
      setMobileOpenMenu((current) => current || defaultMenu);
    }
  }, [menuOpen, defaultMenu]);

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
          <Link href="/" aria-label="Go to home page" className="flex items-center">
            <Image
              src="/website/header.png"
              alt="The Elden Heights School logo"
              width={260}
              height={120}
              className="h-[60px] w-auto md:h-[70px] lg:h-[80px]"
              priority
            />
          </Link>
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
            <Link href="/" aria-label="Go to home page" className="flex items-center">
              <Image
                src="/website/header.png"
                alt="The Elden Heights School logo"
                width={220}
                height={100}
                className="h-[50px] w-auto md:h-[60px]"
                priority
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-gold transition hover:text-parchment"
            >
              Close
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden md:flex-row md:items-center md:justify-start md:gap-12">
            <div className="flex w-full flex-col justify-center px-6 pb-8 md:w-[360px] md:px-10 md:pb-0">
              <div className="hidden flex-col space-y-4 md:flex">
                {navItems.map((item, idx) => {
                  const isActive = activeMenu === item.label;
                  const hasSubItems = Boolean(item.subItems?.length);

                  if (hasSubItems) {
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setActiveMenu(item.label)}
                        className={`text-left text-3xl font-semibold leading-tight tracking-tight transition duration-500 md:text-5xl ${
                          isActive ? 'text-parchment' : 'text-gold'
                        } ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: `${idx * 80}ms` }}
                      >
                        {item.label}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-3xl font-semibold leading-tight tracking-tight text-gold transition duration-500 md:text-5xl ${
                        menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${idx * 80}ms` }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="space-y-3 md:hidden">
                {navItems.map((item) => {
                  const hasSubItems = Boolean(item.subItems?.length);

                  if (!hasSubItems) {
                    return (
                      <Link
                        key={`${item.label}-mobile-link`}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.18em] text-gold transition hover:text-parchment"
                      >
                        {item.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    );
                  }

                  const isOpen = mobileOpenMenu === item.label;
                  return (
                    <div key={`${item.label}-mobile`} className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setMobileOpenMenu(isOpen ? '' : item.label)}
                        className="flex w-full items-center justify-between text-sm font-semibold uppercase tracking-[0.18em] text-gold transition hover:text-parchment"
                      >
                        {item.label}
                        <span
                          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        >
                          ▾
                        </span>
                      </button>
                      {isOpen && (
                        <div className="space-y-2 pl-4">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setMenuOpen(false)}
                              className="block text-sm text-gold/80 transition hover:text-parchment"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hidden w-full md:block md:flex-1 md:pr-10">
              {navItems
                .find((item) => item.label === activeMenu)
                ?.subItems && (
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-gold/70">
                    {activeMenu}
                  </h3>
                  <div className="space-y-4 text-gold">
                    {navItems
                      .find((item) => item.label === activeMenu)
                      ?.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 text-lg font-semibold transition hover:text-parchment"
                        >
                          {subItem.label}
                          <span aria-hidden="true">→</span>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
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
