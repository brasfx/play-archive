import React from 'react';
import { cn } from '@/lib/utils';

export default function SidebarItem({
  active,
  icon,
  label,
  count,
  onClick,
}: {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition',
        active
          ? 'bg-primary text-white font-semibold'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
      )}
    >
      <span className="flex items-center gap-2">
        <span className={cn(active ? 'text-white' : 'text-muted-foreground')}>
          {icon}
        </span>
        <span>{label}</span>
      </span>

      {typeof count === 'number' ? (
        <span
          className={cn(
            active ? 'text-white' : 'text-muted-foreground',
            'text-xs tabular-nums',
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
