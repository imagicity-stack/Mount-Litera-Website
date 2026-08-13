import SiteImage from '@/components/media/SiteImage';
import Parallax from '@/components/motion/Parallax';

/**
 * The header of an interior page: a photograph with the page title set over it.
 *
 * Pass `slot` for pages whose banner the school can change from the admin
 * portal; `image` remains for pages still served straight from /public.
 */
export default function ImageBanner({
  title,
  subtitle,
  image,
  slot,
  eyebrow,
  heightClass = 'min-h-[46vh] md:min-h-[58vh]'
}) {
  return (
    <section className={`relative isolate overflow-hidden bg-obsidian text-white ${heightClass}`}>
      <Parallax className="absolute inset-0" distance={45} overscan={12}>
        {slot ? (
          <SiteImage slot={slot} fill priority />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
            aria-hidden="true"
          />
        )}
      </Parallax>

      <div
        className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/45"
        aria-hidden="true"
      />

      <div
        className={`shell relative flex flex-col justify-end pb-14 pt-24 md:pb-16 md:pt-32 ${heightClass}`}
      >
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/75">
          {eyebrow || 'The Elden Heights School'}
        </p>

        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.06] tracking-[-0.015em] text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
