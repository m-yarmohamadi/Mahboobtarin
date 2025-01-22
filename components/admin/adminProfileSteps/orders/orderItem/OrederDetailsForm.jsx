import numberWithCommas from "@/utils/numberWithCommas";
import getPriceService from "../../myservices/getPriceService";

export default function OrederDetailsForm({ onClose, data, children }) {
    const turn = data?.json_data && JSON.parse(data?.json_data);

    return (
        <div className="flex flex-col gap-6">
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
                        قابل پرداخت:
                    </span>
                    <span className="font-semibold">
                        {numberWithCommas(data?.service[0]?.price)} تومان
                    </span>
                </div>
            </div>
            <div className="text-sm flex items-center gap-1 text-slate-800 border-t border-t-slate-400 py-2">
                <span className=" font-medium">
                    علت مراجعه شما:
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
