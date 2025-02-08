import { goPaymentService } from "@/components/Profile/setAppointment/goPaymentService";
import { useGetShippingSetting } from "@/hooks/usePayment";
import Loading from "@/tools/Loading";
import { useState } from "react";

export default function OrderPayment({ onClose, orderId }) {
    const [payment, setPayment] = useState();
    const { data, isLoading } = useGetShippingSetting();
    const { payments } = data || {};
    
    const goPaymentHandler = () => {
        goPaymentService(orderId);
    }

    return (
        <div>
            <div>
                {
                    !isLoading ?
                        <div className="flex items-center flex-wrap gap-4 mt-5">
                            {payments.map((item, index) => (
                                <div key={index} onClick={() => setPayment(item.en_name)} className={`${payment === item.en_name ? "border-primary-01 font-bold bg-slate-400" : "border-slate-300 dark:border-slate-400"} h-full w-[140px] cursor-pointer pt-2.5 pb-4 px-5 truncate rounded-[10px] flex flex-col items-center border `}>
                                    <div className="w-full h-[50px] mb-2">
                                        <img
                                            src={item.picture}
                                            alt={item.name}
                                            className="w-full h-full object-contain object-center mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="mb-[5px] text-xs text-slate-800">
                                        {item.name}
                                    </div>
                                    <div className={`text-[11px] ${payment === item.en_name ? "text-primary-01" : "text-slate-800"}`}>
                                        {item.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div className="w-full flex justify-center pb-6">
                            <Loading customeColor="#0693a4" />
                        </div>
                }
            </div>

            <div className="w-full grid grid-cols-2 gap-4 pt-6">
                <button disabled={!payment} onClick={goPaymentHandler} className="!w-full btn btn--primary disabled:opacity-50">
                    تایید و پرداخت
                </button>
                <button onClick={onClose} className="!w-full btn btn--outline">
                    لغو
                </button>
            </div>
        </div>
    )
}
