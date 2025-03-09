import ChartLine from "@/tools/ChartLine";
import moment from "jalali-moment";
import { useState } from "react"

const showType = [
    {
        value: "year",
        label: "سالانه"
    },
    {
        value: "month",
        label: "ماهانه"
    },
    {
        value: "daily",
        label: "هفتگی"
    },
]

export default function VisitChart({ visits, state }) {
    const [showState, setShowState] = useState("month");
    moment.locale('fa');

    let categories = [];
    let data = [];

    if (visits) {
        if (showState === "year") {
            categories = visits.year.labels
            data = visits.year.data;
        }

        if (showState === "month") {
            categories = visits.month.labels;
            data = visits.month.data;
        }

        if (showState === "daily") {
            categories = visits.week.labels;
            data = visits.week.data;
        }
    }

    return (
        <div className="w-full bg-white shadow-lg dark:shadow-darkLg rounded-md">
            <div className="p-5 space-y-5">
                <div className="w-full flex items-center justify-between">
                    <h1 className="font-bold text-slate-800">
                        تعداد بازدید از صفحات شما
                    </h1>
                    <div className="text-sm text-textDefault">
                        <span className="font-semibold">بازدید کل:</span>
                        &nbsp;
                        <span>{state}</span>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                    {showType.map((item, index) => (
                        <button
                            key={index}
                            className={`${item.value === showState ? "font-bold border-b-2" : ""} border-b-gray-800 pb-2 text-sm text-slate-800`}
                            onClick={() => setShowState(item.value)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <ChartLine
                titleTooltip="تعداد بازدید"
                categories={categories}
                data={data}
            />
        </div>
    )
}
