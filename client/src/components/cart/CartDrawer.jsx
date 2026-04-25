import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import {
  selectCartItems, selectCartCount, selectCartSubtotal,
  selectCartTotal, selectCartTax, selectDeliveryFee,
  closeCartDrawer, selectIsDrawerOpen,
  increaseQty, decreaseQty, removeFromCart,
} from '../../store/cartSlice';
import { formatCurrency } from '../../utils/helpers';

export default function CartDrawer() {
  const dispatch    = useDispatch();
  const isOpen      = useSelector(selectIsDrawerOpen);
  const items       = useSelector(selectCartItems);
  const count       = useSelector(selectCartCount);
  const subtotal    = useSelector(selectCartSubtotal);
  const tax         = useSelector(selectCartTax);
  const delivery    = useSelector(selectDeliveryFee);
  const total       = useSelector(selectCartTotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCartDrawer())}
            className="fixed inset-0 bg-black/50 z-[70]"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-zinc-900 z-[80] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h2 className="font-display text-xl font-bold text-ink dark:text-white">Your Cart</h2>
                <p className="text-sm text-zinc-400">{count} {count === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={() => dispatch(closeCartDrawer())}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 py-20"
                  >
                    <div className="text-7xl animate-bounce">🛒</div>
                    <p className="font-display text-xl text-ink dark:text-white font-bold">Your cart is empty</p>
                    <p className="text-zinc-400 text-sm text-center">Add some delicious food to get started!</p>
                    <Link
                      to="/menu"
                      onClick={() => dispatch(closeCartDrawer())}
                      className="btn-primary mt-2"
                    >
                      Browse Menu
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0 }}
                      className="flex gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-18 h-18 rounded-xl object-cover flex-shrink-0"
                        style={{ width: 72, height: 72 }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-ink dark:text-white text-sm leading-tight truncate">{item.name}</p>
                        <p className="text-saffron-500 font-bold text-sm mt-1">{formatCurrency(item.price)}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => dispatch(decreaseQty(item.id))}
                              className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center hover:bg-saffron-400 hover:text-white transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-5 text-center font-bold text-sm text-ink dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => dispatch(increaseQty(item.id))}
                              className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center hover:bg-saffron-400 hover:text-white transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="p-1.5 text-zinc-400 hover:text-ember transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-zinc-100 dark:border-zinc-800 px-6 py-5 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Tax (5%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? 'text-emerald-500 font-semibold' : ''}>
                      {delivery === 0 ? 'FREE' : formatCurrency(delivery)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-ink dark:text-white pt-2 border-t border-zinc-100 dark:border-zinc-700">
                    <span>Total</span>
                    <span className="text-saffron-500">{formatCurrency(total)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  onClick={() => dispatch(closeCartDrawer())}
                  className="btn-primary w-full justify-center text-center"
                >
                  <ShoppingBag size={18} />
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
