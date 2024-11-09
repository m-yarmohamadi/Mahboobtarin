import numberWithCommas from "@/utils/numberWithCommas"
import Link from "next/link"

export default function Turns() {
    return (
        <div className='w-full grid grid-cols-1 gap-4 lg:grid-cols-2'>
            
        </div>
    )
}

function TurnsItem() {
    return (
        <div className="w-full rounded-lg bg-slate-200 border border-slate-300 p-4">
            <div className="flex items-center justify-between font-bold text-slate-800 border-b border-slate-300 pb-4">
                مشاوره متنی
                <Link href={`/user/orders/turns/1`} className="btn btn--secondary !text-xs">
                    جزئیات سفارش
                </Link>
            </div>
            <div className="pt-4 grid grid-cols-2 gap-4">
                <div>
                    <div className="text-sm font-medium text-slate-700 pb-2">
                        علت مراجعه
                    </div>
                    <ul className="text-xs text-slate-600">
                        تست - تست - تست
                    </ul>
                </div>

                <div>
                    <div className="text-sm font-medium text-slate-700 pb-2">
                        زمان ثبت
                    </div>
                    <div className="text-xs text-slate-600">
                        1403/06/20
                    </div>
                </div>

                <div>
                    <div className="text-sm font-medium text-slate-700 pb-2">
                        هزینه
                    </div>
                    <div className="text-xs text-slate-600">
                        {numberWithCommas(25000)} تومان
                    </div>
                </div>

                <div>
                    <div className="text-sm font-medium text-slate-700 pb-2">
                        وضعیت
                    </div>
                    <div className="text-xs text-slate-600">
                        ✅ انجام شده
                    </div>
                </div>
            </div>
        </div>
    )
}