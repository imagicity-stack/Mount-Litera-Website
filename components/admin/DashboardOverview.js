import { useEffect, useState } from 'react';
import { Button } from '@/components/admin/ui';

const StatCard = ({ label, value, sub, accent }) => (
  <div className="rounded-2xl border border-midnight/10 bg-white p-5 shadow-elite-sm">
    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-midnight/45">{label}</p>
    <p className="mt-2 font-garamond text-3xl font-semibold text-midnight" style={accent ? { color: accent } : undefined}>
      {value}
    </p>
    {sub && <p className="mt-1 text-xs text-midnight/45">{sub}</p>}
  </div>
);

const formatDate = (value) => {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

export default function DashboardOverview({ profile, getToken, onNavigate }) {
  const [blogs, setBlogs] = useState([]);
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        const token = await getToken();
        const [blogsRes, popupsRes] = await Promise.all([
          fetch('/api/blogs', { cache: 'no-store' }),
          fetch('/api/popups?all=1', { cache: 'no-store', headers: { Authorization: `Bearer ${token}` } })
        ]);
        const blogsData = await blogsRes.json();
        const popupsData = await popupsRes.json();
        if (mounted) {
          setBlogs(blogsData.blogs || []);
          setPopups(popupsData.popups || []);
        }
      } catch (error) {
        /* ignore */
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [getToken]);

  const published = blogs.filter((b) => b.status === 'published').length;
  const drafts = blogs.filter((b) => b.status === 'draft').length;
  const scheduled = blogs.filter((b) => b.status === 'scheduled').length;
  const activePopups = popups.filter((p) => p.status === 'active').length;
  const impressions = popups.reduce((acc, p) => acc + (p.impressions || 0), 0);
  const clicks = popups.reduce((acc, p) => acc + (p.clicks || 0), 0);
  const recent = [...blogs]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 5);

  const firstName = (profile?.name || 'there').split(' ')[0];

  return (
    <div className="space-y-7">
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-r from-gold-50 via-white to-white p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-700">Welcome back</p>
        <h2 className="mt-2 font-garamond text-3xl font-semibold text-midnight">Hello, {firstName} 👋</h2>
        <p className="mt-2 max-w-2xl text-sm text-midnight/60">
          This is your control room for stories and on-site campaigns. Everything you publish here goes live on
          eldenheights.org with full SEO support powered by Gemini.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => onNavigate('blogs')}>Write a post</Button>
          <Button variant="ghost" onClick={() => onNavigate('popups')}>Create a popup</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Published posts" value={loading ? '…' : published} sub={`${drafts} drafts · ${scheduled} scheduled`} accent="#8E6A24" />
        <StatCard label="Active popups" value={loading ? '…' : activePopups} sub={`${popups.length} total`} />
        <StatCard label="Popup views" value={loading ? '…' : impressions.toLocaleString('en-IN')} sub="All-time impressions" />
        <StatCard
          label="Popup clicks"
          value={loading ? '…' : clicks.toLocaleString('en-IN')}
          sub={impressions ? `${((clicks / impressions) * 100).toFixed(1)}% CTR` : 'No data yet'}
        />
      </div>

      <div className="rounded-2xl border border-midnight/10 bg-white p-5 shadow-elite-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-garamond text-lg font-semibold text-midnight">Recent posts</h3>
          <button type="button" onClick={() => onNavigate('blogs')} className="text-xs font-semibold text-cardinal hover:text-cardinal-700">
            View all →
          </button>
        </div>
        {loading ? (
          <p className="py-6 text-center text-sm text-midnight/50">Loading…</p>
        ) : recent.length === 0 ? (
          <p className="py-6 text-center text-sm text-midnight/50">No posts yet.</p>
        ) : (
          <div className="divide-y divide-midnight/5">
            {recent.map((blog) => (
              <div key={blog.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-midnight">{blog.title}</p>
                  <p className="text-xs text-midnight/45">
                    {blog.status} · {formatDate(blog.updatedAt || blog.createdAt)}
                  </p>
                </div>
                <a href={`/blogs/${blog.slug}`} target="_blank" rel="noreferrer" className="text-xs font-semibold text-midnight/50 hover:text-cardinal">
                  View ↗
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
