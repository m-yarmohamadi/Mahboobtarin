import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from "jalali-moment";
import toEnglishNumber from "@/utils/toEnglishNumber";
import { FaRegCalendar } from "react-icons/fa6";
import timeSlots from "@/utils/timeSlots";
import { IoTimeOutline } from "react-icons/io5";
import { toPersianDateShort } from "@/utils/toPersianDate";
import { IoIosCalendar } from "react-icons/io";

const times = [
    { value: "morning", label: "صبح", start: 7, end: 12 },
    { value: "evening", label: "ظهر", start: 12, end: 18 },
    { value: "night", label: "شب", start: 18, end: 22 },
];

export default function EditAppointmentForm({ onClose, lastSelected, onLastSelected }) {
    const [activeTab, setActiveTab] = useState(0);
    const [selected, setSelected] = useState(lastSelected || {});
    const [date, setDate] = useState(lastSelected?.date || new Date());

    const selectDate = (date) => {
        setDate(date);
        if (selected?.time) {
            setSelected({ ...selected, date: toPersianDateShort(new Date(date)) });
        }
    }

    const editSelectDateHandler = () => {
        onLastSelected(selected);
        onClose();
    }

    return (
        <div>
            <div className='w-full'>
                <DatePicker
                    value={date}
                    onChange={(e) => selectDate(e)}
                    locale={persian_fa}
                    calendar={persian}
                    minDate={new Date()}
                    render={<CustomeButtonDatePicker setDate={selectDate} />}
                    calendarPosition="bottom-center"
                    containerClassName="w-full"
                />
            </div>
            {
                selected &&
                <div className="p-3 my-2 bg-indigo-50 rounded-lg grid grid-cols-2 gap-1">
                    <p className="flex items-center gap-1 text-sm font-medium text-slate-600">
                        <IoIosCalendar className="w-6 h-6 text-slate-700" />
                        <span className="font-normal">{selected?.date}</span>
                    </p>
                    <p className="flex items-center gap-1 text-sm font-medium text-slate-600">
                        <IoTimeOutline className="w-6 h-6 text-slate-700" />
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
                        onClick={() => setSelected({ ...selected, time: item })}
                        className={`btn btn--outline !text-base !py-2 !px-4 !h-12 duration-200 !text-slate-600 border  ${selected?.time === item ? "!bg-slate-200 border-indigo-300" : "border-slate-300"}`}
                    >
                        {item}
                    </button>
                ))}
            </div>


            <div className="w-full flex items-center gap-2 border-t border-t-slate-300 pt-4 mt-4">
                <button onClick={editSelectDateHandler} disabled={!selected} className="btn btn--primary !w-full disabled:opacity-30">
                    ویرایش
                </button>
                <button onClick={onClose} className="btn btn--outline !w-full">
                    لغو
                </button>
            </div>
        </div>
    )
}

function CustomeButtonDatePicker({ openCalendar, value, setDate }) {
    const convertTOEnDate = moment(toEnglishNumber(value), "jYYYY/jMM/jDD").format("YYYY/MM/DD")
    const convertToLongDateFa = new Date(convertTOEnDate).toLocaleDateString("fa-IR", { day: "numeric", month: "long", weekday: "long" });

    // is today or not
    const isToday = () => {
        const today = new Date().toLocaleDateString("fa-IR");
        const currentDate = new Date(convertTOEnDate).toLocaleDateString("fa-IR");
        return currentDate <= today;
    }

    // minus day
    const descDateHandler = () => {
        const newDate = new Date(convertTOEnDate);
        newDate.setDate(newDate.getDate() - 1);
        setDate(newDate);
    }

    // plus day
    const incDateHandler = () => {
        const newDate = new Date(convertTOEnDate);
        newDate.setDate(newDate.getDate() + 1);
        setDate(newDate);
    }

    return (
        <div className="w-full h-14 flex items-center">
            <button disabled={isToday()} onClick={descDateHandler} className="w-16 disabled:!opacity-45 h-full rounded-r-md whitespace-nowrap p-3 text-xs text-slate-500 border border-slate-300">
                روز قبل
            </button>
            <button onClick={openCalendar} className="flex-1 h-full btn !rounded-none gap-2 bg-indigo-100 border-y border-indigo-100 text-[80%] text-slate-600">
                <FaRegCalendar className="w-4 h-4" />
                {isToday() && "امروز، "}
                {convertToLongDateFa}
            </button>
            <button onClick={incDateHandler} className="w-16 h-full rounded-l-md whitespace-nowrap p-3 text-xs text-slate-500 border border-slate-300">
                روز بعد
            </button>
        </div>
    )
}