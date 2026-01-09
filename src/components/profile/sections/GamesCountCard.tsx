import React from 'react';
import { ProfileSectionCard } from '@/components/profile/ProfileSectionCard';

export function GamesCountCard({ count }: { count: number }) {
  return (
    <ProfileSectionCard title="Indicadores">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-foreground">Jogos</span>
        <span className="text-2xl font-bold text-foreground tabular-nums">
          {count}
        </span>
      </div>
    </ProfileSectionCard>
  );
}
