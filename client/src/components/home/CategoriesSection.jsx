import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCategories } from '../../hooks/useApi';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Map category names to emoji on the frontend — avoids encoding issues in JSON/server
const CATEGORY_ICONS = {
  burger:   '🍔',
  pizza:    '🍕',
  chicken:  '🍗',
  sides:    '🍟',
  drinks:   '🥤',
  sandwich: '🥪',
  indian:   '🍛',
  desserts: '🍰',
};

export default function CategoriesSection() {
  const { data: categories = [], isLoading } = useCategories();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-16 bg-white dark:bg-ink" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="section-label">Explore</span>
          <h2 className="section-title">
            Browse By <span className="text-saffron-400">Category</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-200 dark:bg-zinc-700" />
                  <div className="h-3 w-14 bg-zinc-200 dark:bg-zinc-700 rounded" />
                </div>
              ))
            : categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link
                    to={'/menu?category=' + cat.id}
                    className="group flex flex-col items-center gap-2 p-3"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-3xl group-hover:bg-saffron-400/10 group-hover:scale-110 transition-all duration-300 border border-zinc-100 dark:border-zinc-700 group-hover:border-saffron-400/30">
                      {CATEGORY_ICONS[cat.id] || '🍽️'}
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-ink dark:text-white group-hover:text-saffron-500 transition-colors">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-zinc-400">{cat.count} items</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
