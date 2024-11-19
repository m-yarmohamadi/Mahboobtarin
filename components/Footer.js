import useAllSettings from "@/hooks/useAllSettings";
import Platform from "@/tools/Platform";
import Link from "next/link";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  FaGooglePlay,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const data = useAllSettings();

  return (
    <div className=" text-textDefault">
      <div className=" md:container px-8 md:px-0">
        <div className="grid lg:grid-cols-12 lg:gap-14 grid-cols-1">
          <div className=" w-full lg:col-span-7 ">
            <div className="py-8 flex justify-start items-center justify-items-start w-full">
              <img
                className=" w-56 dark:brightness-200"
                src={data?.footerlogo}
                alt=""
              />
            </div>
            <div>
              <div
                className="text-justify text-sm"
                dangerouslySetInnerHTML={{ __html: data?.about }}
              ></div>
            </div>
            <div className="grid grid-cols-2 justify-start w-full text-xs xs:text-sm font-medium py-8">
              <div className="flex flex-col justify-start items-start w-full gap-2">
                <Link href={"/contact-us"}><span>ارتباط با ما</span></Link>
                <Link href={"/about"}><span>درباره ما</span></Link>
                <Link href={"/"}><span>مجله محبوب‌ترین</span></Link>
                <Link href={"/auth"}><span>ثبت‌نام کاربران</span></Link>
                <Link href={"/auth"}><span>ثبت‌نام متخصصان</span></Link>
              </div>
              <div className="flex flex-col justify-start items-start w-full gap-2">
                <Link href={"/faq"}><span>سوالات متداول</span></Link>
                <Link href={"/group/366"}><span>دسته بندی محبوب‌ترین</span></Link>
                <Link href={"/"}><span>قوانین و مقررات</span></Link>
                <Link href={"/"}><span>راهنمای عضویت</span></Link>
                <Link href={"/"}><span>خط و مشی محبوب‌ترین</span></Link>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center items-center gap-y-8 w-full ">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex justify-center items-center  p-2 font-bold">
                دریافت محبوب‌ترین
              </div>
              <div className=" w-full grid grid-cols-1 xs:grid-cols-2  gap-y-2 gap-x-4 text-sm font-bold  justify-between items-center">
                <div className="w-full bg-white p-2 rounded-md flex justify-between items-center shadow-sm  hover:text-primary-01 hover:cursor-pointer hover:shadow-md dark:shadow-darkMd">
                  <span>دریافت از بازار</span>
                  <span>
                    <FaGooglePlay />
                  </span>
                </div>
                <div className="w-full bg-white p-2 rounded-md flex justify-between items-center shadow-sm  hover:text-primary-01 hover:cursor-pointer hover:shadow-md dark:shadow-darkMd">
                  <span>دریافت از گوگل پلی</span>
                  <span>
                    <FaGooglePlay />
                  </span>
                </div>
                <div className="w-full bg-white p-2 rounded-md flex justify-between items-center shadow-sm  hover:text-primary-01 hover:cursor-pointer hover:shadow-md dark:shadow-darkMd">
                  <span>دریافت از مایکت</span>
                  <span>
                    <FaGooglePlay />
                  </span>
                </div>
                <div className="w-full bg-white p-2 rounded-md flex justify-between items-center shadow-sm  hover:text-primary-01 hover:cursor-pointer hover:shadow-md dark:shadow-darkMd">
                  <span>دریافت مستقیم</span>
                  <span>
                    <FaGooglePlay />
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex justify-start items-center text-3xl gap-4 text-slate-500">
              <Link
                href={data?.instagram || "#"}
                target="_blank"
                className={`hover:cursor-pointer`}
              >
                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </Link>
              <Link
                href={data?.telegram || "#"}
                target="_blank"
                className={`hover:cursor-pointer`}
              >
                <FaTelegram className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </Link>
              <Link
                href={data?.twitter || "#"}
                target="_blank"
                className={`hover:cursor-pointer`}
              >
                <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </Link>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-5 justify-items-center items-center w-full gap-x-2">
              <div className="w-16 p-3 ">
                <img
                  className=" w-full hover:grayscale"
                  src="/images/gardeshgari.png"
                  alt=""
                />
              </div>
              <div className="w-16 p-3 ">
                <img
                  className=" w-full hover:grayscale"
                  src="/images/eNamad.png"
                  alt=""
                />
              </div>
              <div className="w-16 p-3 ">
                <img
                  className=" w-full hover:grayscale"
                  src="/images/samandehi.png"
                  alt=""
                />
              </div>
              <div className="w-16 p-3 ">
                <img
                  className=" w-full hover:grayscale"
                  src="/images/Lisence002.png"
                  alt=""
                />
              </div>
              <div className="w-16 p-3 ">
                <img
                  className=" w-full hover:grayscale"
                  src="/images/Lisence003.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" justify-items-center flex justify-center items-center text-xs md:text-sm md:font-bold text-slate-500 border-t-2  border-white py-4">
          <p className="text-center"> {data?.copyright}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
