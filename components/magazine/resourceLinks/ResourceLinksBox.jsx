import truncateText from "@/utils/trancateText"
import { FaRegClock } from "react-icons/fa6"

export default function ResourceLinksBox({ title }) {
    return (
        <div className="w-full bg-white rounded-md p-6">
            <div className="text-primary-01 font-semibold lg:text-xl pb-6">
                {title}
            </div>
            <div className="">
                <ResourceLinksItem />
                <ResourceLinksItem />
                <ResourceLinksItem />
                <ResourceLinksItem />
                <ResourceLinksItem />
                <ResourceLinksItem />
            </div>
        </div>
    )
}

function ResourceLinksItem({ data }) {
    return (
        <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-12 p-3 rounded-lg odd:bg-slate-100 even:bg-transparent overflow-hidden">
            <div className="w-full flex items-start sm:col-span-8 gap-2">
                <div>
                    <span className="w-3 h-3 inline-block mt-1.5 bg-primary-01 rounded-full"></span>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="truncate">
                        <span className="font-bold text-slate-800 text-sm">
                            {truncateText(" لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ", 40)}
                        </span>
                    </div>
                    <div className="flex min-[380px]:flex-row flex-col gap-4 min-[380px]:gap-10">
                        <div className="text-xs">
                            <span className="text-slate-600">
                                منبع:
                            </span>
                            <span className="text-slate-800 font-bold">
                                ویکی پدیا
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                            <span>
                                22:50
                            </span>
                            <FaRegClock />
                            <span>
                                5 آذر 1403
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center sm:col-span-4 gap-2">
                <div className="w-12 h-12">
                    <img
                        className="w-full h-full object-cover object-center rounded-se-xl rounded-es-xl"
                        src={"/images/SadeghAlHoseini.jpg"}
                        alt=""
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-800">
                        نام و نام خانوادگی
                    </span>
                    <span className="text-xs text-slate-600">
                        @username
                    </span>
                </div>
            </div>
        </div>
    )
}