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
        urlImg: 'images/omicron.png',
        titleImg: 'news01',
        titleNews: 'جــدیدترین عــلائم کـرونا با شیـوع سویه های جدید BQ1و SBB',
        descriptionNews:
            'امیکرون نام سویه جدید از ویروس کرونا است که برای اولین بار در آفریقای جنوبی کشف شد و به سرعت در سراسر جهان گسترش پیدا کرد. اصلی ترین علائم کرونا امیکرون عبارتند از بدن درد، عطسه، آبریزش بینی، خارش گلو و خستگی. نکته مهم در مورد امیکرون، مدت زمانی است که این ویروس فرد را درگیر می کند.',
    },
    {
        id: 2,
        urlImg: 'images/omicron.png',
        titleImg: 'news02',
        titleNews: 'جــدیدترین عــلائم کـرونا با شیـوع سویه های جدید BQ1و SBB',
        descriptionNews:
            'امیکرون نام سویه جدید از ویروس کرونا است که برای اولین بار در آفریقای جنوبی کشف شد و به سرعت در سراسر جهان گسترش پیدا کرد. اصلی ترین علائم کرونا امیکرون عبارتند از بدن درد، عطسه، آبریزش بینی، خارش گلو و خستگی. نکته مهم در مورد امیکرون، مدت زمانی است که این ویروس فرد را درگیر می کند.',
    },
    {
        id: 3,
        urlImg: 'images/omicron.png',
        titleImg: 'news03',
        titleNews: 'جــدیدترین عــلائم کـرونا با شیـوع سویه های جدید BQ1و SBB',
        descriptionNews:
            'امیکرون نام سویه جدید از ویروس کرونا است که برای اولین بار در آفریقای جنوبی کشف شد و به سرعت در سراسر جهان گسترش پیدا کرد. اصلی ترین علائم کرونا امیکرون عبارتند از بدن درد، عطسه، آبریزش بینی، خارش گلو و خستگی. نکته مهم در مورد امیکرون، مدت زمانی است که این ویروس فرد را درگیر می کند.',
    },
    {
        id: 4,
        urlImg: 'images/omicron.png',
        titleImg: 'news04',
        titleNews: 'جــدیدترین عــلائم کـرونا با شیـوع سویه های جدید BQ1و SBB',
        descriptionNews:
            'امیکرون نام سویه جدید از ویروس کرونا است که برای اولین بار در آفریقای جنوبی کشف شد و به سرعت در سراسر جهان گسترش پیدا کرد. اصلی ترین علائم کرونا امیکرون عبارتند از بدن درد، عطسه، آبریزش بینی، خارش گلو و خستگی. نکته مهم در مورد امیکرون، مدت زمانی است که این ویروس فرد را درگیر می کند.',
    },
];
const News = () => {
    return (
        <div className=" bg-white py-16">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={5}
                navigation={false}
                loop
                slidesPerView={1}
                autoplay={{
                    delay: 4000, // زمان تاخیر بین هر اسلاید به میلی‌ثانیه (4 ثانیه)
                    disableOnInteraction: false, // اجازه می‌دهد اسلایدر بعد از تعامل کاربر ادامه یابد
                }}
                pagination={{ clickable: true }}
                scrollbar={false}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {sliderImg.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="md:container px-8 md:px-0 grid sm:grid-cols-1 lg:grid-cols-2 md:gap-x-20 ">
                                <div>
                                    <button
                                        className="py-2 px-8 bg-primary-01 text-white text-xl font-bold rounded-lg"
                                        type=""
                                    >
                                        مجله محبوب ترین
                                    </button>
                                    <div className="  font-semibold text-2xl py-8">
                                        <p className=" text-justify border-r-8 border-primary-01 p-2">
                                            {item.titleNews}{' '}
                                        </p>
                                    </div>
                                    <div className="py-8">
                                        <p className=" text-justify text-lg">
                                            {item.descriptionNews}
                                            <span className=" text-primary-01 cursor-pointer">
                                                ادامه مطلب...
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        className="w-full rounded-xl lg:rounded-s-none lg:rounded-ee-none lg:rounded-se-3xl"
                                        src={item.urlImg}
                                        alt={item.titleImg}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <div className=" md:container px-8 md:px-0 pt-16">
                <div className="grid xs:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="w-full ">
                        <img
                            className=" shadow-md shadow-primary-01 rounded-ss-3xl"
                            src="/images/liraglotide.webp"
                            alt=""
                        />
                        <div className=" shadow-md flex flex-col justify-center items-start p-2 border-r-8 border-primary-01">
                            <span className=" font-bold">
                                خرید ویکتوزا (لیراگلوتاید)
                            </span>
                            <span>کاربرد در کاهش وزن</span>
                        </div>
                    </div>
                    <div className="w-full ">
                        <img
                            className=" shadow-md shadow-primary-01 rounded-se-3xl"
                            src="/images/gardasil.jpg"
                            alt=""
                        />
                        <div className="shadow-md flex flex-col justify-center items-start p-2 border-r-8 border-primary-01">
                            <span className=" font-bold">
                                خرید ویکتوزا (لیراگلوتاید)
                            </span>
                            <span>کاربرد در کاهش وزن</span>
                        </div>
                    </div>
                    <div className="w-full ">
                        <img
                            className=" shadow-md shadow-primary-01 rounded-ss-3xl"
                            src="/images/Dandan.jpg"
                            alt=""
                        />
                        <div className="shadow-md flex flex-col justify-center items-start p-2 border-r-8 border-primary-01">
                            <span className=" font-bold">
                                خرید ویکتوزا (لیراگلوتاید)
                            </span>
                            <span>کاربرد در کاهش وزن</span>
                        </div>
                    </div>
                    <div className="w-full ">
                        <img
                            className=" shadow-md shadow-primary-01 rounded-se-3xl"
                            src="/images/baby.jpg"
                            alt=""
                        />
                        <div className="shadow-md flex flex-col justify-center items-start p-2 border-r-8 border-primary-01">
                            <span className=" font-bold">
                                خرید ویکتوزا (لیراگلوتاید)
                            </span>
                            <span>کاربرد در کاهش وزن</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
