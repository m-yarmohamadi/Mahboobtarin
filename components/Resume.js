import React from "react";
import { LiaCertificateSolid } from "react-icons/lia";
import { PiBagBold } from "react-icons/pi";
import { GiMaterialsScience } from "react-icons/gi";
import { TbSettingsCheck } from "react-icons/tb";
import { MdOutlineForum } from "react-icons/md";
import useMainPage from "@/hooks/useMainPage";

const Resume = () => {
  const { why_us, isLoading } = useMainPage();
  return (
    <div className="py-8 bg-gradient-to-b from-primary-02 to-white">
      <div className=" md:container px-8 md:px-0 ">
        <div className="flex justify-center items-center text-2xl font-bold p-8 text-textDefault">
          چرا محبوب‌ترین؟
        </div>
        <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 items-start justify-items-center text-4xl text-primary-01">
          {why_us?.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-center items-center"
            >
              <div className="w-full flex justify-center items-center">
                <div
                  dangerouslySetInnerHTML={{ __html: item.image }}
                  className=" border border-primary-01 p-4 rounded-3xl w-fit"
                ></div>
              </div>
              <div className="flex flex-col justify-center items-center justify-items-center">
                <span className="whitespace-nowrap py-3 font-bold text-xl text-slate-800">
                  {item.title}
                </span>
                <p className="text-sm text-center text-slate-900">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resume;
