import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const disclosures = [
  {
    title: 'Annual Academic Calendar',
    file: 'annual-academic-calendar.pdf'
  },
  {
    title: 'Affiliation / Upgradation / Extension of Affiliation Letter',
    file: 'affiliation-letter.pdf'
  },
  {
    title: 'Society / Trust / Company Registration Certificate',
    file: 'society-trust-registration-certificate.pdf'
  },
  {
    title: 'No Objection Certificate (NOC) from State Government / UT',
    file: 'noc-state-government.pdf'
  },
  {
    title: 'Building Safety Certificate',
    file: 'building-safety-certificate.pdf'
  },
  {
    title: 'DEO Certificate or Self-Certification by School',
    file: 'deo-certificate.pdf'
  },
  {
    title: 'Water, Health & Sanitation Certificates',
    file: 'water-health-sanitation-certificates.pdf'
  },
  {
    title: 'PTA Members Details',
    file: 'pta-members.pdf'
  }
];

export default function DisclosuresPage() {
  return (
    <>
      <Head>
        <title>Disclosures | Mount Litera School</title>
        <meta
          name="description"
          content="Download statutory disclosures and certifications for Mount Litera School."
        />
      </Head>
      <div className="min-h-screen bg-[#F8F5F3] text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1 py-16">
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-semibold text-cardinal">Mandatory Disclosures</h1>
              <p className="text-gray-600">
                Access downloadable copies of our statutory documents. Each link will provide a PDF download; updated files
                will be added as soon as they are available.
              </p>
            </div>
            <div className="grid gap-4">
              {disclosures.map((item) => (
                <a
                  key={item.file}
                  href={`/documents/mandatory-disclosures/${item.file}`}
                  download
                  className="flex items-center justify-between rounded-2xl border border-cardinal/15 bg-white px-5 py-4 transition-colors hover:border-cardinal hover:bg-cardinal/5"
                >
                  <span className="font-medium text-cardinal">{item.title}</span>
                  <span className="text-sm font-semibold text-cardinal/70">Download</span>
                </a>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
