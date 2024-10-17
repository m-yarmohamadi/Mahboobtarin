import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const sliderImg = [
  {
    id: 1,
    url: "images/Baner003.png",
    title: "baner01",
  },
  {
    id: 1,
    url: "images/Baner003.png",
    title: "baner02",
  },
  {
    id: 1,
    url: "images/Baner003.png",
    title: "baner03",
  },
  {
    id: 1,
    url: "images/Baner003.png",
    title: "baner04",
  },
];

const Baner03 = () => {
  return (
    <div className="py-16">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={2000}
        navigation
        loop
        slidesPerView={1}
        autoplay
        pagination={{ clickable: true }}
        scrollbar={false}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {sliderImg.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div>
                <div className="w-full relative">
                  <img
                    className="h-56 w-full object-cover xs:object-left-bottom md:object-center"
                    src={item.url}
                    alt={item.title}
                  />
                  <div className=" hidden md:block container w-full">
                    <div className="w-full h-full  absolute top-0 right-0 flex justify-between justify-items-center items-center">
                      <div className="ps-8 md:ps-0 w-full text-white flex flex-col justify-center items-center gap-4">
                        <span className="text-2xl md:text-4xl font-extrabold">
                          روانشناسی برای همه !
                        </span>
                        <span className=" px-8 md:px-0 text-xl md:text-2xl font-bold">
                          خدمات روانشناسی با تعرفه های به صرفه{" "}
                        </span>
                        <button
                          className=" bg-white text-primary-01 font-extrabold  text-2xl md:text-3xl py-2 px-8 rounded-2xl hover:shadow-md dark:shadow-darkMd hover:opacity-80"
                          type=""
                        >
                          شروع مشاوره
                        </button>
                      </div>
                      <div className="w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Baner03;
