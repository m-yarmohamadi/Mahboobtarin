import { useGetFollowers } from "@/hooks/useDashboard"
import useProfile from "@/hooks/useProfile";
import Loading from "@/tools/Loading";
import Link from "next/link";

export default function Followers() {
    const { user, isLoading } = useProfile();
    const { followers, isGetFollowers } = useGetFollowers(user?.id);

    if (isGetFollowers || isLoading) return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loading customeColor="#0693a4" />
        </div>
    )

    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full pb-8'>
                <div className='w-full flex flex-col gap-1 items-center justify-center mb-7 pb-4 border-b border-b-slate-300'>
                    <div className='text-xl text-slate-800 font-semibold'>
                        دنبال کنندگان
                    </div>
                    <p className="text-sm text-slate-600">
                        لیست افرادی که شما را دنبال میکنند
                    </p>
                </div>

                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 xl:gap-3 xl:grid-cols-5'>
                    {followers?.map((follower) => (
                        <Follower key={follower.id} user={follower} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function Follower({ user }) {
    return (
        <div className="w-full flex flex-col items-center justify-between bg-white rounded-xl p-5">
            <div className="mb-3">
                <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center border border-slate-400">
                    <img
                        className={user?.follower?.avatar[0]?.path && "object-cover w-full h-full"}
                        src={user?.follower?.avatar[0]?.path || "/images/defaultUser.png"}
                        alt=''
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-1 mb-6">
                <h3 className="text-sm font-bold text-slate-800 text-center">
                    {user?.follower?.name} {user?.follower?.lastname}
                </h3>
            </div>

            <div className="w-full">
                <Link href={`/profile/${user?.follower?.id}`} className="btn btn--secondary !w-full !text-xs">
                    مشاهده پروفایل
                </Link>
            </div>
        </div>
    )
}