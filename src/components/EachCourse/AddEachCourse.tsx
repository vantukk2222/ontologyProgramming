import React, { useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { AddCourseEach, AddEachCourseProps, DataMajor } from "../../utils/interface";
import { addNewCourse } from "../../utils/utilsCourse";
import { toast } from "react-toastify";
import { addRelationToCourse } from "../../utils/utilsRelation";
const AddEachCourse: React.FC<AddEachCourseProps> = (props) => {
    const { onClose, isOpen, role } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<AddCourseEach>({
        ns0__hocKy: 0,
        ns0__laMonTuChon: false,
        ns0__maMonHoc: '',
        ns0__soTinChi: 0,
        rdfs__label: '',
    });
    const [rdftypeRelation, setRDFTypeRelation] = useState({ relation_type: "", target_id: "" });
    useEffect(() => {
    }, [formData]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prevData) => {
            if (name === "rdfs__label") {
                return {
                    ...prevData,
                    rdfs__label: value
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
    const handleChangeRelation = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRDFTypeRelation({
            relation_type: name,
            target_id: value
        });
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true);
        if (formData) {
            addNewCourse(formData).then((result) => {
                if (result) {
                    toast.success("Thêm môn học thành công.");
                    addRelationToCourse(result.course.course_id, { relations: [rdftypeRelation] }).then(() => {
                        setTimeout(() => {
                            toast.success("Thêm quan hệ thành công");
                            setIsLoading(false);
                            if (onClose)
                                onClose();
                        }, 500);
                    }).catch((error) => {
                        setTimeout(() => {
                            setIsLoading(false);
                            toast.error("Thêm phụ thuộc thất bại!!! " + error);
                            if (onClose)
                                onClose();
                        }, 500);
                    })
                }
            }
            ).catch((error) => {
                setTimeout(() => {
                    setIsLoading(false);
                    toast.error("Thêm môn học thất bại!!! " + error);
                    if (onClose)
                        onClose();
                }, 500);
                // toast.error("Thêm môn học thất bại!!! " + error);
            })
            // updateExistingCourse(Course.course_id, formData).then(() => {
            //     setTimeout(() => {
            //     }, 500);
            // }).catch((error) => {
            //     setTimeout(() => {
            //     }, 500);
            //     toast.error("Cập nhật môn học thất bại!!! " + error);
            // })

        }

    }

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
                <div className="relative p-4 w-full max-w-2xl max-h-full shadow-lg">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <div className="flex flex-row">
                                <h1 className="px-4 py-2 w-[12rem]">
                                    Thuộc loại học phần
                                </h1>
                                <select
                                    name="rdf__type"
                                    required
                                    onChange={handleChangeRelation}
                                    className="text-xl font-semibold text-gray-900 dark:text-white"
                                >
                                    <option value="">Chọn loại học phần</option>
                                    {DataMajor.map((item, index) => {
                                        return <option key={index} value={item.target__id}>{item.rdfs__label}</option>

                                    })}

                                </select>
                            </div>
                            <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Mã HP:</label>
                                    <input
                                        type="text"
                                        required
                                        name="ns0__maMonHoc"
                                        value={formData?.ns0__maMonHoc}
                                        onChange={handleChange}
                                        className={"w-full px-3 py-2 border border-gray-300 rounded-md"}
                                        placeholder="Nhập mã học phần"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tên học phần:</label>
                                    <input
                                        type="text"
                                        required
                                        name="rdfs__label"
                                        disabled={role === "admin" ? false : true}
                                        value={formData?.rdfs__label || ""}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Học kỳ:</label>
                                    <input
                                        type="number"
                                        required
                                        name="ns0__hocKy"
                                        disabled={role === "admin" ? false : true}
                                        value={formData?.ns0__hocKy}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Nhập học kỳ"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Số tín chỉ:</label>
                                    <input
                                        type="number"
                                        required
                                        name="ns0__soTinChi"
                                        disabled={role === "admin" ? false : true}
                                        value={formData?.ns0__soTinChi}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="Nhập số tín chỉ"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm font-medium">Tự chọn</label>
                                    <input
                                        type="checkbox"
                                        required
                                        name="ns0__laMonTuChon"
                                        disabled={role === "admin" ? false : true}
                                        checked={formData.ns0__laMonTuChon}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                                </div>
                                {role === "admin" &&
                                    <div className="space-y-4 space-x-4 pb-4">
                                        <button
                                            data-modal-hide="default-modal"
                                            type="submit" // Chuyển thành submit
                                            className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Thêm mới
                                        </button>
                                        <button
                                            data-modal-hide="default-modal"
                                            type="button"
                                            onClick={onClose}
                                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-2 border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        >
                                            Hủy
                                        </button>
                                    </div>}
                            </form>
                        </div>
                        {/* {role === "admin" &&
                            <form onSubmit={handleSubmit} className="space-y-4 space-x-4 pb-4">
                                <button
                                    data-modal-hide="default-modal"
                                    type="submit" // Chuyển thành submit
                                    className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Thêm mới
                                </button>
                                <button
                                    data-modal-hide="default-modal"
                                    type="button"
                                    onClick={onClose}
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-2 border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Hủy
                                </button>
                            </form>} */}

                    </div>
                </div>
            </div>
        </>

    );
};

export default AddEachCourse;