import Image from 'next/image';
import { motion } from 'framer-motion';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

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
    mentors: [{ name: 'Sushil Sinha', designation: 'IT Head' }]
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
  { department: 'Music', mentors: [{ name: 'Sushma Minz', designation: 'Vocalist' }] },
  {
    department: 'Sports',
    mentors: [
      { name: 'Sagar Kumar', designation: 'Yoga & Karate' },
      { name: 'C.K. Yadav', designation: 'Overall Sports' }
    ]
  },
  { department: 'Store Keeper', mentors: [{ name: 'Santosh Kumar', designation: 'Store Keeper' }] }
];

const getInitials = (name) =>
  name.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const MentorCard = ({ name, designation }) => {
  const photoSrc = mentorPhotos[name];

  return (
    <div className="group overflow-hidden rounded-none border border-midnight/10 bg-gradient-to-br from-white to-parchment transition-all duration-500 ease-elite hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_40px_80px_-40px_rgba(10,10,12,0.3)]">
      {photoSrc ? (
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-midnight/5">
          <Image
            src={photoSrc}
            alt={`${name} - ${designation}`}
            fill
            sizes="(max-width: 768px) 240px, 320px"
            className="object-cover transition-transform duration-[1.2s] ease-elite group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      ) : (
        <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-midnight via-graphite to-midnight">
          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/15 blur-[80px]" />
          <span className="relative font-garamond text-6xl font-semibold text-parchment">
            {getInitials(name)}
          </span>
        </div>
      )}
      <div className="space-y-1 border-t border-midnight/10 bg-white/80 px-5 py-4 text-center backdrop-blur">
        <h4 className="font-garamond text-lg font-semibold leading-tight text-midnight">{name}</h4>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cardinal">{designation}</p>
      </div>
    </div>
  );
};

export default function CoreMentorsPage() {
  return (
    <>
      <Seo path="/core-mentors" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Core Mentors"
            subtitle="Meet the educators and guides shaping every learner&rsquo;s journey."
            eyebrow="Leadership &amp; Faculty"
            slot="people.mentors"
          />

          <section className="relative py-20 md:py-24">
            <div className="shell max-w-5xl text-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <span className="eyebrow">Experience · Empathy · Excellence</span>
                <h2 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
                  Educators who <span className="italic">guide, not just teach</span>.
                </h2>
                <span className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-midnight/75 md:text-lg">
                  The Elden Heights School is guided by dedicated mentors who bring experience,
                  empathy, and excellence to every classroom and activity.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="relative py-10 md:py-16">
            <div className="shell">
              <div className="hidden space-y-16 md:block">
                {coreMentors.map((group, gIdx) => (
                  <motion.div
                    key={group.department}
                    className="space-y-7"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-garamond text-[11px] font-semibold uppercase tracking-[0.4em] text-cardinal">
                        {String(gIdx + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                      <h2 className="font-garamond text-2xl font-semibold text-midnight md:text-3xl">
                        {group.department}
                      </h2>
                      <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-midnight/50">
                        {group.mentors.length} {group.mentors.length === 1 ? 'Member' : 'Members'}
                      </span>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {group.mentors.map((mentor) => (
                        <MentorCard key={`${group.department}-${mentor.name}`} {...mentor} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-12 md:hidden">
                {coreMentors.map((group) => (
                  <div key={`${group.department}-mobile`} className="space-y-4">
                    <div className="flex items-center gap-3 px-1">
                      <span className="h-px w-8 bg-gold" />
                      <h3 className="font-garamond text-xl font-semibold text-midnight">
                        {group.department}
                      </h3>
                    </div>
                    <div className="-mx-6 overflow-x-auto px-6">
                      <div className="flex snap-x snap-mandatory gap-4 pb-2">
                        {group.mentors.map((mentor) => (
                          <div
                            key={`${group.department}-mobile-${mentor.name}`}
                            className="w-60 flex-shrink-0 snap-center"
                          >
                            <MentorCard {...mentor} />
                          </div>
                        ))}
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
