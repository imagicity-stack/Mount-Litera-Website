export default function WhatsAppCTA() {
  return (
    <section className="bg-cardinal text-white py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-semibold">Need help? Chat with our admissions team instantly.</h2>
          <p className="text-white/80">We&apos;re available during school hours to answer every question you have.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-white text-cardinal font-semibold px-6 py-3 shadow-md hover:bg-white/90 transition"
        >
          Chat on WhatsApp
        </button>
      </div>
    </section>
  );
}
