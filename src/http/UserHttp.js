import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (data) => {
  const res = await $host.post("/api/auth/v1/registration", data);

  return res.data;
};

export const login = async (data) => {
  const res = await $host.post("/api/auth/v1/login", data);
  if (res.data.accessToken)
    localStorage.setItem("accessToken", res.data.accessToken);

  return jwtDecode(res.data.accessToken);
};

export const check = async () => {
  const res = await $authHost.get("/api/auth/v1/check");
  localStorage.setItem("accessToken", res.data.accessToken);
  return jwtDecode(res.data.accessToken);
};

export const getUser = async () => {
  const res = await $authHost.get("/api/user");
  return res.data;
};

export const getUserSubs = async () => {
  const res = await $authHost.get("/api/user/subs");
  return res.data;
};

export const getAllUsers = async () => {
  const res = await $authHost.get("/api/user/admin/users");
  return res.data;
};
