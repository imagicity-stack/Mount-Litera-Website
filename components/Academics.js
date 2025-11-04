import { motion } from 'framer-motion';

const stages = [
  {
    title: 'Foundational Stage',
    description: 'Nursery – II'
  },
  {
    title: 'Preparatory Stage',
    description: 'III – V'
  },
  {
    title: 'Middle Stage',
    description: 'VI – VIII'
  },
  {
    title: 'Secondary Stage',
    description: 'IX – X'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function Academics() {
  return (
    <section id="academics" className="py-20 bg-cardinal text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Academic Framework
        </motion.h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              className="rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm p-6 shadow-lg transition hover:border-white"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold">{stage.title}</h3>
              <p className="mt-3 text-sm text-white/80">{stage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
