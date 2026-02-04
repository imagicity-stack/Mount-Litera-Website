export default function ImageBanner({
  title,
  subtitle,
  image,
  heightClass = 'h-64 md:h-80'
}) {
  return (
    <section className={`relative ${heightClass} overflow-hidden bg-midnight text-white`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-midnight/55 backdrop-blur-sm" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-6 py-10 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold drop-shadow">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base md:text-lg text-white/85">{subtitle}</p>}
      </div>
    </section>
  );
}
