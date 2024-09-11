import numberWithCommas from "@/utils/numberWithCommas";

export default function OrdersList() {
    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full pb-8'>
                <div className='w-full flex items-end justify-between mb-7 pb-4 border-b border-b-slate-300'>
                    <div className='text-xl text-gray-800 font-semibold'>سفارش ها</div>
                </div>

                <div className='w-full grid grid-cols-1 gap-4 lg:grid-cols-2'>
                    <OrderItem />
                    <OrderItem />
                    <OrderItem />
                    <OrderItem />
                </div>
            </div>
        </div>
    )
}


function OrderItem() {
    return (
        <div className="w-full rounded-lg bg-slate-200 border border-slate-300 p-4">
            <div className="flex items-center justify-between font-bold text-slate-800 border-b border-slate-300 pb-4">
                مشاوره متنی
                <button className="btn btn--secondary !text-xs">
                    جزئیات سفارش
                </button>
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
            </div>
        </div>
    )
}