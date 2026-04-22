import Link from 'next/link';

import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

export default function ManagingCommitteePage() {
  return (
    <>
      <Seo path="/managing-committee" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Managing Committee"
            subtitle="The leaders ensuring our vision stays bold, transparent, and future-ready."
            eyebrow="Stewardship"
            image="/managing-committee/banner-lead.jpg"
          />
          <section className="relative flex flex-1 items-center justify-center px-6 py-24 md:py-32">
            <div className="surface-card relative max-w-xl overflow-hidden rounded-[28px] p-10 text-center md:p-14">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/10 blur-[100px]" />

              <span className="eyebrow justify-center">Announcement</span>
              <h1 className="mt-5 font-garamond text-3xl font-semibold leading-[1.1] text-midnight sm:text-4xl md:text-[40px]">
                Details <span className="italic">coming soon</span>.
              </h1>
              <span className="mx-auto mt-6 block h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <p className="mt-6 text-midnight/75">
                Information about the committee safeguarding our mission and excellence will be
                published here as our governance structure takes shape.
              </p>
              <div className="mt-8">
                <Link href="/the-elden-council" className="btn-primary">
                  Meet the Council
                  <span>→</span>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
