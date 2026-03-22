import type { PadItem } from "@/lib/types/types";
import { create } from "zustand";

export type PadsState = {
  pads: PadItem[] | null;
};

export type PadsActions = {
  setPads: (pads: PadItem[]) => void;
  updatePad: (padId: string, payload: Partial<PadItem>) => void;
  resetPads: () => void;
};

export type PadsStore = PadsState & PadsActions;

export const emptyPads = Array.from({ length: 9 }, (_, index) => ({
  id: "",
  order: String(index + 1),
  label: `empty`,
  sampleId: null,
}));

const usePadsStore = create<PadsStore>((set) => ({
  pads: emptyPads,
  setPads: (pads) => {
    set({ pads });
  },
  updatePad: (padId, payload) => {
    set((state) => ({
      pads: state.pads?.map((pad) =>
        pad.id === padId ? { ...pad, ...payload } : pad,
      ),
    }));
  },
  resetPads: () => {
    set({ pads: emptyPads });
  },
}));

export default usePadsStore;
