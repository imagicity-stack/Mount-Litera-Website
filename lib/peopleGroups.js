/**
 * The people directory: everyone the school lists publicly.
 *
 * Records live in the Firestore collection `people` and photographs in the
 * Firebase Storage bucket under `people/{group}/`. Each group below also
 * carries the roster the site shipped with — that seed is what renders until
 * the directory has entries for a group, so a page can never come up empty
 * because nobody has filled the backend in yet.
 */

export const PEOPLE_COLLECTION = 'people';
export const PEOPLE_STORAGE_PREFIX = 'people';

/** Photographs already in /public, matched to the names they belong to. */
const teacherPhoto = (file) => `/teachers/${file}`;

export const peopleGroups = [
  {
    key: 'council',
    label: 'The Elden Council',
    page: '/the-elden-council',
    blurb: 'Trustees who steward the school’s purpose, finances, and long-term vision.',
    hasDepartments: false,
    roleLabel: 'Title',
    rolePlaceholder: 'Trustee',
    seed: [
      { name: 'Anit Ankur', designation: 'Settlor' },
      { name: 'Shashi Shankar Prasad', designation: 'Managing Trustee', photo: teacherPhoto('shashi-shankar-prasad.jpg') },
      { name: 'Vinita Ankur', designation: 'Trustee' },
      { name: 'Vandana Prasad', designation: 'Trustee' }
    ]
  },
  {
    key: 'mentors',
    label: 'Core Mentors',
    page: '/core-mentors',
    blurb: 'Teaching and support staff, grouped by department.',
    hasDepartments: true,
    roleLabel: 'Designation',
    rolePlaceholder: 'Mathematics',
    departments: [
      'Administration',
      'Information Technology',
      'Teaching',
      'Music',
      'Sports',
      'Store Keeper'
    ],
    seed: [
      { department: 'Administration', name: 'R.K. Singh', designation: 'Principal', photo: teacherPhoto('principal.png') },
      { department: 'Administration', name: 'Prarthana Mishra', designation: 'Relationship Manager', photo: teacherPhoto('prarthana-mishra.png') },
      { department: 'Administration', name: 'Piyush Sinha', designation: 'Accounting Manager', photo: teacherPhoto('piyush-sinha.png') },
      { department: 'Administration', name: 'MD Hadis', designation: 'Transport & Admin Manager', photo: teacherPhoto('md-hadis.jpg') },
      { department: 'Information Technology', name: 'Sushil Sinha', designation: 'IT Head' },
      { department: 'Teaching', name: 'Shama Perween', designation: 'Maths', photo: teacherPhoto('shama-perween.png') },
      { department: 'Teaching', name: 'Nitesh Kumar', designation: 'Maths', photo: teacherPhoto('nitesh-kumar.png') },
      { department: 'Teaching', name: 'Sameeksha Sinha', designation: 'Social Studies', photo: teacherPhoto('sameeksha-sinha.png') },
      { department: 'Teaching', name: 'Sangeeta Agarwal', designation: 'English', photo: teacherPhoto('sangeeta-agarwal.png') },
      { department: 'Teaching', name: 'Smita Sinha', designation: 'Maths', photo: teacherPhoto('smita-sinha.png') },
      { department: 'Teaching', name: 'Pratiksha Prasoon', designation: 'Hindi', photo: teacherPhoto('pratiksha-prasoon.png') },
      { department: 'Teaching', name: 'Saba Naaz', designation: 'Multiple Subjects', photo: teacherPhoto('saba-naaz.png') },
      { department: 'Teaching', name: 'Nitika Gupta', designation: 'Multiple Subjects', photo: teacherPhoto('nitika gupta.png') },
      { department: 'Teaching', name: 'Manila Awadhya', designation: 'Multiple Subjects', photo: teacherPhoto('manila-awadhya.png') },
      { department: 'Teaching', name: 'Seema Bakshi', designation: 'Multiple Subjects', photo: teacherPhoto('seema-bakshi.png') },
      { department: 'Teaching', name: 'Kailash Devi', designation: 'Hindi', photo: teacherPhoto('kailash-devi.png') },
      { department: 'Teaching', name: 'Ritesh Kumar', designation: 'Science', photo: teacherPhoto('ritesh kumar.png') },
      { department: 'Music', name: 'Sushma Minz', designation: 'Vocalist', photo: teacherPhoto('sushma minz.png') },
      { department: 'Sports', name: 'Sagar Kumar', designation: 'Yoga & Karate', photo: teacherPhoto('sagar-kumar.png') },
      { department: 'Sports', name: 'C.K. Yadav', designation: 'Overall Sports', photo: teacherPhoto('ck-yadav.png') },
      { department: 'Store Keeper', name: 'Santosh Kumar', designation: 'Store Keeper' }
    ]
  },
  {
    key: 'committee',
    label: 'Managing Committee',
    page: '/managing-committee',
    blurb: 'Operational leadership: safety, infrastructure, and day-to-day running.',
    hasDepartments: false,
    roleLabel: 'Role',
    rolePlaceholder: 'Committee Member',
    seed: []
  }
];

export const peopleGroupMap = peopleGroups.reduce((acc, group) => {
  acc[group.key] = group;
  return acc;
}, {});

export const isKnownGroup = (key) =>
  Object.prototype.hasOwnProperty.call(peopleGroupMap, key);

/** Two initials, for the placeholder shown when someone has no photograph. */
export const initialsOf = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * The seed roster for a group, shaped like a stored record so callers can
 * treat seeded and stored people identically.
 */
export const seedFor = (groupKey) => {
  const group = peopleGroupMap[groupKey];
  if (!group) return [];
  return group.seed.map((person, index) => ({
    id: `seed:${groupKey}:${index}`,
    group: groupKey,
    department: person.department || '',
    name: person.name,
    designation: person.designation || '',
    photo: person.photo || '',
    bio: '',
    order: index,
    status: 'published',
    seeded: true
  }));
};

/**
 * Group a flat list of people by department, preserving the department order
 * declared above and appending any department the directory has invented.
 */
export const byDepartment = (groupKey, people) => {
  const group = peopleGroupMap[groupKey];
  const known = group?.departments || [];
  const buckets = new Map();

  people.forEach((person) => {
    const dept = person.department || 'Other';
    if (!buckets.has(dept)) buckets.set(dept, []);
    buckets.get(dept).push(person);
  });

  const ordered = [];
  known.forEach((dept) => {
    if (buckets.has(dept)) {
      ordered.push({ department: dept, mentors: buckets.get(dept) });
      buckets.delete(dept);
    }
  });
  buckets.forEach((mentors, department) => ordered.push({ department, mentors }));

  return ordered;
};
