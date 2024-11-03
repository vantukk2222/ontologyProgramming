import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TableCourse from '../../components/TableCourse/TableCourse';

const Dashboard: React.FC = () => {
    return (
        <>
            <div className="flex flex-col h-screen w-screen  bg-slate-100 items-center lg:max-w-[90rem] py-2 ">
                <Navbar />
                {/* <div className="h-fit bg-white text-center">123</div> */}
                <TableCourse />
            </div>
        </>
    );
};

export default Dashboard;
