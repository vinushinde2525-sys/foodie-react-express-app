import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Clock } from 'lucide-react';
import { addToCart, selectIsInCart } from '../../store/cartSlice';
import { toggleWishlist, selectIsWishlisted } from '../../store/wishlistSlice';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function FoodCard({ food, index = 0 }) {
  const dispatch    = useDispatch();
  const inCart      = useSelector(selectIsInCart(food.id));
  const isWished    = useSelector(selectIsWishlisted(food.id));

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(food));
    toast.success(`${food.name} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(food));
    toast(isWished ? 'Removed from favourites' : '❤️ Added to favourites');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/food/${food.id}`} className="group block">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-300">

          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-800">
            <img
              src={food.image}
              alt={food.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {food.discount > 0 && (
                <span className="badge-red text-[11px]">-{food.discount}%</span>
              )}
              {food.tags?.includes('bestseller') && (
                <span className="badge-orange text-[11px]">Bestseller</span>
              )}
              {food.isVeg && (
                <span className="badge badge-green text-[11px]">Veg</span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                ${isWished ? 'bg-ember text-white scale-110' : 'bg-white/90 dark:bg-zinc-800/90 text-zinc-400 hover:text-ember hover:scale-110'}`}
            >
              <Heart size={15} fill={isWished ? 'currentColor' : 'none'} />
            </button>

            {/* Quick Add overlay */}
            <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={handleAddToCart}
                className={`px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200
                  ${inCart ? 'bg-emerald-500 text-white' : 'bg-saffron-400 text-white hover:bg-saffron-500'}`}
              >
                <ShoppingCart size={15} />
                {inCart ? 'In Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-saffron-500 uppercase tracking-wider">
                {food.category}
              </span>
              <div className="flex items-center gap-1 text-zinc-400">
                <Clock size={11} />
                <span className="text-xs">{food.prepTime}m</span>
              </div>
            </div>

            <h3 className="font-display font-bold text-ink dark:text-white text-base leading-snug mb-2 group-hover:text-saffron-500 transition-colors line-clamp-2">
              {food.name}
            </h3>

            <div className="flex items-center gap-1 mb-3">
              <Star size={13} className="text-saffron-400 fill-saffron-400" />
              <span className="text-xs font-semibold text-ink dark:text-white">{food.rating}</span>
              <span className="text-xs text-zinc-400">({food.reviewCount.toLocaleString()})</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-saffron-500 text-lg">
                  {formatCurrency(food.price)}
                </span>
                {food.originalPrice > food.price && (
                  <span className="text-zinc-400 line-through text-sm">
                    {formatCurrency(food.originalPrice)}
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                  ${inCart ? 'bg-emerald-500 text-white' : 'bg-saffron-400 text-white hover:bg-saffron-500 hover:scale-105 active:scale-95'}`}
              >
                <ShoppingCart size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
