import StatisticsList from "@/components/admin/adminProfileSteps/statistics/StatisticsList";
import ExpertDashboard from "@/components/admin/ExpertDashboard";

export default function Statistics() {
    return (
        <ExpertDashboard>
            <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                <h1 className="text-xl text-slate-800 font-semibold">
                    آمار
                </h1>
            </div>
            <StatisticsList />
        </ExpertDashboard >
    )
}
