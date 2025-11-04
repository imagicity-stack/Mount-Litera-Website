import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-cardinal text-sm">
        © 2025 Mount Litera School | All Rights Reserved.
        <div className="mt-2 flex flex-col items-center justify-center space-y-1 text-xs text-gray-500">
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
