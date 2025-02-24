import { create } from "zustand";

// 상태와 액션을 정의하는 인터페이스
interface WorkSpaceState {
  sideMenuState: boolean;
  setSideMenuState: (text: boolean) => void;
}

const useSideMenuStore = create<WorkSpaceState>((set) => ({
  sideMenuState: true, // 초기 상태
  setSideMenuState: (text) => set({ sideMenuState: text }), // 상태 업데이트
}));

export default useSideMenuStore;
