import { useGetFollowers, useGetFollowings } from "@/hooks/useDashboard";
import useProfile from "@/hooks/useProfile";

export default function FollowDetails({ onChangeStep, userData }) {
    const { user, isLoading } = useProfile();
    const { followers, isGetFollowers } = useGetFollowers(userData.id);
    const { followings, isGetFollowings } = useGetFollowings(userData.id);

    if (isGetFollowers || isGetFollowings) return null

    if (!user) return null

    return (
        <div className="flex items-center gap-6 truncate">
            <div onClick={() => onChangeStep(2)} className="cursor-pointer flex flex-col items-center lg:flex-row gap-2">
                <span className="text-slate-800 font-bold text-lg">
                    {followings?.length}
                </span>
                <span className="text-xs lg:text-base text-slate-700">
                    دنبال شده
                </span>
            </div>
            <div onClick={() => onChangeStep(1)} className="cursor-pointer flex flex-col items-center lg:flex-row gap-2">
                <span className="text-slate-800 font-bold text-lg">
                    {followers?.length}
                </span>
                <span className="text-xs lg:text-base text-slate-700">
                    دنبال کننده
                </span>
            </div>
        </div>
    )
}
