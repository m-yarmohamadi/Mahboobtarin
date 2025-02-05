import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  BiDockBottom,
  BiEditAlt,
  BiLeftArrow,
  BiLogOut,
  BiUser,
} from "react-icons/bi";
import Link from "next/link";
import { FaAnglesLeft } from "react-icons/fa6";
import useProfile from "@/hooks/useProfile";
import { IoCartOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { useDarkMode } from "@/context/DarkModeContext";
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { useCartShop } from "@/context/CartContext";

const LoginRegister = ({
  token,
  setOpenRegisterModal,
  handleLogOut,
  size,
  user,
  isLoading,
}) => {
  const [openMenuOptions, setOpenMenuOptions] = useState(false);
  const menuOptionsRef = useRef(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { cartList } = useCartShop();

  useEffect(() => {
    function closeMenuHandler(e) {
      if (
        menuOptionsRef.current &&
        !menuOptionsRef.current.contains(e.target) &&
        !e.target.classList.contains("btn-open-mobile")
      ) {
        setOpenMenuOptions(false);
      }
    }

    document.addEventListener("click", closeMenuHandler, true);

    return () => document.removeEventListener("click", closeMenuHandler, true);
  }, [setOpenMenuOptions]);

  return (
    <div
      className={`w-full flex justify-end items-center gap-2 ${
        isLoading && "opacity-60 blur-sm"
      } duration-150`}
    >
      <div
        className={`${
          size === "sm" ? "block" : "hidden"
        } lg:!block !w-full lg:!w-auto`}
      >
        {user ? (
          <div className="relative !w-full lg:!w-auto">
            <button
              onClick={() => setOpenMenuOptions(!openMenuOptions)}
              className="font-bold !w-full lg:!w-auto btn-open-mobile whitespace-nowrap btn btn--primary gap-2 !py-0 h-10 !pr-2"
            >
              <FaAnglesLeft
                className={`${!openMenuOptions && `-rotate-90`} mx-2`}
              />
              {user?.name} {user?.lastname}
            </button>
            <MenuOptions ref={menuOptionsRef} open={openMenuOptions}>
              {user?.type !== "user" && (
                <MenuOptionsItem
                  link={`/${user?.unique_url_id}`}
                  text="پروفایل"
                  icon={<BiUser className="w-6 h-6" />}
                />
              )}
              <MenuOptionsItem
                link={
                  user?.type === "user" ? "/user/profile" : "/admin/dashboard"
                }
                text="داشبورد"
                icon={<BiEditAlt className="w-6 h-6" />}
              />
              <button
                onClick={handleLogOut}
                className="px-4 hover:bg-slate-200 duration-200 group"
              >
                <div className="text-slate-800 flex items-center gap-3 text-sm">
                  <BiLogOut className="w-6 h-6" />
                  <span className="border-b text-right border-slate-200 flex-1 py-3 group-last:border-none">
                    خروج از حساب کاربری
                  </span>
                </div>
              </button>
            </MenuOptions>
          </div>
        ) : (
          <Link
            href="/auth"
            className="!w-full lg:!w-auto btn btn--primary gap-2 !py-0 h-10"
          >
            <IoPerson />
            ورود | ثبت‌نام
          </Link>
        )}
      </div>

      {cartList.length > 0 && (
        <Link
          href="/cart"
          className={`btn btn--primary !p-0 w-10 h-10 relative ${
            size !== "sm" ? "flex" : "hidden"
          }`}
        >
          <IoCartOutline className="w-6 h-6" />
          <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-error text-white text-xs flex items-center justify-center">
            {cartList?.length}
          </div>
        </Link>
      )}

      {/* 
      <button
        onClick={toggleDarkMode}
        className={`btn btn--primary !p-0 w-10 h-10 relative ${
          size !== "sm" ? "flex" : "hidden"
        }`}
      >
        {isDarkMode ? (
          <MdOutlineDarkMode className="w-6 h-6" />
        ) : (
          <MdOutlineLightMode className="w-6 h-6" />
        )}
      </button> */}
    </div>
  );
};

export default LoginRegister;

const MenuOptions = forwardRef(function MenuOptionsComponent(
  { children, open },
  ref
) {
  if (open)
    return (
      <div
        ref={ref}
        className="w-full lg:absolute top-12 lg:w-60 overflow-hidden left-0 bg-slate-100 lg:shadow-2xl lg:rounded-md mt-4 lg:mt-0"
      >
        <ul className="flex flex-col">{children}</ul>
      </div>
    );
});

function MenuOptionsItem({ text, link, icon }) {
  return (
    <li className="px-4 hover:bg-slate-200 duration-200 group">
      <Link
        href={link}
        className="text-slate-800 flex items-center gap-3 text-sm"
      >
        {icon}
        <span className="border-b border-slate-200 flex-1 py-3 group-last:border-none">
          {text}
        </span>
      </Link>
    </li>
  );
}
