import { useGetFollowers, useGetFollowings } from "@/hooks/expertHooks/useFollow";
import useProfile from "@/hooks/useProfile";

export default function FollowDetails({ onChangeStep, userData }) {
    const { user, isLoading } = useProfile();
    const { followers, isGetFollowers } = useGetFollowers(userData.id);
    const { followings, isGetFollowings } = useGetFollowings(userData.id);

    if (isGetFollowers || isGetFollowings) return null

    return (
        <div className="flex items-center gap-6 whitespace-nowrap">
            <div onClick={() => user && onChangeStep(2)} className="flex flex-col lg:flex-row gap-2 items-center cursor-pointer">
                {followings &&
                    <span className="font-bold lg:text-lg text-slate-900">
                        {followings?.length}
                    </span>
                }

                <span className="text-xs lg:text-sm text-slate-700 font-medium">
                    دنبال شده
                </span>
            </div>
            <div onClick={() => user && onChangeStep(1)} className="flex flex-col lg:flex-row gap-2 items-center cursor-pointer">
                {followers &&
                    <span className="font-bold lg:text-lg text-slate-900">
                        {followers?.length}
                    </span>
                }
                <span className="text-xs lg:text-sm text-slate-700 font-medium">
                    دنبال کننده
                </span>
            </div>
        </div>
    )
}
