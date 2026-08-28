import { useState } from 'react';
import Link from 'next/link';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6V11h-6v9Zm0-16v5h6V4h-6Z' },
  { id: 'media', label: 'Site Images', icon: 'M4 5h16v14H4V5Zm0 10 4.5-4.5 3.5 3.5 3-3L20 15M9 9.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' },
  { id: 'people', label: 'People', icon: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M12 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm9 12v-1a4 4 0 0 0-3-3.9M16.5 3.6a3.5 3.5 0 0 1 0 6.8' },
  { id: 'blogs', label: 'Blogs', icon: 'M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm2 5h8M7 13h8M7 17h5' },
  { id: 'popups', label: 'Popups', icon: 'M4 5h16v11H13l-4 3v-3H4V5Z' }
];

export default function AdminShell({ section, onSection, profile, onLogout, children }) {
  const [mobileNav, setMobileNav] = useState(false);

  const NavItems = ({ onPick }) => (
    <nav className="space-y-1.5">
      {NAV.map((item) => {
        const active = section === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onSection(item.id);
              onPick?.();
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              active
                ? 'bg-cardinal/10 text-cardinal shadow-[inset_0_0_0_1px_rgba(138,10,18,0.15)]'
                : 'text-midnight/60 hover:bg-midnight/[0.04] hover:text-midnight'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
            </svg>
            {item.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-midnight">
      <div className="mx-auto flex w-full max-w-[1500px]">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 flex-col border-r border-midnight/10 bg-white px-5 py-7 lg:flex">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-garamond text-xl font-semibold tracking-tight text-midnight">Elden Heights</span>
          </Link>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-700">Admin Studio</span>

          <div className="mt-8 flex-1">
            <NavItems />
          </div>

          <div className="mt-6 rounded-2xl border border-midnight/10 bg-[#faf8f3] p-4">
            <div className="flex items-center gap-3">
              {profile?.picture ? (
                <img src={profile.picture} alt="" className="h-9 w-9 rounded-full" referrerPolicy="no-referrer" />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cardinal/10 text-sm font-semibold text-cardinal">
                  {(profile?.name || profile?.email || 'A').charAt(0).toUpperCase()}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-midnight">{profile?.name || 'Administrator'}</p>
                <p className="truncate text-[10px] text-midnight/50">{profile?.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="mt-3 w-full rounded-lg border border-midnight/15 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-midnight/60 transition hover:border-cardinal/40 hover:text-cardinal"
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-midnight/10 bg-white/80 px-5 py-4 backdrop-blur-xl lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileNav((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-midnight/15 lg:hidden"
                aria-label="Toggle navigation"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              </button>
              <h1 className="font-garamond text-xl font-semibold capitalize text-midnight">{section}</h1>
            </div>
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-full border border-midnight/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-midnight/60 transition hover:border-gold/50 hover:text-cardinal sm:inline-flex"
            >
              View Site ↗
            </Link>
          </header>

          {/* Mobile nav drawer */}
          {mobileNav && (
            <div className="border-b border-midnight/10 bg-white px-5 py-4 lg:hidden">
              <NavItems onPick={() => setMobileNav(false)} />
              <button
                type="button"
                onClick={onLogout}
                className="mt-4 w-full rounded-lg border border-midnight/15 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-midnight/60"
              >
                Sign out ({profile?.email})
              </button>
            </div>
          )}

          <main className="px-5 py-7 lg:px-8 lg:py-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
