import { create } from "zustand";

interface FilterBox {
  category: any[];
  progressStatus: string;
  assignee: string[];
}

interface WorkSpaceState {
  filterBox: FilterBox;
  setFilterBox: (newFilterBox: FilterBox) => void;
}

const useFilterStore = create<WorkSpaceState>((set) => ({
  filterBox: { category: [], progressStatus: "", assignee: [] },
  setFilterBox: (newFilterBox) => set({ filterBox: newFilterBox }),
}));

export default useFilterStore;
