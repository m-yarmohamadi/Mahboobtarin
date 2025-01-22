import { CiCalendar, CiClock2 } from "react-icons/ci";

export default function OrderItemDetails({ turnData, service }) {
    const turn = turnData && JSON.parse(turnData);

    return (
        <div className="flex flex-col items-start md:justify-center gap-2 truncate">
            <div className="text-sm flex items-center gap-1">
                <span className="text-slate-800 font-medium">
                    موضوع سفارش:
                </span>
                <span className="text-primary-01 font-semibold">
                    {service?.type}
                </span>
            </div>
            <div className="w-auto flex items-center justify-between gap-5">
                <div className="flex items-center gap-1 text-xs text-slate-600">
                    <CiCalendar className="w-4 h-4" />
                    <span>
                        زمان رزرو : {turn?.date}
                    </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-600">
                    <CiClock2 className="w-4 h-4" />
                    <span>
                        {turn?.time}
                    </span>
                </div>
            </div>
        </div>
    )
}
