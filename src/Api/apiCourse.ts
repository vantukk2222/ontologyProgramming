import { SearchParams } from "../utils/interface";
import axiosClient from "./AxiosConfig";
interface queryBody {
    query: string
}

const apiCourse = {
    search: (search: SearchParams) => {
        const url = `/courses?page=${search.page}&limit=${search.limit}`;
        return axiosClient.get(url);
    },
    searchByQuery: (query: queryBody ) => {
        const url = `/search`;
        return axiosClient.post(url, query);
    },
    getByID: (ID: string) => {
        const url = "/courses/" + ID;
        return axiosClient.get(url);
    },
    addCourse: (data: any) => {
        const url = "/courses";
        return axiosClient.post(url, data);
    },
    updateCourse: (idCourse: string, data: any) => {
        const url = `/courses/${idCourse}`;
        return axiosClient.put(url, data);
    },
    deleteCourse: (ID: string) => {
        const url = "/courses/" + ID;
        return axiosClient.delete(url);
    },

};


export default apiCourse;
