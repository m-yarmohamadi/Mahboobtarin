import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const sliderImg = [
    {
        id: 1,
        url: 'images/Baner004.png',
        title: 'baner01',
    },
    {
        id: 1,
        url: 'images/Baner004.png',
        title: 'baner02',
    },
    {
        id: 1,
        url: 'images/Baner004.png',
        title: 'baner03',
    },
    {
        id: 1,
        url: 'images/Baner004.png',
        title: 'baner04',
    },
];

const Baner04 = () => {
    return (
        <div className="pb-16">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={60}
                navigation
                loop
                slidesPerView={1}
                autoplay
                pagination={{ clickable: true }}
                scrollbar={false}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {sliderImg.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div>
                                <div className="w-full relative">
                                    <img
                                        className="h-56 w-full object-cover"
                                        src="/images/Baner004.png"
                                        alt=""
                                    />
                                    <div className=" container w-full">
                                        <div className="w-full h-full  absolute top-0 right-0 flex justify-between justify-items-center items-center">
                                            <div className="  w-full text-white flex flex-col justify-center items-center gap-4">
                                                <span className="text-3xl font-extrabold">
                                                    راه مهارت
                                                </span>
                                                <span className="text-xl font-bold">
                                                    5 تا 15 اردیبهشت ماه{' '}
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

export default Baner04;
