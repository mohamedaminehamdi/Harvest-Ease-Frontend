import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'farmer' | 'admin' | 'expert';
  farmName?: string;
  location?: string;
  phone?: string;
  bio?: string;
  website?: string;
  picturePath?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthStore {
  // State
  clerkUserId: string | null;
  clerkEmail: string | null;
  isSignedIn: boolean;
  backendToken: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setClerkAuth: (userId: string, email: string) => void;
  setBackendToken: (token: string) => void;
  setUser: (user: User) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetAuth: () => void;

  // Computed
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      clerkUserId: null,
      clerkEmail: null,
      isSignedIn: false,
      backendToken: null,
      user: null,
      isLoading: false,
      error: null,

      // Actions
      setClerkAuth: (userId: string, email: string) =>
        set({
          clerkUserId: userId,
          clerkEmail: email,
          isSignedIn: true,
        }),

      setBackendToken: (token: string) =>
        set({ backendToken: token }),

      setUser: (user: User) =>
        set({ user }),

      setIsLoading: (loading: boolean) =>
        set({ isLoading: loading }),

      setError: (error: string | null) =>
        set({ error }),

      resetAuth: () =>
        set({
          clerkUserId: null,
          clerkEmail: null,
          isSignedIn: false,
          backendToken: null,
          user: null,
          error: null,
        }),

      // Computed
      isAuthenticated: () => {
        const state = get();
        return state.isSignedIn && state.backendToken !== null && state.user !== null;
      },
    }),
    {
      name: 'auth-store',
      // Only persist essential data
      partialize: (state) => ({
        clerkUserId: state.clerkUserId,
        clerkEmail: state.clerkEmail,
        isSignedIn: state.isSignedIn,
        backendToken: state.backendToken,
        user: state.user,
      }),
    }
  )
);
