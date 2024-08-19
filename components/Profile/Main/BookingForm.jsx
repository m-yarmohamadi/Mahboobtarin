import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from "jalali-moment";
import toEnglishNumber from "@/utils/toEnglishNumber";
import { CiCalendar, CiCalendarDate, CiClock2 } from "react-icons/ci";
import { FaRegCalendar } from "react-icons/fa6";
import timeSlots from "@/utils/timeSlots";
import { FiClock } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { toPersianDateShort } from "@/utils/toPersianDate";
import { IoIosCalendar } from "react-icons/io";


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
    { value: "morning", label: "صبح", start: 7, end: 12 },
    { value: "evening", label: "ظهر", start: 12, end: 18 },
    { value: "night", label: "شب", start: 18, end: 22 },
];

export default function BookingForm({ onClose }) {
    const [activeTab, setActiveTab] = useState(0);
    const [selected, setSelected] = useState();
    const [date, setDate] = useState(new Date());


    return (
        <div>
            {/* <div className="w-full">
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
                                onClick={() => setSelected({ day: activeTab, time: item.label })}
                                className={`first:!rounded-r-lg last:!rounded-l-lg btn btn--outline !rounded-none !text-xs !py-3 !w-full duration-200 first:!border-l-0 last:!border-r-0 ${isSelectedTime(item.label) ? "bg-slate-200 !border-primary-01" : "!border-slate-400"}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div> */}
            <div className='w-full'>
                <DatePicker
                    value={date}
                    onChange={(e) => {
                        setDate(e);
                        setSelected({ ...selected, date: toPersianDateShort(e) })
                    }}
                    locale={persian_fa}
                    calendar={persian}
                    minDate={new Date()}
                    render={<CustomeButtonDatePicker />}
                    calendarPosition="bottom-center"
                    containerClassName="w-full"
                />
            </div>
            {
                selected &&
                <div className="p-3 my-2 bg-indigo-50 rounded-lg grid grid-cols-2 gap-1">
                    <p className="flex items-center gap-1 text-sm font-medium text-gray-600">
                        <IoIosCalendar className="w-6 h-6 text-gray-700" />
                        <span className="font-normal">{selected?.date}</span>
                    </p>
                    <p className="flex items-center gap-1 text-sm font-medium text-gray-600">
                        <IoTimeOutline className="w-6 h-6 text-gray-700" />
                        <span className="font-normal">{selected?.time}</span>
                    </p>
                </div>
            }
            <div className="w-full flex flex-row items-start pt-3">
                {times.map((item, index) => (
                    <div key={index} className="w-full flex flex-col">
                        <div onClick={() => setActiveTab(index)} className={`duration-200 w-full whitespace-nowrap text-center cursor-pointer text-sm py-2  border-b-2 ${activeTab === index ? "text-blue-600 border-blue-600" : "text-slate-600 border-b-slate-200"}`}>
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full h-auto max-h-44 overflow-y-auto pl-2 grid grid-cols-4 my-3 gap-2">
                {timeSlots(times[activeTab].start, times[activeTab].end, 30).map((item, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setSelected({ date: toPersianDateShort(date), time: item })}
                        className={`btn btn--outline !text-base !py-2 !px-4 !h-12 duration-200 !text-gray-600 border  ${selected?.time === item ? "!bg-gray-200 border-indigo-300" : "border-gray-300"}`}
                    >
                        {item}
                    </button>
                ))}
            </div>


            <div className="w-full flex items-center gap-2 border-t border-t-slate-300 pt-4 mt-4">
                {
                    selected ?
                        <Link href="/set-appointment" className="btn btn--primary !w-full">
                            تایید
                        </Link>
                        :
                        <button disabled className="btn btn--primary !w-full disabled:opacity-30">
                            تایید
                        </button>
                }
                <button onClick={onClose} className="btn btn--outline !w-full">
                    لغو
                </button>
            </div>
        </div>
    )
}


function CustomeButtonDatePicker({ openCalendar, value }) {
    const convertTOEnDate = moment(toEnglishNumber(value), "jYYYY/jMM/jDD").format("YYYY/MM/DD")
    const convertToLongDateFa = new Date(convertTOEnDate).toLocaleDateString("fa-IR", { day: "numeric", month: "long" });

    return (
        <button onClick={openCalendar} className="w-full btn gap-2 bg-indigo-100 p-3 rounded-lg text-sm text-gray-600">
            <FaRegCalendar className="w-4 h-4" />
            {convertToLongDateFa}
        </button>
    )
}