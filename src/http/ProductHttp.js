import { $authHost } from "./index";

export const getProducts = async () => {
  const res = await $authHost.get("/api/product");
  return res.data;
};

export const addProduct = async (data) => {
  const res = await $authHost.post("/api/product/admin/add", data);
  return res.data;
};

export const activeProduct = async (data) => {
  const res = await $authHost.put("/api/product/admin/active-product", data);
  return res.data;
};

export const edditProduct = async (data) => {
  const res = await $authHost.put("/api/product/admin/eddit-product", data);
  return res.data;
};