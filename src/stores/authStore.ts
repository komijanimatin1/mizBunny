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
  avatar?: string;
}

export interface LoginData {
  token: string;
  refreshToken: string;
  userId: string;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null; // access token
  refreshToken: string | null; // refresh token
  userId: string | null;
  isAuthenticated: boolean;
  login: (user: UserProfile, loginData: LoginData) => void;
  logout: () => void;
  resetSplashStates: () => void;
  updateTokens: (token: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      userId: null,
      isAuthenticated: false,
      login: (user: UserProfile, loginData: LoginData) => {
        set({ 
          user, 
          token: loginData.token, 
          refreshToken: loginData.refreshToken,
          userId: loginData.userId,
          isAuthenticated: true 
        });
      },
      logout: () => {
        set({ 
          user: null, 
          token: null, 
          refreshToken: null,
          userId: null,
          isAuthenticated: false 
        });
      },
      resetSplashStates: () => {
        // This will be called from components to reset splash-related states
        // The actual state reset happens in the component, this is just a trigger
      },
      updateTokens: (token: string, refreshToken: string) => {
        set({ token, refreshToken });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
