import ChartLine from "@/tools/ChartLine";
import numberWithCommas from "@/utils/numberWithCommas";
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

export default function IncomeChart({ incomes, state }) {
    const [showState, setShowState] = useState("month");

    const generateRandomNumbers = (min, max, count) => {
        let randomNumbers = [];
        for (let i = 0; i < count; i++) {
            let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            randomNumbers.push(randomNumber);
        }
        return randomNumbers;
    };

    let categories = [];
    let data = [];

    if (incomes) {
        if (showState === "year") {
            categories = incomes.year.labels;
            data = incomes.year.data
        }

        if (showState === "month") {
            categories = incomes.month.labels.map((item) => (new Date(item).toLocaleDateString("fa", { month: "long" })));
            data = incomes.month.data;
        }

        if (showState === "daily") {
            categories = incomes.week.labels;
            data = incomes.week.data
        }
    }

    return (
        <div className="w-full bg-white shadow-lg dark:shadow-darkLg rounded-md">
            <div className="p-5 space-y-5">
                <div className="w-full flex items-center justify-between">
                    <h1 className="font-bold text-slate-800">
                        درآمد
                    </h1>
                    <div className="text-sm text-textDefault">
                        <span className="font-semibold"> درآمد کل:</span>
                        &nbsp;
                        <span>{numberWithCommas(state)}</span>
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
                titleTooltip="میزان درامد (تومان)"
                categories={categories}
                data={data}
            />
        </div>
    )
}
