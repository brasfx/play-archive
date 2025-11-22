export interface Genre {
  id: number;
  name: string;
}

export interface Cover {
  id: number;
  image_id: string;
}

export interface Platform {
  name: string;
}

export interface Game {
  id: number;
  cover?: Cover;
  genres?: Genre[];
  name: string;
  summary?: string;
  total_rating?: number;
  release_date?: number;
  platforms?: Platform[];
}

export type Games = Game[];
