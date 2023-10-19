import { create } from "zustand";

export const useNavigationStore = create((set) => ({
  navState: "",
  setNavState: async (navState: any) => {
    set({ navState });
  },
}));
