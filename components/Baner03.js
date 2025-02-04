import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useMainPage from "@/hooks/useMainPage";
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
  const { banners, isLoading } = useMainPage();
  const sliderData =
    !isLoading && banners.filter((b) => b.position === "slider-popularsearch-bottom");

  return (
    <div className="py-16">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={2000}
        navigation={false}
        loop
        slidesPerView={1}
        autoplay
        // pagination={{ clickable: true }}
        scrollbar={false}
      >
        {!isLoading &&
          sliderData.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div>
                  <div className="w-full relative">
                    <img
                      className="h-56 w-full object-cover xs:object-left-bottom md:object-center"
                      src={item?.photo?.path}
                      alt={item?.title}
                    />
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
