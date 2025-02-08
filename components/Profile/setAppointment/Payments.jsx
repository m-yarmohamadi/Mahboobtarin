import { useGetShippingSetting } from "@/hooks/usePayment";
import Loading from "@/tools/Loading";

export default function Payments({ selected, onSelected }) {
    const { data, isLoading } = useGetShippingSetting();
    const { payments } = data || {};

    return (
        <div className="w-full bg-white border border-slate-200 dark:border-slate-500 rounded-lg p-6">
            <div className="text-primary-01 font-medium">
                درگاه پرداخت
            </div>
            <div>
                {
                    !isLoading ?
                        <div className="flex items-center flex-wrap gap-4 mt-5">
                            {payments.map((item, index) => (
                                <div key={index} onClick={() => onSelected(item.en_name)} className={`${selected === item.en_name ? "border-primary-01 font-bold bg-slate-400" : "border-slate-300 dark:border-slate-400"} h-full w-[140px] cursor-pointer pt-2.5 pb-4 px-5 truncate rounded-[10px] flex flex-col items-center border `}>
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
                                    <div className={`text-[11px] ${selected === item.en_name ? "text-primary-01" : "text-slate-800"}`}>
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
        </div>
    )
}
