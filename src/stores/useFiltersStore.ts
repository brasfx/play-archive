import { createStore } from 'zustand';

export interface Filters {
  page?: number;
  page_size?: number;
  platforms?: string | string[] | null;
  genres?: string | string[] | null;
  tags?: string | null;
  dates?: string | null;
  metacritic?: string | null;
  ordering?: string | null;
  parent_platforms?: string | string[] | null;
}

interface FiltersState {
  filters: Filters;
  setFilters: (next: Partial<Filters>) => void;
  resetFilters: () => void;
}

const initialFilters: Filters = {
  page: 1,
  page_size: 12,
  platforms: null,
  genres: null,
  tags: null,
  dates: null,
  metacritic: null,
  ordering: null,
  parent_platforms: null,
};

export const createFiltersStore = (initState?: Partial<Filters>) =>
  createStore<FiltersState>((set) => ({
    filters: { ...initialFilters, ...initState },
    setFilters: (next) =>
      set((state) => ({
        filters: { ...state.filters, ...next },
      })),
    resetFilters: () => set(() => ({ filters: { ...initialFilters } })),
  }));
