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
      className="relative min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-130px)] lg:min-h-[calc(100vh-150px)] pt-[120px] md:pt-[130px] lg:pt-[150px] flex items-center justify-center overflow-hidden bg-midnight text-white"
    >
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover md:bg-fixed"
        style={{
          backgroundImage: "url('/main gate new.jpeg')"
        }}
        aria-hidden="true"
      />
      <img
        src="/main gate new.jpeg"
        alt="Elden Heights School campus in Hazaribagh Jharkhand"
        className="sr-only"
      />
      <div
        className="absolute inset-0 bg-[#0d1a2f]/45"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-xl">
            The Best School in Hazaribagh
          </h1>
          <p className="text-base md:text-lg text-white/90">
            Where academic excellence meets future ready learning
          </p>
        </motion.div>
      </div>
    </section>
  );
}
