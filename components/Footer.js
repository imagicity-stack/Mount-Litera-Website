import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 px-6 py-8 text-sm text-cardinal md:flex-row md:items-center md:justify-between">
        <p className="text-center md:text-left">© 2025 Mount Litera School | All Rights Reserved.</p>
        <div className="flex flex-col items-center justify-center space-y-1 text-xs text-gray-500 md:flex-row md:space-y-0 md:space-x-4">
          <Link href="/privacy-policy" className="hover:text-cardinal transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-cardinal transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
