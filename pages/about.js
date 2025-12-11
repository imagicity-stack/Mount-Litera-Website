import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import About from '@/components/About';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const policies = [
  { title: 'Disability Policy', href: '/policies/disability-policy' },
  { title: 'Code for Self-Discipline', href: '/policies/code-for-self-discipline' },
  { title: 'Anti-Ragging Message', href: '/policies/anti-ragging-message' },
  { title: 'Parent Child Contact Mechanism', href: '/policies/parent-child-contact-mechanism' },
  { title: 'Complaint Procedures', href: '/policies/complaint-procedures' }
];

const mentorPhotos = {
  'R.K. Singh': '/teachers/rk-singh.png',
  'Prarthana Mishra': '/teachers/prarthana-mishra.png',
  'Piyush Sinha': '/teachers/piyush-sinha.png',
  'MD Hadis': '/teachers/md-hadis.jpg',
  'Shama Perween': '/teachers/shama-perween.png',
  'Nitesh Kumar': '/teachers/nitesh-kumar.png',
  'Sameeksha Sinha': '/teachers/sameeksha-sinha.png',
  'Sangeeta Agarwal': '/teachers/sangeeta-agarwal.png',
  'Smita Sinha': '/teachers/smita-sinha.png',
  'Pratiksha Prasoon': '/teachers/pratiksha-prasoon.png',
  'Saba Naaz': '/teachers/saba-naaz.png',
  'Nitika Gupta': '/teachers/nitika gupta.png',
  'Manila Awadhya': '/teachers/manila-awadhya.png',
  'Seema Bakshi': '/teachers/seema-bakshi.png',
  'Kailash Devi': '/teachers/kailash-devi.png',
  'Ritesh Kumar': '/teachers/ritesh kumar.png',
  'Sushma Minz': '/teachers/sushma minz.png',
  'Sagar Kumar': '/teachers/sagar-kumar.png',
  'C.K. Yadav': '/teachers/ck-yadav.png'
};

const leadershipPhotos = {
  principal: {
    src: '/teachers/principal.png',
    alt: 'R.K. Singh, Principal'
  },
  managingDirector: {
    src: '/teachers/shashi-shankar-prasad.jpg',
    alt: 'Mr. Shashi Shankar Prasad, Managing Director'
  }
};

const coreMentors = [
  {
    department: 'Administration',
    mentors: [
      { name: 'R.K. Singh', designation: 'Principal' },
      { name: 'Prarthana Mishra', designation: 'Relationship Manager' },
      { name: 'Piyush Sinha', designation: 'Accounting Manager' },
      { name: 'MD Hadis', designation: 'Transport & Admin Manager' }
    ]
  },
  {
    department: 'Information Technology',
    mentors: [
      { name: 'Sushil Sinha', designation: 'IT Head' },
    ]
  },
  {
    department: 'Teaching',
    mentors: [
      { name: 'Anupriya', designation: 'English' },
      { name: 'Shama Perween', designation: 'Maths' },
      { name: 'Nitesh Kumar', designation: 'Maths' },
      { name: 'Sameeksha Sinha', designation: 'Social Studies' },
      { name: 'Sangeeta Agarwal', designation: 'English' },
      { name: 'Smita Sinha', designation: 'Maths' },
      { name: 'Pratiksha Prasoon', designation: 'Hindi' },
      { name: 'Saba Naaz', designation: 'Multiple Subjects' },
      { name: 'Nitika Gupta', designation: 'Multiple Subjects' },
      { name: 'Manila Awadhya', designation: 'Multiple Subjects' },
      { name: 'Seema Bakshi', designation: 'Multiple Subjects' },
      { name: 'Kailash Devi', designation: 'Hindi' },
      { name: 'Ritesh Kumar', designation: 'Science' }
    ]
  },
  {
    department: 'Music',
    mentors: [{ name: 'Sushma Minz', designation: 'Vocalist' }]
  },
  {
    department: 'Sports',
    mentors: [
      { name: 'Sagar Kumar', designation: 'Yoga & Karate' },
      { name: 'C.K. Yadav', designation: 'Overall Sports' }
    ]
  },
  {
    department: 'Store Keeper',
    mentors: [{ name: 'Santosh Kumar', designation: 'Store Keeper' }]
  }
];

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const MentorCard = ({ name, designation }) => {
  const photoSrc = mentorPhotos[name];

  return (
    <div
      className="group relative flex flex-col items-center rounded-2xl border border-cardinal/20 bg-white p-6 text-center transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      {photoSrc ? (
        <div className="mb-5 flex h-40 w-36 items-center justify-center rounded-2xl border-2 border-cardinal/40 bg-cardinal/5">
          <div className="relative h-36 w-32 overflow-hidden rounded-xl">
            <Image
              src={photoSrc}
              alt={`${name} - ${designation}`}
              fill
              sizes="(max-width: 768px) 144px, 192px"
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="mb-5 flex h-40 w-36 items-center justify-center rounded-2xl border-2 border-dashed border-cardinal/40 bg-cardinal/5 text-sm font-semibold uppercase tracking-wide text-cardinal/70">
          {getInitials(name)}
        </div>
      )}
      <h4 className="text-lg font-semibold text-cardinal">{name}</h4>
      <p className="mt-1 text-sm text-gray-600">{designation}</p>
    </div>
  );
};

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About The Elden Heights School | Vision &amp; Leadership</title>
        <meta
          name="description"
          content="Learn more about The Elden Heights School's leadership, guiding principles, and core policies during our transformative journey."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <About showLink={false} />
          <section className="py-20 bg-[#F8F5F3]">
            <div className="max-w-5xl mx-auto px-6 space-y-12">
              <div className="grid gap-12 lg:grid-cols-[1fr_320px] items-start">
                <div className="space-y-6">
                  <h2 className="text-3xl font-semibold text-cardinal">Note from the Principal</h2>
                    <p>
                      At The Elden Heights, our vision is straightforward. Every child who walks into this campus should discover who they are and what they can become. We focus on strong academics, clear values and a learning environment that pushes students to think, question and grow with confidence.
                    </p>
                    <p>
                      Our four-stage philosophy Roots, Ascent, Radiance and Eternity guides each student through a journey that builds discipline, curiosity, communication and leadership. These are not just words on a brochure. These are practices we apply in classrooms, activities and daily interactions.
                    </p>
                    <p>
                      We combine a heritage-inspired culture with modern teaching methods. Students learn to stay grounded while being prepared for a world that is changing fast. They learn to work hard, make responsible choices and take pride in their growth.
                    </p>
                    <p>
                      My commitment as the principal is to maintain a school where learning feels purposeful, teachers stay motivated and parents feel assured about their child’s future. This is a shared responsibility and at Elden Heights, we take it seriously.
                    </p>
                    <p>
                      Your child deserves a school that believes in their potential and helps them rise towards it every day. That is the promise of The Elden Heights.
                    </p>
                  <p className="font-semibold text-cardinal">- R.K Singh</p>
                </div>
                <div className="w-full max-w-md mx-auto lg:mx-0">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border-2 border-cardinal/60 bg-white shadow-sm">
                    <Image
                      src={leadershipPhotos.principal.src}
                      alt={leadershipPhotos.principal.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 320px, 80vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
                <div className="space-y-6">
                  <h2 className="text-3xl font-semibold text-cardinal">Note from the MD </h2>
                    <p>
                      The Elden Heights was built with one clear intention. To create a school that doesn’t just teach students, but shapes their entire life trajectory. We are not here to copy the standard school model. We are here to raise the benchmark for what education should feel like in our city and beyond.
                    </p>
                    <p>
                      Every decision we make infrastructure, teachers, culture, systems, activities reflects one thought. Will this help a child grow into a stronger human being? If the answer is no, we don’t do it. Simple.
                    </p>
                    <p>
                      Our four-stage philosophy Roots, Ascent, Radiance and Eternity is at the core of everything. It ensures our students begin with strong foundations, rise with discipline, express themselves with confidence and eventually step out as capable young adults who can face a complex world with clarity.
                    </p>
                    <p>
                      We are building a school culture that values effort over shortcuts, character over noise and long term growth over temporary wins. The goal is not just good results. The goal is responsible, confident and well-rounded individuals.
                    </p>
                    <p>
                      As the director, my responsibility is to ensure that this institution stays true to its purpose, evolves with time and continues to offer an environment where students, teachers and parents feel aligned towards a shared future.
                    </p>
                    <p>
                      The Elden Heights is not just a school. It is a journey of becoming. And we are committed to walking that journey with every child who joins us.
                    </p>
                  <p className="font-semibold text-cardinal">- Mr. Shashi Shankar Prasad</p>
                </div>
                <div className="w-full max-w-md mx-auto lg:mx-0">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border-2 border-cardinal/60 bg-white shadow-sm">
                    <Image
                      src={leadershipPhotos.managingDirector.src}
                      alt={leadershipPhotos.managingDirector.alt}
                      fill
                      sizes="(min-width: 1024px) 320px, 80vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-12">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-semibold text-cardinal">Core Mentors</h2>
                <p className="mx-auto max-w-3xl text-gray-600">
                  Meet the dedicated mentors guiding our students every day across leadership, teaching, talent, and support
                  teams.
                </p>
              </div>
              <div className="hidden space-y-8 md:block">
                {coreMentors.map((group) => (
                  <div key={group.department} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-semibold text-cardinal">{group.department}</h3>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {group.mentors.map((mentor) => (
                        <MentorCard key={`${group.department}-${mentor.name}`} {...mentor} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:hidden space-y-10">
                {coreMentors.map((group) => (
                  <div key={`${group.department}-mobile`} className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-cardinal">{group.department}</h3>
                    </div>
                    <div className="-mx-6 overflow-x-auto px-6">
                      <div className="flex snap-x snap-mandatory gap-5 pb-2">
                        {group.mentors.map((mentor) => {
                          const photoSrc = mentorPhotos[mentor.name];

                          return (
                            <div
                              key={`${group.department}-mobile-${mentor.name}`}
                              className="snap-center w-60 flex-shrink-0 rounded-3xl border border-cardinal/15 bg-white p-5 shadow-md"
                            >
                              <div className="mb-4 flex flex-col items-center gap-3">
                                {photoSrc ? (
                                  <div className="relative h-32 w-28 overflow-hidden rounded-2xl border-2 border-cardinal/30 bg-cardinal/5">
                                    <Image
                                      src={photoSrc}
                                      alt={`${mentor.name} - ${mentor.designation}`}
                                      fill
                                      sizes="(max-width: 768px) 176px, 192px"
                                      className="object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex h-32 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-cardinal/30 bg-cardinal/5 text-sm font-semibold uppercase tracking-wide text-cardinal/60">
                                    {getInitials(mentor.name)}
                                  </div>
                                )}
                                <div className="text-center">
                                  <h4 className="text-base font-semibold text-cardinal">{mentor.name}</h4>
                                  <p className="text-sm text-gray-600">{mentor.designation}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h2 className="text-3xl font-semibold text-cardinal">Principles and Policies</h2>
              <p className="text-gray-600">
                Our policies reflect the values and safeguards that guide The Elden Heights School. Explore each policy to understand
                how we protect and support our students, parents, and staff community.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {policies.map((policy) => (
                  <li key={policy.href} className="rounded-2xl border border-cardinal/20 bg-cardinal/5 px-5 py-4 transition hover:border-cardinal hover:bg-white">
                    <Link href={policy.href} className="block text-cardinal font-semibold">
                      {policy.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
