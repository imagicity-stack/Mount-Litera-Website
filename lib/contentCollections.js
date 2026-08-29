/**
 * Editable content collections.
 *
 * Each entry below describes a list the school maintains itself: what fields a
 * record has, what the portal should call them, and the rows the site shipped
 * with. One generic API route and one generic admin screen are driven entirely
 * from this file, so adding a new managed list is a schema, not a feature.
 *
 * Records live in Firestore under `content/{collection}/items`; uploaded files
 * go to Firebase Storage under `content/{collection}/`.
 *
 * Field types
 *   text     — single line
 *   textarea — paragraph
 *   image    — uploaded picture, stored as a URL
 *   file     — uploaded document (PDF), stored as a URL
 *   list     — repeatable single lines
 *   url      — external link
 */

export const CONTENT_ROOT = 'content';
export const CONTENT_STORAGE_PREFIX = 'content';

export const contentCollections = [
  // ------------------------------------------------------------------ Gallery
  {
    key: 'gallery',
    label: 'Gallery',
    blurb:
      'Photographs on the gallery page. Add as many as you like — they appear in the order below.',
    itemNoun: 'photograph',
    titleField: 'alt',
    accepts: 'image',
    fields: [
      {
        name: 'image',
        type: 'image',
        label: 'Photograph',
        required: true,
        ratio: '3/2',
        hint: 'Landscape works best. Roughly 1600 × 1067.'
      },
      {
        name: 'alt',
        type: 'text',
        label: 'Description',
        hint: 'What is happening in the picture. Read aloud by screen readers.'
      }
    ],
    seed: [
      { image: '/gallery/DSC00293.jpg', alt: 'Students collaborating in a bright classroom' },
      { image: '/gallery/DSC00296.jpg', alt: 'Teacher guiding a student during a lesson' },
      { image: '/gallery/DSC00297.jpg', alt: 'Classmates working together on an assignment' },
      { image: '/gallery/DSC00306.jpg', alt: 'Learning materials arranged for an activity' },
      { image: '/gallery/DSC01117.jpg', alt: 'Students smiling during a campus event' },
      { image: '/gallery/DSC01120.jpg', alt: 'Group discussion taking place indoors' },
      { image: '/gallery/DSC01122.jpg', alt: 'Students participating in hands-on learning' },
      { image: '/gallery/DSC01123.jpg', alt: 'Teacher engaging students with visual aids' },
      { image: '/gallery/DSC01125.jpg', alt: 'Students presenting their classroom work' },
      { image: '/gallery/DSC01126.jpg', alt: 'Learners exploring an activity together' },
      { image: '/gallery/DSC01129.jpg', alt: 'Students seated during a school session' },
      { image: '/gallery/DSC01131.jpg', alt: 'Classroom moment captured during a lesson' },
      { image: '/gallery/DSC04871.jpg', alt: 'Students taking part in a school activity' },
      { image: '/gallery/DSC04883.jpg', alt: 'Children engaged in a creative task' },
      { image: '/gallery/DSC04884.jpg', alt: 'Students working at their desks' },
      { image: '/gallery/DSC04889.jpg', alt: 'A student concentrating on classwork' },
      { image: '/gallery/DSC04891.jpg', alt: 'Teacher and students during a school event' },
      { image: '/gallery/DSC04899.jpg', alt: 'Students gathered for a group activity' },
      { image: '/gallery/DSC04904.jpg', alt: 'A moment from a classroom session' },
      { image: '/gallery/DSC04907.jpg', alt: 'Students learning together in class' },
      { image: '/gallery/DSC04910.jpg', alt: 'Children participating in a lesson' },
      { image: '/gallery/DSC04924.jpg', alt: 'Students at work in the classroom' },
      { image: '/gallery/DSC04931.jpg', alt: 'A detail from a classroom activity' },
      { image: '/gallery/DSC04932.jpg', alt: 'Students taking part in a club session' },
      { image: '/gallery/DSC04937.jpg', alt: 'School life captured on campus' },
      { image: '/gallery/DSC04952.jpg', alt: 'Visitors and students on campus' },
      { image: '/gallery/DSC05617.jpg', alt: 'Students on the sports field' },
      { image: '/gallery/DSC05620.jpg', alt: 'Learners collaborating on a task' },
      { image: '/gallery/DSC05621.jpg', alt: 'A view across the school grounds' },
      { image: '/gallery/DSC05626.jpg', alt: 'Students during a school programme' },
      { image: '/gallery/DSC05628.jpg', alt: 'A session in progress at the school' },
      { image: '/gallery/DSC05639.jpg', alt: 'School facilities in use' },
      { image: '/gallery/DSC08665.jpg', alt: 'A moment from campus life' }
    ]
  },

  // ------------------------------------------------------------- Disclosures
  {
    key: 'disclosures',
    label: 'Mandatory Disclosures',
    blurb:
      'The CBSE disclosure documents published publicly. Replace a document when a new certificate is issued — the old file is deleted from storage.',
    itemNoun: 'document',
    titleField: 'title',
    accepts: 'file',
    fields: [
      { name: 'title', type: 'text', label: 'Document title', required: true },
      {
        name: 'file',
        type: 'file',
        label: 'PDF',
        hint: 'Upload the current certificate. Existing documents already on the site keep working until replaced.'
      }
    ],
    // The shipped disclosures live in /public/documents/mandatory-disclosures.
    seed: [
      { title: 'Annual Academic Calendar', file: 'annual-academic-calendar.pdf' },
      { title: 'Affiliation / Upgradation / Extension of Affiliation Letter', file: 'affiliation-letter.pdf' },
      { title: 'Society / Trust / Company Registration Certificate', file: 'society-trust-registration-certificate.pdf' },
      { title: 'No Objection Certificate (NOC) from State Government / UT', file: 'noc-state-government.pdf' },
      { title: 'Building Safety Certificate', file: 'building-safety-certificate.pdf' },
      { title: 'DEO Certificate or Self-Certification by School', file: 'deo-certificate.pdf' },
      { title: 'Water, Health & Sanitation Certificates', file: 'water-health-sanitation-certificates.pdf' },
      { title: 'Fire Certificate', file: 'fire certificate mlzs.pdf' },
      { title: 'Managing Committee', file: 'mount_litera_zee_school_managing_committee_formal.pdf' },
      { title: 'Self Declaration', file: 'Mandatory Disclosure Details _ SARAS 7.0.pdf' },
      { title: 'PTA Members Details', file: 'pta-members.pdf' }
    ]
  },

  // ------------------------------------------------------------------ Awards
  {
    key: 'awards',
    label: 'Awards & Recognition',
    blurb: 'The awards the school confers, and what each one recognises.',
    itemNoun: 'award',
    titleField: 'name',
    fields: [
      { name: 'name', type: 'text', label: 'Award name', required: true },
      { name: 'eligibility', type: 'text', label: 'Who is eligible', hint: 'e.g. Class X students' },
      { name: 'nature', type: 'text', label: 'Nature of the award', hint: 'e.g. Medal with formal citation' },
      { name: 'recognises', type: 'textarea', label: 'What it recognises' },
      { name: 'considerations', type: 'list', label: 'To be considered, a student must', itemLabel: 'Criterion' },
      { name: 'categories', type: 'list', label: 'Categories of recognition', itemLabel: 'Category' },
      { name: 'note', type: 'textarea', label: 'Footnote', hint: 'e.g. may not be awarded every year.' }
    ],
    seed: [
    {
      name: 'The Elden Laureate',
      eligibility: 'Class X students',
      natureLabel: 'Nature of Award',
      nature: 'Medal with formal citation · Premium book or fountain pen',
      recognitionLabel: 'What This Award Recognises',
      recognises:
        'The student who best represents the values, character, leadership, and overall spirit of The Elden Heights.',
      considerationLabel: 'To Be Considered, a Student Must',
      considerations: [
        'Be enrolled in the school for a minimum of three years',
        'Maintain a consistently strong discipline and conduct record',
        'Demonstrate leadership through actions, not position alone',
        'Positively contribute to school culture, events, or initiatives',
        'Maintain above average academic performance across years'
      ],
      note: 'This award may not be given every year if the standard is not met.'
    },
    {
      name: 'Founder’s Medal of Distinction',
      eligibility: 'Classes VIII to X',
      natureLabel: 'Nature of Award',
      nature: 'Gold-plated medal · Personalised memento or premium diary',
      recognitionLabel: 'What This Award Recognises',
      recognises: 'Integrity, responsibility, maturity, and adherence to school values.',
      considerationLabel: 'To Be Considered, a Student Must',
      considerations: [
        'Be enrolled for a minimum of two years',
        'Show respectful behaviour towards peers and staff',
        'Demonstrate honesty, responsibility, and reliability',
        'Have no major disciplinary action on record',
        'Be consistently recognised by teachers for ethical conduct'
      ]
    },
    {
      name: 'Governor’s Medal for Academic Excellence',
      eligibility: 'Class X students',
      natureLabel: 'Nature of Award',
      nature: 'Academic medal and certificate · Academic reference book or learning voucher',
      recognitionLabel: 'What This Award Recognises',
      recognises: 'Highest academic achievement in the graduating class.',
      considerationLabel: 'To Be Considered, a Student Must',
      considerations: [
        'Secure the highest aggregate marks in the final board examination',
        'Maintain minimum 90 percent attendance',
        'Have no record of academic misconduct',
        'Meet all examination and assessment requirements',
        'This award is based strictly on numerical academic data'
      ]
    },
    {
      name: 'Subject Topper Awards',
      eligibility: 'Classes IX and X',
      natureLabel: 'Nature of Award',
      nature: 'Subject-wise shield · Subject-specific learning material',
      recognitionLabel: 'What This Award Recognises',
      recognises: 'Outstanding mastery in individual subjects.',
      considerationLabel: 'To Be Considered, a Student Must',
      considerations: [
        'Achieve the highest marks in the subject in the annual examination',
        'Meet minimum internal assessment requirements',
        'In case of a tie, internal assessments may be considered',
        'Selection is purely academic and score-based'
      ]
    },
    {
      name: 'The Elden Honours Book',
      eligibility: 'Classes IV to X',
      natureLabel: 'Nature of Recognition',
      nature: 'Permanent entry in the institutional Honours Book',
      recognitionLabel: 'What This Recognition Represents',
      recognises: 'Long-term distinction recorded as part of the school&rsquo;s permanent legacy.',
      categoriesLabel: 'Students May Be Recorded For',
      categories: [
        'Consistent academic excellence',
        'Demonstrated leadership and responsibility',
        'Sustained sports excellence',
        'Significant cultural contribution'
      ],
      considerationLabel: 'To Be Considered, a Student Must',
      considerations: [
        'Show sustained performance throughout the academic year',
        'Receive faculty recommendation',
        'Maintain a clean conduct record'
      ]
    },
    {
      name: 'The Elden Code Bearer',
      eligibility: 'Classes VI to X',
      natureLabel: 'Nature of Award',
      nature: 'Medal · Inspirational book',
      recognitionLabel: 'What This Award Recognises',
      recognises: 'Exemplary character and adherence to the school code.',
      considerationLabel: 'To Be Considered, a Student Must',
      considerations: [
        'Maintain a discipline record free of major violations',
        'Demonstrate honesty and respect consistently',
        'Follow school rules even without supervision',
        'Be recognised by teachers for dependable conduct',
        'This award is based on continuous observation, not single incidents'
      ]
    },
    {
      name: 'Young Leader’s Commendation',
      eligibility: 'Classes VIII to X',
      natureLabel: 'Nature of Award',
      nature: 'Trophy · Leadership or communication kit',
      recognitionLabel: 'What This Award Recognises',
      recognises: 'Initiative, responsibility, and leadership through action.',
      considerationLabel: 'To Be Considered, a Student Must',
      considerations: [
        'Actively take responsibility in school activities or roles',
        'Demonstrate accountability and decision making',
        'Positively influence peers',
        'Maintain discipline and attendance standards'
      ]
    },
    {
      name: 'The Ascension Award',
      eligibility: 'Classes IV to X',
      natureLabel: 'Nature of Award',
      nature: 'Shield · Personal development book',
      recognitionLabel: 'What This Award Recognises',
      recognises: 'Exceptional improvement and personal growth.',
      considerationLabel: 'To Be Considered, a Student Must',
      considerations: [
        'Show clear improvement compared to previous academic terms',
        'Demonstrate positive behavioural or attitudinal change',
        'Show commitment to self improvement',
        'Be recommended by class teachers'
      ]
    },
    {
      name: 'Colours Award',
      eligibility: 'Classes VI to X',
      natureLabel: 'Nature of Award',
      nature: 'Blazer badge or medal · Sports kit accessory',
      recognitionLabel: 'What This Award Recognises',
      recognises: 'Sustained excellence and discipline in sports.',
      considerationLabel: 'To Be Considered, a Student Must',
      considerations: [
        'Consistently participate in sports activities over time',
        'Represent school or house teams',
        'Demonstrate sportsmanship and discipline',
        'Receive recommendation from sports faculty'
      ]
    },
    {
      name: 'Cultural Laureate',
      eligibility: 'Classes VI to X',
      natureLabel: 'Nature of Award',
      nature: 'Trophy · Art or music-related kit',
      recognitionLabel: 'What This Award Recognises',
      recognises: 'Excellence and commitment in arts, music, theatre, or cultural expression.',
      considerationLabel: 'To Be Considered, a Student Must',
      considerations: [
        'Actively participate in cultural activities',
        'Demonstrate skill and dedication in the chosen discipline',
        'Represent the school in events or performances',
        'Be recommended by cultural faculty'
      ]
    }
    ]
  },

  // --------------------------------------------------------------- Vacancies
  {
    key: 'vacancies',
    label: 'Careers & Vacancies',
    blurb:
      'Open positions on the careers page. With none listed, the page says the school is not currently hiring.',
    itemNoun: 'vacancy',
    titleField: 'role',
    fields: [
      { name: 'role', type: 'text', label: 'Role', required: true, hint: 'e.g. Mathematics Teacher (Middle School)' },
      { name: 'type', type: 'text', label: 'Type', hint: 'e.g. Full time · Permanent' },
      { name: 'summary', type: 'textarea', label: 'About the role' },
      { name: 'requirements', type: 'list', label: 'What we are looking for', itemLabel: 'Requirement' },
      { name: 'applyEmail', type: 'text', label: 'Applications to', hint: 'Leave blank to use the school’s careers address.' }
    ],
    seed: []
  },

  // ------------------------------------------------------------------- Houses
  {
    key: 'houses',
    label: 'House Roster',
    blurb:
      'Prefects and house masters change every year. The house names, crests, colours and stories stay in the site itself — only the people are edited here. Leave a field blank to keep what the site ships with.',
    itemNoun: 'house',
    titleField: 'prefectName',
    // Keyed: one row per house, fixed. Entries cannot be added or removed,
    // only filled in — the eight houses are part of the site's structure and
    // their pages are generated from it.
    keyed: true,
    keys: [
      { key: 'regalia', label: 'Regalia House' },
      { key: 'specter', label: 'Specter House' },
      { key: 'aurelius', label: 'Aurelius House' },
      { key: 'sentinel', label: 'Sentinel House' },
      { key: 'lupus', label: 'Lupus House' },
      { key: 'titan', label: 'Titan House' },
      { key: 'colossus', label: 'Colossus House' },
      { key: 'atlas', label: 'Atlas House' }
    ],
    fields: [
      { name: 'prefectName', type: 'text', label: 'House Prefect' },
      { name: 'prefectPhoto', type: 'image', label: 'Prefect photograph', ratio: '3/4' },
      { name: 'houseMasterName', type: 'text', label: 'House Master' },
      { name: 'houseMasterPhoto', type: 'image', label: 'House Master photograph', ratio: '3/4' }
    ],
    seed: [
      { key: 'regalia', prefectName: '', prefectPhoto: '', houseMasterName: '', houseMasterPhoto: '' },
      { key: 'specter', prefectName: '', prefectPhoto: '', houseMasterName: '', houseMasterPhoto: '' },
      { key: 'aurelius', prefectName: '', prefectPhoto: '', houseMasterName: '', houseMasterPhoto: '' },
      { key: 'sentinel', prefectName: '', prefectPhoto: '', houseMasterName: '', houseMasterPhoto: '' },
      { key: 'lupus', prefectName: '', prefectPhoto: '', houseMasterName: '', houseMasterPhoto: '' },
      { key: 'titan', prefectName: '', prefectPhoto: '', houseMasterName: '', houseMasterPhoto: '' },
      { key: 'colossus', prefectName: '', prefectPhoto: '', houseMasterName: '', houseMasterPhoto: '' },
      { key: 'atlas', prefectName: '', prefectPhoto: '', houseMasterName: '', houseMasterPhoto: '' }
    ]
  }
];

export const contentCollectionMap = contentCollections.reduce((acc, c) => {
  acc[c.key] = c;
  return acc;
}, {});

/** For keyed collections, the fixed set of record ids. */
export const keysFor = (key) => contentCollectionMap[key]?.keys || [];

export const isKnownCollection = (key) =>
  Object.prototype.hasOwnProperty.call(contentCollectionMap, key);

/** Blank record shaped by a collection's schema. */
export const emptyRecord = (key) => {
  const collection = contentCollectionMap[key];
  if (!collection) return {};
  const record = { id: null, order: 0, status: 'published' };
  collection.fields.forEach((field) => {
    record[field.name] = field.type === 'list' ? [] : '';
  });
  return record;
};

/**
 * The rows a collection shipped with, shaped like stored records so callers
 * can treat seeded and stored content identically.
 */
export const seedFor = (key) => {
  const collection = contentCollectionMap[key];
  if (!collection) return [];
  return collection.seed.map((row, index) => ({
    ...row,
    id: `seed:${key}:${index}`,
    order: index,
    status: 'published',
    seeded: true
  }));
};
