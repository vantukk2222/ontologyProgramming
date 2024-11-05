import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TableCourse from '../../components/TableCourse/TableCourse';
import { InforUser } from '../../utils/interface';

const Dashboard: React.FC = () => {

    const infor: InforUser = JSON.parse(localStorage.getItem("inforUser") || "{}");
    const [role, setRole] = useState<string | null>(null);
    useEffect(() => {
        if (Object.keys(infor).length === 0) {
            window.location.href = "/login";
        }
        else{
            setRole(infor.role)
        }

    }, [infor]);

    return (
        <>
            <div className="flex flex-col h-screen w-screen  bg-slate-100 items-center lg:max-w-[90rem] py-2 ">
                <Navbar />
                {/* <div className="h-fit bg-white text-center">123</div> */}
                <TableCourse role={role} />
            </div>
        </>
    );
};

export default Dashboard;
