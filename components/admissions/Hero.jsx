import { trackFacebookEvent } from '@/lib/facebookPixel';

const trustBadges = [
  {
    title: 'CBSE Curriculum',
    description: 'Aligned with national academic standards'
  },
  {
    title: 'Safe Campus',
    description: 'Secure, nurturing environment for every child'
  },
  {
    title: '10+ Years of Academic Excellence',
    description: 'Proven results with consistent performance'
  }
];

export default function Hero({ onCtaClick }) {
  const handleClick = () => {
    trackFacebookEvent('ViewContent', {
      component: 'admissions_hero_reserve_cta',
    });

    if (typeof onCtaClick === 'function') {
      onCtaClick();
    }
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-cardinal/5 via-transparent to-cardinal/10" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="space-y-6 text-center md:text-left">
          <p className="inline-flex items-center justify-center md:justify-start px-4 py-1.5 rounded-full bg-cardinal/10 text-cardinal font-semibold text-xs tracking-[0.3em] uppercase">
            Admissions 2026–27
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-cardinal leading-tight">
            Admissions Open 2026–27
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
            Fastest way to secure your child’s seat. No pressure.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center md:justify-start pt-4">
            <button
              type="button"
              onClick={handleClick}
              className="px-6 py-3 rounded-xl bg-cardinal text-white font-medium shadow-lg transition hover:bg-white hover:text-cardinal hover:shadow-xl border border-cardinal"
            >
              Reserve Your Seat
            </button>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {trustBadges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardinal/10 text-cardinal font-semibold text-lg">
                <span className="sr-only">Badge icon</span>
                ★
              </div>
              <div>
                <p className="font-semibold text-cardinal text-lg">{badge.title}</p>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
