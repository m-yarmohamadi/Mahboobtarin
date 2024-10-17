import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

export default function PopularBrands() {
    return (
        <div className="md:mx-auto md:container p-6 mt-6">
            <h3 className="text-xl text-slate-900 font-semibold text-center">
                محبوب ترین برند ها
            </h3>
            <div className='w-full mx-auto mt-10'>
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={'auto'}
                    navigation={{
                        nextEl: '#poular-brands-btn-next',
                        prevEl: '#poular-brands-btn-prev'
                    }}
                    pagination={{
                        el: '.custome-pagination',
                        clickable: true
                    }}
                    className='popular-brands-swiper'
                >
                    {Array(16).fill({ img: "/images/hopaLogo.png", title: "نشر هوپا" }).map((item, index) => {
                        return (
                            <SwiperSlide key={index} className="!w-auto !h-auto ml-8">
                                <div className='flex items-center flex-col justify-center gap-4'>
                                    <div className='w-32 h-32 rounded-full flex items-center justify-center p-6 bg-white'>
                                        <img src={item.img} alt="" className='w-full' />
                                    </div>
                                    <div className='text-sm font-medium text-slate-900'>
                                        {item.title}
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}

                    <div className='w-full justify-between items-center flex mt-8'>
                        <button id='poular-brands-btn-prev' className='btn btn--secondary !p-2 !rounded-full disabled:!opacity-50 !text-slate-900'>
                            <FaAngleRight className='w-5 h-5' />
                        </button>
                        <div>
                            <div className='custome-pagination'>

                            </div>
                        </div>
                        <button id='poular-brands-btn-next' className='btn btn--secondary !p-2 !rounded-full disabled:!opacity-50 !text-slate-900'>
                            <FaAngleLeft className='w-5 h-5' />
                        </button>
                    </div>
                </Swiper>
            </div>
        </div>
    )
}

