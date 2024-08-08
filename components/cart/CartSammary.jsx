import numberWithCommas from "@/utils/numberWithCommas";

export default function CartSammary({ cartSammary, setStep }) {
    return (
        <div className="w-full lg:col-span-4 border border-gray-300 rounded-lg p-6 space-y-3">
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
            <div className="w-full flex items-center justify-between text-gray-900 border-t border-gray-300 pt-4 !mt-4">
                <span className="font-bold text-sm">
                    جمع سبد خرید
                </span>
                <div className="font-bold">
                    {numberWithCommas(2500000)} <span className="text-xs text-gray-600 font-medium">تومان</span>
                </div>
            </div>

            <button onClick={() => setStep(2)} className="btn btn--primary w-full !mt-6">
                تایید و تکمیل سفارش
            </button>
        </div>

    )
}
