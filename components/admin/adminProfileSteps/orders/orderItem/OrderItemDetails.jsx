import { CiCalendar, CiClock2 } from "react-icons/ci";

export default function OrderItemDetails() {
    return (
        <div className="flex flex-col items-start md:justify-center gap-2 truncate">
            <div className="text-sm flex items-center gap-1">
                <span className="text-slate-800 font-medium">
                    موضوع سفارش:
                </span>
                <span className="text-primary-01 font-semibold">
                    مشاوره اینترنتی
                </span>
            </div>
            <div className="w-auto flex items-center justify-between gap-5">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                    <CiCalendar className="w-4 h-4" />
                    <span>
                        زمان رزرو : 1403/07/10
                    </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                    <CiClock2 className="w-4 h-4" />
                    <span>
                        23:00 - 23:30
                    </span>
                </div>
            </div>
        </div>
    )
}
