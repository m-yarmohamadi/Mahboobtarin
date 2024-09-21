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
import { useGetExpertiseAllUsers } from "@/hooks/useExpertiseUser";
import Link from "next/link";

const PopularMounth = () => {
  const { data, isLoading } = useGetExpertiseAllUsers();
  if (isLoading) return null;

  return (
    <div className="w-full container mx-auto pt-12 ">
      <div className="w-full px-2 py-4 flex  justify-center items-center justify-items-center font-extrabold text-2xl">
        محبوب ترین های ماه
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        navigation={{
          nextEl: "#most-populars-btn-next",
          prevEl: "#most-populars-btn-prev",
        }}
        loop
        slidesPerView={1}
        spaceBetween={3}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 15,
          },
          1536: {
            slidesPerView: 8,
            spaceBetween: 20,
          },
        }}
        autoplay={{ delay: 4000 }}
        pagination={false}
        scrollbar={false}
      >
        {data.map((item) => {
          return (
            <SwiperSlide key={item.id} className="!w-auto !inline-block">
              <Link
                href={`/profile/${item.id}`}
                className="w-full flex flex-col justify-center items-center justify-items-center text-center"
              >
                <div className="w-full flex justify-center items-center justify-items-center text-center px-5">
                  <div className="my-1 flex items-center justify-center rounded-full w-20 h-20 overflow-hidden ring-2 ring-primary-01 ring-offset-2">
                    <img
                      className={
                        !item?.avatar?.length
                          ? "w-11 h-11 md:w-12 md:h-12"
                          : "w-full h-full object-cover object-center grayscale hover:grayscale-0"
                      }
                      src={
                        item?.avatar?.length
                          ? item?.avatar[0]?.path
                          : "/images/defaultUser.png"
                      }
                      alt={`${item?.name} ${item?.lastname} `}
                    />
                  </div>
                </div>
                <span className="pt-2 flex justify-center items-center">
                  {item.name} {item.lastname}
                </span>
                <span className="pb-2 flex justify-center items-center text-gray-400 text-sm">
        {item?.expertises[0]?.subject}
                </span>
              </Link>
            </SwiperSlide>
          );
        })}

        <button
          id="most-populars-btn-next"
          className="custom-button-prev z-40  -left-3"
        >
          <FaChevronLeft />
        </button>
        <button
          id="most-populars-btn-prev"
          className="custom-button-next z-40  -right-3"
        >
          <FaChevronRight />
        </button>
      </Swiper>
    </div>
  );
};

export default PopularMounth;
