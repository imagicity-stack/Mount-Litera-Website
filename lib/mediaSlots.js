/**
 * The catalogue of managed image positions on the public site.
 *
 * Every image the school can change without a deploy is a *slot*. A slot has a
 * stable key, a reference image shipped in /public (what renders until someone
 * uploads a replacement, and what the admin sees as "this is the picture that
 * currently sits here"), and enough guidance for a non-technical editor to know
 * what to upload.
 *
 * Overrides live in Firestore (`siteMedia/{key}`) and the files themselves in
 * the Firebase Storage bucket under `site-media/{key}/`.
 */

export const MEDIA_COLLECTION = 'siteMedia';
export const MEDIA_STORAGE_PREFIX = 'site-media';

/**
 * ratio  — the aspect box the slot renders in, so uploads are never letterboxed
 * size   — the recommended pixel dimensions shown to the editor
 * ref    — the file in /public used until an upload replaces it
 */
export const mediaSlots = [
  // ---------------------------------------------------------------- Homepage
  {
    key: 'home.hero',
    group: 'Homepage',
    label: 'Hero backdrop',
    note: 'The first thing a visitor sees. A wide, calm shot of the campus or gate — avoid busy centres, the headline sits over the lower left.',
    ratio: '16/9',
    size: '2400 × 1350',
    ref: '/main gate new.jpeg',
    alt: 'The Elden Heights School campus gate in Hazaribagh, Jharkhand'
  },
  {
    key: 'home.about.portrait',
    group: 'Homepage',
    label: 'Ethos image',
    note: 'Sits beside the school promise. Students or campus life — warm, human, in focus.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/home/about-vision.jpg',
    alt: 'Students at The Elden Heights School'
  },
  {
    key: 'home.mosaic.1',
    group: 'Homepage · Campus mosaic',
    label: 'Mosaic — tall left',
    note: 'Portrait orientation. A single moment: a child reading, a teacher mid-explanation.',
    ratio: '3/4',
    size: '1200 × 1600',
    ref: '/gallery/DSC04889.jpg',
    alt: 'A student at work in class'
  },
  {
    key: 'home.mosaic.2',
    group: 'Homepage · Campus mosaic',
    label: 'Mosaic — wide centre',
    note: 'Landscape. The widest frame in the grid — assembly, sports ground, or a full classroom.',
    ratio: '16/10',
    size: '2000 × 1250',
    ref: '/gallery/DSC01122.jpg',
    alt: 'School assembly at The Elden Heights School'
  },
  {
    key: 'home.mosaic.3',
    group: 'Homepage · Campus mosaic',
    label: 'Mosaic — square upper right',
    note: 'Square crop. Detail shots work well here — hands, books, a science bench.',
    ratio: '1/1',
    size: '1400 × 1400',
    ref: '/gallery/DSC04931.jpg',
    alt: 'Classroom detail at The Elden Heights School'
  },
  {
    key: 'home.mosaic.4',
    group: 'Homepage · Campus mosaic',
    label: 'Mosaic — square lower right',
    note: 'Square crop. Pair it with the slot above — two related moments read well side by side.',
    ratio: '1/1',
    size: '1400 × 1400',
    ref: '/gallery/DSC05620.jpg',
    alt: 'Students collaborating at The Elden Heights School'
  },
  {
    key: 'home.story.1',
    group: 'Homepage · Scroll story',
    label: 'Story frame 1 — Roots',
    note: 'Full-bleed. Early years: play, discovery, the youngest children.',
    ratio: '16/9',
    size: '2400 × 1350',
    ref: '/home/academics-foundation.jpg',
    alt: 'Foundational stage learners at The Elden Heights School'
  },
  {
    key: 'home.story.2',
    group: 'Homepage · Scroll story',
    label: 'Story frame 2 — Ascent',
    note: 'Full-bleed. Middle years: group work, projects, curiosity.',
    ratio: '16/9',
    size: '2400 × 1350',
    ref: '/home/academics-middle.jpg',
    alt: 'Middle stage learners at The Elden Heights School'
  },
  {
    key: 'home.story.3',
    group: 'Homepage · Scroll story',
    label: 'Story frame 3 — Radiance',
    note: 'Full-bleed. Senior years: labs, libraries, focused study.',
    ratio: '16/9',
    size: '2400 × 1350',
    ref: '/home/academics-secondary.jpg',
    alt: 'Secondary stage learners at The Elden Heights School'
  },
  {
    key: 'home.faces.feature',
    group: 'Homepage · Our people',
    label: 'Featured portrait',
    note: 'The large portrait. A teacher or mentor, shoulders-up, looking toward the camera.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/teachers/principal.png',
    alt: 'R.K. Singh, Principal of The Elden Heights School'
  },
  {
    key: 'home.faces.1',
    group: 'Homepage · Our people',
    label: 'Portrait 1',
    note: 'Small portrait in the row of three. Keep the crop consistent across all three.',
    ratio: '3/4',
    size: '900 × 1200',
    ref: '/teachers/sangeeta-agarwal.png',
    alt: 'Sangeeta Agarwal, English mentor at The Elden Heights School'
  },
  {
    key: 'home.faces.2',
    group: 'Homepage · Our people',
    label: 'Portrait 2',
    note: 'Small portrait in the row of three.',
    ratio: '3/4',
    size: '900 × 1200',
    ref: '/teachers/sameeksha-sinha.png',
    alt: 'Sameeksha Sinha, Social Studies mentor at The Elden Heights School'
  },
  {
    key: 'home.faces.3',
    group: 'Homepage · Our people',
    label: 'Portrait 3',
    note: 'Small portrait in the row of three.',
    ratio: '3/4',
    size: '900 × 1200',
    ref: '/teachers/smita-sinha.png',
    alt: 'Smita Sinha, Mathematics mentor at The Elden Heights School'
  },
  {
    key: 'home.admission.band',
    group: 'Homepage',
    label: 'Admissions band backdrop',
    note: 'Sits behind the dark admissions section at low opacity. Architectural shots work best.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/home/admission-archway.jpg',
    alt: 'The Elden Heights School archway'
  },
  {
    key: 'home.trust.campus',
    group: 'Homepage',
    label: 'Belonging strip',
    note: 'Wide band above the contact section. A crowd shot — the whole school together.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC01117.jpg',
    alt: 'The Elden Heights School community'
  },

  // --------------------------------------------------------------- Academics
  {
    key: 'academics.stage.foundational',
    group: 'Academics',
    label: 'Foundational stage',
    note: 'Nursery to Grade II. Play-based learning.',
    ratio: '4/3',
    size: '1200 × 900',
    ref: '/home/academics-foundation.jpg',
    alt: 'Foundational stage classroom'
  },
  {
    key: 'academics.stage.preparatory',
    group: 'Academics',
    label: 'Preparatory stage',
    note: 'Grade III to V. Concept-based lessons.',
    ratio: '4/3',
    size: '1200 × 900',
    ref: '/home/academics-prep.jpg',
    alt: 'Preparatory stage classroom'
  },
  {
    key: 'academics.stage.middle',
    group: 'Academics',
    label: 'Middle stage',
    note: 'Grade VI to VIII. Projects and self-driven work.',
    ratio: '4/3',
    size: '1200 × 900',
    ref: '/home/academics-middle.jpg',
    alt: 'Middle stage classroom'
  },
  {
    key: 'academics.stage.secondary',
    group: 'Academics',
    label: 'Secondary stage',
    note: 'Grade IX and X. Board preparation and mentorship.',
    ratio: '4/3',
    size: '1200 × 900',
    ref: '/home/academics-secondary.jpg',
    alt: 'Secondary stage classroom'
  },
  {
    key: 'academics.wide',
    group: 'Academics',
    label: 'Academics wide band',
    note: 'Full-width image between sections on the academics page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC04907.jpg',
    alt: 'Learning at The Elden Heights School'
  },

  // ------------------------------------------------------------------- About
  {
    key: 'about.vision',
    group: 'About',
    label: 'Ethos image',
    note: 'Beside the school ethos copy on the About page.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/about/about-vision.jpg',
    alt: 'The Elden Heights School campus'
  },
  {
    key: 'about.principal',
    group: 'About',
    label: 'Principal portrait',
    note: 'Accompanies the Principal’s note.',
    ratio: '3/4',
    size: '900 × 1200',
    ref: '/teachers/principal.png',
    alt: 'R.K. Singh, Principal'
  },
  {
    key: 'about.director',
    group: 'About',
    label: 'Managing Director portrait',
    note: 'Accompanies the Managing Director’s note.',
    ratio: '3/4',
    size: '900 × 1200',
    ref: '/teachers/shashi-shankar-prasad.jpg',
    alt: 'Mr. Shashi Shankar Prasad, Managing Director'
  },

  // --------------------------------------------------------------- Admission
  {
    key: 'admission.banner',
    group: 'Admission',
    label: 'Admission page banner',
    note: 'The header image on the admission page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/admission/banner-horizon.jpg',
    alt: 'Admissions at The Elden Heights School'
  },
  {
    key: 'admission.assurance',
    group: 'Admission',
    label: 'Assurance image',
    note: 'Sits beside the admission process. Parents and staff in conversation reads as trustworthy.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC04952.jpg',
    alt: 'Families visiting The Elden Heights School'
  }
];

/** Slots keyed by id, for O(1) lookup at render time. */
export const mediaSlotMap = mediaSlots.reduce((acc, slot) => {
  acc[slot.key] = slot;
  return acc;
}, {});

/** Slots grouped by their `group` label, preserving registry order. */
export const groupedMediaSlots = () => {
  const groups = [];
  const index = new Map();

  mediaSlots.forEach((slot) => {
    if (!index.has(slot.group)) {
      const entry = { group: slot.group, slots: [] };
      index.set(slot.group, entry);
      groups.push(entry);
    }
    index.get(slot.group).slots.push(slot);
  });

  return groups;
};

/** Tailwind-friendly aspect ratio value for a slot ("16/9" -> "16 / 9"). */
export const slotAspect = (key) => {
  const slot = mediaSlotMap[key];
  if (!slot?.ratio) return '16 / 9';
  return slot.ratio.replace('/', ' / ');
};

export const isKnownSlot = (key) => Object.prototype.hasOwnProperty.call(mediaSlotMap, key);
