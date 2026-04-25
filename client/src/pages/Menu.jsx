import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useFoods, useCategories } from '../hooks/useApi';
import FoodCard from '../components/food/FoodCard';
import { FoodGridSkeleton } from '../components/ui/Skeletons';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Default' },
  { value: 'popular',   label: 'Most Popular' },
  { value: 'rating',    label: 'Top Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search,   setSearch]   = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [sort,     setSort]     = useState(searchParams.get('sort') || 'default');
  const [isVeg,    setIsVeg]    = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync state → URL params
  useEffect(() => {
    const p = {};
    if (search)          p.search   = search;
    if (category !== 'all') p.category = category;
    if (sort !== 'default')  p.sort   = sort;
    setSearchParams(p, { replace: true });
  }, [search, category, sort]);

  const queryParams = {
    ...(search   && { search }),
    ...(category !== 'all' && { category }),
    ...(sort !== 'default'  && { sort }),
    ...(isVeg    && { isVeg: true }),
  };

  const { data: foods = [], isLoading, isError } = useFoods(queryParams);
  const { data: categories = [] } = useCategories();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="py-10">
          <span className="section-label">Our Menu</span>
          <h1 className="section-title">
            Explore <span className="text-saffron-400">Delicious</span> Food
          </h1>
          <p className="text-zinc-400 mt-2">{foods.length} items available</p>
        </div>

        {/* Search + Sort bar */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food, cuisine..."
              className="input-field pl-11"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                <X size={16} />
              </button>
            )}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field w-auto min-w-[180px]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <button
            onClick={() => setIsVeg(!isVeg)}
            className={`px-4 py-3 rounded-xl font-medium text-sm border transition-all ${isVeg ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'}`}
          >
            🌱 Veg Only
          </button>
        </div>

        <div className="flex gap-8">

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 sticky top-24">
              <h3 className="font-semibold text-ink dark:text-white mb-4 text-sm uppercase tracking-wider">Categories</h3>
              <div className="flex flex-col gap-1">
                {[{ id: 'all', name: 'All Items', icon: '🍽️', count: 0 }, ...categories].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                      ${category === cat.id
                        ? 'bg-saffron-400 text-white'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    {cat.count > 0 && (
                      <span className={`text-xs ${category === cat.id ? 'text-white/70' : 'text-zinc-400'}`}>
                        {cat.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Mobile category pills ───────────────────────────────── */}
          <div className="lg:hidden flex-none w-full -mx-0 mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {[{ id: 'all', name: 'All', icon: '🍽️' }, ...categories].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0
                    ${category === cat.id ? 'bg-saffron-400 text-white' : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* ── Food Grid ───────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {isError ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">😕</p>
                <p className="text-zinc-400">Failed to load menu. Is the server running?</p>
              </div>
            ) : isLoading ? (
              <FoodGridSkeleton count={6} />
            ) : foods.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="font-display text-xl font-bold text-ink dark:text-white mb-2">No results found</h3>
                <p className="text-zinc-400 mb-6">Try a different search or category</p>
                <button onClick={() => { setSearch(''); setCategory('all'); }} className="btn-primary">
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${category}-${sort}-${search}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {foods.map((food, i) => (
                    <FoodCard key={food.id} food={food} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
