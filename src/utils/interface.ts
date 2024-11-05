export interface InforUser {
    elementID: string;
    message: string;
    role: string;
    username: string;
    password: string;
}
export interface AuthData {
    username: string;
    password: string;
}
export interface ProfileData {
    user: UserData
}
export interface UserData {
    birth_date: string,
    email: string,
    name: string
    role: string,
    student_id: string,
    user_id: string,
    username: string,
}
export interface UserCreate {
    birth_date: string,
    email: string,
    name: string
    role: string,
    student_id: string,
    username: string,
    password: string
}

export interface ApiAuth {
    login: (data: AuthData) => Promise<{
        elementID: string;
        message: string;
        role: string;
        username: string;
    }>;
    register: (data: AuthData) => Promise<{
        elementID: string;
        message: string;
        role: string;
        username: string;
    }>;
}
export interface SearchParams {
    page: number;
    limit: number;
}
export interface AxiosConfig {
    headers: {
        common: {
            Authorization?: string;
        };
    };
}
export interface AlertComponentProps {
    onConfirm: () => void;
    content: string;
    onCancel?: () => void;
    type: "danger" | "success" | "warning";
}
export interface EachCourseProps {
    onClose?: () => void;
    onSave?: () => void;
    onDelete?: () => void;
    isOpen?: boolean;
    Course: CourseEach;
    role: string | null;
}
export interface AddEachCourseProps {
    onClose?: () => void;
    isOpen?: boolean;
    role: string | null;
}
export interface TableProps {
    role: string | null;
}
export interface CourseEach {
    course_id: string;
    ns0__hocKy: number;
    ns0__laMonTuChon: boolean;
    ns0__maMonHoc: string;
    ns0__soTinChi: number;
    rdfs__label: string;
    relations: Array<{
        rdfs__label: string;
        relation_id: string;
        relation_type: string;
        target_id: string;
    }>;
}
export interface AddCourseEach {
    ns0__hocKy: number;
    ns0__laMonTuChon: boolean;
    ns0__maMonHoc: string;
    ns0__soTinChi: number;
    rdfs__label: string;
}
export interface CourseRelation {
    course_id: string;
    ns0__maMonHoc: string;
    rdfs__label: string;
}

// Interface chính để chứa các danh sách quan hệ
export interface CourseRelationsData {
    ns0__hocTruoc: CourseRelation[];
    ns0__songHanh: CourseRelation[];
    ns0__tienQuyet: CourseRelation[];
}

export interface AuthContextType {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    user: object;
    setUser: React.Dispatch<React.SetStateAction<object>>;
}


export const DataMajor = [
    {
        rdfs__label: "Môn chuyên ngành",
        target__id: "4:e33d50a5-f668-425e-b2d8-a6a2f521b315:134",
        relation__type:"rdf__type"
    },
    {
        rdfs__label: "Môn CN Hệ Thông Thông Tin",
        target__id: "4:e33d50a5-f668-425e-b2d8-a6a2f521b315:45",
        relation__type:"rdf__type"
    },
    {
        rdfs__label: "Môn CN An Toàn Thông Tin",
        target__id: "4:e33d50a5-f668-425e-b2d8-a6a2f521b315:154",
        relation__type:"rdf__type"
    },
    {
        rdfs__label: "Môn học",
        target__id: "4:e33d50a5-f668-425e-b2d8-a6a2f521b315:155",
        relation__type:"rdf__type"
    },
    {
        rdfs__label: "Đại cương ngành",
        target__id: "4:e33d50a5-f668-425e-b2d8-a6a2f521b315:105",
        relation__type:"rdf__type"
    },
    {
        rdfs__label: "Đại cương",
        target__id: "4:e33d50a5-f668-425e-b2d8-a6a2f521b315:165",
        relation__type:"rdf__type"
    },
    {
        rdfs__label: "Giáo dục quốc phòng",
        target__id: "4:e33d50a5-f668-425e-b2d8-a6a2f521b315:203",
        relation__type:"rdf__type"
    },
    {
        rdfs__label: "Đồ án",
        target__id: "4:e33d50a5-f668-425e-b2d8-a6a2f521b315:210",
        relation__type:"rdf__type"
    },
    {
        rdfs__label: "Môn CN Công Nghệ Phần Mềm",
        target__id: "4:e33d50a5-f668-425e-b2d8-a6a2f521b315:118",
        relation__type:"rdf__type"
    }

]