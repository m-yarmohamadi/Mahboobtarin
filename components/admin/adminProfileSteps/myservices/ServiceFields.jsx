import Input from "@/tools/Input";
import Select from "@/tools/Select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import Link from "next/link";

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

const timeList = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'صبح', value: 'morning' },
    { id: 2, label: 'عصر', value: 'evening' },
    { id: 3, label: 'شب', value: 'nigth' },
]

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
    console.log(formik.values);
    
    return (
        <form className="w-full flex flex-col gap-7">
            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Select
                    label='نوع خدمت'
                    options={serviceList}
                    name="title"
                    formik={formik}
                />
                <div className='w-full py-1 flex flex-col justify-start justify-items-start items-start'>
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
                </div>
                <Select
                    label='زمان'
                    options={timeList}
                    name="time"
                    formik={formik}
                />
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
                {
                    formik.values.priceType === "custom" &&
                    <Input
                        label='قیمت دلخواه'
                        name="price"
                        formik={formik}
                    />
                }
            </div>
            <div className="w-full md:w-1/3 flex items-center gap-2">
                <button className="!w-full btn btn--primary">
                    ثبت
                </button>
                <Link href="/admin/services" className="!w-full btn btn--outline">
                    لغو
                </Link>
            </div>
        </form>
    )
}
