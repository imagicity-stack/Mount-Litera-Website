/**
 * Edenwoods Merit Scholarship 2027 — page copy.
 *
 * Kept apart from the domain layer so the words can be revised without going
 * near the registration logic. The Terms below are a faithful transcription of
 * the signed Terms and Conditions document; the page and the document must say
 * the same thing, so edit them together.
 */

import { contact, keyDates, scholarship, venue } from '@/lib/scholarship';

export const hero = {
  eyebrow: 'An initiative of Edenwoods Eduhub Foundation',
  headline: `Edenwoods Merit Scholarship 2027: up to 100% tuition waiver at ${scholarship.school}`,
  supporting:
    'One test. Eight full scholarships. A tuition waiver for the 2027–28 session for children joining Nursery to Class IX — decided on what your child can do, not on what you can pay.',
  feeLine: 'Test fee ₹199',
  cta: 'Register your child'
};

/** The four dates that decide whether a parent acts today. */
export const timeline = [
  { ...keyDates.registrationCloses, title: 'Registration closes' },
  { ...keyDates.admitCard, title: 'Admit card on WhatsApp' },
  { ...keyDates.test, title: 'Test day' },
  { ...keyDates.results, title: 'Results' }
];

export const eligibility = {
  title: 'Who can apply',
  lede: `Children seeking new admission to ${scholarship.school} in Nursery, LKG, UKG or Class I to IX for the ${scholarship.session} session.`,
  points: [
    'Open to children from any school, anywhere. You do not need any connection to TEHS to sit the test.',
    'One registration per child. A duplicate registration is cancelled without a refund.',
    'Children already studying at TEHS are not eligible — this scholarship is for new admissions only.'
  ]
};

export const steps = [
  {
    step: '01',
    title: 'Register and pay ₹199',
    body: 'Fill the form below and pay the ₹199 test fee online. It is non-refundable. You get a registration number and a receipt straight away.'
  },
  {
    step: '02',
    title: 'Receive the admit card',
    body: `Your admit card reaches you on WhatsApp on ${keyDates.admitCard.short}, and by email the moment you register. It carries the reporting time and, for Class III to IX, the subjects.`
  },
  {
    step: '03',
    title: 'Sit the test on 5 November',
    body: `A play activity for Nursery to Class II, a written paper for Class III to IX — at the ${venue.name} campus, Silwar.`
  },
  {
    step: '04',
    title: 'Results, then claim with ₹500',
    body: `Results on ${keyDates.results.short}. To claim a scholarship you submit the TEHS admission form, which costs ₹500 and is paid to the school. Claim by ${keyDates.claimDeadline.short} or the scholarship lapses.`
  }
];

export const covered = {
  yes: [
    'The tuition fee for the 2027–28 session, by the percentage won'
  ],
  no: [
    'The ₹500 admission form fee',
    'Admission fee and annual charges',
    'Transport, books and uniform',
    'Examination fees and activity fees',
    'Any other charge in the TEHS fee structure'
  ],
  notes: [
    'The waiver applies to the 2027–28 session only. It does not continue automatically into later years.',
    'It cannot be exchanged for cash, transferred to another child, or combined with any other TEHS fee concession unless TEHS agrees in writing.',
    'If the child leaves TEHS during the session, the remaining waiver ends. No cash refund is given for it.'
  ]
};

export const aboutSchool = {
  title: `About ${scholarship.school}`,
  lines: [
    'A CBSE school in Silwar, Hazaribagh, for children from Nursery through Class X.',
    'Small classes, teachers who mentor rather than lecture, and a day that balances strong academics with sport, music and the arts.',
    'A campus built for learning: digitally equipped classrooms, open playing fields and a library at the centre of it.'
  ],
  foundationLine:
    'The Edenwoods Merit Scholarship 2027 is offered by Edenwoods Eduhub Foundation. The test, the merit list and the scholarship are the Foundation’s; the admission that follows is the school’s.'
};

export const faqs = [
  {
    question: 'Is the ₹199 refundable?',
    answer:
      'No. The ₹199 registration fee is non-refundable, including if your child does not appear for the test or does not win a scholarship. The one exception is if the test itself is cancelled completely, in which case it is refunded.'
  },
  {
    question: 'Do I have to pay ₹500 as well?',
    answer:
      'Only if your child wins and you want to claim the scholarship. The ₹500 is the TEHS admission form fee, paid to the school, not to Edenwoods. You pay nothing beyond ₹199 to sit the test.'
  },
  {
    question: 'What if my child doesn’t win?',
    answer:
      'Every child who takes the test receives a certificate of participation, and you can still apply to TEHS through the normal admission process. Taking the test neither helps nor harms a normal application.'
  },
  {
    question: 'Are transport, books and uniform included?',
    answer:
      'No. The scholarship is a waiver on the tuition fee only. Transport, books, uniform, the admission fee, annual charges, examination fees and activity fees are all paid as per the TEHS fee structure.'
  },
  {
    question: 'Can children already studying at TEHS take the test?',
    answer:
      'No. The scholarship is for new admissions to TEHS for the 2027–28 session, so children already studying at the school are not eligible.'
  },
  {
    question: 'How long does the scholarship last?',
    answer:
      'For the 2027–28 session only. It does not renew automatically, and there is no guarantee of a scholarship in later years.'
  },
  {
    question: 'Why is Class X not included?',
    answer:
      'CBSE board registration for Class X happens while a student is in Class IX, so a child cannot transfer into Class X mid-board. Class IX is the highest class in this scholarship.'
  },
  {
    question: 'My child is nervous about tests. Is this an exam?',
    answer:
      'For Nursery to Class II it is not an exam at all — it is a short play activity with a teacher, with you in the room. For Class III to Class IX it is a written paper based on the class your child is in now, not the one they are applying for.'
  },
  {
    question: 'What if we cannot come on 5 November?',
    answer:
      'The test is held on one day only and cannot be taken on another date. If the date or venue has to change for reasons outside our control, every registered parent is told on WhatsApp.'
  },
  {
    question: 'How will I know the result?',
    answer: `Results are announced on ${keyDates.results.label} on WhatsApp, and can be checked with your registration number. The public merit list shows registration numbers and classes only — a child's name or photograph is shared only with the parent's permission.`
  }
];

// -------------------------------------------------------------------- Terms

/**
 * The Terms and Conditions, numbered as in the signed document so a parent
 * quoting "clause 6.5" and a member of staff reading this page are looking at
 * the same line.
 */
export const terms = {
  title: 'Edenwoods Merit Scholarship 2027: Terms and Conditions',
  intro:
    'Please read these terms before paying the ₹199 registration fee. By registering your child, you agree to them.',
  updated: '20 October 2026',
  sections: [
    {
      heading: 'About the scholarship',
      items: [
        'The Edenwoods Merit Scholarship 2027 is offered by Edenwoods Eduhub Foundation ("Edenwoods").',
        'It is for children taking admission at The Elden Heights School ("TEHS"), Silwar, Hazaribagh, Jharkhand, for the academic session 2027-28.',
        'The scholarship is a waiver on the tuition fee for session 2027-28 only.'
      ]
    },
    {
      heading: 'Who can apply',
      items: [
        'Children seeking new admission to TEHS in Nursery, LKG, UKG or Class I to IX for session 2027-28.',
        'Class X is not included, as CBSE board registration for Class X students happens in Class IX.',
        'Students already studying at TEHS are not eligible, as this scholarship is for new admissions only.',
        'Only one registration is allowed per child. Duplicate registrations will be cancelled without refund.'
      ]
    },
    {
      heading: 'Registration fee',
      items: [
        'The registration fee is ₹199 per child, paid online to Edenwoods Eduhub Foundation. Edenwoods issues the receipt. Payment is collected through The Elden Heights School’s payment gateway on behalf of the Foundation.',
        'The fee is non-refundable, including if the child does not appear for the test or does not win a scholarship.',
        'Registration is confirmed only after the payment is successful. A registration number and receipt will be sent on WhatsApp.',
        `The last date to register is ${keyDates.registrationCloses.label}.`
      ]
    },
    {
      heading: 'The test',
      items: [
        `The test will be held on ${keyDates.test.label} at the TEHS campus, Silwar, Hazaribagh.`,
        'Nursery to Class II: a short play-based activity in a time slot, with a parent present.',
        'Class III to IX: a written test. Subjects and reporting time will be on the admit card.',
        `The admit card will be sent on WhatsApp on ${keyDates.admitCard.label}. Please bring it on test day.`,
        'A child who misses the test cannot take it again on another day.',
        'Any child found copying or using unfair means will be disqualified.',
        'Parents are responsible for their child’s travel to and from the campus.'
      ]
    },
    {
      heading: 'Results and scholarship levels',
      lede: `Results will be announced on ${keyDates.results.label} on WhatsApp and can be checked with the registration number.`,
      table: true,
      items: [
        'There are 8 full (100%) scholarships in total across all classes. A full scholarship needs a score of 90% or more. If no child in a class group reaches 90%, no full scholarship is given in that group.',
        'If two or more children have the same score for a limited number of full scholarships, the scholarship committee will decide, which may include a short interaction with the child and parent.',
        'Answer sheets will not be re-checked or re-evaluated.',
        'The public merit list will show registration numbers and classes only. A child’s name or photo will be shared only with the parent’s permission.'
      ]
    },
    {
      heading: 'Claiming the scholarship',
      items: [
        `To claim a scholarship, the parent must submit the TEHS admission form by ${keyDates.claimDeadline.label}. The admission form fee is ₹500, paid to TEHS, which issues its own receipt.`,
        'Admission must then be completed within the time given by TEHS, as per TEHS admission rules.',
        'Edenwoods confirms the scholarship after checking the ₹199 registration and the submitted admission form.',
        'Documents needed at the time of claim: the child’s birth certificate, last report card, transfer certificate (where applicable) and passport-size photographs.',
        `A scholarship not claimed by ${keyDates.claimDeadline.label} will lapse. No extension will be given.`
      ]
    },
    {
      heading: 'What the scholarship covers',
      items: [
        'The scholarship covers the tuition fee for session 2027-28 only, by the percentage won.',
        'It does not cover the ₹500 admission form fee, admission fee, annual charges, transport, books, uniform, examination fees, activity fees or any other charges. These are paid as per the TEHS fee structure.',
        'The scholarship is valid for session 2027-28 only. It does not continue automatically into later years.',
        'It cannot be exchanged for cash, transferred to another child, or combined with any other TEHS fee concession unless TEHS agrees in writing.',
        'If the child leaves TEHS during the session, the remaining waiver ends. No cash refund is given for it.',
        'The scholarship may be withdrawn if any information given at registration is found to be false.'
      ]
    },
    {
      heading: 'Your information',
      items: [
        'The details you give at registration are shared between Edenwoods and TEHS only for running the test, the scholarship and admission.',
        'We will send updates about the test, results and admission on WhatsApp and SMS.',
        'Your details will not be sold or shared with anyone else.'
      ]
    },
    {
      heading: 'General terms and contact',
      items: [
        'If the test date or venue has to change for reasons beyond our control, all registered parents will be informed on WhatsApp.',
        'If the test is cancelled completely, the ₹199 registration fee will be refunded.',
        'Edenwoods and TEHS may update these terms. The latest version will always be on this page.',
        'The decision of the scholarship committee on all matters is final.',
        'Any dispute will be subject to the jurisdiction of courts in Hazaribagh, Jharkhand.'
      ]
    }
  ],
  contact: {
    lede: 'Questions? Contact the TEHS admissions office.',
    items: [
      `WhatsApp and phone: ${contact.whatsapp}`,
      `Email: ${contact.email}`,
      `Address: ${venue.name}, Silwar, Hazaribagh, Jharkhand`
    ]
  }
};

/** The line shown above the pay button and on the receipt. Both fees, one size. */
export const feeDisclosure =
  'Edenwoods Merit Scholarship 2027. Registration fee ₹199 (non-refundable). Winners claim their scholarship through the TEHS admission form (₹500).';
