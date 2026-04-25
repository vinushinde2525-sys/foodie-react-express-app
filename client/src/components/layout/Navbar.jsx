import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Search, Heart, Sun, Moon,
  Menu, X, BarChart2,
} from 'lucide-react';
import { selectCartCount, openCartDrawer } from '../../store/cartSlice';
import { selectWishlistCount } from '../../store/wishlistSlice';
import { useTheme } from '../../hooks/useTheme';
import { setSearchQuery } from '../../store/uiSlice';

const NAV_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/menu',      label: 'Menu' },
  { to: '/wishlist',  label: 'Favourites' },
  { to: '/analytics', label: 'Analytics' },
];

export default function Navbar() {
  const dispatch    = useDispatch();
  const navigate    = useNavigate();
  const cartCount   = useSelector(selectCartCount);
  const wishCount   = useSelector(selectWishlistCount);
  const { isDark, toggleTheme } = useTheme();

  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchVal,   setSearchVal]   = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchVal));
    navigate(`/menu?search=${encodeURIComponent(searchVal)}`);
    setSearchOpen(false);
    setSearchVal('');
  };

  const navCls = scrolled
    ? 'bg-white/90 dark:bg-ink/90 backdrop-blur-md shadow-md'
    : 'bg-transparent';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navCls}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className={`font-display text-2xl font-black transition-colors ${scrolled ? 'text-ink dark:text-white' : 'text-white'}`}>
            Foodie<span className="text-saffron-400">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-saffron-400 text-white'
                    : scrolled
                      ? 'text-zinc-600 dark:text-zinc-300 hover:text-saffron-500 hover:bg-saffron-50 dark:hover:bg-saffron-900/20'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-full transition-colors ${scrolled ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
            >
              <Search size={20} />
            </button>

            {/* Dark mode */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${scrolled ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className={`relative p-2 rounded-full transition-colors ${scrolled ? 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
              <Heart size={20} />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-ember text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => dispatch(openCartDrawer())}
              className="relative p-2 rounded-full bg-saffron-400 text-white hover:bg-saffron-500 transition-colors ml-1"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-ember text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] px-0.5 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ml-1 ${scrolled ? 'text-zinc-600 dark:text-zinc-300' : 'text-white'}`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-colors
                      ${isActive ? 'bg-saffron-400 text-white' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="w-full max-w-2xl"
            >
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white"
              >
                <X size={28} />
              </button>
              <p className="text-zinc-500 text-sm mb-4 text-center">What are you craving?</p>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={22} />
                <input
                  autoFocus
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search burgers, pizza, chicken…"
                  className="w-full bg-white/10 text-white placeholder-white/30 text-xl rounded-2xl pl-14 pr-6 py-5 outline-none border border-white/10 focus:border-saffron-400 transition-colors"
                />
              </form>
              <div className="flex gap-2 mt-4 flex-wrap">
                {['Burger', 'Pizza', 'Chicken', 'Desserts'].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSearchVal(s); }}
                    className="px-4 py-1.5 rounded-full border border-white/20 text-white/60 text-sm hover:border-saffron-400 hover:text-saffron-400 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
