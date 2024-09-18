export default function Followings() {
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
                    <Following />
                    <Following />
                    <Following />
                    <Following />
                    <Following />
                    <Following />
                    <Following />
                    <Following />
                    <Following />
                    <Following />
                    <Following />
                </div>
            </div>
        </div>
    )
}

function Following() {
    return (
        <div className="w-full flex flex-col items-center bg-white rounded-xl p-5">
            <div className="mb-3">
                <img src="/images/MahdiYazdaniKhoram.jpg" alt="" className="w-20 h-20 rounded-full" />
            </div>
            <div className="flex flex-col items-center gap-1 mb-6">
                <h3 className="text-sm font-bold text-gray-800 text-center">
                    محمدرضا فرامرزی
                </h3>
                <span className="text-xs text-gray-600">
                    09365456309
                </span>
            </div>

            <div className="w-full">
                <button className="btn btn--secondary !w-full !text-xs">
                    لغو دنبال کردن
                </button>
            </div>
        </div>
    )
}