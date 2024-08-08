import numberWithCommas from "@/utils/numberWithCommas";
import { HiShoppingCart } from "react-icons/hi";
import { LiaShippingFastSolid } from "react-icons/lia";
import AddressList from "./AddressList";
import { FaArrowRight } from "react-icons/fa6";

export default function Address({ setStep }) {
    return (
        <div className="w-full  max-w-screen-xl mx-auto p-6 lg:p-10">
            <div className="w-full flex items-center justify-between p-4 pl-6 border border-slate-300 rounded-xl">
                <div className="flex items-center gap-3">
                    <button onClick={() => setStep(1)} className="text-gray-800">
                        <FaArrowRight className="w-5 h-5" />
                    </button>
                    <h1 className="text-gray-800 font-semibold text-sm sm:text-base">
                        آدرس محل تحویل
                    </h1>
                </div>
                <LiaShippingFastSolid className="w-8 h-8 sm:w-10 sm:h-10 text-primary-01" />
            </div>
            <div className="w-full grid items-start grid-cols-1 gap-6 lg:grid-cols-12 mt-6">
                <div className="w-full lg:col-span-8 space-y-6">
                    <AddressList />
                    <ProductsList />
                </div>
                <AddressSammary setStep={setStep} />
            </div>
        </div>
    )
}


function AddressSammary({ setStep }) {
    return (
        <div className="w-full lg:col-span-4 border border-slate-300 rounded-xl p-6 space-y-3">
            <div className="w-full flex items-center justify-between text-gray-700">
                <span className="text-xs font-medium">
                    قیمت کالا ها(3)
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(2500000)} <span className="text-xs text-gray-600 font-medium">تومان</span>
                </div>
            </div>
            <div className="w-full flex items-center justify-between text-error">
                <span className="text-xs font-medium">
                    سود شما از این خرید
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(2500000)} <span className="text-xs text-gray-600 font-medium">تومان</span>
                </div>
            </div>
            <div className="w-full flex items-center justify-between text-error">
                <span className="text-xs font-medium">
                    هزینه ارسال
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(2500000)} <span className="text-xs text-gray-600 font-medium">تومان</span>
                </div>
            </div>
            <div className="w-full flex items-center justify-between text-gray-900 border-t border-gray-300 pt-4 !mt-4">
                <span className="font-bold text-sm">
                    جمع سبد خرید
                </span>
                <div className="font-bold">
                    {numberWithCommas(2500000)} <span className="text-xs text-gray-600 font-medium">تومان</span>
                </div>
            </div>

            <button onClick={() => setStep(3)} className="btn btn--primary w-full !mt-6">
                تایید و ادامه
            </button>
        </div>
    )
}


function ProductsList() {
    return (
        <div className="w-full border border-slate-300 rounded-xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-5">
                <HiShoppingCart className="w-6 h-6" />
                محصولات شما (3)
            </div>

            <div>

            </div>
        </div>
    )
}