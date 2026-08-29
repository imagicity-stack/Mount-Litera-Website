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
    group: 'Media',
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
    group: 'Compliance',
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
    group: 'Recognition',
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
    group: 'Careers',
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
    group: 'Student life',
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
  },
  {
    key: 'whyChoose',
    group: 'Admission',
    label: 'Why choose us',
    blurb: 'The five reasons shown on the admission page.',
    itemNoun: 'reason',
    titleField: 'title',
    fields: [
      { name: 'title', type: 'text', label: 'Reason', required: true },
      { name: 'body', type: 'textarea', label: 'Detail' }
    ],
    seed: [
    { title: 'Future-Ready Curriculum', body: 'A blend of strong academics and practical learning experiences.' },
    { title: 'Experienced Faculty', body: 'Dedicated educators who mentor — not just teach.' },
    { title: 'Modern Learning Environment', body: 'Digitally-equipped classrooms, safe campus, and evolving infrastructure.' },
    { title: 'Holistic Growth', body: 'Equal focus on academics, sports, arts, and values.' },
    { title: 'Personalized Guidance', body: 'Every student&rsquo;s journey is tracked, mentored, and celebrated.' }
    ]
  },
  {
    key: 'admissionSteps',
    group: 'Admission',
    label: 'Admission process',
    blurb: 'The numbered steps a family goes through.',
    itemNoun: 'step',
    titleField: 'title',
    fields: [
      { name: 'step', type: 'text', label: 'Number', hint: 'e.g. 01' },
      { name: 'title', type: 'text', label: 'Step', required: true },
      { name: 'body', type: 'textarea', label: 'What happens' }
    ],
    seed: [
    { step: '01', title: 'Inquiry', body: 'Fill out the Admission Inquiry Form below.' },
    { step: '02', title: 'Counsel', body: 'Our counselor schedules a campus visit and interaction.' },
    { step: '03', title: 'Register', body: 'Submit required documents and complete the registration at the school office.' },
    { step: '04', title: 'Welcome', body: 'Receive confirmation and orientation details for the upcoming session.' }
    ]
  },
  {
    key: 'clubs',
    group: 'Student life',
    label: 'Co-curricular clubs',
    blurb: 'The clubs listed on the co-curricular page.',
    itemNoun: 'club',
    titleField: 'name',
    fields: [
      { name: 'name', type: 'text', label: 'Club', required: true },
      { name: 'description', type: 'textarea', label: 'What it does' },
      { name: 'outcome', type: 'text', label: 'What students gain' }
    ],
    seed: [
    {
      name: 'Leadership & Student Council',
      description:
        'Develops leadership, responsibility, and decision making through assemblies, event planning, house activities, and school initiatives.',
      outcome: 'Confident speakers, responsible leaders, strong character.'
    },
    {
      name: 'Sports & Fitness',
      description:
        'Focuses on physical development, teamwork, and discipline with structured games, fitness routines, and intra-school sports activities.',
      outcome: 'Active lifestyle, teamwork, physical fitness, positive energy.'
    },
    {
      name: 'Creative Expression',
      description:
        'Umbrella platform for art, music, dance, and stage performance. Students explore creativity, perform during events, and elevate school aesthetics.',
      outcome: 'Confidence, self-expression, stage presence.'
    },
    {
      name: 'Language & Communication',
      description:
        'Strengthens speaking, reading, storytelling, and public communication in English and Hindi through debates, storytelling sessions, and presentations.',
      outcome: 'Improved communication, clarity of thought, confidence in expression.'
    },
    {
      name: 'Wellness & Yoga',
      description:
        'Centres on emotional balance, mindfulness, posture, breathing, and basic yoga practices to maintain calm and focus.',
      outcome: 'Emotional stability, improved focus, healthy habits.'
    }
    ]
  },
  {
    key: 'studentPillars',
    group: 'Student life',
    label: 'Student life pillars',
    blurb: 'The three pillars on the student life page.',
    itemNoun: 'pillar',
    titleField: 'title',
    fields: [
      { name: 'title', type: 'text', label: 'Pillar', required: true },
      { name: 'description', type: 'textarea', label: 'Description' }
    ],
    seed: [
    {
      title: 'Houses & Belonging',
      description:
        'Eight houses inspired by the animal kingdom give every Eldenite a tribe — a place to lead, support, compete with grace, and discover who they are beyond the classroom.'
    },
    {
      title: 'Sports & Wellness',
      description:
        'Structured games, fitness, yoga, and inter-house tournaments shape a body that listens to a disciplined mind — and a mind that thrives in a healthy, energetic body.'
    },
    {
      title: 'Beyond Academics',
      description:
        'Interest-led clubs and the Life Readiness Program invite every learner to follow curiosity into mastery and prepare for the real world beyond the classroom.'
    }
    ]
  },
  {
    key: 'sports',
    group: 'Student life',
    label: 'Sports',
    blurb: 'The sports programmes offered.',
    itemNoun: 'sport',
    titleField: 'name',
    fields: [
      { name: 'name', type: 'text', label: 'Sport', required: true },
      { name: 'description', type: 'textarea', label: 'Description' }
    ],
    seed: [
    {
      name: 'Athletics & Track',
      description:
        'Sprints, relays, long-distance, and field events that build stamina, technique, and the unforgettable adrenaline of inter-house meets.'
    },
    {
      name: 'Football & Cricket',
      description:
        'Structured coaching, age-appropriate practice cycles, and competitive house leagues that teach teamwork, strategy, and sportsmanship.'
    },
    {
      name: 'Basketball & Volleyball',
      description:
        'Court games that develop quick decision-making, spatial awareness, vertical strength, and the joy of synchronised teamwork.'
    },
    {
      name: 'Badminton & Table Tennis',
      description:
        'Indoor disciplines that sharpen reflexes, hand-eye coordination, and one-on-one focus through ladder tournaments and clubs.'
    },
    {
      name: 'Yoga & Karate',
      description:
        'Breath, posture, mindful movement, and the disciplined art of self-defence — practices that calm the mind as they strengthen the body.'
    },
    {
      name: 'Chess & Mind Sports',
      description:
        'Strategic thinking, patience, and pattern recognition cultivated through chess, carrom, and brain-game tournaments throughout the year.'
    }
    ]
  },
  {
    key: 'lifeReadiness',
    group: 'Student life',
    label: 'Life Readiness modules',
    blurb: 'The modules in the Life Readiness Program.',
    itemNoun: 'module',
    titleField: 'title',
    fields: [
      { name: 'title', type: 'text', label: 'Module', required: true },
      { name: 'description', type: 'textarea', label: 'What it covers' },
      { name: 'outcome', type: 'text', label: 'Outcome' }
    ],
    seed: [
    {
      title: 'Financial Literacy & ATM Usage',
      description:
        'Students learn how to use an ATM, understand debit and digital payments, basic banking behaviour, and money responsibility.',
      outcome: 'Financially aware, independent children.'
    },
    {
      title: 'Basic Nursing & First Aid',
      description: 'Training in basic first aid, handling minor injuries, emergency response, and CPR awareness.',
      outcome: 'Safety awareness, calmness during emergencies.'
    },
    {
      title: 'Digital Safety & Online Awareness',
      description: 'Covers password safety, online behaviour, scam awareness, and responsible screen usage.',
      outcome: 'Digitally responsible and secure children.'
    },
    {
      title: 'Public Behaviour & Personal Safety',
      description: 'Road safety, emergency response, public etiquette, asking for help, and situational awareness.',
      outcome: 'Street-smart and confident children.'
    },
    {
      title: 'Everyday Documentation',
      description: 'Students learn to read bills, understand receipts, fill simple forms, and manage basic documentation.',
      outcome: 'Practical intelligence and independence.'
    }
    ]
  },
  {
    key: 'accreditation',
    group: 'Core',
    label: 'Accreditation & standards',
    blurb: 'The accreditation and compliance statements on the core page.',
    itemNoun: 'item',
    titleField: 'title',
    fields: [
      { name: 'title', type: 'text', label: 'Title', required: true },
      { name: 'detail', type: 'text', label: 'Short label' },
      { name: 'description', type: 'textarea', label: 'Description' }
    ],
    seed: [
    {
      title: 'Bhagwati Educational & Charitable Trust',
      detail: 'Registered Trust Stewardship',
      description:
        'The Elden Heights operates under the Bhagwati Educational & Charitable Trust, ensuring transparent governance and responsible oversight.'
    },
    {
      title: 'CBSE-Aligned Academic Framework',
      detail: 'Affiliation Readiness',
      description:
        'Curriculum, safety, and operational protocols are structured to meet CBSE norms with ongoing audits to maintain compliance.'
    },
    {
      title: 'Safety & Child Protection Compliance',
      detail: 'Annual Policy Review',
      description:
        'Safeguarding standards are reviewed each year across transport, campus security, and classroom practices to uphold student well-being.'
    },
    {
      title: 'Operational Excellence Standards',
      detail: 'Process Documentation',
      description:
        'ISO-ready documentation practices guide academic, administrative, and facility workflows for consistent quality delivery.'
    },
    {
      title: 'Sports & Co-Curricular Recognition',
      detail: 'District & Intra-School Certifications',
      description:
        'Teams participate in certified events with documented coaching plans, fair-play pledges, and safety protocols.'
    }
    ]
  },
  {
    key: 'missionStages',
    group: 'About',
    label: 'Mission stages',
    blurb: 'Roots, Ascent, Radiance and Eternity — the four-stage philosophy.',
    itemNoun: 'stage',
    titleField: 'title',
    fields: [
      { name: 'title', type: 'text', label: 'Stage', required: true },
      { name: 'copy', type: 'textarea', label: 'Description' }
    ],
    seed: [
    { title: 'Roots', copy: 'The foundation — where discipline, virtue, and cultural heritage are instilled. The child is grounded like the roots of an ancient tree, drawing strength from values that endure.' },
    { title: 'Ascent', copy: 'With firm ground, the learner begins to rise. Exploration, resilience, and intellectual awakening. A spirit that questions, seeks, and climbs with dignity toward truth.' },
    { title: 'Radiance', copy: 'As wisdom matures, the individual begins to illuminate. Talents unfold, leadership emerges. Students radiate creativity, innovation, and excellence.' },
    { title: 'Eternity', copy: 'The pinnacle — where learning transcends achievement and becomes legacy. The Eldenite embodies purpose, virtue, and vision that echo through generations.' }
    ]
  },
  {
    key: 'testimonials',
    group: 'Marketing',
    label: 'Testimonials',
    blurb: 'Parent quotes shown on the admissions flow.',
    itemNoun: 'testimonial',
    titleField: 'quote',
    fields: [
      { name: 'quote', type: 'textarea', label: 'Quote', required: true },
      { name: 'author', type: 'text', label: 'Attribution', hint: 'e.g. Parent of Grade 3 Student' }
    ],
    seed: [
    {
      quote: 'Smooth admission process and very supportive staff.',
      author: 'Parent of Grade 3 Student'
    },
    {
      quote: 'Safe environment and strong academics. Highly recommended.',
      author: 'Parent of Grade 6 Student'
    }
    ]
  },
  {
    key: 'admissionDocuments',
    group: 'Admission',
    label: 'Documents required',
    blurb: 'What a family must bring to register.',
    itemNoun: 'document',
    titleField: 'title',
    fields: [
      { name: 'title', type: 'text', label: 'Document', required: true }
    ],
    seed: [
      { title: 'Birth Certificate (original and photocopy)' },
      { title: 'Previous Report Card (where applicable)' },
      { title: 'Transfer Certificate (for higher grades)' },
      { title: 'Two recent passport-size photographs' },
      { title: 'Parent&rsquo;s ID Proof (Aadhaar or equivalent)' }
    ]
  },
  {
    key: 'academicStages',
    group: 'Academics',
    label: 'Learning stages',
    blurb: 'The stages of the learning journey. Their photographs are managed under Site Images.',
    itemNoun: 'stage',
    titleField: 'title',
    fields: [
      { name: 'title', type: 'text', label: 'Stage', required: true },
      { name: 'grades', type: 'text', label: 'Grades', hint: 'e.g. Grade III – Grade V' },
      { name: 'homeSummary', type: 'textarea', label: 'Short summary', hint: 'Shown on the homepage.' },
      { name: 'summary', type: 'textarea', label: 'Full description', hint: 'Shown on the academics page.' },
      { name: 'focus', type: 'list', label: 'Areas of focus', itemLabel: 'Focus area' }
    ],
    seed: [
    {
      title: 'Foundational Stage',
      grades: 'Nursery – Grade II',
      homeSummary: 'Play-integrated discovery builds curiosity, language, and confidence in every young learner.',
      summary:
        'The early years of learning focus on developing curiosity and a love for discovery. Students are introduced to language, numbers, and environmental awareness through activity-based, play-integrated methods. The classroom becomes a space for imagination, storytelling, and exploration, where every question is valued and every answer is celebrated.',
      focus: [
        'Literacy and numeracy skills',
        'Sensory and experiential learning',
        'Art, rhythm, and movement',
        'Building social and emotional understanding'
      ]
    },
    {
      title: 'Preparatory Stage',
      grades: 'Grade III – Grade V',
      homeSummary: 'Concept-based lessons encourage independent thought, teamwork, and fearless self-expression.',
      summary:
        'This is where the spark of learning becomes structured knowledge. Students are guided through concept-based learning that strengthens their understanding of core subjects. Teachers encourage independent thought, teamwork, and communication skills through interactive lessons and small projects.',
      focus: [
        'Concept-based understanding across subjects',
        'Introduction to scientific and digital tools',
        'Creative writing and expression',
        'Early exposure to life skills and values'
      ]
    },
    {
      title: 'Middle Stage',
      grades: 'Grade VI – Grade VIII',
      homeSummary: 'Learners transition to self-driven exploration, connecting theory with real-world challenges.',
      summary:
        'The middle school years shape analytical thinking. Students transition from guided learning to self-driven exploration. They dive deeper into subjects like Mathematics, Science, Social Studies, and Languages while participating in project-based learning that connects theory with real-life situations.',
      focus: [
        'Critical and analytical thinking',
        'STEM-oriented learning modules',
        'Collaborative and research-based projects',
        'Digital literacy and innovation challenges'
      ]
    },
    {
      title: 'Secondary Stage',
      grades: 'Grade IX – Grade X',
      homeSummary: 'Focused mentorship balances board preparation with leadership, ethics, and personal growth.',
      summary:
        'This is the phase where knowledge meets direction. Students begin focused preparation for board examinations while engaging in leadership roles, debates, and community-based projects. The emphasis remains on balanced development — academic achievement with personal growth and ethical responsibility.',
      focus: [
        'Structured CBSE board preparation',
        'Advanced conceptual clarity and practice',
        'Skill-based subjects and electives',
        'Mentorship and counseling for career readiness'
      ]
    }
    ]
  },
  {
    key: 'keyFacts',
    group: 'Homepage',
    label: 'Key facts',
    blurb: 'The figures under the homepage hero. These are public claims — keep them accurate.',
    itemNoun: 'fact',
    titleField: 'label',
    fields: [
      { name: 'figure', type: 'text', label: 'Figure', required: true, hint: 'e.g. 1999, CBSE, Top 10' },
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'caption', type: 'text', label: 'Caption' }
    ],
    seed: [
    { figure: '1999', label: 'Year established', caption: 'A quarter century of teaching' },
    { figure: 'CBSE', label: 'Affiliated curriculum', caption: 'Recognised board syllabus' },
    { figure: 'UKG–X', label: 'Grades taught', caption: 'One continuous journey' },
    { figure: 'Top 10', label: 'Regional standing', caption: 'Among schools in Hazaribagh' }
    ]
  },
  {
    key: 'ethosStats',
    group: 'Homepage',
    label: 'Ethos statistics',
    blurb: 'The three figures beside the school promise. Public claims — keep them defensible.',
    itemNoun: 'statistic',
    titleField: 'label',
    fields: [
      { name: 'figure', type: 'text', label: 'Figure', required: true },
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'caption', type: 'text', label: 'Caption' }
    ],
    seed: [
    { figure: '99%', label: 'Parent trust', caption: 'Reported year on year' },
    { figure: 'Top 10', label: 'Regional rank', caption: 'Among CBSE schools' },
    { figure: '4', label: 'Learning stages', caption: 'Roots to Eternity' }
    ]
  },
  {
    key: 'ethosPillars',
    group: 'Homepage',
    label: 'Ethos pillars',
    blurb: 'The short promises listed beside the school ethos.',
    itemNoun: 'pillar',
    titleField: 'title',
    fields: [
      { name: 'title', type: 'text', label: 'Promise', required: true }
    ],
    seed: [
      { title: 'Heritage-inspired campus experiences blended with modern pedagogy.' },
      { title: 'Guided pathways through Roots, Ascent, Radiance, and Eternity.' },
      { title: 'Dedicated mentorship and personalised attention at every stage.' }
    ]
  },
  {
    key: 'leadershipNotes',
    group: 'About',
    label: 'Leadership letters',
    blurb: 'The letters from the Principal and the Managing Director. Each paragraph is a separate line.',
    itemNoun: 'letter',
    titleField: 'heading',
    keyed: true,
    keys: [
      { key: 'principal-note', label: 'Note from the Principal' },
      { key: 'md-note', label: 'Note from the Managing Director' }
    ],
    fields: [
      { name: 'heading', type: 'text', label: 'Label', hint: 'e.g. Note from the Principal' },
      { name: 'author', type: 'text', label: 'Signed by' },
      { name: 'paragraphs', type: 'list', label: 'Paragraphs', itemLabel: 'Paragraph' }
    ],
    seed: [
      { key: 'principal-note', heading: 'Note from the Principal', author: 'R.K. Singh', paragraphs: [
        'At The Elden Heights, our vision is straightforward. Every child who walks into this campus should discover who they are and what they can become. We focus on strong academics, clear values and a learning environment that pushes students to think, question and grow with confidence.',
        'Our four-stage philosophy — Roots, Ascent, Radiance and Eternity — guides each student through a journey that builds discipline, curiosity, communication and leadership. These are not just words on a brochure. These are practices we apply in classrooms, activities and daily interactions.',
        'We combine a heritage-inspired culture with modern teaching methods. Students learn to stay grounded while being prepared for a world that is changing fast. They learn to work hard, make responsible choices and take pride in their growth.',
        'My commitment as the Principal is to maintain a school where learning feels purposeful, teachers stay motivated and parents feel assured about their child’s future. This is a shared responsibility and at Elden Heights, we take it seriously.',
        'Your child deserves a school that believes in their potential and helps them rise towards it every day. That is the promise of The Elden Heights.'
      ] },
      { key: 'md-note', heading: 'Note from the Managing Director', author: 'Mr. Shashi Shankar Prasad', paragraphs: [
        'The Elden Heights was built with one clear intention. To create a school that doesn’t just teach students, but shapes their entire life trajectory. We are not here to copy the standard school model. We are here to raise the benchmark for what education should feel like in our city and beyond.',
        'Every decision we make — infrastructure, teachers, culture, systems, activities — reflects one thought. Will this help a child grow into a stronger human being? If the answer is no, we don’t do it. Simple.',
        'Our four-stage philosophy — Roots, Ascent, Radiance and Eternity — is at the core of everything. It ensures our students begin with strong foundations, rise with discipline, express themselves with confidence and eventually step out as capable young adults who can face a complex world with clarity.',
        'We are building a school culture that values effort over shortcuts, character over noise and long-term growth over temporary wins. The goal is not just good results. The goal is responsible, confident and well-rounded individuals.',
        'As the director, my responsibility is to ensure that this institution stays true to its purpose, evolves with time and continues to offer an environment where students, teachers and parents feel aligned towards a shared future.',
        'The Elden Heights is not just a school. It is a journey of becoming. And we are committed to walking that journey with every child who joins us.'
      ] }
    ]
  }
];

/** Collections grouped for the portal's sidebar, in declaration order. */
export const groupedCollections = () => {
  const out = [];
  const index = new Map();
  contentCollections.forEach((c) => {
    const group = c.group || 'Other';
    if (!index.has(group)) {
      const entry = { group, collections: [] };
      index.set(group, entry);
      out.push(entry);
    }
    index.get(group).collections.push(c);
  });
  return out;
};

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
