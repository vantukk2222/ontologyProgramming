import {AuthData } from "../utils/interface";
import axiosClient from "./AxiosConfig";



const apiAuth = {
  login: (data: AuthData) => {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  register: (data: AuthData) => {
    const url = "/register";
    return axiosClient.post(url, data);
  },
};

export default apiAuth;
