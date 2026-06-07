import { useCallback, useEffect, useMemo, useState } from 'react';
import { Badge, Button, Input } from '@/components/admin/ui';
import { stripHtml } from '@/lib/seoAnalysis';
import slugify from '@/lib/slugify';
import BlogEditor from '@/components/admin/BlogEditor';

const emptyForm = {
  id: null,
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  coverImageAlt: '',
  coverImageCaption: '',
  coverImageCredit: '',
  coverImageSource: '',
  authorName: '',
  authorTitle: '',
  tags: '',
  category: '',
  status: 'draft',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  focusKeyword: '',
  canonicalUrl: '',
  publishedAt: '',
  scheduledAt: ''
};

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const toDateInput = (value) => (value ? new Date(value).toISOString().split('T')[0] : '');
const toDateTimeInput = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function BlogManager({ user, getToken, onStats }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs', { cache: 'no-store' });
      const data = await res.json();
      setBlogs(data.blogs || []);
      onStats?.(data.blogs || []);
    } catch (error) {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [onStats]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const setField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const startNew = () => {
    setForm(emptyForm);
    setMessage('');
    setEditing(true);
  };

  const startEdit = (blog) => {
    setForm({
      id: blog.id,
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      coverImage: blog.coverImage || '',
      coverImageAlt: blog.coverImageAlt || '',
      coverImageCaption: blog.coverImageCaption || '',
      coverImageCredit: blog.coverImageCredit || '',
      coverImageSource: blog.coverImageSource || '',
      authorName: blog.authorName || '',
      authorTitle: blog.authorTitle || '',
      tags: (blog.tags || []).join(', '),
      category: blog.category || '',
      status: blog.status || 'draft',
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
      seoKeywords: blog.seoKeywords || '',
      focusKeyword: blog.focusKeyword || '',
      canonicalUrl: blog.canonicalUrl || '',
      publishedAt: toDateInput(blog.publishedAt),
      scheduledAt: toDateTimeInput(blog.scheduledAt)
    });
    setMessage('');
    setEditing(true);
  };

  const save = async (statusOverride, scores = {}) => {
    if (!form.title || !stripHtml(form.content)) {
      setMessage('Title and content are required.');
      return;
    }
    if (statusOverride === 'scheduled' && !form.scheduledAt) {
      setMessage('Pick a date and time to schedule this post.');
      return;
    }
    setSaving(true);
    setMessage('');

    const status = statusOverride || form.status;
    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      coverImageAlt: form.coverImageAlt,
      coverImageCaption: form.coverImageCaption,
      coverImageCredit: form.coverImageCredit,
      coverImageSource: form.coverImageSource,
      authorName: form.authorName,
      authorTitle: form.authorTitle,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      category: form.category,
      status,
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
      seoKeywords: form.seoKeywords,
      focusKeyword: form.focusKeyword,
      canonicalUrl: form.canonicalUrl,
      publishedAt:
        status === 'published' && !form.publishedAt
          ? new Date().toISOString()
          : form.publishedAt || null,
      scheduledAt: status === 'scheduled' ? new Date(form.scheduledAt).toISOString() : null,
      seoScore: scores.seoScore ?? null,
      readabilityScore: scores.readabilityScore ?? null
    };

    try {
      const token = await getToken();
      const res = await fetch(form.id ? `/api/blogs/${form.id}` : '/api/blogs', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Unable to save.');
      }
      await loadBlogs();
      setMessage('Saved successfully.');
      setForm(emptyForm);
      setEditing(false);
    } catch (error) {
      setMessage(error.message || 'Unable to save.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!form.id) return;
    if (!window.confirm('Move this post to trash? This cannot be undone.')) return;
    setSaving(true);
    try {
      const token = await getToken();
      const res = await fetch(`/api/blogs/${form.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Unable to delete.');
      await loadBlogs();
      setForm(emptyForm);
      setEditing(false);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteFromList = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      const token = await getToken();
      await fetch(`/api/blogs/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      await loadBlogs();
    } catch (error) {
      /* ignore */
    }
  };

  const counts = useMemo(
    () => ({
      all: blogs.length,
      published: blogs.filter((b) => b.status === 'published').length,
      draft: blogs.filter((b) => b.status === 'draft').length,
      scheduled: blogs.filter((b) => b.status === 'scheduled').length
    }),
    [blogs]
  );

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return blogs
      .filter((b) => (filter === 'all' ? true : b.status === filter))
      .filter((b) => (term ? `${b.title} ${b.authorName} ${(b.tags || []).join(' ')}`.toLowerCase().includes(term) : true))
      .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
  }, [blogs, query, filter]);

  if (editing) {
    return (
      <BlogEditor
        form={form}
        setField={setField}
        onSave={save}
        onClose={() => {
          setEditing(false);
          setForm(emptyForm);
        }}
        onDelete={remove}
        saving={saving}
        message={message}
        user={user}
        getToken={getToken}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-garamond text-2xl font-semibold">Posts</h2>
          <p className="text-sm text-parchment/55">Create, optimise, and publish stories.</p>
        </div>
        <Button variant="primary" onClick={startNew}>
          <span className="text-base leading-none">＋</span> Add new post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: `All (${counts.all})` },
            { id: 'published', label: `Published (${counts.published})` },
            { id: 'draft', label: `Drafts (${counts.draft})` },
            { id: 'scheduled', label: `Scheduled (${counts.scheduled})` }
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === f.id ? 'bg-gold/15 text-gold-100' : 'text-parchment/50 hover:text-parchment'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="w-full max-w-xs">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts…" />
        </div>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="hidden grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-parchment/40 md:grid">
          <span>Title</span>
          <span>SEO</span>
          <span>Status</span>
          <span>Date</span>
          <span>Actions</span>
        </div>
        {loading ? (
          <div className="px-5 py-10 text-center text-sm text-parchment/50">Loading posts…</div>
        ) : visible.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-parchment/50">
            No posts found. Click “Add new post” to begin.
          </div>
        ) : (
          visible.map((blog) => (
            <div
              key={blog.id}
              className="grid grid-cols-1 gap-3 border-b border-white/5 px-5 py-4 transition hover:bg-white/[0.02] md:grid-cols-[1fr_auto_auto_auto_auto] md:items-center md:gap-4"
            >
              <button type="button" onClick={() => startEdit(blog)} className="text-left">
                <p className="font-semibold text-parchment line-clamp-1">{blog.title || 'Untitled'}</p>
                <p className="text-xs text-parchment/45">
                  {blog.authorName || 'Editorial Team'}
                  {blog.category ? ` · ${blog.category}` : ''}
                </p>
              </button>
              <div className="md:text-center">
                {typeof blog.seoScore === 'number' ? (
                  <Badge tone={blog.seoScore >= 80 ? 'good' : blog.seoScore >= 55 ? 'ok' : 'bad'}>{blog.seoScore}</Badge>
                ) : (
                  <span className="text-xs text-parchment/30">—</span>
                )}
              </div>
              <div>
                <Badge tone={blog.status === 'published' ? 'good' : blog.status === 'scheduled' ? 'ok' : 'neutral'}>
                  {blog.status}
                </Badge>
              </div>
              <span className="text-xs text-parchment/55">
                {formatDate(blog.publishedAt || blog.scheduledAt || blog.createdAt)}
              </span>
              <div className="flex items-center gap-3 text-xs">
                <button type="button" onClick={() => startEdit(blog)} className="font-semibold text-gold-200 hover:text-gold-100">
                  Edit
                </button>
                <a href={`/blogs/${blog.slug}`} target="_blank" rel="noreferrer" className="text-parchment/50 hover:text-parchment">
                  View
                </a>
                <button type="button" onClick={() => deleteFromList(blog.id)} className="text-cardinal-300 hover:text-cardinal-200">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
