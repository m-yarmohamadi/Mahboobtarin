import React, { useRef } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import useMainPage from "@/hooks/useMainPage";

const Services = () => {
  const { what_service, isLoading } = useMainPage();

  const data = [
    {
      id: 1,
      url: "/images/OnlineCounseling.png",
      title: "مشاوره آنلاین",
    },
    {
      id: 2,
      url: "/images/OnlineReservation.png",
      title: "نوبت دهی آنلاین",
    },
    {
      id: 3,
      url: "/images/Education.webp",
      title: "آموزش",
    },
    {
      id: 4,
      url: "/images/HomeService.png",
      title: "کار در منزل",
    },
    {
      id: 5,
      url: "/images/OnlineShop.png",
      title: "فروشگاه آنلاین",
    },
    {
      id: 6,
      url: "/images/OnlineCounseling.png",
      title: "مشاوره آنلاین",
    },
    {
      id: 7,
      url: "/images/OnlineReservation.png",
      title: "نوبت دهی آنلاین",
    },
  ];

  return (
    <div>
      <div className="w-full container mx-auto px-0 ">
        <div className="w-full md:p-2 flex  justify-center items-center font-extrabold text-xl md:text-2xl text-textDefault">
        چرا محبوب‌ترین؟
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          // navigation={{
          //   nextEl: ".custom-button-next",
          //   prevEl: ".custom-button-prev",
          // }}
          className={"px-4"}
          slidesPerView={1}
          spaceBetween={3}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 7,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 9,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 11,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 13,
            },
            1536: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
          }}
          autoplay={{ delay: 7000 }}
          pagination={false}
          scrollbar={false}
        >
          {!isLoading && what_service.map((item) => {
            return (
              <SwiperSlide
                key={item.id}
                className="flex items-center justify-center justify-items-center"
              >
                <div className="w-full flex justify-center justify-items-center items-center">
                  <div className="h-52 w-52    m-4 rounded-2xl shadow-md dark:shadow-darkMd bg-white p-2 z-0">
                    <div className="relative flex justify-center items-center m-4">
                      <div className="h-40 w-40 flex items-center justify-center border-4 border-dashed overflow-hidden border-primary-01 border-opacity-35   rounded-full  z-10">
                        <img
                          className="w-28 h-28 m-auto inset-0 object-contain object-center "
                          src={item.photo.path || ""}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="flex justify-center items-center font-normal text-center text-slate-700 xs:px-4 lg:px-2 ">
                  {item.title}
                </span>
              </SwiperSlide>
            );
          })}
          {/* <button className="custom-button-prev px-10   -left-3">
            <FaChevronLeft />
          </button>
          <button className="custom-button-next   -right-3">
            <FaChevronRight />
          </button> */}
        </Swiper>
      </div>
    </div>
  );
};

export default Services;
