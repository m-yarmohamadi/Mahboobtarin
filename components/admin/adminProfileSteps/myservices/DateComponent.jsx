import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import toEnglishNumber from "@/utils/toEnglishNumber";
import toPersianTimeShort from "@/utils/toPersianTime";
import { toPersianDateShort } from "@/utils/toPersianDate";

export default function DateComponent({ formik }) {
    const dateTimeFormik = useFormik({
        initialValues: { date: "", time: "" },
        validationSchema: Yup.object({
            date: Yup.array().required("تاریخ را انتخاب کنید"),
            time: Yup.string().required("ساعت را انتخاب کنید")
        })
    })

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`w-full py-1 flex flex-col justify-start justify-items-start items-start`}>
                <label className='text-sm font-bold px-2 mb-2 inline-block text-slate-800'>
                    بازه زمانی
                </label>
                <DatePicker
                    value={dateTimeFormik.values.date}
                    onChange={(e) => {
                        dateTimeFormik.setFieldValue("date", e);
                        let newArr = e.map((item) => toEnglishNumber(toPersianDateShort(item)));
                        let updateItem = formik.values.activity_time ? [{ ...formik.values.activity_time[0], day: newArr }] : [{ day: newArr, time: "" }];
                        formik.setFieldValue("activity_time", updateItem);
                    }}
                    locale={persian_fa}
                    calendar={persian}
                    minDate={new Date()}
                    range
                    format={'D MMMM YYYY'}
                    calendarPosition="bottom-right"
                    containerClassName="w-full"
                    inputClass="w-full appearance-none outline-none bg-transparent text-slate-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4    focus:bg-white focus:shadow-lg dark:shadow-darkLg focus:shadow-red-300 transition-all duration-300 ease-in-out"
                />
                <div className='w-full flex justify-start items-start mt-2 text-xs text-error'>
                    {dateTimeFormik.errors.date}
                </div>
            </div>
            <div className={`w-full py-1 flex flex-col justify-start justify-items-start items-start`}>
                <label className='text-sm font-bold px-2 mb-2 inline-block text-slate-800'>
                    ساعت
                </label>
                <DatePicker
                    disableDayPicker
                    value={dateTimeFormik.values.time}
                    onChange={(e) => {
                        dateTimeFormik.setFieldValue("time", e);
                        let updateItem = formik.values.activity_time ? [{ ...formik.values.activity_time[0], time: toPersianTimeShort(e) }] : [{ day: "", time: toPersianTimeShort(e) }];

                        formik.setFieldValue("activity_time", updateItem);
                    }}
                    format="HH:mm"
                    plugins={[
                        <TimePicker />
                    ]}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    containerClassName="w-full"
                    inputClass="w-full appearance-none outline-none bg-transparent text-slate-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4    focus:bg-white focus:shadow-lg dark:shadow-darkLg focus:shadow-red-300 transition-all duration-300 ease-in-out"
                />
                <div className='w-full flex justify-start items-start mt-2 text-xs text-error'>
                    {dateTimeFormik.errors.time}
                </div>
            </div>
        </div>
    )
}
