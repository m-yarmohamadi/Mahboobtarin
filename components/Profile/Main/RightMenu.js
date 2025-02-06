import Link from "next/link";
import React from "react";
import { FaAngleLeft } from "react-icons/fa6";

const RightMenu = ({ userData, popularList }) => {
  const permissions = userData?.permissions
    ? JSON.parse(userData?.permissions)
    : {};

  return (
    <div className="w-full py-6 hidden md:flex flex-col sticky top-12 text-sm font-medium text-slate-800">
      <Link
        href={"#personalinfo"}
        className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
      >
        <FaAngleLeft />
        <span>مشخصات</span>
      </Link>

      {userData?.description && (
        <Link
          href="#bio"
          className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
        >
          <FaAngleLeft />
          <span>بیوگرافی</span>
        </Link>
      )}

      {permissions?.phone || permissions?.workAddress ? (
        <Link
          href="#address"
          className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
        >
          <FaAngleLeft />
          <span>نشانی</span>
        </Link>
      ) : null}

      {userData?.expert_description && (
        <Link
          href="#skills"
          className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
        >
          <FaAngleLeft />
          <span>تخصص و مهارت</span>
        </Link>
      )}

      {userData?.honors_description && (
        <Link
          href="#honors_description"
          className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
        >
          <FaAngleLeft />
          <span>آثار و افتخارات</span>
        </Link>
      )}

      {userData?.usergrade.length ? (
        <Link
          href="#grade"
          className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
        >
          <FaAngleLeft />
          <span>تحصیلات</span>
        </Link>
      ) : null}

      {userData?.userlanguage.length ? (
        <Link
          href="#languages"
          className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
        >
          <FaAngleLeft />
          <span>زبان و گویش</span>
        </Link>
      ) : null}

      {popularList.length ? (
        <Link
          href="#populars"
          className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
        >
          <FaAngleLeft />
          <span>محبوب‌ترین</span>
        </Link>
      ) : null}

      {userData.gallery.length ? (
        <Link
          href="#gallery"
          className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
        >
          <FaAngleLeft />
          <span>گالری</span>
        </Link>
      ) : null}

      {userData?.link_dooni.length ? (
        <Link
          href="#linkdins"
          className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
        >
          <FaAngleLeft />
          <span>لینکدونی</span>
        </Link>
      ) : null}

      {userData?.products.length > 0 && (
        <Link
          href="#products"
          className="duration-150 w-full flex justify-start items-center gap-1 hover:bg-primary-01 hover:text-white rounded-se-xl py-4 px-6 cursor-pointer bg-opacity-30"
        >
          <FaAngleLeft />
          <span>غرفه</span>
        </Link>
      )}
      
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
