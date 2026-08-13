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
    key: 'academics.banner',
    group: 'Academics',
    label: 'Academics page banner',
    note: 'The header image on the Academics page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC04907.jpg',
    alt: 'Learning at The Elden Heights School'
  },
  {
    key: 'academics.classroom',
    group: 'Academics',
    label: 'Teaching and support feature',
    note: 'Beside the teaching and support copy. A teacher working with a student.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/academics/classroom-kit.jpg',
    alt: 'A teacher supporting a student'
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


  // ------------------------------------------------------------------- About
  {
    key: 'about.banner',
    group: 'About',
    label: 'About page banner',
    note: 'The header image on the About page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC04871.jpg',
    alt: 'The Elden Heights School campus'
  },
  {
    key: 'about.leadership',
    group: 'About',
    label: 'Leadership feature',
    note: 'Sits beside the leadership and governance copy. A meeting, an assembly, or the school building.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC01120.jpg',
    alt: 'Leadership at The Elden Heights School'
  },
  {
    key: 'about.mission',
    group: 'About',
    label: 'Mission and vision band',
    note: 'Full-width image behind the mission statement.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC04871.jpg',
    alt: 'Students at The Elden Heights School'
  },

  // ------------------------------------------------------- Student's Life
  {
    key: 'students.banner',
    group: "Student's Life",
    label: 'Page banner',
    note: 'The header image on the Student\u2019s Life page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC01122.jpg',
    alt: 'Student life at The Elden Heights School'
  },
  {
    key: 'students.houses',
    group: "Student's Life",
    label: 'Houses feature',
    note: 'Beside the houses copy. House banners, a house event, or students in house colours.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC01123.jpg',
    alt: 'House life at The Elden Heights School'
  },
  {
    key: 'students.sports',
    group: "Student's Life",
    label: 'Sports feature',
    note: 'Beside the sports copy. Action on the field reads best.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC05617.jpg',
    alt: 'Sports at The Elden Heights School'
  },
  {
    key: 'students.strip.1',
    group: "Student's Life",
    label: 'Life strip 1',
    note: 'Row of three moments from school life.',
    ratio: '4/5',
    size: '1200 × 1500',
    ref: '/gallery/DSC04883.jpg',
    alt: 'A moment from school life'
  },
  {
    key: 'students.strip.2',
    group: "Student's Life",
    label: 'Life strip 2',
    note: 'Row of three moments from school life.',
    ratio: '4/5',
    size: '1200 × 1500',
    ref: '/gallery/DSC04899.jpg',
    alt: 'A moment from school life'
  },
  {
    key: 'students.strip.3',
    group: "Student's Life",
    label: 'Life strip 3',
    note: 'Row of three moments from school life.',
    ratio: '4/5',
    size: '1200 × 1500',
    ref: '/gallery/DSC04910.jpg',
    alt: 'A moment from school life'
  },

  // -------------------------------------------------------------------- Core
  {
    key: 'core.banner',
    group: 'Core',
    label: 'Page banner',
    note: 'The header image on the Core page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC04924.jpg',
    alt: 'The Elden Heights School campus'
  },
  {
    key: 'core.feature',
    group: 'Core',
    label: 'Philosophy feature',
    note: 'Beside the core philosophy copy.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC04924.jpg',
    alt: 'Learning at The Elden Heights School'
  },
  {
    key: 'core.awards',
    group: 'Core',
    label: 'Awards band',
    note: 'Full-width image on the awards and recognition page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC00306.jpg',
    alt: 'Recognition at The Elden Heights School'
  },

  // -------------------------------------------------------- New Initiatives
  {
    key: 'initiatives.banner',
    group: 'New Initiatives',
    label: 'Page banner',
    note: 'The header image on the New Initiatives page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC05628.jpg',
    alt: 'New initiatives at The Elden Heights School'
  },
  {
    key: 'initiatives.feature',
    group: 'New Initiatives',
    label: 'Initiative feature',
    note: 'Beside the initiative copy.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC05626.jpg',
    alt: 'A new initiative at The Elden Heights School'
  },

  // -------------------------------------------------------- Beyond Academics
  {
    key: 'beyond.banner',
    group: 'Beyond Academics',
    label: 'Page banner',
    note: 'The header image on the Beyond Academics page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC01126.jpg',
    alt: 'Beyond the classroom at The Elden Heights School'
  },
  {
    key: 'beyond.feature',
    group: 'Beyond Academics',
    label: 'Feature image',
    note: 'Beside the copy on the Beyond Academics page.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC01126.jpg',
    alt: 'Activities beyond the classroom'
  },

  // ------------------------------------------------------ Co-Curricular Clubs
  {
    key: 'clubs.banner',
    group: 'Co-Curricular Clubs',
    label: 'Page banner',
    note: 'The header image on the Co-Curricular Clubs page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC04932.jpg',
    alt: 'Clubs at The Elden Heights School'
  },
  {
    key: 'clubs.feature',
    group: 'Co-Curricular Clubs',
    label: 'Feature image',
    note: 'Beside the clubs copy.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC04932.jpg',
    alt: 'A club session at The Elden Heights School'
  },

  // ------------------------------------------------- Life Readiness Programme
  {
    key: 'liferead.banner',
    group: 'Life Readiness',
    label: 'Page banner',
    note: 'The header image on the Life Readiness Program page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC04904.jpg',
    alt: 'Life readiness at The Elden Heights School'
  },
  {
    key: 'liferead.feature',
    group: 'Life Readiness',
    label: 'Feature image',
    note: 'Beside the programme copy.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC05628.jpg',
    alt: 'Life readiness session'
  },

  // ----------------------------------------------------------------- Careers
  {
    key: 'careers.banner',
    group: 'Careers',
    label: 'Page banner',
    note: 'The header image on the Careers page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC04891.jpg',
    alt: 'Working at The Elden Heights School'
  },
  {
    key: 'careers.feature',
    group: 'Careers',
    label: 'Feature image',
    note: 'Beside the careers copy. Teachers at work reads best here.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC04891.jpg',
    alt: 'Teaching at The Elden Heights School'
  },

  // ----------------------------------------------------------------- Contact
  {
    key: 'contact.banner',
    group: 'Contact',
    label: 'Page banner',
    note: 'The header image on the Contact page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC01117.jpg',
    alt: 'Visit The Elden Heights School'
  },

  // ------------------------------------------------------------------ People
  {
    key: 'people.council',
    group: 'People',
    label: 'Elden Council banner',
    note: 'The header image on The Elden Council page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC01131.jpg',
    alt: 'The Elden Council'
  },
  {
    key: 'people.mentors',
    group: 'People',
    label: 'Core Mentors banner',
    note: 'The header image on the Core Mentors page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/core-mentors/banner-legacy.jpg',
    alt: 'Mentors at The Elden Heights School'
  },
  {
    key: 'people.committee',
    group: 'People',
    label: 'Managing Committee banner',
    note: 'The header image on the Managing Committee page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/managing-committee/banner-lead.jpg',
    alt: 'The Managing Committee'
  },

  // ----------------------------------------------------------------- Gallery
  {
    key: 'gallery.banner',
    group: 'Gallery',
    label: 'Page banner',
    note: 'The header image on the Gallery page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/banner-showcase.jpg',
    alt: 'Gallery of school life'
  },

  // ------------------------------------------------------------------ Houses
  {
    key: 'houses.banner',
    group: 'Houses',
    label: 'Houses banner',
    note: 'The header image on the Houses index page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC01123.jpg',
    alt: 'The eight houses of The Elden Heights School'
  },
  {
    key: 'houses.feature',
    group: 'Houses',
    label: 'Houses feature',
    note: 'Full-width band on the Houses page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC04937.jpg',
    alt: 'House spirit at The Elden Heights School'
  },

  // --------------------------------------------------------------- Admission
  {
    key: 'awards.strip.1',
    group: 'Core',
    label: 'Recognition strip 1',
    note: 'Row of three moments — prize day, a trophy, a proud group photo.',
    ratio: '4/3',
    size: '1400 × 1050',
    ref: '/gallery/DSC00293.jpg',
    alt: 'Students being recognised at The Elden Heights School'
  },
  {
    key: 'awards.strip.2',
    group: 'Core',
    label: 'Recognition strip 2',
    note: 'Row of three moments from prize giving and achievement.',
    ratio: '4/3',
    size: '1400 × 1050',
    ref: '/gallery/DSC00306.jpg',
    alt: 'A prize-giving moment at The Elden Heights School'
  },
  {
    key: 'awards.strip.3',
    group: 'Core',
    label: 'Recognition strip 3',
    note: 'Row of three moments from prize giving and achievement.',
    ratio: '4/3',
    size: '1400 × 1050',
    ref: '/gallery/DSC01125.jpg',
    alt: 'Celebrating achievement at The Elden Heights School'
  },
  {
    key: 'admission.campus.1',
    group: 'Admission',
    label: 'Campus strip 1',
    note: 'What a visiting family sees — classrooms, grounds, facilities.',
    ratio: '4/3',
    size: '1400 × 1050',
    ref: '/gallery/DSC04884.jpg',
    alt: 'A classroom at The Elden Heights School'
  },
  {
    key: 'admission.campus.2',
    group: 'Admission',
    label: 'Campus strip 2',
    note: 'What a visiting family sees — classrooms, grounds, facilities.',
    ratio: '4/3',
    size: '1400 × 1050',
    ref: '/gallery/DSC05621.jpg',
    alt: 'The grounds at The Elden Heights School'
  },
  {
    key: 'admission.campus.3',
    group: 'Admission',
    label: 'Campus strip 3',
    note: 'What a visiting family sees — classrooms, grounds, facilities.',
    ratio: '4/3',
    size: '1400 × 1050',
    ref: '/gallery/DSC05639.jpg',
    alt: 'Facilities at The Elden Heights School'
  },
  {
    key: 'people.council.feature',
    group: 'People',
    label: 'Council feature',
    note: 'Beside the Elden Council copy.',
    ratio: '4/3',
    size: '1600 × 1200',
    ref: '/gallery/DSC04952.jpg',
    alt: 'Stewardship at The Elden Heights School'
  },
  {
    key: 'admission.banner',
    group: 'Admission',
    label: 'Admission page banner',
    note: 'The header image on the admission page.',
    ratio: '21/9',
    size: '2400 × 1030',
    ref: '/gallery/DSC04952.jpg',
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
