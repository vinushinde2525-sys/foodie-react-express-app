import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const stats = [
  { value: '15K+', label: 'Happy Customers', emoji: '😊' },
  { value: '250+', label: 'Menu Items',       emoji: '🍽️' },
  { value: '4.9★', label: 'Average Rating',   emoji: '⭐' },
  { value: '30m',  label: 'Delivery Time',    emoji: '🛵' },
  { value: '12+',  label: 'Years Experience', emoji: '🏆' },
  { value: '99%',  label: 'Satisfaction',     emoji: '❤️' },
];

export default function StatsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-ink relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-label">By The Numbers</span>
          <h2 className="section-title text-white">Why <span className="text-saffron-400">Thousands</span> Trust Us</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map(({ value, label, emoji }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-saffron-400/40 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{emoji}</div>
              <div className="font-display text-3xl font-black text-saffron-400 mb-1">{value}</div>
              <div className="text-zinc-400 text-xs font-medium">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
