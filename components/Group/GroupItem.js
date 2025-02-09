import React from "react";
import {
  FaAngleLeft,
  FaBattleNet,
  FaRegHeart,
  FaShareAlt,
  FaStar,
  FaStethoscope,
} from "react-icons/fa";
import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";
import {
  MdCastForEducation,
  MdInsertInvitation,
  MdOutlineTextsms,
  MdWifiProtectedSetup,
} from "react-icons/md";

const GroupItem = () => {
  return (
    <div className="bg-white shadow-lg dark:shadow-darkLg border border-primary-02 rounded-md w-full  ">
      <div className="w-full grid grid-cols-12 justify-center items-center p-2">
        <div className="w-fit col-span-4 flex justify-center items-center gap-2">
          <div className="w-fit h-fit relative">
            <img
              className="w-24 h-24 rounded-full"
              src="/images/PopularMounth/l-hatami.jpg"
              alt=""
            />
            <div className=" absolute bottom-2 right-2 w-3 h-3 bg-secondary-01 rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-5 h-5 bg-yellow-500 rounded-full"></div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="font-black">حمیده جنگجو</span>
            <span className="text-xs">HamidehJangjoo@</span>
            <span className="text-xs">کارشناس ارشد روانشناسی</span>
          </div>
        </div>
        <div className="w-fit col-span-8 flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-1 h-12">
            <div className="text-3xl bg-primary-05 px-1 py-2 flex justify-center items-center rounded-md w-20 h-full">
              <FaRegHeart />
            </div>
            <div className="text-3xl bg-primary-05 px-1 py-2 flex justify-center items-center rounded-md w-20 h-full ">
              <FaShareAlt />
            </div>
            <div className="text-lg bg-primary-05 px-1 py-2 flex justify-center items-center rounded-md w-20  h-full ">
              <FaLocationDot />
              <span className="text-sm">تهران</span>
            </div>
            <div className="text-xs bg-primary-05 px-1 py-2 flex flex-col justify-center items-center rounded-md w-20  h-full ">
              <div className="flex justify-center items-center gap-1 text-primary-01">
                <span className="flex justify-center items-center">
                  11.500+
                </span>
                <span className="flex justify-center items-center">
                  <FaStethoscope />
                </span>
              </div>

              <span className="w-full flex justify-center items-center">
                خدمت موفق              </span>
            </div>
            <div className="text-xs bg-primary-05 px-1 py-2 flex flex-col justify-center items-center rounded-md w-20  h-full ">
              <div className="flex justify-center items-center gap-1 text-primary-01">
                <span className="flex justify-center items-center">{4.9}</span>
                <span className="flex justify-center items-center">
                  <FaStar />
                </span>
              </div>

              <span className="w-full flex justify-center items-center">
                از {1996} نظرک
              </span>
            </div>
            <div className="text-lg bg-primary-05 px-1 py-2 flex justify-center items-center text-center rounded-md w-20  h-full ">
              <span className="text-sm">{12} سال تجربه</span>
            </div>
          </div>
          <div className=" flex justify-center items-center gap-1  text-xs">
            <span className="text-secondary-01">
              <FaLocationDot />
            </span>
            <span>
              یزد، یزد، یزد، محله حنا، طالقانی، طالقانی 9، دکتر سروناز ناصری نیا
              <span className="font-bold">مطب دکتر سروناز ناصری نیا</span>
            </span>
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-between items-center text-xs text-slate-700 p-2">
        <div className="flex justify-center items-center gap-2">
          <div className="w-full flex justify-center items-center gap-1 p-1 bg-slate-200 rounded-md ">
            <span>
              <FaPhoneFlip />
            </span>
            <span>تلفنی</span>
          </div>
          <div className="w-full flex justify-center items-center gap-1 p-1 bg-slate-200 rounded-md ">
            <span>
              <MdOutlineTextsms />
            </span>
            <span>متنی</span>
          </div>
          <div className="w-full flex justify-center items-center gap-1 p-1 bg-slate-200 rounded-md ">
            <span>
              <FaBattleNet />
            </span>
            <span>تور</span>
          </div>
          <div className="w-full flex justify-center items-center gap-1 p-1 bg-slate-200 rounded-md ">
            <span>
              <MdCastForEducation />
            </span>
            <span>آموزش</span>
          </div>
          <div className="w-full flex justify-center items-center gap-1 p-1 bg-slate-200 rounded-md ">
            <span>
              <MdInsertInvitation />
            </span>
            <span>دعوتنامه</span>
          </div>
          <div className="w-full flex justify-center items-center gap-1 p-1 bg-slate-200 rounded-md ">
            <span>
              <MdWifiProtectedSetup />
            </span>
            <span>حمایت</span>
          </div>
        </div>

        <div className=" flex justify-center items-center gap-1 text-primary-01 text-sm">
          <span>مشاهده پروفایل</span>
          <span>
            <FaAngleLeft />
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupItem;
