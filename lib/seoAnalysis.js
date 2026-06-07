// Lightweight, dependency-free SEO + readability analyzer used by the blog
// editor to give WordPress/Yoast-style real-time feedback.

export const stripHtml = (html = '') =>
  html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

export const countWords = (text = '') => {
  const clean = text.trim();
  if (!clean) return 0;
  return clean.split(/\s+/).filter(Boolean).length;
};

const countMatches = (haystack, needle) => {
  if (!haystack || !needle) return 0;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = haystack.match(new RegExp(`\\b${escaped}\\b`, 'gi'));
  return matches ? matches.length : 0;
};

const firstParagraph = (html = '') => {
  const match = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (match) return stripHtml(match[1]);
  return stripHtml(html).split(/\.\s/)[0] || '';
};

const headingsText = (html = '') => {
  const matches = html.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || [];
  return matches.map((h) => stripHtml(h));
};

const STATUS = { GOOD: 'good', OK: 'ok', BAD: 'bad' };

const sentences = (text = '') =>
  text
    .split(/[.!?]+\s/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

/**
 * Run the full analysis.
 * @returns {{ seoScore, readabilityScore, seo: Check[], readability: Check[], stats }}
 * Check = { id, label, status, text }
 */
export function analyzeContent({
  title = '',
  seoTitle = '',
  metaDescription = '',
  slug = '',
  content = '',
  focusKeyword = '',
  excerpt = '',
  coverImageAlt = ''
} = {}) {
  const plain = stripHtml(content);
  const wordCount = countWords(plain);
  const keyword = focusKeyword.trim().toLowerCase();
  const effectiveSeoTitle = (seoTitle || title || '').trim();
  const intro = firstParagraph(content).toLowerCase();
  const heads = headingsText(content);
  const headsLower = heads.join(' ').toLowerCase();
  const imgCount = (content.match(/<img/gi) || []).length;
  const imgWithAlt = (content.match(/<img[^>]*\balt\s*=\s*["'][^"']+["'][^>]*>/gi) || []).length;
  const linkCount = (content.match(/<a\s/gi) || []).length;

  const seo = [];
  const readability = [];

  // ---- SEO checks ----
  if (!keyword) {
    seo.push({
      id: 'keyword',
      label: 'Focus keyword',
      status: STATUS.BAD,
      text: 'Set a focus keyword to unlock detailed SEO analysis.'
    });
  } else {
    seo.push({
      id: 'keyword',
      label: 'Focus keyword',
      status: STATUS.GOOD,
      text: `Focus keyword set to “${focusKeyword}”.`
    });

    const inTitle = effectiveSeoTitle.toLowerCase().includes(keyword);
    seo.push({
      id: 'keyword-title',
      label: 'Keyword in SEO title',
      status: inTitle ? STATUS.GOOD : STATUS.BAD,
      text: inTitle
        ? 'The focus keyword appears in the SEO title.'
        : 'Add the focus keyword to the SEO title.'
    });

    const inMeta = metaDescription.toLowerCase().includes(keyword);
    seo.push({
      id: 'keyword-meta',
      label: 'Keyword in meta description',
      status: inMeta ? STATUS.GOOD : STATUS.BAD,
      text: inMeta
        ? 'The focus keyword appears in the meta description.'
        : 'Use the focus keyword inside the meta description.'
    });

    const inSlug = slug.toLowerCase().replace(/-/g, ' ').includes(keyword);
    seo.push({
      id: 'keyword-slug',
      label: 'Keyword in slug',
      status: inSlug ? STATUS.GOOD : STATUS.OK,
      text: inSlug
        ? 'The URL slug contains the focus keyword.'
        : 'Consider adding the focus keyword to the URL slug.'
    });

    const inIntro = intro.includes(keyword);
    seo.push({
      id: 'keyword-intro',
      label: 'Keyword in introduction',
      status: inIntro ? STATUS.GOOD : STATUS.OK,
      text: inIntro
        ? 'The focus keyword appears early in the content.'
        : 'Mention the focus keyword in the first paragraph.'
    });

    const inHeadings = headsLower.includes(keyword);
    seo.push({
      id: 'keyword-heading',
      label: 'Keyword in a subheading',
      status: inHeadings ? STATUS.GOOD : STATUS.OK,
      text: inHeadings
        ? 'A subheading includes the focus keyword.'
        : 'Add the focus keyword to at least one subheading.'
    });

    const occurrences = countMatches(plain.toLowerCase(), keyword);
    const density = wordCount ? (occurrences / wordCount) * 100 : 0;
    let densityStatus = STATUS.BAD;
    let densityText = `Keyword used ${occurrences} time(s) — density ${density.toFixed(2)}%.`;
    if (density >= 0.5 && density <= 2.5) {
      densityStatus = STATUS.GOOD;
      densityText = `Great keyword density (${density.toFixed(2)}%, ${occurrences} uses).`;
    } else if (density > 2.5) {
      densityStatus = STATUS.OK;
      densityText = `Keyword density is high (${density.toFixed(2)}%) — avoid keyword stuffing.`;
    } else if (occurrences > 0) {
      densityStatus = STATUS.OK;
      densityText = `Keyword density is low (${density.toFixed(2)}%) — use it a little more.`;
    }
    seo.push({ id: 'keyword-density', label: 'Keyword density', status: densityStatus, text: densityText });
  }

  // SEO title length
  const titleLen = effectiveSeoTitle.length;
  seo.push({
    id: 'title-length',
    label: 'SEO title length',
    status: titleLen >= 30 && titleLen <= 60 ? STATUS.GOOD : titleLen > 0 ? STATUS.OK : STATUS.BAD,
    text:
      titleLen === 0
        ? 'Add an SEO title.'
        : `${titleLen} characters (aim for 30–60).`
  });

  // Meta description length
  const metaLen = metaDescription.length;
  seo.push({
    id: 'meta-length',
    label: 'Meta description length',
    status: metaLen >= 120 && metaLen <= 160 ? STATUS.GOOD : metaLen > 0 ? STATUS.OK : STATUS.BAD,
    text:
      metaLen === 0
        ? 'Write a meta description (120–160 characters).'
        : `${metaLen} characters (aim for 120–160).`
  });

  // Content length
  seo.push({
    id: 'content-length',
    label: 'Content length',
    status: wordCount >= 600 ? STATUS.GOOD : wordCount >= 300 ? STATUS.OK : STATUS.BAD,
    text: `${wordCount} words${wordCount < 300 ? ' — aim for at least 300.' : wordCount < 600 ? ' — 600+ is ideal.' : '.'}`
  });

  // Images
  seo.push({
    id: 'images',
    label: 'Images & alt text',
    status: imgCount === 0 ? STATUS.OK : imgWithAlt === imgCount ? STATUS.GOOD : STATUS.BAD,
    text:
      imgCount === 0
        ? 'No inline images yet — visuals improve engagement.'
        : imgWithAlt === imgCount
          ? `All ${imgCount} image(s) have alt text.`
          : `${imgCount - imgWithAlt} of ${imgCount} image(s) are missing alt text.`
  });

  // Links
  seo.push({
    id: 'links',
    label: 'Outbound / internal links',
    status: linkCount > 0 ? STATUS.GOOD : STATUS.OK,
    text: linkCount > 0 ? `${linkCount} link(s) found.` : 'Add relevant links to boost authority.'
  });

  // Cover image alt
  seo.push({
    id: 'cover-alt',
    label: 'Cover image alt text',
    status: coverImageAlt.trim() ? STATUS.GOOD : STATUS.OK,
    text: coverImageAlt.trim() ? 'Cover image has descriptive alt text.' : 'Add alt text to the cover image.'
  });

  // Excerpt
  seo.push({
    id: 'excerpt',
    label: 'Excerpt',
    status: excerpt.trim().length >= 50 ? STATUS.GOOD : STATUS.OK,
    text: excerpt.trim() ? 'Excerpt present.' : 'A short excerpt improves listing previews.'
  });

  // ---- Readability checks ----
  const sents = sentences(plain);
  const avgWordsPerSentence = sents.length
    ? sents.reduce((acc, s) => acc + countWords(s), 0) / sents.length
    : 0;
  readability.push({
    id: 'sentence-length',
    label: 'Average sentence length',
    status: avgWordsPerSentence === 0 ? STATUS.BAD : avgWordsPerSentence <= 20 ? STATUS.GOOD : avgWordsPerSentence <= 25 ? STATUS.OK : STATUS.BAD,
    text: avgWordsPerSentence
      ? `${avgWordsPerSentence.toFixed(1)} words per sentence (aim ≤ 20).`
      : 'Add content to measure readability.'
  });

  const paragraphs = (content.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || []).map((p) => countWords(stripHtml(p)));
  const longParas = paragraphs.filter((w) => w > 150).length;
  readability.push({
    id: 'paragraph-length',
    label: 'Paragraph length',
    status: paragraphs.length === 0 ? STATUS.OK : longParas === 0 ? STATUS.GOOD : STATUS.OK,
    text:
      paragraphs.length === 0
        ? 'Use paragraphs to structure the story.'
        : longParas === 0
          ? 'Paragraphs are a comfortable length.'
          : `${longParas} paragraph(s) are quite long — consider splitting.`
  });

  const headingEvery = wordCount && heads.length ? wordCount / heads.length : wordCount;
  readability.push({
    id: 'subheadings',
    label: 'Subheading distribution',
    status: wordCount < 300 ? STATUS.OK : heads.length === 0 ? STATUS.BAD : headingEvery <= 350 ? STATUS.GOOD : STATUS.OK,
    text:
      wordCount < 300
        ? 'Short post — subheadings optional.'
        : heads.length === 0
          ? 'Add subheadings to break up the text.'
          : `A subheading roughly every ${Math.round(headingEvery)} words.`
  });

  const paragraphCount = paragraphs.length;
  readability.push({
    id: 'structure',
    label: 'Content structure',
    status: paragraphCount >= 3 ? STATUS.GOOD : STATUS.OK,
    text: `${paragraphCount} paragraph(s)${imgCount ? `, ${imgCount} image(s)` : ''}.`
  });

  const score = (checks) => {
    if (!checks.length) return 0;
    const weight = { [STATUS.GOOD]: 1, [STATUS.OK]: 0.5, [STATUS.BAD]: 0 };
    const total = checks.reduce((acc, c) => acc + weight[c.status], 0);
    return Math.round((total / checks.length) * 100);
  };

  return {
    seoScore: score(seo),
    readabilityScore: score(readability),
    seo,
    readability,
    stats: {
      wordCount,
      readingTime: Math.max(1, Math.round(wordCount / 200)),
      sentenceCount: sents.length,
      paragraphCount,
      imageCount: imgCount,
      linkCount,
      keywordDensity: keyword && wordCount ? (countMatches(plain.toLowerCase(), keyword) / wordCount) * 100 : 0
    }
  };
}

export const scoreLabel = (score) => {
  if (score >= 80) return { label: 'Excellent', tone: 'good' };
  if (score >= 55) return { label: 'Good', tone: 'ok' };
  if (score >= 30) return { label: 'Needs work', tone: 'ok' };
  return { label: 'Poor', tone: 'bad' };
};
