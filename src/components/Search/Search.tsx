import React from "react";

const Search: React.FC = () => {

    return (
        <>
            <div className="hover:drop-shadow-2xl hover:scale-110 relative border-2 border-slate-400 rounded-lg">
                <label htmlFor="courses-search-orig" className="block text-sm font-medium">
                    <span className="sr-only">Courses search</span>
                    </label>
                <input type="text" name="courses-search" id="courses-search-orig" className="hidden md:block py-2 ps-10 pe-16 lg:min-w-[25rem] w-full border-gray-200 shadow-sm rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 transition group-hover:border-gray-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:border-neutral-600 dark:text-neutral-400 dark:placeholder:text-neutral-500 dark:group-hover:border-gray-600" placeholder="Courses search..." />
                <div className="hidden md:block absolute inset-y-0 end-0 p-2">
                    <span className="p-1 text-xs font-medium text-gray-400 rounded-md dark:text-neutral-500">Ctrl + /</span>
                </div>
                <button type="button" className="group block rounded-lg p-[.6875rem] hover:border-gray-300 focus:outline-none focus:border-gray-300 md:absolute md:inset-y-0 md:start-0 md:flex md:items-center md:pointer-events-none md:ps-3">
                    <svg className="size-4 text-gray-600 md:group-hover:text-blue-600 md:text-gray-400 dark:text-neutral-400 md:dark:group-hover:text-gray-500 md:dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                </button>
            </div>
        </>
    )

}

export default Search;