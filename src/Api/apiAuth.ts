import axiosClient from "./AxiosConfig";

interface AuthData {
  username: string;
  password: string;
}

interface ApiAuth {
  login: (data: AuthData) => Promise<{ token: string }>;
  register: (data: AuthData) => Promise<{ message: string }>;
}

const apiAuth: ApiAuth = {
  login: (data: AuthData) => {
    const url = "/auth/sign-in";
    return axiosClient.post(url, data);
  },
  register: (data: AuthData) => {
    const url = "/auth/sign-up";
    return axiosClient.post(url, data);
  },
};

export default apiAuth;
