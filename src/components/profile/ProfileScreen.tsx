'use client';

import React from 'react';
import PublicProfileLayout from '@/components/profile/PublicProfileLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { FavoriteGameCard } from '@/components/profile/sections/FavoriteGameCard';
import { GamesCountCard } from '@/components/profile/sections/GamesCountCard';
import type { PublicProfile } from '@/types/profile';
import FriendsCard from './sections/FriendsCard';
import type { FriendRow } from '@/types/friendship';

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
  return (
    <PublicProfileLayout
      bgId={profile.bg_id}
      header={
        <ProfileHeader profile={profile} isOwner={isOwner} onEdit={onEdit} />
      }
      left={
        <FavoriteGameCard
          game={{
            name: profile.favorite_game_name,
            coverUrl: profile.favorite_game_image,
            progress: profile.favorite_game_progress,
            rating: profile.favorite_game_rating,
          }}
        />
      }
      right={
        <div className="flex flex-col gap-6 rounded-2xl wh-full">
          <GamesCountCard count={gamesCount} />
          <FriendsCard friendlist={friendlist} />
        </div>
      }
    />
  );
}
