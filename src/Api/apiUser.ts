import { UserCreate, UserData } from "../utils/interface";
import axiosClient from "./AxiosConfig";


const apiUser = {
    getAllUser: () => {
        const url = `/user/get-all-users`;
        return axiosClient.get(url);
    },
    getByID: (idUser: string) => {
        const url = `/user/get-user/${idUser}`;
        return axiosClient.get(url);
    },
    changePassword: (idUser: string, data: {old_password: string, new_password: string}) => {
        const url = `/user/change-password/${idUser}`;
        return axiosClient.put(url, data);
    },
    putByID: (idUser: string, data: UserData) => {
        const url = `/user/update-user/${idUser}`;
        return axiosClient.put(url, data);
    },
    postNewUser: (data: UserCreate) => {
        const url = `/user/add-user`;
        return axiosClient.post(url, data);
    },
    deleteUser: (idUser: string) => {
        const url = `/user/delete-user/${idUser}`;
        return axiosClient.delete(url);
    }
   

};


export default apiUser;
