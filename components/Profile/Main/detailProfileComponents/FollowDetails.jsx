import { useGetFollowers, useGetFollowings } from "@/hooks/expertHooks/useFollow";
import useProfile from "@/hooks/useProfile";

export default function FollowDetails({ onChangeStep, userData }) {
    const { user, isLoading } = useProfile();
    const { followers, isGetFollowers } = useGetFollowers(userData.id);
    const { followings, isGetFollowings } = useGetFollowings(userData.id);

    if (isGetFollowers || isGetFollowings) return null

    if (!user) return null

    return (
        <div className="flex  items-center gap-2 sm:gap-6 whitespace-nowrap">
            <div onClick={() => onChangeStep(2)} className="cursor-pointer flex flex-col justify-center items-center lg:flex-row relative md:p-6">
                {followings && <span className=" absolute -top-2 -right-2 md:top-3 z-5  md:right-4 text-primary-02 font-bold text-md bg-primary-01 w-5 md:w-6 h-5 md:h-6 flex justify-center items-center rounded-full hover:border border-slate-50">
                    {followings?.length}
                </span>}

                <span className=" text-xs lg:text-base text-slate-700 border hover:border-dotted border-primary-01  px-2 bg-primary-02 p-1 rounded-md hover:shadow-md ">
                    دنبال شده
                </span>
            </div>
            <div onClick={() => onChangeStep(1)} className="cursor-pointer flex flex-col justify-center items-center lg:flex-row relative md:p-6">

                {followers && <span className=" absolute -top-2 -right-2 md:top-3 z-5  md:right-4 text-primary-02 font-bold text-md bg-primary-01 w-5 md:w-6 h-5 md:h-6 flex justify-center items-center rounded-full hover:border border-slate-50">
                    {followers?.length}
                </span>}
                <span className=" text-xs lg:text-base text-slate-700 border hover:border-dotted border-primary-01  px-2 bg-primary-02 p-1 rounded-md hover:shadow-md ">
                    دنبال کننده
                </span>
            </div>
        </div>
    )
}
