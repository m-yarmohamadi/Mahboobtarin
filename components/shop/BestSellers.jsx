import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import ProductCard from './ProductCard';
import { useGetProductsBestSell } from '@/hooks/useProducts';

export default function BestSellers() {
    const { productsList, isLoading } = useGetProductsBestSell();

    if (isLoading) return null;

    return (
        <div className="md:mx-auto md:container p-6 mt-6">
            <div className="w-full flex flex-col sm:flex-row gap-6 items-center justify-between">
                <h3 className="text-2xl text-primary-01 font-medium">
                    پرفروش ها
                </h3>
                <div className="w-full sm:w-auto flex flex-row justify-between items-center gap-4">
                    <button className='btn btn--outline !py-2'>
                        مشاهده همه
                    </button>
                    <div className="flex items-center gap-3">
                        <button id="best-sellers-btn-prev" className="disabled:opacity-50 btn btn--outline !p-2 bg-white">
                            <FaArrowRightLong className="w-5 h-5" />
                        </button>
                        <button id="best-sellers-btn-next" className="disabled:opacity-50 btn btn--outline !p-2 bg-white">
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
                        nextEl: '#best-sellers-btn-next',
                        prevEl: '#best-sellers-btn-prev'
                    }}
                    className="best-sellers-slider"
                >
                    {productsList?.map((item, index) => {
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
