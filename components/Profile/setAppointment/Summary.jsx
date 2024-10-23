import numberWithCommas from '@/utils/numberWithCommas'

export default function Summary({ serviceData, setSuccess }) {
    return (
        <div className="w-full bg-white border border-slate-200 dark:border-slate-500 rounded-lg p-6">
            <div className="text-primary-01 font-medium mb-6">
                صورت حساب
            </div>

            <div className='text-sm text-slate-700 flex flex-col gap-3 pb-4 border-b border-slate-200 dark:border-slate-500 mb-4'>
                <div className='w-full flex items-center justify-between'>
                    <span>
                        هزینه
                    </span>
                    {
                        serviceData.price !== "0" ?
                            <span>
                                {numberWithCommas(serviceData.price)} تومان
                            </span>
                            :
                            "رایگان"
                    }

                </div>
                <div className='w-full flex items-center justify-between'>
                    <span>
                        مالیات
                    </span>
                    <span>
                        {numberWithCommas(0)} تومان
                    </span>
                </div>
            </div>

            <div className='w-full flex flex-col gap-5'>
                <div className='w-full flex items-center justify-between text-primary-01'>
                    <span className='text-sm font-bold'>
                        قابل پرداخت
                    </span>
                    {
                        serviceData.price !== "0" ?
                            <span className='text-xl font-medium'>
                                {numberWithCommas(serviceData.price)} تومان
                            </span>
                            :
                            "رایگان"
                    }
                </div>

                <button onClick={setSuccess} className='btn btn--primary !w-full !font-medium'>
                    پرداخت
                </button>
            </div>
        </div>
    )
}
