import apiCourse from "../Api/apiCourse";

// Utils function for searching courses
export const searchCourses = async (searchParams: { page: number; limit: number }) => {
    try {
        const response = await apiCourse.search(searchParams);
        return response.data;
    } catch (error) {
        console.error("Error searching courses:", error);
        throw error;
    }
};

export const getCourseByID = async (ID: string) => {
    try {
        const response = await apiCourse.getByID(ID);
        return response.data;
    } catch (error) {
        console.error("Error getting course by ID:", error);
        throw error;
    }
};

export const addNewCourse = async (courseData: {
    ns0__hocKy: number;
    ns0__laMonTuChon: boolean;
    ns0__maMonHoc: string;
    ns0__soTinChi: number;
    rdfs__label: string;
}) => {
    try {
        const response = await apiCourse.addCourse(courseData);
        return response.data;
    } catch (error) {
        console.error("Error adding new course:", error);
        throw error;
    }
};

export const updateExistingCourse = async (courseData: {
    ns0__hocKy: number;
    ns0__laMonTuChon: boolean;
    ns0__maMonHoc: string;
    ns0__soTinChi: number;
    rdfs__label: string;
}) => {
    try {
        const response = await apiCourse.updateCourse(courseData);
        return response.data;
    } catch (error) {
        console.error("Error updating course:", error);
        throw error;
    }
};
