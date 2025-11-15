export default function PriorityPass() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#F7F5F2] rounded-3xl border border-cardinal/10 shadow-lg p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-semibold text-cardinal">Get Priority Admission Pass</h2>
          <p className="text-gray-600 text-lg">
            Only ₹500 refundable at admission. Priority processing + guided school onboarding.
          </p>
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-full bg-cardinal/40 text-white px-8 py-3 font-semibold shadow-inner cursor-not-allowed"
          >
            Get Priority Pass (Coming Soon)
          </button>
          <p className="text-sm text-gray-500">Only 50 Priority Passes available this month.</p>
        </div>
      </div>
    </section>
  );
}
