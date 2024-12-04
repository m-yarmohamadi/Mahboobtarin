import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Categoreis({ categories }) {
    const pairedData =
        categories.reduce((result, value, index, array) => {
            if (index % 2 === 0) {
                result.push([value, array[index + 1] || null]);
            }
            return result;
        }, []);

    return (
        <div className="md:mx-auto md:container p-6 mt-14">
            <h3 className="text-2xl text-slate-900 font-medium text-center">
                خرید بر اساس دسته بندی
            </h3>

            <div className='w-full mx-auto mt-10'>
                <Swiper
                    slidesPerView={'auto'}
                >
                    {pairedData.map((item, index) => {
                        return (
                            <SwiperSlide key={index} className="!w-auto ml-8">
                                <div className='flex flex-col gap-8'>
                                    {item[0] &&
                                        <CategoryCard category={item[0]} />
                                    }
                                    {item[1] &&
                                        <CategoryCard category={item[1]} />
                                    }
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
            <div className='w-[90px] h-[90px] flex items-center justify-center rounded-full bg-slate-300 overflow-hidden'>
                <img src={category.pic || ""} alt={category.name} className='w-full h-full object-cover object-center' />
            </div>
            <div className='text-xs text-slate-800 text-center'>
                {category.name}
            </div>
        </div>
    )
}