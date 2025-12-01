export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface RequirementsEN {
  minimum?: string;
  recommended?: string;
}

export interface Plataforms {
  platform: Platform;
  released_at?: string;
  requirements_en?: RequirementsEN;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Store {
  id: number;
  name: string;
  slug: string;
  domain: string;
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface ShortScreenshots {
  id: number;
  image: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface RawgGame {
  id?: number;
  slug?: string;
  name?: string;
  background_image?: string;
  released?: string;
  rating?: number;
  rating_top?: number;
  ratings?: Rating[];
  ratings_count?: number;
  metacritic?: number;
  playtime?: number;
  platforms?: Plataforms[];
  parent_platforms?: Platform[];
  genres?: Genre[];
  stores?: Store[];
  esrb_rating?: EsrbRating;
  short_screenshots?: ShortScreenshots[];
  tags?: Tag[];
  added_by_status?: Record<string, number>;
  search_exact?: boolean;
}
