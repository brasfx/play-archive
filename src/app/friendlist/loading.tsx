import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-64px)] p-4">
      <div className="hidden gap-6 lg:flex">
        <aside className="w-[280px] shrink-0 rounded-xl bg-slate-900/60 p-3 shadow">
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded bg-white/10" />
                  <Skeleton className="h-4 w-32 bg-white/10" />
                </div>
                <Skeleton className="h-5 w-6 rounded bg-white/10" />
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 rounded-xl bg-slate-900/60 p-6 shadow">
          <DesktopMain />
        </main>
      </div>

      <div className="lg:hidden">
        <main className="rounded-xl bg-slate-900/60 p-5 shadow">
          <MobileMain />
        </main>
      </div>
    </div>
  );
}

function DesktopMain() {
  return (
    <div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-28 bg-white/10" />
        <Skeleton className="h-4 w-80 bg-white/10" />
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
        <Skeleton className="h-5 w-5 rounded bg-white/10" />
        <Skeleton className="h-4 w-[420px] max-w-[70%] bg-white/10" />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Skeleton className="h-4 w-24 bg-white/10" />
        <Skeleton className="h-5 w-6 rounded bg-white/10" />
      </div>

      <FriendRowSkeleton />

      <div className="mt-4 space-y-3">
        <Skeleton className="h-14 w-full rounded-xl bg-white/5" />
        <Skeleton className="h-14 w-full rounded-xl bg-white/5" />
        <Skeleton className="h-14 w-full rounded-xl bg-white/5" />
      </div>
    </div>
  );
}

function MobileMain() {
  return (
    <div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-28 bg-white/10" />
        <Skeleton className="h-4 w-72 bg-white/10" />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <Skeleton className="h-9 w-24 rounded-full bg-blue-500/20" />
        <Skeleton className="h-9 w-24 rounded-full bg-white/10" />
        <Skeleton className="h-9 w-28 rounded-full bg-white/10" />
        <Skeleton className="h-9 w-24 rounded-full bg-white/10" />
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
        <Skeleton className="h-5 w-5 rounded bg-white/10" />
        <Skeleton className="h-4 w-52 bg-white/10" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Skeleton className="h-4 w-24 bg-white/10" />
        <Skeleton className="h-5 w-6 rounded bg-white/10" />
      </div>
      <FriendRowSkeleton />
    </div>
  );
}

function FriendRowSkeleton() {
  return (
    <div className="mt-3 rounded-xl bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-md bg-white/10" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-44 bg-white/10" />
            <Skeleton className="h-3 w-20 bg-white/10" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-md bg-white/10" />
      </div>
    </div>
  );
}
