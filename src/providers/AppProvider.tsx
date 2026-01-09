'use client';

import React, { createContext, useContext, useState } from 'react';
import type { StoreApi } from 'zustand';
import { useStore } from 'zustand';
import { createAppStore } from '@/stores/useAppStore';
import type { AppState, AppInit } from '@/stores/useAppStore';

const AppStoreContext = createContext<StoreApi<AppState> | null>(null);

export function AppStoreProvider({
  children,
  init,
}: {
  children: React.ReactNode;
  init?: AppInit;
}) {
  const [store] = useState(() => createAppStore(init));

  return (
    <AppStoreContext.Provider value={store}>
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore<T>(selector: (state: AppState) => T) {
  const store = useContext(AppStoreContext);
  if (!store) throw new Error('Falta AppStoreProvider no tree');
  return useStore(store, selector);
}
