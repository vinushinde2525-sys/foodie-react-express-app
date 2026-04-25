import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-9xl mb-6 animate-bounce">🍔</div>
        <h1 className="font-display text-6xl font-black text-ink dark:text-white mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-zinc-600 dark:text-zinc-300 mb-3">Page Not Found</h2>
        <p className="text-zinc-400 mb-8">
          Looks like this page went out for delivery and never came back.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">Go Home</Link>
          <Link to="/menu" className="btn-outline">Browse Menu</Link>
        </div>
      </motion.div>
    </div>
  );
}
