/**
 * The school's own details — phone, address, email, social links.
 *
 * These were previously copied into five files (footer, contact section,
 * structured data, policy pages, SEO), which is how the general email came to
 * be misspelled in one of them. There is now one source: this object supplies
 * the defaults, and the portal writes overrides to `settings/site` in
 * Firestore.
 *
 * Anything a page needs about the school should be added here rather than
 * typed into markup again.
 */

export const SETTINGS_COLLECTION = 'settings';
export const SETTINGS_DOC = 'site';

export const defaultSettings = {
  schoolName: 'The Elden Heights School',
  tagline: 'Towards Eternal Glory',
  trust: 'Bhagwati Educational & Charitable Trust',

  phone: '+91 94319 04333',
  whatsapp: '+91 94319 04333',

  emailGeneral: 'contact@eldenheights.org',
  emailAdmissions: 'admission@eldenheights.org',
  emailCareers: 'contact@eldenheights.org',

  addressLine1: 'Katghara, Opp. BSF Firing Range, Silwar',
  addressLine2: 'Hazaribagh, Jharkhand',
  region: 'Hazaribagh, Jharkhand · India',

  instagram: 'https://www.instagram.com/elden.heights',
  linkedin: 'https://www.linkedin.com/company/eldenheights/',
  facebook: 'https://www.facebook.com/theeldenheights',
  youtube: 'https://www.youtube.com/@theeldenheights'
};

/** Field definitions so the portal form is generated, not hand-written. */
export const settingsFields = [
  { group: 'Identity', name: 'schoolName', label: 'School name' },
  { group: 'Identity', name: 'tagline', label: 'Motto' },
  { group: 'Identity', name: 'trust', label: 'Trust' },

  { group: 'Contact', name: 'phone', label: 'Phone', hint: 'Shown and dialled from the site.' },
  { group: 'Contact', name: 'whatsapp', label: 'WhatsApp number' },
  { group: 'Contact', name: 'emailGeneral', label: 'General email', type: 'email' },
  { group: 'Contact', name: 'emailAdmissions', label: 'Admissions email', type: 'email' },
  { group: 'Contact', name: 'emailCareers', label: 'Careers email', type: 'email' },

  { group: 'Address', name: 'addressLine1', label: 'Address line 1' },
  { group: 'Address', name: 'addressLine2', label: 'Address line 2' },
  { group: 'Address', name: 'region', label: 'Short location', hint: 'Used in the footer.' },

  { group: 'Social', name: 'instagram', label: 'Instagram', type: 'url' },
  { group: 'Social', name: 'linkedin', label: 'LinkedIn', type: 'url' },
  { group: 'Social', name: 'facebook', label: 'Facebook', type: 'url' },
  { group: 'Social', name: 'youtube', label: 'YouTube', type: 'url' }
];

/** Digits only, for tel: and wa.me links. */
export const telHref = (value = '') => `tel:${value.replace(/[^\d+]/g, '')}`;
export const whatsappHref = (value = '') =>
  `https://wa.me/${value.replace(/[^\d]/g, '')}`;

/** Merge stored overrides over the defaults, ignoring blanks. */
export const mergeSettings = (stored) => {
  const merged = { ...defaultSettings };
  if (!stored) return merged;
  Object.keys(defaultSettings).forEach((key) => {
    const value = stored[key];
    if (typeof value === 'string' && value.trim()) merged[key] = value.trim();
  });
  return merged;
};
