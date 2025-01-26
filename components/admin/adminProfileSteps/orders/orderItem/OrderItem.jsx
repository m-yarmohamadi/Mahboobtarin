import OrderItemUser from "./OrderItemUser";
import OrderItemDetails from "./OrderItemDetails";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import OrderItemStatus from "./OrderItemStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useChangeRequestStatus } from "@/hooks/expertHooks/useRequestsClient";
import Modal from "@/components/Modal";
import OrederDetailsForm from "./OrederDetailsForm";
import { useState } from "react";

export default function OrderItem({ status, data }) {
    const [openDetails, setOpenDetails] = useState(false);
    const { changeStatusRequest } = useChangeRequestStatus();
    const queryClient = useQueryClient();
    const router = useRouter();

    const changeStatusHandler = async (statusNum) => {
        changeStatusRequest({ orderid: data.order_id, status: statusNum.toString() }, {
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ["requests-orders"] });
            }
        })
    }

    return (
        <div className="w-full bg-white rounded-xl p-4">
            {/* user and order details */}
            <div className="w-full flex flex-col gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 mb-4">
                <OrderItemUser user={data?.user} />
                <OrderItemDetails service={data.service[0]} turnData={data.json_data} />

                <div className="flex md:flex-col items-center md:items-start md:justify-center gap-5 md:gap-2">
                    {status === "0" &&
                        <button className="flex items-center gap-1 text-sm font-medium text-primary-01">
                            <MdOutlineEdit className="w-5 h-5" />
                            ویرایش سفارش
                        </button>
                    }
                    <button onClick={() => changeStatusHandler(1)} className="flex items-center gap-1 text-sm font-medium text-error">
                        <FaRegTrashAlt className="w-4 h-4" />
                        لغو سفارش
                    </button>
                </div>
            </div>

            {/* status */}
            <OrderItemStatus status={status} />

            {/* options */}
            {
                status === "3" &&
                <p className="text-sm font-medium text-slate-700 py-4">
                    کاربر گرامی عرضه کننده خدمات به درخواست شما با شرایط ثبت شده تائید اولیه داده است. در صورت تمایل تا ۲۴ ساعت پس از دریافت این پیام میتوانید درخواست خود را ثبت و تائید نهایی نمایید در غیر اینصورت لطفا سفارش خود را لغو کنید. توجه داشته باشید؛ در صورت لغو این ،سفارش شما تا ۷ روز آینده امکان ثبت مجددا این درخواست را نخواهید داشت.
                </p>
            }
            <div className="w-full flex flex-col sm:flex-row gap-2 mt-4">
                <button onClick={() => setOpenDetails(true)} className="!w-full btn btn--outline !text-primary-01 !border-primary-01">
                    مشاهده جزئیات
                </button>
                <Modal open={openDetails} onClose={() => setOpenDetails(false)} title="جزئیات سفارش">
                    <OrederDetailsForm data={data} onClose={() => setOpenDetails(false)}>
                        <OrderItemUser user={data?.user} />
                        <OrderItemDetails service={data.service[0]} turnData={data.json_data} />
                    </OrederDetailsForm>
                </Modal>

                {status === "3" ?
                    <button onClick={() => changeStatusHandler(4)} className="!w-full btn btn--primary !bg-lime-600">
                        جهت پرداخت کلیک کنید
                    </button>
                    :
                    <button onClick={() => router.push(`/${data.user.unique_url_id}`)} className="!w-full btn btn--outline !text-primary-01 !border-primary-01">
                        درخواست مجدد
                    </button>
                }
            </div>
        </div>
    )
}
