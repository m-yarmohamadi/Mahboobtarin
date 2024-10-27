import React, { useEffect, useState } from 'react';
import TitleItems from './TitleItems';
import { FaClock, FaComment, FaDochub, FaSearch, FaTextWidth, FaTimes } from 'react-icons/fa';
import { BsChatText } from 'react-icons/bs';

import { FaClockRotateLeft } from "react-icons/fa6";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import Input from "@/tools/Input";
import Modal from "@/components/Modal";
import BookingForm from "./BookingForm";
import { useGetServices, useGetServicesProfile } from "@/hooks/useDashboard";
import numberWithCommas from "@/utils/numberWithCommas";
import getPriceService from "@/components/admin/adminProfileSteps/myservices/getPriceService";
import ExpertServicesList from "./detailProfileComponents/ExpertServicesList";
import OtherExpert from "./detailProfileComponents/OtherExpert";


const LeftProfile = ({ user }) => {
	const [showIdeasDetail, setShowIdeasDetail] = useState(1);
	const { isLoadingServices, servicesData } = useGetServicesProfile(user?.id);
	const [modal, setModal] = useState(0);

  return (
    <div className="w-full  ">
      <div className="hidden lg:block">
        <ExpertServicesList user={user}/>
      </div>
      {/* {!isLoadingServices && servicesData && servicesData.length ? (
        <div className="p-2 ">
          <div className="border border-slate-400 rounded-md p-4  w-full">
            <TitleItems title={"پلن های خدمات"} />
            <div className="w-full flex flex-col justify-center items-center gap-2">
              {!isLoadingServices &&
                servicesData?.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setShowIdeasDetail(index + 1)}
                      className="  cursor-pointer w-full flex flex-col justify-center items-start gap-2 p-1 pb-3  border border-slate-400 rounded-md"
                    >
                      <div
                        onClick={() => setModal(item.id)}
                        className="w-full flex-col sm:flex-row sm:items-center flex justify-between gap-4"
                      >
                        <div className=" flex items-center gap-1 truncate">
                          <div>
                            <span className="rounded-md flex justify-center items-center text-lg text-primary-01 bg-primary-01 bg-opacity-20 w-8 h-8">
                              <BsChatText />
                            </span>
                          </div>
                          <span className="font-bold text-sm truncate text-textDefault">
                            {item.type}
                          </span>
                        </div>
                        <span className="text-primary-01 flex-1 justify-end items-center gap-1 flex text-sm pl-3 font-bold">
                          {item.price_type === "custom" ? (
                            <>
                              {numberWithCommas(item.price)}
                              <span className="text-xs font-normal">تومان</span>
                            </>
                          ) : (
                            getPriceService(item.price_type)
                          )}
                        </span>
                      </div>
                      <Modal
                        title={item.type}
                        open={modal === Number(item.id)}
                        onClose={() => setModal(0)}
                      >
                        <BookingForm
                          onClose={() => setModal(0)}
                          serviceID={item.id}
                          userId={user?.id}
                          expert={user}
                        />
                      </Modal>
                      {showIdeasDetail === index + 1 && (
                        <div className="ps-2 flex flex-col justify-start items-center gap-2 text-slate-600">
                          <div className="w-full flex justify-start items-center gap-1">
                            <span>
                              <FaClock />
                            </span>
                            <span className="text-xs">
                              پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت){" "}
                            </span>
                          </div>
                          <div className="w-full flex justify-start items-center gap-1">
                            <span>
                              <FaClockRotateLeft />
                            </span>
                            <span className="text-sm">پایان توافقی گفتگو </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : null} */}
      <div className="hidden lg:block">
        <OtherExpert />
      </div>
      <div className="p-3">
        <div className="bg-slate-200 px-3 h-12 gap-1 flex justify-start items-center border border-slate-400 rounded-full">
          <span className="text-slate-500">
            <FaSearch className="w-5 h-5" />
          </span>

          <input
            className="bg-slate-200 rounded-md text-sm focus:ring-red-200  p-1 w-full outline-none text-slate-900"
            placeholder="جستجو در محبوب‌ترین"
            type="search"
            name=""
            value=""
          />
        </div>
        <div className="w-full h- px-2 my-2 bg-slate-200 rounded-md shadow-md dark:shadow-darkMd">
          <div className="p-4">
            <span className="text-lg font-bold text-textDefault">
              جستجو های پرتکرار
            </span>
          </div>
          <div className=" flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              متخصص زنان
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              غدد و متابولیسم
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              دیابت
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              پوست
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              زیبایی
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              بازیگری
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              برنامه نویس
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              فیلمنامه
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              هنرور
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              مغز و اعصاب
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              آموزش فوتبال
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              گوش و حلق و بینی
            </span>
            <span className="px-3 py-1.5 text-slate-800 bg-slate-100 shadow-sm dark:shadow-darkSm rounded-3xl">
              نقاشی
            </span>
          </div>
          <div className="pt-40 pb-2">
            <span className="text-primary-01 font-bold p-2">بیشتر</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftProfile;
