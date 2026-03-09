import { useEffect, useMemo, useState } from 'react';
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
    label: 'आपके बच्चे का पिछली परीक्षा में प्रतिशत कितना था?',
    options: ['50% से कम', '50% - 65%', '66% - 80%', '81% - 90%', '90% से ऊपर']
  },
  {
    name: 'studyHours',
    label: 'आपका बच्चा रोज कितने घंटे पढ़ता है?',
    options: ['1 घंटे से कम', '1 - 2 घंटे', '2 - 4 घंटे', '4+ घंटे']
  },
  {
    name: 'tuitionRegularity',
    label: 'क्या आपका बच्चा नियमित ट्यूशन जाता है?',
    options: ['हाँ, नियमित', 'कभी-कभी', 'नहीं जाता']
  },
  {
    name: 'classRank',
    label: 'क्या आपका बच्चा कक्षा के टॉप छात्रों में आता है?',
    options: ['अक्सर टॉप 3 में', 'अक्सर टॉप 10 में', 'कभी-कभी', 'ज्यादातर नहीं']
  },
  {
    name: 'priority',
    label: 'इस समय आपके लिए सबसे ज़्यादा क्या मायने रखता है?',
    options: ['अंक', 'आत्मविश्वास', 'अनुशासन', 'संचार', 'कुल विकास']
  }
];

const basicFields = [
  { name: 'parentName', label: 'आपका नाम (माता/पिता) *', type: 'text', required: true },
  { name: 'studentName', label: 'बच्चे का नाम *', type: 'text', required: true },
  { name: 'phoneNumber', label: 'फोन नंबर *', type: 'tel', required: true }
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
  'आपके जवाब देखे जा रहे हैं',
  'पढ़ाई और दिनचर्या का पैटर्न देखा जा रहा है',
  'विकास सोच के संकेत देखे जा रहे हैं',
  'आत्मविश्वास और संचार के संकेत देखे जा रहे हैं',
  'लंबी अवधि की जीवन तैयारी समझी जा रही है'
];

const realityFacts = [
  <>
    भारत में हर साल <strong>13,000</strong> से ज़्यादा छात्र आत्महत्या करते हैं। वे कमजोर नहीं थे, वे बस उम्मीदों के दबाव में टूट गए।
  </>,
  <>
    भारत में <strong>70%</strong> से अधिक छात्र पढ़ाई का दबाव महसूस करते हैं। फिर भी घर की बात अक्सर यहीं से शुरू होती है: "कितने नंबर आए?"
  </>,
  <>
    करियर में सफलता का <strong>85%</strong> हिस्सा संचार, समस्या सुलझाने और व्यवहार कौशल पर निर्भर करता है।
    इसमें अंक सिर्फ छोटा हिस्सा निभाते हैं।
  </>,
  <>
    आज के <strong>60%</strong> से ज़्यादा बच्चे भविष्य में ऐसे काम करेंगे जो अभी मौजूद ही नहीं हैं। फिर भी उन्हें रटने की आदत सिखाई जा रही है।
  </>,
  <>
    भारत की शिक्षा व्यवस्था परीक्षा-केंद्रित है। फिर भी कंपनियाँ कहती हैं कि बच्चों में वास्तविक जीवन के कौशल की कमी है।
  </>,
  <>
    बच्चे रिपोर्ट कार्ड नहीं होते, लेकिन हम अक्सर उन्हें वैसे ही मान लेते हैं।
  </>,
  <>
    जो बच्चा आज सवाल पूछता है, वही कल नेता बन सकता है — अगर उसकी जिज्ञासा दबाव में न दबे।
  </>
];

export default function SuccessMeterPageHindi() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [completedAnalysisSteps, setCompletedAnalysisSteps] = useState(0);
  const [resultVisible, setResultVisible] = useState(false);
  const [showFactsScreen, setShowFactsScreen] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [shareStatus, setShareStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!showFactsScreen) {
      return undefined;
    }

    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % realityFacts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showFactsScreen]);

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/successmeterh` : '/successmeterh';
    const shareData = {
      title: 'सक्सेस मीटर | The Elden Heights School',
      text: 'मुझे यह 60 सेकंड का पैरेंट टेस्ट मिला।\n\nयह आपके बच्चे के मार्क्स, रैंक और पढ़ाई की आदतों के आधार पर उसके भविष्य की सफलता को समझने की कोशिश करता है।\n\nइसका रिज़ल्ट सच में सोचने पर मजबूर कर देता है।\n\nअपने बच्चे के लिए एक बार जरूर ट्राय करें:',
      url: shareUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus('शेयर करने के लिए धन्यवाद।');
        return;
      }

      await navigator.clipboard.writeText(`${shareData.text}\n\n${shareUrl}`);
      setShareStatus('लिंक और संदेश कॉपी हो गया। इसे दूसरे माता-पिता के साथ साझा करें।');
    } catch (error) {
      console.error('Share action failed:', error);
      setShareStatus('अभी शेयर नहीं हो पा रहा है। कृपया दोबारा कोशिश करें।');
    }
  };


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
      return 'स्टेप 2 में से 2';
    }

    if (isLoadingResult) {
      return 'विश्लेषण जारी';
    }

    if (currentStep === 0) {
      return 'स्वागत';
    }

    if (currentStep === 1) {
      return 'स्टेप 1 में से 2';
    }

    return `प्रश्न ${currentStep - 1} / ${quizFields.length}`;
  }, [currentStep, isLoadingResult, resultVisible]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateBasicDetails = () => {
    const nextErrors = {};

    if (!formData.parentName.trim()) {
      nextErrors.parentName = 'यह फ़ील्ड जरूरी है।';
    }

    if (!formData.studentName.trim()) {
      nextErrors.studentName = 'यह फ़ील्ड जरूरी है।';
    }

    if (!formData.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'यह फ़ील्ड जरूरी है।';
    } else if (!isValidPhone(formData.phoneNumber)) {
      nextErrors.phoneNumber = 'कृपया सही फोन नंबर दर्ज करें।';
    }

    if (!formData.classOfStudent.trim()) {
      nextErrors.classOfStudent = 'कृपया बच्चे की कक्षा चुनें।';
    }

    if (formData.emailAddress && !isValidEmail(formData.emailAddress)) {
      nextErrors.emailAddress = 'कृपया सही ईमेल दर्ज करें।';
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
      setErrors((prev) => ({ ...prev, [question.name]: 'आगे बढ़ने के लिए एक विकल्प चुनें।' }));
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
        setStatusMessage({ type: 'error', text: 'कृपया सभी जरूरी जानकारी सही भरें।' });
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
      setErrors((prev) => ({ ...prev, [currentQuestion.name]: 'आगे बढ़ने के लिए एक विकल्प चुनें।' }));
      return;
    }

    setStatusMessage({ type: '', text: '' });
    setIsSubmitting(true);
    setIsLoadingResult(true);
    setCompletedAnalysisSteps(0);

    const analysisInterval = setInterval(() => {
      setCompletedAnalysisSteps((prev) => (prev < analysisSteps.length ? prev + 1 : prev));
    }, 900);

    try {
      const response = await fetch('/api/successmeter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, pageSource: 'successmeterh' })
      });

      await new Promise((resolve) => setTimeout(resolve, 2300));

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setResultVisible(true);
      setStatusMessage({
        type: 'success',
        text: 'आपकी जानकारी मिल गई। Success Meter भरने के लिए धन्यवाद।'
      });
    } catch (error) {
      console.error('Success meter submission failed:', error);
      setStatusMessage({
        type: 'error',
        text: 'सबमिट करते समय समस्या हुई। कृपया थोड़ी देर में दोबारा कोशिश करें।'
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

  if (showFactsScreen) {
    return (
      <div className="min-h-screen bg-[#c7322f] px-4 py-8 text-white sm:px-6">
        <main className="mx-auto w-full max-w-2xl">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative overflow-hidden border border-white/15 bg-[#cf3835] px-5 py-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:px-8"
            style={{ borderRadius: 24 }}
          >
            <div className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 bg-white/5" style={{ borderRadius: 999 }} />
            <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 bg-white/5" style={{ borderRadius: 999 }} />

            <h2 className="relative text-4xl font-semibold leading-tight text-white sm:text-5xl">
              बच्चे का भविष्य सिर्फ रिपोर्ट कार्ड से तय नहीं होता।
            </h2>
            <p className="relative mt-5 text-lg text-rose-100">सिर्फ नंबर नहीं।</p>
            <p className="relative mt-1 text-lg text-rose-100">सिर्फ तुलना नहीं।</p>
            <p className="relative mt-1 text-lg text-rose-100">सिर्फ दबाव नहीं।</p>
            <p className="relative mt-2 text-xl font-semibold text-white">सबसे जरूरी बच्चा है।</p>

            <div
              className="relative mt-7 border border-white/15 bg-white/10 p-5 text-center backdrop-blur-[1px] sm:p-6"
              style={{ borderRadius: 20 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-rose-100">
                लेकिन आज की शिक्षा की सच्चाई यह है
              </p>

              <div className="mt-4 min-h-[170px] sm:min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={factIndex}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.42 }}
                    className="text-lg leading-relaxed text-white sm:text-xl"
                  >
                    {realityFacts[factIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2">
                {realityFacts.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2.5 transition-all ${factIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/40'}`}
                    style={{ borderRadius: 999 }}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="relative mt-8 inline-flex w-full items-center justify-center bg-white px-6 py-4 text-lg font-semibold text-[#c7322f] transition hover:bg-rose-50 sm:w-auto sm:min-w-72"
              style={{ borderRadius: 999 }}
            >
              इसे शेयर करें →
            </button>

            {shareStatus ? <p className="relative mt-3 text-sm text-rose-100">{shareStatus}</p> : null}
          </motion.section>
        </main>
      </div>
    );
  }

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
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">सक्सेस मीटर</p>
            <p className="text-xs font-medium text-slate-500">{stepLabel}</p>
          </div>

          <div className="h-2 overflow-hidden bg-slate-100" style={{ borderRadius: 999 }}>
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-rose-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45 }}
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
                  <h3 className="mt-5 text-3xl font-semibold text-slate-900">आपके जवाबों का विश्लेषण हो रहा है...</h3>
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
                      सक्सेस मीटर में आपका स्वागत है
                    </h1>
                    <p className="text-base text-slate-700 sm:text-lg">
                      जाँचें कि आपका बच्चा जीवन में सफल होगा या नहीं
                    </p>
                    <p className="text-xs text-slate-500 sm:text-sm">
                      हमारी टीम ने बच्चे के भविष्य को जाँचने के लिए यह नया टूल बनाया है।
                    </p>
                    <motion.button
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="mx-auto mt-2 inline-flex min-w-40 items-center justify-center bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      style={{ borderRadius: 12 }}
                    >
                      आगे बढ़ें
                    </motion.button>
                  </div>
                ) : null}

                {currentStep === 1 ? (
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">क्या आपका बच्चा जीवन में सफल होगा?</h2>
                    <p className="mt-2 text-sm text-slate-600">
                      यह छोटा सक्सेस मीटर आपको सोचने में मदद करेगा कि बच्चे का भविष्य वास्तव में किन बातों से बनता है।
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
                        बच्चे की कक्षा *
                        <select
                          name="classOfStudent"
                          value={formData.classOfStudent}
                          onChange={handleChange}
                          className="border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                          style={{ borderRadius: 14 }}
                        >
                          {classOptions.map((option) => (
                            <option value={option} key={option || 'placeholder'}>
                              {option || 'कक्षा चुनें'}
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
                        अगला
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
                        वापस
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
                          {isSubmitting ? 'जांच हो रही है...' : 'सक्सेस मीटर चेक करें'}
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
                          अगला
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
                  परिणाम: सोचिए
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.45 }}
                  className="mt-3 text-base text-slate-700"
                >
                  हम सिर्फ अंक, रैंक या पढ़ाई के घंटों से बच्चे का भविष्य तय नहीं कर सकते।
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.6, duration: 0.45 }}
                  className="mt-4 border border-amber-100 bg-gradient-to-r from-amber-50 to-rose-50 p-4"
                  style={{ borderRadius: 14 }}
                >
                  <p className="text-sm font-medium text-slate-700">
                    क्योंकि बच्चा रिपोर्ट कार्ड नहीं है — वह एक कहानी है जो अभी लिखी जा रही है।
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.9, duration: 0.45 }}
                  className="mt-4 text-slate-600"
                >
                  असल सफलता आत्मविश्वास, जिज्ञासा, रचनात्मकता, संचार, नेतृत्व और चरित्र पर भी निर्भर करती है।
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 5.2, duration: 0.45 }}
                  className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2"
                >
                  {[
                    'आत्मविश्वास',
                    'जिज्ञासा',
                    'रचनात्मकता',
                    'संचार',
                    'नेतृत्व',
                    'चरित्र'
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
                  transition={{ delay: 6.5, duration: 0.45 }}
                  className="mt-4 text-slate-600"
                >
                  यही गुण बच्चे को मजबूत बनाते हैं और परीक्षा से आगे जीवन में आगे बढ़ना सिखाते हैं।
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 7.8, duration: 0.45 }}
                  className="mt-5 font-medium text-slate-800"
                >
                  The Elden Heights School में हम मानते हैं कि बच्चों को सिर्फ परीक्षा नहीं, जीवन के लिए तैयार करना चाहिए।
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 9.1, duration: 0.45 }}
                  type="button"
                  onClick={() => {
                    setFactIndex(0);
                    setShareStatus('');
                    setShowFactsScreen(true);
                  }}
                  className="mt-6 inline-flex bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
                  style={{ borderRadius: 12 }}
                >
                  आगे बढ़ें
                </motion.button>
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
