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

const basicFields = [
  { name: 'parentName', label: 'Your name (parent) *', type: 'text', required: true },
  { name: 'studentName', label: 'Student Name *', type: 'text', required: true },
  { name: 'phoneNumber', label: 'Phone Number *', type: 'tel', required: true }
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

const totalInteractiveSteps = 1 + quizFields.length;

const analysisSteps = [
  'Reviewing your responses',
  'Checking study and routine patterns',
  'Comparing growth mindset indicators',
  'Evaluating confidence and communication signals',
  'Mapping long-term life readiness markers'
];

export default function SuccessMeterPage() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [completedAnalysisSteps, setCompletedAnalysisSteps] = useState(0);
  const [resultVisible, setResultVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const progress = useMemo(() => {
    if (resultVisible) {
      return 100;
    }

    if (isLoadingResult) {
      return 95;
    }

    if (currentStep === 0) {
      return 8;
    }

    return Math.round((currentStep / totalInteractiveSteps) * 100);
  }, [currentStep, isLoadingResult, resultVisible]);

  const stepLabel = useMemo(() => {
    if (resultVisible) {
      return 'Step 2 of 2';
    }

    if (isLoadingResult) {
      return 'Analyzing';
    }

    if (currentStep === 0) {
      return 'Welcome';
    }

    if (currentStep === 1) {
      return 'Step 1 of 2';
    }

    return `Question ${currentStep - 1} of ${quizFields.length}`;
  }, [currentStep, isLoadingResult, resultVisible]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateBasicDetails = () => {
    const nextErrors = {};

    if (!formData.parentName.trim()) {
      nextErrors.parentName = 'This field is required.';
    }

    if (!formData.studentName.trim()) {
      nextErrors.studentName = 'This field is required.';
    }

    if (!formData.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'This field is required.';
    } else if (!isValidPhone(formData.phoneNumber)) {
      nextErrors.phoneNumber = 'Please enter a valid phone number.';
    }

    if (!formData.classOfStudent.trim()) {
      nextErrors.classOfStudent = 'Please select class of student.';
    }

    if (formData.emailAddress && !isValidEmail(formData.emailAddress)) {
      nextErrors.emailAddress = 'Please enter a valid email address.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateQuizStep = () => {
    const quizIndex = currentStep - 2;
    const question = quizFields[quizIndex];

    if (!question) {
      return true;
    }

    if (!formData[question.name]) {
      setErrors((prev) => ({ ...prev, [question.name]: 'Please choose one option to continue.' }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [question.name]: '' }));
    return true;
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }

    if (currentStep === 1) {
      if (!validateBasicDetails()) {
        setStatusMessage({ type: 'error', text: 'Please fill required details correctly.' });
        return;
      }

      setStatusMessage({ type: '', text: '' });
      setCurrentStep(2);
      return;
    }

    if (!validateQuizStep()) {
      return;
    }

    if (currentStep < totalInteractiveSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (isSubmitting || isLoadingResult) {
      return;
    }

    setStatusMessage({ type: '', text: '' });
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    const currentQuestion = quizFields[quizFields.length - 1];
    if (!formData[currentQuestion.name]) {
      setErrors((prev) => ({ ...prev, [currentQuestion.name]: 'Please choose one option to continue.' }));
      return;
    }

    setStatusMessage({ type: '', text: '' });
    setIsSubmitting(true);
    setIsLoadingResult(true);
    setCompletedAnalysisSteps(0);

    const analysisInterval = setInterval(() => {
      setCompletedAnalysisSteps((prev) => (prev < analysisSteps.length ? prev + 1 : prev));
    }, 380);

    try {
      const response = await fetch('/api/successmeter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      await new Promise((resolve) => setTimeout(resolve, 2300));

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
      clearInterval(analysisInterval);
      setCompletedAnalysisSteps(analysisSteps.length);
      setIsSubmitting(false);
      setIsLoadingResult(false);
    }
  };

  const isQuizStep = currentStep >= 2 && currentStep <= totalInteractiveSteps;
  const currentQuestion = isQuizStep ? quizFields[currentStep - 2] : null;
  const isLastQuestion = currentStep === totalInteractiveSteps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 px-3 py-6 text-slate-800 sm:px-5 md:py-12">
      <main className="mx-auto w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="border border-white/80 bg-white/95 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] sm:p-7"
          style={{ borderRadius: 24 }}
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">success meter</p>
            <p className="text-xs font-medium text-slate-500">{stepLabel}</p>
          </div>

          <div className="h-2 overflow-hidden bg-slate-100" style={{ borderRadius: 999 }}>
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-rose-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {isLoadingResult ? (
              <motion.section
                key="analyzing"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="mt-6"
              >
                <div className="text-center">
                  <motion.div
                    className="mx-auto h-16 w-16 border-4 border-rose-300 border-t-rose-500"
                    style={{ borderRadius: 999 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
                  />
                  <h3 className="mt-5 text-3xl font-semibold text-slate-900">Analyzing your inputs...</h3>
                </div>

                <div className="mt-6 space-y-3">
                  {analysisSteps.map((item, index) => {
                    const done = completedAnalysisSteps > index;

                    return (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.28 }}
                        className={`flex items-center gap-3 px-3 py-2 text-sm ${done ? 'text-rose-600' : 'text-slate-400'}`}
                      >
                        <span className={`text-xl font-semibold ${done ? 'text-rose-500' : 'text-slate-300'}`}>
                          {done ? '✓' : '○'}
                        </span>
                        <span>{item}...</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            ) : !resultVisible ? (
              <motion.section
                key={`step-${currentStep}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="mt-6"
              >
                {currentStep === 0 ? (
                  <div className="space-y-4 text-center">
                    <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                      Welcome to success meter
                    </h1>
                    <p className="text-base text-slate-700 sm:text-lg">
                      check whether your child be successful in life or not
                    </p>
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Our developers have made this super innovative tech to check student's future.
                    </p>
                    <motion.button
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="mx-auto mt-2 inline-flex min-w-40 items-center justify-center bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      style={{ borderRadius: 12 }}
                    >
                      Continue
                    </motion.button>
                  </div>
                ) : null}

                {currentStep === 1 ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Will Your Child Be Successful In Life?</h2>
                    <p className="mt-2 text-sm text-slate-600">
                      Take this short Success Meter to reflect on what really shapes a child’s future.
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {basicFields.map((field) => (
                        <label
                          key={field.name}
                          className="flex flex-col gap-2 text-sm font-medium text-slate-700"
                        >
                          {field.label}
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                            style={{ borderRadius: 14 }}
                          />
                          {errors[field.name] ? <span className="text-xs text-red-600">{errors[field.name]}</span> : null}
                        </label>
                      ))}

                      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
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
                        {errors.classOfStudent ? (
                          <span className="text-xs text-red-600">{errors.classOfStudent}</span>
                        ) : null}
                      </label>
                    </div>

                    <div className="mt-5 flex items-center justify-end">
                      <motion.button
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleNext}
                        className="inline-flex min-w-28 items-center justify-center bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        style={{ borderRadius: 12 }}
                      >
                        Next
                      </motion.button>
                    </div>
                  </div>
                ) : null}

                {isQuizStep && currentQuestion ? (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{currentQuestion.label}</h3>
                    <div className="mt-5 grid gap-3 text-left">
                      {currentQuestion.options.map((option) => {
                        const selected = formData[currentQuestion.name] === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, [currentQuestion.name]: option }));
                              setErrors((prev) => ({ ...prev, [currentQuestion.name]: '' }));
                            }}
                            className={`w-full border px-4 py-3 text-sm transition ${
                              selected
                                ? 'border-amber-400 bg-amber-50 text-slate-900'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300'
                            }`}
                            style={{ borderRadius: 12 }}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {errors[currentQuestion.name] ? (
                      <p className="mt-3 text-xs text-red-600">{errors[currentQuestion.name]}</p>
                    ) : null}

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex min-w-24 items-center justify-center border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        style={{ borderRadius: 12 }}
                      >
                        Back
                      </button>

                      {isLastQuestion ? (
                        <motion.button
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="inline-flex min-w-44 items-center justify-center bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                          style={{ borderRadius: 12 }}
                        >
                          {isSubmitting ? 'Checking...' : 'Check Success Meter'}
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={handleNext}
                          className="inline-flex min-w-28 items-center justify-center bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                          style={{ borderRadius: 12 }}
                        >
                          Next
                        </motion.button>
                      )}
                    </div>
                  </div>
                ) : null}
              </motion.section>
            ) : (
              <motion.section
                key="result"
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="mt-6 border border-rose-100 bg-white p-5 shadow-[0_16px_40px_rgba(244,63,94,0.12)] sm:p-7"
                style={{ borderRadius: 18 }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-3xl font-semibold text-slate-900"
                >
                  Result: Error
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.35 }}
                  className="mt-3 text-base text-slate-700"
                >
                  We cannot predict your child’s future through marks, rank, or study hours alone.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.24, duration: 0.35 }}
                  className="mt-4 border border-amber-100 bg-gradient-to-r from-amber-50 to-rose-50 p-4"
                  style={{ borderRadius: 14 }}
                >
                  <p className="text-sm font-medium text-slate-700">
                    Because a child is not a report card — a child is a story still being written.
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.35 }}
                  className="mt-4 text-slate-600"
                >
                  Real success also depends on confidence, curiosity, creativity, communication, leadership, and
                  character.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.35 }}
                  className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"
                >
                  {[
                    'Confidence',
                    'Curiosity',
                    'Creativity',
                    'Communication',
                    'Leadership',
                    'Character'
                  ].map((trait) => (
                    <div
                      key={trait}
                      className="flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                      style={{ borderRadius: 12 }}
                    >
                      <span className="h-2 w-2 bg-rose-400" style={{ borderRadius: 999 }} />
                      <span>{trait}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.58, duration: 0.35 }}
                  className="mt-4 text-slate-600"
                >
                  These life qualities shape resilience, decision-making, and the ability to thrive beyond exams.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.35 }}
                  className="mt-5 font-medium text-slate-800"
                >
                  At The Elden Heights School, we believe children should be prepared for life, not just exams.
                </motion.p>
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.82, duration: 0.35 }}
                  href="/contact"
                  className="mt-6 inline-flex bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
                  style={{ borderRadius: 12 }}
                >
                  Talk to Our Team
                </motion.a>
              </motion.section>
            )}
          </AnimatePresence>

          {statusMessage.text ? (
            <p className={`mt-4 text-sm ${statusMessage.type === 'error' ? 'text-red-600' : 'text-emerald-700'}`}>
              {statusMessage.text}
            </p>
          ) : null}
        </motion.div>
      </main>
    </div>
  );
}
