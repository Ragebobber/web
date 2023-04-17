import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  if (localStorage.getItem("accessToken") !== "undefined")
    config.headers.authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
  else localStorage.removeItem("accessToken");
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
