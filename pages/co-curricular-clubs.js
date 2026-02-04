import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

const clubs = [
  {
    name: 'Leadership and Student Council Club',
    description:
      'Develops leadership, responsibility, and decision making through assemblies, event planning, house activities, and school initiatives.',
    outcome: 'Outcome for parents: confident speakers, responsible leaders, strong character.'
  },
  {
    name: 'Sports and Fitness Club',
    description:
      'Focuses on physical development, teamwork, and discipline with structured games, fitness routines, and intra school sports activities.',
    outcome: 'Outcome for parents: active lifestyle, teamwork, physical fitness, positive energy.'
  },
  {
    name: 'Creative Expression Club',
    description:
      'Umbrella platform for art, music, dance, and stage performance. Students explore creativity, perform during events, and elevate school aesthetics.',
    outcome: 'Outcome for parents: confidence, self expression, stage presence.'
  },
  {
    name: 'Language and Communication Club',
    description:
      'Strengthens speaking, reading, storytelling, and public communication in English and Hindi through debates, storytelling sessions, and presentations.',
    outcome: 'Outcome for parents: improved communication skills, clarity of thought, confidence in expression.'
  },
  {
    name: 'Wellness and Yoga Club',
    description:
      'Centers on emotional balance, mindfulness, posture, breathing, and basic yoga practices to maintain calm and focus.',
    outcome: 'Outcome for parents: emotional stability, improved focus, healthy habits.'
  }
];

export default function CoCurricularClubsPage() {
  return (
    <>
      <Seo path="/co-curricular-clubs" />
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Co-Curricular Clubs"
            subtitle="Spaces for exploration, creativity, and student-led excellence."
            badge="Clubs"
            image="/co-curricular-clubs/banner-spectrum.jpg"
          />
          <section className="section-divider bg-ivory/80">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 space-y-6">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-black">Co Curricular Clubs</p>
                <h1 className="text-4xl font-semibold text-black">Discovering Interests. Building Confidence.</h1>
                <p className="text-gray-700 leading-relaxed max-w-4xl">
                  Co Curricular Clubs are interest based platforms where students explore their passions, develop soft skills,
                  and express themselves beyond academics. Participation is guided by student interest and age appropriateness.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 space-y-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-black">Clubs We Are Launching</h2>
                <p className="text-gray-700">Both purpose and outcomes are clearly defined for every club.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {clubs.map((club) => (
                  <div key={club.name} className="border border-black/15 bg-ivory/70 p-6 space-y-3 shadow-sm">
                    <h3 className="text-2xl font-semibold text-black">{club.name}</h3>
                    <p className="text-gray-800 leading-relaxed text-sm">{club.description}</p>
                    <p className="text-gray-700 text-sm font-semibold">{club.outcome}</p>
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
