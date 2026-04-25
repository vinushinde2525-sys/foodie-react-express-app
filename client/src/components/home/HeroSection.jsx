import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Truck } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-ink via-zinc-900 to-zinc-800">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #FF9D2D 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Orange glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-saffron-400/10 blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 w-[300px] h-[300px] rounded-full bg-ember/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* ── Left Content ─────────────────────────────────────────────── */}
        <div>
          <motion.p {...fadeUp(0.1)} className="font-script text-saffron-400 text-2xl mb-3">
            Eat Sleep And
          </motion.p>

          <motion.h1 {...fadeUp(0.2)} className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Super{' '}
            <em className="text-saffron-400 not-italic">Delicious</em>
            <br />
            Food in Town!
          </motion.h1>

          <motion.p {...fadeUp(0.3)} className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
            From sizzling burgers to wood-fired pizzas — every dish crafted with love and delivered to your door in 30 minutes or less.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4 mb-12">
            <Link to="/menu" className="btn-primary text-base px-8 py-4 shadow-lg shadow-saffron-400/30">
              Order Now <ArrowRight size={18} />
            </Link>
            <Link to="/menu" className="btn-outline border-white/30 text-white hover:bg-white hover:text-ink text-base px-8 py-4">
              Browse Menu
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-8">
            {[
              { icon: Star,  value: '4.9★', label: 'Average Rating' },
              { icon: Clock, value: '30min', label: 'Delivery Time' },
              { icon: Truck, value: 'Free',  label: 'On ₹499+' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-saffron-400/15 flex items-center justify-center">
                  <Icon size={18} className="text-saffron-400" />
                </div>
                <div>
                  <p className="font-display font-black text-white text-lg leading-none">{value}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right — Hero Image ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center relative"
        >
          {/* Spinning ring */}
          <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-saffron-400/25 animate-spin-slow" />
          <div className="absolute w-[380px] h-[380px] rounded-full border border-saffron-400/10" />

          {/* Glow circle */}
          <div className="w-[360px] h-[360px] rounded-full bg-gradient-to-br from-saffron-400/20 to-transparent flex items-center justify-center">
            <motion.img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop"
              alt="Delicious Burger"
              className="w-72 h-72 rounded-full object-cover shadow-2xl shadow-saffron-400/20"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Floating badge — 50% off */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-6 right-4 w-24 h-24 rounded-full bg-saffron-400 flex flex-col items-center justify-center text-white shadow-xl shadow-saffron-400/40"
          >
            <span className="font-display font-black text-2xl leading-none">50%</span>
            <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 text-center leading-tight">Off<br />Today</span>
          </motion.div>

          {/* Floating card — delivery time */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-16 -left-4 card-glass px-4 py-3 flex items-center gap-3"
          >
            <div className="text-2xl">🛵</div>
            <div>
              <p className="text-xs text-zinc-400">Estimated Delivery</p>
              <p className="font-bold text-ink dark:text-white text-sm">30 – 45 min</p>
            </div>
          </motion.div>

          {/* Floating card — rating */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute top-1/3 -right-8 card-glass px-4 py-3 flex items-center gap-3"
          >
            <div className="text-2xl">⭐</div>
            <div>
              <p className="text-xs text-zinc-400">Customer Rating</p>
              <p className="font-bold text-ink dark:text-white text-sm">4.9 / 5.0</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave shape */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 30C1200 60 900 0 720 0C540 0 240 60 0 30L0 60Z" className="fill-white dark:fill-ink" />
        </svg>
      </div>
    </section>
  );
}
