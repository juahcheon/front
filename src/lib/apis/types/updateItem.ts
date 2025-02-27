import { instance } from "../axios";

export interface UpdateItemPayload {
  checklistId: number;
  id: number; 
  largeCatItemId: number;
  title: string;
  dueDate: string;
  assigneeName: string;
  body: string;
  statusName: string;
  amount: number;
}

export const updateItem = async (data: UpdateItemPayload) => {
  try {
    const res = await instance.patch(`/checklist/large-cat-item/small-cat-Item/update-item`, data);
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};