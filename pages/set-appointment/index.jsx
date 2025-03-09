import Header from "@/components/Header";
import Appointment from "@/components/Profile/setAppointment/Appointment";
import { useServiceOrderContext } from "@/context/ServiceOrderContext";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SetAppointment() {
    const { service } = useServiceOrderContext();
    const [data, setData] = useState(service);

    const router = useRouter();

    useEffect(() => {
        if (!data) {
            router.push('/');
        }
    }, [data]);

    return (
        <div className="w-full">
            <Header />
            {data && <Appointment data={data} setData={setData} />}
            {/* 

            {
                !isLoading && user && user.id === expert.id &&
                <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex items-center flex-col gap-2 justify-center">
                    <div className="text-lg font-semibold text-primary-01">
                        شما نمیتوانید از خدمات ثبت شده توسط خودتان استفاده کنید!
                    </div>
                    <div>
                        <Link href={'/'} className="btn btn--secondary mt-4">
                            بازگشت به صفحه اصلی
                        </Link>
                    </div>
                </div>
            }

             */}

            {/* {
                success &&
                <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex flex-col items-center justify-center">
                    <FiCheckCircle className="w-20 h-20 text-green-500" />
                    <h2 className="pt-4 pb-1 text-primary-01 font-bold">
                        پرداخت موفق
                    </h2>
                    <span className="text-sm text-slate-800">
                        {
                            type === "turn" ?
                                "نوبت شما با شماره پیگیری 1234567 ثبت شد" :
                                "ثبت‌نام شما انجام شد"
                        }
                    </span>
                    <div>
                        <Link href={'/'} className="btn btn--secondary mt-4">
                            بازگشت به صفحه اصلی
                        </Link>
                    </div>
                </div>
            } */}
        </div>
    )
}
