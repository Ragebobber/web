import { $authHost } from "./index";

export const activeSubscription = async ({ id }) => {
  const res = await $authHost.put("/api/sub/admin/active-sub/" + id);
  return res.data;
};

export const addUserSubscription = async (data) => {
  const res = await $authHost.post("/api/sub/admin/add-sub", data);
  return res.data;
};
