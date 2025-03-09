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
import CustomeButtonDatePicker from "../setAppointment/CustomeButtonDatePicker";
import { useServiceOrderContext } from "@/context/ServiceOrderContext";

export default function BookingForm({ onClose, serviceID, userId, expert }) {
    const [selected, setSelected] = useState();
    const [serviceData, setServiceData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const dedicatedTime = !isLoading && JSON.parse(serviceData.dedicated_time);
    const [date, setDate] = useState();
    const getTimesOfWeekday = !isLoading && processActivityTimes(serviceData?.activity_time, date);
    const router = useRouter();
    const { createService } = useServiceOrderContext();
    const isDateRangeInvalid = dedicatedTime?.[1] && new Date(dedicatedTime[1]) < new Date();


    const onGoSetAppointment = (type) => {
        let seminar;
        if (type !== "turn") {
            seminar = { date: getTimesOfWeekday.result.week, time: getTimesOfWeekday.result.time }
        }

        const encodedDetails = encryptData({
            ...selected,
            ...seminar,
            serviceData,
            expert,
            descriptionUser: "",
            price: serviceData.price,
            type,
        })
        console.log({
            ...selected,
            ...seminar,
            serviceData,
            expert,
            descriptionUser: "",
            price: serviceData.price,
            type,
        });
        createService({
            ...selected,
            ...seminar,
            serviceData,
            expert,
            descriptionUser: "",
            price: serviceData.price,
            type,
        })
        router.push(`/set-appointment`);
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

    useEffect(() => {
        const today = new Date();
        let initialDate = today;

        if (dedicatedTime?.length > 0) {
            const startDate = new Date(dedicatedTime[0]);
            const endDate = dedicatedTime[1] ? new Date(dedicatedTime[1]) : null;

            if (startDate > today) {
                initialDate = startDate;
            } else if (endDate && endDate < today) {
                initialDate = today;
            } else if (startDate <= today && endDate && endDate > today) {
                initialDate = today;
            }
        }

        if (new Date(dedicatedTime[0]) > today) {
            initialDate = new Date(dedicatedTime[0]);
        }

        setDate(initialDate);
    }, [serviceData]);



    if (isLoading) return (
        <div className="w-full flex items-center justify-center h-44">
            <Loading customeColor={'#0693a4'} />
        </div>
    );

    if (getTimesOfWeekday.isRoutine) {
        if (!isDateRangeInvalid) {
            return (
                <div>
                    <div className='w-full'>
                        <DatePicker
                            value={date}
                            onChange={(e) => selectDate(e)}
                            locale={persian_fa}
                            calendar={persian}
                            minDate={dedicatedTime.length > 0 ? new Date(dedicatedTime[0]) > new Date() ? dedicatedTime[0] : new Date() : new Date()}
                            maxDate={dedicatedTime && dedicatedTime[1]}
                            render={
                                <CustomeButtonDatePicker
                                    setDate={selectDate}
                                    maxDate={dedicatedTime && dedicatedTime[1]}
                                    minDate={dedicatedTime && dedicatedTime[0] ? new Date(dedicatedTime[0]) > new Date() ? dedicatedTime[0] : new Date() : new Date()}
                                />
                            }
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
                                <button onClick={() => onGoSetAppointment("turn")} className="btn btn--primary !w-full">
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
                <div className="w-full text-sm text-slate-500 text-center">
                    بازه زمانی خدمت {serviceData.type} به پایان رسیده است.
                </div>
            )
        }
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
                                <button onClick={() => onGoSetAppointment("")} className="btn btn--primary !w-full disabled:opacity-30">
                                    ثبت‌نام
                                </button>
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
