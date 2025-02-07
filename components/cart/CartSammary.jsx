import { useCartShop } from "@/context/CartContext";
import useProfile from "@/hooks/useProfile";
import numberWithCommas from "@/utils/numberWithCommas";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CartSammary({ cartSammary, setStep }) {
    const { cartList, getCartTotal, getTotalAmountDue, getCartDiscountTotal } = useCartShop();
    const { user } = useProfile();
    const router = useRouter();

    return (
        <div className="w-full lg:col-span-4 border border-slate-300 dark:border-slate-400 rounded-lg p-6 space-y-3">
            <div className="w-full flex items-center justify-between text-slate-700">
                <span className="text-xs font-medium">
                    قیمت کالا ها({cartList.length})
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(getCartTotal())} <span className="text-xs text-slate-600 font-medium">تومان</span>
                </div>
            </div>
            {getCartDiscountTotal() > 0 && <div className="w-full flex items-center justify-between text-error">
                <span className="text-xs font-medium">
                    سود شما از این خرید
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(getCartDiscountTotal())} <span className="text-xs text-slate-600 font-medium">تومان</span>
                </div>
            </div>}
            <div className="w-full flex items-center justify-between text-slate-900 border-t border-slate-300 dark:border-slate-400 pt-4 !mt-4">
                <span className="font-bold text-sm">
                    قیمت نهایی
                </span>
                <div className="font-bold">
                    {numberWithCommas(getTotalAmountDue())} <span className="text-xs text-slate-600 font-medium">تومان</span>
                </div>
            </div>

            <button
                onClick={() => {
                    if (user) {
                        setStep(2)
                    } else {
                        toast.error("ابتدا وارد حساب کاربری خود شوید");
                        router.replace("/auth");
                    }
                }}
                className="btn btn--primary w-full !mt-6"
            >
                تایید و تکمیل سفارش
            </button>
        </div>

    )
}
