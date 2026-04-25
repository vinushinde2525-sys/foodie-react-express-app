// ─── Currency ─────────────────────────────────────────────────────────────────
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

// ─── Stars ────────────────────────────────────────────────────────────────────
export const starsArray = (rating) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
};

// ─── Text ─────────────────────────────────────────────────────────────────────
export const truncate = (str, n) => (str.length > n ? str.slice(0, n) + '…' : str);

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// ─── Date ─────────────────────────────────────────────────────────────────────
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

// ─── Discount ─────────────────────────────────────────────────────────────────
export const discountPercent = (original, current) =>
  Math.round(((original - current) / original) * 100);

// ─── Delay ────────────────────────────────────────────────────────────────────
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
