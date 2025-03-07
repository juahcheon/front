import { instance } from "./axios";

export const getCheckList = async (id: any) => {
  try {
    const res = await instance.get(`/checklist/assigned?memberId=${id}`);
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const postCheckListCreate = async (data: any) => {
  try {
    const res = await instance.post("/checklist", data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
