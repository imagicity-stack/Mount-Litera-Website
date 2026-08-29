import useContent from '@/lib/useContent';



export default function Testimonials() {
  const { items: testimonials } = useContent('testimonials');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-black">Families Trust Us</p>
          <h2 className="text-3xl font-semibold text-black">Parent Testimonials</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-3xl border border-gray-100 bg-[#F8F5F3] p-8 shadow-inner"
            >
              <p className="text-lg text-gray-700">“{testimonial.quote}”</p>
              <p className="mt-4 font-semibold text-black">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
