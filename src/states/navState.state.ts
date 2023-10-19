import { create } from "zustand";

export const useNavigationStore = create((set) => ({
  navState: "mints",
  setNavState: async (navState: any) => {
    set({ navState });
  },
}));
