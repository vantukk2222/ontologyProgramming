import axiosClient from "./AxiosConfig";
interface SearchParams {
    page: number;
    limit: number;
}

const apiCourse = {
    search: (search: SearchParams) => {
        const url = `/courses?page=${search.page}&limit=${search.limit}`;
        return axiosClient.get(url);
    },
    getByID: (ID: string) => {
        const url = "/courses/" + ID;
        return axiosClient.get(url);
    },
    addCourse: (data: any) => {
        const url = "/courses";
        return axiosClient.post(url, data);
    },
    updateCourse: (data: any) => {
        const url = "/courses";
        return axiosClient.put(url, data);
    }
};


export default apiCourse;
