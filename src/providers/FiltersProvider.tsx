'use client';
import { createContext, useRef, useContext } from 'react';
import { createFiltersStore, Filters } from '@/stores/useFiltersStore';

const FiltersContext = createContext<ReturnType<
  typeof createFiltersStore
> | null>(null);

export function FiltersProvider({
  children,
  initialFilters,
}: {
  children: React.ReactNode;
  initialFilters?: Filters;
}) {
  const storeRef = useRef(createFiltersStore(initialFilters));
  return (
    <FiltersContext.Provider value={storeRef.current}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFiltersStoreContext() {
  const store = useContext(FiltersContext);
  if (!store) throw new Error('Falta FiltersProvider no tree');
  return store;
}
