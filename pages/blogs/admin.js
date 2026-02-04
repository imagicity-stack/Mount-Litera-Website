import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { firebaseAuth, firebaseStorage } from '@/lib/firebaseClient';
import slugify from '@/lib/slugify';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  authorName: '',
  authorTitle: '',
  tags: '',
  status: 'draft',
  seoTitle: '',
  seoDescription: '',
  publishedAt: ''
};

const formatTimestamp = (timestamp) => {
  if (!timestamp) return '—';
  const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export default function BlogAdminPage() {
  const [authState, setAuthState] = useState({ status: 'loading', user: null, token: '' });
  const [adminState, setAdminState] = useState({ checking: false, isAdmin: false, error: '' });
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [login, setLogin] = useState({ email: '', password: '', error: '' });
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setAuthState({ status: 'ready', user, token });
      } else {
        setAuthState({ status: 'ready', user: null, token: '' });
        setAdminState({ checking: false, isAdmin: false, error: '' });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authState.user || !authState.token) return;

    const verifyAdmin = async () => {
      setAdminState((prev) => ({ ...prev, checking: true, error: '' }));
      try {
        const res = await fetch('/api/admin/verify', {
          headers: { Authorization: `Bearer ${authState.token}` }
        });
        const data = await res.json();
        if (!res.ok || !data.isAdmin) {
          setAdminState({ checking: false, isAdmin: false, error: 'Admin access required.' });
          return;
        }
        setAdminState({ checking: false, isAdmin: true, error: '' });
      } catch (error) {
        setAdminState({ checking: false, isAdmin: false, error: 'Unable to verify admin.' });
      }
    };

    verifyAdmin();
  }, [authState.user, authState.token]);

  useEffect(() => {
    if (!adminState.isAdmin) return;

    const loadBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data.blogs || []);
    };

    loadBlogs();
  }, [adminState.isAdmin]);

  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => {
      const aDate = a.updatedAt || a.createdAt;
      const bDate = b.updatedAt || b.createdAt;
      return new Date(bDate || 0) - new Date(aDate || 0);
    });
  }, [blogs]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLogin((prev) => ({ ...prev, error: '' }));
    try {
      await signInWithEmailAndPassword(firebaseAuth, login.email, login.password);
    } catch (error) {
      setLogin((prev) => ({ ...prev, error: 'Login failed. Check credentials.' }));
    }
  };

  const handleLogout = async () => {
    await signOut(firebaseAuth);
    setBlogs([]);
    setForm(emptyForm);
    setSelectedId(null);
  };

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'title' ? { slug: prev.slug ? prev.slug : slugify(value) } : {})
    }));
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !authState.user) return;
    setUploading(true);
    setMessage('');

    try {
      const storageRef = ref(firebaseStorage, `blogs/${authState.user.uid}/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      updateForm('coverImage', url);
    } catch (error) {
      setMessage('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const saveBlog = async () => {
    if (!form.title || !form.content) {
      setMessage('Title and content are required.');
      return;
    }

    setSaving(true);
    setMessage('');
    const payload = {
      ...form,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      publishedAt: form.publishedAt || null
    };

    try {
      const res = await fetch(selectedId ? `/api/blogs/${selectedId}` : '/api/blogs', {
        method: selectedId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authState.token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Unable to save.');
      }

      const fresh = await fetch('/api/blogs');
      const data = await fresh.json();
      setBlogs(data.blogs || []);
      setMessage(selectedId ? 'Blog updated.' : 'Blog published.');
      setForm(emptyForm);
      setSelectedId(null);
    } catch (error) {
      setMessage(error.message || 'Unable to save blog.');
    } finally {
      setSaving(false);
    }
  };

  const editBlog = (blog) => {
    setSelectedId(blog.id);
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      coverImage: blog.coverImage || '',
      authorName: blog.authorName || '',
      authorTitle: blog.authorTitle || '',
      tags: (blog.tags || []).join(', '),
      status: blog.status || 'draft',
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
      publishedAt: blog.publishedAt
        ? new Date(blog.publishedAt).toISOString().split('T')[0]
        : ''
    });
    setMessage('');
  };

  const deleteBlog = async (blogId) => {
    if (!blogId) return;
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authState.token}` }
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Unable to delete.');
      }
      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
      setMessage('Blog deleted.');
      if (selectedId === blogId) {
        setForm(emptyForm);
        setSelectedId(null);
      }
    } catch (error) {
      setMessage(error.message || 'Unable to delete.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Seo path="/blogs/admin" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1 bg-[#f8f4ef]">
          <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cardinal">Blog Studio</p>
                <h1 className="text-3xl sm:text-4xl font-semibold text-black">
                  Manage stories like a modern newsroom.
                </h1>
              </div>
              <Link
                href="/blogs"
                className="rounded-full border border-black/30 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:border-black"
              >
                View Blog Page
              </Link>
            </div>

            {!authState.user && authState.status === 'ready' && (
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center rounded-3xl border border-black/10 bg-white p-8 shadow-xl shadow-cardinal/10">
                <form onSubmit={handleLogin} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-black">Admin login</h2>
                  <p className="text-gray-600">
                    Use your Firebase admin account credentials to access the blog CMS.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={login.email}
                      onChange={(event) => setLogin((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="Admin email"
                      className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                      required
                    />
                    <input
                      type="password"
                      value={login.password}
                      onChange={(event) => setLogin((prev) => ({ ...prev, password: event.target.value }))}
                      placeholder="Password"
                      className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                      required
                    />
                  </div>
                  {login.error && <p className="text-sm text-red-600">{login.error}</p>}
                  <button
                    type="submit"
                    className="rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-cardinal"
                  >
                    Sign in
                  </button>
                </form>
                <div className="rounded-2xl border border-black/10 bg-[#fefaf5] p-6">
                  <h3 className="text-lg font-semibold text-black">What you can do</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>Create and edit stories with SEO metadata.</li>
                    <li>Upload cover images to Firebase Storage.</li>
                    <li>Publish instantly or save as drafts.</li>
                    <li>Organize posts with tags and authors.</li>
                  </ul>
                </div>
              </div>
            )}

            {authState.user && adminState.checking && (
              <div className="rounded-3xl border border-black/10 bg-white p-8 text-center text-gray-600">
                Verifying admin access...
              </div>
            )}

            {authState.user && adminState.error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
                {adminState.error}
              </div>
            )}

            {authState.user && adminState.isAdmin && (
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                <aside className="space-y-6">
                  <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xl shadow-cardinal/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Signed in</p>
                        <p className="text-lg font-semibold text-black">{authState.user.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-cardinal"
                      >
                        Sign out
                      </button>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Total posts</span>
                        <span className="font-semibold text-black">{blogs.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Published</span>
                        <span className="font-semibold text-black">
                          {blogs.filter((blog) => blog.status === 'published').length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Drafts</span>
                        <span className="font-semibold text-black">
                          {blogs.filter((blog) => blog.status !== 'published').length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xl shadow-cardinal/5">
                    <h3 className="text-lg font-semibold text-black">Recent posts</h3>
                    <div className="mt-4 space-y-4">
                      {sortedBlogs.map((blog) => (
                        <div
                          key={blog.id}
                          className="rounded-2xl border border-black/10 bg-[#fefaf5] p-4 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-black">{blog.title}</p>
                              <p className="text-xs text-gray-500">
                                {formatTimestamp(blog.updatedAt)} · {blog.status}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => editBlog(blog)}
                              className="text-xs font-semibold uppercase tracking-[0.2em] text-cardinal"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{blog.authorName || 'Editorial Team'}</span>
                            <span>•</span>
                            <span>{blog.readingTime || 1} min</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => deleteBlog(blog.id)}
                              className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600"
                              disabled={saving}
                            >
                              Delete
                            </button>
                            <Link
                              href={`/blogs/${blog.slug}`}
                              className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
                            >
                              Preview
                            </Link>
                          </div>
                        </div>
                      ))}
                      {sortedBlogs.length === 0 && (
                        <p className="text-sm text-gray-600">No blogs yet. Create the first post.</p>
                      )}
                    </div>
                  </div>
                </aside>

                <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-xl shadow-cardinal/10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-black">Story editor</h2>
                      <p className="text-sm text-gray-600">
                        Craft a story with SEO-ready details and publish instantly.
                      </p>
                    </div>
                    {selectedId && (
                      <button
                        type="button"
                        onClick={() => {
                          setForm(emptyForm);
                          setSelectedId(null);
                          setMessage('');
                        }}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600"
                      >
                        Clear form
                      </button>
                    )}
                  </div>

                  <div className="mt-6 grid gap-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Title</label>
                        <input
                          type="text"
                          value={form.title}
                          onChange={(event) => updateForm('title', event.target.value)}
                          className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Slug</label>
                        <input
                          type="text"
                          value={form.slug}
                          onChange={(event) => updateForm('slug', event.target.value)}
                          className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Author name</label>
                        <input
                          type="text"
                          value={form.authorName}
                          onChange={(event) => updateForm('authorName', event.target.value)}
                          className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Author title</label>
                        <input
                          type="text"
                          value={form.authorTitle}
                          onChange={(event) => updateForm('authorTitle', event.target.value)}
                          className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Tags</label>
                        <input
                          type="text"
                          value={form.tags}
                          onChange={(event) => updateForm('tags', event.target.value)}
                          placeholder="events, learning, campus"
                          className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Status</label>
                        <select
                          value={form.status}
                          onChange={(event) => updateForm('status', event.target.value)}
                          className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Excerpt</label>
                      <textarea
                        value={form.excerpt}
                        onChange={(event) => updateForm('excerpt', event.target.value)}
                        rows={3}
                        className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Story content</label>
                      <textarea
                        value={form.content}
                        onChange={(event) => updateForm('content', event.target.value)}
                        rows={8}
                        className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-gray-500">SEO title</label>
                        <input
                          type="text"
                          value={form.seoTitle}
                          onChange={(event) => updateForm('seoTitle', event.target.value)}
                          className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-gray-500">SEO description</label>
                        <input
                          type="text"
                          value={form.seoDescription}
                          onChange={(event) => updateForm('seoDescription', event.target.value)}
                          className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Publish date</label>
                        <input
                          type="date"
                          value={form.publishedAt}
                          onChange={(event) => updateForm('publishedAt', event.target.value)}
                          className="w-full rounded-2xl border border-black/20 px-4 py-3 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Cover image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUpload}
                          className="w-full rounded-2xl border border-dashed border-black/20 px-4 py-3 text-sm"
                        />
                        {uploading && <p className="text-xs text-gray-500">Uploading image...</p>}
                        {form.coverImage && (
                          <img
                            src={form.coverImage}
                            alt="Cover preview"
                            className="mt-2 h-28 w-full rounded-2xl object-cover"
                          />
                        )}
                      </div>
                    </div>

                    {message && (
                      <p className="rounded-2xl border border-black/10 bg-[#fefaf5] px-4 py-3 text-sm text-gray-700">
                        {message}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={saveBlog}
                        className="rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-cardinal disabled:opacity-70"
                        disabled={saving}
                      >
                        {saving ? 'Saving...' : selectedId ? 'Update story' : 'Publish story'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setForm(emptyForm);
                          setSelectedId(null);
                        }}
                        className="rounded-full border border-black/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
