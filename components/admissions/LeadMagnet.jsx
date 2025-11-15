import { useCallback } from 'react';

export default function LeadMagnet() {
  const handleCtaClick = useCallback(() => {
    const target = document.getElementById('mini-lead-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section className="bg-[#FDF3E7] py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        <div className="space-y-6 text-center lg:text-left">
          <p className="uppercase tracking-widest text-sm text-cardinal font-semibold">Mount Litera Admissions 2025–26</p>
          <h1 className="text-3xl md:text-4xl font-bold text-cardinal">
            Free School Readiness Checklist + Campus Tour
          </h1>
          <p className="text-lg text-gray-700">
            No entrance test. No pressure. Just a 10-minute checklist to help parents understand if their child is school-ready.
          </p>
          <button
            type="button"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center rounded-full bg-cardinal text-white px-8 py-3 font-semibold shadow-md hover:bg-cardinal/90 transition"
          >
            Download Checklist + Book Free Tour
          </button>
        </div>
        <div className="relative w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-cardinal/10">
            <div className="w-full h-64 flex items-center justify-center">
              <svg
                viewBox="0 0 320 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <rect x="12" y="28" width="296" height="220" rx="32" fill="#FFE5CC" />
                <circle cx="108" cy="132" r="56" fill="#FFD580" />
                <circle cx="212" cy="132" r="56" fill="#FFB347" />
                <path
                  d="M84 204c14-14 34-22 52-22s38 8 52 22"
                  stroke="#F97316"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M152 128c12 0 22-10 22-22s-10-22-22-22-22 10-22 22 10 22 22 22Z"
                  fill="#FFFAF0"
                />
                <path
                  d="M228 128c12 0 22-10 22-22s-10-22-22-22-22 10-22 22 10 22 22 22Z"
                  fill="#FFFAF0"
                />
                <circle cx="146" cy="110" r="8" fill="#1F2937" />
                <circle cx="222" cy="110" r="8" fill="#1F2937" />
                <path d="M146 146c10 8 20 8 30 0" stroke="#1F2937" strokeWidth="6" strokeLinecap="round" />
                <path
                  d="M76 60c12-16 34-26 56-26s44 10 56 26"
                  stroke="#F97316"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M188 60c12-16 34-26 56-26s44 10 56 26"
                  stroke="#EF4444"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <rect x="48" y="212" width="224" height="20" rx="10" fill="#F97316" opacity="0.2" />
              </svg>
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center">
              A playful peek into the joyful learning environment at Mount Litera.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
