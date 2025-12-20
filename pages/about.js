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
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-6">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-semibold text-cardinal">Leadership &amp; Governance</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore the voices and councils that guide The Elden Heights School. Each pillar offers a deeper look at our philosophy, mentors, and stewardship.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[{
                  href: '/the-elden-council',
                  label: 'THE ELDEN COUNCIL'
                }, {
                  href: '/core-mentors',
                  label: 'Core mentors'
                }, {
                  href: '/managing-committee',
                  label: 'MANAGING COMMITTEE'
                }].map((card) => (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-cardinal/20 bg-gradient-to-br from-white via-ivory/60 to-cardinal/5 text-center text-lg font-semibold uppercase tracking-[0.12em] text-cardinal transition transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cardinal/8 via-transparent to-gold/15 opacity-80 transition duration-300 group-hover:opacity-100" />
                    <span className="relative z-10 px-6 text-lg sm:text-xl font-semibold text-cardinal group-hover:text-cardinal/90">
                      {card.label}
                    </span>
                    <div className="absolute inset-x-4 bottom-4 h-0.5 rounded-full bg-cardinal/20 transition-all duration-300 group-hover:bottom-6 group-hover:h-1 group-hover:bg-cardinal/40" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
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
