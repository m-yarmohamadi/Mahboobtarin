import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import discountCalculator from '@/utils/discountCalculator';
import numberWithCommas from '@/utils/numberWithCommas';
import DetailBox from './DetailBox';

export default function RelatedProducts({ data }) {

    if(!data || !data.length) return null;
    
    return (
        <DetailBox title={'محصولات مشابه'}>
            <div className='w-full'>
                <Swiper
                    slidesPerView={'auto'}
                >
                    {data?.map((item, index) => {
                        return (
                            <SwiperSlide key={index} className="!w-[160px] lg:!w-[195px] px-4 lg:px-2 py-3 border-l last:border-0 border-slate-300 dark:border-slate-400">
                                <div className='w-full min-h-full flex flex-col items-center'>
                                    <div className='w-full flex items-center justify-center'>
                                        <div className='w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]'>
                                            <img src={item?.photos[0]?.path} alt="" className='w-full h-full object-contain object-center' />
                                        </div>
                                    </div>
                                    <div className='w-full pt-6'>
                                        <h3 className='text-xs lg:text-sm text-slate-800 font-medium line-clamp-2'>
                                            {item.title}
                                        </h3>

                                        <div className='flex items-start justify-between pt-4'>
                                            {item?.discount_price &&
                                                <div className="py-1 px-1.5 text-[#fff] bg-error text-xs rounded-lg">
                                                    {item?.discount_price} %
                                                </div>
                                            }
                                            <div className='flex flex-col items-end gap-1'>
                                                <div className='text-sm lg:text-base font-semibold text-slate-800 flex items-center gap-1'>
                                                    {numberWithCommas(item?.discount_price ? discountCalculator(item.price, item?.discount_price) : item.price)}
                                                    <span className='text-[10px] lg:text-xs font-normal'>
                                                        تومان
                                                    </span>
                                                </div>
                                                {item?.discount_price &&
                                                    <del className='text-xs lg:text-sm text-slate-600 pl-7'>
                                                        {numberWithCommas(item.price)}
                                                    </del>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </DetailBox>
    )
}
