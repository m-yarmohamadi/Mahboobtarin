import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Categoreis() {
    return (
        <div className="md:mx-auto md:container p-6 mt-14">
            <h3 className="text-2xl text-slate-900 font-medium text-center">
                خرید بر اساس دسته بندی
            </h3>

            <div className='w-full mx-auto mt-10'>
                <Swiper
                    slidesPerView={'auto'}
                >
                    {Array(8).fill({ img: "/images/Book003.png", title: "کتاب و لوازم التحریر" }).map((item, index) => {
                        return (
                            <SwiperSlide key={index} className="!w-auto ml-8">
                                <div className='flex flex-col gap-8'>
                                    <CategoryCard category={item} />
                                    <CategoryCard category={item} />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    )
}

function CategoryCard({ category }) {
    return (
        <div className=' flex flex-col gap-3 h-[160px] px-4'>
            <div className='w-[90px] h-[90px] flex items-center justify-center rounded-full bg-slate-300'>
                <img src={category.img} alt={category.title} className='w-full h-full object-contain' />
            </div>
            <div className='text-xs text-slate-800'>
                {category.title}
            </div>
        </div>
    )
}