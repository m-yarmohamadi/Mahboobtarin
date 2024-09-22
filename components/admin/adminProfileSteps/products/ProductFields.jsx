import Input from "@/tools/Input";
import Select from "@/tools/Select";
import { FaImage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function ProductFields() {
    return (
        <form className="w-full space-y-4 py-6">

            <PictureSelector />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label={'نام محصول'}
                />
                <Input
                    label={'تعداد'}
                />
                <Input
                    label={'قیمت'}
                />
                <Input
                    label={'تخفیف'}
                />
                <Select
                    label={'دسته بندی'}
                    options={[]}
                />
                <Input
                    label={'ویژگی'}
                />
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

function PictureSelector() {
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