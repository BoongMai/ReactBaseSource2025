import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UiStore {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      collapsed: false,
      setCollapsed: (collapsed) => set({ collapsed }),
    }),
    {
      name: 'ui-storage',
    },
  ),
);

export default useUiStore;
