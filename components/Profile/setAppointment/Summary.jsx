import numberWithCommas from '@/utils/numberWithCommas'

export default function Summary() {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-primary-01 font-medium mb-6">
                صورت حساب
            </div>

            <div className='text-sm text-gray-700 flex flex-col gap-3 pb-4 border-b border-gray-200 mb-4'>
                <div className='w-full flex items-center justify-between'>
                    <span>
                        هزینه
                    </span>
                    <span>
                        {numberWithCommas(250000)} تومان
                    </span>
                </div>
                <div className='w-full flex items-center justify-between'>
                    <span>
                        مالیات
                    </span>
                    <span>
                        {numberWithCommas(5000)} تومان
                    </span>
                </div>
            </div>

            <div className='w-full flex flex-col gap-5'>
                <div className='w-full flex items-center justify-between text-primary-01'>
                    <span className='text-sm font-bold'>
                        قابل پرداخت
                    </span>
                    <span className='text-xl font-medium'>
                        {numberWithCommas(5000)} تومان
                    </span>
                </div>

                <button className='btn btn--primary !w-full !font-medium'>
                    پرداخت
                </button>
            </div>
        </div>
    )
}
