import useProfile from "@/hooks/useProfile"
import Loading from "@/tools/Loading";
import Link from "next/link";
import ExpertDetails from "./ExpertDetails";
import VisitDetails from "./VisitDetails";
import Summary from "./Summary";
import { useEffect, useState } from "react";
import { addOrderService } from "@/services/expertApi/specialistServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import toEnglishNumber from "@/utils/toEnglishNumber";
import { encryptData } from "@/utils/crypto";
import ResultAppointment from "./ResultAppointment";
import getPriceService from "@/components/admin/adminProfileSteps/myservices/getPriceService";
import axios from "axios";
import Cookies from "js-cookie";
import { goPaymentService } from "./goPaymentService";
import Payments from "./Payments";


// "pay" status = Go to payment
// "success" status = only success message
// "payAfter" status = go to payment after submited expert

export default function Appointment({ data }) {
    const { user, isLoading } = useProfile();
    const [descUser, setDescUser] = useState(data.descriptionUser);
    const [dateTime, setDateTime] = useState({ date: data.date, time: data.time });
    const [price, setPrice] = useState(data.price);
    const router = useRouter();
    const { mutateAsync: mutateAddOrder, isPending } = useMutation({ mutationFn: addOrderService });
    const [payMethod, setPayMethod] = useState("");
    const conditionForPay = data?.serviceData?.price_type === "charity" || data?.serviceData?.price_type === "custom";

    const renderStatus = (resPrice) => {
        switch (true) {
            case resPrice !== "0":
                return { status: "pay", message: "" };

            case resPrice === "0" && data.serviceData.price_type === "charity":
                return { status: "pay", message: "" };

            case resPrice === "0" && data.serviceData.price_type === "suggestion":
                return { status: "payAfter", message: "سفارش شما با موفقیت ثبت شد و پس از تایید تعرفه پیشنهادی از سوی متخصص قابل پرداخت است" };

            case resPrice === "0" && data.serviceData.price_type === "free":
                return { status: "success", message: "سفارش شما با موفقیت ثبت شد" };

            default:
                return null;
        }
    };

    const submitOrderHandler = async () => {
        if (conditionForPay) {
            if (!payMethod) {
                toast.error("درگاه پرداخت را انتخاب کنید");
                return
            }
        }

        const details = JSON.stringify({
            date: toEnglishNumber(dateTime.date),
            time: dateTime.time,
            description: descUser,
        });

        let user_price = ""
        let type = ""

        if (data.serviceData.price_type === "suggestion" || data.serviceData.price_type === "charity") {
            user_price = price;
            type = getPriceService(data.serviceData.price_type);
        }

        try {
            const { data: resData } = await mutateAddOrder({
                json_data: details,
                serice_id: data.serviceData.id.toString(),
                user_price,
                type,
                paymentmethod: payMethod,
            });

            if (resData) {
                if (renderStatus(resData.price).status === "pay") {
                    goPaymentService(resData.order_id);
                }
            }

            router.replace(`/set-appointment/${encryptData({ order: 2, ...renderStatus(resData.price), orderId: resData.order_id })}`);

        } catch (error) {
            if (error?.response?.status === 401) {
                toast.error("ابتدا وارد حساب کاربری خود شوید");
                router.replace("/auth");
            }
        }
    }


    if (data.order === 2) return <ResultAppointment data={data} />

    return (
        <div>
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
                !isLoading && user &&
                <div className="w-full grid grid-cols-1 gap-2 lg:gap-4 lg:grid-cols-5 p-6 lg:px-12 md:container md:mx-auto">
                    <div className="flex flex-col gap-2 lg:col-span-3">
                        <div>
                            <ExpertDetails expert={data.expert} />
                        </div>
                        <div>
                            <VisitDetails
                                setDescUser={setDescUser}
                                descUser={descUser}
                                serviceData={data.serviceData}
                                date={dateTime.date}
                                time={dateTime.time}
                                setDateTime={setDateTime}
                                type={data.type}
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        {
                            conditionForPay &&
                            <div>
                                <Payments selected={payMethod} onSelected={setPayMethod} />
                            </div>
                        }

                        <Summary
                            price={price}
                            setPrice={setPrice}
                            serviceData={data.serviceData}
                            submitHandler={submitOrderHandler}
                            isLoading={isPending}
                        />
                    </div>
                </div>
            }
        </div>
    )
}
