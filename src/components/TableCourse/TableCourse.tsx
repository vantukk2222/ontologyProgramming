/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { getCourseByID, searchCourses, searchCoursesByQuery } from "../../utils/utilsCourse";
import { toast } from "react-toastify";
import usePageIgnition from "../../Hooks/pageInition";
import EachCourse from "../EachCourse/EachCourse";
import { Loading } from "../Loading/Loading";
import fillAllRelation from "../../utils/findAllRelation";
import { CourseEach, TableProps } from "../../utils/interface";
import { fetchAllUsers } from "../../utils/utilsUser";
import { EditProfile } from "../../Pages/profile/EditProfile";
import { AddProfile } from "../../Pages/profile/AddProfile";
import AddEachCourse from "../EachCourse/AddEachCourse";

// const languages = [
//     {
//         name: '123213123C123213123C123213123C',
//         year: 1972
//     },
//     {
//         name: 'El123213123C123213123C123213123Cm',
//         year: 2012
//     },
//     {
//         name: '2123213123C123213123C',
//         year: 2012
//     },
//     {
//         name: '3123213123C123213123C',
//         year: 2012
//     },
// ];
// interface Language {
//     name: string;
//     year: number;
// }
// const getSuggestions = (value: string): Language[] => {
//     const inputValue = value.trim().toLowerCase();
//     const inputLength = inputValue.length;

//     return inputLength === 0 ? [] : languages.filter(lang =>
//         lang.name.toLowerCase().slice(0, inputLength) === inputValue
//     );
// };

// // When suggestion is clicked, Autosuggest needs to populate the input
// // based on the clicked suggestion. Teach Autosuggest how to calculate the
// // input value for every given suggestion.
// const getSuggestionValue = (suggestion: Language): string => suggestion.name;

// // Use your imagination to render suggestions.
// const renderSuggestion = (suggestion: Language): JSX.Element => (
//     <div className="p-2 bg-white border shadow-md hover:bg-gray-200 cursor-pointer">
//       {suggestion.name}
//     </div>
//   );

interface SearchResult {
    elementId: string;
    rdfs__label: string;
    similarity: number;
}

const TableCourse: React.FC<TableProps> = (props) => {
    const { role } = props;
    const [data, setData] = useState<any[]>([]);
    const [dataAccount, setDataAccount] = useState<any[]>([]);
    const [isAccount, setIsAccount] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { page, setPage } = usePageIgnition();
    const [isOpenAddAccount, setIsOpenAddAccount] = useState(false);
    const [isOpenAddCourse, setIsOpenAddCourse] = useState(false);

    const [openProfile, setOpenProfile] = useState(false);
    const [openAddAccount, setOpenAddAccount] = useState(false);
    const [openAddCourse, setOpenAddCourse] = useState(false);
    const [ID, setID] = useState<string | null>(null);

    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            handleSearch(value);
        }, 300);
    };
    const handleSearch = async (value: string) => {
        setQuery(value);

        if (value.length > 0) {
            setLoadingSearch(true);

            try {
                // Thực hiện gọi API tìm kiếm
                searchCoursesByQuery({ query: value }).then((result) => {
                    console.log("result", result);
                    setResults(result);
                });

            } catch (error) {
                toast.error('Error fetching search results:' + error);
            } finally {
                setLoadingSearch(false);
            }
        } else {
            // Nếu input rỗng, xóa kết quả tìm kiếm
            setResults([]);
        }
    };
    const changeSelectedCourse = (idCourse: string) => {
        getCourseByID(idCourse).then((result) => {
            setSelectedCourse(result);
            setIsModalOpen(true);
        });
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isAccount) {
                    await searchCourses({ page: page.pageNumber, limit: page.pageSize }).then((result) => {
                        setPage({ ...page, totalPages: result.totalPages });
                        setData(result.courses.map((course: CourseEach) => ({
                            ...course,
                            relations: course.relations.sort((a, b) => a.rdfs__label.localeCompare(b.rdfs__label))
                        })));
                        setLoading(false);

                    })
                }
                else {
                    await fetchAllUsers().then((result) => {
                        console.log("result", result);
                        setDataAccount(result.data.users);
                        setLoading(false);
                    })
                }
            } catch (error) {
                toast.error("Có lỗi rồi nè!" + error);
            }
        };
        fetchData();
    }, [isAccount]);
    const myProfile = (user_id: string) => {
        setID(user_id);
        setOpenProfile(true);
    }
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
    const CloseeAdd = () => {
        setOpenAddCourse(false);
    }


    return (
        <>

            <div className="flex flex-col h-screen w-full  mt-2 pt-4 px-8 border-t-2 border-slate-200 bg-white max-h-[85%]">

                {loading && <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <Loading />
                </div>}
                {role === "admin" &&
                    <div className="absolute top-28 space-x-4 inline-flex rounded-md shadow-sm w-full">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsAccount(true)}
                                onMouseEnter={() => { setIsOpenAddAccount(true) }}
                                onMouseLeave={() => { setTimeout(() => { setIsOpenAddAccount(false) }, 500) }}
                                className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                            >
                                Quản lý tài khoản
                            </button>
                            {
                                isOpenAddAccount &&
                                <div className=" absolute index-1 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                >
                                    <ul className="py-1 text-gray-700">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setOpenAddAccount(true) }}>
                                            Thêm tài khoản
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>

                        <div className="relative">

                            <button
                                type="button"
                                onClick={() => setIsAccount(false)}
                                onMouseEnter={() => { setIsOpenAddCourse(true) }}
                                onMouseLeave={() => { setTimeout(() => { setIsOpenAddCourse(false) }, 500) }}
                                className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                            >
                                Quản lý CTĐT
                            </button>
                            {
                                isOpenAddCourse &&
                                <div className=" absolute index-1 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                >
                                    <ul className="py-1 text-gray-700">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setOpenAddCourse(true) }}>
                                            Thêm môn học
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>

                        {!isAccount &&
                            <div className="relative justify-end pl-10  max-w-md mx-auto  relative z-15 w-[30rem]">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={handleInputChange}
                                    placeholder="Tìm kiếm môn học..."
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {loadingSearch && (
                                    <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md border w-[30rem] border-gray-300 z-50 max-h-60 overflow-y-auto">
                                        <ul>
                                            <li
                                                className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                                            >
                                                Đang tìm kiếm
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {!loadingSearch && results.length > 0 && (
                                    <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md border border-gray-300 z-50 max-h-60 overflow-y-auto">
                                        <ul>
                                            {results.map((result) => (
                                                <li
                                                    key={result.elementId}
                                                    onClick={() => {
                                                        changeSelectedCourse(result.elementId);
                                                    }}
                                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b w-[30rem]"
                                                >
                                                    {result.rdfs__label} (Độ tương đồng: {result.similarity.toFixed(2)})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {/* <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                            /> */}
                            </div>}
                    </div>}

                <div className="-m-1.5 overflow-x-auto max-h-[92%] mt-12 mb-12">
                    {data && !isAccount &&
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead >
                                        <tr className="pt-2">
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-2 w-[4rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400 ">Học kỳ</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-2 w-[4rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Mã HP</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-6 w-[12rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Tên học phần</th>
                                            {role === "user" &&
                                                <th scope="col" className="z-[10] sticky top-0 text-center px-2 py-1 w-[4rem] whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">Hoàn thành</th>

                                            }
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-2 w-[4rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Số tín chỉ</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-2 w-[4rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Tự chọn</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-6 w-[12rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Tiên quyết</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-6 w-[12rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Học trước</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-6 w-[12rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Song hành</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-6 w-[4rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 overflow-y-auto">
                                        {data?.map((course: any, index) => (
                                            <tr key={index} className="hover:cursor-pointer">
                                                <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{course?.ns0__hocKy}</td>
                                                <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{course?.ns0__maMonHoc}</td>
                                                <td className="text-start px-6 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{course?.rdfs__label}</td>
                                                {role === "user" &&
                                                    (course?.course_status ? (
                                                        <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600 inline-block" viewBox="0 0 24 24" fill="currentColor">
                                                                <path fillRule="evenodd" d="M10 18a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L10 15.586l8.293-8.293a1 1 0 0 1 1.414 1.414l-9 9A1 1 0 0 1 10 18z" clipRule="evenodd" />
                                                            </svg>
                                                        </td>
                                                    ) : (
                                                        <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200" />
                                                    ))
                                                }

                                                <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{course?.ns0__soTinChi}</td>
                                                <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">
                                                    {course?.ns0__laMonTuChon ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600 inline-block" viewBox="0 0 24 24" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L10 15.586l8.293-8.293a1 1 0 0 1 1.414 1.414l-9 9A1 1 0 0 1 10 18z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-start px-6 py-1 whitespace-normal text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200"> {fillAllRelation(course?.relations, "ns0__tienQuyet")?.map((eachCourse, index) => (
                                                    <span key={index}>
                                                        {eachCourse.rdfs__label}
                                                        <br />
                                                    </span>
                                                )) || ""}</td>
                                                <td className="text-start px-6 py-1 whitespace-normal text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200"> {fillAllRelation(course?.relations, "ns0__hocTruoc")?.map((eachCourse, index) => (
                                                    <span key={index}>
                                                        {eachCourse.rdfs__label}
                                                        <br />
                                                    </span>
                                                )) || ""}</td>
                                                <td className="text-start px-6 py-1 whitespace-normal text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200"> {fillAllRelation(course?.relations, "ns0__songHanh")?.map((eachCourse, index) => (
                                                    <span key={index}>
                                                        {eachCourse.rdfs__label}
                                                        <br />
                                                    </span>
                                                )) || ""}</td>
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
                                </table>
                            </div>
                        </div>
                    }
                    {dataAccount && isAccount &&
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead >
                                        <tr className="pt-2">
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-2 w-[12rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400 ">Mã sinh viên</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-2 w-[4rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Tài khoản</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-2 w-[12rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Tên</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-6 w-[12rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Ngày sinh</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-2 w-[4rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Email</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-6 w-[4rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400">Chức vụ</th>
                                            <th scope="col" className="z-[10] sticky top-0 text-center px-6 w-[4rem] text-[0.65rem] font-bold text-black border border-blue-400 bg-white dark:text-neutral-400"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 overflow-y-auto">
                                        {dataAccount?.map((account: any, index) => (
                                            <tr key={index} className="hover:cursor-pointer">
                                                <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{account?.student_id}</td>
                                                <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{account?.username}</td>
                                                <td className="text-start px-6 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{account?.name}</td>
                                                <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{account?.birth_date}</td>
                                                <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{account?.email}</td>
                                                <td className="text-center px-2 py-1 whitespace-nowrap text-[0.65rem] text-black border border-blue-400 dark:text-neutral-200">{account?.role}</td>
                                                <td onClick={() => { myProfile(account?.user_id) }} className="text-center px-6 py-1 whitespace-nowrap text-center text-[0.65rem] text-black border border-blue-400">
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
                                </table>
                            </div>
                        </div>
                    }
                </div>
                {openProfile && ID &&
                    <EditProfile setModal={setOpenProfile} ID={ID} />
                }
                {openAddAccount &&
                    <AddProfile setModal={setOpenAddAccount} />
                }
                {openAddCourse &&
                    <AddEachCourse role={role} isOpen={openAddCourse} onClose={CloseeAdd} />
                }

                {selectedCourse && !isAccount && (
                    <EachCourse role={role} isOpen={isModalOpen} onClose={CloseModal} Course={selectedCourse} />
                )}
            </div>
        </>
    )

}
export default TableCourse;