import React from 'react';
import { FaAngleLeft } from 'react-icons/fa6';

const RightMenu = () => {
    return (
        <div className='w-full py-6 flex flex-col justify-center items-start'>
            <div className='w-full flex justify-start items-center gap-1 hover:bg-primary-01 rounded-e-md py-4 px-8 cursor-pointer bg-opacity-30'>
                <FaAngleLeft />
                <span>بیوگرافی</span>
            </div>
            <div className='w-full flex justify-start items-center gap-1 hover:bg-primary-01 rounded-e-md py-4 px-8 cursor-pointer bg-opacity-30'>
                <FaAngleLeft />
                <span>نشانی</span>
            </div>
            <div className='w-full flex justify-start items-center gap-1 hover:bg-primary-01 rounded-e-md py-4 px-8 cursor-pointer bg-opacity-30'>
                <FaAngleLeft />
                <span>خدمات</span>
            </div>
            <div className='w-full flex justify-start items-center gap-1 hover:bg-primary-01 rounded-e-md py-4 px-8 cursor-pointer bg-opacity-30'>
                <FaAngleLeft />
                <span>تخصص و مهارت</span>
            </div>
            <div className='w-full flex justify-start items-center gap-1 hover:bg-primary-01 rounded-e-md py-4 px-8 cursor-pointer bg-opacity-30'>
                <FaAngleLeft />
                <span>آثار و افتخارات</span>
            </div>
            <div className='w-full flex justify-start items-center gap-1 hover:bg-primary-01 rounded-e-md py-4 px-8 cursor-pointer bg-opacity-30'>
                <FaAngleLeft />
                <span>محبوبترین</span>
            </div>
            <div className='w-full flex justify-start items-center gap-1 hover:bg-primary-01 rounded-e-md py-4 px-8 cursor-pointer bg-opacity-30'>
                <FaAngleLeft />
                <span>گالری</span>
            </div>
            <div className='w-full flex justify-start items-center gap-1 hover:bg-primary-01 rounded-e-md py-4 px-8 cursor-pointer bg-opacity-30'>
                <FaAngleLeft />
                <span>لینکدونی</span>
            </div>
            <div className='w-full flex justify-start items-center gap-1 hover:bg-primary-01 rounded-e-md py-4 px-8 cursor-pointer bg-opacity-30'>
                <FaAngleLeft />
                <span>غرفه</span>
            </div>
            <div className='w-full flex justify-start items-center gap-1 hover:bg-primary-01 rounded-e-md py-4 px-8 cursor-pointer bg-opacity-30'>
                <FaAngleLeft />
                <span>نظر و امتیاز</span>
            </div>
        </div>
    );
};

export default RightMenu;