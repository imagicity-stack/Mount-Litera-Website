import { useCallback, useMemo, useState } from 'react';

const initialFormState = {
  parentName: '',
  childName: '',
  phone: '',
  classApplying: '',
  email: '',
};

export default function MiniLeadForm() {
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setIsSubmitted(false);
  }, []);

  const isDisabled = useMemo(() => {
    return !formState.parentName || !formState.childName || !formState.phone || !formState.classApplying || !formState.email;
  }, [formState]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (isDisabled) return;
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState(initialFormState);
        const contentSection = document.getElementById('admissionContent');
        if (contentSection) {
          contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 400);
    },
    [isDisabled],
  );

  return (
    <section id="mini-lead-form" className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#F7F5F2] rounded-3xl shadow-lg p-8 md:p-10 border border-cardinal/10">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-cardinal">Quickly Reserve Your Spot</h2>
            <p className="text-gray-600 mt-2">
              Share a few details so we can send your School Readiness Checklist and help you book a free campus tour.
            </p>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="parentName" className="text-sm font-medium text-gray-700">
                Parent Name
              </label>
              <input
                id="parentName"
                name="parentName"
                type="text"
                value={formState.parentName}
                onChange={handleChange}
                className="mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 focus:border-cardinal focus:outline-none focus:ring-2 focus:ring-cardinal/20"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="childName" className="text-sm font-medium text-gray-700">
                Child Name
              </label>
              <input
                id="childName"
                name="childName"
                type="text"
                value={formState.childName}
                onChange={handleChange}
                className="mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 focus:border-cardinal focus:outline-none focus:ring-2 focus:ring-cardinal/20"
                placeholder="Enter your child&apos;s name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={handleChange}
                className="mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 focus:border-cardinal focus:outline-none focus:ring-2 focus:ring-cardinal/20"
                placeholder="Enter your contact number"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="classApplying" className="text-sm font-medium text-gray-700">
                Class Applying For
              </label>
              <input
                id="classApplying"
                name="classApplying"
                type="text"
                value={formState.classApplying}
                onChange={handleChange}
                className="mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 focus:border-cardinal focus:outline-none focus:ring-2 focus:ring-cardinal/20"
                placeholder="Eg. Grade 1"
                required
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                className="mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 focus:border-cardinal focus:outline-none focus:ring-2 focus:ring-cardinal/20"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting || isDisabled}
                className="inline-flex items-center justify-center rounded-full bg-cardinal text-white px-8 py-3 font-semibold shadow-md transition disabled:cursor-not-allowed disabled:bg-cardinal/50"
              >
                {isSubmitting ? 'Submitting...' : 'Send Me the Checklist'}
              </button>
              <p className="text-sm text-gray-500 italic">
                Checklist download link & WhatsApp guidance will appear here after integration.
              </p>
            </div>
          </form>
          {isSubmitted && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-emerald-700">
              <p className="font-semibold">Success! Your request has been received.</p>
              <p className="text-sm mt-1">We&apos;ll send the checklist download link and WhatsApp follow-up shortly.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
