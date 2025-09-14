import { UserRole } from '@/shared/constants/userRoles';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
} | null;

type AuthState = {
  user: User;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      login: (token, user) => {
        set({ token, user });
      },
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => state => {
        // Store rehydrated successfully
      },
    }
  )
);

export default useAuthStore;
