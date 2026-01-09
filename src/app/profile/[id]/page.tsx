import { getPublicProfile } from '@/services/getPublicProfile';

import { ProfileScreen } from '@/components/profile/ProfileScreen';
import { getGamesCount } from '@/services/getGamesCount';
import { getPublicFriendList } from '@/services/getPublicFriendList';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const profile = await getPublicProfile(id);

  const [gamesCount, friendships] = await Promise.all([
    getGamesCount(profile.id),
    getPublicFriendList(profile.id),
  ]);

  return (
    <div className="w-full">
      <ProfileScreen
        profile={profile}
        isOwner={false}
        gamesCount={gamesCount}
        friendlist={friendships}
      />
    </div>
  );
}
