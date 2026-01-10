import React from 'react';
import Image from 'next/image';
import { ProfileSectionCard } from '@/components/profile/ProfileSectionCard';
import type { FavoriteGame } from '@/types/profile';

import type { useTranslations } from 'next-intl';

type TFn = ReturnType<typeof useTranslations>;

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-sm text-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export function FavoriteGameCard({
  game,
  t,
}: {
  game?: FavoriteGame | null;
  t: TFn;
}) {
  return (
    <ProfileSectionCard title={t('favoriteGame')}>
      {!game.name ? (
        <div className="text-sm text-foreground">{t('noFavoriteGame')}</div>
      ) : (
        <div className="flex gap-4">
          <div className="relative h-20 w-30 overflow-hidden rounded-md border">
            {game.coverUrl ? (
              <Image
                src={game.coverUrl}
                alt="This is my favorite game image"
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-semibold">{game.name}</div>

            <div className="mt-3 space-y-2">
              {typeof game.progress === 'number' && (
                <Stat label={t('myProgress')} value={`${game.progress}%`} />
              )}
              {typeof game.rating === 'number' && (
                <Stat label={t('myRating')} value={`${game.rating}.0`} />
              )}
              {typeof game.achievements === 'number' && (
                <Stat label="Conquistas" value={game.achievements} />
              )}
            </div>
          </div>
        </div>
      )}
    </ProfileSectionCard>
  );
}
