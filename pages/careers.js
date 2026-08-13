import Link from 'next/link';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import SplitFeature from '@/components/sections/SplitFeature';
import FeatureBand from '@/components/sections/FeatureBand';

export default function CareersPage() {
  return (
    <>
      <Seo path="/careers" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Careers at Elden Heights"
            subtitle="Join a team shaping the next generation of confident learners."
            eyebrow="Careers"
            slot="careers.banner"
          />

          <section className="band-white">
            <div className="shell py-20 md:py-28">
              <SplitFeature
                slot="careers.feature"
                eyebrow="Working here"
                title="A school that backs its teachers"
                points={[
                'Small classes and genuine planning time.',
                'Ongoing training, not a single induction week.',
                'A campus that keeps being invested in.'
                ]}
              >
                <p>Mentors here are given time to plan, freedom to teach their own way, and a leadership team that sits in on lessons to help rather than to grade.</p>
              </SplitFeature>
            </div>
          </section>
          <section className="relative flex flex-1 items-center justify-center px-6 py-20 md:py-28">
            <div className="surface-card relative max-w-xl overflow-hidden rounded-none p-10 text-center md:p-14">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/10 blur-[100px]" />

              <span className="eyebrow justify-center">Current Opportunities</span>
              <h1 className="mt-5 font-garamond text-3xl font-semibold leading-[1.1] text-midnight sm:text-4xl md:text-[40px]">
                We&rsquo;re not hiring <span className="italic">right now</span>.
              </h1>
              <span className="mx-auto mt-6 block h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <p className="mt-6 text-midnight/75">
                Thank you for your interest in joining The Elden Heights School. While there are no
                open positions at the moment, new opportunities are typically posted ahead of each
                academic session.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact" className="btn-primary">
                  Get in Touch
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-midnight/70 transition hover:text-cardinal"
                >
                  <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent" />
                  Back to Home
                </Link>
              </div>
            </div>
          </section>

          <FeatureBand
            slot="careers.banner"
            eyebrow="Join us"
            title="If this sounds like the school you want to teach in, write to us"
            body="We read every application."
            link="/contact"
            linkLabel="Get in touch"
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
