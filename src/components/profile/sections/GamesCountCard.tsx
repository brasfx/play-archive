import React from 'react';
import { ProfileSectionCard } from '@/components/profile/ProfileSectionCard';

import type { useTranslations } from 'next-intl';

type TFn = ReturnType<typeof useTranslations>;

interface GamesCountCardProps {
  count: number;
  t: TFn;
}

export function GamesCountCard({ count, t }: GamesCountCardProps) {
  return (
    <ProfileSectionCard title={t('indicators')}>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-foreground">{t('games')}</span>
        <span className="text-2xl font-bold text-foreground tabular-nums">
          {count}
        </span>
      </div>
    </ProfileSectionCard>
  );
}
