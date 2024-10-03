import ExpertDashboard from "@/components/admin/ExpertDashboard";
import { useGetServiceById } from "@/hooks/useDashboard";
import Loading from "@/tools/Loading";
import toEnglishNumber from "@/utils/toEnglishNumber";
import { toPersianDateShort } from "@/utils/toPersianDate";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";
import { IoIosCalendar } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";

const processActivityTimes = (activityTimes) => {
    const daysMapping = {
        saturday: "شنبه",
        sunday: "یک‌شنبه",
        monday: "دوشنبه",
        tuesday: "سه‌شنبه",
        wednesday: "چهارشنبه",
        thursday: "پنج‌شنبه",
        friday: "جمعه",
    };


    let isRoutine;

    const activityTimeArray = JSON.parse(activityTimes);

    const extractTimes = activityTimeArray.map((item) => {
        if (!Array.isArray(item.week)) {
            isRoutine = true;
            return { ...item, week: daysMapping[item.week] };
        } else {
            isRoutine = false;
            return item
        }
    })

    return { result: extractTimes, isRoutine };
};

export default function viewService() {
    const id = useParams();
    const { serviceId } = id || "";
    const { isLoadingService, serviceData } = useGetServiceById(serviceId);
    const getTimesOfWeekday = !isLoadingService && processActivityTimes(serviceData?.activity_time);
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        if (!isLoadingService) {
            setActiveTab(getTimesOfWeekday.result[0].week)
        }
    }, [isLoadingService])

    return (
        <ExpertDashboard>
            {
                !isLoadingService ?
                    <div className="mx-auto md:max-w-screen-sm">
                        <div className="flex items-center gap-3 pb-4 border-b border-b-gray-300">
                            <button onClick={() => window.history.back()} className="text-gray-600 btn btn--secondary !p-2">
                                <FaArrowRightLong className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-600">
                                {serviceData.type}
                            </h1>

                        </div>
                        <div className="mt-5 flex flex-col gap-3 w-full">
                            <div className="w-full flex items-center justify-between text-gray-600">
                                <span>
                                    هزینه
                                </span>
                                <div>
                                    {
                                        serviceData.price_type === "custom" ?
                                            `${serviceData.price} تومان`
                                            :
                                            serviceData.price_type === "free" ? "رایگان" : "خیریه"
                                    }
                                </div>
                            </div>

                        </div>

                        <div className="relative rounded-lg mt-6">

                            {
                                getTimesOfWeekday.isRoutine ?
                                    <div className='w-full mx-auto md:max-w-screen-sm flex flex-col justify-start justify-items-start items-start'>
                                        <label className='w-full font-bold inline-block pb-3 text-sm text-slate-800'>
                                            زمان فعالیت شما
                                        </label>
                                        <div className="w-full">
                                            <div className="w-full flex flexcol flex-row items-start">
                                                {getTimesOfWeekday.result.map((item, index) => (
                                                    <div key={index} className="w-full flex flex-col">
                                                        <div onClick={() => setActiveTab(item.week)} className={`duration-200 w-full whitespace-nowrap text-center cursor-pointer text-xs md:text-sm py-2 px-1 md:px-3  border-b-2 ${activeTab === item.week ? "text-blue-600 border-blue-600" : "text-slate-600 border-b-slate-200"}`}>
                                                            {item.week}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex-wrap flex items-center gap-2 py-5">
                                                {getTimesOfWeekday.result.filter((s) => s.week === activeTab)[0]?.times.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={`btn btn--outline gap-2 !text-xs sm:!text-sm !p-2 duration-200 !border-slate-500`}
                                                    >
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                    :
                                    <div>
                                        <div>
                                            <div className="text-slate-800 font-bold text-sm">
                                                تاریخ برگزاری:
                                            </div>
                                            <div className="w-full grid grid-cols-2 text-sm text-blue-600 pt-4 pb-2">
                                                <div className="flex items-center gap-1">
                                                    <IoIosCalendar className="w-6 h-6 text-gray-700" />
                                                    تاریخ از : {getTimesOfWeekday?.result[0].week[0]}
                                                </div>

                                                <div>
                                                    تاریخ تا : {getTimesOfWeekday?.result[0].week[1]}
                                                </div>
                                            </div>
                                            <div className="text-sm text-blue-600 flex items-center gap-1">
                                                <IoTimeOutline className="w-6 h-6 text-gray-700" />
                                                ساعت : {getTimesOfWeekday.result[0].time}
                                            </div>
                                        </div>
                                        {
                                            toEnglishNumber(toPersianDateShort(new Date())) > getTimesOfWeekday.result[0].week[1] &&
                                            <div className="w-full flex items-center gap-2 border-t border-t-slate-300 pt-4 mt-4">
                                                <div className="w-full text-sm text-gray-500 text-center">
                                                    به اتمام رسید
                                                </div>
                                            </div>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                    :
                    <div className='w-full h-full flex items-center justify-center'>
                        <Loading customeColor="#0693a4" />
                    </div>
            }

        </ExpertDashboard>
    )
}
