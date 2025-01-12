import Address from "@/components/cart/Address";
import Cart from "@/components/cart/Cart";
import Header from "@/components/Header";
import { useCartShop } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";

export default function cart() {
    const [step, setStep] = useState(1);
    const { cartList } = useCartShop();

    const renderStep = () => {
        switch (step) {
            case 1: return (
                <Cart
                    cartItems={cartList}
                    setStep={setStep}
                />
            )

            case 2: return (
                <Address setStep={setStep} />
            )

            case 3: return (
                <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex flex-col items-center justify-center">
                    <BsBagCheck className="w-20 h-20 text-green-500" />
                    <h2 className="pt-4 pb-1 text-primary-01 font-bold">
                        پرداخت موفق
                    </h2>
                    <span className="text-sm text-slate-800">
                        سفارش شما با شماره سفارش 3463463 ثبت شد
                    </span>
                    <div>
                        <Link href={'/'} className="btn btn--secondary mt-4">
                            بازگشت به صفحه اصلی
                        </Link>
                    </div>
                </div>
            )

            default:
                break;
        }
    }

    return (
        <>
            <Header />
            <div className="w-full">
                {/* {
                    isLoading &&
                    <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex items-center justify-center">
                        <Loading customeColor="#0693a4" />
                    </div>
                } */}

                {/* {
                    !isLoading && !user &&
                    <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex items-center flex-col gap-2 justify-center">
                        <Link href="/auth" className="text-lg font-semibold text-primary-01">
                            ورود | ثبت‌نام
                        </Link>
                        <p className="text-sm text-slate-800">
                            لطفا وارد حساب کاربری خود شوید
                        </p>
                    </div>
                } */}

                {
                    cartList.length === 0 &&
                    <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex items-center flex-col gap-2 justify-center">
                        <IoCartOutline className="w-20 h-20 text-slate-400" />
                        <p className="text-lg font-medium text-slate-800">
                            سبد خرید شما خالی است!
                        </p>
                    </div>
                }

                {
                   cartList.length > 0 && renderStep()
                }
            </div>
        </>
    )
}
