import Address from "@/components/cart/Address";
import Cart from "@/components/cart/Cart";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useGetCart } from "@/hooks/useCart";
import useProfile from "@/hooks/useProfile"
import Loading from "@/tools/Loading";
import Link from "next/link";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function cart() {
    const { user, isLoading } = useProfile();
    const [step, setStep] = useState(1);
    const { cart, isGetCart } = useGetCart();

    const renderStep = () => {
        switch (step) {
            case 1: return (
                <Cart
                    setStep={setStep}
                />
            )

            case 2: return (
                <Address setStep={setStep} />
            )

            default:
                break;
        }
    }

    return (
        <>
            <Header />
            <div className="w-full h-[calc(100vh-64px)]">
                {
                    isLoading &&
                    <div className="w-full h-full flex items-center justify-center">
                        <Loading customeColor="#0693a4" />
                    </div>
                }

                {
                    !isLoading && !user &&
                    <div className="w-full h-full flex items-center flex-col gap-2 justify-center">
                        <Link href="/auth" className="text-lg font-semibold text-primary-01">
                            ورود | ثبت نام
                        </Link>
                        <p className="text-sm text-slate-800">
                            لطفا وارد حساب کاربری خود شوید
                        </p>
                    </div>
                }

                {
                    !isLoading && user && !cart && !isGetCart &&
                    <div className="w-full h-full flex items-center flex-col gap-2 justify-center">
                        <IoCartOutline className="w-20 h-20 text-slate-400" />
                        <p className="text-lg font-medium text-slate-800">
                            سبد خرید شما خالی است!
                        </p>
                    </div>
                }

                {
                    !isLoading && user && cart && !isGetCart && renderStep()
                }
            </div>
        </>
    )
}
