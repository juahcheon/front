import { create } from "zustand";
import { LargeCatItem, SmallCatItem } from "../apis/types/types";
import { getCard, getMember } from "../apis/workSpace";

interface WorkSpaceState {
  checklistId: number;
  card: any[];
  cardId: number;
  cardLength: number;
  memberData: any;
  selectLargeItem: LargeCatItem | null;
  selectedItem: SmallCatItem | null;
  sideMenuValue: any;
  setChecklistId: (id: number) => void;
  setCard: (card: any[]) => void;
  setCardId: (id: number) => void;
  setCardLength: (length: number) => void;
  setMemberData: (data: any) => void;
  setSelectLargeItem: (item: LargeCatItem | null) => void;
  setSelectedItem: (item: SmallCatItem | null) => void;
  setSideMenuValue: (value: any) => void;
  fetchCardData: (cardId: number) => Promise<void>;
  fetchMemberData: (cardId: number) => Promise<void>;
}

export const useWorkSpaceStore = create<WorkSpaceState>((set, get) => ({
  checklistId: 1,
  card: [],
  cardId: 1,
  cardLength: 0,
  memberData: null,
  selectLargeItem: null,
  selectedItem: null,
  sideMenuValue: null,
  setChecklistId: (id) => set({ checklistId: id }),
  setCard: (card) => set({ card }),
  setCardId: (id) => set({ cardId: id }),
  setCardLength: (length) => set({ cardLength: length }),
  setMemberData: (data) => set({ memberData: data }),
  setSelectLargeItem: (item) => set({ selectLargeItem: item }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setSideMenuValue: (value) => set({ sideMenuValue: value }),
  fetchCardData: async (cardId) => {
    const data = await getCard(cardId, "");
    set({ card: data });
    set({ sideMenuValue: data });
  },
  fetchMemberData: async (cardId) => {
    const data = await getMember(cardId);
    set({ memberData: data });
  },
}));
