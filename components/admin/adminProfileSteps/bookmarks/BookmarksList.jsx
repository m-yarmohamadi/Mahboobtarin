import LoadingAdmin from "@/components/admin/LoadingAdmin";
import { useGetBookmarks } from "@/hooks/expertHooks/useBookmark";
import Link from "next/link";

export default function BookmarksList() {
    const { bookmarks, isGetBookmarks } = useGetBookmarks();
    const allMarkers = !isGetBookmarks && bookmarks.flatMap(item => item.markers);

    if (isGetBookmarks) return <LoadingAdmin />

    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full pb-8'>
                <div className='w-full flex flex-col gap-1 items-center justify-center mb-7 pb-4 border-b border-b-slate-300'>
                    <div className='text-xl text-slate-800 font-semibold'>
                        نشان شده ها
                    </div>
                    <p className="text-sm text-slate-600">
                        لیست افرادی که آنها را نشان کردید
                    </p>
                </div>

                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 xl:gap-3 xl:grid-cols-5'>
                    {allMarkers.map((user) => (
                        <div key={user.id} className="w-full flex flex-col items-center justify-between bg-white rounded-xl p-5">
                            <div className="flex flex-col items-center gap-1 mb-6">
                                <h3 className="text-sm font-bold text-slate-800 text-center">
                                    {user?.name} {user?.lastname}
                                </h3>
                                <span className="text-xs text-slate-700">
                                    @{user?.unique_url_id}
                                </span>
                            </div>

                            <div className="w-full">
                                <Link href={`/${user?.unique_url_id}`} className="btn btn--secondary !w-full !text-xs">
                                    مشاهده پروفایل
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
