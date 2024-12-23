import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import OrderItemDetails from "../../orders/orderItem/OrderItemDetails";
import OrderItemStatus from "../../orders/orderItem/OrderItemStatus";

export default function RequestsUsersItem({ status }) {
    return (
        <div className="w-full bg-white rounded-xl p-4">
            {/* user and order details */}
            <div className="w-full flex flex-col gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 mb-4">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="w-12 h-12">
                            <img src="/images/user.png" alt="user" className="w-full h-full object-cover object-center rounded-full" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 truncate">
                            محمدرضا فرامرزی
                        </span>
                        <span className="text-xs text-slate-600">
                            مرد | 20 | تهران
                        </span>
                    </div>
                </div>
                <OrderItemDetails />

                <div className="flex md:flex-col items-center md:items-start md:justify-center gap-5 md:gap-2">
                    <button className="flex items-center gap-1 text-sm font-medium text-primary-01">
                        <MdOutlineChat className="w-5 h-5" />
                        ارسال پیام
                    </button>
                    <button className="flex items-center gap-1 text-sm font-medium text-error">
                        <FaRegTrashAlt className="w-4 h-4" />
                        لغو سفارش
                    </button>
                </div>
            </div>

            {/* status */}
            <OrderItemStatus status={status} isExpert={true}/>

            {/* options */}
            <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2 mt-4">
                <button className="btn btn--outline !text-primary-01 !border-primary-01">
                    مشاهده جزئیات
                </button>
                {status === 4 &&
                    <button className="btn btn--primary !bg-lime-600">
                        درصورت تایید کلیک کنید
                    </button>
                }
                {status === 5 &&
                    <button className="btn btn--primary !opacity-80">
                        در انتظار تایید توسط کاربر متقاضی
                    </button>
                }
                {status !== 4 && status !== 5 &&
                    <button className="btn btn--outline !text-primary-01 !border-primary-01">
                        ثبت عملیات توسط شما
                    </button>
                }
            </div>
        </div>
    )
}
