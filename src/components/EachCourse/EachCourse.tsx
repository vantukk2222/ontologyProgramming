import React, { useEffect, useState } from "react";

interface EachCourseProps {
    onClose?: () => void;
    onSave?: () => void;
    onDeleted?: () => void;
    isOpen?: boolean;
    Course: any;
}

const EachCourse: React.FC<EachCourseProps> = (props) => {
    const { onClose, onSave, onDelete, isOpen, Course } = props;
    const [eachCourse, setEachCourse] = useState<any>(null);
    // useEffect(() => {
    //     setEachCourse(Course);
    // }, [Course]);
    const [formData, setFormData] = useState({
        hocKy: '',
        maHP: '',
        tenHocPhan: '',
        soTinChi: '',
        tuChon: false,
        tienQuyet: '',
        hocTruoc: '',
        songHanh: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    if (!isOpen) {
        return null;
    }
    return (
        <div id="default-modal" tabIndex={-1} aria-hidden="true" className=" fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {Course?.rdfs__label}
                        </h3>
                        <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Học kỳ:</label>
                                <input
                                    type="text"
                                    name="hocKy"
                                    value={formData?.ns0__hocKy}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Nhập học kỳ"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Mã HP:</label>
                                <input
                                    type="text"
                                    name="maHP"
                                    value={formData?.ns0__maMonHoc}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Nhập mã học phần"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Tên học phần:</label>
                                <input
                                    type="text"
                                    name="tenHocPhan"
                                    value={formData?.rdfs__label}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Nhập tên học phần"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Số tín chỉ:</label>
                                <input
                                    type="number"
                                    name="soTinChi"
                                    value={formData?.ns0__soTinChi}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Nhập số tín chỉ"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="tuChon"
                                    checked={formData.tuChon}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label className="text-sm font-medium">Tự chọn</label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tiên quyết:</label>
                                <select
                                    name="tienQuyet"
                                    value={formData.tienQuyet}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Chọn tiên quyết</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Học trước:</label>
                                <select
                                    name="hocTruoc"
                                    value={formData.hocTruoc}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Chọn học trước</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Song hành:</label>
                                <select
                                    name="songHanh"
                                    value={formData.songHanh}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Chọn song hành</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="default-modal" type="button" onClick={onSave} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button data-modal-hide="default-modal" type="button" onClick={onClose} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EachCourse;