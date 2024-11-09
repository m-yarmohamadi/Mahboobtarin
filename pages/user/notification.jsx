import UserNormalDashboard from "@/components/userNormal/UserNormalDashboard";

export default function notification() {
    return (
        <UserNormalDashboard>
            <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                <h1 className="text-xl text-slate-800 font-semibold">
                    اعلانات
                </h1>
            </div>
        </UserNormalDashboard>
    )
} 
