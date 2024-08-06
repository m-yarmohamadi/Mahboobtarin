import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import { HiOutlineMenu } from "react-icons/hi";

const UserNormalDashboard = ({ children }) => {
  const [activeStep, setActiveStep] = useState("myInfo");
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <Header />
      <div className="w-full lg:h-[calc(100vh-68px-72px)] flex flex-col 2xl:container">
        <div className="justify-between px-4 pt-6 pb-4 text-lg bg-primary-01 w-full text-white font-bold flex lg:justify-center items-center">
          <button onClick={() => setOpenSidebar(true)} className="lg:hidden">
            <HiOutlineMenu className="w-6 h-6" />
          </button>
          داشبورد کاربران
        </div>
        <div className="w-full h-full grid grid-cols-12">
          <Sidebar
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            open={openSidebar}
            onClose={() => setOpenSidebar(false)}
          />
          <div className="col-span-12 lg:col-span-9 p-4 lg:p-6 w-full lg:overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNormalDashboard;
