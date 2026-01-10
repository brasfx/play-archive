import React from 'react';
import { ProfileSectionCard } from '../ProfileSectionCard';
import Image from 'next/image';
import Link from 'next/link';
import type { Friend, FriendRow } from '@/types/friendship';

import type { useTranslations } from 'next-intl';

type TFn = ReturnType<typeof useTranslations>;

type FriendsCardProps = {
  friendlist: FriendRow[];
  t: TFn;
};

export default function FriendsCard({ friendlist, t }: FriendsCardProps) {
  return (
    <ProfileSectionCard
      title={t('friends')}
      count={friendlist.length}
      href="/friendlist"
    >
      <div className="flex items-baseline justify-between">
        <div className="flex flex-col flex-wrap gap-4">
          {friendlist.map(({ friend }: Friend) => (
            <Link key={friend.id} href={`/profile/${friend.public_id}`}>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 overflow-hidden rounded-full border">
                  {friend?.avatar_url ? (
                    <Image
                      src={friend?.avatar_url}
                      alt="This is my avatar"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {friend?.nickname}
                  </div>
                  <div className="truncate text-xs text-foreground">
                    {friend.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ProfileSectionCard>
  );
}
