import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TheEldenCouncilPage() {
  return (
    <>
      <Seo path="/the-elden-council" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="relative overflow-hidden bg-ivory py-20">
            <div className="relative max-w-5xl mx-auto px-6 space-y-12">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-black text-center">Governance</p>
                <h1 className="text-4xl font-semibold text-black text-center">The Elden Council</h1>
                <div className="max-w-3xl mx-auto space-y-3 text-center text-gray-900 font-medium leading-relaxed">
                  <p>
                    The Elden Heights School is registered under the Bhagwati Educational and Charitable Trust, an institution devoted to building a lineage of scholars, leaders, and responsible citizens. The Elden Council safeguards this commitment, ensuring that every decision, tradition, and innovation upholds our heritage of excellence and our motto, "Towards Eternal Glory."
                  </p>
                  <p>
                    Guided by trustees who embody integrity and vision, the council shapes policy, nurtures faculty excellence, and strengthens the partnership between families and the school community. Their stewardship keeps The Elden Heights focused on disciplined growth, transparent governance, and a culture where every student can rise.
                  </p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-4">
                {[{ name: 'Anit Ankur', title: 'Settlor' }, { name: 'Shashi Shankar Prasad', title: 'Managing Trustee' }, { name: 'Vinita Ankur', title: 'Trustee' }, { name: 'Vandana Prasad', title: 'Trustee' }].map((member) => (
                  <div key={member.name} className="overflow-hidden rounded-2xl border border-black/20 bg-white shadow-sm">
                    <div className="flex aspect-[4/5] w-full items-center justify-center bg-cardinal/5 text-black text-sm uppercase tracking-[0.2em]">
                      Image
                    </div>
                    <div className="space-y-1 border-t border-black/15 bg-white px-4 py-3 text-center">
                      <p className="text-xl font-bold text-black leading-tight">{member.name}</p>
                      <p className="text-sm uppercase tracking-[0.15em] font-semibold text-gray-900">{member.title}</p>
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
