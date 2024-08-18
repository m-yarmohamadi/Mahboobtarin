import { useState } from "react";


const week = [
    { value: "saturday", label: "شنبه" },
    { value: "sunday", label: "یکشنبه" },
    { value: "monday", label: "دوشنبه" },
    { value: "tuesday", label: "سه شنبه" },
    { value: "wednesday", label: "چهاشنبه" },
    { value: "thursday", label: "پنجشنبه" },
    { value: "friday", label: "جمعه" },
];

const times = [
    { value: "morning", label: "صبح" },
    { value: "evening", label: "ظهر" },
    { value: "night", label: "شب" },
];

export default function BookingForm() {
    const [activeTab, setActiveTab] = useState("شنبه");
    const [selected, setSelected] = useState();

    const isSelectedTime = (time) => {
        if(selected?.day === activeTab && selected?.time === time) {
            return true
        } 
    };

    return (
        <div>
            <div className='w-full flex flex-col justify-start justify-items-start items-start'>
                <label className='w-full font-bold px-2 inline-block pb-5 text-slate-800'>
                    رزرو نوبت
                </label>
                <div className="w-full">
                    <div className="w-full flex flexcol flex-row items-start">
                        {week.map((item, index) => (
                            <div key={index} className="w-full flex flex-col">
                                <div onClick={() => setActiveTab(item.label)} className={`duration-200 w-full whitespace-nowrap text-center cursor-pointer text-xs py-2  border-b-2 ${activeTab === item.label ? "text-blue-600 border-blue-600" : "text-slate-600 border-b-slate-200"}`}>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full justify-center flex items-center my-5">
                        {times.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={()=>setSelected({day:activeTab, time:item.label})}
                                className={`first:!rounded-r-lg last:!rounded-l-lg btn btn--outline !rounded-none !text-xs !py-3 !w-full duration-200 first:!border-l-0 last:!border-r-0 ${isSelectedTime(item.label) ? "bg-slate-200 !border-primary-01" : "!border-slate-400"}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {
                selected &&
                <div className="p-4 my-2 bg-indigo-100 rounded-lg flex items-center gap-1">
                    <p className="text-sm font-bold text-gray-900">
                        نوبت شما:
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                        {selected.day} - {selected.time}
                    </p>
                </div>
            }

            <div className="w-full flex items-center gap-2 border-t border-t-slate-300 pt-4 mt-4">
                <button disabled={!selected} className="btn btn--primary !w-full disabled:opacity-30">
                    تایید
                </button>
                <button className="btn btn--outline !w-full">
                    لغو
                </button>
            </div>
        </div>
    )
}
