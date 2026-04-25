import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home, UtensilsCrossed, Heart, ShoppingCart, BarChart2 } from 'lucide-react';
import { selectCartCount, openCartDrawer } from '../../store/cartSlice';

const links = [
  { to: '/',          icon: Home,             label: 'Home' },
  { to: '/menu',      icon: UtensilsCrossed,  label: 'Menu' },
  { to: '/wishlist',  icon: Heart,            label: 'Saved' },
  { to: '/analytics', icon: BarChart2,        label: 'Stats' },
];

export default function MobileBottomNav() {
  const dispatch  = useDispatch();
  const cartCount = useSelector(selectCartCount);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors
              ${isActive ? 'text-saffron-400' : 'text-zinc-400 dark:text-zinc-500'}`
            }
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}

        {/* Cart button */}
        <button
          onClick={() => dispatch(openCartDrawer())}
          className="relative flex flex-col items-center gap-0.5 px-3 py-2 text-zinc-400 dark:text-zinc-500"
        >
          <ShoppingCart size={22} />
          <span className="text-[10px] font-medium">Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-ember text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
