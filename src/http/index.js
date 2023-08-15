import axios from "axios";
import * as https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //withCredentials: false,
  httpsAgent,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  httpsAgent,
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
