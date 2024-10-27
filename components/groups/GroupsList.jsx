import { FaShareAlt } from "react-icons/fa"
import { FaAngleLeft, FaBattleNet, FaLocationDot, FaPhoneFlip, FaRegHeart, FaStar, FaStethoscope } from "react-icons/fa6"
import { MdCastForEducation, MdInsertInvitation, MdOutlineTextsms, MdWifiProtectedSetup } from "react-icons/md"

export default function GroupsList() {
    return (
        <div className="w-full flex flex-col gap-4 pt-6">
            {Array(6).fill({}).map((item, index) => (
                <GroupItem key={index} />
            ))}
        </div>
    )
}


function GroupItem() {
    return (
        <div className="w-full flex flex-col gap-6 p-4 rounded-lg border border-slate-300">
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex items-center gap-4">
                    <div className="w-14 h-14">
                        <img src="/images/PopularMounth/l-hatami.jpg" alt="" className="w-full h-full object-cover object-center rounded-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-black text-textDefault text-sm">حمیده جنگجو</h2>
                        <span className="text-[10px] text-slate-700">HamidehJangjoo@</span>
                        <span className="text-[10px] text-slate-700">کارشناس ارشد روانشناسی</span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="w-16 h-10  flex items-center justify-center gap-1 rounded-lg bg-slate-300">
                        <FaRegHeart className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="w-16 h-10  flex items-center justify-center gap-1 rounded-lg bg-slate-300">
                        <FaShareAlt className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="w-16 h-10 flex items-center justify-center gap-1 rounded-lg bg-slate-300">
                        <FaLocationDot className="w-4 h-4 text-slate-700" />
                        <span className="text-xs text-slate-700">تهران</span>
                    </div>
                    <div className="px-2 text-xs h-10 flex flex-col items-center justify-center gap-1 rounded-lg bg-slate-300">
                        <div className="flex justify-center items-center gap-1 text-primary-01">
                            <span className="flex justify-center items-center">
                                11.500+
                            </span>
                            <span className="flex justify-center items-center">
                                <FaStethoscope />
                            </span>
                        </div>

                        <span className="w-full flex justify-center items-center text-slate-700">
                            مشاوره موفق
                        </span>
                    </div>
                    <div className="px-2 text-xs h-10 flex flex-col items-center justify-center gap-1 rounded-lg bg-slate-300">
                        <div className="flex justify-center items-center gap-1 text-primary-01">
                            <span className="flex justify-center items-center">{4.9}</span>
                            <span className="flex justify-center items-center">
                                <FaStar className="text-yellow-500" />
                            </span>
                        </div>

                        <span className="w-full flex justify-center items-center text-slate-700">
                            از {1996} نظر
                        </span>
                    </div>
                    <div className="px-2 h-10 text-xs text-slate-700 flex items-center justify-center gap-1 rounded-lg bg-slate-300">
                        {12} سال تجربه
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-4">
                <div className="w-full flex flex-wrap items-center gap-2 text-xs text-slate-700">
                    <div className="flex justify-center items-center gap-1 p-1 bg-slate-300 rounded-md ">
                        <span>
                            <FaPhoneFlip />
                        </span>
                        <span>تلفنی</span>
                    </div>
                    <div className="flex justify-center items-center gap-1 p-1 bg-slate-300 rounded-md ">
                        <span>
                            <MdOutlineTextsms />
                        </span>
                        <span>متنی</span>
                    </div>
                    <div className="flex justify-center items-center gap-1 p-1 bg-slate-300 rounded-md ">
                        <span>
                            <FaBattleNet />
                        </span>
                        <span>تور</span>
                    </div>
                    <div className="flex justify-center items-center gap-1 p-1 bg-slate-300 rounded-md ">
                        <span>
                            <MdCastForEducation />
                        </span>
                        <span>آموزش</span>
                    </div>
                    <div className="flex justify-center items-center gap-1 p-1 bg-slate-300 rounded-md ">
                        <span>
                            <MdInsertInvitation />
                        </span>
                        <span>دعوتنامه</span>
                    </div>
                    <div className="flex justify-center items-center gap-1 p-1 bg-slate-300 rounded-md ">
                        <span>
                            <MdWifiProtectedSetup />
                        </span>
                        <span>حمایت</span>
                    </div>
                </div>

                <div className=" flex justify-center items-center gap-1 text-primary-01 text-sm whitespace-nowrap">
                    <span>مشاهده پروفایل</span>
                    <span>
                        <FaAngleLeft />
                    </span>
                </div>
            </div>
        </div>
    )
}