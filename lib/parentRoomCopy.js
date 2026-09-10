/**
 * The Parent Room — page copy.
 *
 * Kept apart from the domain layer so the words can be revised without going
 * near the booking logic, and so the campaign variants sit next to the default
 * they replace.
 */

export const PARENT_ROOM_PATH = '/parent-room';

export const parentRoomIdentity = {
  name: 'The Parent Room',
  tagline: 'Because growing up doesn’t come with a manual.',
  positioning: 'A private parent guidance initiative by The Elden Heights School.'
};

export const heroDefault = {
  headline: 'There are some questions about your child that Google cannot answer.',
  supporting:
    'Sometimes you don’t need another article, another opinion or another lecture. You just need someone to listen, understand the situation and help you look at it differently.',
  trust: 'No judgement. No admission pressure. Just a conversation.'
};

/**
 * One page, many advertisements.
 *
 * A creative can open the page with the line the parent just clicked on by
 * passing `?variant=screen-time`, or by using a `utm_content` value of the same
 * name — so the ad manager never has to be given a second URL to get wrong.
 * Only the supporting line changes; the headline and the offer stay put.
 */
export const heroVariants = {
  'screen-time': {
    supporting:
      'When taking the phone away has become a daily argument, maybe the conversation needs to start somewhere else.'
  },
  'school-change': {
    supporting:
      'Before changing your child’s school, understand what actually needs changing.'
  },
  communication: {
    supporting:
      'When “How was your day?” starts getting only one answer: “Fine.”'
  },
  confidence: {
    supporting:
      'A child who has stopped putting their hand up has usually not stopped knowing the answer.'
  },
  academics: {
    supporting:
      'A drop in marks is the symptom. Half an hour is usually enough to start finding the cause.'
  }
};

export const resolveHero = (variantKey) => {
  const variant = heroVariants[String(variantKey || '').toLowerCase()];
  return variant ? { ...heroDefault, ...variant } : heroDefault;
};

export const sessionFacts = {
  duration: '30 minutes',
  mode: 'Online video conference',
  format: '1-to-1',
  conductedBy: 'Neha Jain'
};

/** The concern cards. Deliberately worded the way a parent would say it. */
export const concernCards = [
  'My child doesn’t talk to me like before',
  'Screen time has become a daily fight',
  'Sudden drop in academic performance',
  'Lack of confidence',
  'Difficulty concentrating',
  'Behaviour changes',
  'School-related stress',
  'Peer relationships',
  'Academic pressure',
  'Parent-child communication',
  'My child seems unhappy at school',
  'Should I consider changing my child’s school?',
  'Teenage behaviour',
  'Study habits',
  'Career or subject confusion',
  'Something else'
];

export const howItWorks = [
  {
    step: '01',
    title: 'Tell us what’s concerning you',
    body: 'Complete a short parent questionnaire.'
  },
  {
    step: '02',
    title: 'Choose your time',
    body: 'Select an available session from the live booking calendar.'
  },
  {
    step: '03',
    title: 'Meet Neha Jain',
    body: 'Join a private 30-minute online conversation.'
  },
  {
    step: '04',
    title: 'Leave with clarity',
    body: 'Receive practical observations and suggested next steps where applicable.'
  }
];

/**
 * The two lines that matter most on the page.
 *
 * The first is a boundary the school has to be able to stand behind; the second
 * is the reason a parent trusts the page at all. They are given their own band
 * rather than a footnote.
 */
export const assurances = [
  {
    title: 'This is guidance, not treatment.',
    body:
      'This session is intended for educational and parental guidance. It should not be represented as medical, psychiatric or clinical psychological treatment.'
  },
  {
    title: 'No admission discussion unless you ask for it.',
    body:
      'The Parent Room exists to help you think about your child, not to move you towards an application. Admissions come up only if you raise them.'
  }
];

export const faq = [
  {
    question: 'Who is this session for?',
    answer:
      'Parents or guardians who would like an outside perspective on educational, behavioural, communication or schooling-related concerns involving their child.'
  },
  {
    question: 'Is this an admission counselling session?',
    answer:
      'No. The Parent Room is designed primarily as a parent-guidance initiative. Admission-related discussion will only happen if the parent specifically requests it.'
  },
  {
    question: 'Is this psychological therapy?',
    answer:
      'No. This is an educational and parental guidance interaction and does not replace professional medical, psychiatric or clinical psychological care.'
  },
  {
    question: 'How long is the session?',
    answer: '30 minutes.'
  },
  {
    question: 'Where does it happen?',
    answer: 'Online, through the video meeting details provided after confirmation.'
  },
  {
    question: 'What is the participation fee?',
    answer: '₹149 per private session.'
  },
  {
    question: 'Can I reschedule?',
    answer:
      'Yes — write to us using the booking ID in your confirmation email and we will move your session, subject to the notice period the school has set and the times still open in the calendar.'
  }
];

/**
 * Wording used wherever the page talks about what happens to what a parent
 * types. It says what is true — the information is used to run the session —
 * and points at the policy rather than making a claim of its own.
 */
export const privacyLine =
  'Your information is used only for managing and conducting your Parent Room interaction, subject to the school’s privacy policy.';

export const stepTitles = [
  'Parent details',
  'Child & concern',
  'Date & time',
  'Review',
  'Confirmation'
];
