import { PublicProfile } from './profile';

export type FriendshipStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';

export type Friendship = {
  friendshipId: string;
  friend: Friend;
  direction: 'incoming' | 'outgoing';
};

export type FriendRow = {
  friendshipId: string;
  friend: PublicProfile;
};

export type Friend = Omit<FriendRow, 'friendshipId'>;

export type PendingRow = FriendRow & {
  direction: 'incoming' | 'outgoing';
};
