import toEnglishNumber from "@/utils/toEnglishNumber";
import moment from "jalali-moment";
import { FaRegCalendar } from "react-icons/fa";

export default function CustomeButtonDatePicker({ openCalendar, value, setDate, maxDate, minDate }) {
    const convertTOEnDate = moment(toEnglishNumber(value), "jYYYY/jMM/jDD").format("YYYY/MM/DD")
    const convertToLongDateFa = new Date(convertTOEnDate).toLocaleDateString("fa-IR", { day: "numeric", month: "long", weekday: "long" });

    // is today or not
    const isToday = () => {
        const today = minDate ? new Date(minDate) : new Date();
        const currentDate = new Date(convertTOEnDate);
        return currentDate <= today;
    }

    // is max date
    const isMaxDate = () => {
        const convertMaxDate = new Date(maxDate);
        const currentDate = new Date(convertTOEnDate);
        convertMaxDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        return currentDate.getTime() === convertMaxDate.getTime() || currentDate > convertMaxDate;
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
                {isToday() && !minDate && "امروز، "}
                {convertToLongDateFa}
            </button>
            <button disabled={maxDate && isMaxDate()} onClick={incDateHandler} className="w-16 disabled:!opacity-45 h-full rounded-l-md whitespace-nowrap p-3 text-xs text-slate-500 dark:text-slate-700 border border-slate-200">
                روز بعد
            </button>
        </div>
    )
}