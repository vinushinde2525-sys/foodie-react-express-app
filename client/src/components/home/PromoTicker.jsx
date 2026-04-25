const items = [
  '🍔 Free Delivery Over ₹499',
  '🍕 Fresh Ingredients Daily',
  '🔥 50% Off Tuesday Special',
  '⭐ Rated 4.9 by 15,000+ Customers',
  '🛵 30-Minute Delivery Guarantee',
  '🎉 New Menu Items Every Week',
];

export default function PromoTicker() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-saffron-400 py-3 overflow-hidden">
      <div className="flex gap-12 animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="text-white font-semibold text-sm flex items-center gap-3">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
