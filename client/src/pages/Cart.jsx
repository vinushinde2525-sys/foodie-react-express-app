import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import {
  selectCartItems, selectCartSubtotal, selectCartTax,
  selectDeliveryFee, selectCartTotal, selectCartCount,
  increaseQty, decreaseQty, removeFromCart, clearCart,
} from '../store/cartSlice';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function Cart() {
  const dispatch = useDispatch();
  const items    = useSelector(selectCartItems);
  const count    = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);
  const tax      = useSelector(selectCartTax);
  const delivery = useSelector(selectDeliveryFee);
  const total    = useSelector(selectCartTotal);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20 pb-28 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <span className="section-label">Review Order</span>
          <h1 className="section-title flex items-center gap-3">
            Your Cart <ShoppingBag className="text-saffron-400" size={36} />
          </h1>
          <p className="text-zinc-400 mt-2">{count} {count === 1 ? 'item' : 'items'}</p>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-5"
          >
            <div className="text-8xl animate-bounce">🛒</div>
            <h2 className="font-display text-2xl font-bold text-ink dark:text-white">Your cart is empty</h2>
            <p className="text-zinc-400">Add some delicious items to get started!</p>
            <Link to="/menu" className="btn-primary mt-2">Browse Menu</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Items list */}
            <div className="lg:col-span-3 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800 flex gap-4 items-center"
                  >
                    <Link to={`/food/${item.id}`}>
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 hover:opacity-90 transition-opacity" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/food/${item.id}`}>
                        <p className="font-display font-bold text-ink dark:text-white hover:text-saffron-500 transition-colors truncate">{item.name}</p>
                      </Link>
                      <p className="text-saffron-500 font-bold">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button onClick={() => dispatch(decreaseQty(item.id))} className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-saffron-400 hover:text-white transition-all">
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-bold text-ink dark:text-white">{item.quantity}</span>
                      <button onClick={() => dispatch(increaseQty(item.id))} className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-saffron-400 hover:text-white transition-all">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-bold text-ink dark:text-white">{formatCurrency(item.price * item.quantity)}</p>
                      <button onClick={() => { dispatch(removeFromCart(item.id)); toast('Item removed'); }} className="text-zinc-400 hover:text-ember transition-colors mt-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button onClick={() => { dispatch(clearCart()); toast('Cart cleared'); }} className="text-zinc-400 hover:text-ember text-sm transition-colors flex items-center gap-2 mt-2">
                <Trash2 size={15} /> Clear all items
              </button>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 sticky top-24">
                <h2 className="font-display font-bold text-ink dark:text-white text-lg mb-5">Order Summary</h2>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-zinc-500"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                  <div className="flex justify-between text-zinc-500"><span>Tax (5%)</span><span>{formatCurrency(tax)}</span></div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? 'text-emerald-500 font-semibold' : ''}>{delivery === 0 ? 'FREE' : formatCurrency(delivery)}</span>
                  </div>
                  {delivery > 0 && (
                    <p className="text-xs text-zinc-400 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-2">
                      Add {formatCurrency(499 - subtotal)} more for free delivery!
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-base text-ink dark:text-white pt-3 border-t border-zinc-100 dark:border-zinc-700">
                    <span>Total</span><span className="text-saffron-500">{formatCurrency(total)}</span>
                  </div>
                </div>
                <Link to="/checkout" className="btn-primary w-full justify-center py-4 text-base">
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>
                <Link to="/menu" className="btn-ghost w-full justify-center mt-3 text-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
