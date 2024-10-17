import Link from "next/link";
import React from "react";
import { FaAngleLeft } from "react-icons/fa6";

const RightMenu = () => {
  return (
    <div className="w-full py-6 hidden md:flex flex-col sticky top-12 text-sm font-medium text-slate-800">
      <Link
        href={"#personalinfo"}
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>مشخصات</span>
      </Link>
      <Link
        href="#bio"
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>بیوگرافی</span>
      </Link>
      <Link
        href="#address"
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>نشانی</span>
      </Link>
      <Link
        href="#skills"
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>تخصص و مهارت</span>
      </Link>
      <Link
        href="#honors_description"
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>آثار و افتخارات</span>
      </Link>
      <Link
        href="#populars"
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>محبوبترین</span>
      </Link>
      <Link
        href="#gallery"
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>گالری</span>
      </Link>
      <Link
        href="#linkdins"
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>لینکدونی</span>
      </Link>
      <Link
        href="#booth"
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>غرفه</span>
      </Link>
      <Link
        href="#comments"
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>نظر و امتیاز</span>
      </Link>
    </div>
  );
};

export default RightMenu;
