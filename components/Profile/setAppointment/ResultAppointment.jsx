import Loading from "@/tools/Loading";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export default function ResultAppointment({ data }) {

    return (
        data.status !== "pay" ?
            <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex flex-col items-center justify-center">
                <FiCheckCircle className="w-20 h-20 text-green-500" />
                <h2 className="pt-4 pb-1 text-primary-01 font-bold">
                    سفارش ثبت شد
                </h2>
                <div className="text-sm text-slate-900 py-2 text-center">
                    {data.orderId}
                </div>
                <div className="text-sm text-slate-800 px-6 text-center">
                    {data.message}
                </div>
                <div>
                    <Link href={'/'} className="btn btn--secondary mt-4">
                        بازگشت به صفحه اصلی
                    </Link>
                </div>
            </div>
            :
            <div className="w-full h-full fixed top-0 right-0 bg-slate-200/70 backdrop-blur flex flex-col items-center justify-center gap-4 z-50">
                <Loading />
                <span className="text-slate-900 font-medium">
                    در حال انتقال به درگاه پرداخت...
                </span>
            </div>

    )
}
