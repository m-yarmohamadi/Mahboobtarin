import { useGetPlans } from "@/hooks/useDashboard"
import LoadingAdmin from "../../LoadingAdmin";
import numberWithCommas from "@/utils/numberWithCommas";
import { FcVip } from "react-icons/fc";

export default function PlansList() {
    const { plans, isLoading } = useGetPlans();

    if (isLoading) return <LoadingAdmin />

    return (
        <div>
            <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                <h1 className="text-xl text-slate-800 font-semibold">
                    خرید اشتراک
                </h1>
            </div>
            <div className="w-full flex flex-col gap-4 max-w-xl mx-auto">
                {plans.map((plan) => (
                    <PlanItem key={plan.id} plan={plan} />
                ))}
            </div>
        </div>
    )
}


function PlanItem({ plan }) {
    return (
        <div className="w-full p-6 bg-white border border-slate-200 rounded-lg">
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex items-center flex-col sm:flex-row sm:items-start gap-2">
                    <FcVip className="w-8 h-8" />
                    <div className="flex flex-col items-center sm:items-start gap-2">
                        <h4 className="text-sm font-medium text-slate-900">
                            {plan.title}
                        </h4>
                        <div dangerouslySetInnerHTML={{ __html: plan.description }} className="text-center text-xs text-slate-800">

                        </div>
                    </div>
                </div>
                <button className="btn btn--primary !w-full sm:!w-auto">
                    {numberWithCommas(plan.price)} تومان
                </button>
            </div>
        </div>
    )
}