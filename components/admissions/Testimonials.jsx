const testimonials = [
  'My child loves the environment here. The teachers are amazing.',
  'Very safe and structured system. Highly recommended.',
  'Best school experience we’ve had so far.',
];

export default function Testimonials() {
  return (
    <section className="bg-[#FDF9F6] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-cardinal">Parents are already loving Mount Litera</h2>
          <p className="mt-3 text-gray-600">A snapshot of what families are saying about their experience.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((quote) => (
            <div key={quote} className="bg-white rounded-3xl border border-cardinal/10 shadow-sm p-6 flex flex-col">
              <p className="text-gray-700 leading-relaxed flex-1">“{quote}”</p>
              <div className="mt-6 text-sm text-gray-500">Parent Testimonial</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
