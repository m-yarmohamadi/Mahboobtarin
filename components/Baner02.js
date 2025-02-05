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
import useMainPage from "@/hooks/useMainPage";

const Baner02 = () => {
  const { banners, isLoading } = useMainPage();
  const sliderData =
    !isLoading &&
    banners.filter((b) => b.position === "slider-services-bottom");

  return (
    <div className="py-16">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={60}
        // navigation={{
        //   nextEl: ".custom-button-next",
        //   prevEl: ".custom-button-prev",
        // }}
        loop
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {!isLoading && sliderData?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="w-full relative">
                <img
                  className="w-full h-80 object-cover object-center"
                  src={item?.photo?.path}
                  alt={item?.title}
                />

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Baner02;
