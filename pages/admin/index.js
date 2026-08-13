import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import useAdminAuth from '@/lib/useAdminAuth';
import LoginScreen from '@/components/admin/LoginScreen';
import AdminShell from '@/components/admin/AdminShell';
import DashboardOverview from '@/components/admin/DashboardOverview';
import BlogManager from '@/components/admin/BlogManager';
import PopupsManager from '@/components/admin/PopupsManager';
import MediaManager from '@/components/admin/MediaManager';
import { Spinner } from '@/components/admin/ui';

const SECTIONS = ['dashboard', 'media', 'blogs', 'popups'];

export default function AdminPortal() {
  const router = useRouter();
  const {
    phase,
    user,
    profile,
    error,
    notice,
    busy,
    signIn,
    changePassword,
    resetPassword,
    logout,
    getFreshToken
  } = useAdminAuth();
  const [section, setSection] = useState('dashboard');

  // Sync section <-> ?tab= query param for shareable deep links.
  useEffect(() => {
    const tab = router.query.tab;
    if (typeof tab === 'string' && SECTIONS.includes(tab)) {
      setSection(tab);
    }
  }, [router.query.tab]);

  const changeSection = (next) => {
    setSection(next);
    router.push({ pathname: '/admin', query: { tab: next } }, undefined, { shallow: true });
  };

  const head = (
    <Head>
      <title>Admin Portal · The Elden Heights School</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );

  if (phase === 'loading') {
    return (
      <>
        {head}
        <div className="flex min-h-screen items-center justify-center bg-ivory">
          <Spinner label="Loading portal…" />
        </div>
      </>
    );
  }

  if (phase !== 'authorised') {
    return (
      <>
        {head}
        <LoginScreen
          phase={phase}
          error={error}
          notice={notice}
          busy={busy}
          onSignIn={signIn}
          onChangePassword={changePassword}
          onResetPassword={resetPassword}
          onLogout={logout}
        />
      </>
    );
  }

  return (
    <>
      {head}
      <AdminShell section={section} onSection={changeSection} profile={profile} onLogout={logout}>
        {section === 'dashboard' && (
          <DashboardOverview profile={profile} getToken={getFreshToken} onNavigate={changeSection} />
        )}
        {section === 'media' && <MediaManager user={user} getToken={getFreshToken} />}
        {section === 'blogs' && <BlogManager user={user} getToken={getFreshToken} />}
        {section === 'popups' && <PopupsManager user={user} getToken={getFreshToken} />}
      </AdminShell>
    </>
  );
}
