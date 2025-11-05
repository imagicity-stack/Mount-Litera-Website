import Head from 'next/head';
import Link from 'next/link';
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

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Mount Litera School | Vision &amp; Leadership</title>
        <meta
          name="description"
          content="Learn more about Mount Litera School's leadership, guiding principles, and core policies during our transformative journey."
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
                  <h2 className="text-3xl font-semibold text-cardinal">Principal’s Note</h2>
                  <p>
                    Mount Litera School is entering a defining phase of transformation. This is not just a change of name or
                    design; it’s a complete evolution of thought, vision, and purpose. Our goal is to prepare every student for a
                    world that’s fast, digital, and demanding — without losing the human values that define great education. The
                    upcoming transition is a strategic step toward building a learning environment that’s modern, data-driven, and
                    globally relevant, yet deeply rooted in discipline, empathy, and academic excellence.
                  </p>
                  <p>
                    We’re strengthening our academic systems, modernizing our infrastructure, and empowering our teachers with
                    innovative methodologies that match global benchmarks. The future of education here will reflect balance —
                    between tradition and technology, between knowledge and creativity.
                  </p>
                  <p>
                    The next chapter of Mount Litera School is not an end — it’s the beginning of something extraordinary. The
                    foundation has been laid, the direction is clear, and the future is bright.
                  </p>
                  <p className="font-semibold text-cardinal">- R.K Singh</p>
                </div>
                <div className="w-full max-w-md mx-auto lg:mx-0">
                  <div className="aspect-[3/4] rounded-3xl border-2 border-dashed border-cardinal/60 flex items-center justify-center text-center text-cardinal/70 bg-white">
                    Photo Placeholder
                  </div>
                </div>
              </div>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
                <div className="space-y-6">
                  <h2 className="text-3xl font-semibold text-cardinal">Managing Director&apos;s Note</h2>
                  <p>
                    Mount Litera School has always believed that true education goes beyond classrooms. It shapes the character,
                    curiosity, and conviction of every child. As we now move toward a new phase of growth and transformation, our
                    focus is to redefine what schooling means in today’s fast-changing world.
                  </p>
                  <p>
                    This transition is not merely about upgrading infrastructure or identity. It is about building a future-ready
                    institution that aligns with modern learning standards while staying grounded in timeless values. Our mission
                    is to create an ecosystem where students are encouraged to question, explore, and innovate because the future
                    will belong to thinkers, not followers.
                  </p>
                  <p>
                    Every step we take is guided by one principle: excellence with purpose. From academic upgrades and
                    technology-driven systems to holistic development programs, every decision is rooted in long-term value
                    creation for our students and the community.
                  </p>
                  <p>
                    We are proud of the foundation that has brought us here and even prouder of the vision that will take us
                    forward. The road ahead is filled with opportunity, and Mount Litera School is ready to lead that journey with
                    clarity, conviction, and care.
                  </p>
                  <p className="font-semibold text-cardinal">- Mr. Shashi Shankar Prasad</p>
                </div>
                <div className="w-full max-w-md mx-auto lg:mx-0">
                  <div className="aspect-[3/4] rounded-3xl border-2 border-dashed border-cardinal/60 flex items-center justify-center text-center text-cardinal/70 bg-white">
                    Photo Placeholder
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <h2 className="text-3xl font-semibold text-cardinal">Principles and Policies</h2>
              <p className="text-gray-600">
                Our policies reflect the values and safeguards that guide Mount Litera School. Explore each policy to understand
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
