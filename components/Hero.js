import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-midnight text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/elden-heights-hero.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-midnight/80 via-midnight/60 to-cardinal/60" aria-hidden="true" />
      <div className="absolute inset-0 mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,rgba(195,165,114,0.25),transparent_35%),radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.15),transparent_35%)]" aria-hidden="true" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white drop-shadow-xl">
            Towards Eternal Glory
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
