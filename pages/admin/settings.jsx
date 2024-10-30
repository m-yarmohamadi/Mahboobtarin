import SettingsOptions from "@/components/admin/adminProfileSteps/settings/SettingsOptions";
import ExpertDashboard from "@/components/admin/ExpertDashboard";

export default function Settings() {
    return (
        <ExpertDashboard>
            <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                <h1 className="text-xl text-slate-800 font-semibold">
                    تنظیمات
                </h1>
            </div>
            <SettingsOptions />
        </ExpertDashboard>
    )
}
