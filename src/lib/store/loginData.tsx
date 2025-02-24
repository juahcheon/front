import { create } from "zustand";

// 상태와 액션을 정의하는 인터페이스
interface WorkSpaceState {
  data: any;
  setData: (data: any) => void;
}

const useLoginData = create<WorkSpaceState>((set) => ({
  data: {}, // 초기 상태
  setData: (text) => set({ data: text }), // 상태 업데이트
}));

export default useLoginData;
