import { createStore } from 'zustand';

export interface Filters {
  page?: number;
  page_size?: number;
  platforms?: string | null;
  genres?: string | null;
  tags?: string | null;
  dates?: string | null;
  metacritic?: string | null;
  ordering?: string | null;
}

type FiltersSlice = {
  filters: Filters;
  setFilters: (next: Partial<Filters>) => void;
  resetFilters: () => void;
};

type ProfileSlice = {
  profileBgId: number | null;
  setProfileBgId: (id: number | null) => void;
};

export type AppState = FiltersSlice & ProfileSlice;
export type AppInit = {
  filters?: Partial<Filters>;
  profileBgId?: number | null;
};

const initialFilters: Filters = {
  page: 1,
  page_size: 12,
  platforms: null,
  genres: null,
  tags: null,
  dates: null,
  metacritic: null,
  ordering: null,
};

export const createAppStore = (initState?: Partial<AppState>) =>
  createStore<AppState>((set) => ({
    filters: { ...initialFilters, ...initState },
    setFilters: (next) =>
      set((state) => ({
        filters: { ...state.filters, ...next },
      })),
    resetFilters: () => set(() => ({ filters: { ...initialFilters } })),
    profileBgId: null,
    setProfileBgId: (id) => set({ profileBgId: id }),
    ...initState,
  }));
