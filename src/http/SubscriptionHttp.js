import { $authHost } from "./index";

export const activeSubscription = async ({ id }) => {
  const res = await $authHost.post("/api/sub/admin/active-sub", { id });
  return res.data;
};
