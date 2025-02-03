import discountCalculator from "@/utils/discountCalculator";
import numberWithCommas from "@/utils/numberWithCommas";
import Link from "next/link";
import { HiOutlineUsers } from "react-icons/hi2";
import { RxTimer } from "react-icons/rx";
import { TiClipboard } from "react-icons/ti";

export default function CourseDetails({ course, selected, children }) {
    return (
        <div className="w-full flex flex-col gap-6">
            <div>
                <h1 className="mb-2 text-xl lg:text-2xl font-bold text-primary-01 border-b border-b-slate-400 pb-4">
                    {course?.title}
                </h1>
                <p className="text-sm lg:text-base text-slate-800 leading-7 lg:leading-8">
                    {course?.description}
                </p>
            </div>
            <div>
                <div className="aspect-w-16 aspect-h-9">
                    {course.videos.length > 0 ?
                        <video
                            controls
                            className='w-full h-full object-cover object-center rounded-xl'
                        >
                            <source
                                src={selected?.path}
                                type='video/mp4'
                            />
                        </video>
                        :
                        <img src={course?.photos[0]?.path} alt={course?.title} className='w-full h-full object-cover object-center rounded-xl' />
                    }
                </div>
            </div>
            {children}
            <div>

                {/* <Details /> */}
                <CoursePrice price={course?.price} discount_price={course?.discount_price} />
                {/* <Details2 /> */}
            </div>
        </div>
    )
}

function Details() {
    return (
        <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-center gap-2">
                <div className="bg-primary-01 shadow-xl text-white w-14 h-14 flex items-center justify-center rounded-full">
                    <RxTimer className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-slate-800">
                    24:50:03
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="bg-primary-01 shadow-xl text-white w-14 h-14 flex items-center justify-center rounded-full">
                    <TiClipboard className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-slate-800">
                    8 جلسه
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="bg-primary-01 shadow-xl text-white w-14 h-14 flex items-center justify-center rounded-full">
                    <HiOutlineUsers className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-slate-800">
                    250 دانشجو
                </div>
            </div>
        </div>
    )
}

function Details2() {
    return (
        <div className="py-5 flex flex-col lg:flex-row lg:flex-wrap gap-2 items-start">
            <div className="text-xs p-2 rounded-md font-bold bg-primary-01 bg-opacity-20 text-primary-02">
                تاریخ انتشار : 1402/05/29
            </div>
            <div className="text-xs p-2 rounded-md font-bold bg-primary-01 bg-opacity-20 text-primary-02">
                تاریخ بروزرسانی : 1403/09/04
            </div>
        </div>
    )
}

function CoursePrice({ price, discount_price = 0 }) {
    return (
        <div className="w-full grid grid-cols-5 lg:grid-cols-12 gap-2 mt-6">
            {discount_price &&
                <div className="col-span-3 p-1.5 border border-error rounded-xl">
                    <div className="w-full h-20 flex flex-col items-center justify-center">
                        <span className="text-xs text-slate-900">
                            قیمت اصلی
                        </span>
                        <del className="text-2xl font-bold text-error !leading-9 inline-block">
                            {numberWithCommas(price)}
                        </del>
                        <span className="text-xs text-slate-900">
                            تومــــــان
                        </span>
                    </div>
                </div>
            }

            {discount_price &&
                <div className="col-span-2 p-1.5 border border-error rounded-xl">
                    <div className="w-full h-20 flex flex-col items-center justify-center">
                        <span className="text-xs text-slate-900">
                            تخفیف دوره
                        </span>
                        <span className="text-2xl font-bold text-error !leading-9 inline-block">
                            {discount_price}
                        </span>
                        <span className="text-xs text-slate-900">
                            درصــــــد
                        </span>
                    </div>
                </div>
            }

            <div className="col-span-full lg:col-span-4 p-1.5 border border-green-600 rounded-xl">
                <div className="w-full h-20 flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-900">
                        مبلغ قابل پرداخت
                    </span>
                    <span className="text-2xl font-bold text-green-600 !leading-9 inline-block">
                        {numberWithCommas(discount_price ? discountCalculator(price, discount_price) : price)}
                    </span>
                    <span className="text-xs text-slate-900">
                        تومــــــان
                    </span>
                </div>
            </div>

            <div className="col-span-full lg:col-span-3 p-1.5 border border-primary-01 rounded-xl cursor-pointer hover:bg-primary-01 text-primary-01 hover:text-white duration-200">
                <div className="w-full h-20 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold">
                        خرید دوره
                    </span>
                </div>
            </div>
        </div>

        // <div className="flex items-center justify-between w-full border-t border-t-slate-300 pt-4 mt-6">
        //     <div>
        //         <Link href={'/register-course'} className="btn btn--primary font-bold !px-10 !text-base">
        //             ثبت‌نام در دوره
        //         </Link>
        //     </div>
        //     <div className="flex flex-col items-end gap-2">
        //         <div className="flex items-center gap-2">
        //             <div class="text-base text-slate-400 dark:text-slate-600 lg:text-xl line-through font-bold">
        //                 {numberWithCommas(1680000)}
        //             </div>
        //             <div class="bg-error rounded-md py-0.5 px-2 text-[#fff] text-xs flex justify-center items-center">
        //                 % 13
        //             </div>
        //         </div>
        //         <div className="text-2xl lg:text-3xl font-bold text-slate-700 flex items-center gap-1">
        //             <span>
        //                 {numberWithCommas(1250000)}
        //             </span>
        //             <span className="text-sm ">
        //                 تومان
        //             </span>
        //         </div>
        //     </div>
        // </div>
    )
}