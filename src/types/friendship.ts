import { PublicProfile } from './profile';

export type FriendshipStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';

export type Friend = {
  id: string;
  name: string;
  nickname?: string;
  avatar_url?: string | null;
  public_id: string | null;
};

export type Friendship = {
  friendshipId: string;
  friend: Friend;
  direction: 'incoming' | 'outgoing';
};

export type FriendRow = {
  friendshipId: string;
  friend: PublicProfile;
};

export type PendingRow = FriendRow & {
  direction: 'incoming' | 'outgoing';
};
