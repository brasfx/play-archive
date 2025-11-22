export function SkeletonCard() {
  return (
    <div className="bg-card dark:bg-card rounded-xl shadow-lg flex flex-col items-center p-4 w-full animate-pulse">
      <div className="h-60 w-full bg-gray-700 rounded-lg mb-4" />
      <div className="h-6 w-3/4 bg-gray-600 rounded mb-2" />
      <div className="flex gap-2 mb-2">
        <div className="h-8 w-16 bg-red-600 rounded-full" />
        <div className="h-8 w-16 bg-red-600 rounded-full" />
      </div>
      <div className="h-4 w-2/3 bg-gray-700 rounded mb-2" />
      <div className="flex w-full justify-baseline gap-4 mt-2">
        <div className="h-10 w-20 bg-gray-800 rounded" />
        <div className="h-10 w-20 bg-blue-800 rounded" />
      </div>
    </div>
  );
}
