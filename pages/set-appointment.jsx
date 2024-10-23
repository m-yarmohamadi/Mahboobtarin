import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ExpertDetails from "@/components/Profile/setAppointment/ExpertDetails";
import Summary from "@/components/Profile/setAppointment/Summary";
import VisitDetails from "@/components/Profile/setAppointment/VisitDetails";
import useProfile from "@/hooks/useProfile";
import { getServiceProfile } from "@/services/expertDashboardService";
import Loading from "@/tools/Loading";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function setAppointment() {
    const { user, isLoading } = useProfile();
    const [loadData, setLoadData] = useState(true);
    const [serviceData, setServiceData] = useState({});
    const searchParams = useSearchParams();
    const expertParam = searchParams.get("expert");
    const expert = expertParam ? JSON.parse(expertParam) : {};
    const serviceId = searchParams.get("serviceId");
    const type = searchParams.get("type");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchServicesHandler() {
            try {
                const { data } = await getServiceProfile(expert.id, serviceId);
                setServiceData(data);
                setLoadData(false);
            } catch (error) {
                console.log(error);
            }
        }

        if (serviceId) {
            fetchServicesHandler();
        }
    }, [serviceId])

    return (
        <div className="w-full">
            <Header />
            {
                isLoading && loadData &&
                <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex items-center justify-center">
                    <Loading customeColor="#0693a4" />
                </div>
            }

            {
                !isLoading && !user &&
                <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex items-center flex-col gap-2 justify-center">
                    <Link href="/auth" className="text-lg font-semibold text-primary-01">
                        ورود | ثبت نام
                    </Link>
                    <p className="text-sm text-slate-800">
                        لطفا وارد حساب کاربری خود شوید
                    </p>
                </div>
            }

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

            {
                !isLoading && !loadData && user && !success && user.id !== expert.id &&
                <div className="w-full grid grid-cols-1 gap-2 lg:gap-4 lg:grid-cols-5 p-6 lg:px-12 md:container md:mx-auto">
                    <div className="flex flex-col gap-2 lg:col-span-3">
                        <div>
                            <ExpertDetails expert={expert} />
                        </div>
                        <div>
                            <VisitDetails serviceData={serviceData} type={type} />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <Summary serviceData={serviceData} setSuccess={() => setSuccess(true)} />
                    </div>
                </div>
            }

            {
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
                                "ثبت نام شما انجام شد"
                        }
                    </span>
                    <div>
                        <Link href={'/'} className="btn btn--secondary mt-4">
                            بازگشت به صفحه اصلی
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}
