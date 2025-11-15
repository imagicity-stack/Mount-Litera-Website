export default function PaymentPlaceholder() {
  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-3xl border border-dashed border-cardinal/50 bg-white p-8 md:p-12 text-center shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-cardinal">Step 2</p>
          <h2 className="mt-2 text-3xl font-semibold text-cardinal">₹500 Priority Seat Token</h2>
          <p className="mt-4 text-gray-600">
            This token amount is fully adjusted in final admission fees.
            <br className="hidden md:block" />
            If a seat is not allotted, the amount is refunded.
          </p>
          <button
            type="button"
            disabled
            className="mt-8 inline-flex items-center justify-center rounded-xl border border-cardinal/40 bg-cardinal/10 px-6 py-3 font-medium text-cardinal opacity-70 cursor-not-allowed"
          >
            Proceed to Payment (Coming Soon)
          </button>
        </div>
      </div>
    </section>
  );
}
