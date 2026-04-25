import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import CartDrawer from '../components/cart/CartDrawer';
import MobileBottomNav from '../components/layout/MobileBottomNav';
import { selectTheme } from '../store/uiSlice';

export default function MainLayout() {
  const location = useLocation();
  const theme = useSelector(selectTheme);

  // Sync theme class on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartDrawer />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

// ─── Inline Footer ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-ink text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          <div>
            <span className="font-display text-3xl font-black">
              Foodie<span className="text-saffron-400">.</span>
            </span>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Delicious food delivered fast. From our kitchen to your door in 30 minutes or less.
            </p>
            <div className="flex gap-3 mt-5">
              {['f', 't', 'in', '▶'].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-xs hover:bg-saffron-400 hover:border-saffron-400 transition-all duration-200">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              {['Home', 'Menu', 'About Us', 'Contact', 'Blog'].map((l) => (
                <li key={l}><a href="#" className="hover:text-saffron-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Mon – Fri: 08:00 – 22:00</li>
              <li>Saturday: 10:00 – 16:00</li>
              <li className="text-saffron-400 font-medium">Tuesday: Till Midnight 🎉</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>+91 98765 43210</li>
              <li>hello@foodie.in</li>
              <li className="leading-relaxed">153 MG Road, Pune,<br />Maharashtra 411001</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-zinc-500">
          <p>© 2025 Foodie. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-saffron-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-saffron-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
