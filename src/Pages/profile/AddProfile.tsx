import React, {  useState } from "react";
import { UserCreate } from "../../utils/interface";
import { Loading } from "../../components/Loading/Loading";
import { createUser } from "../../utils/utilsUser";
import { toast } from "react-toastify";
import ReactDOM from 'react-dom';
interface EditProfileProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddProfile: React.FC<EditProfileProps> = (props) => {
    const {setModal } = props;
    const [userSelect, setUserSelect] = useState<UserCreate>({
        username: "",
        password: "",
        role: "",
        name: "",
        student_id: "",
        birth_date: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);

    interface InputChangeEvent {
        target: {
            name: string;
            value: string;
        };
    }

    const handleInputChange = (e: InputChangeEvent) => {
        const { name, value } = e.target;
        setUserSelect((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        setLoading(true);
        e.preventDefault();
        if (userSelect) {
            try {
                createUser(userSelect).then((res) => {
                    if (res.status === 201) {
                        toast.success("Tạo tài khoản thành công.");
                        setLoading(false);
                        setModal(false);
                    }
                });
            } catch (error) {
                toast.error("Tạo tài khoản thất bại." + error);
            }
        }
    };
    return (
        ReactDOM.createPortal(
            <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-35 z-[9999] w-full h-full">
                {loading && <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <Loading />
                </div>}
                <div className="w-[40rem] flex items-center justify-center py-10">
                    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                        <div className="flex flex-row w-full ">
                            <button type="button" onClick={() => {
                                setModal(false);
                            }} className="px-2 py-1 rounded-lg w-fit  hover:cursor-pointer" data-modal-toggle="deleteModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="#1a202c" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <h2 className="text-center text-2xl pr-8 font-bold w-full text-center text-purple-700">Thêm tài khoản</h2>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-row">
                                <label htmlFor="username" className="px-4 py-2 w-[12rem]">
                                    Tên đăng nhập
                                </label>
                                <input
                                    type="text"
                                    required
                                    id="username"
                                    name="username"
                                    onChange={handleInputChange}
                                    placeholder="Tên"
                                    value={userSelect?.username || ""}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="flex flex-row">
                                <label htmlFor="password" className="px-4 py-2 w-[12rem]">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    required
                                    id="password"
                                    name="password"
                                    onChange={handleInputChange}
                                    placeholder="Tên"
                                    value={userSelect?.password || ""}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="flex flex-row">
                                <label htmlFor="role" className="px-4 py-2 w-[12rem]">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={userSelect?.role}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="user">Sinh viên</option>
                                    <option value="admin">Quản lý</option>
                                </select>
                            </div>
                            <div className="flex flex-row">
                                <label htmlFor="name" className="px-4 py-2 w-[12rem]">
                                    Tên
                                </label>
                                <input
                                    type="text"
                                    required
                                    id="name"
                                    name="name"
                                    onChange={handleInputChange}
                                    placeholder="Tên"
                                    value={userSelect?.name || ""}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="flex flex-row">
                                <label htmlFor="student_id" className="px-4 py-2 w-[12rem]">
                                    Mã sinh viên
                                </label>
                                <input
                                    type="text"
                                    required
                                    id="student_id"
                                    name="student_id"
                                    onChange={handleInputChange}
                                    placeholder="Mã sinh viên"
                                    value={userSelect?.student_id || ""}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            {/* <div className="flex flex-row">
                                <label htmlFor="role" className="px-4 py-2 w-[12rem]">
                                    Chức vụ
                                </label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    onChange={handleInputChange}
                                    placeholder="Vị trí"
                                    value={userSelect?.role ? (userSelect.role === "admin" ? "Quản lý" : "Học Sinh") : ""}
                                    className="hover:cursor-not-allowed w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div> */}
                            <div className="flex flex-row">
                                <label htmlFor="birth_date" className="px-4 py-2 w-[12rem]">
                                    Ngày sinh
                                </label>
                                <input
                                    type="date"
                                    required
                                    id="birth_date"
                                    name="birth_date"
                                    onChange={handleInputChange}
                                    placeholder="Ngày sinh"
                                    value={userSelect?.birth_date || ""}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="flex flex-row">
                                <label htmlFor="email" className="px-4 py-2 w-[12rem]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    id="email"
                                    name="email"
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    value={userSelect?.email || ""}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
                                >
                                    Thêm mới
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>,
            document.body
        )

    )
};
