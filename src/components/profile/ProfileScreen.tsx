'use client';

import React from 'react';
import PublicProfileLayout from '@/components/profile/PublicProfileLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { FavoriteGameCard } from '@/components/profile/sections/FavoriteGameCard';
import { GamesCountCard } from '@/components/profile/sections/GamesCountCard';
import type { PublicProfile } from '@/types/profile';
import FriendsCard from './sections/FriendsCard';
import type { FriendRow } from '@/types/friendship';
import { useTranslations } from 'next-intl';

export function ProfileScreen({
  profile,
  gamesCount,
  friendlist,
  isOwner,
  onEdit,
}: {
  profile: PublicProfile;
  gamesCount: number;
  friendlist: FriendRow[];
  isOwner: boolean;
  onEdit?: () => void;
}) {
  const t = useTranslations('profile');
  return (
    <PublicProfileLayout
      bgId={profile.bg_id}
      header={
        <ProfileHeader
          profile={profile}
          isOwner={isOwner}
          onEdit={onEdit}
          t={t}
        />
      }
      left={
        <FavoriteGameCard
          game={{
            id: profile.favorite_game_id_rawg,
            name: profile.favorite_game_name,
            coverUrl: profile.favorite_game_image,
            progress: profile.favorite_game_progress,
            rating: profile.favorite_game_rating,
          }}
          t={t}
        />
      }
      right={
        <div className="flex flex-col gap-6 rounded-2xl wh-full">
          <GamesCountCard count={gamesCount} t={t} />
          <FriendsCard friendlist={friendlist} t={t} />
        </div>
      }
    />
  );
}
