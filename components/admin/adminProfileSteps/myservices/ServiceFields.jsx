import Input from "@/tools/Input";
import Select from "@/tools/Select";
import { useEffect, useState } from "react";
import Loading from "@/tools/Loading";
import timeSlots from "@/utils/timeSlots";
import Modal from "@/components/Modal";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { HiOutlineTrash } from "react-icons/hi2";
import CheckBoxInput from "@/components/CheckBoxInput";
import { useGetServiceItems } from "@/hooks/expertHooks/useServices";
import sortedTimes from "@/utils/sortedTimes";
import DateComponent from "./DateComponent";
import numberWithCommas from "@/utils/numberWithCommas";
import TextArea from "@/tools/TextArea";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { toPersianDateLong, toPersianDateShort } from "@/utils/toPersianDate";
import toEnglishNumber from "@/utils/toEnglishNumber";

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
    { label: 'یک گزینه را انتخاب کنید', value: '' },
    { label: 'تعرفه دلخواه', value: 'custom' },
    { label: 'تعرفه پیشنهادی', value: 'suggestion' },
    { label: 'رایگان', value: 'free' },
    { label: 'در حد وسع', value: 'charity' },
]

export default function ServiceFields({ formik, isPending }) {
    const { serviceItems, isLoadServiceItems } = useGetServiceItems();
    const [serviceType, setServiceType] = useState();

    useEffect(() => {
        if (!isLoadServiceItems) {
            setServiceType(formik.values.type);
            formik.setFieldValue("activity_time", []);
        }
    }, [formik.values.type])

    useEffect(() => {
        formik.setFieldValue("price", "0");
    }, [formik.values.price_type])

    return (
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col">
            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6">
                <Select
                    label='نوع خدمت'
                    options={!isLoadServiceItems ? [{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' }, ...serviceItems] : []}
                    name="type"
                    formik={formik}
                />
                {/* <Select
                    label='زمان اختصاصی'
                    options={timeFrame}
                    name="dedicated_time"
                    formik={formik}
                /> */}
                <Select
                    label='قیمت'
                    options={priceTypes}
                    name="price_type"
                    formik={formik}
                />
                <div className="flex flex-col">
                    <Input
                        label='قیمت دلخواه'
                        name="price"
                        // formik={formik}
                        value={formik.values.price}
                        onChange={(e) => {
                            const rawValue = e.target.value.replace(/,/g, "");
                            const formattedValue = numberWithCommas(rawValue);
                            formik.setFieldValue("price", formattedValue);
                        }}

                        disabled={formik.values.price_type !== "custom"}
                    />
                    {formik?.errors.price && (
                        <p className="error_Message">
                            {formik?.errors.price}
                        </p>
                    )}
                </div>
                {
                    serviceType ?
                        !serviceType.includes('سمینار') &&
                        <div className={`w-full py-1 flex flex-col justify-start justify-items-start items-start`}>
                            <label className='text-sm font-bold px-2 mb-2 inline-block text-slate-800'>
                                بازه زمانی
                            </label>
                            <DatePicker
                                value={formik.values.dedicated_time}
                                onChange={(e) => formik.setFieldValue("dedicated_time", e)}
                                locale={persian_fa}
                                calendar={persian}
                                minDate={new Date()}
                                range
                                format={'D MMMM YYYY'}
                                calendarPosition="bottom-right"
                                containerClassName="w-full"
                                inputClass="w-full appearance-none outline-none bg-transparent text-slate-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4    focus:bg-white focus:shadow-lg dark:shadow-darkLg focus:shadow-red-300 transition-all duration-300 ease-in-out"
                            />
                            {/* <div className='w-full flex justify-start items-start mt-2 text-xs text-error'>
                                {dateTimeFormik.errors.date}
                            </div> */}
                        </div>
                        : null
                }
            </div>
            {
                serviceType ?
                    serviceType.includes('سمینار') ?
                        <DateComponent formik={formik} />
                        :
                        <TimeComponent formik={formik} />
                    : null
            }
            {!formik.errors.type && formik?.errors.activity_time && formik?.touched.activity_time && (
                <div className="w-full flex justify-start items-start mt-2">
                    <p className="error_Message">
                        {formik?.errors.activity_time}
                    </p>
                </div>
            )}
            <div className="mt-4">
                <TextArea
                    label={"شرح"}
                    formik={formik}
                    name={'description'}
                />
            </div>
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
    const [isOpenTRange, setIsOpenTRange] = useState(false);
    const [times, setTimes] = useState([]);

    const week = [
        { value: "saturday", label: "شنبه" },
        { value: "sunday", label: "یکشنبه" },
        { value: "monday", label: "دوشنبه" },
        { value: "tuesday", label: "سه شنبه" },
        { value: "wednesday", label: "چهاشنبه" },
        { value: "thursday", label: "پنجشنبه" },
        { value: "friday", label: "جمعه" },
    ];

    const removeTimeHandler = (time) => {
        formik.setFieldValue(
            "activity_time",
            formik.values.activity_time.map((d) => {
                if (d.day === activeTab) {
                    const updatedTimeList = d.times.filter((t) => t !== time);
                    return updatedTimeList.length > 0
                        ? { ...d, times: updatedTimeList }
                        : null;
                } else {
                    return d;
                }
            }).filter(Boolean)
        );

        setTimes((prevTimes) => {
            return prevTimes
                .map((d) => {
                    if (d.day === activeTab) {
                        const updatedTimeList = d.timeList.filter((t) => t !== time);
                        return updatedTimeList.length > 0
                            ? { ...d, timeList: updatedTimeList }
                            : null;
                    }
                    return d;
                })
                .filter(Boolean);
        });
    };

    const renderTimeListSorted = () => {
        const currentDayTimes = times.filter((d) => d.day === activeTab);
        const mergeTimes = currentDayTimes.map((item) => item.timeList).flat();
        return sortedTimes(mergeTimes);
    }

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
                <div className="w-full flex-wrap flex items-center gap-2 py-5">
                    {renderTimeListSorted().map((item, index) => (
                        <div
                            key={index}
                            className={`btn btn--outline gap-2 !text-xs sm:!text-sm !p-2 duration-200 !border-slate-500`}
                        >
                            {item}
                            <button
                                type="button"
                                onClick={() => removeTimeHandler(item)}
                                className="w-5 h-5 bg-error text-white rounded flex items-center justify-center"
                            >
                                <HiOutlineTrash className="w-4 h-4 text-[#fff]" />
                            </button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => setIsOpenTRange(true)} className="btn btn--secondary w-full">
                    تعیین ساعت و مدت
                </button>
                <Modal title={'انتخاب بازه زمانی'} open={isOpenTRange} onClose={() => setIsOpenTRange(false)}>
                    <AddTimeRange
                        times={times}
                        setTimes={setTimes}
                        onClose={() => setIsOpenTRange(false)}
                        addActivitiesHandler={formik}
                        day={activeTab}
                        weeks={week}
                    />
                </Modal>
            </div>
        </div>
    )
}

function AddTimeRange({ setTimes, onClose, times, addActivitiesHandler, day, weeks }) {
    const [isAllDay, setIsAllDay] = useState(false);

    const timeRange = [
        { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
        { id: 1, label: '10 دقیقه', value: 10 },
        { id: 2, label: '15 دقیقه', value: 15 },
        { id: 3, label: '20 دقیقه', value: 20 },
        { id: 4, label: '30 دقیقه', value: 30 },
        { id: 5, label: '1 ساعت', value: 60 },
        { id: 6, label: '2 ساعت', value: 120 },
        { id: 7, label: '3 ساعت', value: 180 },
        { id: 8, label: '4 ساعت', value: 240 },
        { id: 9, label: '5 ساعت', value: 300 },
        { id: 10, label: '6 ساعت', value: 360 },
        { id: 11, label: '7 ساعت', value: 420 },
        { id: 12, label: '8 ساعت', value: 480 },
    ]

    const hours = Array.from({ length: 23 }, (_, i) => {
        const item = (i + 1).toString();
        return { label: `${item.length === 1 ? `0${item}` : item}:00`, value: item };
    });

    const onSubmit = (values) => {
        const createTimes = timeSlots(values.start, values.end, values.range);

        let timeList = [];

        if (isAllDay) {
            weeks.forEach((week) => {
                const isDay = times.filter((d) => d.day === week.value).length;

                if (!isDay) {
                    setTimes((prevList) => [...prevList, { values, day: week.value, timeList: createTimes }]);
                    timeList.push({ day: week.value, times: createTimes });
                } else {
                    if (week.value === day) {
                        setTimes((prevList) => [...prevList, { values, day: week.value, timeList: createTimes }]);
                        timeList.push({ day: week.value, times: createTimes });
                    }
                }
            });
        } else {
            setTimes((prevList) => [...prevList, { values, day, timeList: createTimes }]);
            timeList.push({ day, times: createTimes });
        }


        const existingDay = addActivitiesHandler.values.activity_time.find((d) => d.day === day);

        if (existingDay) {
            addActivitiesHandler.setFieldValue("activity_time",
                addActivitiesHandler.values.activity_time.map((d) => {
                    if (d.day === day) {
                        const newTimes = timeList.map((t) => t.day === d.day && t.times);
                        const mergedTimes = d.times.concat(newTimes).flat();

                        return { ...d, times: sortedTimes(mergedTimes) };
                    } else {
                        return d;
                    }
                })
            );
        } else {
            addActivitiesHandler.setFieldValue("activity_time", [
                ...addActivitiesHandler.values.activity_time,
                ...timeList
            ]);
        }

        onClose();
    }

    const formik = useFormik({
        initialValues: { start: 12, end: 13, range: "" },
        onSubmit,
        validationSchema: Yup.object({
            range: Yup.number().required("بازه زمانی را انتخاب کنید").test(
                'range-time-check',
                'مدت خدمت انتخاب شده از فاصله شروع تا پایان بیشتر است',
                function (rangeValue) {
                    const { start, end } = this.parent;
                    return start !== undefined && end !== undefined && rangeValue <= (end - start) * 60;
                }
            ),
            end: Yup.number()
                .test('validation', 'ساعت پایان باید بزرگ‌تر از ساعت شروع باشد و نمی‌تواند یکسان باشد', function (value) {
                    const { start } = this.parent;
                    return start !== undefined && value !== undefined && value > start;
                })
                .test('time-overlap', 'این بازه زمانی قابل انتخاب نیست', function (endValue) {
                    const { start } = this.parent;

                    for (let time of times) {
                        if (
                            time.day === day &&
                            (
                                !(Number(endValue) <= Number(time.values.start) || Number(start) >= Number(time.values.end)) ||
                                Number(time.values.start) === Number(endValue)
                                // Number(time.values.end) === Number(start)
                            )
                        ) {
                            return false;
                        }
                    }
                    return true;
                }),
        })
    })

    return (
        <div>
            <div className="w-full flex flex-col gap-2">
                <div className="w-full grid grid-cols-2 gap-2">
                    <Select
                        label={'ساعت شروع'}
                        formik={formik}
                        name={'start'}
                        options={hours}
                    />
                    <Select
                        label={'ساعت پایان'}
                        formik={formik}
                        name={'end'}
                        options={hours}
                        noError={true}
                    />
                </div>
                <div className="text-xs text-error">
                    {formik.errors.end}
                </div>
                <Select
                    label={'مدت خدمت'}
                    formik={formik}
                    name={'range'}
                    options={timeRange}
                />
                <div className="py-2">
                    <CheckBoxInput
                        label={'اعمال روی تمام روز ها'}
                        name={'allDay'}
                        checked={isAllDay}
                        onChecked={() => setIsAllDay(!isAllDay)}
                    />
                </div>
            </div>
            <button onClick={formik.handleSubmit} type="submit" className="btn btn--primary mt-4 !w-full">
                ثبت
            </button>
        </div>
    )
}