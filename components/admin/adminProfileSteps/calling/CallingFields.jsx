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
import { useMutation } from "@tanstack/react-query";
import { uploadPhotosRequest } from "@/services/expertApi/callingService";
import Loading from "@/tools/Loading";

const genderOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "فرقی ندارد", label: "فرقی ندارد" },
    { value: "مرد", label: "مرد" },
    { value: "زن", label: "زن" },
]

const hamkariOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "تمام وقت", label: "تمام وقت" },
    { value: "پاره وقت", label: "پاره وقت" },
    { value: "پیمان کاری / پروژه ای", label: "پیمان کاری / پروژه ای" },
    { value: "کارآموزی", label: "کارآموزی" },
    { value: "سایر", label: "سایر" },
]

const salaryOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "از 5 تا 10 میلیون تومان", label: "از 5 تا 10 میلیون تومان" },
    { value: "از 10 تا 15 میلیون تومان", label: "از 10 تا 15 میلیون تومان" },
    { value: "از 15 تا 20 میلیون تومان", label: "از 15 تا 20 میلیون تومان" },
    { value: "از 20 تا 25 میلیون تومان", label: "از 20 تا 25 میلیون تومان" },
    { value: "از 25 تا 30 میلیون تومان", label: "از 25 تا 30 میلیون تومان" },
    { value: "بیشتر", label: "بیشتر" },
]

const payTypeOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "پروژه ای", label: "پروژه ای" },
    { value: "ماهانه", label: "ماهانه" },
    { value: "هفتگی", label: "هفتگی" },
    { value: "روزانه", label: "روزانه" },
]

const workHistoryOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "مهم نیست", label: "مهم نیست" },
    { value: "حداقل یک سال", label: "حداقل یک سال" },
    { value: "حداقل سه سال", label: "حداقل سه سال" },
    { value: "حداقل پنج سال", label: "حداقل پنج سال" },
]

const militaryStatusOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "معافیت تحصیلی", label: "معافیت تحصیلی" },
    { value: "مشمول", label: "مشمول" },
    { value: "انجام داده", label: "انجام داده" },
    { value: "معافیت دائم", label: "معافیت دائم" },
    { value: "مهم نیست", label: "مهم نیست" },
]

const insuranceOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "دارد", label: "دارد" },
    { value: "ندارد", label: "ندارد" },
]

const statusOptions = [
    { value: "", label: "یک گزینه را انتخاب کنید" },
    { value: "1", label: "فعال" },
    { value: "0", label: "غیر فعال" },
]

export default function CallingFields({ formik, editPhotos }) {
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
                    formik={formik}
                    name="collaboration"
                />
                <Input
                    label={'ساعت کاری'}
                    formik={formik}
                    name="time_work"
                    placeholder={'مثلاٌ 8 الی 16'}
                />
                <Select
                    label={'میزان حقوق'}
                    options={salaryOptions}
                    formik={formik}
                    name="salary_amount"
                />
                <Select
                    label={'شیوه پرداخت'}
                    required={true}
                    options={payTypeOptions}
                    formik={formik}
                    name="payment_method"
                />
                <Select
                    label={'جنسیت'}
                    options={genderOptions}
                    required={true}
                    formik={formik}
                    name="gender"
                />
                <Input
                    label={'سن'}
                    formik={formik}
                    name="age"
                    placeholder={"مثلاٌ: 20 تا 30 سال"}
                />
                <Select
                    label={'بیمه'}
                    options={insuranceOptions}
                    required={true}
                    formik={formik}
                    name="insurance"
                />
                <Select
                    label={'سابقه کاری'}
                    options={workHistoryOptions}
                    formik={formik}
                    name="work_history"
                />
                <Select
                    label={'وضعیت سربازی'}
                    options={militaryStatusOptions}
                    formik={formik}
                    name="military_status"
                />
                <Select
                    label={'وضعیت'}
                    options={statusOptions}
                    formik={formik}
                    name="status"
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
                value={formik.values.description}
                onChange={formik.handleChange}
                required={true}
            />

            <UploadPhoto formik={formik} editPhotos={editPhotos} />
        </>
    )
}


function UploadPhoto({ formik, editPhotos = [] }) {
    const { mutateAsync: mutateUploadPhotos, isPending: isUploading } = useMutation({ mutationFn: uploadPhotosRequest });

    const updloadPhotoHandler = async (file) => {
        const maxSizeInMB = 3;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
            toast.error(`حجم فایل نباید بیشتر از ${maxSizeInMB} مگابایت باشد`);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const { data } = await mutateUploadPhotos(formData);
            console.log(data);

            if (data) {
                formik.setFieldValue("files", [...formik.values.files, { id: Date.now(), file }])
                formik.setFieldValue("picture", [...formik.values.picture, data.photo_id])
            }

        } catch (error) {
            if (error?.response?.status === 401) {
                window.location.reload();
                return;
            }
            toast.error("خطا در بارگزاری تصویر");
        }
    }
    return (
        <div className="pt-6">
            <div className='text-sm font-bold px-2 mb-2 inline-block text-slate-800'>
                افزودن تصویر
            </div>
            <div className="w-full flex items-center flex-wrap gap-4">
                {editPhotos.map((item, index) => (
                    <div key={index} className="w-[90px] sm:w-[150px] h-[90px] sm:h-[150px] relative">
                        <img src={item.path} alt="" className="w-full h-full object-cover object-center rounded-lg" />
                    </div>
                ))}

                {formik.values.files.map((item, index) => (
                    <div key={index} className="w-[90px] sm:w-[150px] h-[90px] sm:h-[150px] relative">
                        <img src={URL.createObjectURL(item.file)} alt="" className="w-full h-full object-cover object-center rounded-lg" />
                        {/* <button type="button" onClick={() => removePicHandler(item.id)} className='btn btn--danger absolute top-3 right-3 !p-1'>
                            <IoClose className='w-5 h-5' />
                        </button> */}
                    </div>
                ))}

                {[...formik.values.files, ...editPhotos].length < 3 &&
                    <>
                        {
                            !isUploading ?
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
                                        onChange={(e) => updloadPhotoHandler(e.target.files[0])}
                                    />
                                </>
                                :
                                <Loading />
                        }
                        <div className='w-full flex justify-start items-start'>
                            {formik?.errors.picture && formik?.touched.picture &&
                                <p className='error_Message'>
                                    {formik?.errors.picture}
                                </p>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}