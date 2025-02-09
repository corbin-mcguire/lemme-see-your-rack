import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRackStore = create(
  persist(
    (set, get) => ({
      rack: [],
      rackSize: 42, // Default size
      totalUsedSlots: 0,

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
        get().updateTotalUsedSlots();
      },
      updateTotalUsedSlots: () => {
        const currentRack = get().rack;
        const totalUsedSlots = currentRack.reduce((sum, i) => sum + i.slots, 0);
        set({ totalUsedSlots });
      },
      removeItem: (itemToRemove) => {
        set((state) => ({
          rack: state.rack.filter((item) => item !== itemToRemove),
        }));
        get().updateTotalUsedSlots();
      },
      clearRack: () => {
        set({ rack: [] });
        get().updateTotalUsedSlots();
      },
      editItem: (item, newItem) => {
        set((state) => ({
          rack: state.rack.map((i) => (i === item ? newItem : i)),
        }));
        get().updateTotalUsedSlots();
      },
      reorderItems: (sourceIndex, destinationIndex) =>
        set((state) => {
          const newRack = Array.from(state.rack);
          const [removed] = newRack.splice(sourceIndex, 1);
          newRack.splice(destinationIndex, 0, removed);
          return { rack: newRack };
        }),
    }),
    {
      name: "rack-storage", // unique name for localStorage key
    }
  )
);

export default useRackStore;
