import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import OrderItemDetails from "../../orders/orderItem/OrderItemDetails";
import OrderItemStatus from "../../orders/orderItem/OrderItemStatus";
import calculateAge from "@/utils/calculateAge";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "@/components/Modal";
import ChangeStatusForm from "./ChangeStatusForm";
import { useChangeRequestStatus } from "@/hooks/expertHooks/useRequestsClient";


export default function RequestsUsersItem({ status, data, provinces }) {
    const [open, setOpen] = useState(false);
    const getProvinceLabel = provinces.filter((p) => p.value === Number(data.user?.province_id))[0]?.label;
    const { changeStatusRequest, isPending } = useChangeRequestStatus();
    const queryClient = useQueryClient();

    const changeStatusHandler = async (statusNum) => {
        changeStatusRequest({ orderid: data.order_id, status: statusNum.toString() }, {
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ["requests-client"] });
            }
        })
    }

    return (
        <div className="w-full bg-white rounded-xl p-4">

            {/* user and order details */}
            <div className="w-full flex flex-col gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 mb-4">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="w-12 h-12">
                            <img
                                src={data.user.avatar.length > 0 ? data.user.avatar[0].path : "/images/user.png"}
                                alt={`${data.user.name} ${data.user.lastname}`}
                                className="w-full h-full object-cover object-center rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 truncate">
                            {data.user.name} {data.user.lastname}
                        </span>
                        <span className="text-xs text-slate-600">
                            {data.user.gender === "man" ? "مرد" : "زن"} | {calculateAge(data?.user?.birthday)} | {getProvinceLabel}
                        </span>
                    </div>
                </div>
                <OrderItemDetails service={data.service[0]} turnData={data.json_data} />

                <div className="flex md:flex-col items-center md:items-start md:justify-center gap-5 md:gap-2">
                    <button className="flex items-center gap-1 text-sm font-medium text-primary-01">
                        <MdOutlineChat className="w-5 h-5" />
                        ارسال پیام
                    </button>
                    {status !== "5" && status !== "1" &&
                        <button onClick={() => changeStatusHandler(2)} className="flex items-center gap-1 text-sm font-medium text-error">
                            <FaRegTrashAlt className="w-4 h-4" />
                            لغو سفارش
                        </button>
                    }
                </div>
            </div>

            {/* status */}
            <OrderItemStatus status={status} isExpert={true} />
            <Modal open={open} onClose={() => setOpen(false)} title="تغییر وضعیت درخواست">
                <ChangeStatusForm
                    onClose={() => setOpen(false)}
                    onSubmit={(e) => changeStatusHandler(e)}
                    lastSelected={status}
                    isLoading={isPending}
                />
            </Modal>

            {/* options */}
            <div className="w-full flex flex-col sm:flex-row gap-2 mt-4">
                <button className="!w-full btn btn--outline !text-primary-01 !border-primary-01">
                    مشاهده جزئیات
                </button>
                {status === "0" &&
                    <button onClick={() => changeStatusHandler(3)} className="!w-full btn btn--primary !bg-lime-600">
                        درصورت تایید کلیک کنید
                    </button>
                }
                {status === "3" &&
                    <div className="!w-full btn btn--primary !opacity-80">
                        در انتظار تایید توسط کاربر متقاضی
                    </div>
                }
                {status !== "0" && status !== "3" && status !== "1" &&
                    <button onClick={() => setOpen(true)} className="!w-full btn btn--outline !text-primary-01 !border-primary-01">
                        ثبت عملیات توسط شما
                    </button>
                }
            </div>
        </div>
    )
}
