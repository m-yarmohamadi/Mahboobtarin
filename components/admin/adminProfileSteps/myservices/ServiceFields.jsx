import Input from "@/tools/Input";
import Select from "@/tools/Select";
import { useState } from "react";
import Loading from "@/tools/Loading";

const serviceList = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'مشاوره متنی', value: 'مشاوره متنی' },
    { id: 2, label: 'مشاوره صوتی اینترنتی', value: 'مشاوره صوتی اینترنتی' },
    { id: 3, label: 'مشاوره تلفنی', value: 'مشاوره تلفنی' },
    { id: 4, label: 'مشاوره ویدیویی', value: 'مشاوره ویدیویی' },
    { id: 5, label: 'دعوتنامه', value: 'دعوتنامه' },
    { id: 6, label: 'سمینار (آموزش)', value: 'سمینار (آموزش)' },
    { id: 7, label: 'تبلیغات', value: 'تبلیغات' },
    { id: 8, label: 'مشارکت در کلینیک', value: 'مشارکت در کلینیک' },
    { id: 9, label: 'حمایت', value: 'حمایت' },
    { id: 10, label: 'نوبت حضوری مطب', value: 'نوبت حضوری مطب' },
];

const timeFrame = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: '10 دقیقه', value: '10-min' },
    { id: 2, label: '15 دقیقه', value: '15-min' },
    { id: 3, label: '20 دقیقه', value: '20-min' },
    { id: 4, label: '30 دقیقه', value: '30-min' },
    { id: 5, label: '1 ساعت', value: '60-min' },
]

const priceTypes = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'رایگان', value: 'free' },
    { id: 2, label: 'خیریه', value: 'charity' },
    { id: 3, label: 'قیمت دلخواه', value: 'custom' },
]

export default function ServiceFields({ formik, isPending }) {

    return (
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
                <Select
                    label='نوع خدمت'
                    options={serviceList}
                    name="type"
                    formik={formik}
                />
                <Select
                    label='زمان اختصاصی'
                    options={timeFrame}
                    name="dedicated_time"
                    formik={formik}
                />
                <Select
                    label='قیمت'
                    options={priceTypes}
                    name="price_type"
                    formik={formik}
                />
                <Input
                    label='قیمت دلخواه'
                    name="price"
                    formik={formik}
                    type="number"
                    disabled={formik.values.price_type !== "custom"}
                />
            </div>
            <TimeComponent formik={formik} />
            <div className="w-full flex items-center gap-2 mt-10 pt-3 border-t border-slate-300">
                <button type="submit" className="!w-full lg:!w-1/2 !text-base !font-bold btn btn--primary">
                    {isPending ? <Loading /> : "ثبت"}
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
        return formik.values.activity_time.some(
            (i) => i.day === activeTab && i.time === time
        );
    };

    const addOrRemoveTimeHandler = (time) => {
        const exists = isSelectedTime(time);

        if (exists) {
            formik.setFieldValue(
                "activity_time",
                formik.values.activity_time.filter(
                    (i) => !(i.day === activeTab && i.time === time)
                )
            );
        } else {
            formik.setFieldValue("activity_time", [
                ...formik.values.activity_time,
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