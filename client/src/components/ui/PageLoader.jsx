export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-ink">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-zinc-200 dark:border-zinc-700 rounded-full" />
          <div className="absolute inset-0 border-4 border-saffron-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="font-display text-lg font-bold text-ink dark:text-white">
          Foodie<span className="text-saffron-400">.</span>
        </p>
        <p className="text-sm text-zinc-400 mt-1">Loading...</p>
      </div>
    </div>
  );
}
