import Input from "@/tools/Input";
import Select from "@/tools/Select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Link from "next/link";
import { useState } from "react";

const serviceList = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'مشاوره متنی', value: 'Text advice' },
    { id: 2, label: 'مشاوره صوتی اینترنتی', value: 'Internet audio consultation' },
    { id: 3, label: 'مشاوره تلفنی', value: 'on phone consultancy' },
    { id: 4, label: 'مشاوره ویدیویی', value: 'Video consultation' },
    { id: 5, label: 'دعوتنامه', value: 'Invitation' },
    { id: 6, label: 'سمینار (آموزش)', value: 'seminar (training)' },
    { id: 7, label: 'تبلیغات', value: 'Advertising' },
    { id: 8, label: 'مشارکت در کلینیک', value: 'Participation in the clinic' },
    { id: 9, label: 'حمایت', value: 'Protection' },
    { id: 10, label: 'نوبت حضوری مطب', value: 'Appointment in the office' },
];

const timeFrame = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: '10 دقیقه', value: '10m' },
    { id: 2, label: '15 دقیقه', value: '15m' },
    { id: 3, label: '20 دقیقه', value: '20m' },
    { id: 4, label: '30 دقیقه', value: '30m' },
    { id: 5, label: '1 ساعت', value: '1h' },
]

const priceTypes = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'رایگان', value: 'free' },
    { id: 2, label: 'خیریه', value: 'charity' },
    { id: 3, label: 'قیمت داخواه', value: 'custom' },
]

export default function ServiceFields({ formik }) {

    return (
        <form className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
                <Select
                    label='نوع خدمت'
                    options={serviceList}
                    name="title"
                    formik={formik}
                />
                {/* <div className='w-full py-1 flex flex-col justify-start justify-items-start items-start'>
                    <label className='text-sm font-bold px-2 inline-block mb-2 text-slate-800'>
                        تاریخ
                    </label>
                    <div className='w-full '>
                        <DatePicker
                            value={formik.values.date}
                            onChange={(date) => formik.setFieldValue("date", date)}
                            locale={persian_fa}
                            calendar={persian}
                            containerClassName="w-full"
                            inputClass="!w-full appearance-none outline-none bg-transparent text-gray-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4   focus:bg-white focus:shadow-lg focus:shadow-red-300 transition-all duration-300 ease-in-out "
                        />
                    </div>
                </div> */}
                <Select
                    label='زمان اختصاصی'
                    options={timeFrame}
                    name="timeFrame"
                    formik={formik}
                />
                <Select
                    label='قیمت'
                    options={priceTypes}
                    name="priceType"
                    formik={formik}
                />
                <Input
                    label='قیمت دلخواه'
                    name="price"
                    formik={formik}
                    disabled={formik.values.priceType !== "custom"}
                />
            </div>
            <TimeComponent formik={formik} />
            <div className="w-full flex items-center gap-2 mt-10 pt-3 border-t border-slate-300">
                <button className="!w-full lg:!w-1/2 !text-base !font-bold btn btn--primary">
                    ثبت
                </button>
            </div>
        </form>
    )
}


function TimeComponent({ formik }) {
    const [activeTab, setActiveTab] = useState("saturday");

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

    const isSelectedTime = (time) => {
        return formik.values.dateTime.some(
            (i) => i.day === activeTab && i.time === time
        );
    };

    const addOrRemoveTimeHandler = (time) => {
        const exists = isSelectedTime(time);

        if (exists) {
            formik.setFieldValue(
                "dateTime",
                formik.values.dateTime.filter(
                    (i) => !(i.day === activeTab && i.time === time)
                )
            );
        } else {
            formik.setFieldValue("dateTime", [
                ...formik.values.dateTime,
                { day: activeTab, time },
            ]);
        }
    };


    return (
        <div className='w-full mx-auto md:max-w-screen-sm flex flex-col justify-start justify-items-start items-start'>
            <label className='w-full font-bold px-2 inline-block pb-3 text-sm text-slate-800'>
                زمان فعالیت
            </label>
            <div className="w-full">
                <div className="w-full flex flexcol flex-row items-start">
                    {week.map((item, index) => (
                        <div key={index} className="w-full flex flex-col">
                            <div onClick={() => setActiveTab(item.value)} className={`duration-200 w-full whitespace-nowrap text-center cursor-pointer text-xs md:text-sm py-2 px-1 md:px-3  border-b-2 ${activeTab === item.value ? "text-blue-600 border-blue-600" : "text-slate-600 border-b-slate-200"}`}>
                                {item.label}
                            </div>


                        </div>
                    ))}
                </div>
                <div className="w-full justify-center flex items-center gap-2 py-5">
                    {times.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => addOrRemoveTimeHandler(item.value, item.id)}
                            className={`btn btn--outline !text-xs sm:!text-sm !py-2 !w-full duration-200 ${isSelectedTime(item.value) ? "!bg-slate-300 !border-blue-600" : "!border-slate-500"}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}