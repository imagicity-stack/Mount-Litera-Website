/**
 * Link sets for the section sub-navigation that sits under the masthead on
 * interior pages. Keys match the section label shown before the slash.
 */
export const sectionNav = {
  about: {
    section: 'About Elden Heights',
    links: [
      { label: 'About', href: '/about' },
      { label: "Principal's Note", href: '/about#principal-note' },
      { label: 'Mission and Vision', href: '/about#mission-vision' },
      { label: 'The Elden Council', href: '/the-elden-council' },
      { label: 'Core Mentors', href: '/core-mentors' },
      { label: 'Managing Committee', href: '/managing-committee' }
    ]
  },
  academics: {
    section: 'Academics',
    links: [
      { label: 'Overview', href: '/academics' },
      { label: 'Learning journey', href: '/academics#learning-journey' },
      { label: 'Teaching and support', href: '/academics#teaching-support' },
      { label: 'Beyond textbooks', href: '/academics#beyond-textbooks' },
      { label: 'Life Readiness', href: '/life-readiness-program' }
    ]
  },
  admission: {
    section: 'Admission',
    links: [
      { label: 'Overview', href: '/admission' },
      { label: 'Why Elden Heights', href: '/admission#why-choose-elden-heights' },
      { label: 'Inquiry form', href: '/admission#admission-inquiry' },
      { label: 'Admission Policy', href: '/policies/admission-policy' }
    ]
  },
  studentsLife: {
    section: "Student's Life",
    links: [
      { label: 'Overview', href: '/students-life' },
      { label: 'Houses', href: '/houses' },
      { label: 'Sports', href: '/students-life#sports' },
      { label: 'Beyond Academics', href: '/beyond-academics' },
      { label: 'Co-Curricular Clubs', href: '/co-curricular-clubs' }
    ]
  },
  core: {
    section: 'Core',
    links: [
      { label: 'Overview', href: '/core' },
      { label: 'Awards and Recognition', href: '/awards-and-recognition' },
      { label: 'Accreditation', href: '/core#accreditation' },
      { label: 'Disclosures', href: '/disclosures' }
    ]
  },
  newInitiatives: {
    section: 'New Initiatives',
    links: [
      { label: 'Overview', href: '/new-initiatives' },
      { label: 'Ride to Rise', href: '/new-initiatives#ride-to-rise' },
      { label: 'Life Readiness', href: '/life-readiness-program' },
      { label: 'Gallery', href: '/gallery' }
    ]
  }
};
