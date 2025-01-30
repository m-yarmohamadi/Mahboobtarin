import Link from "next/link";
import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from "jalali-moment";
import toEnglishNumber from "@/utils/toEnglishNumber";
import { FaRegCalendar } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { toPersianDateShort } from "@/utils/toPersianDate";
import { IoIosCalendar } from "react-icons/io";
import { MdOutlineTimerOff } from "react-icons/md";
import { getServiceProfile } from "@/services/expertApi/specialistServices";
import Loading from "@/tools/Loading";
import { useDarkMode } from "@/context/DarkModeContext";
import { useRouter } from "next/navigation";
import { encryptData } from "@/utils/crypto";
import processActivityTimes from "./processActivityTimes";

export default function BookingForm({ onClose, serviceID, userId, expert }) {
    const [selected, setSelected] = useState();
    const [date, setDate] = useState(new Date());
    const [serviceData, setServiceData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const getTimesOfWeekday = !isLoading && processActivityTimes(serviceData?.activity_time, date);
    const dedicatedTime = !isLoading && JSON.parse(serviceData.dedicated_time);
    const router = useRouter();

    const onGoSetAppointment = () => {
        const encodedDetails = encryptData({
            ...selected,
            serviceData,
            expert,
            descriptionUser: "",
            price: serviceData.price,
            type: "turn",
        })
        router.push(`/set-appointment/${encodedDetails}`);
    }

    const selectDate = (date) => {
        setDate(date);
        setSelected();
    }

    useEffect(() => {
        async function fetchServicesHandler() {
            try {
                const { data } = await getServiceProfile(userId, serviceID);
                setServiceData(data);
                setIsLoading(false);
            } catch (error) {

            }
        }

        fetchServicesHandler();
    }, [])

    if (isLoading) return (
        <div className="w-full flex items-center justify-center h-44">
            <Loading customeColor={'#0693a4'} />
        </div>
    );

    if (getTimesOfWeekday.isRoutine) {
        return (
            <div>
                <div className='w-full'>
                    <DatePicker
                        value={date}
                        onChange={(e) => selectDate(e)}
                        locale={persian_fa}
                        calendar={persian}
                        minDate={dedicatedTime.length > 0 ? dedicatedTime[0] : new Date()}
                        maxDate={dedicatedTime && dedicatedTime[1]}
                        render={<CustomeButtonDatePicker setDate={selectDate} maxDate={dedicatedTime && dedicatedTime[1]} />}
                        calendarPosition="bottom-center"
                        containerClassName="w-full"
                    />
                </div>
                {
                    selected &&
                    <div className="p-3 my-2 bg-slate-200 dark:bg-slate-400  rounded-lg grid grid-cols-2 gap-1">
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

                <div className="w-full text-sm">
                    <div className="font-bold  text-slate-800 py-2">
                        توضیحات:
                    </div>
                    <div className="text-slate-700">
                        {serviceData.description || "بدون توضیحات"}
                    </div>
                </div>

                <div className="w-full flex items-center gap-2 border-t border-t-slate-300 pt-4 mt-4">
                    {
                        selected ?
                            <button onClick={onGoSetAppointment} className="btn btn--primary !w-full">
                                تایید
                            </button>
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
    } else {
        return (
            <div>
                <div>
                    <div className="text-slate-800 font-bold text-sm">
                        تاریخ برگزاری:
                    </div>
                    <div className="w-full grid grid-cols-2 text-sm text-blue-600 pt-4 pb-2">
                        <div className="flex items-center gap-1">
                            <IoIosCalendar className="w-6 h-6 text-slate-700" />
                            تاریخ از : {getTimesOfWeekday.result.week[0]}
                        </div>

                        <div>
                            تاریخ تا : {getTimesOfWeekday.result.week[1]}
                        </div>
                    </div>
                    <div className="text-sm text-blue-600 flex items-center gap-1">
                        <IoTimeOutline className="w-6 h-6 text-slate-700" />
                        ساعت : {getTimesOfWeekday.result.time}
                    </div>
                </div>
                <div className="w-full text-sm">
                    <div className="font-bold  text-slate-800 py-2">
                        توضیحات:
                    </div>
                    <div className="text-slate-700">
                        {serviceData.description || "بدون توضیحات"}
                    </div>
                </div>
                <div className="w-full flex items-center gap-2 border-t border-t-slate-300 pt-4 mt-4">
                    {
                        toEnglishNumber(toPersianDateShort(date)) > getTimesOfWeekday.result.week[1] ?
                            <div className="w-full text-sm text-slate-500 text-center">
                                به اتمام رسید
                            </div>
                            :
                            <>
                                <Link
                                    href={`/set-appointment?type=seminar&serviceId=${serviceID}&expert=${JSON.stringify({ name: expert.name, lastname: expert.lastname, id: expert.id, img: expert.avatar, expertise: expert?.expertises[0]?.subject, address: expert?.addresses[0]?.address })}&date=${getTimesOfWeekday.result.week}&time=${getTimesOfWeekday.result.time}`}
                                    className="btn btn--primary !w-full disabled:opacity-30"
                                >
                                    ثبت‌نام
                                </Link>
                                <button onClick={onClose} className="btn btn--outline !w-full">
                                    لغو
                                </button>
                            </>
                    }
                </div>
            </div>
        )
    }
}

function CustomeButtonDatePicker({ openCalendar, value, setDate, maxDate }) {
    const convertTOEnDate = moment(toEnglishNumber(value), "jYYYY/jMM/jDD").format("YYYY/MM/DD")
    const convertToLongDateFa = new Date(convertTOEnDate).toLocaleDateString("fa-IR", { day: "numeric", month: "long", weekday: "long" });

    // is today or not
    const isToday = () => {
        const today = new Date();
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
                {isToday() && "امروز، "}
                {convertToLongDateFa}
            </button>
            <button disabled={maxDate && isMaxDate()} onClick={incDateHandler} className="w-16 disabled:!opacity-45 h-full rounded-l-md whitespace-nowrap p-3 text-xs text-slate-500 dark:text-slate-700 border border-slate-200">
                روز بعد
            </button>
        </div>
    )
}