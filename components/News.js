import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useMainPage from "@/hooks/useMainPage";

const News = () => {
  const { posts, isLoading } = useMainPage();

  if (isLoading) return null;

  return (
    <div className=" bg-white py-16">
      <div className="px-8 pb-8">
        <button
          className="py-2 px-8 bg-primary-01 text-white text-xl font-bold rounded-lg"
          type=""
        >
          مجله محبوب‌ترین
        </button>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={5}
        navigation={false}
        loop
        slidesPerView={1}
        autoplay={{
          delay: 5000, // زمان تاخیر بین هر اسلاید به میلی‌ثانیه (4 ثانیه)
          disableOnInteraction: false, // اجازه می‌دهد اسلایدر بعد از تعامل کاربر ادامه یابد
        }}
        pagination={{ clickable: true }}
        scrollbar={false}
      >
        {posts.slice(0, 4).map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="md:container px-8 md:px-0 grid sm:grid-cols-1 lg:grid-cols-2 md:gap-x-20 ">
                <div className="flex-1">
                  <div className="text-textDefault  font-semibold text-xl md:text-2xl py-8">
                    <p className="text-justify border-r-8 border-primary-01 p-2 ">
                      {item.title}{" "}
                    </p>
                  </div>
                  <div className="pb-8">
                    <div className=" text-justify text-sm md:text-base leading-7 md:leading-8">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.descriptin }}
                        className="!min-w-none text-textDefault line-clamp-6"
                      ></div>
                      <span className=" text-primary-01 cursor-pointer">
                        ادامه مطلب...
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    className="w-full rounded-xl lg:rounded-s-none lg:rounded-ee-none lg:rounded-se-3xl"
                    src={item.photo.path}
                    alt={item.photo.title}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className=" md:container px-8 md:px-0 pt-16">
        <div className="w-full sm:grid xs:flex sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:overflow-x-scroll md:overflow-hidden">
          {posts.slice(5, 8).map((item, index) => (
            <div key={index} className="w-full xs:min-w-full">
              <div className="aspect-w-16 aspect-h-10">
                <img
                  className="w-full h-full object-cover object-center shadow-md dark:shadow-darkMd shadow-primary-01 rounded-ss-3xl"
                  src={item.photo.path}
                  alt={item.photo.title}
                />
              </div>
              <div className=" shadow-md dark:shadow-darkMd gap-1 flex flex-col justify-center items-start p-4 border-r-8 border-primary-01">
                <span className="text-sm font-bold text-textDefault">
                  {item.title}
                </span>
                <span className="text-sm text-textDefault">
                  کاربرد در کاهش وزن
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
