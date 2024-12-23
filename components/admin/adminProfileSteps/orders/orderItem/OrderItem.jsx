import { CiCalendar, CiClock2 } from "react-icons/ci";
import OrderItemUser from "./OrderItemUser";
import OrderItemDetails from "./OrderItemDetails";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import OrderItemStatus from "./OrderItemStatus";

export default function OrderItem({ status }) {
    return (
        <div className="w-full bg-white rounded-xl p-4">
            {/* user and order details */}
            <div className="w-full flex flex-col gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 mb-4">
                <OrderItemUser />
                <OrderItemDetails />

                <div className="flex md:flex-col items-center md:items-start md:justify-center gap-5 md:gap-2">
                    <button className="flex items-center gap-1 text-sm font-medium text-primary-01">
                        <MdOutlineEdit className="w-5 h-5" />
                        ویرایش سفارش
                    </button>
                    <button className="flex items-center gap-1 text-sm font-medium text-error">
                        <FaRegTrashAlt className="w-4 h-4" />
                        لغو سفارش
                    </button>
                </div>
            </div>

            {/* status */}
            <OrderItemStatus status={status} />

            {/* options */}
            {
                status === 5 &&
                <p className="text-sm font-medium text-slate-700 py-4">
                    کاربر گرامی عرضه کننده خدمات به درخواست شما با شرایط ثبت شده تائید اولیه داده است. در صورت تمایل تا ۲۴ ساعت پس از دریافت این پیام میتوانید درخواست خود را ثبت و تائید نهایی نمایید در غیر اینصورت لطفا سفارش خود را لغو کنید. توجه داشته باشید؛ در صورت لغو این ،سفارش شما تا ۷ روز آینده امکان ثبت مجددا این درخواست را نخواهید داشت.
                </p>
            }
            <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2 mt-4">
                <button className="btn btn--outline !text-primary-01 !border-primary-01">
                    مشاهده جزئیات
                </button>
                {status === 5 ?
                    <button className="btn btn--primary !bg-lime-600">
                        درصورت تایید کلیک کنید
                    </button>
                    :
                    <button className="btn btn--outline !text-primary-01 !border-primary-01">
                        درخواست مجدد
                    </button>
                }
            </div>
        </div>
    )
}
