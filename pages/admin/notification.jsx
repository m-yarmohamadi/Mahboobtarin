import ExpertDashboard from "@/components/admin/ExpertDashboard";
import LoadingAdmin from "@/components/admin/LoadingAdmin";
import { useGetAllNotifs } from "@/hooks/expertHooks/useNotifications";
import { toPersianDateLong } from "@/utils/toPersianDate";

export default function notification() {
    const { notifications, isLoading } = useGetAllNotifs();

    return (
        <ExpertDashboard>
            {isLoading ?
                <LoadingAdmin />
                :
                <div>
                    <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                        <h1 className="text-xl text-slate-800 font-semibold">
                            اعلانات
                        </h1>
                    </div>

                    <div className="space-y-4">
                        {notifications?.map((item, index) => (
                            <div key={index} className="w-full p-4 border border-slate-300 dark:border-slate-400 rounded-xl">
                                <div className="flex items-start justify-between gap-2 pb-5">
                                    <span className="text-slate-900 font-semibold">
                                        {item.title}
                                    </span>
                                    <span className="text-xs text-slate-600">
                                        {toPersianDateLong(item.created_at)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-800">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </ExpertDashboard>
    )
} 
