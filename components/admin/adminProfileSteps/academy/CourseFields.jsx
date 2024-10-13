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
import { updloadAcademyPhotos } from "@/services/academyService";
import toast from "react-hot-toast";
import Loading from "@/tools/Loading";

const statusItems = [
    { value: "", label: "وضعیت دوره را انتخاب کنید" },
    { value: 0, label: "غیر فعال" },
    { value: 1, label: "فعال" },
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
            <div className="w-full sm:max-w-[50%] border border-dashed border-slate-300 rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-10">
                    {
                        formik.values.files.length ?
                            <img src={URL.createObjectURL(formik.values.files[0].file)} alt="" className="w-full h-full object-cover object-center" />
                            :
                            <div className="w-full p-6 cursor-pointer flex flex-col items-center justify-center gap-4">
                                <FaImage className="w-8 h-8 text-primary-01/50" />
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
        <div className=" bg-white p-4 rounded-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <div className="font-bold text-slate-800">
                    لیست جلسات
                </div>
                <button onClick={() => setAddLesson(true)} className="btn btn--outline gap-2 !py-2">
                    افزودن فیلم آموزشی <IoAddCircleOutline className="w-6 h-6" />
                </button>
                <Modal open={addLesson} onClose={() => setAddLesson(false)} title={'افزودن فیلم آموزشی'}>

                </Modal>
            </div>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {Array(5).fill({}).map((item, index) => (
                    <li key={index} className="">
                        <div className='flex flex-col relative bg-slate-100 rounded-xl'>

                            <div className="p-3">
                                <div className='aspect-w-16 aspect-h-9 overflow-hidden'>
                                    <video
                                        controls
                                        className='w-full h-full object-cover object-center rounded-xl'>
                                        <source
                                            // src={data.path}
                                            type='video/mp4'
                                        />
                                    </video>
                                </div>
                            </div>
                            <h3 className='w-full text-sm text-gray-800 font-bold px-4 pb-4'>
                                قسمت اول
                            </h3>
                            <button className='btn btn--danger absolute top-5 left-5 !p-2'>
                                <HiOutlineTrash className='w-5 h-5' />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function ExpiredateInput({ formik, name }) {
    return (
        <div className={`w-full py-1 flex flex-col justify-start justify-items-start items-start`}>
            <label
                className='text-sm font-bold px-2 mb-2 inline-block text-slate-800'
                htmlFor={name}
            >
                مهلت ثبت نام
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
                inputClass="w-full appearance-none outline-none bg-transparent text-gray-700 border  border-primary-01 border-opacity-25 focus:border-opacity-100 rounded-md py-2 px-4    focus:bg-white focus:shadow-lg focus:shadow-red-300 transition-all duration-300 ease-in-out"
            />
            <div className='w-full flex justify-start items-start mt-2'>{formik?.errors[name] && formik?.touched[name] && <p className='error_Message'>{formik?.errors[name]}</p>}</div>
        </div>
    )
}