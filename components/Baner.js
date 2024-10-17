import React from "react";
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
  const { isLoading, categories, sliders } = useMainPage();

  return (
    <div className="xxs:container ">
      <div className="xs:full md:w-5/6 mx-auto  bg-white  rounded-2xl -mt-16  text-slate-800">
        <div className="w-full h-full relative flex justify-evenly items-start py-2 gap-2 text-xs  scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin overflow-auto">
          <button className="disabled:text-primary-01/30 swiper-categroy-prev flex flex-col justify-center items-center text-primary-01  hover:text-opacity-80 hover:cursor-pointer">
            <span className="justify-items-center text-3xl p-4 flex justify-center items-center">
              <FaChevronCircleRight />
            </span>
          </button>

          <Swiper
            modules={[Navigation]}
            slidesPerView={"auto"}
            autoplay
            navigation={{
              nextEl: ".swiper-categroy-next",
              prevEl: ".swiper-categroy-prev",
            }}
          >
            {!isLoading &&
              categories.map((item, index) => {
                return (
                  <SwiperSlide key={index} className="!w-auto !mr-5">
                    <div className="flex flex-col justify-center items-center w-full hover:text-primary-01 hover:cursor-pointer">
                      <span className="text-3xl p-2">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        ></div>
                      </span>
                      <span className="lg:text-sm text-center">
                        {item.name}
                      </span>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>

          <button className="swiper-categroy-next disabled:text-primary-01/30 flex flex-col justify-center items-center text-primary-01  hover:text-opacity-80 hover:cursor-pointer">
            <span className="justify-items-center text-3xl p-4 flex justify-center items-center">
              <FaChevronCircleLeft />
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 h-73 ">
          <div className=" hidden md:block w-full h-full   ">
            <img
              className=" object-cover object-left-bottom h-full w-full "
              src="/images/img001.jpg"
              alt=""
            />
          </div>
          <div className="w-full h-full  col-span-2 row-span-2 ">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              className={"h-full rounded-ee-2xl"}
              spaceBetween={60}
              navigation
              loop
              slidesPerView={1}
              autoplay={{ delay: 4000 }}
            >
              {!isLoading &&
                sliders.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full ">
                        <img
                          className="w-full h-full object-cover"
                          src={item.photo?.path}
                          alt={item.title}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
          <div className="hidden md:block w-full h-full   ">
            <img
              className=" object-cover object-left-bottom h-full w-full rounded-es-2xl "
              src="/images/img003.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baner;
