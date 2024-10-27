import Course from "@/components/academy/registerCourse/Course";
import Summary from "@/components/academy/registerCourse/Summary";
import TeacherDetails from "@/components/academy/registerCourse/TeacherDetails";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useProfile from "@/hooks/useProfile";
import Loading from "@/tools/Loading";
import Link from "next/link";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function RegisterCourse() {
    const { user, isLoading } = useProfile();
    const [success, setSuccess] = useState(false);

    return (
        <>
            <Header />
            {
                isLoading &&
                <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex items-center justify-center">
                    <Loading customeColor="#0693a4" />
                </div>
            }

            {
                !isLoading && !user &&
                <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex items-center flex-col gap-2 justify-center">
                    <Link href="/auth" className="text-lg font-semibold text-primary-01">
                        ورود | ثبت‌نام
                    </Link>
                    <p className="text-sm text-slate-800">
                        لطفا وارد حساب کاربری خود شوید
                    </p>
                </div>
            }

            {
                !isLoading && !success &&
                <>
                    <div className="w-full grid grid-cols-1 gap-2 lg:gap-4 lg:grid-cols-5 p-6 lg:px-12 md:container md:mx-auto">
                        <div className="flex flex-col gap-2 lg:col-span-3">
                            <div>
                                <TeacherDetails />
                            </div>
                            <div>
                                <Course />
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <Summary setSuccess={() => setSuccess(true)} />
                        </div>
                    </div>
                    <Footer />
                </>
            }
            {
                !isLoading && success && user &&
                <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex flex-col items-center justify-center">
                    <FiCheckCircle className="w-20 h-20 text-green-500" />
                    <h2 className="pt-4 pb-1 text-primary-01 font-bold">
                        پرداخت موفق
                    </h2>
                    <span className="text-sm text-slate-800">
                        ثبت‌نام شما انجام شد
                    </span>
                    <div>
                        <button onClick={() => window.history.back()} className="btn btn--secondary mt-4">
                            رفتن به صفحه دوره
                        </button>
                    </div>
                </div>
            }
        </>
    )
}
