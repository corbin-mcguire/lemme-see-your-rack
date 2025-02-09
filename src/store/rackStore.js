import { create } from "zustand";

const useRackStore = create((set) => ({
  rack: [],
  addItem: (item) => set((state) => ({ rack: [...state.rack, item] })),
  removeItem: (item) =>
    set((state) => ({ rack: state.rack.filter((i) => i !== item) })),
  clearRack: () => set({ rack: [] }),
  editItem: (item, newItem) =>
    set((state) => ({
      rack: state.rack.map((i) => (i === item ? newItem : i)),
    })),
}));

export default useRackStore;
