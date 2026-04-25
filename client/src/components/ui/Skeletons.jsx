export function FoodCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 animate-pulse">
      <div className="aspect-square bg-zinc-200 dark:bg-zinc-700" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3" />
        <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-2/5" />
        <div className="flex justify-between items-center">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3" />
          <div className="w-9 h-9 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function FoodGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <FoodCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SectionHeaderSkeleton() {
  return (
    <div className="text-center mb-12 space-y-3 animate-pulse">
      <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-24 mx-auto" />
      <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-64 mx-auto" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-80 mx-auto" />
    </div>
  );
}
