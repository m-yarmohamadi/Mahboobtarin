import React from "react";
import { LiaCertificateSolid } from "react-icons/lia";
import { PiBagBold } from "react-icons/pi";
import { GiMaterialsScience } from "react-icons/gi";
import { TbSettingsCheck } from "react-icons/tb";
import { MdOutlineForum } from "react-icons/md";

const Resume = () => {
  return (
    <div className="py-8 bg-gradient-to-b from-primary-02 to-white">
      <div className=" md:container px-8 md:px-0 ">
        <div className="flex justify-center items-center text-2xl font-bold p-8 text-textDefault">
          چرا محبوب‌ترین؟
        </div>
        <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 items-start justify-items-center text-4xl text-primary-01">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <div className=" border border-primary-01 p-4 rounded-3xl w-fit">
                <LiaCertificateSolid />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center justify-items-center">
              <span className="whitespace-nowrap py-3 font-bold text-xl text-slate-800">
                دانشنامه چند منظوره
              </span>
              <p className="text-sm text-center text-slate-900">
                شناساندن مفاخر و مشاهیر و تسهیل دسترسی به آنان
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <div className=" border border-primary-01 p-4 rounded-3xl w-fit">
                <PiBagBold />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center justify-items-center">
              <span className="whitespace-nowrap py-3 font-bold text-xl text-slate-800">
                تسهیل استخدام
              </span>
              <p className="text-sm text-center text-slate-900">
                شانس استخدام بیشتر برای فارغ التحصیلان دوره ها در سایت های
                کاریابی
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <div className=" border border-primary-01 p-4 rounded-3xl w-fit">
                <GiMaterialsScience />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center justify-items-center">
              <span className="whitespace-nowrap py-3 font-bold text-xl text-slate-800">
                راهنمای علمی
              </span>
              <p className="text-sm text-center text-slate-900">
                پاسخ گویی به سوالات و راهنمایی توسط استاد یا منتور دوره
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <div className=" border border-primary-01 p-4 rounded-3xl w-fit">
                <TbSettingsCheck />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center justify-items-center">
              <span className="whitespace-nowrap py-3 font-bold text-xl text-slate-800">
                پروژه محور
              </span>
              <p className="text-sm text-center text-slate-900">
                دوره های پروزه محور برای کسب مهارت انجام پروژه های واقعی
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <div className=" border border-primary-01 p-4 rounded-3xl w-fit">
                <MdOutlineForum />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center justify-items-center">
              <span className="whitespace-nowrap py-3 font-bold text-xl text-slate-800">
                تالار گفتگو
              </span>
              <p className="text-sm text-center text-slate-900">
                امکان برقراری ارتباط با دانشجویان و پرسش سوالات
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
