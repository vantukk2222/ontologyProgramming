import React from 'react';
import UserDropdown from '../UserDropdown/UserDropdown';
// import { logoSVG } from './../../assets/svg/logo';
// import Search from '../Search/Search';

const Navbar: React.FC = () => {
    return (
        <nav className="flex flex-row bg-white justify-between flex-nowrap p-4 items-center w-full h-fit lg:max-w-[90rem] mx-auto px-4 md:px-8 border-2 border-bottom border-b-slate-200 drop-shadow-sm">
            <a className=" flex flex-row rounded-md focus:outline-none justify-center items-center focus:opacity-80" href="/home">
            <img src="/assets/svg/book.svg" alt="Book Icon" className="w-28 h-12" />
              <span className="text-lg font-bold">Chương trình đào tạo</span>
            </a>
            {/* <Search/> */}
            <UserDropdown />
        </nav>
    );
};

export default Navbar;