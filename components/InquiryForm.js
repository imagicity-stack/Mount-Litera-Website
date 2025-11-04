import { useState } from 'react';
import { motion } from 'framer-motion';

const fields = [
  { name: 'studentName', label: 'Student Name', type: 'text' },
  { name: 'parentName', label: 'Parent Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'mobile', label: 'Mobile Number', type: 'tel' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    mobile: '',
    classLevel: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Admission Inquiry', formData);
    setSubmitted(true);
  };

  return (
    <section id="inquiry" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-6">
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
            We’ll reach out to you with more details about the transition and admission process.
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
          {fields.map((field) => (
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
                className="rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
                required
              />
            </div>
          ))}
          <div className="flex flex-col space-y-2">
            <label htmlFor="classLevel" className="text-sm font-semibold text-cardinal">
              Class Interested In
            </label>
            <select
              id="classLevel"
              name="classLevel"
              value={formData.classLevel}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
              required
            >
              <option value="">Select an option</option>
              <option value="Nursery">Nursery</option>
              <option value="KG">Kindergarten</option>
              <option value="Primary">Primary (I-V)</option>
              <option value="Middle">Middle (VI-VIII)</option>
              <option value="Secondary">Secondary (IX-X)</option>
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-cardinal">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-cardinal"
              placeholder="Share any specific questions or details"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-cardinal text-white font-medium shadow-lg transition hover:bg-white hover:text-cardinal border border-cardinal"
            >
              Submit
            </button>
            {submitted && (
              <p className="mt-3 text-sm text-green-600">
                Thank you! We have received your inquiry.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
