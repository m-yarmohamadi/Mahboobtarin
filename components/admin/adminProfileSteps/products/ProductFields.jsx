import Input from "@/tools/Input";
import Select from "@/tools/Select";
import TextArea from "@/tools/TextArea";
import { FaImage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useGetProductCategory } from "@/hooks/useProducts";

export default function ProductFields({ formik }) {
    const { categories, isGetCategory } = useGetProductCategory();
    console.log(categories);
    
    return (
        <form className="w-full space-y-4 py-6">

            <PictureSelector formik={formik} />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label={'نام فارسی'}
                    formik={formik}
                    name={'title'}
                />
                <Input
                    label={'نام انگلیسی'}
                    formik={formik}
                    name={'entitle'}
                />
                <Input
                    label={'کد محصول'}
                    formik={formik}
                    name={'sku'}
                />
                <Input
                    label={'اسلاگ'}
                    formik={formik}
                    name={'slug'}
                />
                <ExpiredateInput
                    formik={formik}
                    name={'expiredate'}
                />
                <Input
                    label={'قیمت (به تومان)'}
                    formik={formik}
                    name={'price'}
                />
                <Input
                    label={'تعداد موجود در انبار'}
                    formik={formik}
                    name={'anbar'}
                />
                <Input
                    label={'تخفیف (درصد)'}
                    formik={formik}
                    name={'discount_price'}
                />
                <Input
                    label="توضیحات کوتاه"
                    formik={formik}
                    name={'shortdescription'}
                />
                <Input
                    label="عنوان متا"
                    formik={formik}
                    name={'meta_title'}
                />
                <Input
                    label="توضیحات متا"
                    formik={formik}
                    name={'meta_desc'}
                />
                <Input
                    label="کلمات کلیدی"
                    formik={formik}
                    name={'meta_keywords'}
                />
                <Select
                    label={'وضعیت'}
                    options={[]}
                    formik={formik}
                    name={'status'}
                />
                <Select
                    label={'برند'}
                    options={[]}
                    formik={formik}
                    name={'brand_id'}
                />
                <Select
                    label={'دسته بندی'}
                    options={[]}
                    formik={formik}
                    name={'categories'}
                />
                <div className="col-span-2">
                    <TextArea
                        label={'توضیحات کامل'}
                        formik={formik}
                        name={'description'}
                    />
                </div>
            </div>

            <div className="w-full border-t border-t-slate-300 pt-4">
                <div className="w-1/2 gap-3 grid grid-cols-2 ">
                    <button className="btn btn--primary">
                        ثبت محصول
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
    return (
        <div>
            <label htmlFor="select-product-img" className="w-full p-6 cursor-pointer flex flex-col items-center justify-center gap-4 border border-dashed border-slate-300 rounded-xl">
                <input type="file" name="select-product-img" id="select-product-img" hidden accept="image/*" />
                <FaImage className="w-8 h-8 text-primary-01/50" />
                <p className="text-sm font-semibold text-primary-01/50">
                    برای افزودن تصویر کلیک کنید
                </p>
            </label>

            <div className="py-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden p-1 border border-slate-300 relative">
                    <img src="/images/Book004.png" alt="" className="w-full h-full object-contain object-center" />
                    <button className="w-5 h-5 flex items-center justify-center rounded-full bg-white shadow-md text-error absolute top-2 right-2">
                        <IoMdClose className="w-4 h-4" />
                    </button>
                </div>
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
            </label>
            <DatePicker
                // value={dateTimeFormik.values.date}
                // onChange={(e) => {
                //     dateTimeFormik.setFieldValue("date", e);
                //     let newArr = e.map((item) => toEnglishNumber(toPersianDateShort(item)));
                //     let updateItem = formik.values.activity_time ? [{ ...formik.values.activity_time[0], day: newArr }] : [{ day: newArr, time: "" }];
                //     formik.setFieldValue("activity_time", updateItem);
                // }}
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