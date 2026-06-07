import { requireAdmin } from '@/lib/adminAuth';

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const ENDPOINT = (model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

const stripHtml = (html = '') =>
  html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const PROMPTS = {
  seoTitle: (c) =>
    `You are an expert SEO copywriter for a premium school website ("The Elden Heights School", Hazaribagh, Jharkhand). Write ONE compelling, click-worthy SEO title (50-60 characters) for the article below. Naturally include the focus keyword if provided. Return ONLY the title text, no quotes.\n\nFocus keyword: ${c.focusKeyword || 'N/A'}\nWorking title: ${c.title}\nContent: ${c.content}`,
  metaDescription: (c) =>
    `Write ONE meta description (between 140 and 158 characters) for the article below. It must be persuasive, include the focus keyword naturally, and end with a soft call to action. Return ONLY the description text, no quotes.\n\nFocus keyword: ${c.focusKeyword || 'N/A'}\nTitle: ${c.title}\nContent: ${c.content}`,
  excerpt: (c) =>
    `Write a warm, engaging excerpt (2 sentences, ~30 words) that summarises the article and entices readers to click. Return ONLY the excerpt text.\n\nTitle: ${c.title}\nContent: ${c.content}`,
  keywords: (c) =>
    `Suggest the 8 best SEO keywords/phrases (mix of short and long-tail) for the article below, ranked by ranking potential for a school in Hazaribagh, Jharkhand, India. Return ONLY a JSON array of strings, e.g. ["keyword one","keyword two"].\n\nTitle: ${c.title}\nContent: ${c.content}`,
  titles: (c) =>
    `Generate 5 alternative, engaging blog titles for the article below. Vary the angle (curiosity, benefit, listicle, how-to, emotional). Return ONLY a JSON array of strings.\n\nFocus keyword: ${c.focusKeyword || 'N/A'}\nCurrent title: ${c.title}\nContent: ${c.content}`,
  outline: (c) =>
    `Create a clear blog outline with an intro, 4-6 H2 subheadings (each with 1 sentence describing the section), and a conclusion, for the topic below. Format as clean HTML using <h2> and <p> tags only. Return ONLY the HTML.\n\nTopic / title: ${c.title}\nFocus keyword: ${c.focusKeyword || 'N/A'}\nNotes: ${c.content || 'none'}`,
  improve: (c) =>
    `You are an SEO and editorial expert. Review the article below and give 5-7 specific, actionable suggestions to improve its SEO and readability. Be concrete (mention keyword usage, structure, length, internal links, headings, meta data). Return ONLY a JSON array of short suggestion strings.\n\nFocus keyword: ${c.focusKeyword || 'N/A'}\nTitle: ${c.title}\nMeta description: ${c.metaDescription || 'none'}\nContent: ${c.content}`,
  altText: (c) =>
    `Write concise, descriptive, SEO-friendly alt text (max 120 characters) for an image used in this article. Return ONLY the alt text.\n\nArticle title: ${c.title}\nImage context: ${c.imageContext || 'cover image'}`
};

const JSON_ACTIONS = new Set(['keywords', 'titles', 'improve']);

const callGemini = async (apiKey, prompt) => {
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
  };

  const tryModel = async (model) => {
    const res = await fetch(`${ENDPOINT(model)}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return res;
  };

  let res = await tryModel(MODEL);
  // If the configured model is unavailable, fall back to a widely-available one.
  if (res.status === 404 && MODEL !== 'gemini-1.5-flash') {
    res = await tryModel('gemini-1.5-flash');
  }

  const data = await res.json();
  if (!res.ok) {
    const message = data?.error?.message || 'Gemini request failed.';
    throw new Error(message);
  }
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
  return text.trim();
};

const parseList = (text) => {
  // Try to pull a JSON array out of the model response.
  const match = text.match(/\[[\s\S]*\]/);
  if (match) {
    try {
      const arr = JSON.parse(match[0]);
      if (Array.isArray(arr)) return arr.map((x) => String(x)).filter(Boolean);
    } catch (error) {
      /* fall through */
    }
  }
  return text
    .split('\n')
    .map((line) => line.replace(/^[\s\-*\d.)"]+/, '').replace(/"$/, '').trim())
    .filter(Boolean);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return undefined;

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      message: 'Gemini is not configured. Add GEMINI_API_KEY in your Vercel environment variables.'
    });
  }

  const { action, context = {} } = req.body || {};
  const builder = PROMPTS[action];
  if (!builder) {
    return res.status(400).json({ message: `Unknown AI action: ${action}` });
  }

  const safeContext = {
    ...context,
    title: (context.title || '').slice(0, 300),
    metaDescription: (context.metaDescription || '').slice(0, 400),
    content: stripHtml(context.content || '').slice(0, 6000)
  };

  try {
    const raw = await callGemini(apiKey, builder(safeContext));
    if (JSON_ACTIONS.has(action)) {
      return res.status(200).json({ action, items: parseList(raw) });
    }
    // Clean wrapping quotes for single-value responses.
    const cleaned = raw.replace(/^["']|["']$/g, '').trim();
    return res.status(200).json({ action, result: cleaned });
  } catch (error) {
    return res.status(502).json({ message: error.message || 'AI request failed.' });
  }
}
