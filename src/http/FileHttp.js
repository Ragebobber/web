import { $authHost } from "./index";

export const addFile = async (data) => {
  const res = await $authHost.post("/api/file/admin/add", data);
  return res.data;
};

export const downloadClient = async () => {
  return await $authHost.get("/api/file/downloads/client", {
    responseType: "blob",
  });
};
