import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { usePopularFoods } from '../../hooks/useApi';
import FoodCard from '../food/FoodCard';
import { FoodGridSkeleton } from '../ui/Skeletons';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function PopularSection() {
  const { data: foods = [], isLoading } = usePopularFoods();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-white dark:bg-ink" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="section-label">Trending Now</span>
            <h2 className="section-title flex items-center gap-3">
              Most Popular <TrendingUp className="text-saffron-400" size={36} />
            </h2>
          </div>
          <Link to="/menu?sort=popular" className="btn-ghost text-sm shrink-0">
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>

        {isLoading ? (
          <FoodGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food, i) => (
              <FoodCard key={food.id} food={food} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
