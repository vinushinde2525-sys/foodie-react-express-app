import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { selectWishlistItems, removeFromWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import FoodCard from '../components/food/FoodCard';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const dispatch = useDispatch();
  const items    = useSelector(selectWishlistItems);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-10">
          <span className="section-label">My Favourites</span>
          <h1 className="section-title flex items-center gap-3">
            Wishlist <Heart className="text-ember fill-ember" size={36} />
          </h1>
          <p className="text-zinc-400 mt-2">{items.length} saved items</p>
        </div>

        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 gap-5"
            >
              <div className="text-8xl animate-bounce">💔</div>
              <h2 className="font-display text-2xl font-bold text-ink dark:text-white">Nothing saved yet</h2>
              <p className="text-zinc-400 text-center max-w-xs">
                Tap the heart icon on any dish to save it here for later.
              </p>
              <Link to="/menu" className="btn-primary mt-2">Browse Menu</Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((food, i) => (
                <FoodCard key={food.id} food={food} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
