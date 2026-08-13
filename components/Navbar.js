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
      { label: 'Accreditation', href: '/core#accreditation' }
    ]
  },
  {
    label: "Student's Life",
    href: '/students-life',
    subItems: [
      { label: "Student's Life", href: '/students-life' },
      { label: 'Houses', href: '/houses' },
      { label: 'Sports', href: '/students-life#sports' },
      { label: 'Beyond Academics', href: '/beyond-academics' }
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
      { label: 'Admission Policy', href: '/policies/admission-policy' }
    ]
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' }
];

const quickLinks = [
  { label: 'Admission Policy', href: '/policies/admission-policy' },
  { label: 'Disclosures', href: '/disclosures' },
  { label: 'Houses', href: '/houses' },
  { label: 'Careers', href: '/careers' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Contact', href: '/contact' }
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
      setScrolled(window.scrollY > 24);
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

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const activeItem = navItems.find((item) => item.label === activeMenu);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_1px_0_0_#D5D5D5]' : 'border-b border-hairline'
        }`}
      >
        <div className="shell flex items-center justify-between gap-6 py-4">
          <Link href="/" aria-label="Go to home page" className="flex items-center">
            <Image
              src="/website/header.png"
              alt="The Elden Heights School logo"
              width={260}
              height={120}
              className="h-[46px] w-auto md:h-[56px] lg:h-[62px]"
              priority
            />
          </Link>

          <div className="flex items-center gap-5 md:gap-8">
            <Link
              href="/admission"
              className="hidden text-[0.95rem] font-bold text-crimson underline decoration-2 underline-offset-[5px] transition-colors hover:text-ink sm:inline-flex"
            >
              Apply Now
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="group inline-flex items-center gap-3 text-[0.95rem] font-bold text-ink transition-colors hover:text-crimson"
            >
              <span>Menu</span>
              <span className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full bg-ink transition-colors duration-300 group-hover:bg-crimson">
                <span className="block h-[1.5px] w-4 bg-white" />
                <span className="block h-[1.5px] w-4 bg-white" />
                <span className="block h-[1.5px] w-4 bg-white" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ease-elite ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="relative flex h-full flex-col overflow-hidden bg-obsidian text-white">
          <div className="shell flex items-center justify-between py-4">
            <Link href="/" aria-label="Go to home page" className="flex items-center">
              <Image
                src="/website/header.png"
                alt="The Elden Heights School logo"
                width={260}
                height={120}
                className="h-[46px] w-auto brightness-0 invert md:h-[56px]"
                priority
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="group inline-flex items-center gap-3 text-[0.95rem] font-bold text-white"
            >
              <span>Close</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-crimson group-hover:text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto md:flex-row md:items-stretch md:gap-16 md:overflow-hidden">
            <div className="w-full px-6 pb-12 pt-6 md:w-[52%] md:pl-12 md:pr-0 lg:pl-[4.5rem]">
              <div className="hidden flex-col gap-1 md:flex">
                {navItems.map((item, idx) => {
                  const isActive = activeMenu === item.label;
                  const hasSubItems = Boolean(item.subItems?.length);

                  const baseClass =
                    'group block text-left font-display text-[2.4rem] font-medium leading-[1.22] tracking-tight transition-all duration-500 ease-elite lg:text-[3.1rem]';
                  const motionClass = menuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0';

                  if (hasSubItems) {
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onMouseEnter={() => setActiveMenu(item.label)}
                        onFocus={() => setActiveMenu(item.label)}
                        onClick={() => setActiveMenu(item.label)}
                        className={`${baseClass} ${motionClass} ${
                          isActive ? 'text-white' : 'text-white/55 hover:text-white'
                        }`}
                        style={{ transitionDelay: `${100 + idx * 45}ms` }}
                      >
                        <span className="relative inline-block">
                          {item.label}
                          <span
                            className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-500 ease-elite ${
                              isActive ? 'w-full' : 'w-0'
                            }`}
                          />
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
                      className={`${baseClass} ${motionClass} text-white/55 hover:text-white`}
                      style={{ transitionDelay: `${100 + idx * 45}ms` }}
                    >
                      <span className="relative inline-block">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-white transition-all duration-500 ease-elite group-hover:w-full" />
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="md:hidden">
                {navItems.map((item) => {
                  const hasSubItems = Boolean(item.subItems?.length);

                  if (!hasSubItems) {
                    return (
                      <Link
                        key={`${item.label}-mobile-link`}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between border-b border-white/15 py-4 font-display text-2xl font-medium text-white"
                      >
                        {item.label}
                        <span aria-hidden="true" className="text-white/60">→</span>
                      </Link>
                    );
                  }

                  const isOpen = mobileOpenMenu === item.label;
                  return (
                    <div key={`${item.label}-mobile`} className="border-b border-white/15">
                      <button
                        type="button"
                        onClick={() => setMobileOpenMenu(isOpen ? '' : item.label)}
                        className="flex w-full items-center justify-between py-4 font-display text-2xl font-medium text-white"
                      >
                        {item.label}
                        <span
                          className={`text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        >
                          ▾
                        </span>
                      </button>
                      <div
                        className={`grid overflow-hidden transition-all duration-500 ease-elite ${
                          isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="min-h-0 space-y-3">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setMenuOpen(false)}
                              className="block text-[0.95rem] font-semibold text-white/75 transition hover:text-white"
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

            <div className="hidden md:flex md:w-[48%] md:items-start md:pr-12 md:pt-6 lg:pr-[4.5rem]">
              {activeItem?.subItems && (
                <div key={activeItem.label} className="w-full animate-fade-up">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/55">
                    {activeItem.label}
                  </p>
                  <span className="mt-4 block h-[3px] w-full bg-white" />
                  <div className="mt-6 flex flex-col">
                    {activeItem.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between gap-6 border-b border-white/15 py-4 transition-colors hover:border-white/50"
                      >
                        <span className="text-[1.05rem] font-semibold text-white/85 transition-colors group-hover:text-white">
                          {subItem.label}
                        </span>
                        <span className="text-white/50 transition-all duration-400 ease-elite group-hover:translate-x-1 group-hover:text-white">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-10 border border-white/20 p-6">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/60">
                      Admissions 2026 – 27
                    </p>
                    <p className="mt-3 font-display text-2xl leading-snug text-white">
                      Limited seats remain for the coming session.
                    </p>
                    <Link
                      href="/admission"
                      onClick={() => setMenuOpen(false)}
                      className="arrow-cta arrow-cta--light mt-5"
                    >
                      <span className="arrow-cta__dot">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                          <path d="M5 12h13m-5-5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      Begin your inquiry
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/15">
            <div className="shell flex flex-wrap items-center gap-x-7 gap-y-3 py-5">
              <span className="flex items-center gap-2 text-[0.8rem] font-normal text-white/60">
                Quick Links
                <span aria-hidden="true">›</span>
              </span>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[0.85rem] font-bold text-white transition-colors hover:text-crimson-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
