import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admission', href: '/admission' },
  { label: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          <select
            className="border border-cardinal text-cardinal rounded-lg px-3 py-2 bg-white"
            onChange={(event) => {
              const target = event.target.value;
              if (target) {
                router.push(target);
                event.target.value = '';
              }
            }}
          >
            <option value="">Navigate</option>
            {navItems.map((item) => (
              <option key={item.href} value={item.href}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </header>
  );
}
