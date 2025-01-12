import numberWithCommas from "@/utils/numberWithCommas";
import { HiShoppingCart } from "react-icons/hi";
import { LiaShippingFastSolid } from "react-icons/lia";
import AddressList from "./AddressList";
import { FaArrowRight } from "react-icons/fa6";
import { useAddToCart, useGetCart, useGetSendMethods } from "@/hooks/useCart";
import { useState } from "react";
import SendMethods from "./SendMethods";
import { useCartShop } from "@/context/CartContext";

export default function Address({ setStep }) {
    const [sendMethod, setSendMethod] = useState("adi");
    const [address, setAddress] = useState();
    const [provinceLabel, setProvinceLabel] = useState();

    return (
        <div className="w-full  max-w-screen-xl mx-auto p-6 lg:p-10">
            <div className="w-full flex items-center justify-between p-4 pl-6 border border-slate-300 dark:border-slate-400 rounded-xl">
                <div className="flex items-center gap-3">
                    <button onClick={() => setStep(1)} className="text-slate-800">
                        <FaArrowRight className="w-5 h-5" />
                    </button>
                    <h1 className="text-slate-800 font-semibold text-sm sm:text-base">
                        مشخصات ارسال
                    </h1>
                </div>
                <LiaShippingFastSolid className="w-8 h-8 sm:w-10 sm:h-10 text-primary-01" />
            </div>
            <div className="w-full grid items-start grid-cols-1 gap-6 lg:grid-cols-12 mt-6">
                <div className="w-full lg:col-span-8 space-y-6">
                    <AddressList setProvinceLabel={setProvinceLabel} address={address} setAddress={setAddress} />
                    <SendMethods provinceLabel={provinceLabel} sendMethod={sendMethod} setSendMethod={setSendMethod} />
                    <ProductsList />
                </div>
                <AddressSammary setStep={setStep} sendMethod={sendMethod} />
            </div>
        </div>
    )
}


function AddressSammary({ setStep, sendMethod, address }) {
    const { cart } = useGetCart();
    const { clearCart } = useAddToCart();
    const { getPrice } = useGetSendMethods();
    const { cartList, getCartTotal, getTotalAmountDue, getCartDiscountTotal } = useCartShop();

    return (
        <div className="w-full lg:col-span-4 border border-slate-300 dark:border-slate-400 rounded-xl p-6 space-y-3">
            <div className="w-full flex items-center justify-between text-slate-700">
                <span className="text-xs font-medium">
                    قیمت کالا ها({cartList?.length})
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(getCartTotal())} <span className="text-xs text-slate-600 font-medium">تومان</span>
                </div>
            </div>
            {getCartDiscountTotal() &&
                <div className="w-full flex items-center justify-between text-error">
                    <span className="text-xs font-medium">
                        سود شما از این خرید
                    </span>
                    <div className="font-bold text-sm">
                        {numberWithCommas(getCartDiscountTotal())} <span className="text-xs text-slate-600 font-medium">تومان</span>
                    </div>
                </div>}
            <div className="w-full flex items-center justify-between text-slate-700">
                <span className="text-xs font-medium">
                    هزینه ارسال
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(getPrice(sendMethod))} <span className="text-xs text-slate-600 font-medium">تومان</span>
                </div>
            </div>
            <div className="w-full flex items-center justify-between text-slate-900 border-t border-slate-300 dark:border-slate-400 pt-4 !mt-4">
                <span className="font-bold text-sm">
                    قیمت نهایی
                </span>
                <div className="font-bold">
                    {numberWithCommas(Number(getTotalAmountDue()) + Number(getPrice(sendMethod)))} <span className="text-xs text-slate-600 font-medium">تومان</span>
                </div>
            </div>

            <button
                onClick={() => {
                    setStep(3);
                    clearCart();
                }}
                className="btn btn--primary w-full !mt-6"
            >
                پرداخت
            </button>
        </div>
    )
}


function ProductsList() {
    const { cartList } = useCartShop();

    return (
        <div className="w-full border border-slate-300 dark:border-slate-400 rounded-xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-5">
                <HiShoppingCart className="w-6 h-6" />
                محصولات شما ({cartList.length})
            </div>

            <div className="flex items-center flex-wrap gap-4">
                {cartList?.map((item, index) => (
                    <div key={item.product.id} className="border-l border-l-slate-300 dark:border-l-slate-400 pl-4 last:border-0 py-4">
                        <div className="w-32">
                            <div className="aspect-w-10 aspect-h-10">
                                <img src={item?.product?.photos[0]?.path} alt="" className="w-full h-full object-cover object-center  rounded-lg overflow-hidden" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}