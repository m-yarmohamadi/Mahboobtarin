<<<<<<< HEAD
import React, { useState } from 'react';
import Header from '../Header';
import { enToFaNumber } from '@/utils/enToFa';
import { GiWallet } from 'react-icons/gi';
import { FaPortrait } from 'react-icons/fa';
import MyInfo from './adminProfileSteps/MyInfo';
import Dashboard from './adminProfileSteps/Dashboard';
const dataMenu = [
	{
		id: 1,
		title: 'پیشخوان',
		value: 'dashboard',
		quanity: '',
		icon: '',
	},
	{
		id: 2,
		title: 'اطلاعات من',
		value: 'myInfo',
		quanity: '',
		icon: '',
	},
	{
		id: 3,
		title: 'سفارش جدید',
		value: 'newOrder',
		quanity: '12',
		icon: '',
	},
	{
		id: 4,
		title: 'فراخوان جدید',
		value: '',
		quanity: '7',
		icon: '',
	},
	{
		id: 5,
		title: 'مدیریت خدمات',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 6,
		title: 'گالری',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 7,
		title: 'لینکدونی',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 8,
		title: 'نظزات و امتیازات',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 9,
		title: 'درخواست تولید محتوا',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 10,
		title: 'دنبال کنندگان',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 11,
		title: 'دنبال شونده',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 12,
		title: 'اعلان ها',
		value: '',
		quanity: '3',
		icon: '',
	},
	{
		id: 13,
		title: 'آمار',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 14,
		title: 'دعوت از دوستان',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 15,
		title: 'خرید اشتراک',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 16,
		title: 'پشتیبانی',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 17,
		title: 'تنظیمات',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 18,
		title: 'خروج از حساب کاربری',
		value: '',
		quanity: '',
		icon: '',
	},
];
=======
import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import { HiOutlineMenu } from "react-icons/hi";
import Dashboard from "./adminProfileSteps/Dashboard";
import MyInfo from "./adminProfileSteps/myInfo/MyInfo";
>>>>>>> origin/faramarzi

const ExpertDashboard = ({ children }) => {
  const [activeStep, setActiveStep] = useState("myInfo");
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleStep = () => {
    switch (activeStep) {
      case "dashboard": {
        return <Dashboard />;
      }
      case "myInfo": {
        return <MyInfo />;
      }

      default: {
        return <Dashboard />;
      }
    }
  };

  return (
    <>
      <Header />
      <div className="w-full lg:h-[calc(100vh-68px-72px)] flex flex-col 2xl:container">
        <div className="justify-between px-4 pt-6 pb-4 text-lg bg-primary-01 w-full text-white font-bold flex lg:justify-center items-center">
          <button onClick={() => setOpenSidebar(true)} className="lg:hidden">
            <HiOutlineMenu className="w-6 h-6" />
          </button>
          داشبورد متخصصان
        </div>
        <div className="w-full h-full grid grid-cols-12">
          <Sidebar
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            open={openSidebar}
            onClose={() => setOpenSidebar(false)}
          />
          <div className="col-span-12 lg:col-span-9 p-4 lg:p-6 w-full lg:overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertDashboard;
