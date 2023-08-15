import { $authHost } from "./index";

export const addFile = async (data) => {
  const res = await $authHost.post("/api/file/admin/add", data);
  return res.data;
};
