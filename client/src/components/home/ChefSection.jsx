import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const chefs = [
  {
    name: 'Chef Rajan Kumar',
    role: 'Head Chef & Founder',
    specialty: 'Burgers & Grills',
    image: 'https://images.unsplash.com/photo-1583394293214-0b4c9f5cf16c?w=300&h=300&fit=crop&crop=face',
    quote: 'Every patty gets hand-smashed to order. That crust is non-negotiable.',
    rating: 4.9,
    dishes: 48,
  },
  {
    name: 'Chef Priya Menon',
    role: 'Pizzaiolo',
    specialty: 'Wood-fired Pizzas',
    image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&h=300&fit=crop&crop=face',
    quote: "Our dough ferments for 72 hours. That's where the magic lives.",
    rating: 4.8,
    dishes: 32,
  },
  {
    name: 'Chef Arjun Nair',
    role: 'Pastry Chef',
    specialty: 'Desserts & Drinks',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=300&h=300&fit=crop&crop=face',
    quote: 'A great dessert should make you forget everything else.',
    rating: 4.9,
    dishes: 27,
  },
];

export default function ChefSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="section-label">Meet The Team</span>
          <h2 className="section-title">Our <span className="text-saffron-400">Expert Chefs</span></h2>
          <p className="text-zinc-400 mt-3 max-w-md mx-auto">
            Decades of culinary experience, a shared obsession with quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefs.map((chef, i) => (
            <motion.div
              key={chef.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-display font-bold text-xl">{chef.name}</p>
                  <p className="text-saffron-400 text-sm font-medium">{chef.specialty}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-zinc-500 text-sm italic leading-relaxed mb-4">"{chef.quote}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-saffron-400 text-sm font-bold">⭐ {chef.rating}</span>
                    <span className="text-zinc-400 text-xs">rating</span>
                  </div>
                  <div className="text-zinc-400 text-xs">{chef.dishes} signature dishes</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
