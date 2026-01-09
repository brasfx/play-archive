import React from 'react';

export function ProfileSectionCard({
  title,
  children,
  action,
  count,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  count?: number;
}) {
  return (
    <div className="rounded-xl border bg-card/30 dark:bg-card/60 backdrop-blur">
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <h3 className="flex items-center gap-4 text-md font-medium text-foreground">
          {title}
          {(count || count !== 0) && (
            <span className="text-lg text-foreground">{count}</span>
          )}
        </h3>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
