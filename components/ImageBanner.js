export default function ImageBanner({
  title,
  subtitle,
  image,
  eyebrow,
  heightClass = 'h-[60vh] min-h-[360px] md:h-[72vh] md:min-h-[460px]'
}) {
  return (
    <section className={`relative -mt-[96px] md:-mt-[108px] lg:-mt-[120px] ${heightClass} overflow-hidden bg-midnight text-parchment`}>
      <div
        className="absolute inset-0 animate-slow-pan bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/75 via-midnight/55 to-midnight" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,10,12,0.55)_85%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-6 pt-[120px] pb-12 text-center md:pt-[140px]">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-10 bg-gold/70" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-gold-200">
            {eyebrow || 'The Elden Heights School'}
          </span>
          <span className="h-px w-10 bg-gold/70" />
        </div>

        <h1 className="font-garamond text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-parchment drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]">
          {title}
        </h1>

        {subtitle && (
          <>
            <span className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-parchment/85 md:text-lg">
              {subtitle}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
