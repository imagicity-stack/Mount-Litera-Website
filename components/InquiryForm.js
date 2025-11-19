import { useState } from 'react';
import { motion } from 'framer-motion';

import { trackFacebookEvent } from '@/lib/facebookPixel';

const textInputs = [
  { name: 'studentName', label: 'Student’s Full Name', type: 'text' },
  { name: 'parentName', label: 'Parent’s / Guardian’s Name', type: 'text' },
  { name: 'contactNumber', label: 'Contact Number', type: 'tel' },
  { name: 'email', label: 'Email Address', type: 'email' },
  { name: 'currentSchool', label: 'Current School (if applicable)', type: 'text' }
];

const classOptions = [
  'Nursery',
  'LKG',
  'UKG',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X'
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

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
      const response = await fetch('/api/admission-inquiry', {
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
    <section id="admission-inquiry" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center space-y-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-cardinal">Admission Inquiry Form</h2>
          <p className="text-gray-600">
            Share a few details with us and our admission counselor will reach out with the next steps.
          </p>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          {textInputs.map((field) => (
            <div key={field.name} className="flex flex-col space-y-2">
              <label htmlFor={field.name} className="text-sm font-semibold text-cardinal">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.name !== 'currentSchool'}
                className="rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
              />
            </div>
          ))}
          <div className="flex flex-col space-y-2">
            <label htmlFor="classInterested" className="text-sm font-semibold text-cardinal">
              Class Interested In
            </label>
            <select
              id="classInterested"
              name="classInterested"
              value={formData.classInterested}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
            >
              <option value="">Select a class</option>
              {classOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col space-y-2">
            <label htmlFor="address" className="text-sm font-semibold text-cardinal">
              Residential Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
              className="rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
              placeholder="House number, street, city, and state"
            />
          </div>
          <div className="md:col-span-2 flex flex-col space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-cardinal">
              Message / Additional Details
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
              placeholder="Share any specific questions or requests"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-cardinal text-white font-medium shadow-lg transition hover:bg-white hover:text-cardinal border border-cardinal disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            {submissionStatus.message && (
              <p
                className={`mt-3 text-sm ${submissionStatus.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
              >
                {submissionStatus.message}
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
