import numberWithCommas from "@/utils/numberWithCommas";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function Products() {
    return (
        <div className="w-full flex flex-col gap-6">
            
        </div>
    )
}

function OrderProductItem() {
    return (
        <div className="w-full p-6 rounded-xl border border-slate-300 bg-slate-200">
            <div className="w-full flex items-center justify-between pb-3">
                <h3 className="text-sm font-medium text-slate-800">
                    شماره سفارش: 428585156
                </h3>
                <div>
                    <Link href={`/user/orders/product-order/32`} className="text-xs text-slate-950 flex items-center gap-2">
                        <FaAngleLeft className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="py-4 text-base font-medium text-slate-800 border-b border-b-slate-300 pb-4">
                ✅ تحویل داده شد
            </div>
            <div className="py-4 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-b-slate-300">
                <div className="text-sm text-slate-500">
                    1 مهر 1403
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                <div className="text-sm text-slate-500 flex items-center gap-1">
                    مبلغ
                    <span className="text-slate-800 font-semibold">
                        {numberWithCommas(2500000)} تومان
                    </span>
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                <div className="text-sm text-slate-500 flex items-center gap-1">
                    تخفیف
                    <span className="text-slate-800 font-semibold">
                        {numberWithCommas(25000)} تومان
                    </span>
                </div>
            </div>
            <div className="py-4 flex items-center flex-wrap gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-300">
                    <img src="/images/Book004.png" alt="" className="w-full h-full object-contain object-center" />
                </div>
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-300">
                    <img src="/images/Book004.png" alt="" className="w-full h-full object-contain object-center" />
                </div>
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-300">
                    <img src="/images/Book004.png" alt="" className="w-full h-full object-contain object-center" />
                </div>
            </div>
        </div>
    )
}
