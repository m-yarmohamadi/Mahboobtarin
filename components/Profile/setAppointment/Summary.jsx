import getPriceService from '@/components/admin/adminProfileSteps/myservices/getPriceService'
import Input from '@/tools/Input'
import Loading from '@/tools/Loading'
import numberWithCommas from '@/utils/numberWithCommas'

export default function Summary({ serviceData, submitHandler, price, setPrice, isLoading }) {
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
                        serviceData.price_type === "custom" ?
                            <span>
                                {numberWithCommas(price)} تومان
                            </span>
                            :
                            getPriceService(serviceData.price_type)
                    }

                </div>
            </div>

            {serviceData.price_type !== "free" && serviceData.price_type !== "custom" &&
                <div>
                    <Input
                        label={'مبلغ پرداختی خود را وارد کنید'}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            }

            <div className='w-full flex flex-col gap-5'>
                {
                    serviceData.price_type !== "free" &&
                    <div className='w-full flex items-center justify-between gap-6 text-primary-01'>
                        <span className='text-sm font-bold'>
                            قابل پرداخت
                        </span>

                        <span className='text-xl font-medium'>
                            {numberWithCommas(price)} تومان
                        </span>
                    </div>
                }

                <button onClick={submitHandler} className='btn btn--primary !w-full !font-medium'>
                    {isLoading ? <Loading width={50} /> : "ثبت سفارش و پرداخت"}
                </button>
            </div>
        </div>
    )
}
