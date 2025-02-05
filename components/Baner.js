import React, { useState } from "react";
import { BiFilter, BiSearch, BiSlider, BiSolidDiscount } from "react-icons/bi";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { FaMasksTheater, FaSackDollar, FaUserDoctor } from "react-icons/fa6";
import { FcSportsMode } from "react-icons/fc";
import { MdOutlineSportsKabaddi, MdFolderSpecial } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { GiHiking, GiBugleCall } from "react-icons/gi";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { AiTwotoneExperiment } from "react-icons/ai";
import SliderComponent from "./SliderComponent";
import useMainPage from "@/hooks/useMainPage";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { CiCircleMore } from "react-icons/ci";
import Link from "next/link";

const iconMap = {
  FaSackDollar,
  BiFilter,
  BiSearch,
  FaMasksTheater,
  FaChevronCircleLeft,
  FcSportsMode,
  MdOutlineSportsKabaddi,
  FaUserDoctor,
  GoLaw,
  GiHiking,
  PiBuildingOfficeBold,
  BiSolidDiscount,
  AiTwotoneExperiment,
  GiBugleCall,
};

const sliderImg = [
  { title: "slider01", url: "/images/img001.jpg" },
  { title: "slider02", url: "/images/img002.jpg" },
  { title: "slider03", url: "/images/img003.jpg" },
];

const data = [
  {
    id: 1,
    icon: "FaSackDollar",
    title: "اقتصاد",
  },
  {
    id: 2,
    icon: "FaMasksTheater",
    title: "هنر",
  },
  {
    id: 3,
    icon: "FaUserDoctor",
    title: "سلامت و زیبایی",
  },
  {
    id: 4,
    icon: "MdOutlineSportsKabaddi",
    title: "ورزش",
  },

  {
    id: 5,
    icon: "GoLaw",
    title: "وکالت و حقوق",
  },
  {
    id: 6,
    icon: "GiHiking",
    title: "تفریح و گردش",
  },
  {
    id: 7,
    icon: "PiBuildingOfficeBold",
    title: "محبوب مال",
  },
  {
    id: 8,
    icon: "BiSolidDiscount",
    title: "پیشنهاد ویژه",
  },
  {
    id: 9,
    icon: "AiTwotoneExperiment",
    title: "تجربه",
  },
  {
    id: 10,
    icon: "GiBugleCall",
    title: "فراخوان",
  },
];
const Baner = () => {
  const { isLoading, categories, sliders, banners } = useMainPage();
  const [showComplete, setShowComplete] = useState(false);
  const topBanner =
    !isLoading &&
    banners.filter((b) => b.position === "slider-top-right-top")[0];
  const bottomBanner =
    !isLoading &&
    banners.filter((b) => b.position === "slider-top-right-bottom")[0];

  return (
    <div className="container h-full ">
      <div className="xs:w-full md:w-5/6 mx-auto  bg-white  rounded-2xl -mt-16  text-slate-800">
        <div className="hidden lg:grid grid-cols-11 gap-4 p-4">
          {!isLoading &&
            categories
              .filter((c) => c.parent_id === 0)
              .slice(0, showComplete ? categories.length : 10)
              .map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`/group/${item.id}`}
                    className="flex flex-col text-xs whitespace-nowrap justify-center items-center w-full hover:text-primary-01 hover:cursor-pointer"
                  >
                    <span className="text-3xl p-2">
                      <div>
                        {item.icon ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                          ></div>
                        ) : (
                          <img
                            src={item.pic}
                            alt=""
                            className="w-[30px] hover:fill-primary-01"
                          />
                        )}
                      </div>
                    </span>
                    <span className="lg:text-sm text-center">{item.name}</span>
                  </Link>
                );
              })}
          <div
            onClick={() => setShowComplete(!showComplete)}
            className="flex flex-col text-xs justify-center items-center w-full hover:text-primary-01  hover:cursor-pointer"
          >
            <span className="text-3xl p-2">
              <CiCircleMore />
            </span>
            <span className="lg:text-sm text-center">
              موارد {showComplete ? "کمتر" : "بیشتر"}
            </span>
          </div>
        </div>
        <div className="grid lg:hidden grid-cols-4 lg:grid-cols-8 gap-4 p-4">
          {!isLoading &&
            categories
              .filter((c) => c.parent_id === 0)
              .slice(0, showComplete ? categories.length : 7)
              .map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`/group/${item.id}`}
                    className="flex flex-col text-xs justify-center items-center w-full hover:text-primary-01 hover:cursor-pointer"
                  >
                    <span className="text-3xl p-2">
                      <div>
                        {item.icon ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                          ></div>
                        ) : (
                          <img src={item.pic} alt="" className="w-[30px]" />
                        )}
                      </div>
                    </span>
                    <span className="lg:text-sm text-center">{item.name}</span>
                  </Link>
                );
              })}
          <div
            onClick={() => setShowComplete(!showComplete)}
            className="flex flex-col text-xs justify-center items-center w-full hover:text-primary-01 hover:cursor-pointer"
          >
            <span className="text-3xl p-2">
              <CiCircleMore />
            </span>
            <span className="lg:text-sm text-center">
              موارد {showComplete ? "کمتر" : "بیشتر"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 h-full">
          <div className=" hidden md:grid md:col-span-4 grid-rows-2 ">
            <Link href={'/auth'}>
              <div className="aspect-w-16 aspect-h-6">
                <img
                  className="object-cover object-center h-full w-full"
                  src={topBanner?.photo?.path}
                  alt={topBanner?.title}
                />
              </div>
            </Link>
            <Link href={'/auth'}>

              <div className="aspect-w-16 aspect-h-6">
                <img
                  className="object-cover object-center h-full w-full"
                  src={bottomBanner?.photo?.path}
                  alt={bottomBanner?.title}
                />
              </div>
            </Link>

          </div>
          <div className="w-full h-full md:col-span-8">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              className={"h-full rounded-ee-2xl rounded-es-2xl  md:rounded-es-none "}
              spaceBetween={60}
              // navigation
              pagination={{ clickable: true }}
              loop
              slidesPerView={1}
              autoplay={{ delay: 4000 }}
            >
              {!isLoading &&
                sliders.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full">
                        <img
                          className="w-full h-64 md:h-full object-cover object-center"
                          src={item.photo?.path}
                          alt={item.title}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baner;
