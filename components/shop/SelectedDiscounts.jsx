import numberWithCommas from "@/utils/numberWithCommas";
import { TbDiscount } from "react-icons/tb";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import discountCalculator from "@/utils/discountCalculator";

export default function SelectedDiscounts() {
    return (
        <div className="md:mx-auto md:container p-6 mt-14">
            <h3 className="text-xl text-gray-900 font-medium flex items-center justify-center gap-2">
                <TbDiscount className="w-5 h-5" />
                منتخب محصولات تخفیف و حراج
            </h3>

            <div className='w-full mt-10'>
                <Swiper
                    slidesPerView={'auto'}
                    className="selected-discounts-swiper"
                >
                    {Array(6).fill({ img: "/images/Book003.png", title: "کتاب و لوازم التحریر", price: 230000, discount: 42 }).map((item, index) => {
                        return (
                            <SwiperSlide key={index} className="!w-[200px] border-l border-slate-300 last:border-l-0">
                                <div className='w-full flex flex-col'>
                                    <Product product={item} />
                                    <Product product={item} />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    )
}

function Product({ product }) {
    return (
        <div className="w-full p-6 border-b border-b-slate-300 last:border-b-0">
            <div className="w-full flex items-center justify-center  mb-6">
                <div className='w-[100px]'>
                    <img
                        src={'/images/Book003.png'}
                        alt={''}
                        className='w-full h-full object-center object-cover'
                    />
                </div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    {product.discount !== 0 &&
                        <span className="text-xs text-white bg-error px-1.5 py-px rounded-full">
                            {product.discount} %
                        </span>
                    }
                </div>
                <div className="text-gray-800 font-semibold flex items-center gap-1">
                    {numberWithCommas(discountCalculator(product.price, product.discount || 0))}
                    <span className="text-xs font-normal">
                        تومان
                    </span>
                </div>
            </div>
            <p className='text-sm line-through text-gray-400 text-left'>{numberWithCommas(product.price)}</p>
        </div>
    )
}