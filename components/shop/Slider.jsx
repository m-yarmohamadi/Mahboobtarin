import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

export default function Slider({ sliders }) {
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop
                slidesPerView={1}
                autoplay={{ delay: 4000 }}
                pagination={{
                    el: '.custome-pagination',
                    clickable: true
                }}
                navigation={{
                    nextEl: '#shop-slider-btn-next',
                    prevEl: '#shop-slider-btn-prev'
                }}
                className='shop-slider'
            >
                {sliders.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className='w-full h-80'>
                                <img src={item.image} alt="" className='w-full h-full object-cover object-center' />
                            </div>
                        </SwiperSlide>
                    );
                })}
                <div className="custome-pagination"></div>
                <div className='absolute bottom-8 left-8 flex items-center gap-3 z-50'>
                    <button id="shop-slider-btn-prev" className="disabled:opacity-50 btn btn--outline !p-2 bg-white">
                        <FaArrowRightLong className="w-5 h-5" />
                    </button>
                    <button id="shop-slider-btn-next" className="disabled:opacity-50 btn btn--outline !p-2 bg-white">
                        <FaArrowLeftLong className="w-5 h-5" />
                    </button>
                </div>
            </Swiper>
        </div>
    )
}
