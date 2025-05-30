import { create } from "zustand";

interface IDrawerStore {
  isOpen: boolean;
  toggle: (currIsOpen?: boolean) => void;
}

export const useDrawerStore = create<IDrawerStore>((set) => ({
  isOpen: false,
  toggle: (currIsOpen?: boolean) =>
    set((state) => ({ isOpen: currIsOpen ?? !state.isOpen })),
}));
