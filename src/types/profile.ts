export type FavoriteGame = {
  id: string;
  name: string;
  coverUrl?: string | null;
  hoursPlayed?: number | null;
  rating?: number | null;
  achievements?: number | null;
};

export type PublicProfile = {
  id?: string;
  nickname?: string;
  name?: string | null;
  avatar_url?: string | null;
  location?: string | null;
  gamesCount?: number;
  favoriteGame?: FavoriteGame | null;
  public_id?: string | null;
  bg_id?: string | null;
};
