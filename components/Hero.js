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
        className="absolute inset-0 bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: "url('/gate.jpg')",
          backgroundSize: '110%'
        }}
        aria-hidden="true"
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
            Towards Eternal Glory
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
