import { useState } from 'react';

const classOptions = [
  'Nursery',
  'LKG',
  'UKG',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10'
];

export default function QuickForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    classApplyingFor: '',
    parentName: '',
    phoneNumber: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status) {
      setStatus(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/admissions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result?.success) {
        setStatus({ type: 'success', message: 'Thank you! Our admissions team will call you shortly.' });
        setFormData({
          studentName: '',
          classApplyingFor: '',
          parentName: '',
          phoneNumber: '',
          city: ''
        });
      } else {
        throw new Error('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="admissions-form" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-cardinal">Step 1</p>
          <h2 className="text-3xl font-semibold text-cardinal">Quick Admission Form</h2>
          <p className="text-gray-600">Share just a few details to reserve your child’s priority seat.</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 gap-6 rounded-3xl bg-[#F8F5F3] p-8 shadow-xl"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="studentName" className="text-sm font-semibold text-cardinal">
              Student Name
            </label>
            <input
              id="studentName"
              name="studentName"
              type="text"
              autoComplete="name"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="classApplyingFor" className="text-sm font-semibold text-cardinal">
              Class Applying For
            </label>
            <select
              id="classApplyingFor"
              name="classApplyingFor"
              value={formData.classApplyingFor}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
            >
              <option value="">Select a class</option>
              {classOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="parentName" className="text-sm font-semibold text-cardinal">
              Parent Name
            </label>
            <input
              id="parentName"
              name="parentName"
              type="text"
              autoComplete="name"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-semibold text-cardinal">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
              placeholder="e.g. 9876543210"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="city" className="text-sm font-semibold text-cardinal">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              value={formData.city}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 bg-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-cardinal text-white font-medium shadow-lg transition hover:bg-white hover:text-cardinal border border-cardinal disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit & Hold Seat'}
            </button>
          </div>
          {status && (
            <div
              className={`rounded-lg border p-4 text-sm md:text-base ${
                status.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
