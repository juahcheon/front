import { instance } from "./axios";

export const getMyData = async () => {
  try {
    const res = await instance.get("/auth/me");
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
export const getMyToken = async () => {
  try {
    const res = await instance.get("/auth/regenerate-token");
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
