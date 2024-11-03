/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { searchCourses } from "../../utils/utilsCourse";
import { toast } from "react-toastify";
import findTienQuyetRelation from "../../utils/findRelation";
import usePageIgnition from "../../Hooks/pageInition";
import EachCourse, { CourseEach } from "../EachCourse/EachCourse";
import { Loading } from "../Loading/Loading";

const TableCourse: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { page, setPage } = usePageIgnition();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await searchCourses({ page: page.pageNumber, limit: page.pageSize }).then((result) => {
                    setPage({ ...page, totalPages: result.totalPages });
                    setData(result.courses);
                    setLoading(false);

                })

            } catch (error) {
                toast.error("Failed to fetch courses" + error);
            }
        };
        fetchData();
    }, []);

    const [selectedCourse, setSelectedCourse] = useState<CourseEach | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const OpenModal = (course: any) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const CloseModal = () => {
        setSelectedCourse(null);
        setIsModalOpen(false);
    };
    if (loading) {
        return <Loading />
    }

    return (
        <>

            <div className="flex flex-col h-screen w-full justify-center mt-2 pt-4 px-8 border-t-2 border-slate-200 bg-white max-h-[85%]">
                <div className="-m-1.5 overflow-x-auto max-h-[92%] mt-3">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead >
                                    <tr>
                                        <th scope="col" className="sticky top-0 text-center px-6  text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Học kỳ</th>
                                        <th scope="col" className="sticky top-0 text-center px-6  text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Mã HP</th>
                                        <th scope="col" className="sticky top-0 text-center px-6  text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Tên học phần</th>
                                        <th scope="col" className="sticky top-0 text-center px-6  text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Số tín chỉ</th>
                                        <th scope="col" className="sticky top-0 text-center px-6  text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Tự chọn</th>
                                        <th scope="col" className="sticky top-0 text-center px-6  text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Tiên quyết</th>
                                        <th scope="col" className="sticky top-0 text-center px-6  text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Học trước</th>
                                        <th scope="col" className="sticky top-0 text-center px-6  text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Song hành</th>
                                        <th scope="col" className="sticky top-0 text-center px-6  text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 overflow-y-auto">
                                    {data?.map((course: any) => (
                                        <tr className="hover:cursor-pointer">
                                            <td className="text-center px-6 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{course?.ns0__hocKy}</td>
                                            <td className="text-center px-6 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{course?.ns0__maMonHoc}</td>
                                            <td className="text-center px-6 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{course?.rdfs__label}</td>
                                            <td className="text-center px-6 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{course?.ns0__soTinChi}</td>
                                            <td className="text-center px-6 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">
                                                {course?.ns0__laMonTuChon ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600 inline-block" viewBox="0 0 24 24" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L10 15.586l8.293-8.293a1 1 0 0 1 1.414 1.414l-9 9A1 1 0 0 1 10 18z" clipRule="evenodd" />
                                                </svg>
                                                ) : (
                                                    ""
                                                )}
                                            </td>
                                            <td className="text-center px-6 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{findTienQuyetRelation(course?.relations, "ns0__tienQuyet")?.rdfs__label || ""}</td>
                                            <td className="text-center px-6 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{findTienQuyetRelation(course?.relations, "ns0__hocTruoc")?.rdfs__label || ""}</td>
                                            <td className="text-center px-6 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{findTienQuyetRelation(course?.relations, "ns0__songHanh")?.rdfs__label || ""}</td>
                                            <td onClick={() => OpenModal(course)} className="text-center px-6 py-1 whitespace-nowrap text-center text-[0.65rem] text-black border border-blue-400">
                                                <button type="button" className="inline-flex items-center gap-x-1 text-[0.65rem] font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                                {/* <tfoot>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-[0.65rem] font-medium text-gray-800 dark:text-neutral-200">Footer</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[0.65rem] text-gray-800 dark:text-neutral-200">Footer</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[0.65rem] text-gray-800 dark:text-neutral-200">Footer</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-[0.65rem] font-medium">
                                                <button type="button" className="inline-flex items-center gap-x-2 text-[0.65rem] font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Footer</button>
                                            </td>
                                        </tr>
                                    </tfoot> */}
                            </table>
                        </div>
                    </div>
                </div>
                {selectedCourse && (
                    <EachCourse isOpen={isModalOpen} onSave={() => { setIsModalOpen(false) }} onClose={CloseModal} Course={selectedCourse} />
                )}
            </div>
        </>
    )

}
export default TableCourse;