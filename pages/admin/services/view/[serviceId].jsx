import ExpertDashboard from "@/components/admin/ExpertDashboard";
import { useGetServiceById } from "@/hooks/useDashboard";
import Loading from "@/tools/Loading";
import { useParams } from "next/navigation"
import { FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";

export default function viewService() {
    const id = useParams();
    const { serviceId } = id || "";
    const { isLoadingService, serviceData } = useGetServiceById(serviceId);

    const daysOfWeek = [
        { value: "saturday", label: "شنبه" },
        { value: "sunday", label: "یکشنبه" },
        { value: "monday", label: "دوشنبه" },
        { value: "tuesday", label: "سه شنبه" },
        { value: "wednesday", label: "چهاشنبه" },
        { value: "thursday", label: "پنجشنبه" },
        { value: "friday", label: "جمعه" },
    ];

    const timesOfDay = [
        { value: "morning", label: "صبح" },
        { value: "evening", label: "ظهر" },
        { value: "night", label: "شب" },
    ];

    const convertActivityTimeToArray = () => {
        return serviceData?.activity_time.split('},').map((item, index, array) => {
            if (index < array.length - 1) item += '}';
            return JSON.parse(item.replace(/(\w+):/g, '"$1":'));
        });
    };

    const activityTimeArray = convertActivityTimeToArray();

    const isTimeAvailable = (day, time) => {
        return activityTimeArray?.some(slot => slot.week === day && slot.time === time);
    };

    return (
        <ExpertDashboard>
            {
                !isLoadingService ?
                    <div>
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
                                            serviceData.price_type
                                    }
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between text-gray-600">
                                <span>
                                    زمان اختصاصی
                                </span>
                                <div>
                                    {serviceData.dedicated_time.split("-")[0]} دقیقه
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative overflow-x-auto rounded-lg mt-6">
                            <table className="w-full text-sm text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">زمان فعالیت شما</th>
                                        {timesOfDay.map((time, index) => (
                                            <th scope="col" className="text-xs px-6 py-3 !text-gray-600 !font-normal" key={index}>{time.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {daysOfWeek.map((day, index) => (
                                        <tr key={index} className="odd:bg-white even:bg-gray-200 border-b border-b-gray-300">
                                            <td className="!px-6 !py-4 !text-right">{day.label}</td>
                                            {timesOfDay.map((time, index) => (
                                                <td key={index} className="!px-6 !py-4 !text-right">
                                                    {isTimeAvailable(day.value, time.value) && <FaCircleCheck className="w-6 h-6 text-blue-600" />}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
