import { useMemo, useState } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Seo from '@/components/Seo';

const emptyStudent = () => ({
  name: '',
  className: '',
  house: '',
  studentEmail: '',
  transportAvailed: '',
  medicalHistory: '',
});

const parentFieldClasses =
  'mt-2 w-full rounded-xl border border-midnight/15 bg-white/85 px-4 py-3 text-sm text-midnight shadow-inner transition focus:border-cardinal focus:outline-none focus:ring-2 focus:ring-cardinal/20';

const labelClasses = 'text-sm font-semibold text-midnight/80';

export default function StudentDataPage() {
  const [parentData, setParentData] = useState({
    fatherName: '',
    motherName: '',
    mobileNumber: '',
    parentEmail: '',
    address: '',
  });
  const [numberOfStudents, setNumberOfStudents] = useState(1);
  const [students, setStudents] = useState([emptyStudent()]);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const requiredStudentFieldsComplete = useMemo(
    () => students.every((student) => student.name && student.className && student.transportAvailed && student.medicalHistory),
    [students]
  );

  const updateParentData = (field, value) => {
    setParentData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const syncStudentCount = (value) => {
    const parsedValue = Number.parseInt(value, 10);
    const nextCount = Number.isNaN(parsedValue) ? 1 : Math.min(Math.max(parsedValue, 1), 10);

    setNumberOfStudents(nextCount);
    setStudents((current) => {
      if (nextCount === current.length) {
        return current;
      }

      if (nextCount > current.length) {
        return [
          ...current,
          ...Array.from({ length: nextCount - current.length }, () => emptyStudent()),
        ];
      }

      return current.slice(0, nextCount);
    });
  };

  const updateStudent = (index, field, value) => {
    setStudents((current) => current.map((student, studentIndex) => (
      studentIndex === index
        ? {
          ...student,
          [field]: value,
        }
        : student
    )));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      submittedAt: new Date().toISOString(),
      parent: parentData,
      numberOfStudents,
      students,
    };

    setSubmissionStatus('submitting');
    setSubmissionMessage('Submitting student data...');

    try {
      const response = await fetch('/api/studentdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const responseText = await response.text();
      let result = {};

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        result = {
          error: response.ok
            ? 'The server returned an unexpected response.'
            : `The website server returned ${response.status}. Please check deployment logs.`,
        };
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Student data could not be saved.');
      }

      setSubmissionStatus('success');
      setSubmissionMessage('Thank you. Student data submitted successfully.');
    } catch (error) {
      console.error('Student data submission failed:', error);
      setSubmissionStatus('error');
      setSubmissionMessage('Unable to submit student data right now. Please try again later.');
    }
  };

  return (
    <>
      <Seo path="/studentdata" />
      <div className="flex min-h-screen flex-col text-midnight">
        <Navbar />
        <main className="flex-1">
          <section className="relative overflow-hidden px-5 py-16 md:px-10 lg:px-14 lg:py-20">
            <div className="absolute inset-0 -z-10 bg-gradient-parchment" />
            <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
            <div className="absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-cardinal/10 blur-3xl" />

            <div className="mx-auto max-w-6xl">
              <div className="mb-10 max-w-3xl">
                <span className="eyebrow">Private Collection Form</span>
                <h1 className="mt-5 font-garamond text-display-lg text-midnight">
                  Student Data Collection
                </h1>
              </div>

              <div className="mx-auto max-w-4xl">
                <form onSubmit={handleSubmit} className="surface-card rounded-3xl p-6 md:p-8">
                  <div className="border-b border-midnight/10 pb-6">
                    <h2 className="font-garamond text-3xl text-midnight">Parent / Guardian Details</h2>
                    <p className="mt-2 text-sm leading-6 text-midnight/65">
                      Fields marked with <span className="font-bold text-cardinal">*</span> are required.
                    </p>
                  </div>

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <label className={labelClasses}>
                      Father&apos;s name <span className="text-cardinal">*</span>
                      <input
                        required
                        type="text"
                        value={parentData.fatherName}
                        onChange={(event) => updateParentData('fatherName', event.target.value)}
                        className={parentFieldClasses}
                        placeholder="Enter father&apos;s full name"
                      />
                    </label>

                    <label className={labelClasses}>
                      Mother&apos;s name <span className="text-cardinal">*</span>
                      <input
                        required
                        type="text"
                        value={parentData.motherName}
                        onChange={(event) => updateParentData('motherName', event.target.value)}
                        className={parentFieldClasses}
                        placeholder="Enter mother&apos;s full name"
                      />
                    </label>

                    <label className={labelClasses}>
                      Mobile number (WhatsApp) <span className="text-cardinal">*</span>
                      <input
                        required
                        type="tel"
                        inputMode="tel"
                        value={parentData.mobileNumber}
                        onChange={(event) => updateParentData('mobileNumber', event.target.value)}
                        className={parentFieldClasses}
                        placeholder="Enter WhatsApp mobile number"
                      />
                    </label>

                    <label className={labelClasses}>
                      Email ID of parent (if any)
                      <input
                        type="email"
                        value={parentData.parentEmail}
                        onChange={(event) => updateParentData('parentEmail', event.target.value)}
                        className={parentFieldClasses}
                        placeholder="parent@example.com"
                      />
                    </label>

                    <label className={`${labelClasses} md:col-span-2`}>
                      Address <span className="text-cardinal">*</span>
                      <textarea
                        required
                        rows={4}
                        value={parentData.address}
                        onChange={(event) => updateParentData('address', event.target.value)}
                        className={parentFieldClasses}
                        placeholder="Enter complete residential address"
                      />
                    </label>
                    <label className={labelClasses}>
                      Number of students <span className="text-cardinal">*</span>
                      <input
                        required
                        min="1"
                        max="10"
                        type="number"
                        value={numberOfStudents}
                        onChange={(event) => syncStudentCount(event.target.value)}
                        className={parentFieldClasses}
                      />
                    </label>
                  </div>

                  <div className="mt-10 border-t border-midnight/10 pt-8">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                      <div>
                        <h2 className="font-garamond text-3xl text-midnight">Student Details</h2>
                        <p className="mt-2 text-sm leading-6 text-midnight/65">
                          {numberOfStudents} student {numberOfStudents === 1 ? 'entry is' : 'entries are'} ready to be filled.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-6">
                      {students.map((student, index) => (
                        <section
                          key={`student-${index + 1}`}
                          className="rounded-2xl border border-midnight/10 bg-white/70 p-5 shadow-elite-sm"
                        >
                          <div className="mb-5 flex items-center justify-between gap-3">
                            <h3 className="font-garamond text-2xl text-midnight">Student {index + 1}</h3>
                            <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">
                              Entry {index + 1}
                            </span>
                          </div>

                          <div className="grid gap-5 md:grid-cols-2">
                            <label className={labelClasses}>
                              Name <span className="text-cardinal">*</span>
                              <input
                                required
                                type="text"
                                value={student.name}
                                onChange={(event) => updateStudent(index, 'name', event.target.value)}
                                className={parentFieldClasses}
                                placeholder="Enter student&apos;s full name"
                              />
                            </label>

                            <label className={labelClasses}>
                              Class <span className="text-cardinal">*</span>
                              <input
                                required
                                type="text"
                                value={student.className}
                                onChange={(event) => updateStudent(index, 'className', event.target.value)}
                                className={parentFieldClasses}
                                placeholder="Example: Class 5"
                              />
                            </label>

                            <label className={labelClasses}>
                              House
                              <input
                                type="text"
                                value={student.house}
                                onChange={(event) => updateStudent(index, 'house', event.target.value)}
                                className={parentFieldClasses}
                                placeholder="Enter house, if assigned"
                              />
                            </label>

                            <label className={labelClasses}>
                              Student email ID (if any)
                              <input
                                type="email"
                                value={student.studentEmail}
                                onChange={(event) => updateStudent(index, 'studentEmail', event.target.value)}
                                className={parentFieldClasses}
                                placeholder="student@example.com"
                              />
                            </label>

                            <label className={labelClasses}>
                              School&apos;s Transport availed (Y/N) <span className="text-cardinal">*</span>
                              <select
                                required
                                value={student.transportAvailed}
                                onChange={(event) => updateStudent(index, 'transportAvailed', event.target.value)}
                                className={parentFieldClasses}
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </label>

                            <label className={`${labelClasses} md:col-span-2`}>
                              Any medical history <span className="text-cardinal">*</span>
                              <textarea
                                required
                                rows={3}
                                value={student.medicalHistory}
                                onChange={(event) => updateStudent(index, 'medicalHistory', event.target.value)}
                                className={parentFieldClasses}
                                placeholder="Write No if there is no medical history"
                              />
                            </label>
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-midnight p-5 text-parchment md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Ready to submit</p>
                      <p className="mt-2 text-sm text-parchment/75">
                        Please check the details before submitting the form.
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={!requiredStudentFieldsComplete || submissionStatus === 'submitting'}
                      className="rounded-full bg-gradient-cardinal px-6 py-3 text-sm font-bold uppercase tracking-[0.22em] text-white shadow-cardinal transition hover:-translate-y-0.5 hover:shadow-elite disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Data'}
                    </button>
                  </div>

                  {submissionMessage && (
                    <div className={`mt-8 rounded-2xl border p-5 ${submissionStatus === 'error' ? 'border-cardinal/30 bg-cardinal/10' : 'border-gold/30 bg-gold/10'}`}>
                      <h3 className="font-garamond text-2xl text-midnight">
                        {submissionStatus === 'error' ? 'Submission failed' : 'Submission status'}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-midnight/70">{submissionMessage}</p>
                    </div>
                  )}

                </form>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
