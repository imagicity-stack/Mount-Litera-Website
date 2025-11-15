const steps = [
  {
    title: 'Counselor calls you',
    description: 'Our counselor connects within 24 hours to understand your child’s needs and answer your questions.',
  },
  {
    title: 'Schedule your Free Campus Tour',
    description: 'Pick a convenient time to experience the campus, classrooms, and safety systems firsthand.',
  },
  {
    title: 'Understand your child’s readiness',
    description: 'We guide you through the readiness checklist and personalise the onboarding path.',
  },
  {
    title: 'Complete admission on priority',
    description: 'Fast-track documentation and secure your child’s seat with dedicated support.',
  },
];

export default function NurtureFlow() {
  return (
    <section className="bg-[#FDF9F6] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-cardinal">What Happens After You Register</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            A clear roadmap so you know exactly how we partner with you from the first call to the final admission.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-white rounded-3xl border border-cardinal/10 shadow-sm p-6 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-cardinal text-white font-semibold text-lg">
                  {index + 1}
                </span>
                <span className="text-sm uppercase tracking-wide text-cardinal/70 font-semibold">Step {index + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
