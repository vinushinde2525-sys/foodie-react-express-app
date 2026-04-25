import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Clock, Flame, ArrowLeft, CheckCircle } from 'lucide-react';
import { useFood, useReviews } from '../hooks/useApi';
import { addToCart, selectIsInCart } from '../store/cartSlice';
import { toggleWishlist, selectIsWishlisted } from '../store/wishlistSlice';
import { addRecentlyViewed } from '../store/uiSlice';
import { formatCurrency, formatDate } from '../utils/helpers';
import { FoodCardSkeleton } from '../components/ui/Skeletons';
import toast from 'react-hot-toast';

export default function FoodDetail() {
  const { id }   = useParams();
  const dispatch = useDispatch();
  const inCart   = useSelector(selectIsInCart(Number(id)));
  const isWished = useSelector(selectIsWishlisted(Number(id)));

  const { data: food, isLoading, isError } = useFood(id);
  const { data: reviews = [] }             = useReviews(id);

  useEffect(() => {
    if (food) dispatch(addRecentlyViewed(food.id));
  }, [food]);

  const handleAdd = () => {
    dispatch(addToCart(food));
    toast.success(`${food.name} added to cart!`);
  };

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square skeleton rounded-3xl" />
        <div className="space-y-4">
          {[80, 60, 40, 40, 100, 60].map((w, i) => (
            <div key={i} className={`h-6 skeleton rounded`} style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );

  if (isError || !food) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl mb-4">🍽️</p>
        <p className="text-zinc-400 mb-4">Food item not found</p>
        <Link to="/menu" className="btn-primary">Back to Menu</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-ink pt-20 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="py-6">
          <Link to="/menu" className="inline-flex items-center gap-2 text-zinc-400 hover:text-saffron-500 transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Menu
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Image ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
            </div>
            {food.discount > 0 && (
              <div className="absolute top-5 left-5 badge-red text-sm px-4 py-2 rounded-xl">
                {food.discount}% OFF
              </div>
            )}
          </motion.div>

          {/* ── Info ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Category & tags */}
            <div className="flex flex-wrap gap-2">
              <span className="badge-orange capitalize">{food.category}</span>
              {food.isVeg && <span className="badge-green">Vegetarian</span>}
              {food.tags?.map((t) => (
                <span key={t} className="badge bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 capitalize">{t}</span>
              ))}
            </div>

            <h1 className="font-display text-4xl font-black text-ink dark:text-white">{food.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(food.rating) ? 'text-saffron-400 fill-saffron-400' : 'text-zinc-300'}
                  />
                ))}
                <span className="font-bold text-ink dark:text-white ml-1">{food.rating}</span>
              </div>
              <span className="text-zinc-400 text-sm">({food.reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6 py-4 border-y border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-saffron-400" />
                <span className="text-zinc-600 dark:text-zinc-300">{food.prepTime} min</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Flame size={16} className="text-ember" />
                <span className="text-zinc-600 dark:text-zinc-300">{food.calories} cal</span>
              </div>
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{food.description}</p>

            {/* Ingredients */}
            <div>
              <h3 className="font-semibold text-ink dark:text-white mb-3 text-sm uppercase tracking-wider">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {food.ingredients?.map((ing) => (
                  <span key={ing} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-600 dark:text-zinc-400 capitalize">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-black text-saffron-500">
                {formatCurrency(food.price)}
              </span>
              {food.originalPrice > food.price && (
                <span className="text-xl text-zinc-400 line-through">
                  {formatCurrency(food.originalPrice)}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-2">
              <button
                onClick={handleAdd}
                className={`btn-primary flex-1 justify-center py-4 text-base ${inCart ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-400/30' : ''}`}
              >
                {inCart ? <><CheckCircle size={20} /> In Cart</> : <><ShoppingCart size={20} /> Add to Cart</>}
              </button>
              <button
                onClick={() => { dispatch(toggleWishlist(food)); toast(isWished ? 'Removed from favourites' : '❤️ Saved!'); }}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-200
                  ${isWished ? 'bg-ember border-ember text-white' : 'border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-ember hover:text-ember'}`}
              >
                <Heart size={22} fill={isWished ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Delivery note */}
            <div className="flex items-center gap-3 p-4 bg-saffron-400/10 rounded-2xl border border-saffron-400/20">
              <span className="text-2xl">🛵</span>
              <div>
                <p className="font-semibold text-ink dark:text-white text-sm">Free delivery on orders above ₹499</p>
                <p className="text-zinc-400 text-xs">Estimated delivery: 30–45 min</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Reviews ──────────────────────────────────────────────────────── */}
        {reviews.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="font-display text-2xl font-bold text-ink dark:text-white mb-8">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((r) => (
                <div key={r.id} className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-start gap-4">
                    <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-ink dark:text-white text-sm">{r.name}</p>
                        {r.verified && (
                          <span className="text-xs text-emerald-500 flex items-center gap-1">
                            <CheckCircle size={12} /> Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={13} className={i < r.rating ? 'text-saffron-400 fill-saffron-400' : 'text-zinc-300'} />
                        ))}
                        <span className="text-zinc-400 text-xs ml-2">{formatDate(r.date)}</span>
                      </div>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{r.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
