import { create } from "zustand";

export interface ZustandStoreState {
  count: number;
  increaseCounter: () => void;
}
export const useZustandStore = create<ZustandStoreState>()((set) => ({
  count: 0,
  increaseCounter: () => set((state) => ({count: state.count + 1}))
}))
