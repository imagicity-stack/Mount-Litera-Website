import SiteImage from '@/components/media/SiteImage';
import Parallax from '@/components/motion/Parallax';
import Reveal from '@/components/motion/Reveal';

/**
 * A full-bleed pause between sections: the whole school in one frame, drifting
 * slowly behind a single sentence. Placed where a reader has finished weighing
 * facts and is deciding how they feel.
 */
export default function BelongingBand() {
  return (
    <section className="relative isolate bg-obsidian text-white">
      <Parallax className="absolute inset-0" distance={60}>
        <SiteImage slot="home.trust.campus" fill />
      </Parallax>

      <div className="absolute inset-0 bg-obsidian/70" aria-hidden="true" />

      <div className="shell relative flex min-h-[62vh] flex-col justify-center py-24 md:min-h-[70vh] md:py-32">
        <Reveal className="max-w-4xl">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/65">
            Why families stay
          </p>
          <blockquote className="mt-7 font-display text-[clamp(1.85rem,4.2vw,3.4rem)] font-medium leading-[1.14] text-white">
            &ldquo;A child who feels they belong somewhere will try things they would never
            otherwise attempt. That is the whole point of a school.&rdquo;
          </blockquote>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-white/70">
            The Elden Heights ethos
          </p>
        </Reveal>
      </div>
    </section>
  );
}
