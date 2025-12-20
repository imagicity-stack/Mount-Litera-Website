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
        style={{ backgroundImage: "url('/gate.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-midnight/30 via-midnight/20 to-cardinal/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(255,255,255,0.18),transparent_38%),radial-gradient(circle_at_72%_18%,rgba(195,165,114,0.22),transparent_42%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-midnight/55 via-cardinal/45 to-transparent" aria-hidden="true" />
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
