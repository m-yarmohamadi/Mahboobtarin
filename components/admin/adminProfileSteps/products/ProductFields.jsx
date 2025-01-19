import Input from "@/tools/Input";
import Select from "@/tools/Select";
import TextArea from "@/tools/TextArea";
import { FaImage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useGetProductCategory } from "@/hooks/useProducts";
import ReactSelect from 'react-select';
import MultiSelect from "@/tools/MultiSelect";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { updloadProductPhotos } from "@/services/productService";
import Loading from "@/tools/Loading";

const statusItems = [
    { value: "", label: "وضعیت محصول را انتخاب کنید" },
    { value: 0, label: "غیر فعال" },
    { value: 1, label: "فعال" },
]

export default function ProductFields({ formik, loading }) {
    const { categories, isGetCategory } = useGetProductCategory();

    return (
        <form onSubmit={formik.handleSubmit} className="w-full space-y-4 py-6">

            <PictureSelector formik={formik} />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label={'نام'}
                    formik={formik}
                    name={'title'}
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
                    label={'تعداد موجود در انبار'}
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

            <div className="w-full border-t border-t-slate-300 pt-4">
                <div className="w-1/2 gap-3 grid grid-cols-2 ">
                    <button type="submit" className="btn btn--primary">
                        {loading ? <Loading /> : "ثبت محصول"}
                    </button>
                    <button className="btn btn--secondary">
                        لغو
                    </button>
                </div>
            </div>

        </form>
    )
}

function PictureSelector({ formik }) {
    const { mutateAsync: mutateUploadPhotos, isPending: isUploading } = useMutation({ mutationFn: updloadProductPhotos });

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
                formik.setFieldValue("files", [...formik.values.files, { id: Date.now(), file }])
                formik.setFieldValue("photo_id", [...formik.values.photo_id, data.photo_id])
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
        <div>
            <label
                htmlFor="select-product-img"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    [...e.dataTransfer.files].forEach((file, i) => {
                        const checkType = file.type.split("/")[0];
                        if (checkType === "image") {
                            updloadPhotoHandler(file)
                        } else {
                            toast.error("فقط تصویر انتخاب کنید")
                        }
                    });
                }}
                className="w-full p-6 cursor-pointer flex flex-col items-center justify-center gap-4 border border-dashed border-slate-400 rounded-xl"
            >
                <input
                    type="file"
                    name="select-product-img"
                    id="select-product-img"
                    hidden
                    accept="image/*"
                    onChange={(e) => updloadPhotoHandler(e.target.files[0])}
                />
                {!isUploading ?
                    <>
                        <FaImage className="w-8 h-8 text-textDefault opacity-40" />
                        <p className="text-sm font-semibold text-textDefault opacity-40">
                            برای افزودن تصویر کلیک کنید یا تصویر را در این بخش رها کنید
                        </p>
                    </>
                    :
                    <div className="text-sm font-semibold text-slate-700 flex flex-col items-center gap-2">
                        <Loading customeColor={'#0693a4'} />
                        درحال آپلود
                    </div>
                }
            </label>

            <div className="py-4">
                {formik.values.files.length ?
                    <div className="flex flex-wrap gap-4">
                        {formik.values.files.map((file) => (
                            <div key={file.id} className="w-24 h-24 rounded-lg overflow-hidden p-1 border border-slate-300 relative">
                                <img src={URL.createObjectURL(file.file)} alt="" className="w-full h-full object-contain object-center" />
                                {/* <button onClick={() => formik.setFieldValue("files", formik.values.files.filter((f) => f.id !== file.id))} className="w-5 h-5 flex items-center justify-center rounded-full bg-white shadow-md dark:shadow-darkMd text-error absolute top-2 right-2">
                                    <IoMdClose className="w-4 h-4" />
                                </button> */}
                            </div>
                        ))}
                    </div>
                    :
                    formik?.errors?.files && formik?.touched?.files &&
                    <div className='w-full flex justify-start items-start mt-2'>
                        <p className='error_Message'>
                            {formik?.errors?.files}
                        </p>
                    </div>
                }
            </div>
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
                تاریخ انقضا
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