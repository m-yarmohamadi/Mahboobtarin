import numberWithCommas from "@/utils/numberWithCommas";
import { HiOutlineUsers } from "react-icons/hi2";
import { RxTimer } from "react-icons/rx";
import { TiClipboard } from "react-icons/ti";

export default function CourseDetails() {
    return (
        <div className="w-full grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 bg-white px-3 py-6 lg:p-5 rounded-xl">
            <div className="col-span-1 lg:col-span-7 xl:col-span-6">
                <div>
                    <h1 className="mb-2 text-lg lg:text-xl font-bold text-slate-800">
                        لورم ایپسوم متن ساختگی با تولید سادگی
                    </h1>
                    <p className="mb-7 text-sm text-gray-500 font-medium leading-7 lg:leading-8">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </p>
                </div>
                <Details />
                <CoursePrice />
                <Details2 />
            </div>

            <div className="col-span-1 lg:col-span-5 xl:col-span-6 order-1 md:order-2 self-center">
                <div className="aspect-w-16 aspect-h-9">
                    <img src="/images/img01.jpg" alt="" className="w-full h-full object-cover object-center rounded-xl" />
                </div>
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
            <div className="text-xs p-2 rounded-md font-bold bg-primary-01 bg-opacity-20 text-primary-01">
                تاریخ انتشار : 1402/05/29
            </div>
            <div className="text-xs p-2 rounded-md font-bold bg-primary-01 bg-opacity-20 text-primary-01">
                تاریخ بروزرسانی : 1403/09/04
            </div>
        </div>
    )
}

function CoursePrice() {
    return (
        <div className="flex items-center justify-between w-full border-t border-t-slate-300 pt-4 mt-6">
            <div>
                <button className="btn btn--primary font-bold !px-10 !text-base">
                    ثبت نام در دوره
                </button>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                    <div class="text-base text-slate-400 lg:text-xl line-through font-bold">
                        {numberWithCommas(1680000)}
                    </div>
                    <div class="bg-error rounded-md py-0.5 px-2 text-white text-xs flex justify-center items-center">% 13</div>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-slate-700 flex items-center gap-1">
                    <span>
                        {numberWithCommas(1250000)}
                    </span>
                    <span className="text-sm ">
                        تومان
                    </span>
                </div>
            </div>
        </div>
    )
}