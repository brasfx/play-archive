export interface Library {
  id?: number | string;
  userId?: number | string;
  gameId?: number | string;
  status?: 'playing' | 'completed' | 'wishlist' | 'dropped' | string;
  progress?: number;
  slug?: string;
  rating?: number;
  isFavorite?: boolean;
  notes?: string;
  platform?: string;
  backgroundImage?: string;
  relesed?: string;
  genres?: string[];
  createdAt?: string | Date;
  name?: string;
  released?: string | Date;
}
