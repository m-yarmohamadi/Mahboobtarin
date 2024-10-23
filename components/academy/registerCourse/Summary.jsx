import Input from "@/tools/Input";
import numberWithCommas from "@/utils/numberWithCommas";
import Link from "next/link";

export default function Summary({ setSuccess }) {
    return (
        <div className="w-full bg-white border border-slate-200 dark:border-slate-500 rounded-lg p-6">
            <div className="text-primary-01 font-medium mb-6">
                اطلاعات پرداخت
            </div>

            <div className='flex gap-1 items-end pb-4 border-b border-slate-200 dark:border-slate-500 mb-4'>
                <Input
                    label={'کد تخفیف'}
                    display="!py-0"
                />
                <button className="btn btn--primary mb-2">
                    اعمال
                </button>
            </div>

            <div className='text-sm text-slate-700 flex flex-col gap-3 pb-4 border-b border-slate-200 dark:border-slate-500 mb-4'>
                <div className='w-full flex items-center justify-between'>
                    <span>
                        قیمت دوره
                    </span>
                    <span>
                        {numberWithCommas(1500000)} تومان
                    </span>
                </div>
                <div className='w-full flex items-center justify-between text-red-500'>
                    <span>
                        تخفیف
                    </span>
                    <span>
                        {numberWithCommas(50000)} تومان
                    </span>
                </div>
            </div>

            <div className='w-full flex flex-col gap-5'>
                <div className='w-full flex items-center justify-between text-primary-01'>
                    <span className='text-sm font-bold'>
                        قابل پرداخت
                    </span>
                    <span className='text-xl font-medium'>
                        {numberWithCommas(1250000)} تومان
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button onClick={setSuccess} className='btn btn--primary !w-full !font-medium'>
                        پرداخت
                    </button>
                    <Link href={'/'} className='btn btn--outline !w-full !font-medium'>
                        لغو
                    </Link>
                </div>
            </div>
        </div>
    )
}
