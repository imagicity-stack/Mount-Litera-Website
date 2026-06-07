// The admin portal now lives at /admin. This route permanently redirects any
// old /blogs/admin links (and bookmarks) to the new location.
export default function BlogAdminRedirect() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/admin?tab=blogs',
      permanent: true
    }
  };
}
