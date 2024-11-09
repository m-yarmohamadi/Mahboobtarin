import Modal from "@/components/Modal";
import { useGetAcademyCategory } from "@/hooks/useAcademy";
import Input from "@/tools/Input";
import MultiSelect from "@/tools/MultiSelect";
import Select from "@/tools/Select";
import TextArea from "@/tools/TextArea";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoAddCircleOutline } from "react-icons/io5";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useMutation } from "@tanstack/react-query";
import { updloadAcademyPhotos, updloadAcademyVideos } from "@/services/academyService";
import toast from "react-hot-toast";
import Loading from "@/tools/Loading";
import { useFormik } from "formik";
import { BiEditAlt } from "react-icons/bi";
import * as Yup from "yup";
import { GoPlusCircle } from "react-icons/go";

const statusItems = [
    { value: "", label: "وضعیت دوره را انتخاب کنید" },
    { value: 0, label: "غیر فعال" },
    { value: 1, label: "فعال" },
]

const placeItems = [
    { value: "", label: "نوع برگزاری دوره را انتخاب کنید" },
    { value: "حضوری", label: "حضوری" },
    { value: "آنلاین", label: "آنلاین" },
]

export default function CourseFields({ formik, loading }) {
    const { categories, isGetCategory } = useGetAcademyCategory();

    return (
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
            <CoverImage formik={formik} />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label={'نام فارسی'}
                    formik={formik}
                    name={'title'}
                    required={true}
                />
                <Input
                    label={'نام انگلیسی'}
                    formik={formik}
                    name={'entitle'}
                    required={true}
                />
                <Input
                    label={'کد دوره'}
                    formik={formik}
                    name={'sku'}
                    required={true}
                />
                <Input
                    label={'اسلاگ'}
                    formik={formik}
                    name={'slug'}
                    required={true}
                />
                <ExpiredateInput
                    formik={formik}
                    name={'expiredate'}
                />
                <Input
                    label={'قیمت (به تومان)'}
                    formik={formik}
                    name={'price'}
                    required={true}
                    type={'number'}
                />
                <Input
                    label={'ظرفیت'}
                    formik={formik}
                    name={'anbar'}
                    required={true}
                    type={'number'}
                />
                <Select
                    label={'نوع برگزاری'}
                    options={placeItems}
                    formik={formik}
                    name={'place_online'}
                    required={true}
                />
                <Input
                    label={'تخفیف (درصد)'}
                    formik={formik}
                    name={'discount_price'}
                    type={'number'}
                />
                <Input
                    label="توضیحات کوتاه"
                    formik={formik}
                    name={'shortdescription'}
                    required={true}
                />
                <Input
                    label="عنوان متا"
                    formik={formik}
                    name={'meta_title'}
                    required={true}
                />
                <Input
                    label="توضیحات متا"
                    formik={formik}
                    name={'meta_desc'}
                    required={true}
                />
                <Input
                    label="کلمات کلیدی"
                    formik={formik}
                    name={'meta_keywords'}
                    required={true}
                />
                <Select
                    label={'وضعیت'}
                    options={statusItems}
                    formik={formik}
                    name={'status'}
                    required={true}
                />
                <MultiSelect
                    label={'دسته بندی'}
                    required={true}
                    value={formik.values.categories}
                    onChange={(e) => formik.setFieldValue("categories", e)}
                    name="categories"
                    placeholder="دسته بندی"
                    formik={formik}
                    options={!isGetCategory ? categories : []}
                />
                <div className="col-span-2">
                    <TextArea
                        label={'توضیحات کامل'}
                        formik={formik}
                        name={'description'}
                        required={true}
                    />
                </div>
            </div>
            <Lessons formik={formik} />
            <div className="w-full border-t border-t-slate-300 pt-4">
                <div className="w-1/2 gap-3 grid grid-cols-2 ">
                    <button type="submit" className="btn btn--primary">
                        {loading ? <Loading /> : "ثبت"}
                    </button>
                    <button className="btn btn--secondary">
                        لغو
                    </button>
                </div>
            </div>
        </form>
    )
}


function CoverImage({ formik }) {
    const { mutateAsync: mutateUploadPhotos, isPending: isUploading } = useMutation({ mutationFn: updloadAcademyPhotos });

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
            if (data) {
                formik.setFieldValue("files", [{ id: Date.now(), file }])
                formik.setFieldValue("photo_id", [data.photo_id])
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
        <>
            <div className="w-full sm:max-w-[50%] border border-dashed border-slate-400 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-10">
                    {
                        formik.values.files.length ?
                            <img src={URL.createObjectURL(formik.values.files[0].file)} alt="" className="w-full h-full object-cover object-center" />
                            :
                            <div className="w-full p-6 cursor-pointer flex flex-col items-center justify-center gap-4">
                                <FaImage className="w-8 h-8 text-primary-01 " />
                            </div>
                    }
                </div>
                <input
                    type="file"
                    name="select-cover-course-img"
                    id="select-cover-course-img"
                    hidden
                    accept="image/*"
                    onChange={({ target }) => updloadPhotoHandler(target.files[0])}
                />
                <label htmlFor="select-cover-course-img" className="btn btn--secondary !w-full !rounded-t-none">
                    {!isUploading ?
                        "افزودن تصویر"
                        :
                        "درحال آپلود..."
                    }
                </label>
            </div>
            <div className="text-xs text-error pt-1">
                {formik.touched.files && formik.errors.files}
            </div>
        </>
    )
}

function Lessons({ formik }) {
    const [addLesson, setAddLesson] = useState(false);

    return (
        <>
            <div className=" bg-white p-4 rounded-xl">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                    <div className="font-bold text-slate-800">
                        لیست جلسات
                    </div>
                    <button type="button" onClick={() => setAddLesson(true)} className="btn btn--outline gap-2 !py-2">
                        افزودن فیلم آموزشی <IoAddCircleOutline className="w-6 h-6" />
                    </button>
                    <Modal open={addLesson} onClose={() => setAddLesson(false)} title={'افزودن فیلم آموزشی'}>
                        <CreateCourse formik={formik} onClose={() => setAddLesson(false)} />
                    </Modal>
                </div>
                <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {formik.values.videos.map((item, index) => (
                        <li key={index} className="">
                            <div className='flex flex-col relative bg-slate-100 rounded-xl'>

                                <div className="p-3">
                                    <div className='aspect-w-16 aspect-h-9 overflow-hidden'>
                                        <video
                                            controls
                                            className='w-full h-full object-cover object-center rounded-xl'>
                                            <source
                                                src={URL.createObjectURL(item.file)}
                                                type='video/mp4'
                                            />
                                        </video>
                                    </div>
                                </div>
                                <h3 className='w-full text-sm text-slate-800 font-bold px-4 pb-4'>
                                    {item.title}
                                </h3>
                                {/* <button className='btn btn--danger absolute top-5 left-5 !p-2'>
                                <HiOutlineTrash className='w-5 h-5' />
                            </button> */}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='w-full flex justify-start items-start'>
                {formik?.errors.video_id && formik?.touched.video_id &&
                    <p className='error_Message'>
                        {formik?.errors.video_id}
                    </p>}
            </div>
        </>
    )
}

function ExpiredateInput({ formik, name }) {
    return (
        <div className={`w-full py-1 flex flex-col justify-start justify-items-start items-start`}>
            <label
                className='text-sm font-bold px-2 mb-2 inline-block text-slate-800'
                htmlFor={name}
            >
                مهلت ثبت‌نام
                <span style={{ color: "red", fontSize: "18px", display: "inline-block", marginRight: "4px" }}>*</span>
            </label>
            <DatePicker
                value={formik.values.expiredate}
                onChange={(e) => formik.setFieldValue("expiredate", e)}
                locale={persian_fa}
                calendar={persian}
                minDate={new Date()}
                calendarPosition="bottom-right"
                containerClassName="w-full"
                inputClass="w-full appearance-none outline-none bg-transparent text-slate-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4    focus:bg-white focus:shadow-lg dark:focus:shadow-darkLg focus:shadow-red-300 transition-all duration-300 ease-in-out"
            />
            <div className='w-full flex justify-start items-start mt-2'>{formik?.errors[name] && formik?.touched[name] && <p className='error_Message'>{formik?.errors[name]}</p>}</div>
        </div>
    )
}

function CreateCourse({ formik, onClose }) {
    const { mutateAsync: mutateUploadVideos, isPending: isUploading } = useMutation({ mutationFn: updloadAcademyVideos });

    const onSubmit = async (values) => {
        const formData = new FormData();

        for (const key in values) {
            formData.append(key, values[key]);
        }
        formData.append("type", values.file.type.split("/")[0]);

        try {
            const { data } = await mutateUploadVideos(formData);
            if (data) {
                formik.setFieldValue("videos", [...formik.values.videos, { id: Date.now(), ...values }])
                formik.setFieldValue("video_id", [...formik.values.video_id, data.video_id])
                onClose();
            }

        } catch (error) {
            if (error?.response?.status === 401) {
                window.location.reload();
                return;
            }
            toast.error("حجم فایل زیاد است");
        }
    }

    const formikCourse = useFormik({
        initialValues: { title: "", video_type: "kavimo_academy", free_price: "", file: "" },
        onSubmit,
        validationSchema: Yup.object({
            title: Yup.string("").required("عنوان را وارد کنید"),
            free_price: Yup.string("").required("نوع ویدیو را انتخاب کنید"),
            file: Yup.string("").required("ویدیو را انتخاب کنید")
        })
    });


    return (
        <div className="w-full flex flex-col gap-4">
            <div>
                <input
                    type='file'
                    hidden
                    id='video-file'
                    accept='video/*'
                    onChange={(e) => formikCourse.setFieldValue("file", e.target.files[0])}
                />
                {formikCourse.values.file ? (
                    <div className='relative'>
                        <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
                            <video
                                controls
                                className='w-full h-full object-cover'>
                                <source
                                    src={URL.createObjectURL(formikCourse.values.file)}
                                    type='video/mp4'
                                />
                            </video>
                        </div>
                        <label
                            htmlFor='video-file'
                            className='btn btn--secondary cursor-pointer !p-2 absolute top-4 right-4'>
                            <BiEditAlt className='w-5 h-5' />
                        </label>
                    </div>
                ) : (
                    <>
                        <label
                            htmlFor='video-file'
                            className='text-primary-01 cursor-pointer text-xs font-semibold w-full flex flex-col justify-center items-center gap-2 py-7 border border-dashed border-slate-400 rounded-lg'>
                            <GoPlusCircle className='w-12 h-12' />
                            برای افزودن فیلم کلیک کنید
                        </label>
                        <div className='w-full flex justify-start items-start mt-2'>{formikCourse?.errors.file && formikCourse?.touched.file && <p className='error_Message'>{formikCourse?.errors.file}</p>}</div>
                    </>
                )}
            </div>

            <Input
                name={'title'}
                label={'عنوان'}
                formik={formikCourse}
            />
            <div className="flex gap-4">
                <Select
                    name={'video_type'}
                    label={'محل آپلود'}
                    formik={formikCourse}
                    options={[{ value: "kavimo_academy", label: "kavimo_academy" }, { value: "innternal_academy", label: "innternal_academy" }]}
                />
                <Select
                    name={'free_price'}
                    label={'نوع ویدیو'}
                    formik={formikCourse}
                    options={[{ value: "", label: "یک گزینه را انتخاب کنید" }, { value: "free", label: "رایگان" }, { value: "price", label: "پولی" }]}
                />
            </div>

            <button type="button" onClick={formikCourse.handleSubmit} className="btn btn--primary !w-full">
                {isUploading ? <Loading /> : "ثبت"}
            </button>
        </div>
    )
}