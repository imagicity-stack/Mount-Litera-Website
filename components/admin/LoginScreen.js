import { useState } from 'react';

import { Spinner } from '@/components/admin/ui';

const fieldClass =
  'w-full border border-midnight/20 bg-white px-4 py-3 text-sm text-midnight outline-none transition focus:border-midnight focus:shadow-[inset_0_0_0_1px_#141414] disabled:bg-ivory disabled:text-midnight/60';

const labelClass =
  'block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-midnight/60';

function Frame({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6 py-16 text-midnight">
      <div className="w-full max-w-md border border-hairline bg-white p-10">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-crimson">
          The Elden Heights School
        </p>
        <span className="mt-5 block h-[3px] w-full bg-ink" />
        {children}
      </div>
    </div>
  );
}

function Message({ tone = 'error', children }) {
  if (!children) return null;
  return (
    <p
      className={`mt-5 border-l-[3px] px-4 py-3 text-sm ${
        tone === 'error'
          ? 'border-crimson bg-crimson-50 text-crimson-700'
          : 'border-ink bg-ivory text-midnight'
      }`}
    >
      {children}
    </p>
  );
}

/**
 * The portal gate. Handles three states with one visual language: signing in,
 * the mandatory first-run password change, and the reset-link request.
 */
export default function LoginScreen({
  phase,
  error,
  notice,
  busy,
  onSignIn,
  onChangePassword,
  onResetPassword,
  onLogout
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [nextPassword, setNextPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [mode, setMode] = useState('sign-in'); // sign-in | reset

  const verifying = phase === 'verifying';
  const denied = phase === 'denied';
  const mustChange = phase === 'must-change-password';
  const shownError = localError || error;

  // ------------------------------------------------ mandatory password change
  if (mustChange) {
    const submitChange = async (event) => {
      event.preventDefault();
      setLocalError('');

      if (nextPassword !== confirmPassword) {
        setLocalError('The two new passwords do not match.');
        return;
      }

      const ok = await onChangePassword(currentPassword, nextPassword);
      if (ok) {
        setCurrentPassword('');
        setNextPassword('');
        setConfirmPassword('');
      }
    };

    return (
      <Frame>
        <h1 className="mt-8 font-display text-3xl font-medium leading-tight text-midnight">
          Set your password
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-midnight/70">
          This account is still using the password it was issued with. Choose a new one to finish
          setting up the portal — you will not be able to continue until you do.
        </p>

        <form onSubmit={submitChange} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="current-password" className={labelClass}>
              Current password
            </label>
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="new-password" className={labelClass}>
              New password
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={nextPassword}
              onChange={(e) => setNextPassword(e.target.value)}
              required
              minLength={8}
              className={fieldClass}
            />
            <span className="block text-xs text-midnight/50">At least 8 characters.</span>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className={labelClass}>
              Confirm new password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className={fieldClass}
            />
          </div>

          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            {busy ? 'Saving…' : 'Save password and continue'}
          </button>
        </form>

        <Message tone="error">{shownError}</Message>
        <Message tone="info">{notice}</Message>

        <button
          type="button"
          onClick={onLogout}
          className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-midnight/45 transition hover:text-crimson"
        >
          Sign out
        </button>
      </Frame>
    );
  }

  // --------------------------------------------------------- reset-link request
  if (mode === 'reset') {
    const submitReset = async (event) => {
      event.preventDefault();
      await onResetPassword(email);
    };

    return (
      <Frame>
        <h1 className="mt-8 font-display text-3xl font-medium leading-tight text-midnight">
          Reset your password
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-midnight/70">
          Enter the administrator address and we will email a reset link.
        </p>

        <form onSubmit={submitReset} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="reset-email" className={labelClass}>
              Administrator email
            </label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              placeholder="you@eldenheights.org"
              className={fieldClass}
            />
          </div>

          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            {busy ? 'Sending…' : 'Send reset link'}
          </button>
        </form>

        <Message tone="error">{shownError}</Message>
        <Message tone="info">{notice}</Message>

        <button
          type="button"
          onClick={() => {
            setMode('sign-in');
            setLocalError('');
          }}
          className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-midnight/45 transition hover:text-crimson"
        >
          ← Back to sign in
        </button>
      </Frame>
    );
  }

  // ------------------------------------------------------------------ sign in
  const submitSignIn = async (event) => {
    event.preventDefault();
    setLocalError('');
    await onSignIn(email, password);
    setPassword('');
  };

  return (
    <Frame>
      <h1 className="mt-8 font-display text-3xl font-medium leading-tight text-midnight">
        The Admin Portal
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-midnight/70">
        Manage site images, journal entries, and on-site popups. Access is restricted to the
        administrator account.
      </p>

      <form onSubmit={submitSignIn} className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="admin-email" className={labelClass}>
            Administrator email
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            placeholder="you@eldenheights.org"
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="admin-password" className={labelClass}>
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          disabled={busy || verifying}
          className="btn-primary w-full disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      {verifying && (
        <div className="mt-5 flex items-center justify-center border border-hairline bg-ivory py-3">
          <Spinner label="Verifying access…" />
        </div>
      )}

      <Message tone="error">{denied ? shownError || 'This account is not authorised.' : shownError}</Message>
      <Message tone="info">{notice}</Message>

      <button
        type="button"
        onClick={() => {
          setMode('reset');
          setLocalError('');
        }}
        className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-midnight/45 transition hover:text-crimson"
      >
        Forgotten your password?
      </button>

      <p className="mt-8 border-t border-hairline pt-5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-midnight/35">
        Restricted access · Authorised personnel only
      </p>
    </Frame>
  );
}
