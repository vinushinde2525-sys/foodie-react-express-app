import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const reviews = [
  {
    name: 'Rohan Mehta',
    role: 'CEO, TechCraft',
    avatar: 'https://i.pravatar.cc/80?img=11',
    text: 'Honestly the best burger in this city. The smash patty technique gives it an incredible crust and the comeback sauce is completely addictive.',
    rating: 5,
    dish: 'Classic Smash Burger',
  },
  {
    name: 'Priya Sharma',
    role: 'Food Blogger',
    avatar: 'https://i.pravatar.cc/80?img=47',
    text: 'The Paneer Tikka Masala reminded me of my grandmother\'s kitchen. That tandoor char on the paneer is absolutely next-level.',
    rating: 5,
    dish: 'Paneer Tikka Masala',
  },
  {
    name: 'Arjun Patel',
    role: 'Restaurant Critic',
    avatar: 'https://i.pravatar.cc/80?img=33',
    text: 'Delivery was on time, food was piping hot, and the chocolate lava cake made my evening. This is my go-to for date nights.',
    rating: 5,
    dish: 'Chocolate Lava Cake',
  },
  {
    name: 'Sneha Rao',
    role: 'Architect',
    avatar: 'https://i.pravatar.cc/80?img=23',
    text: 'Truffle fries and a cold brew float — that combo should be illegal. Ordered three times this week. No regrets.',
    rating: 5,
    dish: 'Truffle Fries',
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our <span className="text-saffron-400">Customers Say</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-saffron-400 text-4xl font-display opacity-30 leading-none mb-4">"</div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed italic mb-5">{r.text}</p>
              <div className="text-saffron-400 text-sm font-semibold mb-4">
                {'★'.repeat(r.rating)} — {r.dish}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-ink dark:text-white text-sm">{r.name}</p>
                  <p className="text-zinc-400 text-xs">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
