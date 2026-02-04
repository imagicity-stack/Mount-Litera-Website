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
          backgroundImage: "url('/home/hero-eclipse.jpg')"
        }}
        aria-hidden="true"
      />
      <img
        src="/home/hero-eclipse.jpg"
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white drop-shadow-xl">
            Best School in Hazaribagh for Academic Excellence and Future Ready Learning
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Elden Heights School is the best school in hazaribagh for families comparing schools in hazaribagh jharkhand, focused on academic excellence and holistic growth through modern, future ready learning.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
