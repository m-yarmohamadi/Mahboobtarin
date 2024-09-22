import { useFollow, useGetFollowings } from "@/hooks/useDashboard"
import useProfile from "@/hooks/useProfile";
import Loading from "@/tools/Loading";
import Link from "next/link";

export default function Followings() {
    const { user, isLoading } = useProfile();
    const { followings, isGetFollowings } = useGetFollowings(user?.id);

    if (isGetFollowings || isLoading) return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loading customeColor="#0693a4" />
        </div>
    )

    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full pb-8'>
                <div className='w-full flex flex-col gap-1 items-center justify-center mb-7 pb-4 border-b border-b-slate-300'>
                    <div className='text-xl text-gray-800 font-semibold'>
                        دنبال شونده ها
                    </div>
                    <p className="text-sm text-gray-600">
                        لیست افرادی که شما آنها را دنبال می کنید
                    </p>
                </div>

                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 xl:gap-3 xl:grid-cols-5'>
                    {followings.map((item) => (
                        <Following key={item.id} user={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function Following({ user }) {
    const { followHandler } = useFollow();
    return (
        <div className="w-full flex flex-col items-center bg-white rounded-xl p-5">
            <Link  href={`/profile/${user.follower.id}`} className="mb-3 block">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                    <img
                        className={user?.follower?.avatar[0]?.path && "object-cover w-full h-full"}
                        src={user?.follower?.avatar[0]?.path || "/images/defaultUser.png"}
                        alt=''
                    />
                </div>
            </Link>
            <Link href={`/profile/${user.follower.id}`} className="flex flex-col items-center gap-1 mb-6">
                <h3 className="text-sm font-bold text-gray-800 text-center">
                    {user.follower.name} {user.follower.lastname}
                </h3>
            </Link>

            <div className="w-full">
                <button onClick={() => followHandler(user.follower.id, `${user.follower.name} ${user.follower.lastname}`)} className="btn btn--secondary !w-full !text-xs">
                    لغو دنبال کردن
                </button>
            </div>
        </div>
    )
}