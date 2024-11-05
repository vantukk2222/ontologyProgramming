import React, { useEffect, useState } from "react";
import { InforUser, UserData } from "../../utils/interface";
import { Loading } from "../../components/Loading/Loading";
import { fetchUserByID, updateUserByID, changePassword, deleteUserByID } from "../../utils/utilsUser";
import { toast } from "react-toastify";
import ReactDOM from 'react-dom';

interface EditProfileProps {
    ID: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditProfile: React.FC<EditProfileProps> = (props) => {
    const { ID, setModal } = props;
    const [userSelect, setUserSelect] = useState<UserData>();
    const [loading, setLoading] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const infor: InforUser = JSON.parse(localStorage.getItem("inforUser") || "{}");

    interface InputChangeEvent {
        target: {
            name: string;
            value: string;
        };
    }

    useEffect(() => {
        if (ID) {
            setLoading(true);
            try {
                fetchUserByID(ID).then((res) => {
                    setLoading(false);
                    setUserSelect(res.data.user);
                })
            } catch (error) {
                toast.error("Lỗi khi lấy thông tin tài khoản." + error);
                setLoading(false);
                console.log(error);
            }
        }

    }, [ID])

    const handleInputChange = (e: InputChangeEvent) => {
        const { name, value } = e.target;
        if (isChangePassword) {
            setPasswordData((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setUserSelect((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    [name]: value,
                };
            });
        }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);

        if (isChangePassword) {
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                toast.error("Mật khẩu xác nhận không khớp.");
                setLoading(false);
                return;
            }
            // Call change password API
            changePassword(ID, { old_password: passwordData.oldPassword, new_password: passwordData.newPassword })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success("Đổi mật khẩu thành công.");
                        setLoading(false);
                        setModal(false);
                    }
                })
                .catch((error) => {
                    // Kiểm tra nếu có lỗi từ phía server (ví dụ: mã trạng thái 400)
                    if (error.response) {
                        // Trường hợp mã trạng thái 400
                        if (error.response.status === 400) {
                            toast.error("Lỗi: " + error.response.data.message || "Yêu cầu không hợp lệ.");
                        } else {
                            // Các mã trạng thái khác, ví dụ 401, 403, v.v.
                            toast.error("Lỗi: " + error.response.data.message || "Đã xảy ra lỗi khi đổi mật khẩu.");
                        }
                    } else if (error.request) {
                        // Trường hợp không nhận được phản hồi từ server
                        toast.error("Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối mạng.");
                    } else {
                        // Lỗi không liên quan đến phản hồi server (lỗi cấu hình, v.v.)
                        toast.error("Đã xảy ra lỗi: " + error.message);
                    }
                    setLoading(false);
                });


        } else {
            if (userSelect?.user_id) {
                updateUserByID(userSelect.user_id, userSelect).then((res) => {
                    try {
                        if (res.status === 200) {
                            toast.success("Cập nhật tài khoản thành công.");
                            setLoading(false);
                            setModal(false);
                        }
                    }
                    catch (error) {
                        toast.error("Cập nhật tài khoản thất bại." + error);
                        setLoading(false);
                    }
                });
            }
        }
    };
    const handleRemove = () => {
        try {
            if (userSelect?.user_id) {
                deleteUserByID(userSelect.user_id).then((res) => {
                    if (res.status === 200) {
                        toast.success("Xoá tài khoản thành công.");
                        setLoading(false);
                        setModal(false);
                    }
                });
            }
        } catch (error) {
            toast.error("Xoá tài khoản thất bại." + error);
            setLoading(false);
        }
    }

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
                            <h2 className="text-center text-2xl pr-8 font-bold w-full text-center text-purple-700">{isChangePassword ? "Đổi mật khẩu" : "Chỉnh sửa tài khoản"}</h2>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {isChangePassword ? (
                                <>
                                    <div className="flex flex-row">
                                        <label htmlFor="oldPassword" className="px-4 py-2 w-[12rem]">
                                            Mật khẩu cũ
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            id="oldPassword"
                                            name="oldPassword"
                                            onChange={handleInputChange}
                                            placeholder="Mật khẩu cũ"
                                            value={passwordData.oldPassword}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="newPassword" className="px-4 py-2 w-[12rem]">
                                            Mật khẩu mới
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            id="newPassword"
                                            name="newPassword"
                                            onChange={handleInputChange}
                                            placeholder="Mật khẩu mới"
                                            value={passwordData.newPassword}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="confirmPassword" className="px-4 py-2 w-[12rem]">
                                            Xác nhận mật khẩu
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            onChange={handleInputChange}
                                            placeholder="Xác nhận mật khẩu"
                                            value={passwordData.confirmPassword}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
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
                                    {userSelect?.role === "user" && <div className="flex flex-row">
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
                                    </div>}
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
                                </>
                            )}
                            <div className="flex flex-row space-x-6">
                                <button
                                    type="submit"
                                    className="w-full py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
                                >
                                    {isChangePassword ? "Đổi mật khẩu" : "Lưu"}
                                </button>
                                {infor?.role === "admin" && userSelect?.role !== "admin"&&
                                    <button
                                        type="button"
                                        onClick={handleRemove}
                                        className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                    >
                                        Xoá
                                    </button>}
                                <button
                                    type="button"
                                    onClick={() => setModal(false)}

                                    className="w-full py-2 text-black bg-white rounded-md hover:bg-white"
                                >
                                    Huỷ
                                </button>
                            </div>
                        </form>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isChangePassword}
                                onChange={() => setIsChangePassword(!isChangePassword)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Đổi mật khẩu</span>
                        </label>
                    </div>
                </div>
            </div>,
            document.body
        )
    );
};
