import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-muted/30" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-8">
        <div className="rounded-2xl bg-slate-900/80 p-6 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-2xl bg-white/10" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-40 bg-white/10" />
                <Skeleton className="h-4 w-44 bg-white/10" />
                <Skeleton className="h-4 w-36 bg-white/10" />
              </div>
            </div>

            <div className="flex flex-col flex-wrap gap-3 sm:justify-end">
              <Skeleton className="h-9 w-32 rounded-full bg-white/10" />
              <Skeleton className="h-9 w-32 rounded-full bg-white/10" />
              <Skeleton className="h-9 w-32 rounded-full bg-red-500/20" />
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl bg-slate-900/70 p-5 shadow">
            <Skeleton className="h-4 w-28 bg-white/10" />
            <div className="mt-4 flex gap-4">
              <Skeleton className="h-16 w-24 rounded-xl bg-white/10" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-32 bg-white/10" />
                <Skeleton className="h-3 w-24 bg-white/10" />
                <Skeleton className="h-3 w-20 bg-white/10" />
              </div>
              <div className="ml-auto space-y-3 text-right">
                <Skeleton className="h-3 w-10 bg-white/10" />
                <Skeleton className="h-3 w-10 bg-white/10" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/70 p-5 shadow">
              <Skeleton className="h-4 w-24 bg-white/10" />
              <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 p-4">
                <Skeleton className="h-3 w-16 bg-white/10" />
                <Skeleton className="h-6 w-10 bg-white/10" />
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900/70 p-5 shadow">
              <Skeleton className="h-4 w-20 bg-white/10" />
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/5 p-4">
                <Skeleton className="h-9 w-9 rounded-full bg-white/10" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-40 bg-white/10" />
                  <Skeleton className="h-3 w-24 bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
