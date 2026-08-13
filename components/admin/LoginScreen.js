import { Spinner } from '@/components/admin/ui';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C41.6 36.9 44 31.1 44 24c0-1.3-.1-2.3-.4-3.5z" />
  </svg>
);

export default function LoginScreen({ phase, error, onSignIn }) {
  const verifying = phase === 'verifying';
  const denied = phase === 'denied';

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-parchment px-6 text-midnight">
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-gold/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[480px] w-[480px] rounded-full bg-cardinal/10 blur-[150px]" />

      <div className="relative w-full max-w-md rounded-none border border-midnight/10 bg-white p-10 shadow-elite-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-gold opacity-70" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-gold-700">
            Elden Heights · Control Room
          </span>
        </div>

        <h1 className="mt-6 font-garamond text-3xl font-semibold leading-tight text-midnight">The Admin Portal</h1>
        <p className="mt-3 text-sm leading-relaxed text-midnight/60">
          Securely manage blogs, SEO, and on-site popups. Sign in with an authorised Google account to continue.
        </p>

        <div className="mt-8">
          {verifying ? (
            <div className="flex items-center justify-center rounded-full border border-midnight/10 bg-[#faf8f3] py-3">
              <Spinner label="Verifying access…" />
            </div>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-midnight/15 bg-white px-6 py-3.5 text-sm font-semibold text-midnight transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_18px_36px_-18px_rgba(10,10,12,0.3)]"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          )}
        </div>

        {denied && (
          <div className="mt-5 rounded-2xl border border-cardinal-200 bg-cardinal-50 p-4 text-sm text-cardinal-700">
            {error || 'This Google account is not authorised for the admin portal.'}
          </div>
        )}
        {error && !denied && <p className="mt-5 text-sm text-cardinal-600">{error}</p>}

        <p className="mt-8 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-midnight/40">
          Restricted Access · Authorised Personnel Only
        </p>
      </div>
    </div>
  );
}
