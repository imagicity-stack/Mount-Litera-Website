
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';
import SectionHeader from '@/components/sections/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import useContent from '@/lib/useContent';
import useSiteSettings from '@/lib/useSiteSettings';
import SplitFeature from '@/components/sections/SplitFeature';
import FeatureBand from '@/components/sections/FeatureBand';

export default function CareersPage() {
  const { items: vacancies } = useContent('vacancies');
  const settings = useSiteSettings();

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
          <section id="vacancies" className="band-grey">
            <div className="shell py-20 md:py-28">
              <SectionHeader
                eyebrow="Current opportunities"
                title={vacancies.length ? 'Open positions' : 'No open positions right now'}
                lede={
                  vacancies.length
                    ? 'Send your application to the address listed with the role. We read every one.'
                    : 'New opportunities are typically posted ahead of each academic session. If you teach and this sounds like your kind of school, write to us anyway.'
                }
                link={vacancies.length ? undefined : '/contact'}
                linkLabel="Get in touch"
              />

              {vacancies.length > 0 && (
                <div className="mt-14 divide-y divide-hairline border-y border-hairline">
                  {vacancies.map((role, idx) => (
                    <Reveal key={role.id} index={idx} className="py-8">
                      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                        <div>
                          <h3 className="font-display text-2xl font-medium text-ink md:text-3xl">
                            {role.role}
                          </h3>
                          {role.type && (
                            <p className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-crimson">
                              {role.type}
                            </p>
                          )}
                          {role.summary && (
                            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
                              {role.summary}
                            </p>
                          )}
                          {role.requirements?.length > 0 && (
                            <ul className="mt-5 space-y-2">
                              {role.requirements.map((item) => (
                                <li key={item} className="text-[0.95rem] text-ink-soft">
                                  — {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <a
                          href={`mailto:${role.applyEmail || settings.emailCareers}?subject=${encodeURIComponent(
                            `Application: ${role.role}`
                          )}`}
                          className="btn-primary whitespace-nowrap"
                        >
                          Apply for this role
                        </a>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
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
