'use client';

import { useSearchParams } from 'next/navigation';

export interface Filters {
  search?: string;
  genres?: string | string[];
  ordering?: string;
  page?: number;
  page_size?: number;
  platforms?: string | string[];
  parent_platforms?: string | string[];
}

export function useFiltersFromURL(): Filters {
  const params = useSearchParams();

  return {
    search: params.get('search') || '',
    genres: params.get('genres') || '',
    ordering: params.get('ordering') || '',
    page: Number(params.get('page')) || 1,
    page_size: Number(params.get('page_size')) || 12,
    platforms: params.get('platforms') || '',
  };
}
