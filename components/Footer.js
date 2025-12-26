import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
  <footer className="bg-parchment border-t border-cardinal/10">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 px-6 py-10 text-sm text-midnight md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/website/shield.png"
            alt="The Elden Heights School shield"
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <div>
            <p className="text-base font-semibold font-garamond">The Elden Heights School</p>
            <p className="text-xs uppercase tracking-[0.3em] text-cardinal/70">Towards Eternal Glory</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-midnight/70 md:flex-nowrap md:justify-end">
          <Link href="/privacy-policy" className="hover:text-cardinal transition-colors">
            Privacy Policy
          </Link>
          <Link href="/policies/admission-policy" className="hover:text-cardinal transition-colors">
            Admission Policy
          </Link>
          <Link href="/disclosures" className="hover:text-cardinal transition-colors">
            Disclosures
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-cardinal transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
