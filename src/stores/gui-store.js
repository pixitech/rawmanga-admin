import { create } from "zustand";

export const useGui = create()((set) => ({
	resultSearch: null,
	setResultSearch: (value) => set((state) => ({ ...state, resultSearch: value })),
}));
