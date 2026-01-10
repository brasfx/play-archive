import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <LibraryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function LibraryCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow">
      <Skeleton className="h-44 w-full bg-white/10 sm:h-48" />
      <div className="p-4">
        <Skeleton className="h-5 w-44 bg-white/10" />
        <div className="mt-3 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
          <Skeleton className="h-6 w-28 rounded-full bg-white/10" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded bg-white/10" />
            <Skeleton className="h-4 w-28 bg-white/10" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded bg-white/10" />
            <Skeleton className="h-4 w-14 bg-white/10" />
          </div>
          <Skeleton className="h-6 w-28 rounded-full bg-white/10" />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Skeleton className="h-2 flex-1 rounded-full bg-white/10" />
          <Skeleton className="h-4 w-10 bg-white/10" />
        </div>
        <div className="mt-5 grid grid-cols-[1fr_1fr_auto] gap-3">
          <Skeleton className="h-10 rounded-lg bg-white/10" />
          <Skeleton className="h-10 rounded-lg bg-blue-500/20" />
          <Skeleton className="h-10 w-10 rounded-lg bg-red-500/20" />
        </div>
      </div>
    </div>
  );
}
