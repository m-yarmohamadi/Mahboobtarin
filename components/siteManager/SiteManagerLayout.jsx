import { HiOutlineMenu } from "react-icons/hi";
import Header from "../Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function SiteManagerLayout({ children }) {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <>
            <Header />
            <div className="w-full lg:h-[calc(100vh-72px-60px)] flex flex-col 2xl:container">
                <div className="justify-between p-4 text-lg bg-primary-01 w-full text-white font-bold flex lg:justify-center items-center">
                    <button onClick={() => setOpenSidebar(true)} className="lg:hidden">
                        <HiOutlineMenu className="w-6 h-6" />
                    </button>
                    پنل مدیریت سایت
                </div>
                <div className="w-full h-full grid grid-cols-12">
                    <Sidebar
                        open={openSidebar}
                        onClose={() => setOpenSidebar(false)}
                    />
                    <div className="col-span-12 lg:col-span-8 xl:col-span-9 p-4 lg:p-6 w-full lg:overflow-y-auto overflow-x-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
