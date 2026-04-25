import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, Check } from 'lucide-react';
import {
  selectCartItems, selectCartSubtotal, selectCartTax,
  selectDeliveryFee, selectCartTotal, clearCart,
} from '../store/cartSlice';
import { useCreateOrder } from '../hooks/useApi';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';

const PAYMENT_METHODS = [
  { id: 'COD',   label: 'Cash on Delivery', icon: '💵' },
  { id: 'UPI',   label: 'UPI / PhonePe',    icon: '📱' },
  { id: 'CARD',  label: 'Credit / Debit Card', icon: '💳' },
];

export default function Checkout() {
  const navigate  = useDispatch();
  const nav       = useNavigate();
  const dispatch  = useDispatch();
  const items     = useSelector(selectCartItems);
  const subtotal  = useSelector(selectCartSubtotal);
  const tax       = useSelector(selectCartTax);
  const delivery  = useSelector(selectDeliveryFee);
  const total     = useSelector(selectCartTotal);

  const { mutateAsync: createOrder, isPending } = useCreateOrder();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { paymentMethod: 'COD' },
  });

  const selectedPayment = watch('paymentMethod');

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🛒</p>
          <h2 className="font-display text-2xl font-bold text-ink dark:text-white mb-2">Cart is empty</h2>
          <Link to="/menu" className="btn-primary mt-4">Browse Menu</Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      const res = await createOrder({
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        customer: { name: data.name, email: data.email, phone: data.phone },
        address: `${data.address}, ${data.city} - ${data.pincode}`,
        paymentMethod: data.paymentMethod,
        subtotal, tax, deliveryFee: delivery, total,
      });
      dispatch(clearCart());
      nav(`/order-success/${res.data.orderId}`);
    } catch (err) {
      toast.error(err.message || 'Order failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20 pb-28 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <Link to="/cart" className="inline-flex items-center gap-2 text-zinc-400 hover:text-saffron-500 transition-colors text-sm mb-8">
          <ArrowLeft size={16} /> Back to Cart
        </Link>

        <h1 className="section-title mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* ── Left: Form ──────────────────────────────────────────── */}
            <div className="lg:col-span-3 space-y-6">

              {/* Delivery info */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
                <h2 className="font-display font-bold text-ink dark:text-white text-lg mb-5 flex items-center gap-2">
                  <Truck size={20} className="text-saffron-400" /> Delivery Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Full Name</label>
                    <input {...register('name', { required: 'Name is required' })} placeholder="Rohan Mehta" className="input-field" />
                    {errors.name && <p className="text-ember text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Email</label>
                    <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} placeholder="rohan@example.com" type="email" className="input-field" />
                    {errors.email && <p className="text-ember text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Phone</label>
                    <input {...register('phone', { required: 'Phone is required' })} placeholder="+91 98765 43210" className="input-field" />
                    {errors.phone && <p className="text-ember text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Pincode</label>
                    <input {...register('pincode', { required: 'Pincode is required' })} placeholder="411001" className="input-field" />
                    {errors.pincode && <p className="text-ember text-xs mt-1">{errors.pincode.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Street Address</label>
                    <input {...register('address', { required: 'Address is required' })} placeholder="153 MG Road, Koregaon Park" className="input-field" />
                    {errors.address && <p className="text-ember text-xs mt-1">{errors.address.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">City</label>
                    <input {...register('city', { required: 'City is required' })} placeholder="Pune" className="input-field" />
                    {errors.city && <p className="text-ember text-xs mt-1">{errors.city.message}</p>}
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
                <h2 className="font-display font-bold text-ink dark:text-white text-lg mb-5 flex items-center gap-2">
                  <CreditCard size={20} className="text-saffron-400" /> Payment Method
                </h2>
                <div className="flex flex-col gap-3">
                  {PAYMENT_METHODS.map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                        ${selectedPayment === pm.id ? 'border-saffron-400 bg-saffron-400/5' : 'border-zinc-100 dark:border-zinc-700 hover:border-zinc-200 dark:hover:border-zinc-600'}`}
                    >
                      <input type="radio" value={pm.id} {...register('paymentMethod')} className="hidden" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${selectedPayment === pm.id ? 'border-saffron-400 bg-saffron-400' : 'border-zinc-300 dark:border-zinc-600'}`}>
                        {selectedPayment === pm.id && <Check size={11} className="text-white" />}
                      </div>
                      <span className="text-xl">{pm.icon}</span>
                      <span className="font-medium text-ink dark:text-white text-sm">{pm.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Order Summary ─────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 sticky top-24">
                <h2 className="font-display font-bold text-ink dark:text-white text-lg mb-5">Order Summary</h2>

                <div className="space-y-3 mb-5 max-h-52 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink dark:text-white truncate">{item.name}</p>
                        <p className="text-xs text-zinc-400">×{item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-saffron-500">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm border-t border-zinc-100 dark:border-zinc-800 pt-4 mb-5">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Tax (5%)</span><span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? 'text-emerald-500 font-semibold' : ''}>
                      {delivery === 0 ? 'FREE' : formatCurrency(delivery)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-ink dark:text-white pt-2 border-t border-zinc-100 dark:border-zinc-700 mt-2">
                    <span>Total</span><span className="text-saffron-500">{formatCurrency(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full justify-center py-4 text-base"
                >
                  {isPending ? (
                    <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order...</>
                  ) : (
                    <>Place Order — {formatCurrency(total)}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
