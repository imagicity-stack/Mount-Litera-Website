import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ManagingCommitteePage() {
  return (
    <>
      <Seo path="/managing-committee" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="relative overflow-hidden bg-ivory py-20">
            <div className="relative max-w-4xl mx-auto px-6 text-center space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-black">Stewardship</p>
              <h1 className="text-4xl font-semibold text-black">Managing Committee</h1>
              <p className="text-gray-700">
                Coming soon. Details of the committee that safeguards our mission and excellence will be shared here.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
