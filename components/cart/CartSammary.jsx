import { useGetCart } from "@/hooks/useCart";
import numberWithCommas from "@/utils/numberWithCommas";

export default function CartSammary({ cartSammary, setStep }) {
    const { cart } = useGetCart();

    return (
        <div className="w-full lg:col-span-4 border border-slate-300 rounded-lg p-6 space-y-3">
            <div className="w-full flex items-center justify-between text-slate-700">
                <span className="text-xs font-medium">
                    قیمت کالا ها({cart?.totalqty})
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(cart.totalpureprice)} <span className="text-xs text-slate-600 font-medium">تومان</span>
                </div>
            </div>
            {cart.totaldiscountprice && <div className="w-full flex items-center justify-between text-error">
                <span className="text-xs font-medium">
                    سود شما از این خرید
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(cart.totaldiscountprice)} <span className="text-xs text-slate-600 font-medium">تومان</span>
                </div>
            </div>}
            <div className="w-full flex items-center justify-between text-slate-900 border-t border-slate-300 pt-4 !mt-4">
                <span className="font-bold text-sm">
                    قیمت نهایی
                </span>
                <div className="font-bold">
                    {numberWithCommas(cart.totalprice)} <span className="text-xs text-slate-600 font-medium">تومان</span>
                </div>
            </div>

            <button onClick={() => setStep(2)} className="btn btn--primary w-full !mt-6">
                تایید و تکمیل سفارش
            </button>
        </div>

    )
}
