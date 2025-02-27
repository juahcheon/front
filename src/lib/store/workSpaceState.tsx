import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 상태와 액션을 정의하는 인터페이스
interface WorkSpaceState {
  data: any;
  setData: (data: any) => void;
}

// 브라우저 환경에서만 사용할 수 있는 커스텀 스토리지
const customStorage = {
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(name);
    }
  }
};

const useLoginData = create<WorkSpaceState>()(
  persist(
    (set) => ({
      data: null, // 초기 상태는 null로 설정
      setData: (data) => set({ data }), // 상태 업데이트
    }),
    {
      name: "login-storage", // 로컬 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => customStorage),
    }
  )
);

export default useLoginData;