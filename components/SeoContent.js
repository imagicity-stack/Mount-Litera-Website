import { useRouter } from 'next/router';

const SEO_CONTENT = {
  '/': {
    heading: 'Elden Heights School overview for families in Hazaribagh',
    paragraphs: [
      'The Elden Heights School is a future-ready school in Hazaribagh, Jharkhand, designed for families who want strong academics with a supportive learning culture. We focus on core literacy, numeracy, and digital readiness while protecting the values that matter to parents: discipline, respect, and steady progress. Our classrooms are built for curiosity, and our teachers guide students with clear routines and kind mentorship so every child feels seen and capable.',
      'Parents exploring admissions often ask about safety, communication, and a balanced routine. Elden Heights keeps parents informed through counselor support, clear admission steps, and thoughtful campus guidance. From UKG through Class 10, the school encourages academic excellence, creativity, and life skills so children grow with confidence. Families in Hazaribagh can expect a structured admission process, transparent information, and a school culture centered on long-term student success.'
    ]
  },
  '/about': {
    heading: 'Leadership, vision, and legacy at Elden Heights',
    paragraphs: [
      'The Elden Heights School is guided by leaders who value strong academics, character, and community trust. Our vision is to build a school environment in Hazaribagh where children feel safe, supported, and inspired to learn. Leadership at Elden Heights focuses on transparency, clear student guidelines, and an ongoing commitment to modernizing the learning experience with digital tools and updated infrastructure.',
      'Parents who want to understand the school’s philosophy will find a steady focus on student well-being, responsible citizenship, and academic rigor. The school’s leadership teams and governance bodies work together to set standards for teaching quality, campus safety, and parent communication. This approach helps families feel confident that their children are growing in a school that values both tradition and forward-thinking education.'
    ]
  },
  '/academics': {
    heading: 'Academic programs built for future-ready learners',
    paragraphs: [
      'Academics at The Elden Heights School are designed to build strong foundations while preparing students for the future. Our curriculum balances conceptual understanding with real-world application, emphasizing critical thinking, problem-solving, and communication. Families in Hazaribagh can expect classroom instruction that blends subject mastery with digital learning tools and thoughtful assessments.',
      'Parents often look for consistency, clear academic expectations, and strong teacher support. Elden Heights responds with structured lesson plans, subject depth, and guidance that helps students stay confident as they progress from UKG through Class 10. We align classroom learning with a broader goal: helping every student develop curiosity, resilience, and the skills needed to succeed in higher studies and life.'
    ]
  },
  '/admission': {
    heading: 'Admission guidance for families planning 2026–27',
    paragraphs: [
      'The Elden Heights School admission process is designed to be clear, supportive, and respectful of each family’s needs. Parents in Hazaribagh can learn the steps, required documents, and timelines in one place so there are no surprises. The school emphasizes transparency, from inquiry to confirmation, and provides counselor support for campus visits and admission interactions.',
      'If you are considering admission for Nursery through Class 10, Elden Heights offers a structured pathway that values readiness and student well-being. Families are encouraged to prepare documents early, ask questions, and explore the campus culture. This focus on clarity helps parents make confident decisions and ensures every child starts the academic year with a smooth transition.'
    ]
  },
  '/awards-and-recognition': {
    heading: 'Celebrating student and school achievements',
    paragraphs: [
      'Awards and recognition at The Elden Heights School highlight the consistent effort of students, educators, and the broader school community. Families in Hazaribagh can explore achievements that reflect academic excellence, leadership, and co-curricular growth. These milestones help parents understand the school’s commitment to encouraging confidence and celebrating meaningful progress.',
      'Recognition programs also show how the school nurtures a growth mindset. Students are encouraged to strive for personal bests, collaborate with peers, and represent the school with pride. This steady encouragement builds motivation and a sense of belonging, reinforcing the values families seek in a supportive learning environment.'
    ]
  },
  '/beyond-academics': {
    heading: 'Beyond academics: holistic growth and life skills',
    paragraphs: [
      'Beyond academics, The Elden Heights School offers experiences that support creativity, leadership, and collaboration. Families in Hazaribagh can learn about activities that help students express themselves, discover new interests, and build confidence alongside their academic growth. These opportunities are planned to complement classroom learning without overwhelming students.',
      'Parents often value balance: strong academics with meaningful co-curricular engagement. Elden Heights focuses on activities that build communication skills, teamwork, and resilience. This holistic approach prepares students for future challenges, helping them grow into thoughtful and capable individuals.'
    ]
  },
  '/co-curricular-clubs': {
    heading: 'Clubs that build confidence and teamwork',
    paragraphs: [
      'Co-curricular clubs at The Elden Heights School give students in Hazaribagh a space to explore interests beyond the classroom. These clubs encourage creativity, collaboration, and leadership, helping students build confidence while forming meaningful friendships. Participation is structured so students can balance club activities with academics.',
      'Parents appreciate that clubs are designed to be enriching and purposeful. Whether students enjoy arts, communication, or community initiatives, the club culture focuses on skill-building and positive character development. This supportive environment helps every learner grow while feeling connected to the school community.'
    ]
  },
  '/life-readiness-program': {
    heading: 'Life readiness support for growing learners',
    paragraphs: [
      'The Life Readiness Program at The Elden Heights School helps students build the practical skills they need for the future. Families in Hazaribagh can expect guidance in communication, decision-making, and self-management, delivered in age-appropriate ways. This program complements academics by helping students understand how to apply learning in everyday life.',
      'Parents value schools that prepare children for more than exams. Elden Heights focuses on real-world readiness, encouraging independence and responsible choices. The program supports student confidence, teamwork, and leadership, helping learners grow into capable, empathetic individuals.'
    ]
  },
  '/core': {
    heading: 'Core values that shape the Elden Heights experience',
    paragraphs: [
      'The core values of The Elden Heights School guide every classroom, activity, and parent interaction. Families in Hazaribagh can expect an emphasis on integrity, discipline, and respect—values that create a steady foundation for academic growth. These principles shape student behavior, teacher mentoring, and the overall school culture.',
      'Parents look for a school that nurtures character alongside academic achievement. Elden Heights focuses on consistent routines, positive behavior expectations, and mentorship that helps students develop confidence. This approach supports learners from early years through higher grades, creating a safe, structured environment where students thrive.'
    ]
  },
  '/core-mentors': {
    heading: 'Mentors who guide student growth',
    paragraphs: [
      'Core mentors at The Elden Heights School play a key role in supporting student progress. Families in Hazaribagh can meet the educators and leaders who guide academic development, encourage curiosity, and help students overcome challenges. Mentorship is centered on empathy, accountability, and clear communication with parents.',
      'Parents value teachers who understand their child’s strengths and learning needs. Elden Heights mentors provide steady guidance, track progress, and collaborate with families to ensure students feel confident and supported. This mentorship model strengthens academic outcomes and student well-being.'
    ]
  },
  '/the-elden-council': {
    heading: 'Governance with transparency and community trust',
    paragraphs: [
      'The Elden Council supports The Elden Heights School by focusing on long-term vision, accountability, and student success. Families in Hazaribagh can learn how governance decisions protect educational quality, campus safety, and transparent communication. This oversight strengthens trust between the school and the parent community.',
      'Parents appreciate knowing that decisions are guided by a commitment to student well-being. The council helps ensure the school remains aligned with its mission, maintains strong policies, and adapts thoughtfully to changing educational needs.'
    ]
  },
  '/managing-committee': {
    heading: 'Managing committee commitment to student success',
    paragraphs: [
      'The managing committee at The Elden Heights School oversees operational excellence, policy clarity, and family support. Families in Hazaribagh can review the leadership that keeps the school organized, compliant, and focused on student outcomes. This structure ensures admissions, academics, and communication remain consistent and reliable.',
      'Parents value a school that operates transparently and prioritizes student well-being. The managing committee works with educators and administrators to sustain high standards and plan future improvements for the campus and learning environment.'
    ]
  },
  '/gallery': {
    heading: 'Campus moments captured for parents',
    paragraphs: [
      'The gallery at The Elden Heights School showcases classroom learning, cultural programs, and sports activities in Hazaribagh. Parents can view student experiences that highlight teamwork, creativity, and academic engagement. Each photo reflects a campus environment where children are encouraged to participate, collaborate, and celebrate achievements.',
      'Families often want a glimpse of school life before visiting campus. This gallery provides visual context for the school’s values: active learning, safe spaces, and joyful community events. It helps parents imagine their child thriving in a supportive, future-ready environment.'
    ]
  },
  '/careers': {
    heading: 'Teaching and leadership opportunities in Hazaribagh',
    paragraphs: [
      'Careers at The Elden Heights School are ideal for educators who want to shape future-ready learners in Hazaribagh. The school values teachers who bring subject expertise, compassion, and a growth mindset. Opportunities span classroom instruction, mentorship, and leadership roles that support student success.',
      'Prospective team members can expect a collaborative culture, structured academic goals, and a focus on professional development. By joining Elden Heights, educators become part of a community committed to meaningful learning and strong parent communication.'
    ]
  },
  '/contact': {
    heading: 'Connect with Elden Heights for admissions support',
    paragraphs: [
      'Parents in Hazaribagh can contact The Elden Heights School to learn about admissions, campus visits, or general inquiries. The contact team helps families understand eligibility, document requirements, and next steps for the 2026–27 academic session. Reaching out early ensures parents receive timely guidance and can plan visits with ease.',
      'The school values responsive communication, so families can connect via phone, email, or the contact form. Whether you want to discuss classroom approach, transportation considerations, or a campus tour, the team is ready to help. This supportive contact process reflects Elden Heights’ commitment to transparent, parent-first admissions.'
    ]
  },
  '/disclosures': {
    heading: 'Transparency and statutory disclosures',
    paragraphs: [
      'The disclosures page at The Elden Heights School provides transparency for families in Hazaribagh. Parents can review statutory information, key updates, and documents that reflect the school’s commitment to compliance and accountability. This transparency helps families make informed decisions about their child’s education.',
      'Clear disclosures support trust between parents and the school. Elden Heights prioritizes open communication so families feel confident about policies, academic commitments, and campus standards.'
    ]
  },
  '/privacy-policy': {
    heading: 'Data protection and parent communication',
    paragraphs: [
      'The Elden Heights School privacy policy explains how parent and student information is collected, used, and protected. Families in Hazaribagh can review data practices related to inquiries, admissions, and communication. The policy outlines respectful handling of contact details and digital interactions.',
      'Parents value a school that safeguards their information and communicates responsibly. Elden Heights commits to secure data handling, limited sharing, and transparency so families feel confident when reaching out to the school.'
    ]
  },
  '/terms-and-conditions': {
    heading: 'Website usage terms for families',
    paragraphs: [
      'The Elden Heights School terms and conditions explain how families in Hazaribagh may use the website, forms, and related services. The terms clarify expectations around content use, accuracy of submissions, and acceptable communication channels.',
      'Parents benefit from clear guidelines that help them use online resources effectively. Elden Heights outlines fair usage so families can engage with admissions, inquiries, and school information confidently.'
    ]
  }
};

export default function SeoContent() {
  const router = useRouter();
  const content = SEO_CONTENT[router.pathname];

  if (!content) {
    return null;
  }

  return (
    <section className="sr-only" aria-label={content.heading}>
      <h2>{content.heading}</h2>
      {content.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}
