import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from "jalali-moment";
import toEnglishNumber from "@/utils/toEnglishNumber";
import { FaRegCalendar } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { toPersianDateShort } from "@/utils/toPersianDate";
import { IoIosCalendar } from "react-icons/io";
import { useDarkMode } from "@/context/DarkModeContext";
import { MdOutlineTimerOff } from "react-icons/md";
import processActivityTimes from "../Main/processActivityTimes";


const convertTOEnDateFunc = (date) => {
    return moment(toEnglishNumber(date), "jYYYY/jMM/jDD").format("YYYY/MM/DD");
}

export default function EditAppointmentForm({ onClose, lastSelected, onLastSelected, serviceData }) {
    const [selected, setSelected] = useState(lastSelected);
    const [date, setDate] = useState(new Date(convertTOEnDateFunc(lastSelected?.date)));
    const convertTOEnDate = convertTOEnDateFunc(date)
    const getTimesOfWeekday = processActivityTimes(serviceData?.activity_time, date);

    const selectDate = (date) => {
        setDate(date);
        setSelected();
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
                <div className="p-3 my-2 bg-slate-200 dark:bg-slate-400 rounded-lg grid grid-cols-2 gap-1">
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
            {
                getTimesOfWeekday.result ?
                    <>
                        <div className="w-full flex flex-row items-start pt-3">

                            <div className="w-full flex flex-col">
                                <div className={`duration-200 w-full whitespace-nowrap text-center cursor-pointer text-sm py-2  border-b-2 text-blue-600 border-blue-600`}>
                                    نوبت های قابل رزرو
                                </div>
                            </div>

                        </div>
                        <div className="w-full h-auto max-h-44 overflow-y-auto pl-2 grid grid-cols-4 my-3 gap-2">
                            {getTimesOfWeekday.result.times.map((item, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setSelected({ date: toPersianDateShort(date), time: item })}
                                    className={`btn btn--outline !text-base !py-2 !px-4 !h-12 duration-200 !text-slate-600 border  ${selected?.time === item ? "!bg-slate-300 border-indigo-600" : "border-slate-300 dark:border-slate-600"}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </>
                    :
                    <div className="w-full h-44 flex flex-col items-center justify-center gap-2">
                        <MdOutlineTimerOff className="w-8 h-8 text-primary-01" />
                        <span className="text-sm text-primary-01">
                            روز غیر کاری متخصص
                        </span>
                    </div>
            }


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
            <button disabled={isToday()} onClick={descDateHandler} className="w-16 disabled:!opacity-45 h-full rounded-r-md whitespace-nowrap p-3 text-xs text-slate-500 dark:text-slate-700 border border-slate-200">
                روز قبل
            </button>
            <button onClick={openCalendar} className="flex-1 h-full btn !rounded-none gap-2 bg-slate-200 border-y border-slate-200 text-[80%] text-slate-600">
                <FaRegCalendar className="w-4 h-4" />
                {isToday() && "امروز، "}
                {convertToLongDateFa}
            </button>
            <button onClick={incDateHandler} className="w-16 h-full rounded-l-md whitespace-nowrap p-3 text-xs text-slate-500 dark:text-slate-700 border border-slate-200">
                روز بعد
            </button>
        </div>
    )
}