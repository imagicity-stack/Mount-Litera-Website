import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      { name: 'Sushil Sinha', designation: 'IT Head' }
    ]
  },
  {
    department: 'Teaching',
    mentors: [
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
    <div className="group overflow-hidden rounded-2xl border border-cardinal/20 bg-white shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-xl">
      {photoSrc ? (
        <div className="relative aspect-[4/5] w-full bg-cardinal/5">
          <Image
            src={photoSrc}
            alt={`${name} - ${designation}`}
            fill
            sizes="(max-width: 768px) 240px, 320px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/5] w-full items-center justify-center bg-cardinal/5 text-sm font-semibold uppercase tracking-wide text-cardinal/70">
          {getInitials(name)}
        </div>
      )}
      <div className="border-t border-cardinal/15 bg-white px-4 py-3 text-center">
        <h4 className="text-lg font-semibold text-cardinal">{name}</h4>
        <p className="mt-1 text-sm font-medium text-gray-900">{designation}</p>
      </div>
    </div>
  );
};

export default function CoreMentorsPage() {
  return (
    <>
      <Head>
        <title>Core Mentors | The Elden Heights School</title>
        <meta
          name="description"
          content="Meet the core mentors guiding academics, culture, and student growth at The Elden Heights School."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="relative overflow-hidden bg-ivory py-16">
            <div className="relative max-w-5xl mx-auto px-6 space-y-4 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-cardinal/70">Leadership &amp; Faculty</p>
              <h1 className="text-4xl font-semibold text-cardinal">Core Mentors</h1>
              <p className="max-w-3xl mx-auto font-medium text-gray-900">
                The Elden Heights School is guided by dedicated mentors who bring experience, empathy, and excellence to every classroom and activity.
              </p>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-12">
              <div className="hidden space-y-12 md:block">
                {coreMentors.map((group) => (
                  <div key={group.department} className="space-y-5">
                    <div className="flex items-center gap-4">
                      <span className="h-10 w-10 rounded-xl bg-cardinal/10 text-cardinal flex items-center justify-center font-semibold">
                        {group.department.substring(0, 2).toUpperCase()}
                      </span>
                      <h2 className="text-2xl font-semibold text-cardinal">{group.department}</h2>
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
                              className="snap-center w-64 flex-shrink-0 overflow-hidden rounded-3xl border border-cardinal/15 bg-white shadow-md"
                            >
                              {photoSrc ? (
                                <div className="relative aspect-[4/5] w-full bg-cardinal/5">
                                  <Image
                                    src={photoSrc}
                                    alt={`${mentor.name} - ${mentor.designation}`}
                                    fill
                                    sizes="(max-width: 768px) 208px, 240px"
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="flex aspect-[4/5] w-full items-center justify-center bg-cardinal/5 text-sm font-semibold uppercase tracking-wide text-cardinal/60">
                                  {getInitials(mentor.name)}
                                </div>
                              )}
                              <div className="border-t border-cardinal/15 bg-white px-4 py-3 text-center">
                                <h4 className="text-base font-semibold text-cardinal">{mentor.name}</h4>
                                <p className="text-sm font-medium text-gray-900">{mentor.designation}</p>
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
        </main>
        <Footer />
      </div>
    </>
  );
}
