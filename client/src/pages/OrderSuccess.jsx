import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, UtensilsCrossed } from 'lucide-react';
import { useOrder } from '../hooks/useApi';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { data: order, isLoading } = useOrder(orderId);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4 pt-20 pb-28 md:pb-12">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800 text-center shadow-xl"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>

          <h1 className="font-display text-3xl font-black text-ink dark:text-white mb-2">Order Placed! 🎉</h1>
          <p className="text-zinc-400 mb-6">Thank you! Your food is being prepared.</p>

          {/* Order ID */}
          <div className="bg-saffron-400/10 rounded-2xl p-4 mb-6 border border-saffron-400/20">
            <p className="text-xs text-zinc-400 mb-1 uppercase tracking-wider">Order ID</p>
            <p className="font-display font-black text-saffron-500 text-xl">{orderId}</p>
          </div>

          {/* Order details */}
          {!isLoading && order && (
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-400">Status</span>
                <span className="font-semibold text-emerald-500 capitalize">{order.status}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-400">Estimated Delivery</span>
                <span className="font-semibold text-ink dark:text-white">{order.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-400">Payment</span>
                <span className="font-semibold text-ink dark:text-white">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400">Total</span>
                <span className="font-bold text-saffron-500 text-base">{formatCurrency(order.total)}</span>
              </div>
            </div>
          )}

          {/* Delivery animation */}
          <div className="text-5xl my-6 animate-bounce">🛵</div>
          <p className="text-zinc-400 text-sm mb-8">Our rider is on the way to your address!</p>

          <div className="flex gap-3">
            <Link to="/" className="btn-outline flex-1 justify-center">
              <Home size={16} /> Home
            </Link>
            <Link to="/menu" className="btn-primary flex-1 justify-center">
              <UtensilsCrossed size={16} /> Order More
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
