import getPriceService from "../../myservices/getPriceService";
import numberWithCommas from "@/utils/numberWithCommas";

export default function RequestDetailsForm({ onClose, data, children }) {
    const turn = data?.json_data && JSON.parse(data?.json_data);

    return (
        <div className="flex flex-col gap-4">
            {children}
            <div className="flex flex-col gap-2">
                <div className="text-sm flex items-center gap-1 text-slate-800">
                    <span className=" font-medium">
                        نوع هزینه:
                    </span>
                    <span className="font-semibold">
                        {getPriceService(data?.service[0]?.price_type)}
                    </span>
                </div>
                <div className="text-sm flex items-center gap-1 text-slate-800">
                    <span className=" font-medium">
                        {data?.service[0]?.price_type === "suggestion" ? "مبلغ پیشنهادی کاربر:" : "پرداخت شده:"}
                    </span>
                    <span className="font-semibold">
                        {numberWithCommas(data?.service[0]?.price)} تومان
                    </span>
                </div>
            </div>
            <div className="text-sm flex items-center gap-1 text-slate-800 border-t border-t-slate-400 py-2">
                <span className=" font-medium">
                    علت مراجعه:
                </span>
                <span className="font-semibold">
                    {turn.description}
                </span>
            </div>
            <button onClick={onClose} className="!w-full btn btn--outline">
                بستن
            </button>
        </div>
    )
}
