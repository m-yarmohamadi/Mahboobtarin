import SettingsOptions from "@/components/admin/adminProfileSteps/settings/SettingsOptions";
import UserNormalDashboard from "@/components/userNormal/UserNormalDashboard";

export default function Settings() {
    return (
        <UserNormalDashboard>
            <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                <h1 className="text-xl text-slate-800 font-semibold">
                    تنظیمات
                </h1>
            </div>
            <SettingsOptions />
        </UserNormalDashboard>
    )
}
