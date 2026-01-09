import { FriendsManager } from '@/components/friendlist/FriendsManager';
import { acceptFriendRequest } from '@/services/friendship/acceptFriend';
import { blockFriendship } from '@/services/friendship/blockOrUnblockFriend';
import { getPending } from '@/services/friendship/getPending';
import { getBlocked } from '@/services/friendship/getBlocked';
import { removeFriendship } from '@/services/friendship/removeFriendship';
import { sendFriendRequest } from '@/services/friendship/sendFriendRequest';
import { getFriendList } from '@/services/getFriendList';
import { searchProfiles } from '@/services/friendship/searchProfiles';

export default async function Page() {
  const [accepted, pending, blocked] = await Promise.all([
    getFriendList(),
    getPending(),
    getBlocked(),
  ]);

  return (
    <FriendsManager
      accepted={accepted ?? []}
      pending={pending ?? []}
      blocked={blocked ?? []}
      onAcceptInvite={async (friendshipId) => {
        'use server';
        await acceptFriendRequest(friendshipId);
      }}
      onRejectInvite={async (friendshipId) => {
        'use server';
        await removeFriendship(friendshipId);
      }}
      onRemoveFriend={async (friendshipId) => {
        'use server';
        await removeFriendship(friendshipId);
      }}
      onBlockFriend={async (friendshipId) => {
        'use server';
        await blockFriendship(friendshipId, 'blocked');
      }}
      onUnblockFriend={async (friendshipId) => {
        'use server';
        await blockFriendship(friendshipId, 'accepted');
      }}
      onSendInvite={async (publicIdOrNickname) => {
        'use server';
        await sendFriendRequest({ value: publicIdOrNickname });
      }}
      onSearchUsers={async (query) => {
        'use server';
        return await searchProfiles(query);
      }}
    />
  );
}
