import { create } from "zustand";

export const useWalletStore = create((set) => ({
    walletAddress: "",
    setWalletAddress: async (walletAddress: any) => {
        set({ walletAddress });
    },
}));
