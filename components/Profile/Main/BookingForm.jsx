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
import { useGetServiceById } from "@/hooks/useDashboard";
import { MdOutlineTimerOff } from "react-icons/md";


const processActivityTimes = (activityTimes) => {
    const daysMapping = {
        saturday: "شنبه",
        sunday: "یک‌شنبه",
        monday: "دوشنبه",
        tuesday: "سه‌شنبه",
        wednesday: "چهارشنبه",
        thursday: "پنج‌شنبه",
        friday: "جمعه",
    };

    const timesMapping = {
        morning: "صبح",
        evening: "ظهر",
        night: "شب",
    };

    const timeRanges = {
        morning: "7-12",
        evening: "12-18",
        night: "18-22",
    };

    // convert JSON To array
    const convertActivityTimeToArray = () => {
        return activityTimes.split('},').map((item, index, array) => {
            if (index < array.length - 1) item += '}';
            return JSON.parse(item.replace(/(\w+):/g, '"$1":'));
        });
    };

    const activityTimeArray = convertActivityTimeToArray();

    const daysOfWeek = Object.keys(daysMapping);

    // convert to persian names
    const result = daysOfWeek.reduce((acc, day) => {
        acc[daysMapping[day]] = [];
        return acc;
    }, {});

    activityTimeArray.forEach((slot) => {
        const dayInFarsi = daysMapping[slot.week];
        const timeInFarsi = timesMapping[slot.time];
        const timeRange = timeRanges[slot.time];

        // push times to result

        if (result[dayInFarsi]) {
            result[dayInFarsi].push({ time: timeInFarsi, range: timeRange });
        }
    });

    return result;
};

export default function BookingForm({ onClose, serviceID }) {
    const [activeTab, setActiveTab] = useState(0);
    const [selected, setSelected] = useState();
    const [date, setDate] = useState(new Date());
    const { isLoadingService, serviceData } = useGetServiceById(serviceID);
    const currentWeekday = new Date(date).toLocaleDateString("fa-IR", { weekday: "long" });
    const getTimesOfWeekday = !isLoadingService && processActivityTimes(serviceData?.activity_time)[currentWeekday];

    const selectDate = (date) => {
        setDate(date);
        setActiveTab(0);
        setSelected();
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
            {
                getTimesOfWeekday && getTimesOfWeekday.length !== 0 ?
                    <>
                        <div className="w-full flex flex-row items-start pt-3">
                            {getTimesOfWeekday.map((item, index) => (
                                <div key={index} className="w-full flex flex-col">
                                    <div onClick={() => setActiveTab(index)} className={`duration-200 w-full whitespace-nowrap text-center cursor-pointer text-sm py-2  border-b-2 ${activeTab === index ? "text-blue-600 border-blue-600" : "text-slate-600 border-b-slate-200"}`}>
                                        {item.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-auto max-h-44 overflow-y-auto pl-2 grid grid-cols-4 my-3 gap-2">
                            {timeSlots(getTimesOfWeekday[activeTab].range.split("-")[0], getTimesOfWeekday[activeTab].range.split("-")[1], serviceData?.dedicated_time.split("-")[0]).map((item, index) => (
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
            <button disabled={isToday()} onClick={descDateHandler} className="w-16 disabled:!opacity-45 h-full rounded-r-md whitespace-nowrap p-3 text-xs text-gray-500 border border-gray-300">
                روز قبل
            </button>
            <button onClick={openCalendar} className="flex-1 h-full btn !rounded-none gap-2 bg-indigo-100 border-y border-indigo-100 text-[80%] text-gray-600">
                <FaRegCalendar className="w-4 h-4" />
                {isToday() && "امروز، "}
                {convertToLongDateFa}
            </button>
            <button onClick={incDateHandler} className="w-16 h-full rounded-l-md whitespace-nowrap p-3 text-xs text-gray-500 border border-gray-300">
                روز بعد
            </button>
        </div>
    )
}