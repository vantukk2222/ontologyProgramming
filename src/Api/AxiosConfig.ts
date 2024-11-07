import axios from "axios";
import { AxiosConfig } from "../utils/interface";

const axiosClient = axios.create({
  baseURL: "https://81f8-113-23-5-103.ngrok-free.app/", // Use environment variable or fallback
  headers: {
    "Content-Type": "application/json",
    Accept: "*",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Add the ngrok-skip-browser-warning header
    config.headers["ngrok-skip-browser-warning"] = "true";
    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Handle response data for status codes in the 2xx range
    return response;
  },
  function (error) {
    // Handle response errors for non-2xx status codes
    return Promise.reject(error);
  }
);

export const setHeaderConfigAxios = (token: string | null): void => {
  if (token) {
    (axiosClient.defaults as AxiosConfig).headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete (axiosClient.defaults as AxiosConfig).headers.common["Authorization"];
  }
};

export default axiosClient;
