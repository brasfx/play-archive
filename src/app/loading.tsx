import { SkeletonCard } from '@/components/loading/SkeletonCard';

export default function Loading() {
  const count = 12;
  return (
    <div
      className="
    grid gap-6 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4
    xl:grid-cols-4
    "
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
