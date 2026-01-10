import Link from 'next/link';
import React from 'react';

export function ProfileSectionCard({
  title,
  children,
  action,
  count,
  href,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  count?: number;
  href?: string;
}) {
  return (
    <div className="rounded-xl border bg-card/30 dark:bg-card/60 backdrop-blur">
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <Link
          href={href ?? '#'}
          className="flex items-center gap-4 text-md font-medium text-foreground"
        >
          {title}
          {(count || count !== 0) && (
            <span className="text-lg text-foreground">{count}</span>
          )}
        </Link>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
