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
                <h2 className="text-3xl font-semibold text-black">Leadership &amp; Governance</h2>
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
                    className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-cardinal/20 bg-ivory text-center text-lg font-semibold uppercase tracking-[0.12em] text-black transition transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="relative z-10 px-6 text-lg sm:text-xl font-semibold text-black group-hover:text-black">
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
                  <h2 className="text-3xl font-semibold text-black">Note from the Principal</h2>
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
                  <p className="font-semibold text-black">- R.K Singh</p>
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
                  <h2 className="text-3xl font-semibold text-black">Note from the MD </h2>
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
                  <p className="font-semibold text-black">- Mr. Shashi Shankar Prasad</p>
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
          <section className="py-16 bg-[#f3ede7]">
            <div className="max-w-5xl mx-auto px-6 space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-semibold text-black">Mission and Vision Statement</h2>
                <p className="max-w-3xl mx-auto text-gray-700">
                  Discover the legacy behind The Elden Heights School. Expand the panel below to explore how our emblem, ethos, and four-stage philosophy guide every learner toward eternal glory.
                </p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-cardinal/20 bg-white shadow-xl shadow-cardinal/10">
                <details className="group" open>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-lg font-semibold text-midnight">
                    <span className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-full bg-cardinal/10 text-black grid place-items-center font-semibold">MV</span>
                      <span className="text-black">Mission &amp; Vision</span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transform text-black transition duration-300 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="flex flex-col gap-8 border-t border-cardinal/10 bg-white px-6 pb-8 pt-6 lg:grid lg:grid-cols-[1fr_auto] lg:items-start">
                    <div className="space-y-6 text-gray-700 lg:pr-4">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-black">Vision</h3>
                        <p>
                          The Elden Heights School stands as a citadel of heritage and aspiration, where education is not the mere transfer of knowledge but the cultivation of greatness across generations. The very name Elden Heights embodies our purpose: “Elden” signifying the timeless journey of growing old with wisdom, and “Heights” symbolizing the relentless ascent toward excellence and elevated achievement. Together, the name evokes a legacy of refinement, endurance, and elevation.
                        </p>
                        <p>
                          Our emblem translates this philosophy into form. The eagle, sovereign and unyielding, represents the will to soar above the ordinary. The torch, burning eternal, signifies the undimmed pursuit of truth and enlightenment. The four wings of the eagle mirror the four cardinal stages of a student’s passage: Roots, Ascent, Radiance, and Eternity. These stages, like the wings of flight, empower every learner to rise with balance, strength, and purpose, ever guided by our motto “Towards Eternal Glory.”
                        </p>
                        <p>
                          The Elden Heights is thus more than an institution; it is an enduring passage to greatness, where each generation is prepared to stand tall in wisdom, dignity, and eternal legacy.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-black">Mission</h3>
                        <p>
                          The mission of The Elden Heights School is to craft not merely scholars, but legacies. We exist to shape a student’s journey through the four timeless stages of life, each one refining their character and elevating their destiny.
                        </p>
                        <p>
                          <strong className="text-black">Roots:</strong> At the foundation, we instill discipline, virtue, and cultural heritage. Here the child is grounded, like the roots of an ancient tree, drawing strength from values that endure through every age.
                        </p>
                        <p>
                          <strong className="text-black">Ascent:</strong> With a firm foundation, the learner begins to rise. This stage is defined by exploration, resilience, and intellectual awakening. We nurture a spirit that questions, seeks, and climbs with dignity and perseverance toward knowledge and truth.
                        </p>
                        <p>
                          <strong className="text-black">Radiance:</strong> As wisdom matures, the individual begins to illuminate. In this stage, talents unfold and leadership emerges. Students radiate brilliance through creativity, innovation, and excellence, becoming beacons of inspiration within their communities and beyond.
                        </p>
                        <p>
                          <strong className="text-black">Eternity:</strong> The pinnacle stage, where learning transcends achievement and becomes legacy. Here, the Eldenite rises beyond self-interest to embody purpose, virtue, and vision that echo through generations. This is the stage of eternal glory, the fulfillment of The Elden Heights journey.
                        </p>
                        <p>
                          The name Elden Heights is fulfilled in this mission: “Elden” to grow wiser with age, and “Heights” to ascend beyond limitation. The eagle with its four wings embodies these stages, carrying the torch of enlightenment as a symbol of knowledge that never fades. Each student, through this sacred passage, is prepared not merely for success, but for significance, to rise, to lead, and to leave behind a mark that is eternal.
                        </p>
                      </div>
                    </div>
                    <div className="relative ml-auto flex w-full max-w-xs flex-col items-center justify-start overflow-hidden rounded-2xl border border-dashed border-cardinal/30 bg-ivory p-4 shadow-md shadow-cardinal/10 lg:mt-0">
                      <div className="h-40 w-full rounded-xl bg-white" />
                      <p className="mt-3 text-center text-sm font-medium text-black">Reserved space for mission &amp; vision imagery</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h2 className="text-3xl font-semibold text-black">Principles and Policies</h2>
              <p className="text-gray-600">
                Our policies reflect the values and safeguards that guide The Elden Heights School. Explore each policy to understand
                how we protect and support our students, parents, and staff community.
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {policies.map((policy) => (
                  <li key={policy.href} className="rounded-2xl border border-cardinal/20 bg-cardinal/5 px-5 py-4 transition hover:border-cardinal hover:bg-white">
                    <Link href={policy.href} className="block text-black font-semibold">
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
