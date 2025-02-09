import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRackStore = create(
  persist(
    (set, get) => ({
      rack: [],
      rackSize: 42, // Default size

      setRackSize: (size) => set({ rackSize: size }),
      addItem: (item) => {
        const currentRack = get().rack;
        const totalUsedSlots = currentRack.reduce((sum, i) => sum + i.slots, 0);

        if (totalUsedSlots + item.slots > get().rackSize) {
          throw new Error(
            `Cannot add item. Not enough space in rack. Available: ${
              get().rackSize - totalUsedSlots
            }U, Required: ${item.slots}U`
          );
        }

        set({ rack: [...currentRack, item] });
      },
      removeItem: (item) =>
        set((state) => ({ rack: state.rack.filter((i) => i !== item) })),
      clearRack: () => set({ rack: [] }),
      editItem: (item, newItem) =>
        set((state) => ({
          rack: state.rack.map((i) => (i === item ? newItem : i)),
        })),
    }),
    {
      name: "rack-storage", // unique name for localStorage key
    }
  )
);

export default useRackStore;
