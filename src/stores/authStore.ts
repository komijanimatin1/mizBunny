import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  _id?: string;
  username?: string;
  password?: string;
  roles?: string[];
  bucketName?: string;
  __v?: number;
  refreshToken?: string;
  lastName?: string;
  name?: string;
  phoneNumber?: string;
  position?: string;
  email?: string;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null; // we will store refreshToken here
  isAuthenticated: boolean;
  login: (user: UserProfile, token: string | null) => void;
  logout: () => void;
  resetSplashStates: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user: UserProfile, token: string | null) => {
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      resetSplashStates: () => {
        // This will be called from components to reset splash-related states
        // The actual state reset happens in the component, this is just a trigger
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
