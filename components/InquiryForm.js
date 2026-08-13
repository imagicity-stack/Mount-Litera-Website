import { useState } from 'react';
import { motion } from 'framer-motion';

import { trackFacebookEvent } from '@/lib/facebookPixel';

const textInputs = [
  { name: 'studentName', label: 'Student’s Full Name', type: 'text', placeholder: 'Full name as on certificate' },
  { name: 'parentName', label: 'Parent’s / Guardian’s Name', type: 'text', placeholder: 'Parent or guardian' },
  { name: 'contactNumber', label: 'Contact Number', type: 'tel', placeholder: '+91 00000 00000' },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
  { name: 'currentSchool', label: 'Current School', type: 'text', placeholder: 'Optional', optional: true }
];

const classOptions = [
  'Nursery', 'LKG', 'UKG',
  'I', 'II', 'III', 'IV', 'V',
  'VI', 'VII', 'VIII', 'IX', 'X'
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const inputClass =
  'w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-midnight placeholder-midnight/40 transition-all duration-300 focus:border-gold/70 focus:outline-none focus:ring-2 focus:ring-gold/30';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    contactNumber: '',
    email: '',
    classInterested: '',
    currentSchool: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ type: null, message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submissionStatus.type) {
      setSubmissionStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus({ type: null, message: '' });
    const snapshot = { ...formData };

    try {
      const response = await fetch('/api/admission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(snapshot)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to submit your inquiry right now.');
      }

      setSubmissionStatus({
        type: 'success',
        message: result.message || 'Thank you! We have received your inquiry. Our team will contact you soon.'
      });

      trackFacebookEvent('Lead', {
        currency: 'INR',
        value: 0,
        student_name: snapshot.studentName,
        class_interested: snapshot.classInterested,
        parent_name: snapshot.parentName
      });
      setFormData({
        studentName: '',
        parentName: '',
        contactNumber: '',
        email: '',
        classInterested: '',
        currentSchool: '',
        address: '',
        message: ''
      });
    } catch (error) {
      setSubmissionStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="admission-inquiry" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">Admission Inquiry Form</span>
          <h2 className="mt-5 font-garamond text-4xl font-semibold leading-[1.05] text-midnight sm:text-5xl md:text-[48px]">
            Begin the <span className="italic">conversation</span>.
          </h2>
          <span className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mt-6 text-base leading-relaxed text-midnight/75 md:text-lg">
            Share a few details and our admission counsellor will reach out with the next steps.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="surface-card relative overflow-hidden rounded-none p-8 md:p-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {textInputs.map((field) => (
              <div key={field.name} className="flex flex-col space-y-2">
                <label htmlFor={field.name} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-midnight/70">
                  {field.label}
                  {field.optional && (
                    <span className="text-[9px] tracking-[0.2em] text-midnight/45">(optional)</span>
                  )}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={!field.optional}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              </div>
            ))}
            <div className="flex flex-col space-y-2">
              <label htmlFor="classInterested" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-midnight/70">
                Class Interested In
              </label>
              <select
                id="classInterested"
                name="classInterested"
                value={formData.classInterested}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select a class</option>
                {classOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label htmlFor="address" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-midnight/70">
                Residential Address
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="House number, street, city, and state"
              />
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label htmlFor="message" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-midnight/70">
                Message / Additional Details
                <span className="text-[9px] tracking-[0.2em] text-midnight/45">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className={inputClass}
                placeholder="Share any specific questions or requests"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="btn-primary w-full md:w-auto disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting…' : 'Submit Inquiry'}
                {!isSubmitting && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14m-4-4l4 4-4 4" />
                  </svg>
                )}
              </button>
              {submissionStatus.message && (
                <p
                  className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                    submissionStatus.type === 'error'
                      ? 'border-cardinal/30 bg-cardinal/5 text-cardinal'
                      : 'border-gold/40 bg-gold/10 text-midnight'
                  }`}
                >
                  {submissionStatus.message}
                </p>
              )}
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
