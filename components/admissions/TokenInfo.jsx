export default function TokenInfo() {
  return (
    <section className="bg-[#F8F5F3] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-3xl bg-white shadow-xl border border-gray-100 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-cardinal">Why a ₹500 Token Booking?</h2>
          <p className="mt-4 text-gray-600">
            A simple, transparent step that keeps the admission journey smooth for every family.
          </p>
          <ul className="mt-8 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
              <span>Prevents seat overbooking</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
              <span>Ensures serious parents get priority</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
              <span>Fully adjusted in final admission fees</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
              <span>Safe and transparent process for all families</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
