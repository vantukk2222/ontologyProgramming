import axios from "axios";
import { AxiosConfig } from "../utils/interface";

const axiosClient = axios.create({
  baseURL: "http://192.168.2.53:5000/",
  headers: {
    "Content-Type": "application/json",
    Accept:"*"
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);



export const setHeaderConfigAxios = (token: string | null): void => {
  if (token) {
    (axiosClient.defaults as AxiosConfig).headers.common["Authorization"] = token ? "Bearer " + token : "";
  } else {
    delete (axiosClient.defaults as AxiosConfig).headers.common["Authorization"];
  }
};

export default axiosClient;
