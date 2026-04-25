import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area,
} from 'recharts';
import { useStats } from '../hooks/useApi';
import { useScrollReveal } from '../hooks/useScrollReveal';

const COLORS = ['#FF9D2D', '#E63027', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#06b6d4', '#ec4899'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl p-3 shadow-lg">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-sm font-bold" style={{ color: p.color }}>
            {typeof p.value === 'number' && p.name === 'revenue' ? `₹${p.value.toLocaleString()}` : p.value}
            <span className="text-zinc-400 font-normal ml-1">{p.name}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const { data: stats, isLoading } = useStats();
  const { ref, isVisible } = useScrollReveal();

  if (isLoading) return (
    <div className="min-h-screen pt-20 bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="max-w-7xl mx-auto py-10 space-y-6">
        {[300, 300, 300].map((h, i) => (
          <div key={i} className="skeleton rounded-2xl" style={{ height: h }} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-20 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-10">
          <span className="section-label">Dashboard</span>
          <h1 className="section-title">Analytics <span className="text-saffron-400">Overview</span></h1>
          <p className="text-zinc-400 mt-2">Live data from the Express API</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8" ref={ref}>
          {[
            { label: 'Total Items',    value: stats?.totalFoods,      emoji: '🍽️' },
            { label: 'Categories',     value: stats?.totalCategories, emoji: '📂' },
            { label: 'Avg Rating',     value: `${stats?.avgRating}★`, emoji: '⭐' },
            { label: 'Weekly Orders',  value: stats?.weeklyOrders?.reduce((s, d) => s + d.orders, 0), emoji: '📦' },
          ].map(({ label, value, emoji }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800"
            >
              <div className="text-3xl mb-3">{emoji}</div>
              <div className="font-display text-3xl font-black text-ink dark:text-white">{value ?? '—'}</div>
              <div className="text-zinc-400 text-xs mt-1 uppercase tracking-wider">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Weekly Orders Bar Chart */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
            <h3 className="font-display font-bold text-ink dark:text-white mb-6">Weekly Orders</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stats?.weeklyOrders} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,157,45,0.08)' }} />
                <Bar dataKey="orders" fill="#FF9D2D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
            <h3 className="font-display font-bold text-ink dark:text-white mb-6">Menu by Category</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={stats?.categoryStats}
                  dataKey="count"
                  nameKey="category"
                  cx="50%" cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {stats?.categoryStats?.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend formatter={(v) => <span className="text-xs capitalize">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Area Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
          <h3 className="font-display font-bold text-ink dark:text-white mb-6">Category Revenue (Simulated)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={stats?.categoryStats}>
              <defs>
                <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9D2D" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF9D2D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#FF9D2D" strokeWidth={2.5} fill="url(#rGrad)" dot={{ fill: '#FF9D2D', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
