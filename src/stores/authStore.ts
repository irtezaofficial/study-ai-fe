import { TokenResponse, UserStatus } from '@Api/ResponseTypes';
import { STORAGE_KEYS } from '@Constants/storage';
import { getItem, setItem } from '@Services/storageService';
import { create } from 'zustand';

interface IAuthStore {
  isAuth: boolean;
  setUserAuthentication: (
    isAuth?: boolean,
    data?: TokenResponse | null,
    redirectTo?: string
  ) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuth: Boolean(getItem(STORAGE_KEYS.TOKEN)),
  setUserAuthentication: (
    isAuth: boolean = false,
    data?: TokenResponse | null,
    redirectTo?: string
  ) => {
    if (data) {
      setItem(STORAGE_KEYS.TOKEN, data);
    }
    set({ isAuth });
  },
}));
