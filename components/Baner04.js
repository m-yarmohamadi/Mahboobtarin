import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useMainPage from "@/hooks/useMainPage";

const Baner04 = () => {
  const { banners, isLoading } = useMainPage();
  const sliderData =
    !isLoading && banners.filter((b) => b.position === "slider-posts-bottom");

  return (
    <div className="">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={60}
        navigation={false}
        loop
        slidesPerView={1}
        autoplay
        pagination={{ clickable: true }}
        scrollbar={false}
      >
        {!isLoading &&
          sliderData.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div>
                  <div className="w-full relative">
                    <img
                      className="h-80 md:h-64 w-full object-cover md:object-center"
                      src={item?.photo?.path}
                      alt={item?.title}
                    />
                    {/* <div className=" container w-full">
                    <div className="w-full h-full  absolute top-0 right-0 flex justify-between justify-items-center items-center">
                      <div className="  w-full text-white flex flex-col justify-center items-center gap-4">
                        <span className="text-3xl font-extrabold">
                          راه مهارت
                        </span>
                        <span className="text-xl font-bold">
                          5 تا 15 اردیبهشت ماه{" "}
                        </span>
                        <button
                          className=" bg-white text-primary-01 font-extrabold text-xl py-2 px-8 rounded-2xl"
                          type=""
                        >
                          مشاهده
                        </button>
                      </div>
                      <div className="w-full"></div>
                    </div>
                  </div> */}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Baner04;
