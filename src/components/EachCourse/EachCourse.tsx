import React, { useEffect, useState } from "react";
import findTienQuyetRelation from "../../utils/findRelation";
import { deleleCourseByID, updateExistingCourse } from "../../utils/utilsCourse";
import { toast } from "react-toastify";
import { addRelationToCourse, deleteRelationByID, getEligibleRelations, updateRelationByID } from "../../utils/utilsRelation";
import { Loading } from "../Loading/Loading";
import { CourseEach, CourseRelation, CourseRelationsData, EachCourseProps } from "../../utils/interface";


const EachCourse: React.FC<EachCourseProps> = (props) => {
    // const { onClose, onSave, onDelete, isOpen, Course } = props;
    const { onClose, isOpen, Course, role } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState<CourseEach>({
        course_id: '',
        ns0__hocKy: 0,
        ns0__laMonTuChon: false,
        ns0__maMonHoc: '',
        ns0__soTinChi: 0,
        rdfs__label: '',
        relations: []
    });

    const [allCourses, setAllCourses] = useState<CourseRelationsData>();

    // useEffect(() => {
    //     if (Course) {
    //         setFormData({
    //             ...Course,
    //             relations: [
    //                 { relation_type: "ns0__tienQuyet", rdfs__label: "", relation_id: "" },
    //                 { relation_type: "ns0__hocTruoc", rdfs__label: "", relation_id: "" },
    //                 { relation_type: "ns0__songHanh", rdfs__label: "", relation_id: "" },
    //                 ...Course.relations
    //             ].filter((v, i, a) => a.findIndex(t => (t.relation_type === v.relation_type)) === i)
    //         });
    //     }
    // }, [Course]);
    useEffect(() => {
        if (Course) {
            setFormData({
                ...Course,
                relations: [
                    ...Course.relations.filter(r => r.relation_type === "ns0__tienQuyet"), // Giữ tất cả giá trị của ns0__tienQuyet
                    ...Course.relations.filter(r => r.relation_type === "ns0__hocTruoc"), // Giữ tất cả giá trị của ns0__hocTruoc
                    ...Course.relations.filter(r => r.relation_type === "ns0__songHanh"), // Giữ tất cả giá trị của ns0__songHanh
                    ...Course.relations.filter(r => r.relation_type === "ns0__coNoiDung"), // Giữ tất cả giá trị của ns0__coNoiDung nếu cần
                    ...Course.relations.filter(r => r.relation_type === "rdf__type")
                ]
            });
        }
    }, [Course]);
    const addNewSongHanh = () => {
        setFormData(prevData => ({
            ...prevData,
            relations: [
                ...prevData.relations,
                { rdfs__label: "", relation_id: "", relation_type: "ns0__songHanh", target_id: "" }
            ]
        }));
    };
    const addNewTienQuyet = () => {
        setFormData(prevData => ({
            ...prevData,
            relations: [
                ...prevData.relations,
                { rdfs__label: "", relation_id: "", relation_type: "ns0__tienQuyet", target_id: "" }
            ]
        }));
    }
    const addNewHocTruoc = () => {
        setFormData(prevData => ({
            ...prevData,
            relations: [
                ...prevData.relations,
                { rdfs__label: "", relation_id: "", relation_type: "ns0__hocTruoc", target_id: "" }
            ]
        }));
    }
    useEffect(() => {
    }, [formData]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await getEligibleRelations(Course.course_id).then((response) => {
                    setIsLoading(false);
                    setAllCourses(response);
                });

            } catch (error) {
                toast.error("Lỗi server: " + error);
            }
        };
        if(role === "admin") {
            fetchData();
        }
    }, []);
    console.log("formData", formData);
    console.log("course", Course);
    function hasCourseChanged(course: CourseEach, formData: CourseEach): boolean {
        // Kiểm tra các thuộc tính riêng lẻ
        if (
            course.ns0__hocKy !== formData.ns0__hocKy ||
            course.ns0__laMonTuChon !== formData.ns0__laMonTuChon ||
            course.ns0__soTinChi !== formData.ns0__soTinChi ||
            course.rdfs__label !== formData.rdfs__label
        ) {
            return true;
        }
        return false;
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index: number) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        let selectedCourse: CourseRelation | undefined;

        if (allCourses) {
            selectedCourse = [
                ...allCourses.ns0__hocTruoc,
                ...allCourses.ns0__songHanh,
                ...allCourses.ns0__tienQuyet
            ].find(course => course.rdfs__label === value);
        }

        setFormData((prevData) => {
            if (name === "rdfs__label") {
                return {
                    ...prevData,
                    rdfs__label: value
                };
            }
            else if (name === "ns0__tienQuyet" || name === "ns0__hocTruoc" || name === "ns0__songHanh") {
                return {
                    ...prevData,
                    relations: prevData.relations.map((relation) => {
                        // Tìm vị trí của relation cần cập nhật trong mảng gốc
                        const filteredRelations = prevData.relations.filter(r => r.relation_type === name);
                        const filteredIndex = filteredRelations.findIndex((r, fi) => r === relation && fi === index);

                        // Nếu khớp với relation_type và đúng filteredIndex, thì cập nhật
                        if (relation.relation_type === name && filteredIndex === index) {
                            return {
                                ...relation,
                                rdfs__label: value,
                                relation_id: relation.relation_id || "",
                                target_id: selectedCourse ? selectedCourse.course_id : relation.target_id
                            };
                        }
                        return relation; // Giữ nguyên relation khác
                    })
                };
            }
             else if (name === "ns0__coNoiDung") {
                return {
                    ...prevData,
                    relations: prevData.relations.map((relation) =>
                        relation.relation_type === name
                            ? {
                                ...relation,
                                rdfs__label: value,
                                relation_id: relation.relation_id || "",
                                target_id: selectedCourse ? selectedCourse.course_id : relation.target_id
                            }
                            : relation
                    )
                };
            } 
            else {
                return {
                    ...prevData,
                    [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value
                };
            }
        });
    };
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true);
        if (Course && formData) {
            const modifiedRelations = formData.relations.filter((updatedRelation) => {
                const originalRelation = Course.relations.find(
                    (relation) => relation.relation_type === updatedRelation.relation_type
                );
                return (
                    !originalRelation ||
                    originalRelation.rdfs__label !== updatedRelation.rdfs__label ||
                    originalRelation.relation_id !== updatedRelation.relation_id ||
                    originalRelation.target_id !== updatedRelation.target_id
                );
            });
            const changeCourse = hasCourseChanged(Course, formData);

            if (changeCourse) {
                console.log("typeof hocky: ", typeof formData.ns0__hocKy);
                updateExistingCourse(Course.course_id, formData).then(() => {
                    setTimeout(() => {
                    }, 500);
                }).catch((error) => {
                    setTimeout(() => {
                    }, 500);
                    toast.error("Cập nhật môn học thất bại!!! " + error);
                })
            }

            const promises = modifiedRelations.map((relation) => {
                const relationData = { relation_type: relation.relation_type, target_id: relation.target_id };

                if (relation.relation_id && relation.rdfs__label && relation.target_id) {
                    return updateRelationByID(relation.relation_id, relationData);
                }
                if (relation.relation_id === "" && relation.rdfs__label && relation.target_id) {
                    return addRelationToCourse(Course.course_id, { relations: [relationData] });
                }
                if (relation.relation_id && relation.rdfs__label === "") {
                    return deleteRelationByID(relation.relation_id);
                }
                return null
            });
            Promise.all(promises)
                .then(() => {
                    setIsLoading(false);
                    toast.success("Tất cả quan hệ đã được cập nhật thành công");
                    if (onClose)
                        onClose();
                    setTimeout(() => {
                        // window.location.reload();
                    }, 1500);
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error("Cập nhật quan hệ thất bại!!! " + error);
                });
        }

    }
    const confirmDelete = () => {
        setIsDeleting(false);
        setIsLoading(true);
        if (Course) {
            deleleCourseByID(Course.course_id)
                .then(() => {
                    setIsLoading(false);
                    toast.success("Xóa môn học thành công");
                    if (onClose)
                        onClose();
                    setTimeout(() => {
                        // window.location.reload();
                    }, 1500);
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error("Xóa môn học thất bại!!! " + error);
                });
        }
    }
    const handleDelete = () => {
        setIsDeleting(true);
    };
    if (!isOpen) {
        return null;
    }
    return (
        <>

            <div id="default-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden shadow-md">
                <div className="fixed inset-0 w-full h-full bg-black opacity-30"></div>
                {isLoading && <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <Loading />
                </div>}
                {isDeleting && <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <button type="button" onClick={() => { setIsDeleting(false) }} className="text-gray-800 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="#1a202c" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            <p className="mb-4 text-gray-500 dark:text-gray-300">Bạn có chắc muốn xoá môn học này chứ?</p>
                            <div className="flex justify-center items-center space-x-4">
                                <button data-modal-toggle="deleteModal" onClick={() => { setIsDeleting(false) }} type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    Không, hủy bỏ.
                                </button>
                                <button type="submit" onClick={() => { confirmDelete() }} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    Có, tôi chắc chắn.
                                </button>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className="relative p-4 w-full max-w-2xl max-h-full shadow-lg">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {findTienQuyetRelation(formData?.relations, "rdf__type")?.rdfs__label || "Loading..."}
                            </h3>
                            <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <form className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Mã HP:</label>
                                    <input
                                        type="text"
                                        name="ns0__maMonHoc"
                                        disabled={true}
                                        value={formData?.ns0__maMonHoc}
                                        onChange={(e) => handleChange(e, 0)}
                                        className={(role === "admin" ? "bg-gray-200 " : "") + "w-full px-3 py-2 border border-gray-300 rounded-md"}
                                        placeholder="Nhập mã học phần"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tên học phần:</label>
                                    <input
                                        type="text"
                                        name="rdfs__label"
                                        disabled={role === "admin" ? false : true}
                                        value={formData?.rdfs__label || ""}
                                        onChange={(e) => handleChange(e, 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Học kỳ:</label>
                                    <input
                                        type="number"
                                        name="ns0__hocKy"
                                        disabled={role === "admin" ? false : true}
                                        value={formData?.ns0__hocKy}
                                        onChange={(e) => handleChange(e, 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Nhập học kỳ"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Số tín chỉ:</label>
                                    <input
                                        type="number"
                                        name="ns0__soTinChi"
                                        disabled={role === "admin" ? false : true}
                                        value={formData?.ns0__soTinChi}
                                        onChange={(e) => handleChange(e, 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Nhập số tín chỉ"
                                    />
                                </div>
                                <div className="flex items-center space-x-2 pt-5">
                                    <label className="text-sm font-medium">Tự chọn</label>
                                    <input
                                        type="checkbox"
                                        name="ns0__laMonTuChon"
                                        disabled={role === "admin" ? false : true}
                                        checked={formData.ns0__laMonTuChon}
                                        onChange={(e) => handleChange(e, 0)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                                </div>
                            </form>
                            <form className="space-y-4">
                                <div className="flex flex-col items-start space-x-2 pt-5">
                                    <label className="block text-sm font-medium mb-1">Nội dung:</label>
                                    <textarea
                                        name="ns0__coNoiDung"
                                        value={findTienQuyetRelation(formData?.relations, "ns0__coNoiDung")?.rdfs__label || ""}
                                        disabled={role === "admin" ? false : true}
                                        onChange={(e) => handleChange(e, 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        rows={4}
                                        placeholder={role === "admin" ? "Nhập nội dung" : ""}
                                    />
                                </div>
                            </form>

                        </div>
                        <div className="p-4 md:p-5">
                            {role === "admin" && <form className="space-y-4">

                                {(allCourses?.ns0__tienQuyet?.length ?? 0) > 0 &&
                                    <div> <label className="block text-sm font-medium mb-1">Tiên quyết:</label>
                                        {formData?.relations
                                            .filter(relation => relation.relation_type === "ns0__tienQuyet")
                                            .map((relation, index) => (
                                                <select
                                                    key={index} // Sử dụng index làm key để React nhận diện mỗi select box
                                                    name="ns0__tienQuyet"
                                                    value={relation.rdfs__label || ""}
                                                    onChange={(e) => handleChange(e, index)} // Truyền index để phân biệt mỗi `select box`
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                                    required
                                                >
                                                    <option value="">Chọn tiên quyết</option>
                                                    {allCourses?.ns0__tienQuyet?.map((course) => (
                                                        <option key={course.course_id} value={course.rdfs__label}>{course.rdfs__label}</option>
                                                    ))}
                                                </select>
                                            ))
                                        }

                                        <button
                                            type="button"
                                            onClick={addNewTienQuyet}
                                            className="mt-2 text-blue-500 hover:text-blue-700"
                                        >
                                            + Thêm tiên quyết
                                        </button>
                                    </div>
                                }
                                {(allCourses?.ns0__hocTruoc?.length ?? 0) > 0 &&
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Học trước:</label>
                                        {formData?.relations
                                            .filter(relation => relation.relation_type === "ns0__hocTruoc")
                                            .map((relation, index) => (
                                                <select
                                                    key={`hocTruoc-${index}`}
                                                    name="ns0__hocTruoc"
                                                    value={relation.rdfs__label || ""}
                                                    onChange={(e) => handleChange(e, index)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                                    required
                                                >
                                                    <option value="">Chọn học trước</option>
                                                    {allCourses?.ns0__hocTruoc?.map((course) => (
                                                        <option key={course.course_id} value={course.rdfs__label}>{course.rdfs__label}</option>
                                                    ))}
                                                </select>
                                            ))
                                        }
                                        <button
                                            type="button"
                                            onClick={addNewHocTruoc}
                                            className="mt-2 text-blue-500 hover:text-blue-700"
                                        >
                                            + Thêm học trước
                                        </button>
                                    </div>
                                }
                                {(allCourses?.ns0__songHanh?.length ?? 0) > 0 &&
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Song hành:</label>
                                        {formData.relations
                                            .filter(relation => relation.relation_type === "ns0__songHanh")
                                            .map((relation, index) => (
                                                <select
                                                    key={`songHanh-${index}`}
                                                    name="ns0__songHanh"
                                                    value={relation.rdfs__label || ""}
                                                    onChange={(e) => handleChange(e, index)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                                                    required
                                                >
                                                    <option value="">Chọn song hành</option>
                                                    {allCourses?.ns0__songHanh?.map(course => (
                                                        <option key={course.course_id} value={course.rdfs__label}>
                                                            {course.rdfs__label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ))}

                                        {/* Nút thêm mới Song hành nếu chưa có */}
                                        <button
                                            type="button"
                                            onClick={addNewSongHanh}
                                            className="mt-2 text-blue-500 hover:text-blue-700"
                                        >
                                            + Thêm Song hành
                                        </button>
                                    </div>
                                }
                            </form>}
                        </div>
                        {role === "admin" && <form onSubmit={handleSubmit} className="space-y-4 space-x-4 pb-4">
                            <button
                                data-modal-hide="default-modal"
                                type="submit" // Chuyển thành submit
                                className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Lưu
                            </button>
                            <button
                                data-modal-hide="default-modal"
                                type="button" // Để button xóa không submit form
                                onClick={() => { handleDelete() }}
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            >
                                Delete
                            </button>
                            <button
                                data-modal-hide="default-modal"
                                type="button"
                                onClick={onClose}
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-2 border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Hủy
                            </button>
                        </form>}

                    </div>
                </div>
            </div>
        </>

    );
};

export default EachCourse;