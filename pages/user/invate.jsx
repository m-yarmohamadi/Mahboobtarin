import UserNormalDashboard from "@/components/userNormal/UserNormalDashboard";
import InvateBox from "../../components/admin/adminProfileSteps/invate/InvateBox";
import InvatedList from "@/components/admin/adminProfileSteps/invate/InvatedList";

export default function invate() {
    return (
        <UserNormalDashboard>
            <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                <h1 className="text-xl text-slate-800 font-semibold">
                    دعوت از دوستان
                </h1>
            </div>
            <InvateBox/>
            <InvatedList />
        </UserNormalDashboard>
    )
}
