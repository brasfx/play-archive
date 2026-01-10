import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">
          <Skeleton className="h-10 w-full bg-white/10 lg:w-[420px]" />
          <Skeleton className="h-10 w-full rounded-full bg-purple-500/20 lg:w-28" />
        </div>
        <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:justify-end">
          <Skeleton className="h-10 w-full rounded-full bg-purple-500/20 lg:w-36" />
          <Skeleton className="h-10 w-full rounded-full bg-purple-500/20 lg:w-28" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <HomeGameCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function HomeGameCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow">
      <Skeleton className="h-48 w-full bg-white/10" />
      <div className="p-4">
        <Skeleton className="h-5 w-44 bg-white/10" />
        <div className="mt-3 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
          <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded bg-white/10" />
            <Skeleton className="h-4 w-14 bg-white/10" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded bg-white/10" />
            <Skeleton className="h-4 w-40 bg-white/10" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Skeleton className="h-10 rounded-lg bg-white/10" />
          <Skeleton className="h-10 rounded-lg bg-blue-500/20" />
        </div>
      </div>
    </div>
  );
}
