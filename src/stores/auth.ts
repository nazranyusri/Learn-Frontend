import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';

const AUTH_STORAGE_KEY = 'auth-storage';

// Mobile application use this
const nativeStorage: StateStorage = {
  getItem: (name) => SecureStore.getItemAsync(name),
  setItem: (name, value) => SecureStore.setItemAsync(name, value),
  removeItem: (name) => SecureStore.deleteItemAsync(name),
};

const authStorage: StateStorage =
  Platform.OS === 'web'
    ? {
        getItem: (name) => localStorage.getItem(name),
        setItem: (name, value) => localStorage.setItem(name, value),
        removeItem: (name) => localStorage.removeItem(name),
      }
    : nativeStorage;

function isTokenValid(accessToken: string) {
  try {
    const payload = jwtDecode<JwtPayload>(accessToken);

    return typeof payload.exp === 'number' && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      hasHydrated: false,
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setAccessToken: (accessToken) => {
        if (!isTokenValid(accessToken)) {
          throw new Error('The access token is missing or expired');
        }

        set({ accessToken, isAuthenticated: true });
      },
      logout: () => set({ accessToken: null, isAuthenticated: false }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => authStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state?.accessToken && isTokenValid(state.accessToken)) {
          state.setAuthenticated(true);
        } else {
          state?.logout();
        }

        state?.setHasHydrated(true);
      },
    },
  ),
);
