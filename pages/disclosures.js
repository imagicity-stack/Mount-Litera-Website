import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

const disclosures = [
  { title: 'Annual Academic Calendar', file: 'annual-academic-calendar.pdf' },
  { title: 'Affiliation / Upgradation / Extension of Affiliation Letter', file: 'affiliation-letter.pdf' },
  { title: 'Society / Trust / Company Registration Certificate', file: 'society-trust-registration-certificate.pdf' },
  { title: 'No Objection Certificate (NOC) from State Government / UT', file: 'noc-state-government.pdf' },
  { title: 'Building Safety Certificate', file: 'building-safety-certificate.pdf' },
  { title: 'DEO Certificate or Self-Certification by School', file: 'deo-certificate.pdf' },
  { title: 'Water, Health & Sanitation Certificates', file: 'water-health-sanitation-certificates.pdf' },
  { title: 'Fire Certificate', file: 'fire certificate mlzs.pdf' },
  { title: 'Mount Litera Managing Committee', file: 'mount_litera_zee_school_managing_committee_formal.pdf' },
  { title: 'Self Declaration', file: 'Mandatory Disclosure Details _ SARAS 7.0.pdf' },
  { title: 'PTA Members Details', file: 'pta-members.pdf' }
];

export default function DisclosuresPage() {
  return (
    <>
      <Seo path="/disclosures" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Mandatory Disclosures"
            subtitle="Clear, visual access to the documents that keep us accountable."
            eyebrow="Disclosures"
            image="/disclosures/banner-transparency.jpg"
          />
          <section className="relative py-20 md:py-28">
            <div className="mx-auto max-w-4xl px-6">
              <div className="mb-12 text-center">
                <span className="eyebrow justify-center">Transparency</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl">
                  Documented, <span className="italic">downloadable</span>.
                </h1>
                <span className="mx-auto mt-6 block h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="mx-auto mt-6 max-w-2xl text-midnight/75">
                  Access downloadable copies of our statutory documents. Updated files are added as
                  soon as they become available.
                </p>
              </div>

              <div className="grid gap-3">
                {disclosures.map((item, idx) => (
                  <a
                    key={item.file}
                    href={`/documents/mandatory-disclosures/${item.file}`}
                    download
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-midnight/10 bg-white/80 px-6 py-5 backdrop-blur transition-all duration-400 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_20px_40px_-20px_rgba(10,10,12,0.2)]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-garamond text-sm font-semibold text-cardinal/70">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-garamond text-base font-semibold text-midnight md:text-lg">
                        {item.title}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold group-hover:text-cardinal">
                      Download
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
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
