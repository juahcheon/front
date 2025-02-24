import { instance } from "../axios";

export const deleteItem = async (checklistId: number, largeCatItemId: number, smallCatItemId: number) => {
  try {
    const res = await instance.patch(`/checklist/large-cat-item/small-cat-Item/delete-item?checklistId=${checklistId}&largeCatItemId=${largeCatItemId}&smallCatItemId=${smallCatItemId}`);

    return res.data;
  } catch (e: any) {
    if (e.response) {
      console.error('Error response:', {
        data: e.response.data,
        status: e.response.status,
        headers: e.response.headers
      });
    }
    throw e;
  }
};