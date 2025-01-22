import { useGetRequests } from "@/hooks/expertHooks/useCalling";
import CallingItem from "./CallingItem";
import Loading from "@/tools/Loading";
import Link from "next/link";
import { FaLocationDot, FaMoneyBillWave, FaRegClock } from "react-icons/fa6";
import { useGetCity, useGetProvinces } from "@/hooks/useCity";
import { FaHandsHelping } from "react-icons/fa";

export default function IncomingCalling() {
    const { requests, isGetRequests } = useGetRequests();

    if (isGetRequests) return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loading customeColor="#0693a4" />
        </div>
    )
    return (
        <div className="w-full grid grid-cols-1 gap-3 sm:grid-cols-2">
            {requests?.others?.map((item) => (
                <IncomingCallingItem key={item.id} data={item} />
            ))}
        </div>
    )
}

export function IncomingCallingItem({ data }) {
    const { provinces, isLoading } = useGetProvinces();
    const { transformCity, isLoading: isGetCity } = useGetCity(data.province);

    const provinceLabel = !isLoading && provinces.filter((c) => Number(c.id) === Number(data.province))[0]?.name;
    const cityLabel = !isGetCity && transformCity.filter((c) => Number(c.id) === Number(data.city))[0]?.label;


    return (
        <div className="flex flex-col p-2 bg-slate-200 border border-slate-300 rounded-xl relative">
            <Link href={`/requests/${data.id}`} className="aspect-w-16 aspect-h-11 rounded-lg overflow-hidden mb-4">
                <img src={data?.photos[0]?.path} alt="" className="w-full h-full object-cover object-center" />
            </Link>

            <div>
                <Link href={`/requests/${data.id}`}>
                    <h4 className="text-slate-800 font-bold pb-1">
                        {data?.title}
                    </h4>
                </Link>
                <div className="flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                            <FaRegClock />
                            <span>
                                {data.time_work} ساعت
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                            <FaLocationDot />
                            <span>
                                {cityLabel} . {provinceLabel}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                            <FaHandsHelping />
                            <span>
                                {data.collaboration}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                            <FaMoneyBillWave />
                            <span>
                                {data.salary_amount}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Link href={`/requests/${data.id}`} className="btn btn--primary !text-xs !p-1">
                            مشاهده جزئیات
                        </Link>
                        <div className="btn btn--secondary !text-xs !p-1">
                            وضعیت : {data?.status === "1" ? "فعال" : "غیرفعال"}
                        </div>
                        <button className="btn btn--primary !text-xs !p-1">
                            تایید فراخوان
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}