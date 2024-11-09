import PN from "persian-number";

import { AiTwotoneStar } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const RecommendedDoctors = ({ data }) => {
  const setConfirmationItem = (i) => {
    if (i === "2") {
      return "bg-green-600";
    }
    if (i === "0") {
      return "bg-red-600";
    }
    if (i === "1") {
      return "bg-slate-600";
    }
  };
  return (
    <div className=" md:container px-8 md:px-0">
      <div className="flex justify-between items-center font-semibold">
        <div className="flex justify-center items-center gap-1">
          <div className=" bg-primary-01 w-4 h-4 rounded-full"></div>
          <span className="text-textDefault">{data.title}</span>
        </div>
        <div className="flex justify-center items-center gap-1 text-primary-01 hover:cursor-pointer ">
          <span>نمایش همه</span>
          <span>
            <FaAngleLeft />
          </span>
        </div>
      </div>
      <div className="w-full pt-4">
        <Swiper slidesPerView={'auto'}>
          {data.metekhases.map((item) => (
            <SwiperSlide key={item.id} className="!w-auto inline-block ml-8 py-1">
              <Link
                key={item.id}
                href={item.unique_url_id}
                className="w-full bg-primary-02 px-6 shadow-md dark:shadow-darkMd  rounded-md py-4 flex flex-col justify-center items-center "
              >
                <div className=" relative w-28 h-28 rounded-full shadow-md dark:shadow-darkMd">
                  <img
                    className="rounded-full w-full h-full object-cover object-center"
                    src={item.avatar ? item.avatar : "/images/user.png"}
                    alt=""
                  />
                  <div
                    className={` absolute top-2 right-2 w-4 h-4 ${setConfirmationItem(
                      item.is_online
                    )} rounded-full border border-white`}
                  ></div>
                </div>
                <div className="w-full flex justify-around items-center p-4">
                  <div className="flex justify-center items-center gap-1 bg-orange-100 p-1 rounded-md text-orange-700 font-semibold text-sm">
                    <span>{PN.convertEnToPe(`4`)}</span>

                    <span>
                      <AiTwotoneStar />
                    </span>
                  </div>
                  <span className="flex justify-center items-center gap-1 p-1 rounded-md text-primary-01 font-semibold text-sm">
                    {PN.convertEnToPe(`558`)}+<span>مشاوره</span>
                  </span>
                </div>
                <span className="text-sm sm:text-base font-semibold text-textDefault">
                  {item.name} {item.lastname}
                </span>
                <span className="text-xs sm:text-sm text-textDefault">
                  {/* {item.title} */}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendedDoctors;
