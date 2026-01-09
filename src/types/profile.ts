export type FavoriteGame = {
  id: string;
  name: string;
  coverUrl?: string | null;
  hoursPlayed?: number | null;
  rating?: number | null;
  achievements?: number | null;
  progress?: number | null;
};

export type PublicProfile = {
  id?: string;
  bio?: string | null;
  nickname?: string;
  name?: string | null;
  avatar_url?: string | null;
  location?: string | null;
  gamesCount?: number;
  favoriteGame?: FavoriteGame | null;
  public_id?: string | null;
  bg_id?: string | null;
  favorite_platform?: string | null;
  favorite_game_name?: string | null;
  favorite_game_id_rawg?: number | null;
  favorite_game_image?: string | null;
  favorite_game_progress?: number | null;
  favorite_game_rating?: number | null;
};

export type EditProfileProps = {
  id: number | string;
  nickname?: string;
  name: string;
  bio?: string;
  user_id: string;
  game_id_rawg: number | null;
  status: 'playing' | 'completed' | 'wishlist' | 'dropped' | string;
  progress_percent: number;
  rating: number;
  is_favorite: boolean;
  notes: string;
  platform: string;
  background_image: string;
  released: string;
  slug?: string;
  genres?: string[];
};
