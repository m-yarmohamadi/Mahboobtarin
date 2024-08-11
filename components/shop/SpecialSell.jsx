import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6"
import { MdOutlineTimer } from "react-icons/md"
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaChevronLeft } from "react-icons/fa";
import ProductCard from "./ProductCard";


export default function SpecialSell() {

    return (
        <div className="md:mx-auto md:container p-6 mt-6">
            <div className="w-full flex flex-col sm:flex-row gap-6 items-center justify-between">
                <h3 className="text-2xl text-primary-01 font-medium">
                    فروش ویژه
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Timer />
                    <div className="flex items-center gap-3">
                        <button id="special-sell-btn-prev" className="disabled:opacity-50 btn btn--outline !p-2 bg-white">
                            <FaArrowRightLong className="w-5 h-5" />
                        </button>
                        <button id="special-sell-btn-next" className="disabled:opacity-50 btn btn--outline !p-2 bg-white">
                            <FaArrowLeftLong className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={'auto'}
                    navigation={{
                        nextEl: '#special-sell-btn-next',
                        prevEl: '#special-sell-btn-prev'
                    }}
                    className="special-sell-slider"
                >
                    <SwiperSlide className="!w-[250px] ml-4">
                        <div className='w-full h-full flex rounded-xl flex-col bg-yellow-400 hover:bg-yellow-500 hover:shadow-md'>

                            <div className='p-2 flex-1 flex justify-center items-center gap-2 font-bold'>
                                <span>مشاهده همه</span>
                                <span>
                                    <FaChevronLeft />
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    {Array(10).fill({}).map((item, index) => {
                        return (
                            <SwiperSlide key={index} className="!w-[250px] ml-4">
                                <ProductCard product={item} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    )
}

function Timer() {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="text-gray-500 font-medium">
                زمان باقی مانده:
            </div>
            <div className="flex items-center gap-3 bg-gray-800 text-yellow-400 px-3 rounded-md">
                <div className="border-l border-l-slate-500 py-2 pl-3">
                    20:12:05
                </div>
                <MdOutlineTimer className="w-6 h-6" />
            </div>
        </div>
    )
}
