import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeStore {
  mode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  theme: any;
  setThemeConfig: (theme: any) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: 'system',
      setTheme: (mode) => set({ mode }),
      theme: {},
      setThemeConfig: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    },
  ),
);
