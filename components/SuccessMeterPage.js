import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const classOptions = [
  '',
  'Nursery',
  'LKG',
  'UKG',
  'Class I',
  'Class II',
  'Class III',
  'Class IV',
  'Class V',
  'Class VI',
  'Class VII',
  'Class VIII',
  'Class IX',
  'Class X',
  'Class XI',
  'Class XII'
];

const quizFields = [
  {
    name: 'examPercentage',
    label: 'What was your child’s last exam percentage?',
    options: ['Below 50%', '50% - 65%', '66% - 80%', '81% - 90%', 'Above 90%']
  },
  {
    name: 'studyHours',
    label: 'How many hours does your child study daily?',
    options: ['Below 1 hour', '1 - 2 hours', '2 - 4 hours', '4+ hours']
  },
  {
    name: 'tuitionRegularity',
    label: 'Does your child attend tuition regularly?',
    options: ['Yes, consistently', 'Sometimes', 'No, not attending']
  },
  {
    name: 'classRank',
    label: 'Does your child rank among the top students in class?',
    options: ['Usually top 3', 'Often in top 10', 'Occasionally', 'Not really']
  },
  {
    name: 'priority',
    label: 'What matters most to you right now?',
    options: ['Marks', 'Confidence', 'Discipline', 'Communication', 'Overall growth']
  }
];

const requiredFields = [
  'parentName',
  'studentName',
  'phoneNumber',
  'classOfStudent',
  ...quizFields.map((field) => field.name)
];

const initialData = {
  parentName: '',
  studentName: '',
  phoneNumber: '',
  emailAddress: '',
  classOfStudent: '',
  currentSchool: '',
  cityLocation: '',
  examPercentage: '',
  studyHours: '',
  tuitionRegularity: '',
  classRank: '',
  priority: ''
};

const isValidPhone = (phone) => /^\+?[0-9\s()-]{10,15}$/.test(phone.trim());
const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email.trim());

export default function SuccessMeterPage() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const completion = useMemo(() => {
    const completed = requiredFields.filter((field) => formData[field]?.trim()).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const nextErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        nextErrors[field] = 'This field is required.';
      }
    });

    if (formData.phoneNumber && !isValidPhone(formData.phoneNumber)) {
      nextErrors.phoneNumber = 'Please enter a valid phone number.';
    }

    if (formData.emailAddress && !isValidEmail(formData.emailAddress)) {
      nextErrors.emailAddress = 'Please enter a valid email address.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!validate()) {
      setStatusMessage({ type: 'error', text: 'Please fix the highlighted fields and try again.' });
      return;
    }

    setStatusMessage({ type: '', text: '' });
    setIsSubmitting(true);
    setIsLoadingResult(true);

    try {
      const [response] = await Promise.all([
        fetch('/api/successmeter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }),
        new Promise((resolve) => setTimeout(resolve, 1900))
      ]);

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setResultVisible(true);
      setStatusMessage({
        type: 'success',
        text: 'Submission received. Thank you for taking the Success Meter.'
      });
    } catch (error) {
      console.error('Success meter submission failed:', error);
      setStatusMessage({
        type: 'error',
        text: 'Something went wrong while submitting. Please try again in a moment.'
      });
    } finally {
      setIsLoadingResult(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 text-slate-800">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-12 pt-10 md:px-6 md:pt-14">
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-block border border-amber-200 bg-amber-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-800" style={{ borderRadius: 999 }}>
            Success Meter Campaign
          </p>
          <h1 className="mt-5 text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Will Your Child Be Successful In Life?
          </h1>
          <p className="mt-4 text-base text-slate-600 md:text-lg">
            Take this short Success Meter to reflect on what really shapes a child’s future.
          </p>
          <p className="mt-2 text-sm text-slate-500 md:text-base">
            It only takes a minute, and the reflection may surprise you.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="mx-auto mt-8 w-full max-w-4xl border border-white/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:mt-10 md:p-9"
          style={{ borderRadius: 24 }}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-slate-600">Step 1 of 2</p>
            <p className="text-sm text-slate-500">{completion}% complete</p>
          </div>
          <div className="mt-3 h-2 overflow-hidden bg-slate-100" style={{ borderRadius: 999 }}>
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-rose-400"
              animate={{ width: `${completion}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {[
              ['parentName', 'Parent Name *', 'text'],
              ['studentName', 'Student Name *', 'text'],
              ['phoneNumber', 'Phone Number *', 'tel'],
              ['emailAddress', 'Email Address (optional)', 'email'],
              ['currentSchool', 'School currently studying in (optional)', 'text'],
              ['cityLocation', 'City / Location (optional)', 'text']
            ].map(([name, label, type]) => (
              <label key={name} className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                {label}
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                  style={{ borderRadius: 14 }}
                />
                {errors[name] ? <span className="text-xs text-red-600">{errors[name]}</span> : null}
              </label>
            ))}

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Class of Student *
              <select
                name="classOfStudent"
                value={formData.classOfStudent}
                onChange={handleChange}
                className="border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                style={{ borderRadius: 14 }}
              >
                {classOptions.map((option) => (
                  <option value={option} key={option || 'placeholder'}>
                    {option || 'Select class'}
                  </option>
                ))}
              </select>
              {errors.classOfStudent ? <span className="text-xs text-red-600">{errors.classOfStudent}</span> : null}
            </label>

            <div className="md:col-span-2 mt-2 grid gap-4">
              {quizFields.map((field) => (
                <label key={field.name} className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  {field.label} *
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                    style={{ borderRadius: 14 }}
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors[field.name] ? <span className="text-xs text-red-600">{errors[field.name]}</span> : null}
                </label>
              ))}
            </div>

            <div className="md:col-span-2 mt-2">
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                style={{ borderRadius: 14 }}
              >
                {isSubmitting ? 'Checking Success Meter...' : 'Check Success Meter'}
              </motion.button>
            </div>

            {statusMessage.text ? (
              <p className={`md:col-span-2 text-sm ${statusMessage.type === 'error' ? 'text-red-600' : 'text-emerald-700'}`}>
                {statusMessage.text}
              </p>
            ) : null}
          </form>

          <AnimatePresence>
            {isLoadingResult ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-6 border border-amber-100 bg-amber-50/70 p-4 text-sm text-amber-800"
                style={{ borderRadius: 14 }}
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    className="h-5 w-5 border-2 border-amber-400 border-t-transparent"
                    style={{ borderRadius: 999 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                  />
                  Analyzing your responses...
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.section>

        <AnimatePresence>
          {resultVisible ? (
            <motion.section
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="mx-auto mt-7 w-full max-w-4xl border border-rose-100 bg-white p-6 shadow-[0_20px_50px_rgba(244,63,94,0.12)] md:p-8"
              style={{ borderRadius: 24 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-rose-500">Step 2 of 2</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Result: Error</h2>
              <p className="mt-3 text-base text-slate-700">
                We cannot predict your child’s future through marks, rank, or study hours alone.
              </p>
              <p className="mt-4 text-slate-600">
                Real success is shaped by confidence, curiosity, creativity, communication, leadership, and character.
                These qualities empower children to adapt, lead, and thrive in life.
              </p>
              <p className="mt-5 text-slate-800 font-medium">
                At The Elden Heights School, we believe children should be prepared for life, not just exams.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
                style={{ borderRadius: 12 }}
              >
                Talk to Our Team
              </a>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}
