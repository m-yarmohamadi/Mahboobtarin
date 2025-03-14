import { useGetPlans } from "@/hooks/useDashboard"
import LoadingAdmin from "../../LoadingAdmin";
import numberWithCommas from "@/utils/numberWithCommas";
import { FcVip } from "react-icons/fc";
import { useMutation } from "@tanstack/react-query";
import { buyPlanApi } from "@/services/expertDashboardService";
import Loading from "@/tools/Loading";
import useProfile from "@/hooks/useProfile";

export default function PlansList() {
    const { plans, isLoading } = useGetPlans();
    const { user } = useProfile();
    const { mutateAsync, isPending } = useMutation({ mutationFn: buyPlanApi });

    const submitBuyPlan = async (planId) => {
        try {
            const { data } = await mutateAsync({ plan_id: planId.toString() });
            if (data) {
                window.location.href = data.redirect_to;
            }

        } catch (error) {
            console.log(error);

        }
    }

    if (isLoading) return <LoadingAdmin />

    return (
        <div>
            {
                isPending && <div className="w-full h-full fixed top-0 right-0 bg-slate-200/70 backdrop-blur flex flex-col items-center justify-center gap-4 z-50">
                    <Loading customeColor={'#0693a4'} />
                    <span className="text-slate-900 font-medium">
                        در حال انتقال به درگاه پرداخت...
                    </span>
                </div>
            }
            <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                <h1 className="text-xl text-slate-800 font-semibold">
                    خرید اشتراک
                </h1>
            </div>
            <div className="w-full flex flex-col gap-4 max-w-xl mx-auto mb-20">
                {plans.planes.map((plan) => (
                    <PlanItem key={plan.id} plan={plan} submitBuyPlan={submitBuyPlan} disableBtn={user && user?.plan}/>
                ))}
            </div>
            <div>
                <h2 className="text-textDefault font-medium pb-3">
                    اشتراک فعال شما
                </h2>

                {
                    user ?
                        user?.plan ?
                            <PlanItem plan={user?.plan} disableBtn />
                            :
                            <div className="text-slate-700 font-medium text-sm text-center py-8">
                                اشتراک فعالی ندارید!
                            </div>
                        : null
                }
            </div>
        </div>
    )
}


function PlanItem({ plan, submitBuyPlan, disableBtn = false }) {

    return (
        <div className="w-full p-6 bg-white border border-slate-200 rounded-lg">
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="flex items-center flex-col sm:flex-row sm:items-start gap-2">
                    <FcVip className="w-8 h-8" />
                    <div className="flex flex-col items-center sm:items-start gap-2">
                        <h4 className="text-sm font-medium text-slate-900">
                            {plan?.title}
                        </h4>
                        <div dangerouslySetInnerHTML={{ __html: plan?.description }} className="text-center text-xs text-slate-800">

                        </div>
                    </div>
                </div>
                {
                    !disableBtn &&
                    <button onClick={() => submitBuyPlan(plan.id)} className="btn btn--primary !w-full sm:!w-auto">
                        {numberWithCommas(plan?.price)} تومان
                    </button>
                }
            </div>
        </div>
    )
}