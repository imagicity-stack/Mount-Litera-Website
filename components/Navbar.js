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
      setScrolled(window.scrollY > 40);
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

  const activeItem = navItems.find((item) => item.label === activeMenu);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-elite ${
          menuOpen
            ? 'bg-midnight/95 text-parchment border-b border-gold/25 backdrop-blur-xl'
            : scrolled
              ? 'bg-parchment/85 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(10,10,12,0.3)] border-b border-black/10'
              : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-10 lg:px-14">
          <Link href="/" aria-label="Go to home page" className="group flex items-center gap-3">
            <div className="relative">
              <Image
                src="/website/header.png"
                alt="The Elden Heights School logo"
                width={260}
                height={120}
                className="h-[54px] w-auto md:h-[64px] lg:h-[72px] transition-transform duration-500 ease-elite group-hover:scale-[1.02]"
                priority
              />
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <div className="flex flex-col items-end">
              <span className={`text-[10px] font-semibold uppercase tracking-[0.4em] transition-colors ${
                menuOpen ? 'text-gold/70' : scrolled ? 'text-midnight/60' : 'text-midnight/70'
              }`}>
                Since a Heritage of Excellence
              </span>
              <span className={`font-garamond text-sm italic transition-colors ${
                menuOpen ? 'text-parchment' : 'text-midnight/90'
              }`}>
                Towards Eternal Glory
              </span>
            </div>
            <div className={`h-10 w-px transition-colors ${
              menuOpen ? 'bg-gold/30' : 'bg-midnight/15'
            }`} />
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`group relative inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.28em] transition-all duration-500 ease-elite ${
              menuOpen
                ? 'border border-gold/50 bg-transparent text-parchment'
                : 'border border-midnight/25 bg-parchment/70 text-midnight backdrop-blur hover:border-midnight hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(10,10,12,0.3)]'
            }`}
          >
            <span className="flex flex-col items-center justify-center gap-[5px]">
              <span
                className={`block h-[1.5px] w-5 transition-all duration-400 ease-elite ${
                  menuOpen
                    ? 'translate-y-[3.5px] rotate-45 bg-gold'
                    : 'bg-midnight group-hover:bg-cardinal'
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 transition-all duration-400 ease-elite ${
                  menuOpen
                    ? '-translate-y-[3.5px] -rotate-45 bg-gold'
                    : 'bg-midnight w-3 group-hover:w-5 group-hover:bg-cardinal'
                }`}
              />
            </span>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] transform transition-all duration-700 ease-elite will-change-transform ${
          menuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-6 opacity-0'
        }`}
        style={{ transitionProperty: 'transform, opacity' }}
      >
        <div className="relative h-full overflow-hidden bg-gradient-to-br from-midnight via-graphite to-midnight text-parchment">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.09]"
            aria-hidden="true"
            style={{
              backgroundImage: "url('/main gate new.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="pointer-events-none absolute -left-40 top-40 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px]" />
          <div className="pointer-events-none absolute -right-40 bottom-10 h-[520px] w-[520px] rounded-full bg-cardinal/20 blur-[140px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between px-6 py-5 md:px-10 lg:px-14">
              <Link href="/" aria-label="Go to home page" className="flex items-center">
                <Image
                  src="/website/header.png"
                  alt="The Elden Heights School logo"
                  width={220}
                  height={100}
                  className="h-[48px] w-auto md:h-[58px]"
                  priority
                />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-parchment transition hover:text-gold-300"
              >
                Close
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto md:flex-row md:items-stretch md:justify-between md:gap-16 md:overflow-hidden">
              <div className="flex w-full flex-col justify-between px-6 pb-10 md:w-[48%] md:px-14 md:pt-6">
                <div className="hidden flex-col gap-1 md:flex">
                  <span className={`text-[10px] font-semibold uppercase tracking-[0.45em] text-gold-300 transition-all duration-700 ${
                    menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    Navigate
                  </span>
                  <span className={`mt-3 h-px w-14 bg-gradient-to-r from-gold to-transparent transition-all duration-700 delay-100 ${
                    menuOpen ? 'opacity-100' : 'opacity-0'
                  }`} />
                </div>
                <div className="hidden flex-col gap-3 md:mt-6 md:flex">
                  {navItems.map((item, idx) => {
                    const isActive = activeMenu === item.label;
                    const hasSubItems = Boolean(item.subItems?.length);

                    if (hasSubItems) {
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onMouseEnter={() => setActiveMenu(item.label)}
                          onFocus={() => setActiveMenu(item.label)}
                          onClick={() => setActiveMenu(item.label)}
                          className={`group flex items-baseline gap-4 text-left font-garamond text-4xl font-semibold leading-[1.05] tracking-tight transition-all duration-500 ease-elite md:text-[54px] ${
                            isActive
                              ? 'text-parchment'
                              : 'text-parchment/45 hover:text-parchment'
                          } ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                          style={{ transitionDelay: `${120 + idx * 60}ms` }}
                        >
                          <span className={`font-avenir text-[11px] font-semibold tracking-[0.32em] transition-colors ${
                            isActive ? 'text-gold' : 'text-parchment/30'
                          }`}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="relative">
                            {item.label}
                            <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500 ease-elite ${
                              isActive ? 'w-full' : 'w-0'
                            }`} />
                          </span>
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={() => setActiveMenu('')}
                        className={`group flex items-baseline gap-4 font-garamond text-4xl font-semibold leading-[1.05] tracking-tight text-parchment/60 transition-all duration-500 ease-elite md:text-[54px] hover:text-parchment ${
                          menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                        }`}
                        style={{ transitionDelay: `${120 + idx * 60}ms` }}
                      >
                        <span className="font-avenir text-[11px] font-semibold tracking-[0.32em] text-parchment/30 group-hover:text-gold">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="relative">
                          {item.label}
                          <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold transition-all duration-500 ease-elite group-hover:w-full" />
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="space-y-2 md:hidden">
                  {navItems.map((item, idx) => {
                    const hasSubItems = Boolean(item.subItems?.length);

                    if (!hasSubItems) {
                      return (
                        <Link
                          key={`${item.label}-mobile-link`}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between border-b border-parchment/10 py-4 font-garamond text-xl font-semibold text-parchment transition hover:text-gold-300"
                        >
                          <span className="flex items-baseline gap-3">
                            <span className="text-[10px] font-avenir font-semibold tracking-[0.3em] text-gold-400">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            {item.label}
                          </span>
                          <span aria-hidden="true" className="text-gold-300">→</span>
                        </Link>
                      );
                    }

                    const isOpen = mobileOpenMenu === item.label;
                    return (
                      <div
                        key={`${item.label}-mobile`}
                        className="border-b border-parchment/10"
                      >
                        <button
                          type="button"
                          onClick={() => setMobileOpenMenu(isOpen ? '' : item.label)}
                          className="flex w-full items-center justify-between py-4 font-garamond text-xl font-semibold text-parchment transition hover:text-gold-300"
                        >
                          <span className="flex items-baseline gap-3">
                            <span className="text-[10px] font-avenir font-semibold tracking-[0.3em] text-gold-400">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            {item.label}
                          </span>
                          <span
                            className={`text-gold-300 transition-transform duration-400 ease-elite ${isOpen ? 'rotate-180' : ''}`}
                            aria-hidden="true"
                          >
                            ▾
                          </span>
                        </button>
                        <div
                          className={`grid overflow-hidden transition-all duration-500 ease-elite ${
                            isOpen ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="min-h-0 space-y-2 pl-8">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setMenuOpen(false)}
                                className="block text-sm text-parchment/75 transition hover:text-gold-200"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="hidden md:flex md:w-[48%] md:items-center md:pr-14">
                <div className="relative w-full">
                  <div className="pointer-events-none absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
                  {activeItem?.subItems && (
                    <div key={activeItem.label} className="space-y-8 animate-fade-up">
                      <div className="flex items-center gap-4">
                        <span className="h-px w-10 bg-gold" />
                        <h3 className="text-[10px] font-semibold uppercase tracking-[0.45em] text-gold-300">
                          {activeItem.label} — Overview
                        </h3>
                      </div>
                      <div className="space-y-5">
                        {activeItem.subItems.map((subItem, subIdx) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setMenuOpen(false)}
                            className="group flex items-center justify-between gap-6 border-b border-parchment/10 pb-4 transition-all hover:border-gold/40"
                            style={{ animationDelay: `${subIdx * 80}ms` }}
                          >
                            <span className="font-garamond text-2xl font-semibold text-parchment/85 transition-colors group-hover:text-parchment">
                              {subItem.label}
                            </span>
                            <span className="translate-x-0 text-gold-300 transition-all duration-500 ease-elite group-hover:translate-x-1.5 group-hover:text-gold">
                              →
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="glass-panel-dark mt-8 rounded-2xl p-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-300">
                          Admissions 2026 – 27
                        </p>
                        <p className="mt-3 font-garamond text-xl text-parchment">
                          Limited seats remain for families seeking heritage-inspired, future-ready education.
                        </p>
                        <Link
                          href="/admission"
                          onClick={() => setMenuOpen(false)}
                          className="link-underline mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.25em] text-gold-300 hover:text-gold-200"
                        >
                          Begin Inquiry →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative border-t border-parchment/10 px-6 py-6 md:px-14">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.28em] text-parchment/60 md:text-xs">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="transition hover:text-gold-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-parchment/60">
                  <span>Hazaribagh, Jharkhand</span>
                  <span className="h-3 w-px bg-parchment/20" />
                  <a href="tel:+919431904333" className="transition hover:text-gold-200">
                    +91 94319 04333
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
