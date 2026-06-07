import { useCallback, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { firebaseStorage } from '@/lib/firebaseClient';
import slugify from '@/lib/slugify';
import { analyzeContent } from '@/lib/seoAnalysis';
import { Button, Field, Input, Select, TextArea, Badge } from '@/components/admin/ui';
import SeoPanel from '@/components/admin/SeoPanel';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const cardClass = 'rounded-2xl border border-midnight/10 bg-white p-5 shadow-elite-sm';
const sectionLabel = 'text-xs font-semibold uppercase tracking-[0.2em] text-midnight/45';

export default function BlogEditor({ form, setField, onSave, onClose, onDelete, saving, message, user, getToken }) {
  const editorRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const analysis = useMemo(
    () =>
      analyzeContent({
        title: form.title,
        seoTitle: form.seoTitle,
        metaDescription: form.seoDescription,
        slug: form.slug,
        content: form.content,
        focusKeyword: form.focusKeyword,
        excerpt: form.excerpt,
        coverImageAlt: form.coverImageAlt
      }),
    [form]
  );

  const uploadToStorage = useCallback(
    async (file) => {
      const uid = user?.uid || 'admin';
      const storageRef = ref(firebaseStorage, `blogs/${uid}/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return getDownloadURL(snapshot.ref);
    },
    [user]
  );

  const handleEditorImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const url = await uploadToStorage(file);
        const alt = window.prompt('Alt text for accessibility (recommended):', '') || '';
        const quill = editorRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true) || { index: quill.getLength() };
          const safeAlt = alt.replace(/"/g, '&quot;');
          quill.clipboard.dangerouslyPasteHTML(range.index, `<img src="${url}" alt="${safeAlt}" />`, 'user');
        }
      } catch (error) {
        window.alert('Image upload failed.');
      } finally {
        setUploading(false);
      }
    };
  }, [uploadToStorage]);

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['blockquote', 'link', 'image'],
          ['clean']
        ],
        handlers: { image: handleEditorImageUpload }
      },
      clipboard: { matchVisual: false }
    }),
    [handleEditorImageUpload]
  );

  const quillFormats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'align', 'blockquote', 'link', 'image'];

  const handleCoverUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToStorage(file);
      setField('coverImage', url);
    } catch (error) {
      window.alert('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const insertContent = (html) => {
    const quill = editorRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection(true) || { index: quill.getLength() };
      quill.clipboard.dangerouslyPasteHTML(range.index, html, 'user');
    } else {
      setField('content', `${form.content || ''}${html}`);
    }
  };

  const updateTitle = (value) => {
    setField('title', value);
    if (!form.slug || form.slug === slugify(form.title)) {
      setField('slug', slugify(value));
    }
  };

  const applyAnalysisScores = () => ({ seoScore: analysis.seoScore, readabilityScore: analysis.readabilityScore });

  return (
    <div className="space-y-5">
      {/* Editor toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-midnight/10 bg-white px-4 py-3 shadow-elite-sm">
        <button type="button" onClick={onClose} className="inline-flex items-center gap-2 text-sm font-semibold text-midnight/60 transition hover:text-cardinal">
          ← All posts
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={form.status === 'published' ? 'good' : form.status === 'scheduled' ? 'ok' : 'neutral'}>{form.status}</Badge>
          <Button variant="ghost" onClick={() => onSave('draft', applyAnalysisScores())} disabled={saving}>
            Save draft
          </Button>
          <Button
            variant="primary"
            onClick={() => onSave(form.status === 'scheduled' ? 'scheduled' : 'published', applyAnalysisScores())}
            disabled={saving}
          >
            {saving ? 'Saving…' : form.id ? 'Update' : form.status === 'scheduled' ? 'Schedule' : 'Publish'}
          </Button>
        </div>
      </div>

      {message && <p className="rounded-xl border border-gold/30 bg-gold-50 px-4 py-2.5 text-sm text-midnight">{message}</p>}

      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
        {/* Main column */}
        <div className="space-y-5">
          <div className={cardClass}>
            <input
              value={form.title}
              onChange={(e) => updateTitle(e.target.value)}
              placeholder="Add a captivating title…"
              className="w-full bg-transparent font-garamond text-3xl font-semibold text-midnight placeholder-midnight/25 outline-none"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-midnight/45">
              <span className="text-midnight/40">Permalink:</span>
              <span className="text-cardinal">/blogs/</span>
              <input
                value={form.slug}
                onChange={(e) => setField('slug', e.target.value)}
                placeholder="post-slug"
                className="flex-1 min-w-[140px] rounded-md border border-midnight/15 bg-white px-2 py-1 text-cardinal outline-none focus:border-gold/50"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-midnight/10 bg-white p-1.5 shadow-elite-sm">
            <div className="admin-quill overflow-hidden rounded-xl bg-white">
              <ReactQuill
                ref={editorRef}
                theme="snow"
                value={form.content}
                onChange={(value) => setField('content', value)}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Tell the story…"
              />
            </div>
            {uploading && <p className="px-3 py-2 text-xs text-midnight/50">Uploading image…</p>}
          </div>

          <div className={cardClass}>
            <Field label="Excerpt" hint="A short summary shown on listing cards and previews.">
              <TextArea value={form.excerpt} onChange={(e) => setField('excerpt', e.target.value)} rows={3} placeholder="Two-sentence teaser…" />
            </Field>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish box */}
          <div className={cardClass}>
            <p className={`mb-4 ${sectionLabel}`}>Publish</p>
            <div className="space-y-3">
              <Field label="Status">
                <Select value={form.status} onChange={(e) => setField('status', e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </Select>
              </Field>
              {form.status === 'scheduled' && (
                <Field label="Schedule for" hint="The post goes live automatically at this time.">
                  <Input type="datetime-local" value={form.scheduledAt || ''} onChange={(e) => setField('scheduledAt', e.target.value)} />
                </Field>
              )}
              <Field label="Publish date">
                <Input type="date" value={form.publishedAt || ''} onChange={(e) => setField('publishedAt', e.target.value)} />
              </Field>
            </div>
            {form.id && (
              <button type="button" onClick={onDelete} className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-cardinal-500 transition hover:text-cardinal-700">
                Move to trash
              </button>
            )}
          </div>

          {/* Cover image */}
          <div className={cardClass}>
            <p className={`mb-4 ${sectionLabel}`}>Featured image</p>
            {form.coverImage ? (
              <div className="space-y-3">
                <img src={form.coverImage} alt={form.coverImageAlt || ''} className="h-36 w-full rounded-xl object-cover" />
                <button type="button" onClick={() => setField('coverImage', '')} className="text-xs font-semibold text-cardinal-500 hover:text-cardinal-700">
                  Remove image
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-midnight/20 py-8 text-center text-xs text-midnight/50 transition hover:border-gold/50">
                <span className="text-2xl">＋</span>
                Upload featured image
                <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
              </label>
            )}
            <div className="mt-3 space-y-3">
              <Field label="Alt text"><Input value={form.coverImageAlt} onChange={(e) => setField('coverImageAlt', e.target.value)} /></Field>
              <Field label="Caption"><Input value={form.coverImageCaption} onChange={(e) => setField('coverImageCaption', e.target.value)} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Credit"><Input value={form.coverImageCredit} onChange={(e) => setField('coverImageCredit', e.target.value)} /></Field>
                <Field label="Source URL"><Input value={form.coverImageSource} onChange={(e) => setField('coverImageSource', e.target.value)} /></Field>
              </div>
            </div>
          </div>

          {/* Organize */}
          <div className={`${cardClass} space-y-3`}>
            <p className={sectionLabel}>Organize</p>
            <Field label="Focus keyword" hint="The main phrase you want to rank for.">
              <Input value={form.focusKeyword} onChange={(e) => setField('focusKeyword', e.target.value)} placeholder="e.g. best school in Hazaribagh" />
            </Field>
            <Field label="Category">
              <Input value={form.category} onChange={(e) => setField('category', e.target.value)} placeholder="e.g. Campus Life" />
            </Field>
            <Field label="Tags" hint="Comma separated.">
              <Input value={form.tags} onChange={(e) => setField('tags', e.target.value)} placeholder="events, learning, campus" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Author"><Input value={form.authorName} onChange={(e) => setField('authorName', e.target.value)} /></Field>
              <Field label="Author title"><Input value={form.authorTitle} onChange={(e) => setField('authorTitle', e.target.value)} /></Field>
            </div>
          </div>

          {/* SEO meta inputs */}
          <div className={`${cardClass} space-y-3`}>
            <p className={sectionLabel}>SEO metadata</p>
            <Field label="SEO title"><Input value={form.seoTitle} onChange={(e) => setField('seoTitle', e.target.value)} /></Field>
            <Field label="Meta description"><TextArea value={form.seoDescription} onChange={(e) => setField('seoDescription', e.target.value)} rows={3} /></Field>
            <Field label="SEO keywords"><Input value={form.seoKeywords} onChange={(e) => setField('seoKeywords', e.target.value)} /></Field>
            <Field label="Canonical URL"><Input value={form.canonicalUrl} onChange={(e) => setField('canonicalUrl', e.target.value)} placeholder="https://…" /></Field>
          </div>

          {/* SEO analysis + Gemini */}
          <SeoPanel form={form} analysis={analysis} onChange={setField} onInsertContent={insertContent} getToken={getToken} />
        </div>
      </div>
    </div>
  );
}
