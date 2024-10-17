import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

export default function Categories() {
    return (
        <div className='w-full p-6 bg-slate-200'>
            <div className="md:mx-auto md:container p-6 mt-6">
                <h3 className="text-xl text-slate-900 font-semibold text-center">
                    دسته بندی موضوعات آموزشی
                </h3>
                <div className='w-full mx-auto mt-10'>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={'auto'}
                        navigation={{
                            nextEl: '#course-categories-btn-next',
                            prevEl: '#course-categories-btn-prev'
                        }}
                        pagination={{
                            el: '.custome-pagination',
                            clickable: true
                        }}
                        className='course-categories-swiper'
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
                            <button id='course-categories-btn-prev' className='btn btn--secondary !p-2 !rounded-full disabled:!opacity-50 !text-textDefault'>
                                <FaAngleRight className='w-5 h-5' />
                            </button>
                            <div>
                                <div className='custome-pagination'>

                                </div>
                            </div>
                            <button id='course-categories-btn-next' className='btn btn--secondary !p-2 !rounded-full disabled:!opacity-50 !text-textDefault'>
                                <FaAngleLeft className='w-5 h-5' />
                            </button>
                        </div>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
