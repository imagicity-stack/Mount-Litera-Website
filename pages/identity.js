import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Section = ({ title, children, eyebrow }) => (
  <section className="py-14 md:py-16">
    <div className="max-w-5xl mx-auto px-6 space-y-4">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cardinal/80">{eyebrow}</p>
      )}
      <h2 className="text-2xl md:text-3xl font-semibold text-cardinal">{title}</h2>
      <div className="prose prose-lg max-w-none text-gray-800 prose-headings:font-semibold prose-li:marker:text-cardinal prose-strong:text-cardinal">
        {children}
      </div>
    </div>
  </section>
);

export default function Identity() {
  return (
    <>
      <Head>
        <title>The Elden Heights School | Identity, Vision & Values</title>
        <meta
          name="description"
          content="Discover the legacy, symbolism, mission, vision, and values that define The Elden Heights School, alongside the disciplined ethos of The Elden Code."
        />
        <meta property="og:title" content="The Elden Heights School | Identity, Vision & Values" />
        <meta
          property="og:description"
          content="Explore the heritage behind our name, the meaning of our emblem, our mission and vision, and the core values guiding every learner at The Elden Heights School."
        />
      </Head>
      <div className="min-h-screen bg-[#f6f1ea] text-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="relative overflow-hidden bg-gradient-to-b from-[#1b0b0f] via-[#1f0f14] to-[#f6f1ea]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(165,0,33,0.25),transparent_55%),radial-gradient(circle_at_80%_40%,rgba(196,180,150,0.35),transparent_60%)]" aria-hidden="true" />
            <div className="relative max-w-5xl mx-auto px-6 py-24 space-y-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-cardinal/70">Identity</p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                The story, symbolism, and standards of The Elden Heights School
              </h1>
              <p className="max-w-3xl text-lg text-white/85">
                Heritage with intention: our name, emblem, mission, and values create a disciplined arc for every learner—from Roots to Eternity.
              </p>
            </div>
          </div>

          <Section title="The legacy of our name" eyebrow="Our Namesake">
            <p>
              The name Elden Heights reflects a timeless pursuit of excellence. “Elden” signifies wisdom, heritage and enduring strength. “Heights” represents growth, ambition and the continuous rise toward one’s fullest potential. Together, the name embodies an institution committed to guiding every learner upward, with discipline, character and purpose.
            </p>
          </Section>

          <Section title="The meaning of our logo" eyebrow="Emblem">
            <p>
              The emblem of Elden Heights is a symbolic expression of the school’s values, identity and long-term educational philosophy. Each element has been designed with intention and meaning.
            </p>
            <ol>
              <li>
                <strong>The Eagle</strong><br />
                The eagle signifies clarity of thought, courage in action and the aspiration to rise above challenges. It reflects the school’s commitment to cultivating students who think deeply, act responsibly and lead with confidence.
              </li>
              <li>
                <strong>The Torch</strong><br />
                The torch represents enlightenment, knowledge and the enduring pursuit of truth. It stands as a reminder that education is not merely acquired; it is carried forward and shared with the world.
              </li>
              <li>
                <strong>The Four Wings</strong><br />
                The four wings articulate the structured learning journey at Elden Heights:
                <ul>
                  <li><strong>Roots</strong> – Establishing foundational values and discipline</li>
                  <li><strong>Ascent</strong> – Developing knowledge, resilience and curiosity</li>
                  <li><strong>Radiance</strong> – Encouraging self-expression, leadership and confidence</li>
                  <li><strong>Eternity</strong> – Inspiring purpose, responsibility and lifelong contribution</li>
                </ul>
                These stages define the growth path of every student.
              </li>
              <li>
                <strong>The Cardinal Red</strong><br />
                The cardinal red colour represents strength, heritage and institutional pride. It underscores the school’s belief that excellence is a tradition cultivated over time.
              </li>
            </ol>
          </Section>

          <Section title="Mission" eyebrow="Purpose">
            <p>
              To nurture young minds through disciplined learning, meaningful experiences and a values-based environment that builds character, confidence and clarity. The school aims to develop individuals who rise with purpose, think with depth and lead with humility and strength.
            </p>
          </Section>

          <Section title="Vision" eyebrow="Direction">
            <p>
              To establish a legacy institution where every learner progresses through Roots, Ascent, Radiance and Eternity, becoming a responsible, capable and globally aware individual committed to uplifting society.
            </p>
          </Section>

          <Section title="Our educational philosophy: Roots to Eternity" eyebrow="Framework">
            <ul>
              <li><strong>Roots</strong> – Building values, discipline and foundational skills.</li>
              <li><strong>Ascent</strong> – Advancing academic growth, inquiry and resilience.</li>
              <li><strong>Radiance</strong> – Encouraging expression, leadership and personal confidence.</li>
              <li><strong>Eternity</strong> – Guiding students toward purpose, contribution and lifelong learning.</li>
            </ul>
          </Section>

          <Section title="Principal’s message" eyebrow="Leadership">
            <p>
              Dear Students and Parents,
            </p>
            <p>
              At Elden Heights, education is not measured by the pages we cover, but by the depth of understanding we cultivate and the character we shape. Each day within our campus is an opportunity to strengthen one’s foundation, to rise a little higher and to discover the values that define a life of purpose.
            </p>
            <p>
              Our approach is simple yet profound. We believe that discipline brings clarity, curiosity fuels learning and integrity shapes trustworthy individuals. These principles guide us as we support every student through the stages of Roots, Ascent, Radiance and Eternity. This journey is designed with intention, allowing learners to grow not only in knowledge but also in confidence, resilience and empathy.
            </p>
            <p>
              A school becomes meaningful when it becomes a place of consistency, care and high expectations. Here, we strive to create an environment where students feel safe to question, encouraged to participate and motivated to improve. The habits they build today, in classrooms and beyond, will quietly define the adults they become.
            </p>
            <p>
              As you begin this academic year, I urge every student to remain steady in effort, respectful in conduct and honest in reflection. Small actions repeated daily lead to remarkable outcomes. Let this diary be more than a record of homework; let it be a companion in your journey of becoming a thoughtful, capable and responsible individual.
            </p>
            <p>
              Together, let us uphold the values that give Elden Heights its strength and ensure that every learner moves forward with dignity, confidence and a clear sense of direction.
            </p>
            <p className="font-semibold text-cardinal">Warm regards,<br />Principal<br />The Elden Heights School</p>
          </Section>

          <Section title="Core values of Elden Heights" eyebrow="Values">
            <p>
              At Elden Heights, our values form the foundation on which every learner grows. They guide our conduct, shape our culture and define the character we aspire to build in each student.
            </p>
            <ol>
              <li><strong>Integrity</strong> – To act with honesty in thought, word and action, even when no one is watching. Integrity forms the bedrock of trust and responsible citizenship.</li>
              <li><strong>Discipline</strong> – To maintain consistency in behaviour, punctuality and effort. Discipline supports clarity of mind and creates the conditions for meaningful progress.</li>
              <li><strong>Respect</strong> – To recognise the dignity of every individual and to engage with others through empathy, consideration and fairness.</li>
              <li><strong>Curiosity</strong> – To question, explore and seek understanding beyond the surface. Curiosity fuels learning and encourages students to think deeply and independently.</li>
              <li><strong>Perseverance</strong> – To remain steady in effort despite challenges. Perseverance builds resilience and prepares students for the realities of life beyond school.</li>
              <li><strong>Responsibility</strong> – To take ownership of one’s actions, decisions and commitments. Responsibility shapes maturity and fosters accountability.</li>
              <li><strong>Excellence</strong> – To pursue quality in work, behaviour and performance. Excellence is not an act but a continuous habit that defines the culture of Elden Heights.</li>
              <li><strong>Compassion</strong> – To act with kindness, understanding and a willingness to support others. Compassion strengthens community and nurtures balanced character.</li>
            </ol>
          </Section>

          <Section title="The Elden Code" eyebrow="Conduct">
            <p>
              Code of Conduct for Students of Elden Heights
            </p>
            <p>
              The Elden Code outlines the standards of behaviour expected from every learner of Elden Heights. These guidelines ensure a disciplined, respectful and growth-oriented environment where each student can learn with purpose and dignity. Every student is expected to uphold these principles within the school premises and beyond.
            </p>
            <ol>
              <li><strong>Conduct and Behaviour</strong> – Students are expected to act with courtesy, calmness and respect at all times. Behaviour that disrupts learning, undermines discipline or affects the well-being of others is not acceptable.</li>
              <li><strong>Respect for Staff and Peers</strong> – All interactions with teachers, staff members and fellow students must reflect respect, patience and consideration. Language, gestures or attitudes that demean or hurt others will not be tolerated.</li>
              <li><strong>Attendance and Punctuality</strong> – Students must attend school regularly and arrive on time for classes, assemblies and activities. Absences must be supported by valid reasons and communicated by parents through proper channels.</li>
              <li><strong>Academic Responsibility</strong> – Students must complete classwork, homework and assigned tasks with honesty and sincerity. Plagiarism, copying or seeking unfair advantage during assessments is strictly prohibited.</li>
              <li><strong>Uniform and Appearance</strong> – Students must wear the prescribed uniform neatly and correctly on all school days. Personal grooming should reflect discipline and respect for school standards.</li>
              <li><strong>Use of School Property</strong> – School infrastructure, books, digital equipment and all resources must be handled with care. Any damage caused intentionally or through negligence must be reported immediately.</li>
              <li><strong>Digital Conduct</strong> – Students must use digital devices, online platforms and the school ERP responsibly. Sharing inappropriate content, misusing information or engaging in cyberbullying is strictly forbidden.</li>
              <li><strong>Movement and Safety</strong> – Students must maintain order while moving through corridors, staircases and buses. Actions that endanger oneself or others are unacceptable.</li>
              <li><strong>Cleanliness and Environment</strong> – Students must maintain cleanliness in classrooms, corridors and common areas. Littering, writing on walls or damaging school property violates the values of the institution.</li>
              <li><strong>Representing the School</strong> – Students participating in events, competitions or public spaces as representatives of Elden Heights must demonstrate exemplary conduct. Their behaviour should reflect the ethos of the school at all times.</li>
            </ol>
            <h3 className="mt-6 text-xl font-semibold text-cardinal">Recourse for non-compliance</h3>
            <p>
              Failure to follow The Elden Code may result in the following corrective measures, depending on the severity and frequency of the behaviour:
            </p>
            <ul>
              <li>Verbal Warning — Issued by the class teacher or relevant staff member for minor misconduct.</li>
              <li>Written Note in the Diary — Parents will be informed through an official note requiring acknowledgment.</li>
              <li>Detention or Loss of Privileges — Short-term detention or restriction from select school activities.</li>
              <li>Parent Meeting — Formal discussion with parents to address recurring concerns.</li>
              <li>Written Report — A disciplinary report filed with the school administration.</li>
              <li>Suspension (Temporary) — Applied in cases of repeated or serious violations affecting safety or discipline.</li>
              <li>Termination of Admission (Extreme Cases) — Reserved strictly for actions that pose significant threat to school safety, integrity or the well-being of others.</li>
            </ul>
            <p>
              These measures are intended to guide students toward responsible behaviour and uphold the standards that define Elden Heights.
            </p>
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
}
