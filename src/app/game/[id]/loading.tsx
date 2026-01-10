import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="hidden lg:block">
        <DesktopDetailsSkeleton />
      </div>
      <div className="lg:hidden">
        <MobileDetailsSkeleton />
      </div>
    </div>
  );
}

function DesktopDetailsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-20 bg-white/10" />
        <Skeleton className="h-4 w-80 bg-white/10" />
      </div>
      <div className="rounded-2xl bg-slate-900/60 p-6 shadow">
        <div className="grid gap-6 lg:grid-cols-[360px_1fr_320px]">
          <div className="space-y-3">
            <Skeleton className="h-[420px] w-full rounded-xl bg-white/10" />
            <div className="w-[680px] space-y-3 rounded-xl bg-white/5 p-4">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/10" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-80 bg-white/10" />
              <Skeleton className="h-4 w-36 bg-white/10" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 flex-1 rounded-full bg-white/10" />
              <Skeleton className="h-4 w-10 bg-white/10" />
              <Skeleton className="h-8 w-16 rounded-full bg-emerald-500/20" />
            </div>
            <Skeleton className="h-10 w-40 rounded-full bg-emerald-500/20" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-28 rounded-full bg-white/10" />
              <Skeleton className="h-8 w-24 rounded-full bg-white/10" />
              <Skeleton className="h-8 w-40 rounded-full bg-white/10" />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Skeleton className="h-9 w-28 rounded-lg bg-blue-500/20" />
              <Skeleton className="h-9 w-28 rounded-lg bg-white/10" />
              <Skeleton className="h-9 w-28 rounded-lg bg-white/10" />
              <Skeleton className="h-9 w-36 rounded-lg bg-white/10" />
              <Skeleton className="h-9 w-24 rounded-lg bg-white/10" />
            </div>
          </div>
          <div className="space-y-4 rounded-xl bg-white/5 p-4">
            <Skeleton className="h-4 w-32 bg-white/10" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3"
                >
                  <Skeleton className="h-3 w-28 bg-white/10" />
                  <Skeleton className="h-3 w-20 bg-white/10" />
                </div>
              ))}
            </div>

            <Skeleton className="h-4 w-40 bg-white/10" />
            <Skeleton className="h-3 w-20 bg-white/10" />
            <Skeleton className="h-4 w-28 bg-white/10" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full bg-white/10" />
              <Skeleton className="h-3 w-[80%] bg-white/10" />
            </div>
            <Skeleton className="h-10 w-44 rounded-lg bg-blue-500/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileDetailsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-56 bg-white/10" />
        <Skeleton className="h-6 w-48 bg-white/10" />
      </div>

      <div className="rounded-2xl bg-slate-900/60 p-4 shadow">
        <Skeleton className="h-[340px] w-full rounded-xl bg-white/10" />

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-7 w-56 bg-white/10" />
            <Skeleton className="h-4 w-32 bg-white/10" />
          </div>
          <Skeleton className="h-8 w-14 rounded-full bg-emerald-500/20" />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Skeleton className="h-3 flex-1 rounded-full bg-white/10" />
          <Skeleton className="h-4 w-10 bg-white/10" />
        </div>

        <Skeleton className="mt-4 h-10 w-40 rounded-full bg-emerald-500/20" />

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Skeleton className="h-10 rounded-lg bg-white/10" />
          <Skeleton className="h-10 rounded-lg bg-white/10" />
          <Skeleton className="h-10 rounded-lg bg-white/10 col-span-2" />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <Skeleton className="h-9 w-28 rounded-lg bg-blue-500/20" />
          <Skeleton className="h-9 w-28 rounded-lg bg-white/10" />
          <Skeleton className="h-9 w-28 rounded-lg bg-white/10" />
          <Skeleton className="h-9 w-36 rounded-lg bg-white/10" />
          <Skeleton className="h-9 w-24 rounded-lg bg-white/10" />
        </div>

        <div className="mt-3 space-y-3 rounded-xl bg-white/5 p-4">
          <Skeleton className="h-4 w-full bg-white/10" />
          <Skeleton className="h-4 w-full bg-white/10" />
          <Skeleton className="h-4 w-full bg-white/10" />
          <Skeleton className="h-4 w-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}
