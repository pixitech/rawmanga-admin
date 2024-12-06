import { create } from "zustand";

export const checkModal = create()((set) => ({
	stickyMenu: null,
	setSticky: (value) => set((state) => ({ ...state, stickyMenu: value })),
}));
