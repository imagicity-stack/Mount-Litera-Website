import { useEffect, useState } from 'react';
import Link from 'next/link';

const AdmissionOpenPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-open-title"
      aria-describedby="admission-open-description"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-3 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close admission announcement"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h2 id="admission-open-title" className="text-2xl font-semibold text-gray-900">
          Admissions Open
        </h2>
        <p id="admission-open-description" className="mt-3 text-base text-gray-600">
          Secure your child&apos;s seat today.
        </p>
        <Link
          href="/admissions"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setIsVisible(false)}
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
};

export default AdmissionOpenPopup;
