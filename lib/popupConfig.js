// Shared definitions for the advanced popup management system. Used by both
// the admin builder and the public PopupManager so the two stay in sync.

export const POPUP_LAYOUTS = [
  { value: 'modal', label: 'Center Modal', hint: 'Classic centered dialog with backdrop.' },
  { value: 'slide-in', label: 'Slide-in Card', hint: 'Compact card that slides from the corner.' },
  { value: 'banner-top', label: 'Top Banner', hint: 'Full-width bar pinned to the top.' },
  { value: 'banner-bottom', label: 'Bottom Bar', hint: 'Full-width bar pinned to the bottom.' },
  { value: 'fullscreen', label: 'Fullscreen Takeover', hint: 'Immersive full-viewport overlay.' }
];

export const POPUP_THEMES = [
  { value: 'midnight', label: 'Midnight', bg: '#0A0A0C', text: '#FAF7F1', accent: '#C9A24B' },
  { value: 'cardinal', label: 'Cardinal', bg: '#54040A', text: '#FAF7F1', accent: '#E8D9B0' },
  { value: 'gold', label: 'Gold', bg: '#C9A24B', text: '#0A0A0C', accent: '#54040A' },
  { value: 'parchment', label: 'Parchment', bg: '#FAF7F1', text: '#0A0A0C', accent: '#8A0A12' },
  { value: 'custom', label: 'Custom', bg: '#0A0A0C', text: '#FAF7F1', accent: '#C9A24B' }
];

export const POPUP_TRIGGERS = [
  { value: 'immediate', label: 'Immediately', hint: 'Shows as soon as the page loads.' },
  { value: 'delay', label: 'After a delay', hint: 'Wait N seconds before showing.' },
  { value: 'scroll', label: 'On scroll depth', hint: 'Show after scrolling N% of the page.' },
  { value: 'exit', label: 'Exit intent', hint: 'Trigger when the cursor leaves the viewport.' }
];

export const POPUP_FREQUENCIES = [
  { value: 'always', label: 'Every page view' },
  { value: 'session', label: 'Once per session' },
  { value: 'daily', label: 'Once per day' },
  { value: 'cooldown', label: 'Every N days' },
  { value: 'once', label: 'Only once, ever' }
];

export const POPUP_TARGETS = [
  { value: 'all', label: 'All pages' },
  { value: 'home', label: 'Homepage only' },
  { value: 'include', label: 'Only on selected paths' },
  { value: 'exclude', label: 'Everywhere except selected paths' }
];

export const POPUP_IMAGE_POSITIONS = [
  { value: 'none', label: 'No image' },
  { value: 'top', label: 'Top' },
  { value: 'side', label: 'Side' },
  { value: 'background', label: 'Background' }
];

export const POPUP_STATUSES = ['draft', 'active', 'paused'];

export const defaultPopup = () => ({
  name: 'Untitled popup',
  status: 'draft',
  layout: 'modal',
  theme: 'midnight',
  bgColor: '#0A0A0C',
  textColor: '#FAF7F1',
  accentColor: '#C9A24B',
  eyebrow: '',
  title: '',
  body: '',
  image: '',
  imageAlt: '',
  imagePosition: 'none',
  primaryCtaLabel: '',
  primaryCtaUrl: '',
  secondaryCtaLabel: '',
  secondaryCtaUrl: '',
  trigger: 'delay',
  triggerValue: 3,
  frequency: 'session',
  frequencyDays: 7,
  targetType: 'all',
  targetPaths: [],
  startAt: '',
  endAt: '',
  priority: 1,
  dismissible: true,
  showCloseButton: true,
  overlayClose: true
});

export const resolveTheme = (popup) => {
  if (!popup) return POPUP_THEMES[0];
  if (popup.theme === 'custom') {
    return {
      bg: popup.bgColor || '#0A0A0C',
      text: popup.textColor || '#FAF7F1',
      accent: popup.accentColor || '#C9A24B'
    };
  }
  const found = POPUP_THEMES.find((t) => t.value === popup.theme);
  return found || POPUP_THEMES[0];
};

const normalizePaths = (paths) =>
  (Array.isArray(paths) ? paths : String(paths || '').split(','))
    .map((p) => p.trim())
    .filter(Boolean);

// Does a popup's targeting rule match the given path? (path includes query-free pathname)
export const popupMatchesPath = (popup, path) => {
  const pathname = (path || '/').split('?')[0].split('#')[0];
  const paths = normalizePaths(popup.targetPaths);
  const matchesAny = paths.some((p) => {
    if (p.endsWith('*')) return pathname.startsWith(p.slice(0, -1));
    return pathname === p;
  });

  switch (popup.targetType) {
    case 'home':
      return pathname === '/';
    case 'include':
      return matchesAny;
    case 'exclude':
      return !matchesAny;
    case 'all':
    default:
      return true;
  }
};

// Is the popup within its scheduled window and active?
export const popupIsLive = (popup, now = new Date()) => {
  if (popup.status !== 'active') return false;
  const ts = now.getTime();
  if (popup.startAt) {
    const start = new Date(popup.startAt).getTime();
    if (!Number.isNaN(start) && ts < start) return false;
  }
  if (popup.endAt) {
    const end = new Date(popup.endAt).getTime();
    if (!Number.isNaN(end) && ts > end) return false;
  }
  return true;
};
