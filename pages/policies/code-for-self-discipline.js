import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageBanner from '@/components/ImageBanner';

export default function SelfDisciplinePolicyPage() {
  return (
    <>
      <Seo path="/policies/code-for-self-discipline" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <ImageBanner
            title="Code for Self-Discipline"
            subtitle="Guiding habits that shape confident, responsible learners."
            eyebrow="Policy"
            image="/policies/code-for-self-discipline/banner-policy.jpg"
          />
          <section className="relative py-20 md:py-28">
            <div className="mx-auto max-w-4xl px-6">
              <div className="mb-10">
                <span className="eyebrow">Policy Document</span>
                <h1 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl">
                  Code for Self-Discipline
                </h1>
                <span className="mt-6 block h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              </div>
              <div className="surface-card space-y-6 rounded-none p-8 text-midnight/85 md:p-12">
              <p>
                The Elden Heights School nurtures responsible citizens who demonstrate respect, integrity, and resilience. Our Code for
                Self-Discipline empowers students to lead themselves, contribute positively to school life, and uphold the
                The Elden Heights School ethos on and off campus.
              </p>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Core Expectations</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Arrive on time, prepared for learning, and dressed in the prescribed school attire.</li>
                  <li>Show respect to peers, teachers, staff, and visitors through courteous words and actions.</li>
                  <li>Use school property responsibly and maintain cleanliness across classrooms and common areas.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Responsible Conduct</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Follow classroom procedures, listen actively, and participate constructively.</li>
                  <li>Practice digital citizenship by using technology ethically and safeguarding personal information.</li>
                  <li>Resolve disagreements peacefully, seeking guidance from mentors whenever required.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="font-garamond text-2xl font-semibold text-midnight">Leadership in Action</h2>
                <ul className="space-y-2 text-midnight/80 list-disc list-inside">
                  <li>Take ownership of assignments, deadlines, and collaborative projects.</li>
                  <li>Support peers through empathy, inclusion, and positive encouragement.</li>
                  <li>Represent the school with pride during events, competitions, and community engagements.</li>
                </ul>
              </div>
              <p>
                Reinforcement sessions, mentorship circles, and parental collaboration ensure that the Code for Self-Discipline is
                lived every day. Together, we cultivate a campus culture where discipline stems from self-awareness and mutual
                respect.
              </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
