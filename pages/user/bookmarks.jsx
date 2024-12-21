import UserNormalDashboard from "@/components/userNormal/UserNormalDashboard";

export default function Bookmarks() {
    return (
        <UserNormalDashboard>
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

                    </div>
                </div>
            </div>
        </UserNormalDashboard>
    )
}
