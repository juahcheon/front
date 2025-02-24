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

export interface UpdateItemResponse {
  id: number;
  largeCatItemId: number;
  title: string;
  dueDate: string;
  assigneeName: string;
  body: string;
  statusName: string;
  amount: number;
}

export const updateItem = async (payload: UpdateItemPayload): Promise<UpdateItemResponse> => {
  try {
    const res = await instance.patch(`/checklist/large-cat-item/small-cat-Item/update-item`, payload);
    const completeData = {
      ...res.data,
      body: res.data.body || payload.body,
      amount: res.data.amount ?? payload.amount,
      assigneeName: res.data.assigneeName || payload.assigneeName
    };
    return completeData;
  } catch (e) {
    console.error(e);
    throw e;
  }
};