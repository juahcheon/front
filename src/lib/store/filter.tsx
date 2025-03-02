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
  filterBox: { category: [], progressStatus: "", assignee: [] }, // 초기 상태 설정
  setFilterBox: (newFilterBox) => set({ filterBox: newFilterBox }), // 상태 업데이트 함수
}));

export default useFilterStore;
