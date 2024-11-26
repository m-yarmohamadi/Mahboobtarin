import ExpertiseSelectMulit from "@/components/Register/steps/ExpertiseSelectMulit";
import { CountriesSortedFa } from "@/data/countries";
import { useGetCity, useGetProvinces } from "@/hooks/useCity";
import useMainPage from "@/hooks/useMainPage";
import Input from "@/tools/Input";
import Select from "@/tools/Select";
import TextArea from "@/tools/TextArea";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Map from "@/components/mapComponent/Map";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const genderOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "man", label: "مرد" },
    { value: "woman", label: "زن" },
]

const hamkariOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "fullTime", label: "تمام وقت" },
    { value: "partTime", label: "پاره وقت" },
]

const salaryOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "from5to10", label: "از 5 تا 10 میلیون تومان" },
    { value: "from10to15", label: "از 10 تا 15 میلیون تومان" },
    { value: "from15to20", label: "از 15 تا 20 میلیون تومان" },
    { value: "from20to25", label: "از 20 تا 25 میلیون تومان" },
    { value: "from25to30", label: "از 25 تا 30 میلیون تومان" },
    { value: "more", label: "بیشتر" },
]

const payTypeOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "project", label: "پروژه ای" },
    { value: "monthly", label: "ماهانه" },
    { value: "weekly", label: "هفتگی" },
    { value: "daily", label: "روزانه" },
]

const workHistoryOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "not", label: "مهم نیست" },
    { value: "min1", label: "حداقل یک سال" },
    { value: "min3", label: "حداقل سه سال" },
    { value: "min5", label: "حداقل پنج سال" },
]

const militaryStatusOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "0", label: "معافیت تحصیلی" },
    { value: "1", label: "مشمول" },
    { value: "2", label: "انجام داده" },
    { value: "3", label: "معافیت دائم" },
]

export default function CallingFields({ formik }) {
    const { transformCategories, isLoading } = useMainPage();
    const { transformProvinces } = useGetProvinces();
    const { transformCity } = useGetCity(formik.values.province);
    const [openMap, setOpenMap] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    const addPicHandler = (e) => {
        const file = e.target.files[0];
        const maxFileSize = 2 * 1024 * 1024; // 2MB

        if (file && file.size > maxFileSize) {
            toast.error("حجم تصویر باید حداکثر 2 مگابایت باشد")
            e.target.value = null;
        } else {
            formik.setFieldValue("picture", [...formik.values.picture, { id: Date.now(), file: e.target.files[0] }])
        }
    }

    const removePicHandler = (id) => {
        formik.setFieldValue("picture", formik.values.picture.filter((p) => p.id !== id));
    }

    useEffect(() => {
        if (!firstLoad) {
            formik.setFieldValue("province", "");
            formik.setFieldValue("city", "");
        }
    }, [formik.values.country])

    return (
        <>
            <div className="w-full grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                <Input
                    label="عنوان فراخوان"
                    name={'title'}
                    formik={formik}
                    required={true}
                />
                <ExpertiseSelectMulit
                    label="موضوع"
                    required={true}
                    options={!isLoading ? transformCategories : []}
                    selected={formik.values.category}
                    onChange={(e) => formik.setFieldValue("category", e)}
                    error={formik.errors.category && formik.touched.category && formik.errors.category}
                />
                <Select
                    options={hamkariOptions}
                    label={'نوع همکاری'}
                    required={true}
                />
                <Input
                    label={'ساعت کاری'}
                />
                <Select
                    label={'میزان حقوق'}
                    options={salaryOptions}
                />
                <Select
                    label={'شیوه پرداخت'}
                    required={true}
                    options={payTypeOptions}
                />
                <Select
                    label={'جنسیت'}
                    options={genderOptions}
                    required={true}
                />
                <Select
                    label={'سابقه کاری'}
                    options={workHistoryOptions}
                />
                <Select
                    label={'وضعیت سربازی'}
                    options={militaryStatusOptions}
                />
                <Select
                    options={[{ value: "", label: "یک گزینه را انتخاب کنید" }, ...CountriesSortedFa]}
                    label={'کشور محل فراخوان'}
                    name={'country'}
                    formik={formik}
                    onClickSelect={() => setFirstLoad(false)}
                    required={true}
                />
                {
                    formik.values.country === "Iran" ?
                        <>
                            <Select
                                options={[{ value: "", label: "یک گزینه را انتخاب کنید" }, ...transformProvinces || []]}
                                label={'استان / ایالت'}
                                name={'province'}
                                formik={formik}
                                required={true}
                            />
                            <Select
                                label={'شهر'}
                                name={'city'}
                                formik={formik}
                                options={[{ value: "", label: "یک گزینه را انتخاب کنید" }, ...transformCity || []]}
                                disabled={!formik.values.province}
                                required={true}
                            />
                        </>
                        :
                        <>
                            <Input
                                label="استان / ایالت"
                                name="province"
                                formik={formik}
                                required={true}
                            />

                            <Input
                                label="شهر"
                                name="city"
                                formik={formik}
                                required={true}
                            />
                        </>
                }

            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        label="آدرس محل کار"
                        name="address"
                        formik={formik}
                    />
                </div>
                <div className="flex items-end gap-4">
                    <div className="w-full pb-3">
                        <button type='button' onClick={() => setOpenMap(true)} className='btn btn--primary w-full !text-xs !h-[42px] !py-2 !whitespace-nowrap !gap-1'>
                            <FaLocationDot className='w-4 h-4' />
                            {formik.values.map.length ? "ویرایش" : "انتخاب لوکیشن"}
                        </button>
                        <Map setCoord={(e) => formik.setFieldValue("map", e)} title='انتخاب لوکیشن' open={openMap} onClose={() => setOpenMap(false)} />
                    </div>
                </div>
            </div>
            <TextArea
                label={'توضیحات'}
                name={'description'}
                formik={formik}
                required={true}
            />

            <div className="pt-6">
                <div className='text-sm font-bold px-2 mb-2 inline-block text-slate-800'>
                    افزودن تصویر
                </div>
                <div className="w-full flex items-center flex-wrap gap-4">
                    {formik.values.picture.map((item, index) => (
                        <div key={index} className="w-[90px] sm:w-[150px] h-[90px] sm:h-[150px] relative">
                            <img src={URL.createObjectURL(item.file)} alt="" className="w-full h-full object-cover object-center rounded-lg" />
                            <button type="button" onClick={() => removePicHandler(item.id)} className='btn btn--danger absolute top-3 right-3 !p-1'>
                                <IoClose className='w-5 h-5' />
                            </button>
                        </div>
                    ))}

                    {formik.values.picture.length < 3 &&
                        <>
                            <label htmlFor="select-calling-img" className="w-[90px] sm:w-[150px] h-[90px] sm:h-[150px] cursor-pointer rounded-lg border border-primary-01">
                                <div className="w-full h-full flex items-center justify-center">
                                    <IoMdAddCircleOutline className="w-10 h-10 text-primary-01" />
                                </div>
                            </label>
                            <input
                                type="file"
                                name="select-calling-img"
                                id="select-calling-img"
                                hidden
                                accept="image/*"
                                onChange={addPicHandler}
                            />
                        </>
                    }
                </div>
            </div>
        </>
    )
}

