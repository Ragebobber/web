import { $authHost } from "./index";

export const getProducts = async () => {
  const res = await $authHost.get("/api/product");
  return res.data;
};

export const addProduct = async (data) => {
  const res = await $authHost.post("/api/product/admin/add", data);
  return res.data;
};

export const activeProduct = async (id) => {
  const res = await $authHost.put("/api/product/admin/active-product/" + id);
  return res.data;
};

export const edditProduct = async (data) => {
  const res = await $authHost.put(
    "/api/product/admin/eddit-product/" + data.id,
    data
  );
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await $authHost.delete("/api/product/admin/delete/" + id);
  return res.data;
};
