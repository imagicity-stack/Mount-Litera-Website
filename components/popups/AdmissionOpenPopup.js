import { useEffect, useState } from 'react';
import Link from 'next/link';

import { trackFacebookEvent } from '@/lib/facebookPixel';

const AdmissionOpenPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      trackFacebookEvent('ViewContent', {
        component: 'admissions_open_popup',
      });
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-open-title"
      aria-describedby="admission-open-description"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white text-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cardinal/10 via-white to-white" aria-hidden="true" />
        <div className="relative p-8">
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="absolute right-3 top-3 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close admission announcement"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-cardinal/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cardinal">
            Admissions 2026–27
          </p>
          <h2 id="admission-open-title" className="mt-4 text-3xl font-semibold text-cardinal">
            Admissions Open
          </h2>
          <p id="admission-open-description" className="mt-4 text-base text-gray-700">
            Limited seats for 2026–27. Early enquiry gives your child priority processing and first preference in admissions. Safe campus, strong English, disciplined learning. Don’t miss your child’s chance.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li className="flex items-start justify-center gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
              <span>Priority enrollment interviews happening this week.</span>
            </li>
            <li className="flex items-start justify-center gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-cardinal" aria-hidden="true" />
              <span>Scholarship consideration for the first 25 confirmed admissions.</span>
            </li>
          </ul>
          <Link
            href="/admission"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-cardinal px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-cardinal/90 focus:outline-none focus:ring-2 focus:ring-cardinal/40 focus:ring-offset-2"
            onClick={() => {
              setIsVisible(false);
              trackFacebookEvent('ViewContent', {
                component: 'admissions_open_popup_cta',
              });
            }}
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdmissionOpenPopup;
